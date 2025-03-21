document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const phone = urlParams.get('phone');
    document.getElementById('phone').value = phone || '';
});

document.getElementById('otpForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const otp = document.getElementById('otp').value;
    const phone = document.getElementById('phone').value;
    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch('https://rideske-prod-885c9e9c8d57.herokuapp.com/auth/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: phone, otp: otp,  purpose: "delete-account" })
        });

        if (response.ok) {
            messageDiv.style.color = 'green';
            messageDiv.textContent = 'Account deleted successfully! Thank you.';
            document.getElementById('otpForm').reset();
        } else {
            const errorData = await response.json();
            messageDiv.style.color = 'red';
            messageDiv.textContent = errorData.message || 'Invalid OTP. Please try again.';
        }
    } catch (error) {
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Error connecting to the server. Please try again later.';
        console.error('Error:', error);
    }
});
