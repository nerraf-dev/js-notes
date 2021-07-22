// Menu toggle script
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".nav-menu");

function toggleMenu(){
    if(menu.classList.contains("active")){
        menu.classList.remove("active");
        //adds menu icon
        toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
    } else {
        menu.classList.add("active");
        // add X button
        toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
    }
}
//Event Listener - toggle button
toggle.addEventListener("click", toggleMenu, false);

// DROPDOWN MENU Script
const items = document.querySelectorAll(".item");

//activate submenu
function toggleItem(){
    if(this.classList.contains("submenu-active")){
        this.classList.remove("submenu-active");
    } else if (menu.querySelector(".submenu-active")){
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
        this.classList.add("submenu-active");
    } else {
        this.classList.add("submenu-active");
    }
}

// Event listeners:
for (let item of items) {
    if(item.querySelector(".submenu")) {
        item.addEventListener("click", toggleItem, false);
        item.addEventListener("keypress", toggleItem, false);
    }
}

//Click anywhere to close submenu 
function closeSubmenu(e){
    let isClickInside = menu.contains(e.target);
    if (!isClickInside && menu.querySelector(".submenu-active")) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
    }
}
//Event Listener:
document.addEventListener("click", closeSubmenu, false)