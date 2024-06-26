const { Schema, model } = require("mongoose");
const validator = require('validator');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        Unique: true,
        validate: [
          validator.isEmail,'invalid email'
        ]
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
    );

    userSchema.virtual('friendCount').get(function () {
        return this.friends.length;
    });

    const User = model("user", userSchema);

    module.exports = User;
    