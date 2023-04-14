import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const post = (req: NextApiRequest, res: NextApiResponse) => {}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await prisma.blog.findMany()
  res.status(200).json(posts)
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res)
    case 'POST':
      return post(req, res)
    default:
      return res.status(405).end()
  }
}

export default handler
