export function searchRepositories(
  query: string,
): Promise<SearchResponse<Repository>> {
  const q = encodeURIComponent(query);
  return fetch(`https://api.github.com/search/repositories?q=${q}`, {
    mode: "cors",
  }).then((res) => res.json());
}
