import getRepositoryName from "@lib/getRepositoryName";

type Props = {
  issue: Issue;
};

function IssueListItem(props: Props) {
  const { issue } = props;

  const repositoryName = getRepositoryName(issue.repository_url);

  return (
    <li key={issue.id} data-cy="issue-list-item">
      <p data-cy="issue-repository-name">{repositoryName}</p>
      <a href={issue.html_url}>{issue.title}</a>
    </li>
  );
}
export default IssueListItem;
