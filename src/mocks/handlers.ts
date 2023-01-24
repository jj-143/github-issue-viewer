import { rest } from "msw";
import { response as repoResponse } from "./data/search-repositorys";
import { response as issueResponse } from "./data/search-issues";

export const handlers = [
  // search repository
  rest.get("https://api.github.com/search/repositories?q=", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(repoResponse));
  }),

  // search issues
  rest.get("https://api.github.com/search/issues?q=", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(issueResponse));
  }),
];
