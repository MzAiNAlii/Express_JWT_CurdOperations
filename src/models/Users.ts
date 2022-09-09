import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,

    required: true,

    unique: true,

    maxlenght:30
  },
  password:
   {
    type: String,

    required: true,

    minlength: 8
  },
  
refreshToken: {
  type :String,

  require : false,

  default : " "
   
},

},

{
  timestamps:true

});

const Users = mongoose.model("Users", userSchema);

export default Users;