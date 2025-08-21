const calculateBtn = document.getElementById('calculate-btn');
const totalExpenseDiv = document.getElementById('total-expense');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const htmlElement = document.documentElement;

// New elements for presets and splitting
const distancePreset = document.getElementById('distance-preset');
const tollsPreset = document.getElementById('tolls-preset');
const distanceInput = document.getElementById('distance');
const tollsInput = document.getElementById('tolls');
const roundTripCheckbox = document.getElementById('round-trip');

const splitCostDiv = document.getElementById('split-cost');
const splitBtn = document.getElementById('split-btn');
const splitResultDiv = document.getElementById('split-result');
const peopleCountInput = document.getElementById('people-count');

let currentTotalCost = 0;

distancePreset.addEventListener('change', (e) => {
    if (e.target.value) {
        distanceInput.value = e.target.value;
    }
});

tollsPreset.addEventListener('change', (e) => {
    if (e.target.value) {
        tollsInput.value = e.target.value;
    }
});

distanceInput.addEventListener('input', () => {
    if (distancePreset.value) {
        distancePreset.value = "";
    }
});

tollsInput.addEventListener('input', () => {
    if (tollsPreset.value) {
        tollsPreset.value = "";
    }
});


calculateBtn.addEventListener('click', () => {
    const fuelPrice = parseFloat(document.getElementById('fuel-price').value);
    const fuelConsumption = parseFloat(document.getElementById('fuel-consumption').value);
    let distance = parseFloat(distanceInput.value);
    let tolls = parseFloat(tollsInput.value) || 0;
    const extraCosts = parseFloat(document.getElementById('extra-costs').value) || 0;
    const discounts = parseFloat(document.getElementById('discounts').value) || 0;
    
    const isRoundTrip = roundTripCheckbox.checked;

    if (isNaN(fuelPrice) || isNaN(fuelConsumption) || isNaN(distance)) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (fuelConsumption <= 0) {
        alert('O consumo do veículo deve ser um número positivo.');
        return;
    }

    if (isRoundTrip) {
        distance *= 2;
        tolls *= 2;
    }

    const fuelCost = (distance / fuelConsumption) * fuelPrice;
    const totalCost = fuelCost + tolls + extraCosts - discounts;
    currentTotalCost = totalCost; // Store for splitting

    totalExpenseDiv.innerHTML = `
        <h3>Detalhamento do Custo</h3>
        <p><span>Custo do Combustível:</span> <span>R$${fuelCost.toFixed(2)}</span></p>
        <p><span>Pedágios:</span> <span>R$${tolls.toFixed(2)}</span></p>
        <p><span>Custos Extras:</span> <span>R$${extraCosts.toFixed(2)}</span></p>
        <p><span>Descontos:</span> <span>-R$${discounts.toFixed(2)}</span></p>
        <p class="final-total"><span>Custo Total:</span> <span>R$${totalCost.toFixed(2)}</span></p>
    `;

    splitCostDiv.classList.remove('hidden');
    splitResultDiv.innerHTML = ""; // Clear previous split result
    peopleCountInput.value = ""; // Clear previous people count
});

splitBtn.addEventListener('click', () => {
    const peopleCount = parseInt(peopleCountInput.value);

    if (isNaN(peopleCount) || peopleCount <= 1) {
        alert('Por favor, insira um número de pessoas válido (maior que 1).');
        return;
    }

    const costPerPerson = currentTotalCost / peopleCount;
    splitResultDiv.innerHTML = `<p>Custo por pessoa: <strong>R$${costPerPerson.toFixed(2)}</strong></p>`;
});


themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});
