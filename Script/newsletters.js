document.getElementById("menuToggle").addEventListener("click", function () {
  const menu = document.getElementById("overlayMenu");
  const closeMenu = document.getElementById("closeMenu");
  const menuToggle = document.getElementById("menuToggle");

  if (menu.classList.contains("show")) {
    menu.classList.remove("show");
    menuToggle.classList.remove("open"); // Rotate back to menu icona
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

// //Get the button:
// let mybutton = document.getElementById("scrollToTopBtn");

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         mybutton.style.display = "block";
//     } else {
//         mybutton.style.display = "none";
//     }
// }

// // When the user clicks on the button, scroll to the top of the document
// function scrollToTop() {
//     window.scrollTo({top: 0, behavior: 'smooth'});
// }

// document.addEventListener("DOMContentLoaded", () => {
//   fetch("http://localhost:7070/api/index")
//     .then((response) => response.json())
//     .then((data) => {
//       const newsletterContainer = document.getElementById(
//         "newsletter-container"
//       );

//       data.newsletters.forEach((newsletter) => {
//         // Create the structure for each newsletter
//         const newsletterDiv = document.createElement("div");
//         newsletterDiv.className = "row align-items-center my-3";

//         const textCol = document.createElement("div");
//         textCol.className = "col-md-6";

//         const title = document.createElement("h2");
//         title.className = "mb-3";
//         title.textContent = newsletter.title;

//         const content = document.createElement("p");
//         content.textContent = newsletter.content;

//         textCol.appendChild(title);
//         textCol.appendChild(content);

//         const imageCol = document.createElement("div");
//         imageCol.className = "col-md-6";

//         if (newsletter.image_path) {
//           const image = document.createElement("img");
//           image.src = `http://localhost:7070/uploads/${newsletter.image_path}`;
//           image.className = "img-fluid responsive-img";
//           image.alt = "Responsive Image";

//           imageCol.appendChild(image);
//         }

//         // Append the text and image columns to the newsletter div
//         newsletterDiv.appendChild(textCol);
//         newsletterDiv.appendChild(imageCol);

//         // Insert the newsletter div into the main container
//         newsletterContainer.appendChild(newsletterDiv);

//         // Optional: Add a horizontal line between newsletters
//         const hr = document.createElement("hr");
//         newsletterContainer.appendChild(hr);
//       });
//     })
//     .catch((error) => console.error("Error fetching newsletters:", error));
// });
