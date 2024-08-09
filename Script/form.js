document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        location: document.getElementById('location').value,
    };

    console.log('Submitting form data:', formData);

    fetch('http://localhost:3000/submit_form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Response from server:', data);
        const notification = document.getElementById('notification');
        notification.innerHTML = '<div class="alert alert-success">Form submitted successfully!</div>';
        setTimeout(() => {
            notification.innerHTML = '';
        }, 5000);
        document.getElementById('registrationForm').reset();
    })
    .catch(error => {
        console.error('Error during fetch:', error);
        const notification = document.getElementById('notification');
        notification.innerHTML = '<div class="alert alert-danger">There was an error submitting the form. Please try again.</div>';
        setTimeout(() => {
            notification.innerHTML = '';
        }, 5000);
    });
});



document.querySelector('.email-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('.email-input').value;

    console.log('Submitting subscription email:', email);

    fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Subscription failed');
        }
        return response.text();
    })
    .then(data => {
        console.log('Response from server:', data);
        const notification = document.getElementById('notification');
        notification.innerHTML = `<div class="alert alert-success">${data}</div>`;
        setTimeout(() => {
            notification.innerHTML = '';
        }, 5000);
        document.querySelector('.email-form').reset();
    })
    .catch(error => {
        console.error('Error during fetch:', error);
        const notification = document.getElementById('notification');
        notification.innerHTML = '<div class="alert alert-danger">There was an error subscribing. Please try again.</div>';
        setTimeout(() => {
            notification.innerHTML = '';
        }, 5000);
    });
});
