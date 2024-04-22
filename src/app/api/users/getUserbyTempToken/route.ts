
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token} = reqBody

  
        //check if userEmail exists in Db
        const user = await User.findOne({forgotPasswordToken: token});
        console.log()
        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
            data:user
        })


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}