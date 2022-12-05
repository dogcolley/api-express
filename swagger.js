const swaggerAutogen = require("swagger-autogen")();

const doc = {
 info: {
   title: "lb-api",
   description: "express-prisma-mysqlite-swagger",
 },
 host: "localhost:3000",
 schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/index.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);