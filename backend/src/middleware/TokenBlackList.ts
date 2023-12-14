import { Injectable } from "@nestjs/common"

@Injectable()
export class TokenBlacklist {
  private tokenBlacklist: Record<string, string[]> = {}

  addToBlacklist(email: string, token: string) {
    const existingTokens = this.tokenBlacklist[email] || []
    this.tokenBlacklist[email] = [...existingTokens, token]
  }

  isTokenBlacklisted(email: string, token: string): boolean {
    const blacklistedTokens = this.tokenBlacklist[email] || []
    return blacklistedTokens.includes(token)
  }
}
