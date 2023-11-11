// console.log('Funciona')

// const taskInput = document.querySelector('.task__input')
const taskAdd = document.querySelector('.task__add')
const taskInput = document.getElementById('taskInput')
const taskList = document.querySelector('.task__list')

taskAdd.addEventListener('click', function(event) {
    // Este botón se ejecutará cuando hagamos click en el botón "Añadir tarea"
    console.log(taskInput.value)

    //Alerta si dejamos vacío el input y lo retorna para que no se añada a la lista
    if (taskInput.value === '') {
        alert('El campo es requerido')
        return
    }

    // const button = document.createElement('button') // .createElement me permite crear etiquetas/elmentos html
    // button.textContent = 'Hola soy un botón'
    // document.body.appendChild(button) //Añade el botón en el body, así aparece en la página web

    const li = document.createElement('li') // Creamos una etiqueta de lista li con const li = ....

    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    li.appendChild(checkbox)

    // Creo una etiquera span con el valor del input para que no chanque el checkbox
    const span = document.createElement('span')
    span.textContent = taskInput.value
    li.appendChild(span)
    
    // TODO: Añadir un botón al li con el texto 'Borrar' y al hacer click en el botón que se elimine la fila de la tarea
    const button = document.createElement('button')
    button.textContent = 'Borrar'
    li.appendChild(button)


    // li.textContent = taskInput.value
    taskList.appendChild(li) // Y lo añade en la etiqueta task__list del html

    taskInput.value = '' // Borramos el contenido de la caja para que el usuario pueda ingresa más datos
})

taskList.addEventListener('click', function(event) {
    console.log(event)

    const target = event.target // Busco el elemento target del evento
    console.log(target)


    if (target.tagName === 'INPUT' && target.type === 'checkbox') {
        target.classList.toggle('completed') // Añade la clase completed
    }

    if(target.tagName === 'BUTTON') {
        target.parentElement.remove() // Borramos el item de la lista
    }
})


/*
taskAdd.addEventListener('click', function(event) {
    // Este botón se ejecutará cuando hagamos click en el botón "Añadir tarea"
    console.log(taskInput.value)

    // const button = document.createElement('button') // .createElement me permite crear etiquetas/elmentos html
    // button.textContent = 'Hola soy un botón'
    // document.body.appendChild(button) //Añade el botón en el body, así aparece en la página web

    const li = document.createElement('li') // Creamos una etiqueta de lista li con const li = ....
    li.textContent = taskInput.value
    
    taskList.appendChild(li) // Y lo añade en la etiqueta task__list del html

    taskInput.value = '' // Borramos el contenido de la caja para que el usuario pueda ingresa más datos
})
*/