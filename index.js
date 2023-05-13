let pokemons = JSON.parse(sessionStorage.getItem('pokemonList')) || []
let notSeen = []

if (!pokemons.length) {
  fetch('https://pokeapi.co/api/v2/generation/1')
    .then((response) => response.json())
    .then((result) => {
      pokemons = result.pokemon_species.map((obj) => obj.name)
    })
    .catch((error) => {
      console.log('error', error)
      pokemons = [
        'abra',
        'bulbasaur',
        'charizard',
        'pikachu',
        'snorlax',
        'gyarados',
        'mewtwo',
        'psyduck',
      ]
    })
    .finally(() => {
      sessionStorage.setItem('pokemonList', JSON.stringify(pokemons))
    })
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max)
}

function spawnPokemon() {
  if (!pokemons.length) return
  if (!notSeen.length) notSeen = pokemons.slice()

  const newPokemonEl = document.createElement('img')
  const index = getRandomNumber(notSeen.length)
  const currentPokemon = notSeen[index]

  notSeen.splice(index, 1)

  newPokemonEl.setAttribute(
    'src',
    'https://img.pokemondb.net/sprites/firered-leafgreen/normal/' +
      currentPokemon +
      '.png',
  )

  newPokemonEl.style.left = getRandomNumber(window.innerWidth - 50) + 'px'
  newPokemonEl.style.top = getRandomNumber(window.innerHeight - 50) + 'px'
  newPokemonEl.className = 'sprite fade-out'

  document.body.appendChild(newPokemonEl)

  setTimeout(function () {
    newPokemonEl.style.opacity = 0
  }, 3000)
  setTimeout(function () {
    newPokemonEl.remove()
  }, 5000)
}

document.getElementById('pokespawn').addEventListener('click', spawnPokemon)
