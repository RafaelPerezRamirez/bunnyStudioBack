const User = require('../models/User')
const { validationResult } = require('express-validator');

exports.createUser = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { name } = req.body;

    try {
        let userExist = await User.findOne({ name });

        if(userExist){
            return res.status(400).json({ msg: 'The user already exists' });
        }

        let user = new User(req.body);
        await user.save();
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(400).send('An error ocurred');
    }
}

exports.getUsers = async (req, res) =>{
    try {
        const users = await User.find({});
        if(users.length > 0){
            res.json({ users })
        }else{
            return res.status(404).json({ msg: 'There are no users' });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('An error ocurred');
    }
}

exports.updateUser = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { name } = req.body;
        let userExist = await User.findById(req.params.id);

        if(!userExist){
            return res.status(404).json({msg: 'The user does not exist'})
        }

        const newUser = {}
        if(name){
            newUser.name = name
        }
        userExist = await User.findOneAndUpdate({_id: req.params.id}, newUser, {new: true})

        res.json({ userExist })
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred')
    }
}

exports.deleteUser = async (req, res) =>{
    try {
        let userExist = await User.findById(req.params.id);

        if(!userExist){
            return res.status(404).json({msg: 'The user does not exist'})
        }

        await User.findOneAndRemove({_id: req.params.id})
        res.json({ msg: 'User deleted' })
    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred')
    }
}