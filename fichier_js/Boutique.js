import { Produit } from "../fichier_js/Produit.js";

export class Boutique {
    constructor(selecteur, donnees, panier) {
        this.conteneur = document.querySelector(selecteur);
        this.produits = donnees.map(d => new Produit(d));
        this.panier = panier;

        this.conteneur.addEventListener("click", e => {
            const bouton = e.target.closest(".bouton_plus, .bouton_moins");
            if (!bouton) return;
            const id = Number(bouton.closest(".cadres").dataset.id);
            const produit = this.produits.find(p => p.id === id);
            if (bouton.classList.contains("bouton_plus")) {
                this.panier.ajouter(produit);
            } else {
                this.panier.retirer(produit);
            }
        });

        this.panier.surChangement(() => this.synchroniserQuantites());
    }

    afficher() {
        this.conteneur.innerHTML = this.produits.map(p => p.toHTML()).join("");
        this.synchroniserQuantites();
    }

    synchroniserQuantites() {
        this.conteneur.querySelectorAll(".cadres").forEach(carte => {
            carte.querySelector(".quantite").textContent =
                this.panier.quantite(Number(carte.dataset.id));
        });
    }
}