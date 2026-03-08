import type { NextAuthOptions } from "next-auth/next";
import type { JWT } from "@auth/core/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          return null;
        }

        // Check user status
        if (user.status !== "ACTIVE") {
          throw new Error(
            user.status === "SUSPENDED" ? "Account suspended" :
            user.status === "BLOCKED" ? "Account blocked" :
            user.status === "BLACKLISTED" ? "Account blacklisted" :
            "Account inactive"
          );
        }

        const passwordValid = await compare(
          credentials.password,
          user.password
        );

        if (!passwordValid) {
          return null;
        }

        // Update last login
        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          status: user.status,
          allowedSections: (user as any).allowedSections ?? [],
        } as any;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any, token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.status = (token as any).status;
        (session.user as any).allowedSections = (token as any).allowedSections ?? [];
      }
      return session;
    },
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.role = user.role;
        token.status = user.status;
        (token as any).allowedSections = user.allowedSections ?? [];
      }
      return token;
    },
  },
};
