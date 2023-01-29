import toSearchString from "@lib/toSearchString";
import { get } from "@lib/core/http";

export function searchIssuesWithRepos(
  fullNames: Repository["full_name"][],
  params?: { page?: number; per_page?: number },
): Promise<GitHubSearchResponse<Issue>> {
  const defaultQuery = ["type:issue", "is:open"];
  const repos = fullNames.map((fullName) => `repo:${fullName}`);

  const q = [...defaultQuery, ...repos].join(" ");
  const search = toSearchString({
    q,
    ...params,
  });
  return get(`https://api.github.com/search/issues?${search}`, {
    mode: "cors",
  });
}
