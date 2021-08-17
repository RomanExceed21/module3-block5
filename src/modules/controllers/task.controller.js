const Task = require('../../db/models/task/index.js')

module.exports.getAllTasks = (req, res, next) => {
  Task.find().then(result => {
    res.send({data: result});
  });
}

module.exports.createNewTasks =  (req, res, next) => {
  const task = new Task(req.body);
  task.save().then(result => {
    Task.find().then(result => {
      res.send({data: result});
    })
  })
};

module.exports.changeTaskInfo = (req, res, next) => {
  Task.updateOne({_id: req.body._id}, req.body).then(result => {
    Task.find().then(result => {
      res.send({data: result});
    });
  });
};

module.exports.deleteTask = (req, res, next) => {
  Task.deleteOne({_id: req.query._id}).then(result => {
    Task.find().then(result => {
      res.send({data: result});
    })    
  });
};