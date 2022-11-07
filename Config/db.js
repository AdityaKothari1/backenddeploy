const moongose=require("mongoose")
require("dotenv").config()
const connection=moongose.connect(process.env.Mongo_URL)
module.exports={connection}