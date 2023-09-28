import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";



export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address , answer } = req.body
        
        // validation 
        if (!name) {
            return res.send({ message: 'Name is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!password) {
            return res.send({ message: 'Password is Required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone no is Required' })
        }
        if (!address) {
            return res.send({ message: 'Address is Required' })
        }
        if (!answer) {
            return res.send({ message: 'Answer is Required' })
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered please login!'
            })
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userModel({ name,
             email, answer, address, phone, password: hashedPassword  }).save();

        res.status(201).send({
            success: true,
            message: "User Registered Success!",
            user
        })



    } catch (error) {
        console.log(`Error While Registration ${error}`)
        res.status(500).send({
            success: false,
            message: 'Error in Registration..',
            error
        })
    }
};

export const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid username or password'
            })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email not registered!"
            })
        }

        const match = await comparePassword(password, user.password);

        // password match 
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password!'
            })
        }

        //TOKEN Authentication

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).send({
            success: true,
            message: "Login Successfully!!",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role : user.role

            },
            token
        })








    } catch (error) {
        console.log(`Error While Login ${error}`)
        res.status(500).send({
            success: false,
            message: 'Error in Login..',
            error
        })
    }

}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;

        if (!email) {
            res.status(400).send({ message: 'Email is Required' })
        }
        if (!newPassword) {
            res.status(400).send({ message: ' New Password is Required' })
        }
        if (!answer) {
            res.status(400).send({ message: 'Question is Required' })
        }

        const user = await userModel.findOne({ email, answer });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: " Wrong Email or answer"
            })
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password updated Successfully!!"
        }
        )






    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Forgot Password..',
            error
        })

    }
}

export const testController = (req, res) => {

    try {
        res.status(200).send({
            success: true,
            message: "Protected test route "
        }

        )
        console.log("Protected Test controller is here bro!!!!")

    } catch (error) {
        console.log("error in testcontroller")
    }


}


export const updateProfileController = async(req , res)=>{

    try {
        const {name  , phone , address ,password}  = req.body;
        const user =  await userModel.findById(req.user._id);

        if(password && password.length < 6 ){
            return res.json({error : 'Password is required and 6 character long!!'});
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id , {
            name : name || user.name,
            password : hashedPassword || user.password,
            phone : phone || user.phone,
            address : address || user.address
        } , {new:true})
            console.log("updated user is ",updatedUser)
        res.status(200).send({
            success:true,
            message :"User Updated Successfully!!",
            updatedUser
        })



        
    } catch (error) {
        console.log("Error in profileupdate-Controller-->", error);
        res.status(500).send({
            success:false,
            message:"Error while updating Profile",
            error
        })
        
    }
}


export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };


  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };
  
