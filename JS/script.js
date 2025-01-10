const listaProyectos = document.getElementById("lista-proyectos");
const formProyecto = document.getElementById("form-proyecto");
const nombreProyecto = document.getElementById("nombre-proyecto");
const descripcionProyecto = document.getElementById("descripcion-proyecto");

let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];

function guardarProyectosEnLocalStorage() {
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
}

function renderizarProyectos() {
    listaProyectos.innerHTML = "";

    if (proyectos.length === 0) {
        listaProyectos.innerHTML = "<p>No hay proyectos disponibles.</p>";
        return;
    }

    proyectos.forEach((proyecto, index) => {
        const proyectoDiv = document.createElement("div");
        proyectoDiv.classList.add("proyecto");
        proyectoDiv.innerHTML = `
            <h3>${proyecto.nombre}</h3>
            <p>${proyecto.descripcion}</p>
            <button class="eliminar-proyecto" data-index="${index}">Eliminar</button>
        `;
        listaProyectos.appendChild(proyectoDiv);
    });

    const botonesEliminar = document.querySelectorAll(".eliminar-proyecto");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", eliminarProyecto);
    });
}

formProyecto.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = nombreProyecto.value.trim();
    const descripcion = descripcionProyecto.value.trim();

    if (!nombre) {
        alert("El nombre del proyecto es obligatorio.");
        return;
    }

    const nuevoProyecto = { nombre, descripcion };
    proyectos.push(nuevoProyecto);

    guardarProyectosEnLocalStorage();
    renderizarProyectos();
    formProyecto.reset();
});

function eliminarProyecto(e) {
    const index = e.target.getAttribute("data-index");
    proyectos.splice(index, 1);

    guardarProyectosEnLocalStorage();
    renderizarProyectos();
}

renderizarProyectos();