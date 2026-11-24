export class Produit {
    constructor({ id, nom, prix, categorie, url }) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.categorie = categorie;
        this.url = url;
    }

    static formater(montant) {
        return montant.toLocaleString("fr-FR") + " CFA";
    }

    get prixFormate() {
        return Produit.formater(this.prix);
    }

    toHTML() {
        return `
        <div class="cadres" data-id="${this.id}">
            <img src="${this.url}" alt="${this.nom}">
            <h3>${this.nom}</h3>
            <p>Prix : ${this.prixFormate}</p>
            <p>Catégorie : ${this.categorie}</p><br>
            <button class="bouton_plus">+</button> <span class="quantite">0</span>
            <button class="bouton_moins">-</button>
        </div>
    `;
    }
}