import { authOptions } from "@/app/lib/auth";
import { dbConnect } from "@/app/lib/db";
import Video from "@/app/models/videos";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const videos= await Video.find({}).sort({ createdAt: -1 }).lean();
        if (!videos || videos.length === 0) {
            return new Response(JSON.stringify({ message: "No videos found" }), { status: 404 });
        }
        return NextResponse.json(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
        
    }
};

export async function POST(req: Request) {
    try {
        const session = await getServerSession( authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        const { title, description, VideoUrl, thumbnailUrl, controls, transformation } = await req.json();
        if (!title || !description || !VideoUrl || !thumbnailUrl) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }
        await dbConnect();
        const video = new Video({
            title,
            description,
            VideoUrl,
            thumbnailUrl,
            controls,
            transformation:{
                width:1080,
                height:1920,
                quality:transformation?.quality ?? 100
            },
        });
        const newVideo = await video.create(video);
        // await video.save();
        return new Response(JSON.stringify({ message: "Video created successfully" }), { status: 201 });
    } catch (error) {
        console.error("Error creating video:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};