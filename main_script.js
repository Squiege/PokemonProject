async function getPokemonInfo(pokemonName) {
    // Construct API URL
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    // Fetch the pokemon data
    const response = await fetch(url);

    const pokemonSearchedData = await response.json();
    return pokemonSearchedData;
}

document.addEventListener('DOMContentLoaded', async () => {
    // Name for Pokemon of the Day
    const pokemonName = 'zigzagoon';

    try {
        // Accesses the JSON Data
        const pokemonData = await getPokemonInfo(pokemonName);

        console.log(pokemonData);

        // Accessing the div to change the html
        const pokemonInfoElement = document.getElementById('potd');

        // Inserting the JSON data into the targetted div
        pokemonInfoElement.innerHTML = `
            <div id="potd_data">
                <img src="${pokemonData.sprites.front_default}" style="width:100px; height:100px;" alt="${pokemonData.name}"
                <h2><strong>${pokemonData.name}</strong></h2>
                <p id="potd_details"><strong>Details:</strong></p>
                <p><strong>Type:</strong> ${pokemonData.types[0].type.name}</p>
                <p><strong>Stats:</strong></p>
                <p>${pokemonData.stats[0].stat.name}: ${pokemonData.stats[0].base_stat}</p>
                <p>${pokemonData.stats[1].stat.name}: ${pokemonData.stats[1].base_stat}</p>
                <p>${pokemonData.stats[2].stat.name}: ${pokemonData.stats[2].base_stat}</p>
                <p>${pokemonData.stats[3].stat.name}: ${pokemonData.stats[3].base_stat}</p>
                <p>${pokemonData.stats[4].stat.name}: ${pokemonData.stats[4].base_stat}</p>
                <p><strong>Weight: </strong>${pokemonData.weight}</p>
            </div>
            `;

            // Add abilities dynamically
            const abilitiesHeader = document.createElement('p');
            abilitiesHeader.innerHTML = '<strong>Abilities:</strong>';
            pokemonInfoElement.appendChild(abilitiesHeader);

            pokemonData.abilities.forEach(abilityObj => {
                const abilityElement = document.createElement('p');
                abilityElement.textContent = abilityObj.ability.name;
                pokemonInfoElement.appendChild(abilityElement);
            });
    
    // Printing errors to the console if the data cannot be inserted
    } catch (error) {
        console.log('Error fetching Pokemon Data:', error);
    }
});