import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";



export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Category Name is required!!" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(201).send({
                success: true,
                message: "Category Already Exists!!"
            })
        };

        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "New Category created success!!",
            category
        })




    } catch (error) {
        console.log("Error in create category Controller-->", error);
        res.status(401).send({
            success: false,
            message: "Error in Category Route Controller.."
        })
    }
};


export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true }

        );
        res.status(200).send({
            success: true,
            message: "Category Updated Success!!",
            category
        })




    } catch (error) {
        console.log("Error while updating category -->", error);
        res.status(500).send({
            success: false,
            message: "Error updating Category!!",
            error
        })

    }
};

export const categoryController = async (req, res) => {
    try {

        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "Your All categories",
            category
        })



    } catch (error) {
        console.log("Error While getting category in controller -->", error);
        res.status(500).send({
            success: false,
            message: "error While getting categories.."
        })
    }
};

export const singleCategoryController = async (req, res) => {
    try {

        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully!!",
            category
        });

    } catch (error) {
        console.log("Error while getting single category -->", error)
        res.status(500).send({
            success: false,
            message: "Error while getting single category..",
            error
        })
    }
};


export const deleteCategoryController = async(req ,res) =>{
    try {
        const {id} = req.params;

         await categoryModel.findByIdAndDelete(id);
         res.status(200).send({
            success:true,
            message:"Category Deleted Successfully!!"
         })
        
    } catch (error) {
        console.log("Error while deleteing category-->"  , error);
        res.status(500).send({
            success:false,
            message:"Error in Deleting Category..",
            error
        })
        
    }
}