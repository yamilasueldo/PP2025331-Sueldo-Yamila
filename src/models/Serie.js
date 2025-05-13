
export class Serie {

    constructor(id, url, name, language, genres, image) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.language = language;
        this.genres = genres;
        this.image = image;
    }

    toJsonString() {
        return JSON.stringify(this);
    }


    static createFromJsonString(json) {
        const data = JSON.parse(json);
        return new Serie(
            data.id,
            data.url,
            data.name,
            data.language,
            data.generes,
            data.image
        );
    }

    createHtmlElement() {
        const serieElement = document.createElement('div');
        serieElement.className = 'serie-card';

        const imageLink = document.createElement('a');
        imageLink.href = this.url;
        imageLink.target = '_blank'; 
        
        const imageElement = document.createElement('img');
        imageElement.src = this.image;
        imageElement.alt = this.name;
        imageElement.className = 'serie-image';
        
        imageLink.appendChild(imageElement);
        serieElement.appendChild(imageLink);

        const nameElement = document.createElement('h3');
        nameElement.textContent = this.name;
        nameElement.className = 'serie-name';
        serieElement.appendChild(nameElement);

        const languageElement = document.createElement('p');
        languageElement.textContent = `Idioma: ${this.language}`;
        languageElement.className = 'serie-language';
        serieElement.appendChild(languageElement);

        const genresElement = document.createElement('p');
        genresElement.textContent = `Géneros: ${this.generes.join(', ')}`;
        genresElement.className = 'serie-genres';
        serieElement.appendChild(generesElement);

    
        const saveButton = document.createElement('button');
        saveButton.textContent = 'guardar';
        saveButton.className = 'save-button';
        saveButton.addEventListener('click', () => {
            Serie.guardarSerie(this);
        });
        serieElement.appendChild(saveButton);

        return serieElement;
    }


    static guardarSerie(serie) {
        let seriesGuardadas = localStorage.getItem('seriesGuardadas');
        
        if (seriesGuardadas) {
            seriesGuardadas = JSON.parse(seriesGuardadas);
            const yaExiste = seriesGuardadas.some(s => s.id === serie.id);
            
            if (!yaExiste) {
                seriesGuardadas.push(JSON.parse(serie.toJsonString()));
                localStorage.setItem('seriesGuardadas', JSON.stringify(seriesGuardadas));
                alert('Serie guardada correctamente.');
            } else {
                alert('Esta serie ya está guardada.');
            }
        } else {
            const serieJSON = serie.toJsonString();
            localStorage.setItem('seriesGuardadas', JSON.stringify([JSON.parse(serieJSON)]));
            alert('Serie guardada correctamente.');
        }
    }
}
