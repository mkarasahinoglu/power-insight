import mongoose, { mongo } from "mongoose"

export const UserSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true
  },
  password : {
    type: String,
    required: true
  },
  role : {
    type : String,
    required: true
  }
})

export interface IUser extends mongoose.Document {
  name: string
  email: string
  password: string
  role: string
}