import { searchRepositories } from "@lib/github/repository";
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
    <div>
      <SearchForm update={(q) => setQuery(q.text)} />
      <ol>
        {data?.items.map((item) => (
          <RepositoryListItem repository={item} key={item.full_name} />
        ))}
      </ol>
    </div>
  );
}
export default SearchRepositories;
