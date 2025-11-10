// Footer Year
document.getElementById("year")?.textContent = new Date().getFullYear();

// Mobile Nav Toggle
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
if(navToggle){
  navToggle.addEventListener("click", ()=>{
    const expanded = mainNav.getAttribute("aria-expanded") === "true";
    mainNav.setAttribute("aria-expanded", !expanded);
  });
}
