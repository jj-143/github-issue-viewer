export async function searchRepositories(
  query: string,
): Promise<SearchResponse<Repository>> {
  const q = encodeURIComponent(query);

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${q}`,
    {
      mode: "cors",
    },
  );

  if (!response.ok) throw await response.json();

  return response.json();
}
