import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
          authorId: "67b47066b0b3bbe56689fea7",
        },
        password: {
          label: "Password",
          type: "password",
          authorId: "67b47066b0b3bbe56689fea7",
        },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (!credentials || !credentials.username || !credentials.password)
          return null;

        const user = await prisma.todoUser.findUnique({
          where: {
            name: credentials.username,
          },
          // select: {
          //   name: true,
          //   email: true,
          //   lab: true,
          //   createdAt: true,
          //   updatedAt: true,
          //   password: true,
          // },
        });

        // const user0 = {
        //   id: "67b47066b0b3bbe56689fea7",
        //   _id: "67b47066b0b3bbe56689fea7",
        //   name: "Hosam Mohammad",
        //   email: "hosam@home.com",
        //   lab: "tarqeem",
        //   password: "asd",
        //   updatedAt: "2025-02-18T11:35:02.869+00:00",
        //   createdAt: "2025-02-18T11:35:02.869+00:00",
        // };

        if (user) {
          let pwMatch = await bcrypt.compare(user.password, credentials.password);
          // if( !pwMatch ) return null;
          // Any object returned will be saved in `user` property of the JWT
          console.log(user);
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      const userData = await prisma.todoUser.findUnique({
        where: {
          name: session?.user?.name || "",
        },
        select: {
          id: true,
          name: true,
          email: true,
          lab: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      session.user.id = userData?.id || "";
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
