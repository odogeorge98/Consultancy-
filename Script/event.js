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
