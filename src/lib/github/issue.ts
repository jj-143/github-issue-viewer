import toSearchString from "@lib/toSearchString";

export function searchIssuesWithRepos(
  fullNames: Repository["full_name"][],
  params?: { page?: number; per_page?: number },
): Promise<SearchResponse<Issue>> {
  const defaultQuery = ["type:issue", "is:open"];
  const repos = fullNames.map((fullName) => `repo:${fullName}`);

  const q = [...defaultQuery, ...repos].join(" ");
  const search = toSearchString({
    q,
    ...params,
  });

  return fetch(`https://api.github.com/search/issues?${search}`, {
    mode: "cors",
  }).then((res) => res.json());
}
