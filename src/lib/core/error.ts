type HTTPErrorOption<D> = {
  message?: string;
  status: number;
  data: D;
};

export class HTTPError<D = unknown> extends Error {
  public readonly name: string = "HTTPError";
  public readonly status: number;
  public readonly data: D;

  constructor(option: HTTPErrorOption<D>) {
    super(option.message ?? `HTTP Error [${option.status}]`);
    this.status = option.status;
    this.data = option.data;
  }
}
