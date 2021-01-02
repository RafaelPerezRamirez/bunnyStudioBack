const Task = require('../models/Task');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { userId, description } = req.body;
        let userExist = await User.findById(userId);
        if(!userExist){
            return res.status(404).json({ msg: 'User does not exist' });
        }

        let taskExist = await Task.findOne({ description });
        if(taskExist){
            return res.status(400).json({ msg: 'The task already exists' });
        }

        let task = new Task(req.body);
        await task.save()
        res.json(task)
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred')
    }
    
}

exports.getTasks = async (req, res) =>{
    try {
        const { userId } = req.query;
        let userExist = await User.findById(userId);
        if(!userExist){
            return res.status(404).json({ msg: 'User does not exist' });
        }

        const tasks = await Task.find({ userId })
        if(tasks.length > 0){
            res.json({ tasks })
        }else{
            return res.status(404).json({ msg: 'There are no tasks' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred')
    }
}

exports.updateTask = async (req, res) =>{ 
    try {
        const { description, state } = req.body;

        let taskExist = await Task.findById(req.params.id);
        if(!taskExist){
            return res.status(404).json({msg: 'The task does not exist'})
        }

        const newTask = {}
        if(description){
            newTask.description = description
        }
        if(state){
            newTask.state = state
        }

        taskExist = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true})

        res.json({ taskExist })
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred')
    }
}

exports.deleteTask = async (req, res) =>{
    try {
        let taskExist = await Task.findById(req.params.id);
        if(!taskExist){
            return res.status(404).json({msg: 'The task does not exist'})
        }
        await Task.findOneAndRemove({_id: req.params.id})
        res.json({ msg: 'Task deleted' })
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred')
    }
}
