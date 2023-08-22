// Helper function to get a random element from an array
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateHeritage() {
    const heritages = ['Akorosianisch', 'Skovländisch', 'Iruvianisch', 'Severosianisch', 'Dolchinseln', 'Tycherosianisch'];
    let random = Math.random();
    if (random < 0.5) return 'Akorosianisch';
    else if (random < 0.7) return 'Skovländisch';
    else if (random < 0.85) return 'Iruvianisch';
    else if (random < 0.95) return 'Severosianisch';
    else if (random < 0.98) return 'Dolchinseln';
    else return 'Tycherosianisch';
}

function generateName(heritage) {
    const names = {
        Akorosianisch: ["John", "Jane"],
        Skovländisch: ["Sven", "Helga"],
        Iruvianisch: ["Imran", "Aisha"],
        Severosianisch: ["Sergio", "Maria"],
        Dolchinseln: ["Diego", "Luna"],
        Tycherosianisch: ["Tycho", "Tyla"]
    };

    const surnames = {
        Akorosianisch: ["Doe", "Smith"],
        Skovländisch: ["Olsen", "Svensson"],
        Iruvianisch: ["Khan", "Hussain"],
        Severosianisch: ["Garcia", "Rodriguez"],
        Dolchinseln: ["Castillo", "Hernandez"],
        Tycherosianisch: ["Tychon", "Tyrel"]
    };

    return `${getRandomElement(names[heritage])} ${getRandomElement(surnames[heritage])}`;
}


function generateAge() {
    const weights = {
        '0-8': 0.02,
        '9-12': 0.05,
        '13-16': 0.05,
        '17-22': 0.05,
        '23-26': 0.17,
        '27-35': 0.18,
        '36-45': 0.18,
        '46-55': 0.10,
        '56-65': 0.05,
        '66-75': 0.06,
        '76-85': 0.05,
        '86-95': 0.03,
        '96-105': 0.01
    };

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

    const weights = {
        Proletariat: 0.7,
        Bourgeoisie: 0.25,
        Aristokratie: 0.05
    };

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
    const features = ['Ugly', 'Small eyes', 'Large nose', 'Chubby', 'Tall', 'Short'];
    return getRandomElement(features);
}

function generateClothing(personClass) {
    const categories = ['Kopfbedeckung', 'Oberteile', 'Mäntel/Oberbekleidung', 'Rüstung', 'Beinbekleidung', 'Schuhe', 'Accessoires'];

    const fullSets = {
        Proletariat: "Arbeiterkleidung",
        Bourgeoisie: "Stadtkleidung",
        Aristokratie: "Feine Robe"
    };

    const classBasedItems = {
        Proletariat: {
            'Kopfbedeckung': ['ProlMütze1', 'ProlMütze2'],
            'Oberteile': ['ProlHemd1', 'ProlHemd2'],
            'Mäntel/Oberbekleidung': ['ProlWeste1', 'ProlWeste2'],
            'Rüstung': ['ProlKeine'],
            'Beinbekleidung': ['ProlArbeitshose1', 'ProlArbeitshose2'],
            'Schuhe': ['ProlStiefel1', 'ProlStiefel2'],
            'Accessoires': ['ProlTuch1', 'ProlTuch2']
        },
        Bourgeoisie: {
            'Kopfbedeckung': ['BourgHut1', 'BourgHut2'],
            'Oberteile': ['BourgBluse1', 'BourgBluse2'],
            'Mäntel/Oberbekleidung': ['BourgMantel1', 'BourgMantel2'],
            'Rüstung': ['BourgKeine'],
            'Beinbekleidung': ['BourgRock1', 'BourgRock2'],
            'Schuhe': ['BourgSchuhe1', 'BourgSchuhe2'],
            'Accessoires': ['BourgHandschuh1', 'BourgHandschuh2']
        },
        Aristokratie: {
            'Kopfbedeckung': ['AristFedora1', 'AristFedora2'],
            'Oberteile': ['AristAnzugjacke1', 'AristAnzugjacke2'],
            'Mäntel/Oberbekleidung': ['AristTrenchcoat1', 'AristTrenchcoat2'],
            'Rüstung': ['AristKeine'],
            'Beinbekleidung': ['AristHosen1', 'AristHosen2'],
            'Schuhe': ['AristLederstiefel1', 'AristLederstiefel2'],
            'Accessoires': ['AristStock1', 'AristStock2']
        }
    };

    if (Math.random() > 0.5) { // 50% chance to generate a full set
        return fullSets[personClass];
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
    const professions = {
        Proletariat: "Worker",
        Bourgeoisie: "Merchant",
        Aristokratie: "Noble"
    };
    return professions[personClass];
}

function generateMotivation() {
    const motivations = ["Earn for family", "Gain political power", "Seek knowledge", "Amass wealth"];
    return getRandomElement(motivations);
}

function generateQuirks() {
    const quirks = ["Hums while working", "Has a nervous tic", "Always punctual", "Fidgets often"];
    return getRandomElement(quirks);
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
        motivation: generateMotivation(),
        quirks: generateQuirks(),
    };
}


function generateAndDisplay() {
    const selectedClass = document.getElementById("classSelect").value;
    const numberOfPersons = parseInt(document.getElementById("numPersons").value) || 1;
    const container = document.getElementById("outputContainer");

    // Clear existing table and buttons
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const table = document.createElement("table");
    table.id = "personTable";
    container.appendChild(table);

    // First, ensure that we have the appropriate number of rows for properties.
    const properties = ["name", "heritage", "age", "class", "looks", "clothing", "profession", "motivation", "quirks"];
    properties.forEach(() => table.insertRow());

    for (let i = 0; i < numberOfPersons; i++) {
        const person = generatePerson(selectedClass);
        properties.forEach((property, index) => {
            const row = table.rows[index];
            const cell = row.insertCell();
            cell.innerHTML = person[property];
        });
    }

    
    // Add a new row at the end of the table for the export buttons
    const buttonRow = table.insertRow();
    for (let i = 0; i < numberOfPersons; i++) {
        const buttonCell = buttonRow.insertCell();
        const exportButton = document.createElement("button");
        exportButton.innerHTML = "Export Person";
        exportButton.onclick = function() {
            const personColumns = Array.from(table.rows).map(row => row.cells[i].innerText);
            const personData = properties.reduce((acc, prop, idx) => {
                acc[prop] = personColumns[idx];
                return acc;
            }, {});
            exportPerson(personData);
        };
        buttonCell.appendChild(exportButton);
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

