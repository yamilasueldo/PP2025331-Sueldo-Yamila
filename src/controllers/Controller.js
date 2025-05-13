
import { Serie } from "../models/Serie.js";
import { View } from "../views/View.js";

export class Controller {
    constructor() {
        this.paginaActual = 1;
        this.seriesPorPagina = 6;
        this.view = new View();
    }

    async cargarSeries(pagina) {
        try {
            this.view.limpiarContenedor();
            
            const idInicial = (pagina - 1) * this.seriesPorPagina + 1;
            const promesas = [];

            for (let i = 0; i < this.seriesPorPagina; i++) {
                const id = idInicial + i;
                promesas.push(fetch(`https://api.tvmaze.com/shows/${id}`)
                    .then(res => res.json()));
            }
            
            const resultados = await Promise.all(promesas);  
            const series = resultados.map(datos => {
                return new Serie(
                    datos.id,
                    datos.url,
                    datos.name,
                    datos.language,
                    datos.genres || [], 
                    datos.image?.medium || datos.image?.original || 'placeholder.jpg'
                );
            });
            
            this.view.mostrarSeries(series);
            this.actualizarBotonesPaginacion(pagina);
            
            this.paginaActual = pagina;
            
        } catch (error) {
            console.error('Error al cargar las series:', error);
            this.view.mostrarError('Error al cargar las series. Por favor, intenta nuevamente.');
        }
    }

    actualizarBotonesPaginacion(pagina) {
        const btnAnterior = document.getElementById('anterior');
        
        if (pagina === 1) {
            btnAnterior.disabled = true;
        } else {
            btnAnterior.disabled = false;
        }
    }

    paginaSiguiente() {
        this.paginaActual++;
        this.cargarSeries(this.paginaActual);
    }

    paginaAnterior() {
        if (this.paginaActual > 1) {
            this.paginaActual--;
            this.cargarSeries(this.paginaActual);
        }
    }
}