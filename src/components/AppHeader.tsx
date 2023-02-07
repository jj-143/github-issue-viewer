import { Header, StyledOcticon } from "@primer/react";
import { MarkGithubIcon } from "@primer/octicons-react";

function AppHeader() {
  return (
    <Header sx={{ px: 5, fontSize: 2 }}>
      <Header.Item>
        <Header.Link href="#">
          <StyledOcticon icon={MarkGithubIcon} size={32} sx={{ mr: 3 }} />
          GitHub Issue Viewer
        </Header.Link>
      </Header.Item>
    </Header>
  );
}
export default AppHeader;
