 
  const moongose=require("mongoose")
  const TodoSchema=moongose.Schema({
    taskname :{type:String,require:true},
    status:{type:String,require:true},
    tag:{type:String},
    email:{type:String}
  })

  const TodoModel=moongose.model("todo",TodoSchema)
  module.exports={TodoModel}