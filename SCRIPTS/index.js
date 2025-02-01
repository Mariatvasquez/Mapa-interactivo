class InfoRegion {
    constructor(estados, region, resena, generos) {
        this.estados = estados;
        this.region = region;
        this.resena = resena;
        this.generos = generos;
    }

    obtenerInformacion() {
        return {
            region: this.region,
            resena: this.resena,
            generos: this.generos
        };
    }
}

// Definición de las regiones como instancias de InfoRegion
const regionLlanos = new InfoRegion(
    ["est.guarico", "est.apure", "est.barinas", "est.cojedes", "est.portuguesa"],
    "Los Llanos",
    "La música llanera es el género más representativo de esta región, caracterizada por el uso del arpa, cuatro y maracas.",
    ["Joropo", "Golpe", "Pasaje"]
);

const regionAndes = new InfoRegion(
    ["est.tachira", "est.trujillo", "est.merida"],
    "Andina",
    "La música andina venezolana se caracteriza por el uso de instrumentos como la guitarra, el violín y la bandola.",
    ["Bambuco", "Vals", "Pasillo"]
);

const regionOriental = new InfoRegion(
    ["est.anzoategui", "est.monagas", "est.sucre", "est.nueva esparta", "est.dependencias federales"],
    "Oriental",
    "La música oriental combina influencias caribeñas y africanas, con géneros como el joropo oriental y la gaita.",
    ["Joropo Oriental", "Gaita", "Polo"]
);

const regionCentral = new InfoRegion(
    ["est.aragua", "est.miranda", "est.vargas", "est.distrito capital", "est.carabobo"],
    "Central",
    "La región central es conocida por su diversidad musical, incluyendo géneros como el calipso y la salsa.",
    ["Calipso", "Salsa", "Merengue"]
);

const regionOccidente = new InfoRegion(
    ["est.lara", "est.falcon", "est.yaracuy"],
    "Occidental",
    "La música occidental incluye géneros como el tamunangue y el golpe tocuyano.",
    ["Tamunangue", "Golpe Tocuyano"]
);

const regionGuayana = new InfoRegion(
    ["est.amazonas", "est.bolivar", "est.delta amacuro"],
    "Guayana",
    "La música de Guayana tiene influencias indígenas y africanas, con géneros como el maremare y el calipso.",
    ["Maremare", "Calipso"]
);

const regionZuliana = new InfoRegion(
    ["est.zulia"],
    "Zuliana",
    "La región zuliana es famosa por la gaita, un género musical típico de la época navideña.",
    ["Gaita Zuliana"]
);

// Lista de todas las regiones
const regiones = [regionLlanos, regionAndes, regionOriental, regionCentral, regionOccidente, regionGuayana, regionZuliana];

// Función para obtener la información de una región por el ID del estado
function obtenerInformacionRegion(estadoId) {
    for (const region of regiones) {
        if (region.estados.includes(estadoId)) {
            const infoRegion = region.obtenerInformacion();
            return {
                nombre: estadoId.replace("est.", "").toUpperCase(),
                region: infoRegion.region,
                resena: infoRegion.resena,
                generos: infoRegion.generos
            };
        }
    }

    return {
        nombre: "Desconocido",
        region: "Desconocida",
        resena: "No hay información disponible.",
        generos: []
    };
}

// Función para colorear los estados
function colorearEstados(region, color) {
    region.estados.forEach(estado => {
        const elemento = document.getElementById(estado);
        if (elemento) {
            elemento.setAttribute("fill", color);
        } else {
            console.warn(`El estado con ID "${estado}" no fue encontrado.`);
        }
    });
}

// Colorear los estados según la región
colorearEstados(regionLlanos, "#72ac18");
colorearEstados(regionAndes, "#0061b3");
colorearEstados(regionOriental, "#008c63");
colorearEstados(regionCentral, "#e8525c");
colorearEstados(regionOccidente, "#ff8a2b");
colorearEstados(regionGuayana, "#e2ff77");
colorearEstados(regionZuliana, "#ffdf13");

// Función para mostrar tooltips al pasar el mouse sobre los estados
function mostrarRegion(estadoId, region) {
    const estado = document.getElementById(estadoId);
    if (estado) {
        let tooltip; // Declaramos la variable tooltip fuera de los eventos

        estado.addEventListener("mouseover", () => {
            // Crear el tooltip
            tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.textContent = `Región: ${region}`;
            document.body.appendChild(tooltip);

            // Asegurarse de que el tooltip tenga posición absoluta
            tooltip.style.position = "absolute";
            tooltip.style.pointerEvents = "none"; // Evitar que el tooltip interfiera con el mouse
            tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            tooltip.style.color = "white";
            tooltip.style.padding = "5px";
            tooltip.style.borderRadius = "3px";
            tooltip.style.fontSize = "14px";
            tooltip.style.zIndex = "1000"; // Asegurarse de que esté por encima de otros elementos
        });

        estado.addEventListener("mousemove", (e) => {
            if (tooltip) {
                // Mover el tooltip junto con el cursor
                tooltip.style.top = `${e.clientY + 10}px`;
                tooltip.style.left = `${e.clientX + 10}px`;
            }
        });

        estado.addEventListener("mouseout", () => {
            // Eliminar el tooltip cuando el mouse sale del estado
            if (tooltip) {
                document.body.removeChild(tooltip);
                tooltip = null; // Limpiar la referencia
            }
        });
    }
}

// Mostrar tooltips para algunos estados
mostrarRegion("est.apure", "Los Llanos");
mostrarRegion("est.tachira", "Andina");
mostrarRegion("est.lara", "Occidental");
mostrarRegion("est.anzoategui", "Oriental");
mostrarRegion("est.aragua", "Central");
mostrarRegion("est.bolivar", "Guayana");
mostrarRegion("est.zulia", "Zuliana");

// Evento para mostrar la información en la barra lateral al hacer clic en un estado
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("info-columna");
    const toggleButton = document.getElementById("toggle-sidebar");
    const mapContainer = document.querySelector(".map");
    const infoTitulo = document.getElementById("info-titulo");
    const infoDescripcion = document.getElementById("info-descripcion");
    const paths = document.querySelectorAll("path");

    // Función para abrir/cerrar la barra lateral
    toggleButton.addEventListener("click", function () {
        sidebar.classList.toggle("active");
        mapContainer.classList.toggle("with-sidebar");
    });

    // Función para mostrar información en la barra lateral al hacer clic en una región
    paths.forEach((path) => {
        path.addEventListener("click", function () {
            const estadoId = path.getAttribute("id");
            const estadonombre = path.getAttribute("");

            const regionInfo = obtenerInformacionRegion(estadoId);

            infoTitulo.textContent = regionInfo.nombre;
            infoDescripcion.innerHTML = `
                <p><strong>Región:</strong> ${regionInfo.region}</p>
                <p><strong>Reseña musical:</strong> ${regionInfo.resena}</p>
                <p><strong>Géneros característicos:</strong> ${regionInfo.generos.join(", ")}</p>
            `;

            if (!sidebar.classList.contains("active")) {
                sidebar.classList.add("active");
                mapContainer.classList.add("with-sidebar");
            }
        });
    });
});

// Configuración de URLs
const URL_API = 'https://unefa6tosistemas2025api.onrender.com/api/articulos';

// Función para buscar alumno
async function buscarAlumno() {
    const cedula = document.getElementById('cedulaInput').value;
    const resultado = document.getElementById('alumnoResult');
    
    if(!cedula) {
        resultado.innerHTML = '<p class="error">Por favor ingrese una cédula</p>';
        return;
    }

    try {
        const respuesta = await fetch(`${URL_API}/${cedula}`);
        const data = await respuesta.json();
        
        if(data.Resul) {
            resultado.innerHTML = `
                <p><strong>Nombre:</strong> ${data.data[0].ALUNOMBRE}</p>
                <p><strong>Apellido:</strong> ${data.data[0].ALUNAPELL}</p>
            `;
        } else {
            resultado.innerHTML = `<p class="error">${data.error}</p>`;
        }
    } catch (error) {
        resultado.innerHTML = `<p class="error">Error en la conexión: ${error.message}</p>`;
    }
}

// Función para buscar artículos
async function buscarArticulos() {
    const alumnoId = document.getElementById('alumnoIdInput').value;
    const categoria = document.getElementById('categoriaSelect').value;
    const resultado = document.getElementById('articulosResult');
    
    if(!alumnoId) {
        resultado.innerHTML = '<p class="error">Ingrese el ID del alumno</p>';
        return;
    }

    try {
        const respuesta = await fetch(URL_API, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ALUMNO: alumnoId,
                ARTCATEGO: categoria
            })
        });
        
        const data = await respuesta.json();
        
        if(data.Resul) {
            if(data.data.length === 0) {
                resultado.innerHTML = '<p>No se encontraron artículos</p>';
            } else {
                let html = '<ul>';
                data.data.forEach(articulo => {
                    html += `
                        <li>
                            <strong>${articulo.ARTDESCRI}</strong><br>
                            Código: ${articulo.ARTNUMERO}<br>
                            Precio: $${articulo.ARTPRECIO}
                        </li>`;
                });
                html += '</ul>';
                resultado.innerHTML = html;
            }
        } else {
            resultado.innerHTML = `<p class="error">${data.error}</p>`;
        }
    } catch (error) {
        resultado.innerHTML = `<p class="error">Error en la conexión: ${error.message}</p>`;
    }
}