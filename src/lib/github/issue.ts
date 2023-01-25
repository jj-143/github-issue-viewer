export function searchIssuesWithRepos(
  fullNames: Repository["full_name"][],
): Promise<SearchResponse<Issue>> {
  const defaultQuery = ["type:issue", "is:open"];
  const repos = fullNames.map((fullName) => `repo:${fullName}`);

  const q = encodeURIComponent([...defaultQuery, ...repos].join(" "));

  return fetch(`https://api.github.com/search/issues?q=${q}`, {
    mode: "cors",
  }).then((res) => res.json());
}
