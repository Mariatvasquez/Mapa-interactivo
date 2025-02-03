class InfoRegion {
    constructor(estados, region, resena, generos, audio) {
        this.estados = estados;
        this.region = region;
        this.resena = resena;
        this.generos = generos;
        this.audio = audio; 
    }

    obtenerInformacion() {
        return {
            region: this.region,
            resena: this.resena,
            generos: this.generos,
            audio: this.audio
        };
    }
}


const regionLlanos = new InfoRegion(
    ["est.guarico", "est.apure", "est.barinas", "est.cojedes", "est.portuguesa"],
    "Los Llanos",
    "En los vastos llanos venezolanos, el joropo es el alma de la tierra. Con el sonido del arpa, el cuatro y las maracas, esta música llena de energía y pasión narra historias de amor, trabajo y naturaleza. El contrapunteo, donde los copleros improvisan versos, es un duelo de ingenio y tradición. Cada nota del arpa y el repique de las maracas te transportan a las sabanas infinitas, donde la música es el latido del corazón llanero.",
    ["Joropo", "Golpe", "Pasaje"],
    "audios/zumbaqzumba.mp4"
);

const regionAndes = new InfoRegion(
    ["est.tachira", "est.trujillo", "est.merida"],
    "Andina",
    "En las montañas andinas, la música es un susurro del viento entre los páramos. El vals andino y el bambuco te envuelven con su dulzura y elegancia, mientras el Violin andino te invita a bailar con su ritmo alegre. Con el violín, la guitarra y el tiple, los Andes cuentan historias de amor y tradición. Cada nota es un reflejo de la serenidad y la belleza de esta tierra.",
    ["Bambuco", "Vals", "Violin Andino"],
    "audios/violin.mp4"
);

const regionOriental = new InfoRegion(
    ["est.anzoategui", "est.monagas", "est.sucre", "est.nueva esparta", "est.dependencias federales"],
    "Oriental",
    "El oriente venezolano es una fiesta de ritmos y colores. El joropo oriental, con su mandolina y su cadencia única, te envuelve en melodías que hablan del mar y la brisa. Los polos y margariteños alegran las calles con su ritmo festivo. En cada nota, se siente el sabor a salitre y la calidez de su gente ¡Descubre la magia de la música oriental y déjate llevar por su encanto! ",
    ["Joropo Oriental", "Galerón", "Polo"],
    "audios/joriental.mp4"
);

const regionCentral = new InfoRegion(
    ["est.aragua", "est.miranda", "est.vargas", "est.distrito capital", "est.carabobo"],
    "Central",
    "En la región central de Venezuela, el tambor es el latido que une tradición y festividad. Este género, heredado de las raíces africanas, se vive con intensidad en celebraciones como los Velorios de Cruz y las fiestas de San Juan. Con tambores como el mina, el curbeta y el culo e’ puya, se crean ritmos contagiosos que invitan al baile y a la conexión espiritual. Junto al merengue caraqueño, el joropo tuyero y la salsa, el tambor es una expresión de alegría, fe y resistencia cultural..",
    ["Tambor", "Salsa", "Merengue caraqueño"],
    "audios/tambor.mp4"
);

const regionOccidente = new InfoRegion(
    ["est.lara", "est.falcon", "est.yaracuy"],
    "Occidental",
    "El occidente venezolano es un tesoro de tradiciones musicales. El golpe tocuyano y el tamunangue llenan de alegría las fiestas populares. Con el cuatro, las maracas y el tambor, esta región celebra la vida y la fe en cada nota. La música occidental es una mezcla de devoción y fiesta, que te invita a bailar y cantar.",
    ["Tamunangue", "Golpe Tocuyano","Décimas"],
    "audios/tamunangue.mp4"
);

const regionGuayana = new InfoRegion(
    ["est.amazonas", "est.bolivar", "est.delta amacuro"],
    "Guayana",
    "En las tierras mágicas de Guayana, la música es un viaje a las raíces ancestrales, la cual tiene influencias indígenas y africanas.  El calipso de El Callao llena de alegría los carnavales con sus tambores y steelpans, mientras los cantos indígenas conectan con la selva y los ríos. Cada ritmo es un homenaje a la diversidad cultural de esta región. ",
    ["Carimbó", "Calipso", "Maremare"],
    "audios/calypso.mp4"
);

const regionZuliana = new InfoRegion(
    ["est.zulia"],
    "Zuliana",
    "En el Zulia, la música es sinónimo de fiesta y tradición. La gaita zuliana, con su tambora, furruco y charrasca, es el himno de la Navidad y la identidad zuliana e inunda a toda Venezuela en épocas decembrinas. Cada nota es una celebración de la vida y la cultura.",
    ["Gaita Zuliana", "Contradanza"],
    "audios/gaita.mp4"
);

const regiones = [regionLlanos, regionAndes, regionOriental, regionCentral, regionOccidente, regionGuayana, regionZuliana];

// control de audio
let audioActual = null;
let regionReproduciendo = null;

function obtenerInformacionRegion(estadoId) {
    for (const region of regiones) {
        if (region.estados.includes(estadoId)) {
            const infoRegion = region.obtenerInformacion();
            return {
                nombre: estadoId.replace("est.", "").toUpperCase(),
                region: infoRegion.region,
                resena: infoRegion.resena,
                generos: infoRegion.generos,
                audio: infoRegion.audio
            };
        }
    }
    return {
        nombre: "Desconocido",
        region: "Desconocida",
        resena: "No hay información disponible.",
        generos: [],
        audio: null
    };
}

function manejarReproduccion(audioPath, region) {
    if (regionReproduciendo === region) {
        audioActual.paused ? audioActual.play() : audioActual.pause();
    } else {
        if (audioActual) audioActual.pause();
        audioActual = new Audio(audioPath);
        audioActual.play();
        regionReproduciendo = region;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("info-columna");
    const toggleButton = document.getElementById("toggle-sidebar");
    const mapContainer = document.querySelector(".map");
    const infoTitulo = document.getElementById("info-titulo");
    const infoDescripcion = document.getElementById("info-descripcion");
    const paths = document.querySelectorAll("path");

    // abrir/cerrar la barra lateral
    toggleButton.addEventListener("click", function () {
        sidebar.classList.toggle("active");
        mapContainer.classList.toggle("with-sidebar");
    });

    toggleButton.addEventListener("click", function () {
        console.log("Botón de toggle clickeado");
        sidebar.classList.toggle("active");
        mapContainer.classList.toggle("with-sidebar");
    });

    //click en regiones
    paths.forEach((path) => {
        path.addEventListener("click", function () {
            const estadoId = path.getAttribute("id");
            const regionInfo = obtenerInformacionRegion(estadoId);

            // actualiza barra lateral
            infoTitulo.textContent = regionInfo.nombre;
            infoDescripcion.innerHTML = `
                <p><strong>Región:</strong> ${regionInfo.region}</p>
                <p><strong>Reseña musical:</strong> ${regionInfo.resena}</p>
                <p><strong>Géneros:</strong> ${regionInfo.generos.join(", ")}</p>
                <div class="controles-audio">
                    <button id="togglePlay">⏯️ ${audioActual?.paused ? 'Reproducir' : 'Pausar'}</button>
                    <button id="stopAudio">⏹ Detener</button>
                </div>`;

        
            if (regionInfo.audio) {
                manejarReproduccion(regionInfo.audio, regionInfo.region);
                
               
                path.style.transform = "scale(1.05)";
                setTimeout(() => path.style.transform = "", 200);
            }

            if (!sidebar.classList.contains("active")) {
                sidebar.classList.add("active");
                mapContainer.classList.add("with-sidebar");
            }
        });
    });

    // Controles en audio
    document.addEventListener('click', function(e) {
        if (e.target.id === 'togglePlay' && audioActual) {
            audioActual.paused ? audioActual.play() : audioActual.pause();
        }
        if (e.target.id === 'stopAudio' && audioActual) {
            audioActual.pause();
            audioActual.currentTime = 0;
            regionReproduciendo = null;
        }
    });
});

function colorEstados(region, color) {
    region.estados.forEach(estado => {
        const elemento = document.getElementById(estado);
        if (elemento) {
            elemento.setAttribute("fill", color);
        } else {
            console.warn(`El estado con ID "${estado}" no fue encontrado.`);
        }
    });
}


colorEstados(regionLlanos, "#72ac18");
colorEstados(regionAndes, "#0061b3");
colorEstados(regionOriental, "#008c63");
colorEstados(regionCentral, "#e8525c");
colorEstados(regionOccidente, "#ff8a2b");
colorEstados(regionGuayana, "#e2ff77");
colorEstados(regionZuliana, "#ffdf13");


function mostrarRegion(estadoId, region) {
    const estado = document.getElementById(estadoId);
    if (estado) {
        let tooltip;

        estado.addEventListener("mouseover", () => {
            
            tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.textContent = `Región ${region}`;
            document.body.appendChild(tooltip);

            tooltip.style.position = "absolute";
            tooltip.style.pointerEvents = "none"; 
            tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            tooltip.style.color = "white";
            tooltip.style.padding = "5px";
            tooltip.style.borderRadius = "3px";
            tooltip.style.fontSize = "14px";
            tooltip.style.zIndex = "1000";
        });

        estado.addEventListener("mousemove", (e) => {
            if (tooltip) {
                
                tooltip.style.top = `${e.clientY + 10}px`;
                tooltip.style.left = `${e.clientX + 10}px`;
            }
        });

        estado.addEventListener("mouseout", () => {
            
            if (tooltip) {
                document.body.removeChild(tooltip);
                tooltip = null; 
            }
        });
    }
}


mostrarRegion("est.apure","Los Llanos");
mostrarRegion("est.tachira", "Andina");
mostrarRegion("est.lara", "Occidental");
mostrarRegion("est.anzoategui", "Oriental");
mostrarRegion("est.aragua", "Central");
mostrarRegion("est.bolivar", "Guayana");
mostrarRegion("est.zulia", "Zuliana");


document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("info-columna");
    const toggleButton = document.getElementById("toggle-sidebar");
    const mapContainer = document.querySelector(".map");
    const infoTitulo = document.getElementById("info-titulo");
    const infoDescripcion = document.getElementById("info-descripcion");
    const paths = document.querySelectorAll("path");
    
    
    // abrir/cerrar la barra lateral
    toggleButton.addEventListener("click", function () {
        sidebar.classList.toggle("active");
        mapContainer.classList.toggle("with-sidebar");
    });

    //información en la barra lateral
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


const URL_API = 'https://unefa6tosistemas2025api.onrender.com/api/articulos';


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