export class Panier {
    static modifier(bouton, valeur) {
        const span = bouton.parentElement.querySelector("span");
        let quantite = Number(span.textContent);
        quantite += valeur;
        if (quantite >= 0) {
            span.textContent = quantite;
        }
    }

    static ajouter(bouton, valeur = 1) {
        Panier.modifier(bouton, valeur);
    }

    static retirer(bouton, valeur = 1) {
        Panier.modifier(bouton, -valeur);
    }
}