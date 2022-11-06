const mongoose=require("mongoose")
const ProjectSchema=mongoose.Schema({
     project_title:{type:String,require:true},
      details:{type:String,require:true},
      deploy_link:{type:String,require:true},
      github_link:{type:String,require:true}
})
const ProjectModel=mongoose.model("project",ProjectSchema)
module.exports={ProjectModel}