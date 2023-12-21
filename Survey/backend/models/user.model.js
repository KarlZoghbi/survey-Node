const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userType: {
        type: Number,
        required: true,
        
      },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 6,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 6,
    },
  });
  
  userSchema.pre(
    "save",
    async function (next) {
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      } catch (error) {
        console.log(error);
        next(error);
      }
    },
    {
      timestamps: true,
    }
  );
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;
  