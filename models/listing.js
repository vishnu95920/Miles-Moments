const mongoose =require("mongoose");
const schema = mongoose.Schema; 
 
const listingschema=new schema({
    title:{type:String,
        required:true,
    },
    description:String,
    image:{type:String,
        default:" image",
        set:(v)=>v===""?"https://images.unsplash.com/photo-1741850821150-58b56e0e6156?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ":v,

    },
    price:Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("Listing",listingschema);
module.exports = Listing;