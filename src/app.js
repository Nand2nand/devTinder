const express = require("express");

const app = express();
const {adminAuth,userAuth} = require("./middlewares/auth")

app.use("/admin", adminAuth);
app.use("/user", userAuth);


app.get("/user",(req, res)=>{
    // logic of checking if the request is authorized
    res.send("User data sent");
});

app.get("/admin/getAllData",(req, res)=>{
    // logic of checking if the request is authorized
    res.send("All data sent");
});


app.get("/admin/deleteUser",(req, res)=>{
    res.send("Deleted user");
});


app.listen(7777,()=>{
    console.log("server is successfullly listening to 7777");
});