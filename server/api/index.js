import express from 'express'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

/* posts feed */
app.get('/feed', async (req, res) => {
    const posts = await prisma.post.findMany({
        where: {
            published: true
        },
        include: {
            author: true
        },
    })
    res.json(posts)
})

/* create post */
app.post('/post', async (req, res) => {
    const { title, content, authorEmail } = req.body

    const post = await prisma.post.create({
        data: { title, content,
            author: {
                connect: {
                    email: authorEmail
                }
            }
        }
    })
    res.status(200).json(post)
})

/* single post route */
app.get(`/post/:id`, async (req, res) => {
    const { id } = req.params
    const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: { author: true, content: true, name: true, id: true }
    })
    res.json(post)
})

/* update post */
app.put('/publish/:id', async (req, res) => {
    const { id } = req.params
    const post = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: { published: true },
    })
    res.json(post)
  })

/* drafts - unpublished posts */
app.get('/drafts', async (req, res) => {
    const posts = await prisma.post.findMany({
      where: { published: false },
      include: { author: true }
    })
    res.json(posts)
  })

/* create user */
app.post(`/user`, async (req, res) => {
    const user = await prisma.user.create({
      data: {
        ...req.body,
      },
    })
    res.json(user)
  })


export default {
    path: '/api/index',
    handler: app
}