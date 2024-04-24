const ExpenseSchema = require('../models/expenseModel')
const UserSchema = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.addExpense = async (req, res) => {
    // console.log(req.body)
    const token = req.headers['cookie'].split('=')[1];
    if (!token) res.status(401).json({ message: 'Access Denied' });
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;
    const user = await UserSchema.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' })
    const { title, amount, category, description, date } = req.body;
    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        user: userId
    })
    try {
        //validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number' })
        }
        await expense.save()
        user.expenses.push(expense)
        await user.save();
        res.status(200).json({ message: 'expense saved successfully!' })
    } catch (err) {
        res.status(500).send(err);
    }
}


exports.getExpenses = async (req, res) => {
    try {
        const token = req.headers['cookie'].split('=')[1];
        if (!token) return res.status(401).json({ message: 'Access Denied' });
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.userId;
        const userExpense = await UserSchema.findById(userId).populate('expenses');
        res.status(200).json(userExpense)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const token = req.headers['cookie'].split('=')[1];
        if (!token) return res.status(401).json({ message: 'Access Denied' });
        const expenseId = req.params.id;
        const deletedExpense = await ExpenseSchema.findOneAndDelete({ _id: expenseId });
        if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });
        const user = await UserSchema.findById(deletedExpense.user);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.expenses.pull(expenseId);
        await user.save();
        res.status(200).json({ message: 'Expense Deleted Successfuly' });
    } catch (error) { res.status(500).send(error) }
}