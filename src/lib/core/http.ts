import { HTTPError } from "./error";

export async function http<T>(
  url: string,
  requestInit?: RequestInit,
): Promise<T> {
  const response = await fetch(url, requestInit);
  if (!response.ok) {
    throw new HTTPError({
      status: response.status,
      data: await response.json(),
    });
  }

  return await response.json();
}

export async function get<T>(
  url: string,
  requestInit?: RequestInit,
): Promise<T> {
  const init: RequestInit = { method: "GET", ...requestInit };
  return http<T>(url, init);
}
