// deleteStudent.tsx
const HOST = process.env.HOST;

async function deleteStudent(studentId: string) {
    try {
      const apiUrl = `${HOST}/api/student/deleteStudents`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: studentId,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
  
      const deletedStudent = await response.json();
      return deletedStudent; // Return the deleted student details
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    }
  }
  
  export default deleteStudent;
  