import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import connectDB from "@/db/connectDB";
import User from "@/app/models/user";

export const authOptions = {
  providers: [
    // GitHub OAuth provider
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    
    // Credentials-based login
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await connectDB();
          
          // Find the user by email
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with this email");
          }

          // Verify the password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          // Return user object if the login is successful
          return user;
        } catch (error) {
          throw new Error("Login failed: " + error.message);
        }
      }
    })
  ],
  
  pages: {
    signIn: '/auth/login', // Custom login page
    error: '/auth/error',  // Custom error page
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();
      
      if (account.provider === "github") {
        const existingUser = await User.findOne({ email: user.email });

        // Create a new user if it doesn't exist
        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0],
            password: user.password ? bcrypt.hashSync(user.password, 10) : '', // Save password if provided
          });
          await newUser.save();
        }
      }

      return true; // Allow sign-in
    },

    
    async session({ session, token }) {
      session.user.id = token.id;
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.username;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      } else if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString(); 
      }
      return baseUrl;
    }
    
  },

  session: {
    strategy: "jwt",
  },

  debug: process.env.NODE_ENV === "development"
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
