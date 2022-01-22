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
        select: {
            favorites: true,
            posts: {
                select: {
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
                        }
                    },
                }
            }
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
