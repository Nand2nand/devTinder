const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Nand:Nand280494@namastenode.myiod.mongodb.net/devTinder")
}
module.exports = connectDB