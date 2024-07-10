import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'

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

const Todo = mongoose.model("Todo", todoSchema);

const CompletedTodo = mongoose.model("CompletedTodo", completedSchema);

// const todo = new Todo({text: "first"});
// todo.save();

app.get("/", cors(), async (req, res)=>{
  try{
    const todoItems = await Todo.find();
    const completedtodo = await CompletedTodo.find()
    res.json({todoItems, completedtodo});
  }catch(err){
    console.log(err);
  }
})

app.post("/", async (req, res)=>{
    const todotext = req.body.text;
  try{
    const todo = new Todo({text: todotext});
    todo.save();
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
})

app.delete('/:id', async (req, res)=>{ 
  try{
    const id = req.params.id;
    await Todo.deleteOne({_id: id});
    await CompletedTodo.deleteOne({_id: id});
    then(
    res.redirect("/"))
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
    then(res.redirect("/"))
  }catch(err){
    console.log(err);
  }
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

