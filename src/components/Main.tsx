import SearchRepositories from "./repository/SearchRepositories";
import Issues from "./issue/Issues";
import { Box } from "@primer/react";
import AppFlash from "./AppFlash";
import AppHeader from "./AppHeader";

function Main() {
  return (
    <>
      <AppHeader />
      <AppFlash />
      <Box as="main" display="flex">
        <Box p={8} width={"600px"}>
          <SearchRepositories />
        </Box>
        <Box p={8} sx={{ flex: 1 }}>
          <Issues />
        </Box>
      </Box>
    </>
  );
}
export default Main;
