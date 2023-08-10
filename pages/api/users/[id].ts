import type { NextApiRequest, NextApiResponse } from 'next';
// import type { User } from '../../../interfaces';
import { Amplify, Storage } from 'aws-amplify';
import awsconfig from '../../../src/aws-exports';
Amplify.configure(awsconfig);

export type User = {
  id: number
  name?: string
}

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { query, method, body } = req;
  const id = parseInt(query.id as string, 10);
  const name = query.name as string;

  switch (method) {
    case 'GET':
      res.status(200).json({ id, name: `User ${id}`});
      break;
    case 'POST':
      res.json({ id, name: `User ${id}`, body: body });
      break;
    case 'PUT':
      // Update or create data in your database
      res.status(200).json({ id, name: name || `User ${id}` });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
