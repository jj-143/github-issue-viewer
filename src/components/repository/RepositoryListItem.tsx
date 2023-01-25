import { useSavedRepositoryStore } from "@lib/store/savedRepository";
import { shallow } from "zustand/shallow";

type Props = {
  repository: Repository;
};

function RepositoryListItem(props: Props) {
  const { repository } = props;
  const [add, remove] = useSavedRepositoryStore(
    (s) => [s.add, s.remove],
    shallow,
  );

  const isSaved = useSavedRepositoryStore((s) =>
    s.isSaved(repository.full_name),
  );
  const isAvailable = useSavedRepositoryStore((s) => s.isAvailable());

  return (
    <li data-cy="repository-list-item">
      <header>{repository.full_name}</header>
      <p>{repository.description}</p>
      {isSaved ? (
        <button
          onClick={() => remove(repository.full_name)}
          type="button"
          data-cy="saved"
        >
          saved
        </button>
      ) : (
        <button
          onClick={() => add(repository.full_name)}
          disabled={!isAvailable}
          type="button"
          data-cy="save"
        >
          save
        </button>
      )}
    </li>
  );
}
export default RepositoryListItem;
