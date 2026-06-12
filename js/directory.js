const jsonUrl = "data/members.json";
const membersContainer = document.querySelector("#members-container");
const gridBtn = document.querySelector("#grid-button");
const listBtn = document.querySelector("#list-button");

// 1. Clonar y procesar los miembros desde el JSON
async function fetchMembers(){
    try {
        const response = await fetch(jsonUrl);
        if (!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        renderMembers(data);
    }  
    catch (error) {
        console.error("There was a problem loading the members:", error);
    }
}

// 2. Renderizar las tarjetas de miembros
function renderMembers(membersList) {
    if (!membersContainer) return;
    membersContainer.innerHTML = "";

    membersList.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card", member.classType);

        card.innerHTML = ` 
            <img src="images/${member.image}" alt="Logo of ${member.name}" class="member-logo" loading="lazy">
            <h3>${member.name}</h3>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener" class="website-link">Website</a>
            <p class="level">Level = ${member.membershipLevel}</p>
        `;
        membersContainer.appendChild(card);
    });
}

// 3. Alternar entre vista de Grid y Lista
if (gridBtn && listBtn && membersContainer) {
    gridBtn.addEventListener("click", () => {
        membersContainer.classList.add("grid");
        membersContainer.classList.remove("list");

        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
        membersContainer.classList.add("list");
        membersContainer.classList.remove("grid");

        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });
}

// 4. Configurar datos del Footer
function setupFooter(){
    const yearSpan = document.querySelector("#current-year");
    if (yearSpan){
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
    const modificationSpan = document.querySelector(".last-modified");
    if (modificationSpan){
        modificationSpan.textContent = `Last Modified: ${document.lastModified}`;
    }
}


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

