import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

interface CustomJWT extends JWT {
  role?: string;
}

interface CustomSession extends Session {
  user?: Session["user"] & {
    role?: string;
  };
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        // Hanya customer/user biasa yang boleh masuk via halaman /login.
        if (user.role === 'ADMIN') return null;

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign in, attach role from DB to the token
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (dbUser) (token as CustomJWT).role = dbUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose role on the session.user object
      if (session.user) {
        (session as CustomSession).user!.role = (token as CustomJWT).role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

