import { Controller } from "./src/controllers/Controller.js";

let paginaActual = 1;

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

