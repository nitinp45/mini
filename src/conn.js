//we connect express application with mongodb

const mongoose=require("mongoose")
const jwt=require("jsonwebtoken");

mongoose.connect("mongodb://localhost:27017/signup").then(()=>{
    console.log(`connecting server`)
}).catch((e)=>{
    console.log(`no connection`)
})


//now we create a schema
const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
    },
    tokens:[{
        token :{
            type: String,
            required:true}

    }]
})

employeeSchema.methods.generateAuthToken=async function()
{
    try{
        console.log(this._id);
    const token=jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token: token});
    await this.save();
    return token;
    }
    catch(error)
    {
        console.log(error);
    }
}


//now we create a collection


const Register=new mongoose.model("Register",employeeSchema);
module.exports=Register;


