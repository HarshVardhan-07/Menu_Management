import Category from "../schema/categorySchema.js";
import Subcategory from "../schema/subcategorySchema.js";
import Item from "../schema/itemSchema.js";

export async function createItem(req,res){
    try{
        if(!req.body){
            console.log("Empty body");
            return;
        }

        //Category -> Subcategory -> Items
        //using the id of both category and subcategory so that the item is created under the 
        //specified category and subcategory

        const {categoryId, subCategoryId} = req.params;
        const {name, image, description, taxApplicability, tax, baseAmount, discount} = req.body;

        const category = await Category.findById(categoryId);
        const subcategory = await Subcategory.findById(subCategoryId);

        const newItem = new Item({
            name,
            image,
            description,
            taxApplicability,
            tax,
            baseAmount,
            discount,
            category: categoryId,
            subcategory: subCategoryId
        });
        
        //saving all the changes in the database 

        const savedNewItem = await newItem.save();

        //Items to be pushed inside the array which is specified in both category and subcategory schema
        //This ensures we get correct items based on their subcategory and category
        category.items.push(savedNewItem._id);
        subcategory.items.push(savedNewItem._id);
        
        await category.save();
        await subcategory.save();

        res.status(201).json(newItem);
    }catch(error){
        res.status(400).json({
            error : error.message
        });
    }
}

export async function getItems(req,res){
    try{
        const items = await Item.find();
        res.status(200).json(items);
    }catch(error){
        res.status(404).json({
            message:'Items not found',
            error: error.message
        });
    }
}

export async function getItemsUnderCategory(req,res){
    try{
        
        const {categoryId} = req.params;
        // collecting all the items refferenced under category
        const category = await Category.findById(categoryId).populate('items'); 
        
        if(!category){
            return res.status(404).json({
                message:'Category not found'
            })
        }
        
        res.status(200).json(category.items);


    }catch(error){
        res.status(404).json({
            message:'Items not present',
            error:error.message
        })
    }
}

export async function getItemsUnderSubCategory(req,res){
    try{
        const {subCategoryId} = req.params;
        //collecting all the items refferenced under the subcategory
        const subcategory = await Subcategory.findById(subCategoryId).populate('items'); 

        if(!subcategory){
            return res.status(404).json({
                message:'Subcategory not found'
            })
        }

        res.json(subcategory.items);
    }catch(error){
        res.status(500).json({
            message:'Items not found',
            error:error.message
        })
    }
}

export async function getItemsByIdOrName(req,res){
    try{
        const {id, name} = req.query;
        let item;
        if(id){
            item = await Item.findById(id);
        }
        else if(name){
            item = await Item.findOne({name:name});
        }
        else{
            res.status(400).json({
                error:'Please Provide name or id'
            })
        }

        if(!item){
            return res.status(404).json({
                error:'Item not found'
            })
        }

        res.json(item);
    }catch(error){
        res.status(400).json({
            error:error.message
        })
    }
}


export async function updateItem(req,res){
    try{
        const {categoryId, subcategoryId, itemId} = req.params;
        const itemData = req.body

        const subcategory = await Subcategory.findOne({_id:subcategoryId, category: categoryId});

        if(!subcategory){
            return res.status(404).json({
                error: 'Subcategory dose not belong to specified category'
            })
        }

        const item = await Item.findOneAndUpdate(
            {_id: itemId, subcategory: subcategoryId,},
            itemData,
            {new:true, runValidators:true}
            
        )
        res.status(200).json(item);
    }catch(error){
        res.status(404).json({
            message:'Item not found',
            error:error.message
        })
    }
}

export async function deleteItem(req,res){
    try{
        const {categoryId, subcategoryId, itemId} = req.params;

        const subcategory = await Subcategory.findOne({
            _id: subcategoryId, category:categoryId
        })

        if(!subcategory){
            return res.status(404).json({
                error: 'Subcategory dose not belong to specified category'
            })
        }

        const item = await Item.findOneAndDelete({
            _id:itemId,
            subcategory: subcategoryId,
            category: categoryId
        })

        console.log(item);
        if(!item){
            return res.status(404).json({
                message:'Item cannot be deleted'
            })
        }
        // Remove the item reference from the subcategory
        await Subcategory.updateOne(
            { _id: subcategoryId },
            { $pull: { items: itemId } }
        );

        // Remove the item reference from the category
        await Category.updateOne(
            { _id: categoryId },
            { $pull: { items: itemId } }
        );
        return res.status(200).json({
            message:'Item deleted'
        })
    }catch(error){
        res.status(404).json({
            message:'Item not found',
            error:error.message
        })
    }
}