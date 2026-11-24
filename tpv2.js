const images = [{
        "nom": "Femme noire",
        "prix": 25000,
        "categorie": "art",
        "url": "images/blackness.jpg"
    },
    {
        "id": 2,
        "nom": "Girls in Tech",
        "prix": 18000,
        "categorie": "technologie",
        "url": "images/deux.jpg"
    },
    {
        "id": 3,
        "nom": "Femme musulmane",
        "prix": 27500,
        "categorie": "religion",
        "url": "images/muslima.jpg"
    },
    {
        "id": 4,
        "nom": "Jigeen ci Tech",
        "prix": 20000,
        "categorie": "technologie",
        "url": "images/trois.jpg"
    },
    {
        "id": 5,
        "nom": "Les gadgets high tech",
        "prix": 19500,
        "categorie": "technologie",
        "url": "images/un.jpeg"
    },
    {
        "id": 6,
        "nom": "Centre de controle",
        "prix": 12500,
        "categorie": "papier peint",
        "url": "images/wallpaper-1.jfif"
    },
    {
        "id": 17,
        "nom": "Dark Army",
        "prix": 17000,
        "categorie": "papier peint",
        "url": "images/wallpaper-2.jpeg"
    },
    {
        "id": 20,
        "nom": "Champions d'Afrique",
        "prix": 22000,
        "categorie": "papier peint",
        "url": "images/wallpaper-3.jpg"
    },
    {
        "id": 21,
        "nom": "Bureau Mac OS",
        "prix": 12000,
        "categorie": "papier peint",
        "url": "images/wallpaper-4.png"
    },
    {
        "id": 22,
        "nom": "Bureau Mac OS bleu",
        "prix": 12000,
        "categorie": "papier peint",
        "url": "images/wallpaper-5.jpg"
    },
    {
        "id": 23,
        "nom": "Logo Ubuntu",
        "prix": 12000,
        "categorie": "papier peint",
        "url": "images/wallpaper-6.jpg"
    },
    {
        "id": 24,
        "nom": "Cyber Task Force",
        "prix": 12000,
        "categorie": "papier peint",
        "url": "images/wallpaper-7.jpg"
    },
    {
        "id": 25,
        "nom": "Regard profond",
        "prix": 17500,
        "categorie": "papier peint",
        "url": "images/wallpaper-8.jpg"
    },
    {
        "id": 26,
        "nom": "Administrateur",
        "prix": 12000,
        "categorie": "papier peint",
        "url": "images/wallpaper-9.jpg"
    },
    {
        "id": 7,
        "nom": "Cybercriminalité",
        "prix": 120012000,
        "categorie": "papier peint",
        "url": "images/wallpaper-10.jfif"
    }
]

class Produit {
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


class Panier {

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


class Boutique {
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


const boutique = new Boutique(".images", images);
boutique.afficher();