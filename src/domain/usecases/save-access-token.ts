export interface saveAccessToken{
  save: (accessToken: string) => Promise<void>
}