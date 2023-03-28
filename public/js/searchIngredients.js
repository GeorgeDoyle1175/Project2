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

const favoriteBtn = document.querySelector(".favorite-btn");

// Add click event to the "favorite" button
$(favoriteBtn).click(function() {
  // Get the data for the selected card
  var cardData = $(this).closest('.card').data();

  console.log ('Line 16', cardData.toJSON())
  // Use Handlebars to render the selected card data inside the "/profile" template
  var profileTemplate = Handlebars.compile('./profile');
  var profileHtml = profileTemplate(cardData);

  // Append the rendered HTML to the body of the document
  $('body').append(profileHtml);
});


