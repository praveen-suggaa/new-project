import { Inter } from "next/font/google";
import fetchStudent from "./fetch";
import { useEffect, useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const secret = "123";
    const fetchDataFromApi = async () => {
      try {
        const apiData = await fetchStudent(secret);
        setData(apiData.rows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromApi();
  }, []);
  function handleDelete(id: any): void {
    throw new Error("Function not implemented.");
  }
  console.log(data);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      Main Page
      {data ? (
        data.map((student: any) => (
          <li key={student.id}>
            {/* Link to individual student page */}
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
    </main>
  );
}
