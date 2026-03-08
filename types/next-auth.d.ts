import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      role?: string
      status?: string
      username?: string
      allowedSections?: string[]
    } & DefaultSession["user"]
  }

  interface User {
    role?: string
    status?: string
    username?: string
    allowedSections?: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name: string
    email: string
    role: string
    status: string
    username: string
    allowedSections: string[]
  }
}
