const dotenv=require("dotenv").config();
const express=require("express");
const expressLayouts=require("express-ejs-layouts");
const ejs=require("ejs");
const path=require("path");
const exp = require("constants");

const app=express();
const birimCevirRouter=require("./src/routers/birimCevirRouter");

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./src/views"))

app.use(expressLayouts);
app.use("/",birimCevirRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server ${process.env.PORT} portta aktif!`);
})