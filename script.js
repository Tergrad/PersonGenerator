// Helper function to get a random element from an array
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Landing Page Card selector
document.querySelectorAll('.classCard').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.classCard.active').forEach(activeCard => activeCard.classList.remove('active'));
        this.classList.add('active');
    });
});

//Person Number Slider
document.getElementById('numPersons').addEventListener('input', function() {
    document.getElementById('numPersonsDisplay').innerText = this.value;
});

function generateHeritage() {
    const heritage = heritagesData;
    let random = Math.random();
    if (random < 0.6) return 'Akorosianisch';
    else if (random < 0.75) return 'Skovländisch';
    else if (random < 0.83) return 'Iruvianisch';
    else if (random < 0.91) return 'Severosianisch';
    else if (random < 0.98) return 'Dolchinseln';
    else return 'Tycherosianisch';
}

function generateName(heritage) {
    const names = window.dataLibrary.names;
        const surnames = window.dataLibrary.surnames;

    return `${getRandomElement(names[heritage])} ${getRandomElement(surnames[heritage])}`;
}


function generateAge() {
    const weights = window.dataLibrary.ageWeights;

    let random = Math.random();
    let cumulativeWeight = 0;

    for (let ageRange in weights) {
        cumulativeWeight += weights[ageRange];
        if (random < cumulativeWeight) {
            let [minAge, maxAge] = ageRange.split('-').map(Number);
            return Math.floor(Math.random() * (maxAge - minAge + 1) + minAge);
        }
    }
}


function generateClass(specificClass = null) {
    if (specificClass && specificClass !== "All") {
        return specificClass;
    }

    const weights = window.dataLibrary.classWeights;

    let random = Math.random();

    if (random < weights.Proletariat) {
        return 'Proletariat';
    } else if (random < weights.Proletariat + weights.Bourgeoisie) {
        return 'Bourgeoisie';
    } else {
        return 'Aristokratie';
    }
}


function generateLooks() {
    const features = window.dataLibrary.features;
    return getRandomElement(features);
}

function generateClothing(personClass) {
    const categories = window.dataLibrary.categories;

    const fullSets = window.dataLibrary.fullSets;

    const classBasedItems = window.dataLibrary.classBasedItems;

    if (Math.random() > 0.5) { // 50% chance to generate a full set
        return getRandomElement(fullSets[personClass]);
    } else {
        let clothingList = '<ul class="clothing-list">';
        categories.forEach(category => {
            let randomItem = getRandomElement(classBasedItems[personClass][category]); // using getRandomElement to get one random item from the list for that category
            clothingList += `<li>${randomItem}</li>`;
        });
        clothingList += '</ul>';
        return clothingList;
    }
}

function generateProfession(personClass) {
    // Placeholder: add professions for each class
    const professions = window.dataLibrary.professions;
    return getRandomElement(professions[personClass]);
}


function generateGoals() {
    const goals = window.dataLibrary.goals;
    return getRandomElement(goals);
}



function generateTraits() {
    const traits = window.dataLibrary.traits;
    return getRandomElement(traits);
}

function generateInterests() {
    const interests = window.dataLibrary.interests;
    return getRandomElement(interests);
}


function generateQuirks() {
    const quirks = window.dataLibrary.quirks;
    return getRandomElement(quirks);
}

function generateMethods() {
    const methods = window.dataLibrary.methods;
    return getRandomElement(methods);
}




function generatePerson(specificClass) {
    const heritage = generateHeritage();
    const personClass = generateClass(specificClass);
    return {
        name: generateName(heritage),
        heritage: heritage,
        age: generateAge(),
        class: personClass,
        looks: generateLooks(),
        clothing: generateClothing(personClass),
        profession: generateProfession(personClass),
        goals: generateGoals(),
        traits: generateTraits(),
        interests: generateInterests(),
        quirks: generateQuirks(),
        methods: generateMethods()
        
    };
}


function generateAndDisplay() {
    // Get the number of persons to generate
    const numPersons = document.getElementById('numPersons').value;

    // Get the specific class, if any, from the active class card
    const activeClassCard = document.querySelector('.classCard.active');
    const specificClass = activeClassCard ? activeClassCard.getAttribute('data-class') : null;

    // Clear out old displayed persons
    const outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML = '';  // Clears any previous content

    // Generate and display the persons
    for (let i = 0; i < numPersons; i++) {
        const person = generatePerson(specificClass);

        // Create a new card div for this person
        const personCard = document.createElement('div');
        personCard.className = 'personCard';

        // Add the generated details to the card
        personCard.innerHTML = `
            <div class="cardHeader">${person.name}</div>
            <div class="cardDetail"><strong>Herkunft:</strong> ${person.heritage}</div>
            <div class="cardDetail"><strong>Alter:</strong> ${person.age}</div>
            <div class="cardDetail"><strong>Klasse:</strong> ${person.class}</div>
            <div class="cardDetail"><strong>Beruf:</strong> ${person.profession}</div>
            <div class="cardDetail"><strong>Looks:</strong> ${person.looks}</div>
            <div class="cardDetail"><strong>Kleidung:</strong> ${person.clothing}</div>
            <div class="cardDetail"><strong>Ziele:</strong> ${person.goals}</div>
            <div class="cardDetail"><strong>Eigenschaften:</strong> ${person.traits}</div>
            <div class="cardDetail"><strong>Interessen:</strong> ${person.interests}</div>
            <div class="cardDetail"><strong>Quirks:</strong> ${person.quirks}</div>
            <div class="cardDetail"><strong>Methoden:</strong> ${person.methods}</div>
        `;

        // Append the card to the output container
        outputContainer.appendChild(personCard);
    }
}


function exportPerson(person) {
    let tableString = "Property,Value\n"; // CSV format starts with headers

    Object.keys(person).forEach(key => {
        tableString += `${key},${person[key]}\n`; // Append each property and its value
    });

    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(tableString);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", person.name + ".csv"); // changing to .csv format
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}