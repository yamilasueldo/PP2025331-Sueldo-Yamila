import { Controller } from "./src/controllers/Controller.js";
import { View } from "./src/views/View.js";

// Declarar las variables globales
let paginaActual = 1;
const seriesPorPagina = 6;

document.addEventListener('DOMContentLoaded', () => {
    const controller = new Controller();
    
    controller.cargarSeries(paginaActual);

    document.getElementById('anterior').addEventListener('click', () => {
        controller.paginaAnterior();
    });
    
    document.getElementById('siguiente').addEventListener('click', () => {
        controller.paginaSiguiente();
    });
});