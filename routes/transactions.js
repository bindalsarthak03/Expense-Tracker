const { registerUser, loginUser, signout } = require('../controllers/authentication')
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expense')
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income')
const router = require('express').Router()


/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email, password, and name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *               name:
 *                 type: string
 *                 description: User's name
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 * 
 * /api/v1/login:
 *   post:
 *    summary: Login a new user
 *    description: Login a new user with email and password and authenticate with JWT
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                description: User's email
 *              password:
 *                type: string
 *                format: password
 *                description: User's password
 *    responses:
 *       '200':
 *         description: Successful Login
 *         content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          token:
 *                              type: string
 *                              description: JWT for authentication
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 *
 * /api/v1/signout:
 *  post:
 *      summary: Signout a user
 *      description: Sign out a user
 *      requestBody:
 *          required: false
 *      responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 * 
 * /api/v1/add-income:
 *  post:
 *      summary: Add income
 *      requestBody:
 *          required: true
 *          schema:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                  amount:
 *                      type: string
 *                  category:
 *                      type: string
 *                  description:
 *                      type: string
 *                  date:
 *                      type: string
 *                      format: date
 *      responses:
 *          '200':
 *              description: OK
 *          '400':
 *              description: Bad Requrest
 *          '500':
 *              description: Internal Server Error
 * 
 * /api/v1/get-incomes:
 *  get:
 *      summary: Get incomes
 *      description: Get incomes of a user
 *      security: 
 *          -jwt: []
 *      responses:
 *          '200':
 *              description: successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $refs:#models/incomeModel
 *          '401':
 *              description: Unauthorized - JWT token missing or invalid
 *          '500':
 *              description: Internal server error
 *      securitySchema:
 *          jwt_auth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      
 *      
 *
 *          
 *  
 *  
 */



//login signup api
router.post('/register', registerUser)
    .post('/login', loginUser)
    .post('/signout', signout)

//income api
router.post('/add-income/', addIncome)
    .get('/get-incomes/', getIncomes)
    .delete('/delete-income/:id', deleteIncome)

//expense api
router.post('/add-expense', addExpense)
    .get('/get-expenses', getExpenses)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router
