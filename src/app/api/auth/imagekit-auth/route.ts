import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    try {
        const authenticationParams = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, 
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
            })
        return Response.json({
            authenticationParams,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY
        })
    } catch (error) {
        console.error("Error generating authentication parameters:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}