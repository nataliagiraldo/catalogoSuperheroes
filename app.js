
let superheroes = [];
document.addEventListener('DOMContentLoaded', async (e) => {
    superheroes = await loadData();
    agregarSection();
});

async function loadData() {
    return await fetch("data.json").then(response => response.json());
}

const contenedor = document.getElementsByClassName("contenedor")[0];

const agregarSection = () => {
    superheroes.forEach((grupoSuperheroes) => {
        const section = document.createElement('section');
        section.className = "categoria";
        section.id = grupoSuperheroes.nombre;
        section.innerHTML = `
            <div class="encabezado">
                <img class="fotoLogo" src="${grupoSuperheroes.logo}" alt="">
                <h2 class="titulo">${grupoSuperheroes.nombre}</h2>
            </div>`;

    
        let contenido = document.createElement('div');
        contenido.className = "contenido"; 
        
        grupoSuperheroes.personajes.forEach((personaje) => {
            
            contenido.innerHTML += `
                <div id="personaje${personaje.id}" class="contenedorTarjeta">
                    <img src="${personaje.imagen}" alt="">
                    <h3>${personaje.nombre}</h3>
                    <button class="abrir" id="${personaje.id}">Ver más</button>
                </div>`;
        });

        // Agregar la sección al contenido, no al section directamente
        section.appendChild(contenido);
        contenedor.appendChild(section);
    });





    const btnAbrir = document.querySelectorAll('.abrir');
    const btnCerrar = document.querySelectorAll('.salirP');

    btnAbrir.forEach(btn => {
        btn.addEventListener('click', detectarClick)
    })


    btnCerrar.forEach(btn => {
        btn.addEventListener('click', function () {
            dialog.classList = "esconder";
            opacity.classList.toggle("esconder");
        });
    })

};

const dialog = document.querySelector('.dialogo');
const opacity = document.querySelector('.fondo')
const imgModal = dialog.querySelector('.imgPPersonaje');
const tituloModal = dialog.querySelector('.nombrePersonaje');
const descripcion = dialog.querySelector('.descripcionP');
const fecha = dialog.querySelector('.fechaP');


function detectarClick(event) {
    if (event.target.classList.contains("abrir")) {
        const id = Number(event.target.id);
        buscar(id)

    }
}

function buscar(id) {
    let hero
    for (const i of superheroes) {
        for (const personaje of i.personajes) {
            personaje.id == id ? hero = personaje : ''
        }
    }


    mostrarModal(hero);
}

function mostrarModal(hero) {
    opacity.classList.toggle("esconder");
    dialog.classList.toggle("esconder");
    imgModal.src = hero.imagen;
    tituloModal.textContent = hero.nombre;
    descripcion.textContent = hero.descripcion;
    fecha.innerHTML = `<strong>Fecha de creacion: </strong> ${hero.anioCreacion}`

}

const marvel = document.getElementById("Marvel");
const dc = document.getElementById("DC");
const marvelCat = document.getElementById("categMarvel");
const dcCat = document.getElementById("categDC");

function ocultar(e) {
    e.classList.add("esconder");
}
function mostrar(e) {
    e.classList.remove("esconder");
}

function ocultarResto(idVisible, clase) {
    let elementosConClase = document.querySelectorAll(clase);
    elementosConClase.forEach(function (elemento) {
        if (elemento.id === idVisible) {
            elemento.classList.remove("esconder");
        } else {
            elemento.classList.add("esconder");
        }
    });
}
marvelCat.addEventListener('click', function () {

    ocultarResto('Marvel', 'section');
});

dcCat.addEventListener('click', function () {

    ocultarResto('DC', 'section');
});



// buscar
const busquedaInput = document.getElementById("search");
busquedaInput.addEventListener("input", (e) => {
    const value = e.target.value;
    mostrarVarios(buscarPersonajes(value), "contenedorTarjeta")
})

function buscarPersonajes(input) {
    let heros = [];
    for (const i of superheroes) {
        for (const personaje of i.personajes) {
            if (personaje.nombre.toLowerCase().includes(input.toLowerCase())) {
                heros.push("personaje" + personaje.id)

            }
        }
    }
    return heros;
}

function mostrarVarios(listaId, clase) {
    console.log("hola");
    let elementosConClase = document.getElementsByClassName(clase);
    console.log("xd" + listaId[0]);

    Array.from(elementosConClase).forEach((elemento) => {
        console.log(elemento);
        if (listaId.includes(elemento.id)) {
            elemento.classList.remove("esconder");
        } else {
            elemento.classList.add("esconder");
        }
    });
}

