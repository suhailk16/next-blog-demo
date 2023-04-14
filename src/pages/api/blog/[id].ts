import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const post = await prisma.blog.findFirst({
    where: {
      id: Number(id),
    },
  })
  if (!post) {
    return res.status(404).json({
      error: true,
      status: 404,
      message: 'The post you are looking for does not exist.',
    })
  } else {
    res.status(200).json(post)
  }
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res)
    default:
      return res.status(405).end()
  }
}

export default handler
