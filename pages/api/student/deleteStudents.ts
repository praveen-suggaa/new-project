// pages/api/deleteStudent.js
import { createPool } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;

    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );

    // Check if any rows were affected to determine if the deletion was successful
    if (result.rowCount > 0) {
      res.status(200).json({ message: "Student deleted successfully" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
