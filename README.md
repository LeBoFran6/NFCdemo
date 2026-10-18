# Tapwave — supports NFC à Saint-Gaudens

Site one-page de **Francisco De Carvalho Pereira**. Ce n'est ni une boutique en
ligne ni un formulaire de contact : c'est une **page de présentation** qu'il montre
sur son téléphone en prospection, et où il renvoie ses clients.

Le métier : **fournir et poser des supports NFC** — cartes, autocollants,
chevalets, bracelets — chez les commerçants. Le client du commerçant approche son
téléphone, et la page choisie s'ouvre.

**Aucun prix affiché.** Le devis se fait sur place, une fois qu'on a vu où poser
les supports.

---

## Fichiers

```
index.html          la page entière
css/styles.css      tout le style
js/main.js          5 modules de comportement
README.md           ce fichier
```

Aucun formulaire, aucune dépendance, aucune étape de compilation.

## Lancer

Double-cliquez sur `index.html`, ou servez le dossier :

```bash
python -m http.server 8000
```

Déployez le dossier tel quel sur Netlify, Vercel, GitHub Pages ou Cloudflare
Pages. Pour un usage réel sur téléphone, prefera **HTTPS** : c'est plus fiable
pour le NFC et les navigateurs mobiles bloquent des choses en `http`.

---

## Structure

| Section | Rôle |
|---|---|
| accueil | « J'équipe Saint-Gaudens en puces NFC », l'adresse en bouton d'en-tête |
| `#demo` | Le simulateur : ce que voit le client du commerce après un tap |
| `#usages` | Les trois destinations — fiche Google, coordonnées, menu |
| `#supports` | Ce qui est posé, et comment la pose se déroule |
| `#faq` | Cinq questions, prix compris |
| `#contact` | L'adresse e-mail, en grand, sans formulaire |

Six sections, environ 5 500 px en bureau.

---

## Ce qu'il ne faut pas casser

**Pas de prix, nulle part.** Un devis à l'avance serait faux — on ne sait pas
le coût avant d'avoir vu la boutique. La FAQ répond à cette question
explicitement, c'est volontaire.

**Pas de formulaire.** L'adresse est cliquable partout : en-tête, bouton
principal, section contact, pied de page. Si tu veux être joignable plus
facilement, mets un numéro WhatsApp ou une lien `tel:` en plus, mais un
formulaire à remplir sur un téléphone en boutique, personne ne le fait.

**Saint-Gaudens d'abord.** C'est ce qui rend la page crédible : un artisan du
coin, présent, joignable, qui passe. Ne dilue pas ça avec « partout en France ».

---

## Personnalisation

### Couleurs et typographie

```css
:root {
  --paper:  #FBFAF7;
  --ink:    #111520;
  --brand:  #1B4DD1;   /* un seul bleu */

  --font-display: "Instrument Serif", Georgia, serif;  /* titres */
  --font-body:    "Inter", system-ui, sans-serif;     /* textes */
}
```

Le serif Instrument Serif porte tout l'aspect éditorial. Un Inter partout
ferait site de start-up.

### Coordonnées

Elles sont répétées volontairement, pour qu'on puisse écrire ou appeler sans
scroller :

| Valeur | Où |
|---|---|
| `fran6pereira@gmail.com` | en-tête, bouton d'accueil, section contact, pied de page |
| `+33 7 69 01 12 95` | section contact, pied de page |
| `Francisco De Carvalho Pereira` | pied de page |
| `linkedin.com/in/francisco-…` | section contact, pied de page |
| `github.com/LeBoFran6` | section contact, pied de page |

### La liste des supports

Section `#supports`, deux colonnes. La colonne de gauche liste ce que tu fais
couramment ; celle de droite est volontairement ouverte (« format particulier —
dites-le moi »). Si tu ne fais pas de bracelets, retire-le : une liste courte
et exacte vaut mieux qu'une liste longue et approximative.

### Le simulateur

Les trois écrans du téléphone sont trois blocs `.scene`. Pour en ajouter un :
duplique un bloc, change `data-scene`, ajoute un bouton avec le même
`data-scene-btn`. Le JavaScript n'est pas à toucher.

---

## Note technique

Les réponses sur le NFC, dans la FAQ, sont exactes :

- Les puces sont écrites dans un format standard que les téléphones
  reconnaissent. Sur Android la page s'ouvre seule ; sur iPhone elle s'ouvre par
  une notification quand on approche le haut du dos de l'appareil.
- iOS ne lit pas tous les tags de la même façon : les supports portent aussi un
  QR au dos. C'est un vrai secours, pas une décoration.

---

## Accessibilité et poids

- Lien d'évitement, repères sémantiques, `aria-expanded` sur l'accordéon et le
  menu, anneaux de focus visibles.
- `prefers-reduced-motion` respecté.
- Aucune image, aucune police d'icônes, aucun traceur, aucun formulaire à
  héberger. Le téléphone de la démo est dessiné en CSS. Total : ~40 Ko.

Testé en Chrome, Edge, Firefox et Safari. Fluide dès 320 px ; points de rupture
à 960 px, 820 px et 680 px. L'adresse e-mail se réduit de 3,6 rem à 1,55 rem sur
petit écran pour rester sur une ligne le plus souvent possible.