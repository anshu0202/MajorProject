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



export const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes'
    }
    const dm = decimal || 2;
    const sizes = ['BYTES', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '' + sizes[index];
}