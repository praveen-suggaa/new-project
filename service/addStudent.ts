// addStudent.tsx
async function addStudent(first_Name: string, last_Name: string, phone_Number: string, branch: string) {
  try {
    const apiUrl = "http://localhost:3000/api/student/addStudents";
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
