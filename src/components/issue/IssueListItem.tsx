import getRepositoryName from "@lib/getRepositoryName";
import { Box, Link, Text } from "@primer/react";

type Props = {
  issue: Issue;
};

function IssueListItem(props: Props) {
  const { issue } = props;

  const repositoryName = getRepositoryName(issue.repository_url);

  return (
    <Box
      borderColor="border.default"
      borderTopWidth={1}
      borderTopStyle="solid"
      px={4}
      pt={4}
      pb={5}
      as="li"
      key={issue.id}
      data-cy="issue-list-item"
      sx={{
        "&:first-of-type": {
          borderTop: "none",
        },
        "&:hover": {
          backgroundColor: "canvas.subtle",
        },
      }}
    >
      <Link href={issue.html_url}>
        <Text sx={{ color: "fg.default", fontWeight: "bold", fontSize: 3 }}>
          {issue.title}
        </Text>
      </Link>
      <Box>
        <Text color="fg.subtle" data-cy="issue-repository-name">
          {repositoryName}
        </Text>
      </Box>
    </Box>
  );
}
export default IssueListItem;
