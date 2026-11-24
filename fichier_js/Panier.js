export class Panier {
    constructor() {
        this.lignes = new Map();
        this.ecouteurs = [];
    }

    ajouter(produit) {
        const ligne = this.lignes.get(produit.id);
        if (ligne) {
            ligne.quantite++;
        } else {
            this.lignes.set(produit.id, { produit, quantite: 1 });
        }
        this.notifier();
    }

    retirer(produit) {
        const ligne = this.lignes.get(produit.id);
        if (!ligne) return;
        ligne.quantite--;
        if (ligne.quantite <= 0) {
            this.lignes.delete(produit.id);
        }
        this.notifier();
    }

    quantite(id) {
        const ligne = this.lignes.get(id);
        if (ligne) {
            return ligne.quantite;
        }
        return 0;
    }

    get articles() {
        return [...this.lignes.values()];
    }

    get nombreArticles() {
        return this.articles.reduce((somme, l) => somme + l.quantite, 0);
    }

    get total() {
        return this.articles.reduce((somme, l) => somme + l.produit.prix * l.quantite, 0);
    }

    surChangement(fonction) {
        this.ecouteurs.push(fonction);
    }

    notifier() {
        this.ecouteurs.forEach(fonction => fonction());
    }
}