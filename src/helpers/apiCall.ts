export async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    return err;
  }
}
