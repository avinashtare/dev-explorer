let redirectLink = document.getElementById("redirectLink")
let searchInput = document.getElementById("searchInput")

const handleSearch = ({ key }) => {
    if (key == "Enter") {
        redirectLink.click();
        searchInput.value = ""
    }
    let searchQuery = (searchInput.value).replaceAll(" ", "+")
    let searchEngine = "https://www.google.com/search?q=";
    redirectLink.href = `${searchEngine}${searchQuery}`;
}

// focus user 
searchInput.focus()

document.addEventListener("visibilitychange", (e) => {
    searchInput.focus()
})

searchInput.addEventListener("keydown", handleSearch)