import { Serie } from "../models/Serie.js";
import { View } from "../views/View.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log("Cargando página de series guardadas");
    const view = new View();
    
    cargarSeriesGuardadas();
    
    const btnOrdenarNombre = document.getElementById('ordenar-nombre');
    const btnOrdenarLenguaje = document.getElementById('ordenar-lenguaje');
    
    if (btnOrdenarNombre && btnOrdenarLenguaje) {
        btnOrdenarNombre.addEventListener('click', () => {
            console.log("Ordenando por nombre");
            ordenarPorNombre();
        });
        
        btnOrdenarLenguaje.addEventListener('click', () => {
            console.log("Ordenando por lenguaje");
            ordenarPorIdioma();
        });
    } else {
        console.warn("No se encontraron los botones de ordenamiento");
    }
    
    function cargarSeriesGuardadas() {
        const seriesGuardadasJSON = localStorage.getItem('seriesGuardadas');
        console.log("Series guardadas en localStorage:", seriesGuardadasJSON);
        
        if (seriesGuardadasJSON) {
            const seriesGuardadasData = JSON.parse(seriesGuardadasJSON);
            
            view.limpiarContenedor();
            
            if (seriesGuardadasData.length === 0) {
                view.mostrarError('No hay series guardadas.');
                return;
            }
            
            const seriesGuardadas = seriesGuardadasData.map(data => 
                new Serie(
                    data.id,
                    data.url,
                    data.name,
                    data.language,
                    data.genres || [],
                    data.image
                )
            );
            
            console.log("Series a mostrar:", seriesGuardadas);
            
            view.mostrarSeries(seriesGuardadas);
        } else {
            view.mostrarError('No hay series guardadas.');
        }
    }
    
    function ordenarPorNombre() {
        const seriesGuardadasJSON = localStorage.getItem('seriesGuardadas');
        
        if (seriesGuardadasJSON) {
            let seriesGuardadasData = JSON.parse(seriesGuardadasJSON);

            seriesGuardadasData.sort((a, b) => a.name.localeCompare(b.name));
            

            localStorage.setItem('seriesGuardadas', JSON.stringify(seriesGuardadasData));

            cargarSeriesGuardadas();
        }
    }
    
    function ordenarPorIdioma() {
        const seriesGuardadasJSON = localStorage.getItem('seriesGuardadas');
        
        if (seriesGuardadasJSON) {
            let seriesGuardadasData = JSON.parse(seriesGuardadasJSON);
            
            seriesGuardadasData.sort((a, b) => a.language.localeCompare(b.language));
            

            localStorage.setItem('seriesGuardadas', JSON.stringify(seriesGuardadasData));
            cargarSeriesGuardadas();
        }
    }
});