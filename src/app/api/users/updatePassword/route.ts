
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        console.log("resetpassword request body => ", reqBody)

        const { password,token} = reqBody

        console.log("token => ",token);

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});
        console.log(user)
        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log();
         //hash password
         const salt = await bcryptjs.genSalt(10)
         const hashedPassword = await bcryptjs.hash(password, salt)

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        user.password=hashedPassword
        await user.save();
        
        return NextResponse.json({
            message: "Password Reset successfull",
            success: true
        })


    } catch (error) {
        return new Response("Error Updating Password", { status: 500 });
    }
};