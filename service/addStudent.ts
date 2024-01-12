import internal from "stream";

// addStudent.tsx
const HOST = process.env.HOST;

async function addStudent(first_Name: string, last_Name: string, phone_Number: number, branch: string) {
  console.log(HOST);
  try {
    const apiUrl = `${HOST}/api/student/addStudents`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // secret: secret,
      },
      body: JSON.stringify({
        first_name: first_Name,
        last_name: last_Name,
        phone_number: phone_Number,
        branch: branch
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add student");
    }

    const addedStudent = await response.json();
    return addedStudent; // Return the added student details
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
}

export default addStudent;
