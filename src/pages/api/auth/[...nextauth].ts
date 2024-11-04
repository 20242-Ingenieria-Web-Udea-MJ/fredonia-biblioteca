import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/PrismaConfig";

const options: NextAuthOptions = {
  callbacks: {
    async session({ session, user }) {
      if (user) {
        const userSession = await prisma.session.findFirst({
          where: { userId: user.id },
          include: { user: true },
          orderBy: { expires: "desc" },
        });

        if (userSession && userSession.user) {
          return {
            ...session,
            user: userSession.user,
            token: userSession.sessionToken,
          };
        }
      }
      return session;
    },
  },
  providers: [
    Auth0Provider({
      clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET || "",
      issuer: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`,
      authorization: {
        url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/authorize`,
        params: { response_type: "code", prompt: "login" },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
    maxAge: 3 * 24 * 60 * 60,
  },
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default authHandler;
export { options };
