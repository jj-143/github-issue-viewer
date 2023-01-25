import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSavedRepositoryStore } from "@lib/store/savedRepository";
import { searchIssuesWithRepos } from "@lib/github/issue";
import IssueListItem from "./IssueListItem";
import { ISSUES_PER_PAGE } from "@lib/config/constants";

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
      <h2>Issues</h2>
      {data && (
        <div>
          <button onClick={() => setPage(page - 1)} disabled={!hasPrevPage}>
            {"prev"}
          </button>{" "}
          {page} / {totalPage}{" "}
          <button onClick={() => setPage(page + 1)} disabled={!hasNextPage}>
            {"next"}
          </button>
        </div>
      )}
      <ol start={start}>
        {data?.items.map((item) => (
          <IssueListItem issue={item} key={item.id} />
        ))}
        {!savedRepos.length && <strong>Save repository to see issues</strong>}
      </ol>
    </section>
  );
}
export default Issues;
