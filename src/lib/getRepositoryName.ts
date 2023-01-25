/**
 *
 * parse repository name from repository_url
 *
 * @param repositoryUrl {@link Issue.repository_url}
 */
export default function getRepositoryName(
  repositoryUrl: Issue["repository_url"],
): string {
  return (
    repositoryUrl.match(/api\.github\.com\/repos\/([^\/]+\/[^\/]+)/)?.[1] ?? ""
  );
}
