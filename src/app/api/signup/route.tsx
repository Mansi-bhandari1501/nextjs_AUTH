import User from "@/models/User";
import bcrypt from "bcryptjs";
import {NextResponse} from "next/server";
import connect from "@/utils/db"

export const POST = async(request:any)=>{
    const{email,password} = await request.json();
    await connect();
    
    const existingUser = await User.findOne({email});
    if(existingUser){
        return new NextResponse("Email is already exist",{status:400});
    }
    const hashedPassword = await bcrypt.hash(password,5);
    console.log(email,password,hashedPassword);
    const newUser = new User({
        email,
        password:hashedPassword,
    })
    try{
        await newUser.save();
        return new NextResponse("user is register",{status:200});

    }catch(err:any){
        return new NextResponse(err,{
            status: 500,
        });
    }
}