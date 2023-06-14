const resetForm = document.getElementById('reset-form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const messageDiv = document.getElementById('message');

resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const token = window.location.search.substring(7) // obtenemos el token del URL
    if (password !== confirmPassword) {
        messageDiv.innerText = 'Passwords do not match';
        return;
    }
    try {
        const response = await fetch(`https://barberbackend-3z4s.onrender.com/api/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                password,
                confirmPassword
            })
        });
        const data = await response.json();
        messageDiv.innerText = data.message;
        passwordInput.value = '';
        confirmPasswordInput.value = '';
    } catch (error) {
        console.error(error);
        messageDiv.innerText = 'Something went wrong, try again';
    }
});