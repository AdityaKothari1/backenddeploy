 
  const moongose=require("mongoose")
  const UserSchema=moongose.Schema({
     email:{type:String,require:true},
     password:{type:String,require:true},
     ip:{type:String}
  })

  const UserModel=moongose.model("user",UserSchema)
  module.exports={UserModel}