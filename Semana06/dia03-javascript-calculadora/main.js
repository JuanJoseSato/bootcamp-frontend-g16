console.log('Hola Javascript!')

let numeroActual = '0' // let permite reasignar los valores a diferencia del const
let operador = ''
let operando = ''

const inputDisplay = document.querySelector('.inputDisplay') //Acceder a la clase inputDisplay del html

const buttons = document.querySelectorAll('.button') // Acceder a todas las clases button NOTA: si quiero todas las etiqueta button, sería sin el punto 

// console.log(inputDisplay)
// console.log(buttons)

// EVENTOS

buttons.forEach(function(button){ // forEach:Acceder a cada uno de los elementos de la lista
    // console.log(button)

    // addEventListener:Agrega un evento y lo que se aplica
    button.addEventListener('click',function(event) {
        // console.log('Me hicieron click, auxilio!')
        // console.log(event)

        const button = event.target // Busca la propiedad target la cual indica el boton que sea presionado
        const buttonText = button.textContent // Busca la propiedad textContent que indica el número de dicho boton

        //console.log(buttonText)

        if('+-*'.includes(buttonText)) {
            operador = buttonText
            operando = Number(numeroActual)
            numeroActual = '0' // Reiniciamos el numero que se muestra en 0 para que se ingrese el siguiente operando
        } else if (buttonText === '=') {
            // Aquí realizo las operaciones matemáticas en base al número actual y el operando
            if(operador == '+') {
                numeroActual = Number(operando) + Number(numeroActual)
            } else if (operador === '-') {
                numeroActual = Number(operando) - Number(numeroActual)
            } else if (operador === '*') {
                numeroActual = Number(operando) * Number(numeroActual)

            }
            
        } else if (buttonText === 'AC') {
            numeroActual = '0'
            // También limpio el operador y el operando
            operador = ''
            operando = ''
        } else { //Se presinó algún número
            numeroActual = Number(numeroActual + buttonText) // Concatena y lo transforma en numero     
        }

        inputDisplay.value = numeroActual

    })
})