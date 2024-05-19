import express from "express";

import { getCategory, createCategory, getCatgeoryByIdOrName, editCategory, deleteCategory } from "../controller/categoryController.js";
import { createSubcategory, deleteSubcategory, editSubcategory, getSubcatagories, getSubcatagoryByNameOrId, getSubcategoriesUnderCategory } from "../controller/subcategoryController.js";
import { createItem, deleteItem, getItems, getItemsByIdOrName, getItemsUnderCategory, getItemsUnderSubCategory, updateItem } from "../controller/itemController.js";

const router = express.Router();


//Category routes
router.get("/categories", getCategory);
router.get("/categories/search",getCatgeoryByIdOrName)


router.post("/createcategory",createCategory );

router.patch("/categories/:categoryId", editCategory);

router.delete("/categories/:categoryId",deleteCategory);


//Subcategory routes
router.get("/categories/:categoryId/subcategories", getSubcatagories);
router.get("/categories/:categoryId/subcategories",getSubcategoriesUnderCategory );
router.get("/subcategories/search",getSubcatagoryByNameOrId);

router.post("/categories/:categoryId/subcategories", createSubcategory );

router.patch("/categories/:categoryId/subcategories/:subcategoryId", editSubcategory);

router.delete("/categories/:categoryId/subcategories/:subcategoryId",deleteSubcategory);



//Item route
router.get("/items",getItems);
router.get("/categories/:categoryId/subcategories/:subCategoryId",getItemsUnderCategory);
router.get("/categories/:categoryId/subcategories/:subCategoryId",getItemsUnderSubCategory);
router.get("/items/search",getItemsByIdOrName)

router.post("/categories/:categoryId/subcategories/:subCategoryId",createItem);

router.patch("/categories/:categoryId/subcategories/:subcategoryId/items/:itemId",updateItem);
router.delete("/categories/:categoryId/subcategories/:subcategoryId/items/:itemId",deleteItem);




export default router;