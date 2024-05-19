import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    taxApplicability: {
        type:Boolean,
        required: true,
    },
    tax:{
        type: Number,
        validate: {
            validator : function (value){
                if(this.taxApplicability && (value === null || value === undefined)){
                    return false;
                }
                return true;
            },
            message: 'Tax is required if tax applicability is true'
        }
    },
    
    taxType: String,


    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory'
    }],

    items:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

const Category = mongoose.model('Category',categorySchema);

export default Category;