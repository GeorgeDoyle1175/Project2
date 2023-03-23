const fetch = require('node-fetch');

// Function to fetch recipes from the Tasty API
const fetchRecipes = async () => {
    const url = 'https://tasty.p.rapidapi.com/recipes/list';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'a26e42adbbmsh61f25ff375a43bep167049jsnded9d646e5a7',
        'x-rapidapi-host': 'tasty.p.rapidapi.com'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data.results;
    } else {
      throw new Error('Failed to fetch recipes');
    }
  }

module.exports = {
  fetchRecipes
};
