import { searchRepositories } from "@lib/github/repository";
import { Box, Heading } from "@primer/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchForm from "./components/SearchForm";
import RepositoryListItem from "./RepositoryListItem";

function SearchRepositories() {
  const [query, setQuery] = useState("");

  const { data } = useQuery(
    ["search", "repository", query],
    () => searchRepositories(query),
    { enabled: !!query },
  );

  return (
    <section>
      <Heading sx={{ mb: 2, fontSize: 4 }}>Search Repositories</Heading>
      <SearchForm update={(q) => setQuery(q.text)} />
      <Box
        as="ol"
        borderColor="border.default"
        borderStyle="solid"
        borderWidth="1"
        display={data ? "block" : "none"}
      >
        {data?.items.map((item) => (
          <RepositoryListItem repository={item} key={item.full_name} />
        ))}
      </Box>
    </section>
  );
}
export default SearchRepositories;
