async function fetchProducts(){
    console.log("Started request …");
    
    const response = await fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    console.log(`Received response: ${response.status}`);
    
    const data = await response.json();
    console.log("1: ", data[0].name);
    return data;
}

const promise = fetchProducts();

promise
    .then((data) => console.log("2: ", data[0].name))