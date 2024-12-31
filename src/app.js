const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // creating a new instance of the User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added successfully!");
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
  }
});

//Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if(!user){
        res.status(400).send("user not found");
    }else{
        res.send(user)
    }
    // const user = await User.find({ emailId: userEmail });
    // if (user.length === 0) {
    //   res.status(400).send("user not found");
    // } else {
    //   res.send(user);
    // }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//Feed API - GET /feed - get all the users from the database
app.get("/feed", async(req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//delete a user from the database
app.delete("/user", async (req,res)=>{
    const userId = req.body.userId
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
    res.status(400).send("Something went wrong");
        
    }
})

//update data of the user
app.patch("/user/:userId", async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["userId","photoUrl","about","gender","age","skills"];
        const isUpdateAllowed = Object.keys(data).every((k)=>(
            ALLOWED_UPDATES.includes(k)
        ))
        if(!isUpdateAllowed){
            throw new Error("update not allowed")
        }
        if(data?.skills.length > 10){
            throw new Error("Skills cannot be more than 10");
        }
       const user =  await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after",runValidators:true });
        res.send("User updated successfully");
    } catch (error) {
        res.status(400).send("UPDATE FAILED"+ error.message);
    }
})

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("server is successfullly listening to 7777");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });
