import { useQuery } from "@tanstack/react-query";
import { useSavedRepositoryStore } from "@lib/store/savedRepository";
import { searchIssuesWithRepos } from "@lib/github/issue";
import IssueListItem from "./IssueListItem";

function Issues() {
  const savedRepos = useSavedRepositoryStore((s) => s.items);
  const { data } = useQuery(
    ["search", "issues", savedRepos],
    () => {
      return searchIssuesWithRepos(savedRepos);
    },
    {
      enabled: !!savedRepos.length,
    },
  );

  return (
    <section>
      <h2>Issues</h2>
      <ol>
        {data?.items.map((item) => (
          <IssueListItem issue={item} key={item.id} />
        ))}
        {!savedRepos.length && <strong>Save repository to see issues</strong>}
      </ol>
    </section>
  );
}
export default Issues;
