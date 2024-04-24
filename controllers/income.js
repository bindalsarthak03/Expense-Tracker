const IncomeSchema = require('../models/incomeModel')
const UserSchema = require('../models/userModel')
require('dotenv').config();
const jwt = require('jsonwebtoken')
exports.addIncome = async (req, res) => {
    // console.log(req.body)
    const token = req.headers['cookie'].split('=')[1];
    if (!token) if (!token) return res.status(401).json({ message: 'Access Denied!' })
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;
    // console.log(userId)
    const user = await UserSchema.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { title, amount, category, description, date } = req.body;
    const income = new IncomeSchema({
        title,
        amount,
        date,
        category,
        description,
        user: userId // Assign the user's ObjectId to the income
    });
    try {
        //validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number' })
        }
        await income.save();
        console.log("Income", income);
        user.incomes.push(income)
        await user.save();
        res.status(200).json({ message: 'Income saved successfully!' })
    } catch (err) {
        res.status(500).send(err);
    }
}


exports.getIncomes = async (req, res) => {
    try {
        const token = req.headers['cookie'].split('=')[1];
        if (!token) return res.status(401).json({ message: 'Access Denied!' })
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.userId;
        const userIncomes = await UserSchema.findById(userId).populate('incomes');
        return res.status(200).json(userIncomes)
    } catch (error) {
        res.status(501).send(error)
    }
}

exports.deleteIncome = async (req, res) => {
    try {
        const token = req.headers['cookie'].split('=')[1];
        if (!token) return res.status(401).json({ message: 'Access Denied!' })
        const incomeId = req.params.id;
        const deletedIncome =await IncomeSchema.findOneAndDelete({_id:incomeId});
        if (!deletedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }
        const user = await UserSchema.findById(deletedIncome.user);
        if(!user)  return res.status(404).json({ message: 'User not found' });
        await user.incomes.pull(incomeId)
        await user.save();
        res.status(200).json({message:'Income deleted successfuly'})
    } catch (error) {
        res.status(500).send(error)
    }

}

