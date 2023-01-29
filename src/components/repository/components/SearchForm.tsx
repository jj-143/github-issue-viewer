import { Box, Button, TextInput } from "@primer/react";
import { FormEvent, useState } from "react";

type Props = {
  update: (query: SearchQuery) => void;
};

function SearchForm(props: Props) {
  const [text, setText] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.update({
      text,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Box display={"flex"}>
        <TextInput
          placeholder="Keyword to search repositories"
          value={text}
          onChange={(e) => setText(e.target.value)}
          data-cy="search-form-input"
          aria-label="Keyword"
          width={"100%"}
        />

        <Box ml={"2"}>
          <Button>search</Button>
        </Box>
      </Box>
    </form>
  );
}
export default SearchForm;
