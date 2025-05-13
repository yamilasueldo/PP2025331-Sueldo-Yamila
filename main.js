import { Controlller } from "./src/controllers/Controller.js";
import { Model } from "./src/models/Serie.js";
import { View } from "./src/views/View.js";

async function cargarSeries(pagina) {
    const seriesContainer = document.getElementById('series');
    seriesContainer.innerHTML = '';

    try {
        const idInicial = (pagina - 1) * seriesPorPagina + 1;
        const promesas = [];

        for (let i = 0; i < seriesPorPagina; i++) {
            const id = idInicial + i;
            promesas.push(fetch(`https://api.tvmaze.com/shows/${id}`).then(res => res.json()));
        }

        const resultados = await Promise.all(promesas);  
        resultados.forEach(datos => {

            const id = datos.id;
            const url = datos.url;
            const name = datos.name;
            const language = datos.language;
            const genres = datos.genres || []; 
            const image = datos.image?.medium || datos.image?.original || 'placeholder.jpg';

            const serie = new Serie(id, url, name, language, genres, image);

            const serieElement = serie.createHtmlElement();
            seriesContainer.appendChild(serieElement);
        });

        actualizarBotonesPaginacion(pagina);

    } catch (error) {
        console.error('Error al cargar las series:', error);
        seriesContainer.innerHTML = '<p>Error al cargar las series. Por favor, intenta nuevamente.</p>';
    }
}

function actualizarBotonesPaginacion(pagina) {
    const btnAnterior = document.getElementById('anterior');

    if (pagina === 1) {
        btnAnterior.disabled = true;
    } else {
        btnAnterior.disabled = false;
    }
}

function paginaSiguiente() {
    paginaActual++;
    cargarSeries(paginaActual);
}

function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        cargarSeries(paginaActual);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarSeries(paginaActual);

    document.getElementById('anterior').addEventListener('click', paginaAnterior);
    document.getElementById('siguiente').addEventListener('click', paginaSiguiente);
});