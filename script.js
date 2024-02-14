// NOTA para requerimiento 6: Documentar la escalabilidad de la solución
// Esta solución utiliza un algoritmo de fuerza bruta para encontrar el conjunto óptimo de elementos,
// lo que puede ser eficiente para un pequeño número de elementos, pero puede ser menos escalable para conjuntos grandes.

// Definición de la clase Elemento para representar los elementos en la lista
class Element {
    constructor(weight, calories) {
        this.weight = weight; // Peso del elemento
        this.calories = calories; // Calorías del elemento
    }
}

// Función para encontrar el conjunto óptimo de elementos
const findOptimalElements = (elements, minimumCalories, maximumWeight) => {
    let bestSet = [];
    let bestCalories = 0;
    let bestWeight = 0;

    // Algoritmo para probar todas las combinaciones posibles de elementos
    for (let i = 1; i < (1 << elements.length); i++) {
        let combination = [];
        let totalCalories = 0;
        let totalWeight = 0;

        // Seleccionar elementos según la combinación actual
        for (let j = 0; j < elements.length; j++) {
            if ((i & (1 << j)) > 0) {
                combination.push({ element: elements[j], position: j + 1 })
                totalCalories += elements[j].calories;
                totalWeight += elements[j].weight;
            }
        }

        // Verificar si la combinación actual es válida y óptima
        if (totalCalories >= minimumCalories && totalWeight <= maximumWeight) {
            if (totalCalories > bestCalories || (totalCalories === bestCalories && totalWeight < bestWeight)) {
                bestSet = combination;
                bestCalories = totalCalories;
                bestWeight = totalWeight;
            }
        }
    }

    return bestSet;
}

// Función para mostrar los resultados al usuario
const showResults = (results) => {
    let message = "<h2>Conjunto óptimo:</h2>";
    for (let i = 0; i < results.length; i++) {
        if (results[i].length === 0) {
            message += "<p>No hay conjunto :(</p>";
        } else {
            message += "<ul>";
            for (let j = 0; j < results[i].length; j++) {
                const element = results[i][j].element;
                const position = results[i][j].position;
                message += `<li>Elemento ${position} - Peso: ${element.weight}, Calorías: ${element.calories}</li>`;
            }
            message += "</ul>";
        }

        const totalCalories = results[i].reduce((acc, el) => acc + el.element.calories, 0);
        const totalWeight = results[i].reduce((acc, el) => acc + el.element.weight, 0);
        message += `<p>Total de calorías: ${totalCalories}</p>`;
        message += `<p>Total de peso: ${totalWeight}</p>`;
    }
    document.getElementById("results").innerHTML = message;
}

// Función para agregar los elementos a través de una ventana emergente
const addElementInputs = () => {
    const numElements = parseInt(prompt("Ingrese la cantidad de elementos (no superior a 10):"));
    if (numElements <= 0 || numElements > 10 || isNaN(numElements)) {
        alert("La cantidad de elementos debe ser un número entre 1 y 10.");
        return;
    }

    const elements = [];
    for (let i = 0; i < numElements; i++) {
        const weight = parseInt(prompt(`Introduce el peso del elemento ${i + 1}:`));
        const calories = parseInt(prompt(`Introduce las calorías del elemento ${i + 1}:`));
        elements.push(new Element(weight, calories));
    }

    // Encontrar el conjunto óptimo de elementos
    const minimumCalories = parseInt(document.getElementById("minimumCalories").value);
    const maximumWeight = parseInt(document.getElementById("maximumWeight").value);
    const results = [findOptimalElements(elements, minimumCalories, maximumWeight)];

    // Mostrar los resultados al usuario
    showResults(results);
}

// Función para limpiar el formulario
const clearForm = () => {
    document.getElementById("minimumCalories").value = "";
    document.getElementById("maximumWeight").value = "";
    document.getElementById("results").innerHTML = "";
}
