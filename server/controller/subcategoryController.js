import Category from "../schema/categorySchema.js";
import Subcategory from "../schema/subcategorySchema.js";

export async function createSubcategory(req,res){
    const {categoryId} = req.params;
    const {name, image , description, taxApplicability, tax} = req.body;

    try{
        const category = await Category.findById(categoryId);
        if(!category){
            return res.status(404).json({
                message:'Category not found'
            })
        }

        //creating new subcategory 

        const newSubcategory = new Subcategory({
            name,
            image,
            description,
            taxApplicability,
            tax,
            category:category._id
        });

        const savedSubcategory = await newSubcategory.save();
        category.subcategories.push(savedSubcategory._id);
        await category.save();

        res.status(201).json({
            message:'Subcategory created',
            subCategory:savedSubcategory
        })
    }catch(error){
        res.status(500).json({
            message:"Failed to create subcategory",
            error: error.message
        })
    }
}


export async function getSubcatagories(req,res){
    try{
        const subcategory = await Subcategory.find();
        res.status(200).json(subcategory);
    }catch(error){
        res.status(204).json({
            message:'Cannot fetch subcategories',
            error:error.message
        })
    }
}


export async function getSubcategoriesUnderCategory(req,res){
    try{
        const {categoryId} = req.params;

        // collecting all the subcategories reffed under the category schema
        const category = await Category.findById(categoryId).populate('subcategories') 

        if(!category){
            return res.status(404).json({
                message:'Category not found'
            })
        }
        res.json(category.subcategories);

    }catch(error){
        res.status(500).json({
            message:"Subcategory not found",
            error: error.message
        })
    }
}

export async function getSubcatagoryByNameOrId(req,res){
    try{
        const {id, name} = req.query;
        let subcategory;
        if(id){
            subcategory = await Subcategory.findById(id);
            return res.status(200).json({
                message:'Subcategory',subcategory
            })
        }
        else if(name){
            subcategory = await Subcategory.findOne({name:name});
            return res.status(200).json({
                message:'Subcategory',subcategory
            })
        }
        else{
                res.status(404).json({
                        message:'Name or Id required',
                })
        }

        if(!subcategory){
            return res.status(404).json({
                message:'Subcategory not found'
            })
        }

        res.status(200).json(subcategory);

    }catch(error){
        res.status(400).json({
            error:error.message
        })
    }
}

export async function editSubcategory(req,res){
    const { categoryId, subcategoryId } = req.params;
    const subcategoryData = req.body;

    try {
        const subcategory = await Subcategory.findByIdAndUpdate(subcategoryId, subcategoryData);
        //Checking if the subcategory belongs to specified catgeory
        if (!subcategory.category || subcategory.category.toString() !== categoryId) {
            return res.status(400).json({ error: 'Subcategory does not belong to the specified category' });
        }

        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteSubcategory(req,res){
    try{
        const {subcategoryId} = req.params;
        await Subcategory.findByIdAndDelete(subcategoryId);
        res.status(200).json({
            message:'Sub Category Deleted'
        })
    }catch(error){
        res.status(500).json({
            message:'Cannot delete subcategory',
            error:error.message
        })
    }
}