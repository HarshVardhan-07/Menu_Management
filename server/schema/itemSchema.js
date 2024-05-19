import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    taxApplicability:{
        type:Boolean,
        required:true,
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
    baseAmount:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
    },
    subcategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
    
},{
    toJSON: {virtuals:true},
    toObject: {virtuals: true}
});

//Defining virtual property

itemSchema.virtual('totalAmount').get(function(){
    return this.baseAmount - (this.discount || 0);
});

const Item = mongoose.model('Item', itemSchema);

export default Item;