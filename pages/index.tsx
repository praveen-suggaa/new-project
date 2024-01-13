import fetchStudent from "../service/fetch";
import addStudent from "../service/addStudent";
import { useEffect, useState } from "react";
import Link from "next/link";
import deleteStudent from "../service/deleteStudent";
import updateStudent from "../service/updateStudent";
export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState<number | undefined>();
  const [branch, setBranch] = useState("");
  const [deleteID, setDeleteID] = useState<number | undefined>();
  const [hide, setHide] = useState(false);

  const [data, setData] = useState([]);

  function handleDelete(id: number) {
    deleteStudent(id);
  }
  console.log(data);

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
      if (phone != undefined) {
        await addStudent(firstName, lastName, phone, branch);
      }
      setFirstName("");
      setLastName("");
      setPhone(undefined);
      setBranch("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  }

  function handleDeleteStudent() {
    if (deleteID != undefined) {
      deleteStudent(deleteID);
      setDeleteID(undefined);
    }
  }

  function handleEdit() {
    // handleUpdateStudent(id);
    setHide(!hide);
    console.log("Edited");
  }

  function handleUpdateStudent(id: number) {
    if (phone != undefined) {
      updateStudent(id, firstName, lastName, phone, branch);
      setFirstName("");
      setLastName("");
      setPhone(undefined);
      setBranch("");
    }
    setHide(!hide);
  }

  useEffect(() => {
    // const secret = "123";
    const fetchDataFromApi = async () => {
      try {
        const apiData = await fetchStudent();
        setData(apiData.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromApi();
  }, [handleUpdateStudent]);
  return (
    <main
      className="bg-red-500"
      style={{
        textAlign: "center",
      }}
    >
      <p className="text-3xl text-red-500">Main Page</p>
      <div>
        {hide && (
          <div>
            <input
              type="text"
              placeholder="Enter New First Name"
              className="border border-gray-500"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <input
              type="text"
              placeholder="Enter New Last Name"
              className="border border-gray-500"
              value={lastName}
              onChange={handleLastNameChange}
            />
            <input
              type="text"
              placeholder="Enter New Phone Name"
              className="border border-gray-500"
              value={phone}
              onChange={handlePhoneChange}
            />
            <input
              type="text"
              placeholder="Enter New Branch Name"
              className="border border-gray-500"
              value={branch}
              onChange={handleBranchChange}
            />
          </div>
        )}
        {data ? (
          data.map((student: any) => (
            <li key={student.id}>
              <p>ID: {student.id}</p>
              <Link href={`api//student/${student.id}`}>
                <p>
                  {student.first_name} {student.last_name} - {student.branch}
                </p>
              </Link>
              <button
                onClick={() => handleDelete(student.id)}
                className="bg-red-400"
                style={{ backgroundColor: "red" }}
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit()}
                className="bg-red-400"
                style={{ backgroundColor: "green" }}
              >
                Edit
              </button>
              {hide && (
                <button
                  onClick={() => handleUpdateStudent(student.id)}
                  className="bg-red-400"
                >
                  Submit
                </button>
              )}
            </li>
          ))
        ) : (
          <p>No Students</p>
        )}
      </div>

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
