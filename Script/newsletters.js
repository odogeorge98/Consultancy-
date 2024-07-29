
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
