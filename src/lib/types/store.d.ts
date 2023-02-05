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

type AppFlash = {
  message: string;
  severity?: "success" | "danger" | "default" | "warning";
};

type AppState = {
  flash?: AppFlash;
};

type AppAction = {
  setFlash: (flash?: AppFlash) => void;
};

type AppStoreAPI = AppState & AppAction;
