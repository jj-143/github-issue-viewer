import { get } from "@lib/core/http";

export function searchRepositories(
  query: string,
): Promise<GitHubSearchResponse<Repository>> {
  const q = encodeURIComponent(query);
  return get(`https://api.github.com/search/repositories?q=${q}`, {
    mode: "cors",
  });
}
