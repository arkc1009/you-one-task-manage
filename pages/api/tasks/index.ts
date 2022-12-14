import prisma from '@lib/prisma';
import withHandler from '@lib/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tasks = await prisma.task.findMany({
    include: {
      vocals: true,
      mixers: true,
      drawers: true,
      editers: true,
      designers: true,
    },
  });
  res.status(200).json(tasks);
}

export default withHandler(handler);
