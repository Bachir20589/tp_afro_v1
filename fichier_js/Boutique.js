import { Produit } from "../fichier_js/Produit.js";
import { Panier } from "../fichier_js/Panier.js";

export class Boutique {
    constructor(selecteur, donnees) {
        this.conteneur = document.querySelector(selecteur);
        this.produits = donnees.map(d => new Produit(d));
    }

    afficher() {
        let html = ``;
        for (const produit of this.produits) {
            html += produit.toHTML();
        }
        this.conteneur.innerHTML = html;
        this.activerBoutons();
    }

    activerBoutons() {
        this.conteneur.querySelectorAll(".bouton_plus").forEach(btn => {
            btn.addEventListener("click", () => Panier.ajouter(btn, 1));
        });
        this.conteneur.querySelectorAll(".bouton_moins").forEach(btn => {
            btn.addEventListener("click", () => Panier.retirer(btn, 1));
        });
    }
}