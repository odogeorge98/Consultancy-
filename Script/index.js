
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



document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button-right');
    const prevButton = document.querySelector('.carousel-button-left');

    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    const moveToSlide = (index) => {
        const amountToMove = -slideWidth * index;
        track.style.transform = `translateX(${amountToMove}px)`;
        slides[currentIndex].classList.remove('current-slide');
        slides[index].classList.add('current-slide');
        currentIndex = index;
    };

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            moveToSlide(currentIndex + 1);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveToSlide(currentIndex - 1);
        }
    });

    slides[0].classList.add('current-slide');
});











    

    document.addEventListener('DOMContentLoaded', () => {
      const slides = document.querySelectorAll('.carousel-slide');
  
      slides.forEach(slide => {
          slide.addEventListener('mouseenter', () => {
              const eyebrow = slide.querySelector('.carousel-eyebrow');
              const title = slide.querySelector('.carousel-title');
              const content = slide.querySelector('.carousel-content');
              
              eyebrow.setAttribute('data-original', eyebrow.innerHTML);
              title.setAttribute('data-original', title.innerHTML);
              
              eyebrow.innerHTML = 'NEW CATEGORY <span>/ NEW TEXT</span>';
              title.textContent = 'New Hover Title';
              
              // Change the background color of the carousel content to red
              content.style.backgroundColor = 'lightgreen';
          });
  
          slide.addEventListener('mouseleave', () => {
              const eyebrow = slide.querySelector('.carousel-eyebrow');
              const title = slide.querySelector('.carousel-title');
              const content = slide.querySelector('.carousel-content');
              
              eyebrow.innerHTML = eyebrow.getAttribute('data-original');
              title.innerHTML = title.getAttribute('data-original');
              
              // Revert the background color of the carousel content
              content.style.backgroundColor = ''; // Resets to original background color
          });
      });
  });
  
  

  
    //Get the button:
    let mybutton = document.getElementById("scrollToTopBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function scrollToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
