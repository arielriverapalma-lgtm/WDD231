const companies = [
    {name: "Hotel Oro Verde", address: "Av Malecon y calle 23", phone: "05-262-9200", website: "https://www.oroverdemanta.com/es/", image: "images/hotel_oro_11zon.webp", membershipLevel: "Gold"},
    {name: "Port Terminal", address: "Av. Jaime Chavez Guitierrez", phone: "05-370-0060", website:"https://www.tpm.ec/", image: "images/puerto_11zon.webp", membershipLevel: "Gold"},
    {name:"Guso's BBQ", address: "Av. Flavio Reyes", phone: "099-123-4567", website: "#none", image: "/images/guso_11zon.webp", membershipLevel: "Silver"},
    {name: "FishCoorp", address: "Av. Flavio Reyes", phone: "098-765-4321", website: "https://www.fishcorpsa.com.ec/", image: "images/fish_corp_11zon.webp", membershipLevel: "Silver"},
    {name: "Conservas Isabel", address: "Via San Mateo", phone: "05-262-1120", website: "https://www.isabel.net/", image: "images/isabel_11zon.webp", membershipLevel: "Gold"},
    {name: "ULEAM", address: "Via San Mateo", phone: "05-562-3026", website: "https://www.uleam.edu.ec/", image: "images/uleam_11zon.webp", membershipLevel: "Gold"},
    {name: "Eurofish", address: "La Pradera", phone: "099-888-9999", website: "https://www.eurofish.com.ec/", image: "images/eurofish_11zon.webp", membershipLevel: "Silver"}
];

function displayMembers() {
    const container = document.getElementById("members-container");
    if (!container) return;

    const featuredMembers = companies.filter(
        company => company.membershipLevel === "Gold" || company.membershipLevel === "Silver"
    );

    const randomMembers = featuredMembers.sort(() => Math.random() - 0.5).slice(0, 3);

    let html = "";

    randomMembers.forEach(company => {
        const badgeClass = company.membershipLevel === "Gold" ? "gold-member" : "silver-member";

        const websiteLink = company.website && company.website !== "#none"
            ? `<a href="${company.website}" target="_blank" rel="noopener">Website</a>`
            : `<span>No website</span>`;

        html += `
            <div class="member-card ${badgeClass}">
                <img src="${company.image}" alt="${company.name}" loading="lazy">
                <h3>${company.name}</h3>
                <p>${company.address}</p>
                <p>${company.phone}</p>
                <div class="member-link">${websiteLink}</div>
                <span class="badge">${company.membershipLevel}</span>
            </div>
        `;
    });

    container.innerHTML = html;
}

async function displayWeather() {
    const weatherContainer = document.getElementById("weather-container");
    const forecastContainer = document.getElementById("forecast-container");

    if (!weatherContainer || !forecastContainer) return;

    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=-0.95&longitude=-80.72&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto"
        );

        const data = await response.json();

        const temperature = Math.round(data.current_weather.temperature);

        weatherContainer.innerHTML = `
            <p><strong>${temperature}°C</strong></p>
            <p>Manta, Manabí</p>
        `;

        forecastContainer.innerHTML = `
            <div class="forecast-day">
                <p>Tomorrow</p>
                <p>${Math.round(data.daily.temperature_2m_max[1])}° / ${Math.round(data.daily.temperature_2m_min[1])}°</p>
            </div>
            <div class="forecast-day">
                <p>Next Day</p>
                <p>${Math.round(data.daily.temperature_2m_max[2])}° / ${Math.round(data.daily.temperature_2m_min[2])}°</p>
            </div>
            <div class="forecast-day">
                <p>Later</p>
                <p>${Math.round(data.daily.temperature_2m_max[3])}° / ${Math.round(data.daily.temperature_2m_min[3])}°</p>
            </div>
        `;

    } catch (error) {
        console.error("Weather error:", error);
        weatherContainer.innerHTML = "<p>Not available</p>";
        forecastContainer.innerHTML = "<p>Not available</p>";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayMembers();
    displayWeather();
});