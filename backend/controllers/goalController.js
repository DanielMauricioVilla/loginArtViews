const asyncHandler = require ('express-async-handler')

const Goal = require ('../models/productModel')
const UserE = require ('../models/userEModel')

//@desc   Get goals
//@route GET /api/goal
//@acess Private
const getGoal = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ userE: req.userE.id })

    res.status(200).json(goals)
})

//@desc   Set goals
//@route POST /api/goal
//@acess Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        name: req.body.name,
        img: req.body.img,
        category: req.body.category,
        price: req.body.price,
        cant: req.body.cant,
        description: req.body.description,
        userE: req.userE.id 
    })
    
    res.status(200).json(goal)
})

//@desc   Update goal
//@route PUT /api/goals/:id
//@acess Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status (400)
        throw new Error('Goal not found')
    }

    //Chaeck for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user maches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not autorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
})

//@desc   Delete goal
//@route DELETE /api/goals/:id
//@acess Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status (400)
        throw new Error('Goal not found')
    }

    //Chaeck for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user maches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not autorized')
    }

    await Goal.findByIdAndDelete(goal)

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
}