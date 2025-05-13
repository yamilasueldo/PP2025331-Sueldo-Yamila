export class View {
    constructor() {
        this.seriesContainer = document.getElementById('series');
    }
    
    limpiarContenedor() {
        this.seriesContainer.innerHTML = '';
    }
    
    mostrarSeries(series) {
        series.forEach(serie => {
            const serieElement = serie.createHtmlElement();
            this.seriesContainer.appendChild(serieElement);
        });
    }
    
    mostrarError(mensaje) {
        this.seriesContainer.innerHTML = `<p class="error-message">${mensaje}</p>`;
    }
}