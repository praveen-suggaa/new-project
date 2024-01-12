import { Inter } from "next/font/google";
import fetchStudent from "./fetch";
import addStudent from "./service/addStudent";
import { useEffect, useState } from "react";
import Link from "next/link";
import deleteStudent from "./service/deleteStudent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [deleteID, setDeleteID] = useState("");

  function handleFirstNameChange(e: any) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e: any) {
    setLastName(e.target.value);
  }

  function handlePhoneChange(e: any) {
    setPhone(e.target.value);
  }

  function handleBranchChange(e: any) {
    setBranch(e.target.value);
  }
  function handleDeleteStudentChange(e: any) {
    setDeleteID(e.target.value);
  }

  async function handleAddStudent() {
    try {
      await addStudent(firstName, lastName, phone, branch);
      // const apiUrl = "http://localhost:3000/api/student";
      // const response = await fetch(apiUrl, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // secret: secret,
      //   },
      //   body: JSON.stringify({
      //     first_name: first_name,
      //   }),
      // });
      // const res = response.json();
      // console
      // // Optionally update the state or perform any other actions
      setFirstName("");
      setLastName("");
      setPhone("");
      setBranch("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  }

  function handleDeleteStudent() {
    deleteStudent(deleteID);
    setDeleteID("");
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <p>Main Page</p>

      <div className="flex flex-1">
        <input
          type="text"
          placeholder="First Name"
          className="border border-gray-500"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border border-gray-500"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <input
          type="text"
          placeholder="Phone"
          className="border border-gray-500"
          value={phone}
          onChange={handlePhoneChange}
        />
        <input
          type="text"
          placeholder="Branch"
          className="border border-gray-500"
          value={branch}
          onChange={handleBranchChange}
        />
      </div>
      <button onClick={handleAddStudent} className="bg-green-400">
        Add Student
      </button>
      <div>
        <input
          type="text"
          placeholder="Enter ID"
          className="border border-gray-500"
          value={deleteID}
          onChange={handleDeleteStudentChange}
        />
        <button onClick={handleDeleteStudent} className="bg-green-400">
          Delete Student
        </button>
      </div>
    </main>
  );
}

{
  /* <div>
        {data ? (
          data.map((student: any) => (
            <li key={student.id}>
              <Link href={`api//student/${student.id}`}>
                <p>
                  {student.first_name} {student.last_name} - {student.branch}
                </p>
              </Link>
              <button
                onClick={() => handleDelete(student.id)}
                className="bg-red-400"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No Students</p>
        )}
      </div> */
}
// const [data, setData] = useState([]);

// useEffect(() => {
//   const secret = "123";
//   const fetchDataFromApi = async () => {
//     try {
//       const apiData = await fetchStudent(secret);
//       setData(apiData.rows);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   fetchDataFromApi();
// }, []);

// function handleDelete(id: any): void {
//   throw new Error("Function not implemented.");
// }
// console.log(data);
