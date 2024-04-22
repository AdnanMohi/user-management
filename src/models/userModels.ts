import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    role: 'admin' | 'manager' | 'user'; 
    forgotPasswordToken?: string;
    forgotPasswordTokenExpiry?: Date;
    verifyToken?: string;
    verifyTokenExpiry?: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["user", "admin","manager"],
        default: "user",
    },
   
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model<UserDocument>("users", userSchema);

export default User;