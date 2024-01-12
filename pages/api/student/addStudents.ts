// pages/api/addStudent.js
import { createPool } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { first_name, last_name, phone_number, branch } = req.body;

    const result = await pool.query(
      "INSERT INTO students (first_name, last_name, phone_number, branch) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, phone_number, branch]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
