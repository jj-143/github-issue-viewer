import { Query, QueryCache, QueryClient } from "@tanstack/react-query";
import { HTTPError } from "@lib/core/error";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (!(error instanceof Error)) return;
      if (isGitHubQuery(query)) handleGitHubError(error);
    },
  }),
});

function isGitHubQuery(query: Query): boolean {
  return query.queryKey[0] === "github";
}

function handleGitHubError(error: Error) {
  if (!(error instanceof HTTPError)) return;
  const { status, data } = error as HTTPError<GitHubErrorResponse>;
  if (status === 403) {
    // handle 403
  }
}
