const form = document.querySelector('.signup-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nameInput = document.querySelector('#name-signup');
  const emailInput = document.querySelector('#email-signup');
  const passwordInput = document.querySelector('#password-signup');
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (name && email && password) {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }
});
