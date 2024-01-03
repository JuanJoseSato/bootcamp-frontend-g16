// console.log('Hola JS!')

// https://restcountries.com/v3.1/all

// https://restcountries.com/v3.1/all?fields=name

// https://restcountries.com/v3.1/all?fields=name,flags,capital,population,languages,currencies,timezones

const url = 'https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,languages,currencies,timezones' // API


let countryData = [] //Declaramos un arreglo

const searchInput = document.querySelector('.app__input')
const filterSelect = document.querySelector('.app__filter')
const resultsDiv = document.querySelector('.app__results')


// function fetchCountries() {
//    return fetch(url) // Promise
//        .then(response => response.json())
//        .catch(error => console.loge(error)) // Mensaj de error en caso lo hubiera
//}

// Programamos el buscador
// Le agregamos un evento a searchInput
searchInput.addEventListener('input', (event) => {
  // const value = searchInput.value sería lo mismo
  const value = event.target.value
  const loweredValue = value.toLowerCase() // Con .toLowerCase convierto todo a minusculas porque el includes respeta mayusculas 
  

  // console.log(value) // Imprime la letra cada vez que se va escribiendo en la caja de texto

  const filteredCountries = countryData.filter(
    country => {
      
      // Buscar por país
      const loweredName = country.name.common.toLowerCase() // Con .toLowerCase convierto todo a minusculas porque el includes respeta mayusculas y minusculas

      // Buscar por capital
      const joinedCapitals = country.capital.join(',') // "join" une todos los elementos de un arreglo en una cadena de texto y en este caso separados por comas
      const loweredCapitals = joinedCapitals.toLowerCase()

      return loweredName.includes(loweredValue) || loweredCapitals.includes(loweredValue)// Lo que escribí en la caja de texto está incluido en name or en capitals?
      // return true // Devuelver todos los países
    }
  )

  renderCountries(filteredCountries)
  renderResults(filteredCountries)
})

//Filtrar por Región
filterSelect.addEventListener('input', (event) => {
  // console.log(event.target.value)
  const value = event.target.value
  const loweredValue = value.toLowerCase()

  const filteredCountriesByRegion = countryData.filter(
    country => {
      const loweredRegion = country.region.toLowerCase()

      return loweredRegion.includes(loweredValue)
    }
  )

  renderCountries(filteredCountriesByRegion)
  renderResults(filteredCountriesByRegion)
})

// TODO: Rescribir la función fetchCountris usando async/await para la función


const fetchCountries = async () => {
    try {
        const response = await fetch(url) // Promise

        if(!response.ok) {
            throw new Error('ERROR:', response.status)
        }

        const json = await response.json()

        return json
    } catch(error) {
        console.log(error)
    }
}

// Mostrar cantidad de paises filtrados
const renderResults = (countriesFiltered) => {
  const total = countriesFiltered.length

  resultsDiv.textContent = `${total} Countries Filtered`
   
}

const renderCountries = (countries = []) => {
    // console.log(countries)

    const countryListElement = document.querySelector('.app__list')

    let countryList = ''

    // Mostrar mensaje cuando no hay ningun resultado
    if (countries.length == 0) {
      countryListElement.classList.add('app__list--no-found') // Creamos una clase para darle estilos
      countryListElement.innerHTML = `
      <img src="./images/icon-sad-square.svg" width="100" height="100" />
      <p>Sorry, no results found!</p>
      `

      return // Ya no se ejecutan las líneas siguientes
    }

    countryListElement.classList.remove('app__list--no-found') // Removemos la clase para que no se queden los estilos del mensaje como el fondo

    countries.forEach(country => {
        // console.log(country)
        countryList += `
            <div class="country">
            <img class="country__flag" src="${country.flags.png}" alt="${country.flags.alt}">
            <div class="country__wrapper">
              <h2 class="country__title">${country.name.common}</h2>
              <div class="country__description">
                <strong>Population:</strong> ${country.population}
              </div>
              <div class="country__description">
                <strong>Region:</strong> ${country.region}
              </div>
              <div class="country__description">
                <strong>Capital:</strong> ${country.capital[0]}
              </div>
            </div>
        
          </div>
        `
    })

    // console.log(countryList)

    countryListElement.innerHTML = countryList
}


// DOMContentLoaded -> Es un evento del navegador que espera a que el DOM esté cargado

document.addEventListener('DOMContentLoaded', async () => {
    console.log('¡Mi DOM ya cargó!')

    //fetchCountries()
    //    .then(data => renderCountries(data)) // en data está lo que devolvió .then(response => response.json())

    const data = await fetchCountries()

    countryData = data //Almacenamos todos los paises en el arreglo countryData

    renderCountries(data)

})

