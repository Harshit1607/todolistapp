import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const app = express();
const port = 5000;


mongoose.connect('mongodb://localhost:27017/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const todoSchema = new mongoose.Schema({
  text : {
    type : String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const completedSchema = new mongoose.Schema({
  text : {
    type : String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
})

const userSchema = new mongoose.Schema({
  user : {
    type: String,
    required: true,
    unique: true
  },
  email : {
    type: String,
    required: true,
  },
  pass : {
    type: String,
    required: true
  }
})

const Todo = mongoose.model("Todo", todoSchema);
const CompletedTodo = mongoose.model("CompletedTodo", completedSchema);
const User = mongoose.model("User", userSchema);


app.get("/", cors(), auth, async (req, res)=>{
  try{
    const todoItems = await Todo.find();
    const completedtodo = await CompletedTodo.find()
    res.json({todoItems, completedtodo});
  }catch(err){
    console.log(err);
  }
})

app.post("/", cors(), async (req, res)=>{
    const todotext = req.body.text;
  try{
    const todo = new Todo({text: todotext});
    await todo.save();
    const todoItems = await Todo.find();
    const completedtodo = await CompletedTodo.find()
    res.json({todoItems, completedtodo});
  }catch(err){
    console.log(err);
  }
})

app.delete('/:id', cors(), async (req, res)=>{ 
  try{
    const id = req.params.id;
    await Todo.deleteOne({_id: id});
    await CompletedTodo.deleteOne({_id: id});
    const todoItems = await Todo.find();
    const completedtodo = await CompletedTodo.find()
    res.json({todoItems, completedtodo});
  }catch(err){
    console.log(err);
  }
})

app.patch('/:id', async (req, res)=>{ 
  try{
    const id = req.params.id;
    const todo = await Todo.findById(id);
    const newtext = todo.text;
    console.log(todo);
    const newTodo = await new CompletedTodo({text: newtext});
    await newTodo.save();
    await Todo.deleteOne({_id: id});
    const todoItems = await Todo.find();
    const completedtodo = await CompletedTodo.find()
    res.json({todoItems, completedtodo});
  }catch(err){
    console.log(err);
  }
})

app.post('/signup', async (req, res)=>{
  const {user, email, pass} = req.body;
  try{
    const existingUser = await User.findOne({email});

    if(existingUser){
      return res.json({message: 'user already exists'})
    }
    const hashedpass = await bcrypt.hash(pass, 10);
    const newUser = new User({user, email, pass: hashedpass});
    await newUser.save();

    const token = jwt.sign({email: newUser.email, id: newUser._id}, 'secret', { expiresIn: '1h' })

    return res.json({newUser, token, message: 'signed up'})
    
      }
  catch (err){
    console.log(err);
  }
})

app.post('/login', async(req, res)=>{
  const {user, email, pass} = req.body;
  try {
    const existingUser = await User.findOne({email});

    if(!existingUser){
      return res.json({message: 'user does not exist'})
    }

    const isPassCorrect = await bcrypt.compare(pass, existingUser.pass);

    if(!isPassCorrect){
      return res.json({message: 'Pass incorrect'})
    }

    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'secret', { expiresIn: '1h' })

    res.json({existingUser, token, message: 'logged in'})
    
  } catch (error) {
    
  }
})

async function auth(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);
  if(!token){
    return res.status(401).json({message: 'authprization failed'})
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
  }

}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

