document.addEventListener("DOMContentLoaded", () => {
    

    const menuButton = document.querySelector("#menu-ham");
    const nav = document.querySelector("nav");
    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            nav.classList.toggle("open");
        });
    }


    if (typeof setupFooter === 'function') {
        setupFooter();
    }

    const visitMessage = document.querySelector("#visit-message");
    if (visitMessage) {
        const lastVisit = localStorage.getItem("lastVisit");
        const now = Date.now();
        const oneDay = 86400000;

        if (!lastVisit) {
            visitMessage.textContent = "Welcome! Let Us Know if you have any questions.";
        } else {
            const daysAgo = Math.floor((now - lastVisit) / oneDay);
            if (daysAgo < 1) {
                visitMessage.textContent = "Back so soon! Awesome!";
            } else {
                visitMessage.textContent = `You last visited ${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago.`;
            }
        }
        localStorage.setItem("lastVisit", now);
    }

     const cardsContainer = document.querySelector("#cards-container");
    
    if (cardsContainer) {
        async function getMembers() {
            try {
                const response = await fetch('data/members.json');
                if (!response.ok) throw new Error("No se pudo cargar el archivo");
                const data = await response.json();
                
                data.forEach(member => {
                    const card = document.createElement("section");
                    card.classList.add("membership-levels");
                    card.innerHTML = `
                        <img src="images/${member.image}" alt="${member.name}" loading="lazy" width="200" height="150">
                        <h3>${member.name}</h3>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p>${member.description}</p>
                        <button>Learn More</button>
                    `;
                    cardsContainer.appendChild(card);
                });
            } catch (error) {
                console.error("Error loading JSON:", error);
            }
        }
        getMembers();
    }
});