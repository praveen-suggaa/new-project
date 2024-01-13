// pages/index.js
const HOST = process.env.NEXT_PUBLIC_HOST;

export async function fetchStudent() {
  // Fetch data from your API
  try {
    const apiUrl = `${HOST}/api/student`;
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        // secret: secret,
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
