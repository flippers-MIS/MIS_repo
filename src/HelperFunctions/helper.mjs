export async function fetchTable(path) {
    const data = await fetch(path)
        .then((response) => response.json())
        .catch((error) => {
            throw new Error("Network error")
        });
    
    if (data.ok) {
        throw new Error("path invalid");
    }
    
    return data;
}