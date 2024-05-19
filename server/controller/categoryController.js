import Category from "../schema/categorySchema.js";

//Controller functions to make CRUD for the Category Schema


export async function createCategory(req,res){
    try{
        if(!req.body){
            console.log("Empty Body");
            return;
        }
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    }catch(error){
        res.status(400).json({
            error : error.message
        })
    }
}


export async function getCategory(req,res){
    try{
        const category = await Category.find();
        res.status(200).json(category);
    }catch(error){
        res.status(404).json({
            error:error.message
        })
    }
}

export async function getCatgeoryByIdOrName(req, res){
    try{
        const {id, name} = req.query;
        let category;
        if(id){
            category = await Category.findById(id);
        }
        else if(name){
            category = await Category.findOne({name});
        }
        else{
            res.status(400).json({error:'Please Provide Id or Name of the category'});
        }

        if(!category){
            return res.status(404).json({
                error:'Category not found'
            });
        }

        res.status(200).json(category);
    }catch(error){
        res.status(400).json({
            error:error.message
        })
    }
}


export async function editCategory(req,res){
    try{
        const {categoryId} = req.params;
        //Method to return the udpadted doucument rather than original document before update 
        //Also the validation rule is strictly applied while updating 
        const category = await Category.findByIdAndUpdate(categoryId,req.body, {new:true, runValidators:true});
        if(!category){
            return res.status(404).json({
                error:'Category cannot be updated'
            })
        }
        res.status(200).json(category);
    }catch(error){
        res.status(400).json({
            error:error.message
        })
    }
}

export async function deleteCategory(req,res){
    try{
        const {categoryId} = req.params;
        await Category.findByIdAndDelete(categoryId);
        res.status(200).json({
            message:'Category Deleted'
        })
    }catch(errro){
        res.status(400).json({
            message:'Cannot delete category'
        })
    }
}