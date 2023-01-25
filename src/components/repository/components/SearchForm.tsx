import { useSavedRepositoryStore } from "@lib/store/savedRepository";
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
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-cy="search-form-input"
      />
      <button>search</button>
    </form>
  );
}
export default SearchForm;
