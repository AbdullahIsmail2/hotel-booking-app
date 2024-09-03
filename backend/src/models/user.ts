import mongoose, { Schema } from 'mongoose'

export type UserType =  {
  _id: string,
  firstname: string,
  lastName: string,
  email: string
  password: string,
}


const userSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
})

const User = mongoose.model('User', userSchema)

export default User