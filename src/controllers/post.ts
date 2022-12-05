import express, { Request, Response, NextFunction } from "express";
const router = express.Router()
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

router.post(`/post`, async (req:Request, res:Response) => {
 /*
   #swagger.tags = ['Post']
   #swagger.summary = 'Post 생성'
    #swagger.description = 'Post 상세내역' 
 */
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
})

router.put('/post/:id/views', async (req:Request, res:Response) => {
 /*
   #swagger.tags = ['Post']
   #swagger.summary = 'Post 상세보기'
    #swagger.description = 'Post 상세내역' 
 */
  const { id } = req.params

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    res.json(post)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }
})

router.delete(`/post/:id`, async (req:Request, res:Response) => {
 /*
   #swagger.tags = ['Post']
   #swagger.summary = 'Post 삭제'
    #swagger.description = 'Post 상세내역' 
 */
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})

router.get(`/post/:id`, async (req:Request, res:Response) => {
 /*
   #swagger.tags = ['Post']
   #swagger.summary = 'Post 조회'
    #swagger.description = 'Post 상세내역' 
 */
  const { id }: { id?: string } = req.params

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
})

module.exports = router