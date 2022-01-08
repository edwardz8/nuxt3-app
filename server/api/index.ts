import express from 'express'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
    log: ['query']
})

const app = express()

export default async (req, res) => {
    return await prisma.post.findMany()
}

app.use(express.json())