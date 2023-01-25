import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSavedRepositoryStore } from "@lib/store/savedRepository";
import { searchIssuesWithRepos } from "@lib/github/issue";
import IssueListItem from "./IssueListItem";
import { ISSUES_PER_PAGE } from "@lib/config/constants";
import { Box, Button, ButtonGroup, Heading, Text } from "@primer/react";

function Issues() {
  const savedRepos = useSavedRepositoryStore((s) => s.items);
  const [page, setPage] = useState(1);
  const { data } = useQuery(
    ["search", "issues", savedRepos, page],
    () => {
      return searchIssuesWithRepos(savedRepos, {
        page,
        per_page: ISSUES_PER_PAGE,
      });
    },
    {
      enabled: !!savedRepos.length,
      keepPreviousData: true,
    },
  );

  const hasPrevPage = page !== 1;
  const hasNextPage = ISSUES_PER_PAGE * page < (data?.total_count ?? 0);
  const totalPage = Math.ceil((data?.total_count ?? 0) / ISSUES_PER_PAGE);
  const start = ISSUES_PER_PAGE * (page - 1) + 1;

  return (
    <section>
      <Heading sx={{ mb: 2, fontSize: 4 }}>Issues</Heading>

      {data && (
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
      )}
      {!savedRepos.length && <strong>Save repository to see issues</strong>}

      <Box
        display={data ? "flex" : "none"}
        alignItems="center"
        justifyContent="center"
      >
        <Button onClick={() => setPage(page - 1)} disabled={!hasPrevPage}>
          {"prev"}
        </Button>

        <Text p={2}>
          {page} / {totalPage}
        </Text>
        <Button onClick={() => setPage(page + 1)} disabled={!hasNextPage}>
          {"next"}
        </Button>
      </Box>
    </section>
  );
}
export default Issues;
