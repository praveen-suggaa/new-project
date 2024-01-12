// pages/index.js
import { useState, useEffect } from "react";

export async function fetchStudent(secret: any) {
  // Fetch data from your API
  try {
    const apiUrl = "http://localhost:3000/api/student";
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        secret: secret,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export default fetchStudent;