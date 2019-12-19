export interface Credential {
  uid: string
  accessToken: string
  refreshToken: string
  displayName: string | null
  avatarURL?: string | null
}
