import {NextResponse, NextRequest} from "next/server";
import {dbConnect} from "@/app/lib/db";
import User from "@/app/models/user";
import video from "@/app/models/videos";

export async function POST(req: NextRequest) {
    try {
        const {email, password} = await req.json();
        if (!email || !password) {
            return NextResponse.json({error: "Email and password are required"}, {status: 400});
        }
        await dbConnect();
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }
        await User.create({email, password});
        return NextResponse.json({message: "User registered successfully"}, {status: 201});
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}