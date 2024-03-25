import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
    },
    google : {
      type : Boolean
    },
    moderator : {
      type : Boolean
    },
    password : {
      type : String, 
      required : true,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

const user = mongoose.model("user", userSchema);

export default user;
