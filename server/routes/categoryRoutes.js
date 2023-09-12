import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';


const router = express.Router();

//routes
//Create Categories || POST
router.post('/create-category' , requireSignIn , isAdmin , createCategoryController);

//Update Existing Categories || PUT
router.put('/update-category/:id' , requireSignIn , isAdmin , updateCategoryController);

//Get All Categories || GET
router.get('/get-category' , categoryController);

//Get Single Category || GET
router.get('/single-category/:slug' , singleCategoryController);

//Delete Particular Category || delete

router.delete('/delete-category/:id' , requireSignIn , isAdmin , deleteCategoryController)


export default router;

