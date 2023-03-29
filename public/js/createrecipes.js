document.addEventListener('DOMContentLoaded', () => {
    const recipeFormTemplate = Handlebars.compile(document.querySelector('#recipe-form-template').innerHTML);
    document.querySelector('#recipe-form-container').innerHTML = recipeFormTemplate();
  
    const form = document.getElementById('recipe-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const name = document.querySelector('recipe-name').value;
      const ingredients = document.querySelector('ingredients').value;
      const description = document.querySelector('description').value;
      const picture = document.querySelector('picture').files[0];
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('ingredients', ingredients);
      formData.append('description', description);
      formData.append('picture', picture);
  
      fetch('/cards', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    });
  });
  