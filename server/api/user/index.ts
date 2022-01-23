import { IncomingMessage, ServerResponse } from 'http'
import { isMethod, sendError } from 'h3'
import { createError } from '~/server/error-helpers'
import Prisma from '@prisma/client'

const prisma = new Prisma.PrismaClient();

export default async function viewProfile(req: IncomingMessage, res: ServerResponse) {
    if (!isMethod(req, 'GET')) {
        return sendError(res, createError(404))
    }

    if (!req.user) {
        return sendError(res, createError(401))
    }

    const user = await prisma.user.findUnique({
        /* select: { id: true, email: true, name: true, favorites: true }, */
        include: {
            favorites: true,
            posts: {
                include: {
                    favoritedBy: true,
                    author: true,
                    comments: {
                        select: {
                            id: true,
                            body: true,
                            postId: true,
                            authorId: true,
                            author: true,
                            post: true,
                        }},
                }
            },
            _count: { select: {
                favorites: true
            } }
        },
        where: { id: req.user.id }
    })

    return {
        ...user,
        password: undefined,
        createdAt: undefined,
        updatedAt: undefined
    }
}
