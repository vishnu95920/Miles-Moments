const express = require("express");
const app=express();

const mongoose = require("mongoose");
const Listing =  require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride('_method'));
const ejsmate = require("ejs-mate");
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, 'public')));


async function main() {
    await mongoose.connect( 'mongodb://127.0.0.1:27017/kakshaSutra')
    
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true})); //to parse form data

main()
.then(()=>
{
    console.log("connected to db");
})
.catch((err)=>
{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.send("hi ,i am root");
});
//index route

app.get("/listings", async (req,res)=>{
  const alllisting = await Listing.find({});
  res.render("listings/index.ejs", {alllisting});

})
//new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});
//show route
app.get("/listings/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        console.log(listing); // Add this line
        if (!listing) {
            return res.status(404).send("Listing not found");
        }
        res.render("listings/show.ejs", { listing });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

//create route
app.post("/listings", async (req,res)=>
{
    const newlisting = new Listing(req.body);
    await newlisting.save();
    res.redirect(`/listings/${newlisting._id}`);
});

//edit route
app.get("/lsitings/:id/edit", async (req,res)=> 
    {
      let {id} = req.params;
      const listing = await Listing.findById(id);
      res.render("listings/edit.ejs",{listing});
    });
//update route
app.put("/listings/:id", async (req,res)=>
{
    let {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body, {runValidators:true, new:true});
    res.redirect(`/listings/${listing._id}`)
});   

app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});


app.listen(8080,()=>
{
    console.log(`server is listening to 8080`)

});

