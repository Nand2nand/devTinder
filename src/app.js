const express = require("express");
const connectDB  = require("./config/database");
const User = require("./models/user");
const app = express();


app.post("/signup", async(req,res)=>{
    const userObj = {
        firstName: "virat",
        lastName: "kholi",
        emailId: "virat@kholi.com",
        password: "virat@123",
    };
    // creating a new instance of the User model
    const user = new User(userObj);
    try {
        await user.save();
        res.send("User Added successfully!")
    } catch (error) {
        res.status(400).send("Error saving the user:" + err.message);
    }
   
});


connectDB()
.then(()=>{
    console.log("Database connection established");
    app.listen(7777,()=>{
        console.log("server is successfullly listening to 7777");
    });
})
.catch((err)=>{
    console.log("Database cannot be connected!!");
})


