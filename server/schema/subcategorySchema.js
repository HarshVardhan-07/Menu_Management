import mongoose from "mongoose";
import Category from "./categorySchema.js";
const subcategoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    taxApplicability:{
        type:Boolean
    },
    tax:{
        type:Number,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
})

//Middelware to set defult value for taxApplicability

//this function will run before the document is saved


subcategoriesSchema.pre('save', async function(next){
    
    //Middelware to run when the document is newly created
    //No pre created data will be updated
    if(this.isNew){
        try{
            const category = await Category.findById(this.category);
            if(category){
                //Applied when catgeory have pre defined taxApplicabilty and subcategory req.body has empty value for the tax Applicabolity
                if(this.taxApplicability === undefined){
                    this.taxApplicability = category.taxApplicability;
                }
                
                if(this.tax === undefined){
                    this.tax = category.tax;
                }
            }
        }catch(error){
            return next(error);
        }
    }
    next(); //The middelware has performed it's action and now the save operation can proceed.
})


const Subcategory = mongoose.model('Subcategory', subcategoriesSchema);

export default Subcategory;