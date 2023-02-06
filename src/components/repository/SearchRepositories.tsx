import { searchRepositories } from "@lib/github/repository";
import { Box, Heading, Text } from "@primer/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchForm from "./components/SearchForm";
import RepositoryListItem from "./RepositoryListItem";

function SearchRepositories() {
  const [query, setQuery] = useState("");

  const { data } = useQuery(
    ["github", "search", "repository", query],
    () => searchRepositories(query),
    { enabled: !!query },
  );

  return (
    <section>
      <Heading sx={{ mb: 2, fontSize: 4 }}>Search Repositories</Heading>
      <SearchForm update={(q) => setQuery(q.text)} />
      {data ? (
        data.items.length ? (
          <Box
            as="ol"
            borderColor="border.default"
            borderStyle="solid"
            borderWidth="1"
          >
            {data?.items.map((item) => (
              <RepositoryListItem repository={item} key={item.full_name} />
            ))}
          </Box>
        ) : (
          <Box mt={2}>
            <Text>{"There aren't any results."}</Text>
          </Box>
        )
      ) : null}
    </section>
  );
}
export default SearchRepositories;
