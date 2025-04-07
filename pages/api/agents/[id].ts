import type { NextApiRequest, NextApiResponse } from 'next/dist/types';

import { deleteData, getById, putData } from '@/lib/api';

function handler(req: NextApiRequest, resp: NextApiResponse) {
  const { id } = req.query;
  const agentId = id as string;

  if (!agentId) {
    return resp.status(400).json({ message: 'Agent ID is required' });
  }

  if (req.method === 'GET') {
    const agent = getById('agents', agentId);
    return agent ? resp.status(200).json(agent) : resp.status(404).json({ message: 'Not Found' });
  }

  if (req.method === 'PUT') {
    const updatedAgent = putData('agents', agentId, req.body);
    return updatedAgent
      ? resp.status(200).json(updatedAgent)
      : resp.status(404).json({ message: 'Not Found' });
  }

  if (req.method === 'DELETE') {
    deleteData('agents', agentId);
    return resp.status(200).end;
  }

  return resp.status(405).json({ message: 'Method Not Allowed' });
}

export default handler;
