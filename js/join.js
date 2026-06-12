const timestampField = document.getElementById("timestamp");
if (timestampField) {
    timestampField.value = new Date().toISOString();
}


const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-modal");


document.addEventListener("click", (event) => {
   
    if (event.target.classList.contains("learn-more")) {
        modal.style.display = "block";
    }
    
   
    if (event.target === closeBtn) {
        modal.style.display = "none";
    }
    
    
    if (event.target === modal) {
        modal.style.display = "none";
    }
});



const menuButton = document.querySelector("#menu-ham");
const nav = document.querySelector("nav");

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}


setupFooter();

if (document.querySelector("#directory-wrapper")) {
    fetchMembers();
}
