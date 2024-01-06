import type { NextApiRequest, NextApiResponse } from 'next'
import {sql} from '@vercel/postgres'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.headers["secret"] === '123'){
     const {id,name} = req.body
     const {rows} = await sql`select * from  students  where id = ${id}`;
  res.status(200).json({rows})
}
else {
    res.status(500).json({message:"internal server error"})
}
}
