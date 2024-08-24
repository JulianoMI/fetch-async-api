const form = document.querySelector('form');
const factContainer = document.getElementById('fact-container');

// Compile the Handlebars template
let factTemplate = Handlebars.compile(document.getElementById("fact-template").innerHTML);

async function fetchFact(number) {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/http://numbersapi.com/${number}`, {
            headers: {
                'x-requested-with': 'text/plain'
            }
        });
        const fact = await response.text();
        return fact;
    } catch (error) {
        console.error(error);
        return "An error occurred while fetching the fact.";
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const number = event.target.querySelector('input[type="number"]').value;
    factContainer.innerHTML = factTemplate({ fact: "Please Wait! ⌛" });

    const fact = await fetchFact(number);
    factContainer.innerHTML = factTemplate({ fact });
});
