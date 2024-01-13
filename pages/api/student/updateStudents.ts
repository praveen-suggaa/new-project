// pages/api/updateStudent.js
import { createPool } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Assuming your students table has columns like name, age, etc.
    const { id, first_name, last_name, phone_number, branch } = req.body;

    const result = await pool.query(
      "UPDATE students SET id = $1, first_name = $2, last_name = $3, phone_number = $4, branch = $5 WHERE id = $1 RETURNING *",
      [id, first_name, last_name, phone_number, branch]
    );

    // Check if any rows were affected to determine if the update was successful
    if (result.rowCount > 0) {
      res.status(200).json({ message: "Student updated successfully" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
