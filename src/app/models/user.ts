import mongoose ,{ Schema , model ,models} from "mongoose";
import bcrypt from "bcryptjs";
export interface IUser {
    _id?: mongoose.Types.ObjectId;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}


const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}
,{
    timestamps: true,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        throw new Error("Error hashing password");
    }
});



const User = models.User || model<IUser>("User", userSchema);
export default User;