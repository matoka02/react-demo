import type { NextApiRequest, NextApiResponse } from 'next/dist/types';

import { deleteData, getData, postData } from '@/lib/api';
import { getSearchFilters } from '@/lib/utils';

function handler(req: NextApiRequest, resp: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const filters = getSearchFilters(req.query);
      const agents = getData('agents', filters);
      return resp.status(201).json(agents);
    } catch (error) {
      return resp.status(500).json({ message: 'Error fetching agents', error });
    }
  }

  if (req.method === 'POST') {
    try {
      const newAgent = postData('agents', req.body);
      return resp.status(201).json(newAgent);
    } catch (error) {
      return resp.status(500).json({ message: 'Error creating agent', error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      const agentId = id as string;

      if (!agentId || typeof agentId !== 'string') {
        return resp.status(400).json({ message: 'Invalid agent ID' });
      }

      const deletedId = deleteData('agents', agentId);
      if (!deletedId) {
        return resp.status(404).json({ message: 'Agent not found' });
      }

      resp.status(200).json({ message: 'Agent deleted successfully', id: deletedId });
    } catch (error) {
      return resp.status(500).json({ message: 'Error deleting agent', error });
    }
  }

  resp.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  return resp.status(405).json({ message: `Method ${req.method} Not Allowed` });
}

export default handler;
