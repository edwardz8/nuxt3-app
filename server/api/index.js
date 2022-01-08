import express from 'express'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

/** 
 * logic for our api will go here
 */
export default {
    path: '/server/api/index.js',
    handler: app
}