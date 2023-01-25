import SearchRepositories from "./repository/SearchRepositories";
import Issues from "./issue/Issues";
import { Box } from "@primer/react";

function Main() {
  return (
    <Box as="main" display="flex">
      <Box p={8} width={"600px"}>
        <SearchRepositories />
      </Box>
      <Box p={8} sx={{ flex: 1 }}>
        <Issues />
      </Box>
    </Box>
  );
}
export default Main;
