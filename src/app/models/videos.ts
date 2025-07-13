import mongoose ,{ Schema , model ,models} from "mongoose";
import bcrypt from "bcryptjs";

export const video_dimensions = {
    width: 1080,
    height: 1920,
}as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    VideoUrl: string;
    thumbnailUrl: string;
    controls?:boolean;
    transformation?: {
        height: number;
        width: number;
        quality?: number;
    };
}

const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    VideoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    controls: {
        type: Boolean,
        default: true,
    },
    transformation: {
        height:{
            type: Number,
            default: video_dimensions.height,
        },
        width:{
            type: Number,
            min: 1,
            max:100
        },
    }},
    {
        timestamps: true,
    }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);
export default Video;