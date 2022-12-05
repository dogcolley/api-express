import express, { Request, Response, NextFunction } from "express";
const router = express.Router()
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

router.post(`/signup`, async (req:Request, res:Response) => {
  /* 	
    #swagger.tags = ['User']
    #swagger.summary = '유저등록하기'
    #swagger.description = '유저등록하기' 
  */
  const { name, email, posts } = req.body

  const postData = posts?.map((post: Prisma.PostCreateInput) => {
    return { title: post?.title, content: post?.content }
  })

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  })
  res.json(result)
})

router.get('/users', async (req:Request, res:Response) => {
  /* 	
    #swagger.tags = ['User']
    #swagger.summary = '유저전체 정보 가져오기'
    #swagger.description = '유저전체 정보 가져오기' 
  */
    
  const users = await prisma.user.findMany()
  res.json(users)
})

router.get('/user/:id/drafts', async (req:Request, res:Response) => {
  /* 	
    #swagger.tags = ['User']
    #swagger.summary = '유저상세 정보 가져오기'
    #swagger.description = '유저상세 정보 가져오기' 
  */
  const { id } = req.params

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    })

  res.json(drafts)
})

router.post('/user/:id/profile', async (req:Request, res:Response) => {
  /* 	
    #swagger.tags = ['User']
    #swagger.summary = '유저상세 프로파일 가져오기'
    #swagger.description = '유저상세 프로파일 가져오기' 
  */
  const { id } = req.params
  const { bio } = req.body

  const profile = await prisma.profile.create({
    data: {
      bio,
      user: {
        connect: {
          id: Number(id)
        }
      }
    }
  })

  res.json(profile)
})


module.exports = router