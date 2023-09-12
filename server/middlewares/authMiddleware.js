// import JWT from "jsonwebtoken";
// import userModel from "../models/userModel.js";

// export const requireSignIn = async (req, res, next) => {
//     try {
        
//         // console.log(process.env.JWT_SECRET)
//         const token = req.headers.authorization;
//         const decode = JWT.verify(
//             token,
//             process.env.JWT_SECRET 
            
//             );
//         req.user = decode;
//         next();



//     } catch (error) {
//         console.log("Error while requireSignIn middleware---> " ,  error)
//     }
// }



// export const isAdmin = async(req , res , next)=>{
//     console.log("this is ertyuijkhgfdsxcvbn user --->",req.body)

//     try {
//             const user  = await userModel.findById(req.user._id);
//             console.log(user);
//             if(user.role !==1){
//                 return res.status(200).send({
//                     success:false,
//                     message:"Unauthorised Access!!"
//                 })
//             }
//             else{
//                 next();
//             }

        
//     } catch (error) {
//         console.log(error);
//         res.status(401).send({
//             success:false,
//             error,
            
//             message:"Error in admin middleware"
//         })
//     }

// }

import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
        // console.log("decode is ", decode)

    req.user=decode;
    next();
  } catch (error) {
    console.log("error while token verification ", error.message);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
     console.log("user role is ",user.role);
    if (user.role !== 1) {
      return res.status(200).send({ success: false, message: "unAuthorized Access" });
    } else {
        console.log("oooo")
      next();
    }
  } catch (error) {
    console.log("error in admin ", error.message);
    res.status(401).send({success:false,message:"unauthorized access", error})
  }
};