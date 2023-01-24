const Task = require('../model/model');

exports.getAllTask = async (req, res) => {
    try {
        const alltasks = await Task.find({})
        res.status(200).json({alltasks})
    } catch (error) {
        res.status(500).json({'msg': error})
    }
}

exports.getTask = async (req, res) => {
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID})

        if(!task)
            return res.status(404).json({'msg': 'No task found'})
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ 'msg': error })
    }
}

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({'msg': error})
    }
}

exports.updateTask = async (req, res) => {
    try {
        const taskID = req.params.id;
        const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
            new:true, runValidators:true
        })

        if(!task)
            return res.status(404).json({'msg': 'no task found to delete'})
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ 'msg': error})
    }
}

exports.deleteTask = async (req, res) => {
    try{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndDelete({_id:taskID})

    if(!task)
        return res.status(404).json({'msg': 'no task found to delete'})
    res.status(200).json({ task })
    }catch(err){
        res.status(500).json({'msg': err})
    }
}