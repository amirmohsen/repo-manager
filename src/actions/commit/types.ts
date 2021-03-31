export interface ICommit {
  message?: string;
  type?: string;
  all: boolean;
  scopes: boolean;
  root: boolean;
  breaking?: boolean;
  dry: boolean;
}
