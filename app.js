
const searchInput = document.querySelector('#poke-input')
const pokeContainerDOM = document.querySelector('.poke-container')

pokeCount = 151;

const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#d6b3ff",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#e0f5ff "
}

// initialize pokemon
const initPokemon = async () => {
    for (let i = 1; i <= pokeCount; i++) {
        await getPokemon(i)
    }
}

// get pokemons data
async function getPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()

    // console.log(data)
    createPokeBox(data)
}

initPokemon()

// create pokemon boxes
function createPokeBox(pokemon) {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, "0")
    const weight = pokemon.weight
    const type = pokemon.types[0].type.name
    const color = colors[type]


    const element = document.createElement('div')
    element.classList.add('poke-box')
    element.style.backgroundColor = color
    element.innerHTML = `
        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="pokemon">
        <h4 class="poke-name">${name}</h4>
        <p>#${id}</p>
        <p>${weight}Kg</p>
        <p>Type: ${type}</p
    `
    pokeContainerDOM.append(element)
}


// search by pokemon names

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase()
    const pokeNames = document.querySelectorAll('.poke-name')

    pokeNames.forEach((pokeName) => {
        pokeName.parentElement.style.display = "block"

        if (!pokeName.innerText.toLowerCase().includes(searchValue)) {
            pokeName.parentElement.style.display = "none"
        }
    })
})