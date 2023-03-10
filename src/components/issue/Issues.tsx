import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSavedRepositoryStore } from "@lib/store/savedRepository";
import { searchIssuesWithRepos } from "@lib/github/issue";
import IssueListItem from "./IssueListItem";
import { ISSUES_PER_PAGE } from "@lib/config/constants";
import { Box, Button, Flash, Heading, Text, Token } from "@primer/react";

function Issues() {
  const savedRepos = useSavedRepositoryStore((s) => s.items);
  const removeRepo = useSavedRepositoryStore((s) => s.remove);
  const [page, setPage] = useState(1);
  const { data, error } = useQuery(
    ["github", "search", "issues", savedRepos, page],
    () => {
      return searchIssuesWithRepos(savedRepos, {
        page,
        per_page: ISSUES_PER_PAGE,
      });
    },
    {
      enabled: !!savedRepos.length,
      keepPreviousData: !!savedRepos.length,
    },
  );

  const hasPrevPage = page !== 1;
  const hasNextPage = ISSUES_PER_PAGE * page < (data?.total_count ?? 0);
  const totalPage = Math.ceil((data?.total_count ?? 0) / ISSUES_PER_PAGE);
  const start = ISSUES_PER_PAGE * (page - 1) + 1;

  return (
    <section>
      <>
        <Heading sx={{ mb: 2, fontSize: 4 }}>Issues</Heading>
        <Box display="flex" flexWrap="wrap" alignItems="center" sx={{ gap: 2 }}>
          {savedRepos.map((repo) => (
            <Token text={repo} onRemove={() => removeRepo(repo)} key={repo} />
          ))}
        </Box>
        {error && <Flash variant="danger">Couldn{"'"}t fetch issues</Flash>}
        {!savedRepos.length && <strong>Save repository to see issues</strong>}
        {data ? (
          data.items.length ? (
            <>
              <Box
                as="ol"
                start={start}
                borderColor="border.default"
                borderWidth="1"
                borderStyle="solid"
              >
                {data?.items.map((item) => (
                  <IssueListItem issue={item} key={item.id} />
                ))}
              </Box>

              <Box
                display={data ? "flex" : "none"}
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  onClick={() => setPage(page - 1)}
                  disabled={!hasPrevPage}
                >
                  {"prev"}
                </Button>

                <Text p={2}>
                  {page} / {totalPage}
                </Text>
                <Button
                  onClick={() => setPage(page + 1)}
                  disabled={!hasNextPage}
                >
                  {"next"}
                </Button>
              </Box>
            </>
          ) : (
            <Box mt={2}>
              <Text>{"There aren't any open issues."}</Text>
            </Box>
          )
        ) : null}
      </>
    </section>
  );
}
export default Issues;
