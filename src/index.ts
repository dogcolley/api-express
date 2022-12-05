import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output");



const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));


/* Routes */
const router = require('./routes')

/* Middlewares */
app.use(router)

app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
