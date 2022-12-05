
const express = require('express')
const ToolsController = require('./controllers/ToolsController')

const router = express.Router()
const post = require('./controllers/post')
const user = require('./controllers/user')

/*
   #swagger.tags = ['Users']
   #swagger.summary = '유저 phone 수정'
 */
router.use(post)

/*
   #swagger.tags = ['Users']
   #swagger.summary = '유저 phone 수정'
 */
router.use(user)

/*
function store(req:any, res:any) {
    const tools = {}
    return res.status(201).send({})
}
*/

module.exports = router