import { Produit } from "./Produit.js";

export class VuePanier {
    constructor(panier, selecteurIcone = ".panier") {
        this.panier = panier;
        this.icone = document.querySelector(selecteurIcone);

        this.creerIcone();
        this.creerModal();

        this.panier.surChangement(() => {
            this.majBadge();
            if (this.estOuvert()) this.afficherContenu();
        });
        this.majBadge();
    }

    creerIcone() {
        const img = this.icone.querySelector("img");
        this.badge = document.createElement("span");
        this.badge.className = "badge_panier";

        const enveloppe = document.createElement("span");
        enveloppe.className = "icone_panier";
        img.replaceWith(enveloppe);
        enveloppe.append(img, this.badge);

        enveloppe.addEventListener("click", () => this.ouvrir());
    }

    creerModal() {
        this.fond = document.createElement("div");
        this.fond.className = "modal_fond";
        this.fond.innerHTML = `
            <div class="modal_panier" role="dialog" aria-modal="true" aria-labelledby="titre_panier">
                <button class="modal_fermer" aria-label="Fermer">&times;</button>
                <h2 id="titre_panier">Mon panier</h2>
                <div class="modal_contenu"></div>
            </div>
        `;
        document.body.appendChild(this.fond);
        this.contenu = this.fond.querySelector(".modal_contenu");

        this.fond.querySelector(".modal_fermer").addEventListener("click", () => this.fermer());
        this.fond.addEventListener("click", e => {
            if (e.target === this.fond) this.fermer();
        });
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && this.estOuvert()) this.fermer();
        });

        this.contenu.addEventListener("click", e => {
            const bouton = e.target.closest(".ligne_moins, .ligne_plus");
            if (!bouton) return;
            const ligne = this.panier.lignes.get(Number(bouton.dataset.id));
            if (!ligne) return;
            if (bouton.classList.contains("ligne_plus")) {
                this.panier.ajouter(ligne.produit);
            } else {
                this.panier.retirer(ligne.produit);
            }
        });
    }

    estOuvert() {
        return this.fond.classList.contains("ouvert");
    }

    ouvrir() {
        this.afficherContenu();
        this.fond.classList.add("ouvert");
        document.body.style.overflow = "hidden";
    }

    fermer() {
        this.fond.classList.remove("ouvert");
        document.body.style.overflow = "";
    }

    majBadge() {
        const n = this.panier.nombreArticles;
        this.badge.textContent = n;
        this.badge.style.display = n > 0 ? "inline" : "none";
    }

    afficherContenu() {
        const articles = this.panier.articles;

        if (articles.length === 0) {
            this.contenu.innerHTML = `<p class="panier_vide">Votre panier est vide.</p>`;
            return;
        }

        const lignes = articles.map(({ produit, quantite }) => `
            <div class="ligne_panier">
                <img src="${produit.url}" alt="${produit.nom}">
                <div class="ligne_infos">
                    <h3>${produit.nom}</h3>
                    <p>Prix unitaire : ${produit.prixFormate}</p>
                    <p>Quantité : ${quantite}</p>
                    <p>Sous-total : ${Produit.formater(produit.prix * quantite)}</p>
                    <div class="ligne_controle">
                        <button class="ligne_plus" data-id="${produit.id}">+</button>
                        <span>${quantite}</span>
                        <button class="ligne_moins" data-id="${produit.id}">-</button>
                    </div>
                </div>
            </div>
        `).join("");

        this.contenu.innerHTML = `
            ${lignes}
            <hr>
            <div class="resume_panier">
                <p>Nombre d'articles : <strong>${this.panier.nombreArticles}</strong></p>
                <p>Montant total : <strong class="montant_total">${Produit.formater(this.panier.total)}</strong></p>
            </div>
        `;
    }
}