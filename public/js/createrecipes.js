const formSubmitHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const description = document.querySelector('#description').value.trim();
  const ingredients = document.querySelector('#ingredients').value.trim().split(',');
  const imageUrl = document.querySelector('#image').value.trim();
  const recipeUrl = document.querySelector('#url').value.trim();

  console.log(JSON.stringify({ name, description, ingredients, imageUrl, recipeUrl }));

  if (name && description && ingredients && imageUrl && recipeUrl) {
    const response = await fetch('/new', {
      method: 'POST',
      body: JSON.stringify({ name, description, ingredients, imageUrl, recipeUrl }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('form').addEventListener('submit', formSubmitHandler);




// document.addEventListener('DOMContentLoaded', () => {
//     const recipeFormTemplate = Handlebars.compile(document.querySelector('#recipe-form-template').innerHTML);
//     document.querySelector('#recipe-form-container').innerHTML = recipeFormTemplate();

//     const form = document.getElementById('recipe-form');
//     form.addEventListener('submit', (event) => {
//       event.preventDefault();

//       const name = document.querySelector('recipe-name').value;
//       const ingredients = document.querySelector('ingredients').value;
//       const description = document.querySelector('description').value;
//       const picture = document.querySelector('picture').files[0];

//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('ingredients', ingredients);
//       formData.append('description', description);
//       formData.append('picture', picture);

//       fetch('/cards', {
//         method: 'POST',
//         body: formData
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//     });
//   });
