export class Produit {
    constructor({ id, nom, prix, categorie, url }) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.categorie = categorie;
        this.url = url;
    }

    toHTML() {
        return `
        <div class="cadres" data-id="${this.id}">
            <img src="${this.url}" alt="${this.nom}"></img>
            <h3>${this.nom}</h3>
            <p>Prix: ${this.prix}</p>
            <p>Categorie: ${this.categorie}</p><br>
            <button class="bouton_plus">+</button> <span>0</span>
            <button class="bouton_moins">-</button>
        </div>
    `;
    }
}