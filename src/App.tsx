import Main from "@components/Main";
import { BaseStyles, ThemeProvider } from "@primer/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

function App() {
  return (
    <>
      <style>
        {`
      li {
        list-style: none;
      }
      ol {
        margin-left: 0;
        padding-left: 0;
      }
    `}
        `{" "}
      </style>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BaseStyles>
            <Main />
          </BaseStyles>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
