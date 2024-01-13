const HOST = process.env.NEXT_PUBLIC_HOST;

async function fetchStudents() {
  try {
    const apiUrl = `${HOST}/api/student`;
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from API');
    }

    const data = await response.json();

    if (!data || !data.rows) {
      throw new Error('Invalid data format');
    }

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default fetchStudents;