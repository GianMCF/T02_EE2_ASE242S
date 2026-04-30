const API_URL = "http://192.168.31.26:8088/v1/api/client";

export const getClients = async () => {
  try {
    const res = await fetch(API_URL);
    console.log("STATUS:", res.status);
    return await res.json();
  } catch (error) {
    console.log("ERROR FETCH:", error);
  }
};

export const createClient = async (client: any) => {
  await fetch(`${API_URL}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(client)
  });
};

export const updateClient = async (client: any) => {
  await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(client)
  });
};

export const deleteClient = async (id: string) => {
  try {
    console.log("➡️ DELETE:", id);

    const res = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE"
    });

    console.log("STATUS DELETE:", res.status);

    const text = await res.text();
    console.log("RESPONSE DELETE:", text);

    if (!res.ok) throw new Error("Delete falló");

  } catch (error) {
    console.log("ERROR DELETE:", error);
  }
};

export const restoreClient = async (id: string) => {
  const res = await fetch(`${API_URL}/restore/${id}`, {
    method: "PUT"
  });

};