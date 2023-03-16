const asyncHandler = require ('express-async-handler')

//@desc   Get goals
//@route GET /api/goal
//@acess Private
const getGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get goals'})
})

//@desc   Set goals
//@route POST /api/goal
//@acess Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    
    res.status(200).json({ message: 'Set goals'})
})

//@desc   Update goal
//@route PUT /api/goals/:id
//@acess Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` })
})

//@desc   Delete goal
//@route DELETE /api/goals/:id
//@acess Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}`})
})

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
}