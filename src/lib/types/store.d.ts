type SavedRepositoryState = {
  items: Repository["full_name"][];
};

type SavedRepositoryAction = {
  add: (fullName: Repository["full_name"]) => void;
  remove: (fullName: Repository["full_name"]) => void;
  isSaved: (fullName: Repository["full_name"]) => boolean;
  isAvailable: () => boolean;
};

type SavedRepositoryStoreAPI = SavedRepositoryState & SavedRepositoryAction;
