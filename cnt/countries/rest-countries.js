const findElement = (element,parent=document) => {
    return parent.querySelector(element)
}

const elCards = findElement(".cards");
const elTemplate = findElement("#template").content;
const elSearchInput = findElement("#search-input");
const elRegionSelect = findElement("#region")

function renderCountries(array, parent) {
    parent.innerHTML = null;
    const fragment = document.createDocumentFragment();
    array.forEach((country) => {
        const newCard = elTemplate.cloneNode(true);
        const img = findElement(".card-img-top", newCard);
        const title = findElement(".card-title", newCard);
        const population = findElement(".card-population", newCard);
        const region = findElement(".card-region", newCard);
        const capital = findElement(".card-capital", newCard);
        img.src = country.flags.png;
        title.textContent = country.name.common;
        population.textContent = country.population;
        region.textContent = country.region;
        capital.textContent = country.capital;
        
        fragment.appendChild(newCard);
    });
    parent.appendChild(fragment);
}

elSearchInput.addEventListener("input", (evt) => {

    const newArray = []
    countries.forEach((countries) => {
        if (countries.name.official.toLowerCase().includes(elSearchInput.value.toLowerCase())) {
            newArray.push(countries) 
        }
    });

    renderCountries(newArray, elCards)
});

elRegionSelect.addEventListener("change", (evt) => {
    if (elRegionSelect.value === "all") {
        fetch(`https://restcountries.com/v3.1/all`)
        .then((response) => response.json())
        .then((data) => {
            renderCountries(data, elCards);
        });
    }else{
        fetch(`https://restcountries.com/v3.1/region/${elRegionSelect.value}`)
        .then((res) => res.json())
        .then((res) => {
            renderCountries(res, elCards)
        })
    }
})

fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);  
        renderCountries(data, elCards);
        countries = data;
});