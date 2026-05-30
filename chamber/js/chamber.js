


const jsonUrl = "data/members.json";
const membersContainer = document.querySelector("#members-container")
const gridBtn = document.querySelector("#grid-button");
const listBtn = document.querySelector("#list-button");








async function fetchMembers(){
    try{
        const response = await fetch(jsonUrl);
        if (!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        renderMembers(data);
    }  
    catch (error) {
        console.error("there was a problem to loading the members ")
    }

}





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


if (gridBtn && listBtn) {
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




function setupFooter(){
    const yearSpan = document.querySelector("#current-year");
    if (yearSpan){
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
    const modificationSpan = document.querySelector(".last-modified");
    if (modificationSpan){
        modificationSpan.textContent = `last Modified: ${document.lastModified}`;
    }

}
 

if (document.querySelector("#directory-wrapper")) {
    fetchMembers();
}

setupFooter();


const menuButton = document.querySelector("#menu-ham");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
});
