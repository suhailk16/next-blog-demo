import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (!user) {
    return res.status(404).json({
      error: true,
      status: 404,
      message: 'Incorrect email, please try again.',
    })
  }

  if (user.passwrod !== password) {
    return res.status(404).json({
      error: true,
      status: 404,
      message: 'Incorrect password, please try again.',
    })
  }

  delete user.passwrod

  res.status(200).json(user)
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return post(req, res)
    default:
      res.status(405).end()
  }
}

export default handler
