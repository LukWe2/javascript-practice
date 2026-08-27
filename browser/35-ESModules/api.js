export async function loadUser(){
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    if (!response.ok){
        throw new Error("Request fehlgeschlagen");
    }

    const user = await response.json();

    return user;
}