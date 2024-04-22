import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
 const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await connect();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcryptjs.compare(
            password,
            user.password
          );
          if (!passwordsMatch) {
            return null;
          }
          return { ...user.toObject(), name: user.username };
        } catch (error) {
          console.log("Error:", error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        try {
          console.log("Signing in with Google:", user);
          const { name, email } = user;
          await connect();
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            console.log("User exists:", existingUser);
           
            return user;
          }else {
            //generate random password
            const password = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcryptjs.hash(password, 10);

          console.log("Creating new user:", user);
          const newUser = new User({
            username: name,
            email: email,
            password: hashedPassword,
            isVerified: true,
            role: "user",
          });
          const res = await newUser.save();
          console.log("New user saved:", res);
          if (res.status === 200 || res.status === 201) {
            console.log("User saved successfully:", res);
            return user;
          }
        }
        } catch (err) {
          console.log("Error creating new user:", err);
        }
      }
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      console.log("Session:", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

export  const handler = NextAuth(authOptions) as never;
export { handler as GET, handler as POST };
