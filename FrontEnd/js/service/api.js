export async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(data))
    });
  
    return await res.json();
  }
  
  export async function getData(url) {
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
  
    return res.json();
  }