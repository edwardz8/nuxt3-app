import { IncomingMessage, ServerResponse } from 'http'
import { isMethod, sendError, useBody } from 'h3'
import { createError } from '~/server/error-helpers'
import Prisma from '@prisma/client'
import { stringifyStyle } from '@vue/shared';

const prisma = new Prisma.PrismaClient();

export default async function posts(req: IncomingMessage, res: ServerResponse) {
    const url = /^\/(?<id>\d+)?$/.exec(req.url);
    if (!url) {
        return sendError(res, createError(404))
    }

    const postId = url?.groups?.id ? parseInt(url.groups.id) : undefined

    /* /api/posts */
    if (postId == undefined) {
        if (isMethod(req, 'GET')) {
            const posts = await prisma.post.findMany({
                where: req.user ? undefined : {
                    published: true,
                },
                /* include: {
                    comments: { select: { id: true, body: true, author: true, authorId: true }},
                    favoritedBy: { select: { id: true, email: true, postId: true,  } }
                } */
            })

            return posts
        }
        else if (isMethod(req, 'POST')) {
            if (!req.user) {
                return sendError(res, createError(403))
            }

            const input = await useBody<{
                published: boolean,
                comments: {
                    body: string,
                    author: string,
                }[]
            }>(req)

            /*  if (!input || typeof input != 'object' || !('published' in input)) {
                 return sendError(res, createError(400, 'invalid body'))
             } */

            /*  if (!Array.isArray(input.comments) || input.comments.length < 1) {
                 return sendError(res, createError(400, 'body must contain at least 1 comment'))
             } */

            const post = await prisma.post.create({
                data: {
                    published: input.published,
                    title: '',
                    authorId: req.user.id
                },
            })

            return post
        }
    }

    /* /api/posts/:id */
    else {
        const post = await prisma.post.findUnique({
            where: Object.assign({ id: postId }),
            include: {
                comments: { select: { id: true, body: true, author: true, postId: true } },
                favoritedBy: { select: { id: true, email: true, name: true, postId: true } },
            }
        })

        if (!post || (!req.user && !post.published)) {
            return sendError(res, createError(404))
        }

        if (isMethod(req, 'GET')) {
            return post
        }
        else if (isMethod(req, 'POST')) {
            const input = await useBody<{
                published?: boolean,
                comments?: {
                    postId: number,
                    id: number,
                    body: string,
                    author: string,
                }[]
            }>(req)

            if (input.published == null && !input.comments) {
                return sendError(res, createError(400, 'nothing to update'))
            }
        }

        else if (isMethod(req, 'DELETE')) {
            await prisma.post.delete({ where: { id: postId } });
            return { success: true };
        }
    }

    return sendError(res, createError(404))
}