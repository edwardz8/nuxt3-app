import { IncomingMessage, ServerResponse } from 'http'
import { isMethod, sendError, useBody } from 'h3'
import { createError } from '~/server/error-helpers'
import Prisma from '@prisma/client'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const prisma = new Prisma.PrismaClient()

export default async function register(req: IncomingMessage, res: ServerResponse) {
    if (!isMethod(req, 'POST')) {
        return sendError(res, createError(404))
    }

    if (req.user) {
        return sendError(res, createError(409, 'cannot register with authorized request'))
    }

    const { name, email, password } = await useBody<{
        name: string,
        email: string,
        password: string
    }>(req)

    if ([name, email, password].some(v => !v || typeof v != 'string')) {
        return sendError(res, createError(400, 'name, email and password are required'))
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        return sendError(res, createError(409, 'user with this email already exists'))
    }

    const passHash = await argon2.hash(password)
    const user = await prisma.user.create({data: {
        name,
        email,
        password: passHash,
    }})

    const token = jwt.sign({
        userId: user.id,
        name: user.name,
        email: user.email 
    }, process.env.JWT_SECRET)

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token
    }
}