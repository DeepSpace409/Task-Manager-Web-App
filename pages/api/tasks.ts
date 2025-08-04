import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
/*I did this solo at first, until changing the updateAT time and the delete function.
AI, womp womp womp */
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, priority } = req.body
    try {
      const newTask = await prisma.task.create({
        data: { title, description, priority },
      })
      return res.status(201).json(newTask)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create task' })
    }
  } else if (req.method === 'PATCH') {
    const { id, completed } = req.body
    try {
      const updatedTask = await prisma.task.update({
        where: { id },
        data: { completed },
      })
      return res.status(200).json(updatedTask)
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update task' })
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body
    try {
      await prisma.task.delete({
        where: { id },
      })
      return res.status(204).end()
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete task' })
    }
  } else {
    const tasks = await prisma.task.findMany()
    return res.status(200).json(tasks)
  }
}