import { useSavedRepositoryStore } from "@lib/store/savedRepository";
import { shallow } from "zustand/shallow";
import { Box, Button, Text } from "@primer/react";

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
    <Box
      borderColor="border.default"
      borderTopWidth={1}
      borderTopStyle="solid"
      px={3}
      pt={4}
      pb={5}
      as="li"
      data-cy="repository-list-item"
      sx={{
        "&:first-of-type": {
          borderTop: "none",
        },
        "&:hover": {
          backgroundColor: "canvas.subtle",
        },
      }}
    >
      <Box
        mb={1}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Text
          fontSize="3"
          color="accent.fg"
          as="header"
          data-cy="repository-full-name"
        >
          {repository.full_name}
        </Text>

        {isSaved ? (
          <Button
            onClick={() => remove(repository.full_name)}
            type="button"
            size="small"
            data-cy="saved"
          >
            saved
          </Button>
        ) : (
          <Button
            onClick={() => add(repository.full_name)}
            disabled={!isAvailable}
            type="button"
            size="small"
            data-cy="save"
          >
            save
          </Button>
        )}
      </Box>
      <Text fontSize="2">{repository.description}</Text>
    </Box>
  );
}
export default RepositoryListItem;
