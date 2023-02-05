type GitHubSearchResponse<T> = {
  total_count: number;
  items: T[];
};

type GitHubErrorResponse = {
  message: string;
  documentation_url: string;
};

type GitHubRequestError = HTTPError<GitHubErrorResponse>;
