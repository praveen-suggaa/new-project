// updateStudent.tsx
const HOST = process.env.HOST;

async function updateStudent(id: number, first_name: string, last_name: string, phone_number: number, branch: string) {
  try {
    const apiUrl = `${HOST}/api/student/updateStudents`;
    const response = await fetch(apiUrl, {
      method: "PUT", // Assuming you are using a PUT request for updating
      headers: {
        "Content-Type": "application/json",
        // Include any additional headers as needed
      },
      body: JSON.stringify({
        id,
        first_name,
        last_name,
        phone_number,
        branch
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update student");
    }

    const updatedStudent = await response.json();
    return updatedStudent; // Return the updated student details
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
}

export default updateStudent;
