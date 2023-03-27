const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn?searchBtn.addEventListener("click", (event) => {
  event.preventDefault(); // prevent form submission
  const query = searchInput.value.trim();
  if (query !== "") {
    const newUrl = window.location.origin + window.location.pathname + "api/recipes/search?ingredient=" + query;
    window.location.replace(newUrl);
  }
}):"";
