const navIcons = document.querySelectorAll('#nav-icon1, #nav-icon2, #nav-icon3, #nav-icon4');
const menu = document.getElementById("black-panel");
let count = 1;

navIcons.forEach(function(icon) {
    icon.addEventListener('click', function() {
        this.classList.toggle('open');
        
        if (count % 2 === 0) {
            // menu.style.display = "none";
            menu.style.opacity = 0;
        } else {
            menu.style.opacity = 1;
        }
        
        count++;
    });
});
