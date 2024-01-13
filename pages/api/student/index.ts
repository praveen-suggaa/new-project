import type { NextApiRequest, NextApiResponse } from 'next'
import { createPool } from '@vercel/postgres';
const pool = createPool({
    connectionString: process.env.POSTGRES_URL
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // if(req.headers["secret"] === '123'){
     const result = await pool.sql`SELECT * FROM students`;
     const {rows} = result;
     res.status(200).json({rows})
// }
// else {
    res.status(500).json({message:"internal server error"})
// }
}
