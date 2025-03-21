document.getElementById('deleteForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const phone = document.getElementById('phone').value;
    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch('https://rideske-prod-885c9e9c8d57.herokuapp.com/api/delete-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: phone })
        });

        if (response.ok) {
            messageDiv.style.color = 'green';
            messageDiv.textContent = 'OTP sent! Redirecting to verification...';
            setTimeout(() => {
                window.location.href = `verify-otp.html?phone=${encodeURIComponent(phone)}`;
            }, 2000);
        } else {
            const errorData = await response.json();
            messageDiv.style.color = 'red';
            messageDiv.textContent = errorData.message || 'Something went wrong. Please try again.';
        }
    } catch (error) {
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Error connecting to the server. Please try again later.';
        console.error('Error:', error);
    }
});
