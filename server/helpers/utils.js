import bcrypt from "bcrypt";

import JWT from "jsonwebtoken";




export const hashPassword=async(password)=>{

    try{

        const saltRounds=10;
        const hashedPassword= await bcrypt.hash(password,saltRounds);

        return hashedPassword;

    }

    catch(error){
        console.log("Error while encrypting password ",error.message);
        
    }

}

export const comparePassword= async(hashedPassword, password)=>{
    return bcrypt.compare(hashedPassword,password);
}



export const getToken=async(id)=>{
    const token = await JWT.sign({ _id: id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
}