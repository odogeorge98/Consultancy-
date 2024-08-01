document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".carousel-button-right");
  const prevButton = document.querySelector(".carousel-button-left");

  const slideWidth = slides[0].getBoundingClientRect().width;
  let currentIndex = 0;

  const moveToSlide = (index) => {
    const amountToMove = -slideWidth * index;
    track.style.transform = `translateX(${amountToMove}px)`;
    slides[currentIndex].classList.remove("current-slide");
    slides[index].classList.add("current-slide");
    currentIndex = index;
  };

  nextButton.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      moveToSlide(currentIndex + 1);
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      moveToSlide(currentIndex - 1);
    }
  });

  slides[0].classList.add("current-slide");
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");

  slides.forEach((slide) => {
    slide.addEventListener("mouseenter", () => {
      const eyebrow = slide.querySelector(".carousel-eyebrow");
      const title = slide.querySelector(".carousel-title");
      const content = slide.querySelector(".carousel-content");

      eyebrow.setAttribute("data-original", eyebrow.innerHTML);
      title.setAttribute("data-original", title.innerHTML);

      eyebrow.innerHTML = "NEW CATEGORY <span>/ NEW TEXT</span>";
      title.textContent = "New Hover Title";

      // Change the background color of the carousel content
      content.style.background =
        "linear-gradient(to bottom right, #f8e478, #53dff3)";
    });

    slide.addEventListener("mouseleave", () => {
      const eyebrow = slide.querySelector(".carousel-eyebrow");
      const title = slide.querySelector(".carousel-title");
      const content = slide.querySelector(".carousel-content");

      eyebrow.innerHTML = eyebrow.getAttribute("data-original");
      title.innerHTML = title.getAttribute("data-original");

      // Revert the background color of the carousel content
      content.style.background = ""; // Resets to original background color
    });
  });
});

//Get the button:
let mybutton = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}




document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.overlay-menu .nav-item');
    const overlayContent = document.getElementById('overlayContent');
    const learnMoreButton = overlayContent.querySelector('.btn');

    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach((nav) => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');

            // Retrieve data attributes
            const imageSrc = item.getAttribute('data-image');
            const title = item.getAttribute('data-title');
            const description = item.getAttribute('data-description');
            const link = item.getAttribute('data-link');

            // Update content based on clicked item
            overlayContent.querySelector('img').src = imageSrc;
            overlayContent.querySelector('h3').textContent = title;
            overlayContent.querySelector('p').textContent = description;
            learnMoreButton.href = link;

            // Show the overlay content
            overlayContent.style.display = 'block';
        });
    });
});
