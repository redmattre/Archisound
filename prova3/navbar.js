const navIcons = document.querySelectorAll('#nav-icon1, #nav-icon2, #nav-icon3, #nav-icon4');
const menu = document.getElementById("black-panel");
let settingsFlag = 1;

navIcons.forEach(function(icon) {
    icon.addEventListener('click', function() {
        this.classList.toggle('open');
		// const visualizzazione = document.getElementById('visualizzazione');
        
        if (settingsFlag % 2 === 0) {
            menu.style.opacity = 0;
            menu.style.pointerEvents = "none";
			
			// visualizzazione.style.left = "44.8%";
			// onSettingsResizeReverse();
        } else {
            menu.style.opacity = 1;
            menu.style.pointerEvents = "all";

			// visualizzazione.style.left = "20.5%";
			// onSettingsResize();
        }
        
        settingsFlag++;
    });
});