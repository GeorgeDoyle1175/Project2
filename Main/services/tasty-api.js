const fetch = require('node-fetch');

// Function to fetch recipes from the Tasty API
const fetchRecipes = async (ingredients) => {
  const response = await fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${ingredients}`, {
    headers: {
      'x-rapidapi-host': 'tasty.p.rapidapi.com',
      'x-rapidapi-key': 'a26e42adbbmsh61f25ff375a43bep167049jsnded9d646e5a7'
    }
  });

  if (response.ok) {
    const data = await response.json();
    const recipes = data.results;
    return recipes;
  } else {
    console.error(response.status);
  }
};

module.exports = {
  fetchRecipes
};
