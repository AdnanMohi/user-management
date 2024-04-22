import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
       console.log("request body => ", reqBody)

        const { email} = reqBody

        console.log(email);

        //check if userEmail exists in Db
        const user = await User.findOne({email})
       

        if(user){
            
        //send verification email

        await sendEmail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({
            message: "Reset Email Sent successfully",
            success: true,
            
        })
        

        }
        else{
            return NextResponse.json({error: "User doesn't exists"}, {status: 400})

        }

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
