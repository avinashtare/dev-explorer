// Use const or let depending on whether the variable will be reassigned
let data = [];

// Use descriptive variable names
const productsContainer = document.querySelector(".products");

// Use arrow functions for conciseness
const addProduct = (product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
        <img src=${product.thumbnail} alt="${product.title}">
        <h1>${product.title}</h1>
        <p>${product.description}...</p>
        <button>Buy</button>
    `;
    productsContainer.appendChild(productElement);
};

const fetchData = async () => {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const jsonData = await response.json();
        data = jsonData;
        removeLoadingAnimation();
        data.products.forEach(addProduct);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const removeLoadingAnimation = () => {
    const loadingElement = document.getElementById("laod");
    if (loadingElement) {
        loadingElement.remove();
    }
};

// Use a more meaningful name for the function
const initializeApp = () => {
    // add some time 
    setTimeout(fetchData, 500);
};

// Call the function to initialize the app
initializeApp();
