async function searchPokemon() {
    // Taking the inputted data and converting the string to all lowercase for the API
    const pokemonInput = document.getElementById('search_name');
    const pokemonSearchName = pokemonInput.value.toLowerCase();

    // Searching the API with for the searched pokemon
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonSearchName}`;

    try {
        const response = await fetch(url);

        // Checks if the fetch request was successful
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }

        // Gathers the data for the searched pokemon and converts it to JSON
        const pokemonSearchedData = await response.json();
        // Checking we got the JSON data
        console.log(pokemonSearchedData);

        // Setting the variable to target the div we want to insert the data into
        const resultElement = document.getElementById('results');

        // Clear previous results
        resultElement.innerHTML = '';

        // Create the Pokemon display
        resultElement.innerHTML = `
        <div id="result_data">
            <img src="${pokemonSearchedData.sprites.front_default}" style="width:100px; height:100px;" alt="${pokemonSearchedData.name}">
            <h2><strong>${pokemonSearchedData.name}</strong></h2>
            <p id="results_details"><strong>Details:</strong></p>
            <p><strong>Type:</strong> ${pokemonSearchedData.types[0].type.name}</p>
            <p><strong>Stats:</strong></p>
            <p>${pokemonSearchedData.stats[0].stat.name}: ${pokemonSearchedData.stats[0].base_stat}</p>
            <p>${pokemonSearchedData.stats[1].stat.name}: ${pokemonSearchedData.stats[1].base_stat}</p>
            <p>${pokemonSearchedData.stats[2].stat.name}: ${pokemonSearchedData.stats[2].base_stat}</p>
            <p>${pokemonSearchedData.stats[3].stat.name}: ${pokemonSearchedData.stats[3].base_stat}</p>
            <p>${pokemonSearchedData.stats[4].stat.name}: ${pokemonSearchedData.stats[4].base_stat}</p>
            <p><strong>Weight: </strong>${pokemonSearchedData.weight}</p>
        </div>
        `;

        // Adding the abilities
        const abilitiesHeader = document.createElement('p');
        abilitiesHeader.innerHTML = '<strong>Abilities:</strong>';
        resultElement.appendChild(abilitiesHeader);

        pokemonSearchedData.abilities.forEach(abilityObj => {
            const abilityElement = document.createElement('p');
            abilityElement.textContent = abilityObj.ability.name;
            resultElement.appendChild(abilityElement);
        });

    } catch (error) {
        console.error(error);
        document.getElementById('results').innerHTML = '<p>Error fetching Pokémon data. Please check the name and try again.</p>';
    }
}

