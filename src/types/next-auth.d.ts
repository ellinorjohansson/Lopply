import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string
      email: string
      admin: boolean
    }
  }

  interface User {
    id: string
    name?: string
    email: string
    admin: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    admin: boolean
  }
}