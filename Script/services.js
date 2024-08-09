document.getElementById("menuToggle").addEventListener("click", function () {
    const menu = document.getElementById("overlayMenu");
    const closeMenu = document.getElementById("closeMenu");
    const menuToggle = document.getElementById("menuToggle");
  
    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
        menuToggle.classList.remove("open"); // Rotate back to menu icon
        closeMenu.classList.remove("show"); // Hide close icon
        menuToggle.classList.add("show"); // Show menu icon
    } else {
        menu.classList.add("show");
        menuToggle.classList.add("open"); // Rotate to 'X'
        menuToggle.classList.remove("show"); // Hide menu icon
        closeMenu.classList.add("show"); // Show close icon
    }
  });
  
  document.getElementById("closeMenu").addEventListener("click", function () {
    const menu = document.getElementById("overlayMenu");
    const menuToggle = document.getElementById("menuToggle");
  
    menu.classList.remove("show");
    menuToggle.classList.remove("open"); // Rotate back to menu icon
    menuToggle.classList.add("show"); // Show menu icon
    this.classList.remove("show"); // Hide close icon
  });

   


//   document.getElementById('registrationForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const formData = {
//         name: document.getElementById('name').value,
//         email: document.getElementById('email').value,
//         location: document.getElementById('location').value,
//     };

//     console.log('Submitting form data:', formData);

//     fetch('http://localhost:3000/submit_form', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//     })
//     .then(response => response.text())
//     .then(data => {
//         console.log('Response from server:', data);
//         const notification = document.getElementById('notification');
//         notification.innerHTML = '<div class="alert alert-success">Form submitted successfully!</div>';
//         setTimeout(() => {
//             notification.innerHTML = '';
//         }, 5000);
//         document.getElementById('registrationForm').reset();
//     })
//     .catch(error => {
//         console.error('Error during fetch:', error);
//         const notification = document.getElementById('notification');
//         notification.innerHTML = '<div class="alert alert-danger">There was an error submitting the form. Please try again.</div>';
//         setTimeout(() => {
//             notification.innerHTML = '';
//         }, 5000);
//     });
// });
