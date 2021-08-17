const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require("mongoose");
const app = express();

const apiRoutes = require("./src/modules/routes/routes");

// const Schema = mongoose.Schema;

// const taskScheme = new Schema({
//   text: String,
//   isCheck: Boolean
// });

// const Task = mongoose.model("tasks", taskScheme);

app.use(cors());

const uri = "mongodb+srv://roman:MonLog8@91@cluster0.fnxul.mongodb.net/TestEducayionDB?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(bodyParser.json());
app.use("/", apiRoutes);

// app.get('/allTasks', (req, res) => {
//   Task.find().then(result => {
//     res.send({data: result});
//   });
// });

// app.post('/createTask', (req, res) => {
//   const task = new Task(req.body);
//   task.save().then(result => {
//     Task.find().then(result => {
//       res.send({data: result});
//     });
//   });
// });

// app.delete('/deleteTask', (req, res) => {
//   Task.deleteOne({_id: req.query._id}).then(result => {
//     Task.find().then(result => {
//       res.send({data: result});
//     });    
//   });
// });

// app.patch('/updateTask', (req, res) => {
//   Task.updateOne({_id: req.body._id}, req.body).then(result => {
//     Task.find().then(result => {
//       res.send({data: result});
//     });
//   });
// });

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});