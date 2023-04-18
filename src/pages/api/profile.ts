import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  })
  console.log(user)
  res.status(200).json(user)
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res)
    default:
      // you can only do GET requests to this endpoint
      res.status(405).end()
  }
}

export default handler
