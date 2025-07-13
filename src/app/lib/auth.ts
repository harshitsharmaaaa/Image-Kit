import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { dbConnect } from "./db";
export const authOptions:NextAuthOptions= { 
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                try {
                    await dbConnect ();
                    const user = await User.findOne({ email });
                    if (!user) {
                        throw new Error("No user found");   
                    }
                    const validPassword = await bcrypt.compare(password, user.password);
                    if (!validPassword) {
                        throw new Error("Invalid credentials");
                    }

                    return { id: user._id.toString(), email: user.email };
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error("Invalid credentials");
                    
                }
                // Here you would typically fetch the user from your database
                // and verify the password.
                // For now, we will just return a dummy user object.
               
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token}) {
            if (session.user) {
                session.user.id = token.id as string; 
            }
            return session;
        },
    },
    pages:{
        signIn: "/login",
        error: "/login",
    },
    session:{
        maxAge: 30 * 24 * 60 * 60, // 30 days
        strategy: "jwt",
    },
    secret: process.env.NEXT_AUTH_SECRET
}