import { useState, useEffect, useRef } from "react";

/* ── Google Fonts ── */
if (typeof document !== "undefined") {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap";
  document.head.appendChild(l);
}

/* ── THEME CONFIG ── */
const DARK = {
  bg:       "#07060A",
  bg2:      "#0F0C16",
  bg3:      "#0A0812",
  surface:  "#13101E",
  border:   "#1E1830",
  border2:  "#2E2540",
  text:     "#EDE8DF",
  textSub:  "#A89D8E",
  textMut:  "#5A5068",
  gold:     "#C9A84C",
  goldL:    "#E8C97A",
  goldD:    "#8B6E2E",
  purple:   "#6E3AFF",
  purpleL:  "#B47FFF",
  navBg:    "rgba(7,6,10,0.97)",
  cardBg:   "#0F0C16",
  inputBg:  "#0A0812",
  shimmer:  "linear-gradient(90deg,#6E3AFF,#B47FFF,#E8C97A,#B47FFF,#6E3AFF)",
  scrollThumb: "#2E2540",
  heroGrad: "radial-gradient(ellipse at 30% 50%,#1A0F2E 0%,#07060A 60%)",
  statBg:   "#0F0C16",
};
const LIGHT = {
  bg:       "#FAF7F2",
  bg2:      "#F0EAE0",
  bg3:      "#E8DFD0",
  surface:  "#FFFFFF",
  border:   "#D8CCBA",
  border2:  "#C4B498",
  text:     "#1C1409",
  textSub:  "#4A3820",
  textMut:  "#7A6348",
  gold:     "#9A6E20",
  goldL:    "#C4920A",
  goldD:    "#6A4A10",
  purple:   "#4A28CC",
  purpleL:  "#6A48D8",
  navBg:    "rgba(250,247,242,0.97)",
  cardBg:   "#FFFFFF",
  inputBg:  "#F5F0E8",
  shimmer:  "linear-gradient(90deg,#4A28CC,#6A48D8,#9A6E20,#6A48D8,#4A28CC)",
  scrollThumb: "#C4B498",
  heroGrad: "radial-gradient(ellipse at 30% 50%,#EDE3D0 0%,#FAF7F2 60%)",
  statBg:   "#F0EAE0",
};

/* ── IMAGES ── */
const IMGS = {
  bijoux:      ["https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80","https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80","https://images.unsplash.com/photo-1573408301185-9519f94816f5?w=600&q=80","https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80","https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80","https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80"],
  montres:     ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80","https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80","https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=600&q=80","https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80","https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&q=80","https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80"],
  cadres:      ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80","https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9?w=600&q=80","https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80","https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80","https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&q=80"],
  accessoires: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80","https://images.unsplash.com/photo-1611010344444-5f9e4d86a6c4?w=600&q=80","https://images.unsplash.com/photo-1583394293214-0b3b7e7c4b0c?w=600&q=80","https://images.unsplash.com/photo-1521369909029-2afed882baaa?w=600&q=80","https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80","https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80"],
  parfums:     ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80","https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80","https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80","https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80","https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=600&q=80","https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80"],
  art:         ["https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80","https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80","https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&q=80","https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80","https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=600&q=80"],
};

/* ── PRODUCTS ── */
const PRODUCTS = {
  bijoux: [
    { id:"bj1", name:"Collier Lumière d'Or",   price:"320 000 XAF", old:"380 000 XAF", badge:"Bestseller", badgeColor:"#C9A84C", desc:"Or 18K, chaîne maille forçat dorée, pendentif soleil serti de diamants. Certificat d'authenticité inclus.", details:["Or 18 carats","Diamants naturels 0.15ct","Longueur 45 cm","Garantie 2 ans"] },
    { id:"bj2", name:"Bague Saphir Royal",      price:"680 000 XAF", old:null,          badge:"Exclusif",  badgeColor:"#8AAAD4", desc:"Saphir naturel 2ct certifié GIA, serti or blanc 18K, entourage brillants. Pièce de haute joaillerie.", details:["Saphir naturel 2ct","Or blanc 18K","Certificat GIA","Bague sur mesure"] },
    { id:"bj3", name:"Bracelet Argent Tressé",  price:"98 000 XAF",  old:"120 000 XAF", badge:"Promo",     badgeColor:"#4AC9A0", desc:"Argent 925 rhodié, motif tressé artisanal fait main, fermoir magnétique sécurisé. Résistant à l'eau.", details:["Argent 925 rhodié","Fait main","Résistant à l'eau","Largeur 8 mm"] },
    { id:"bj4", name:"Créoles Diamantées",      price:"245 000 XAF", old:null,          badge:"Nouveau",   badgeColor:"#B47FFF", desc:"Or jaune 18K, diamants sertis en pavé sur toute la surface, fermeture poussette. Élégance absolue.", details:["Or jaune 18K","Diamants pavé","Diamètre 30 mm","Fermeture sécurisée"] },
    { id:"bj5", name:"Pendentif Rubis Rare",    price:"510 000 XAF", old:null,          badge:"Rare",      badgeColor:"#E8736A", desc:"Rubis birman ovale certifié, monture or rose 18K, chaîne fine incluse. Collection limitée.", details:["Rubis birman 1.5ct","Or rose 18K","Chaîne 42 cm","Édition limitée"] },
    { id:"bj6", name:"Parure Émeraude",         price:"920 000 XAF", old:null,          badge:"Prestige",  badgeColor:"#4AC97A", desc:"Émeraude colombienne 3ct, parure complète (collier, boucles, bague) or 18K. Coffret cadeau exclusif.", details:["Émeraude colombienne","Or 18K massif","Parure 3 pièces","Coffret exclusif"] },
  ],
  montres: [
    { id:"mo1", name:"Chronographe Prestige",   price:"1 850 000 XAF", old:null,            badge:"Icône",       badgeColor:"#7A8FD4", desc:"Mouvement automatique suisse ETA 7750, boîtier acier 316L 42mm, verre saphir, étanche 100m.", details:["Mvt. automatique suisse","Boîtier acier 316L","Verre saphir","Étanche 100m"] },
    { id:"mo2", name:"Dame Or Rose",             price:"2 400 000 XAF", old:null,            badge:"Luxe",        badgeColor:"#D4834A", desc:"Or rose 18K massif, cadran nacre blanche, bracelet alligator bordeaux, diamètre 28mm.", details:["Or rose 18K","Cadran nacre","Bracelet alligator","28mm"] },
    { id:"mo3", name:"Skeleton Titanium",        price:"3 200 000 XAF", old:null,            badge:"Exclusif",    badgeColor:"#8AD48A", desc:"Titane grade 5 ultra-léger, mouvement squelette visible, réserve de marche 72h.", details:["Titane grade 5","Squelette fait main","Réserve 72h","Édition limitée"] },
    { id:"mo4", name:"Sport Céramique Noire",   price:"980 000 XAF",  old:"1 100 000 XAF", badge:"Promo",       badgeColor:"#C9C94A", desc:"Céramique haute résistance, lunette en saphir, fonction GMT double fuseau, mouvement automatique.", details:["Céramique haute résistance","Lunette saphir","GMT double fuseau","Automatique"] },
    { id:"mo5", name:"Vintage Millésime",        price:"760 000 XAF",  old:null,            badge:"Collection",  badgeColor:"#C4A862", desc:"Montre restaurée d'époque 1970, bracelet milanais acier, garantie 5 ans. Pièce de collection unique.", details:["Époque 1970 restaurée","Bracelet milanais","Garantie 5 ans","Pièce unique"] },
    { id:"mo6", name:"Tourbillon Grand Feu",    price:"8 500 000 XAF", old:null,            badge:"Haute Horl.", badgeColor:"#E8A050", desc:"Tourbillon volant, cadran émail grand feu peint à la main, pièce numérotée 1/50. Excellence absolue.", details:["Tourbillon volant","Émail grand feu","Numéroté 1/50","Livraison sécurisée"] },
  ],
  cadres: [
    { id:"ca1", name:"Cadre Empire Doré",       price:"185 000 XAF", old:null,          badge:"Classique", badgeColor:"#C9A84C", desc:"Bois de tilleul sculpté à la main, recouvert de feuilles d'or 22K. Format 40×50 cm.", details:["Bois de tilleul","Feuille d'or 22K","40×50 cm","Fait main"] },
    { id:"ca2", name:"Miroir Louis XVI",        price:"420 000 XAF", old:null,          badge:"Antique",   badgeColor:"#D4B862", desc:"Reproduction fidèle du style Louis XVI, dorure à l'or fin, verre biseauté, dimensions 80×120 cm.", details:["Style Louis XVI","Dorure or fin","Verre biseauté","80×120 cm"] },
    { id:"ca3", name:"Cadre Art Déco Noir",     price:"95 000 XAF",  old:"115 000 XAF",badge:"Promo",     badgeColor:"#4AC9A0", desc:"Laque noire mat, filets dorés géométriques Art Déco. Disponible en formats sur mesure.", details:["Laque noire mat","Filets or géométriques","Formats sur mesure","Style Art Déco"] },
    { id:"ca4", name:"Triptyque Bambou Zen",    price:"145 000 XAF", old:null,          badge:"Naturel",   badgeColor:"#7AC97A", desc:"Bambou naturel traité contre l'humidité, triptyque modulable pour photos 3×(20×30).", details:["Bambou naturel traité","Triptyque modulable","3×(20×30) cm","Esprit zen"] },
    { id:"ca5", name:"Cadre Acier Poli",        price:"68 000 XAF",  old:null,          badge:"Moderne",   badgeColor:"#8AAAD4", desc:"Acier inoxydable brossé, design ultra-minimaliste, disponible en formats A3 et A4.", details:["Acier inoxydable","Design minimaliste","Formats A3/A4","Intérieur moderne"] },
    { id:"ca6", name:"Cadre Laiton Gravé",      price:"225 000 XAF", old:null,          badge:"Rare",      badgeColor:"#D4A84A", desc:"Laiton massif patiné à l'ancienne, gravure florale réalisée à la main par un artisan.", details:["Laiton massif patiné","Gravure florale main","Pièce unique","Certificat artisan"] },
  ],
  accessoires: [
    { id:"ac1", name:"Sac Cuir Nappa",          price:"485 000 XAF", old:null, badge:"Signature", badgeColor:"#C4844A", desc:"Cuir nappa pleine fleur tanné végétal, doublure soie naturelle, quincaillerie or brossé 18K.", details:["Cuir nappa pleine fleur","Doublure soie","Quincaillerie or 18K","Garantie artisan"] },
    { id:"ac2", name:"Ceinture Crocodile",      price:"320 000 XAF", old:null, badge:"Exclusif",  badgeColor:"#4AC98A", desc:"Cuir crocodile du Nil certifié CITES, boucle en argent massif 925, réalisée sur mesure.", details:["Crocodile certifié CITES","Boucle argent 925","Sur mesure","Livraison sous 10j"] },
    { id:"ac3", name:"Foulard Soie Pure",       price:"95 000 XAF",  old:"110 000 XAF", badge:"Promo", badgeColor:"#C94AA8", desc:"Soie 100% lyonnaise haute couture, impression digitale haute résolution, ourlet roulotté main.", details:["Soie 100% lyonnaise","Impression digitale HD","Ourlet main","90×90 cm"] },
    { id:"ac4", name:"Chapeau Panama Fino",     price:"175 000 XAF", old:null, badge:"Artisan",   badgeColor:"#C9B04A", desc:"Tressage Fino equatoriano, 20 tresses au cm, ruban soie changeant, boîte transport incluse.", details:["Tressage Fino","20 tresses/cm","Ruban soie","Boîte incluse"] },
    { id:"ac5", name:"Lunettes Titane",         price:"285 000 XAF", old:null, badge:"Design",    badgeColor:"#4A8AC9", desc:"Monture titane aéronautique ultra-légère (8g), verres polarisés catégorie 3, étui cuir artisanal.", details:["Titane aéronautique","Verres polarisés cat.3","Poids 8g seulement","Étui cuir inclus"] },
    { id:"ac6", name:"Portefeuille Vachette",   price:"78 000 XAF",  old:null, badge:"Essentiel", badgeColor:"#D4A04A", desc:"Vachette pleine fleur tannée végétal, 12 emplacements carte, protection RFID.", details:["Vachette tannée végétal","12 emplacements","Protection RFID","Format compact"] },
  ],
  parfums: [
    { id:"pa1", name:"Oud Impérial",            price:"185 000 XAF", old:null, badge:"Oriental", badgeColor:"#C94A6A", desc:"Oud de Laos vieilli 10 ans, rose de Damas absolue, ambre gris naturel. Extrait de parfum 50ml.", details:["Oud de Laos 10 ans","Rose de Damas absolue","Ambre gris naturel","50ml extrait"] },
    { id:"pa2", name:"Iris Blanc Absolu",       price:"145 000 XAF", old:null, badge:"Floral",   badgeColor:"#9A8AD4", desc:"Iris florentin absolue, musc blanc ambrée, cèdre de l'Atlas, sillage long. Eau de parfum 75ml.", details:["Iris florentin absolue","Musc blanc ambré","Cèdre Atlas","75ml EDP"] },
    { id:"pa3", name:"Citrus Marine",           price:"98 000 XAF",  old:"115 000 XAF", badge:"Promo", badgeColor:"#4AC4C9", desc:"Bergamote de Calabre, vétiver de Haïti, écume marine. Frais et élégant. Eau de toilette 100ml.", details:["Bergamote Calabre","Vétiver Haïti","Notes marines","100ml EDT"] },
    { id:"pa4", name:"Santal Mysore",           price:"125 000 XAF", old:null, badge:"Boisé",    badgeColor:"#C47A4A", desc:"Santal de Mysore certifié, cacao du Ghana, vanille Bourbon, bois précieux. EDP 50ml.", details:["Santal Mysore certifié","Cacao Ghana","Vanille Bourbon","50ml EDP"] },
    { id:"pa5", name:"Nuit d'Arabie",           price:"220 000 XAF", old:null, badge:"Rare",     badgeColor:"#8A4AC9", desc:"Oud attar naturel distillé, rose Taif Arabie, musc blanc pur. Extrait pur 30ml.", details:["Oud attar naturel","Rose Taif Arabie","Musc blanc pur","30ml extrait pur"] },
    { id:"pa6", name:"Coffret Découverte",      price:"75 000 XAF",  old:null, badge:"Cadeau",   badgeColor:"#D4504A", desc:"Coffret collector avec 5 miniatures 5ml de nos meilleures fragrances. Idéal en cadeau.", details:["5 miniatures 5ml","Sélection bestsellers","Coffret collector","Idéal cadeau"] },
  ],
  art: [
    { id:"ar1", name:"Sculpture Bronze",        price:"1 200 000 XAF", old:null, badge:"Unique",    badgeColor:"#C47A4A", desc:"Bronze à la cire perdue, artiste camerounais renommé, signée + certificat authenticité. H.45cm.", details:["Bronze cire perdue","Artiste certifié","Signée + certificat","Hauteur 45 cm"] },
    { id:"ar2", name:"Tableau Abstrait",        price:"380 000 XAF",  old:null, badge:"Original",  badgeColor:"#7A4AC9", desc:"Huile sur toile 80×100cm, technique couteau et pinceau, pièce unique signée au dos.", details:["Huile sur toile","80×100 cm","Technique couteau","Pièce unique signée"] },
    { id:"ar3", name:"Vase Porcelaine Or",      price:"145 000 XAF",  old:null, badge:"Artisan",   badgeColor:"#C9C94A", desc:"Porcelaine de Limoges, décoration or 24K appliquée à la main, hauteur 35cm. Pièce numérotée.", details:["Porcelaine Limoges","Or 24K à la main","Hauteur 35 cm","Pièce numérotée"] },
    { id:"ar4", name:"Lampe Laiton Design",     price:"265 000 XAF",  old:null, badge:"Exclusif",  badgeColor:"#D4A84A", desc:"Laiton martelé artisanalement, abat-jour soie naturelle, 3 intensités lumineuses.", details:["Laiton martelé main","Abat-jour soie","3 intensités","Câble tressé"] },
    { id:"ar5", name:"Tapis Berbère Laine",     price:"195 000 XAF",  old:null, badge:"Artisanat", badgeColor:"#E8736A", desc:"Laine mérinos naturelle non traitée, tissage berbère traditionnel 150×200 cm. Motifs géométriques.", details:["Laine mérinos naturelle","Tissage berbère","150×200 cm","Motifs géométriques"] },
    { id:"ar6", name:"Photographie Fine Art",   price:"95 000 XAF",   old:null, badge:"Photo Art", badgeColor:"#8AAAD4", desc:"Tirage fine art 50×70cm sur papier baryté 310g, encres archivales 100 ans, édition numérotée 10.", details:["Papier baryté 310g","Encres archivales","50×70 cm","Édition 10 ex."] },
  ],
};

const PACKS = [
  {
    id:"valentines", icon:"💕", title:"Pack Saint-Valentin",
    color:"#E85878", colorLight:"#F4A0B0",
    desc:"Offrez à votre moitié un souvenir inoubliable. Bijou + parfum + emballage velours rouge.",
    items:["Bijou au choix","Parfum romantique","Emballage velours","Carte personnalisée"],
    price:"À partir de 150 000 XAF",
  },
  {
    id:"christmas", icon:"🎄", title:"Pack Noël",
    color:"#2E8B57", colorLight:"#5DBF85",
    desc:"Faites briller les fêtes avec nos coffrets sélectionnés avec soin pour toute la famille.",
    items:["Coffret 3 articles","Emballage doré festif","Ruban satin","Livraison express"],
    price:"À partir de 200 000 XAF",
  },
  {
    id:"work", icon:"💼", title:"Pack Corporate",
    color:"#2A5BA8", colorLight:"#5A8FD8",
    desc:"Cadeaux d'affaires raffinés pour vos collaborateurs, clients et partenaires.",
    items:["Personnalisation logo","Commande groupée","Emballage professionnel","Facture détaillée"],
    price:"Sur devis",
  },
  {
    id:"birthday", icon:"🎂", title:"Pack Anniversaire",
    color:"#C9A84C", colorLight:"#E8C97A",
    desc:"Chaque anniversaire mérite un cadeau d'exception. Nous composons votre coffret sur mesure.",
    items:["Consultation gratuite","Coffret sur mesure","Ruban & carte offerts","Livraison le jour J"],
    price:"À partir de 100 000 XAF",
  },
];

const PAGES = [
  { id:"home",        label:"Accueil",     emoji:"✦" },
  { id:"bijoux",      label:"Bijoux",      emoji:"💍" },
  { id:"montres",     label:"Montres",     emoji:"⌚" },
  { id:"cadres",      label:"Cadres",      emoji:"🖼️" },
  { id:"accessoires", label:"Accessoires", emoji:"👜" },
  { id:"parfums",     label:"Parfums",     emoji:"🌹" },
  { id:"art",         label:"Art & Déco",  emoji:"🎨" },
  { id:"packs",       label:"Packs",       emoji:"🎁" },
  { id:"livraison",   label:"Livraison",   emoji:"🚚" },
  { id:"contact",     label:"Contact",     emoji:"✉️" },
];

const HERO_CATS = [
  { id:"bijoux",      label:"Bijoux",      emoji:"💍", desc:"Or, argent & pierres précieuses",  img:"https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80" },
  { id:"montres",     label:"Montres",     emoji:"⌚", desc:"Haute horlogerie & prestige",      img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
  { id:"cadres",      label:"Cadres",      emoji:"🖼️",desc:"Décoration murale d'exception",   img:"https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80" },
  { id:"accessoires", label:"Accessoires", emoji:"👜", desc:"Mode & élégance au quotidien",    img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80" },
  { id:"parfums",     label:"Parfums",     emoji:"🌹", desc:"Fragrances rares & exclusives",   img:"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80" },
  { id:"art",         label:"Art & Déco",  emoji:"🎨", desc:"Pièces uniques & sculptures",     img:"https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80" },
];

/* ── CSS INJECTION ── */
if (typeof document !== "undefined") {
  const s = document.createElement("style");
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Outfit', sans-serif; transition: background .3s, color .3s; -webkit-font-smoothing: antialiased; }
    @keyframes fadeUp   { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);} }
    @keyframes fadeIn   { from{opacity:0;}to{opacity:1;} }
    @keyframes shimmer  { 0%{background-position:-300% center;}100%{background-position:300% center;} }
    @keyframes floatY   { 0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);} }
    @keyframes pulse    { 0%,100%{opacity:1;}50%{opacity:.6;} }
    ::-webkit-scrollbar { width: 4px; }

    /* ── RESPONSIVE NAV ── */
    .nav-links { display: flex; gap: 20px; align-items: center; }
    .hamburger { display: none !important; }
    @media (max-width: 900px) {
      .nav-links { display: none !important; }
      .hamburger { display: flex !important; }
    }

    /* ── RESPONSIVE GRIDS ── */
    .hero-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    @media (max-width: 900px) { .hero-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 560px) { .hero-grid { grid-template-columns: 1fr; } }

    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 22px; }
    @media (max-width: 640px) { .product-grid { grid-template-columns: 1fr 1fr; gap: 14px; } }
    @media (max-width: 420px) { .product-grid { grid-template-columns: 1fr; } }

    .stats-row { display: flex; justify-content: center; flex-wrap: wrap; }
    .stat-item { flex: 1 1 130px; text-align: center; padding: 18px 16px; border-right: 1px solid var(--border); }
    .stat-item:last-child { border-right: none; }
    @media (max-width: 560px) { .stat-item { flex: 1 1 50%; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); } }

    .packs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    @media (max-width: 700px) { .packs-grid { grid-template-columns: 1fr; } }

    .modal-inner { display: grid; grid-template-columns: 1fr 1fr; max-width: 780px; width: 100%; }
    @media (max-width: 640px) { .modal-inner { grid-template-columns: 1fr; max-height: 90vh; overflow-y: auto; } .modal-img { height: 240px; min-height: unset; } }

    .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 44px; align-items: start; }
    @media (max-width: 760px) { .contact-grid { grid-template-columns: 1fr; } }

    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 36px; }
    @media (max-width: 880px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr; } }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    @media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }

    .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }

    .livraison-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
    @media (max-width: 860px) { .livraison-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 540px) { .livraison-grid { grid-template-columns: 1fr; } }

    /* Card image height responsive */
    .card-img { height: 220px; }
    @media (max-width: 640px) { .card-img { height: 180px; } }
    @media (max-width: 420px) { .card-img { height: 200px; } }

    /* Hero text sizes */
    .hero-logo { font-size: clamp(70px, 18vw, 150px); }
    .hero-sub  { letter-spacing: clamp(8px, 4vw, 22px); font-size: clamp(10px, 2.5vw, 14px); }
    .hero-tag  { font-size: clamp(18px, 3.5vw, 26px); }

    /* Section padding responsive */
    .section-pad { padding: 80px 5%; }
    @media (max-width: 640px) { .section-pad { padding: 52px 4%; } }

    .page-pad { padding: 100px 5% 80px; }
    @media (max-width: 640px) { .page-pad { padding: 90px 4% 60px; } }

    /* Whatsapp float button */
    .wa-btn { position: fixed; bottom: 24px; right: 20px; z-index: 800; width: 54px; height: 54px; border-radius: 50%; background: #25D366; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 26px; box-shadow: 0 4px 20px rgba(37,211,102,0.4); transition: transform .2s; }
    .wa-btn:hover { transform: scale(1.1); }
  `;
  document.head.appendChild(s);
}

/* ══════════════════════════════════════════════════════
   PRODUCT MODAL
══════════════════════════════════════════════════════ */
function ProductModal({ item, img, t, onClose }) {
  useEffect(() => {
    const esc = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"rgba(0,0,0,0.88)", backdropFilter:"blur(8px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"16px", animation:"fadeIn .2s ease",
    }}>
      <div onClick={e => e.stopPropagation()} className="modal-inner" style={{
        background: t.surface, border:`1px solid ${t.border}`,
        borderRadius:18, overflow:"hidden",
        animation:"fadeUp .35s cubic-bezier(.16,1,.3,1)",
        maxHeight:"92vh",
      }}>
        {/* Image */}
        <div className="modal-img" style={{ position:"relative", overflow:"hidden", minHeight:300 }}>
          <img src={img} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,transparent 60%,rgba(0,0,0,0.25))" }}/>
          <div style={{
            position:"absolute", top:14, left:14,
            background:`${item.badgeColor}22`, border:`1px solid ${item.badgeColor}44`,
            color:item.badgeColor, padding:"4px 12px", borderRadius:20,
            fontFamily:"'Outfit',sans-serif", fontSize:10, fontWeight:600, letterSpacing:2, textTransform:"uppercase",
          }}>{item.badge}</div>
        </div>
        {/* Content */}
        <div style={{ padding:"28px 24px 24px", overflowY:"auto", display:"flex", flexDirection:"column", gap:14 }}>
          <button onClick={onClose} style={{ alignSelf:"flex-end", background:"transparent", border:"none", color:t.textMut, cursor:"pointer", fontSize:20 }}>✕</button>
          <div>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:t.purple, marginBottom:6 }}>Nad Accessoire</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:600, color:t.text, lineHeight:1.2 }}>{item.name}</h2>
          </div>
          <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:t.gold }}>{item.price}</span>
            {item.old && <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textMut, textDecoration:"line-through" }}>{item.old}</span>}
          </div>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub, lineHeight:1.7 }}>{item.desc}</p>
          <div style={{ borderTop:`1px solid ${t.border}`, paddingTop:14 }}>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:t.gold, marginBottom:10 }}>Caractéristiques</p>
            {item.details.map((d,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                <span style={{ color:t.gold, fontSize:10 }}>✦</span>
                <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub }}>{d}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:10, marginTop:"auto", paddingTop:6 }}>
            <a href="https://wa.me/237678680811" target="_blank" rel="noreferrer" onClick={onClose} style={{
              flex:1, padding:"13px 0", borderRadius:12, border:"none", cursor:"pointer",
              background:`linear-gradient(135deg,${t.goldD},${t.gold})`,
              color:"#fff", fontFamily:"'Outfit',sans-serif", fontWeight:600,
              fontSize:11, letterSpacing:2, textTransform:"uppercase",
              textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center",
            }}>Commander via WhatsApp</a>
            <button onClick={onClose} style={{
              padding:"12px 14px", borderRadius:12, cursor:"pointer",
              background:"transparent", border:`1px solid ${t.border2}`,
              color:t.textSub, fontSize:14,
            }}>✕</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════════════════════ */
function ProductCard({ item, img, idx, t }) {
  const [modal, setModal] = useState(false);
  const [wish, setWish] = useState(false);
  return (
    <>
      {modal && <ProductModal item={item} img={img} t={t} onClose={()=>setModal(false)}/>}
      <div onClick={()=>setModal(true)} style={{
        background:t.cardBg, border:`1px solid ${t.border}`,
        borderRadius:14, overflow:"hidden", cursor:"pointer",
        transition:"transform .3s, box-shadow .3s",
        animation:`fadeUp .6s ${idx*0.06}s cubic-bezier(.16,1,.3,1) both`,
        display:"flex", flexDirection:"column",
      }}
        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 16px 44px ${t.purple}20`;}}
        onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
      >
        <div className="card-img" style={{ position:"relative", overflow:"hidden", background:t.bg2, flexShrink:0 }}>
          <img src={img} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .4s" }}
            onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
            onMouseLeave={e=>e.target.style.transform="scale(1)"}
          />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 55%)" }}/>
          <div style={{ position:"absolute", top:10, left:10 }}>
            <span style={{ background:`${item.badgeColor}22`, border:`1px solid ${item.badgeColor}55`, color:item.badgeColor, padding:"3px 9px", borderRadius:20, fontFamily:"'Outfit',sans-serif", fontSize:9, fontWeight:600, letterSpacing:1.5, textTransform:"uppercase" }}>{item.badge}</span>
          </div>
          <div onClick={e=>{e.stopPropagation();setWish(!wish);}} style={{ position:"absolute", top:8, right:10, fontSize:17, cursor:"pointer", transition:"transform .2s", transform:wish?"scale(1.2)":"scale(1)" }}>{wish?"❤️":"🤍"}</div>
        </div>
        <div style={{ padding:"14px 14px 18px", flex:1, display:"flex", flexDirection:"column", gap:7 }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:600, color:t.text, lineHeight:1.2 }}>{item.name}</h3>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:t.textMut, lineHeight:1.6, flex:1 }}>{item.desc.substring(0,72)}…</p>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:4 }}>
            <div>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:700, color:t.gold }}>{item.price}</span>
              {item.old && <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:t.textMut, textDecoration:"line-through", marginLeft:5 }}>{item.old}</span>}
            </div>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:t.purple, letterSpacing:1 }}>Voir →</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════ */
function Navbar({ current, setCurrent, dark, setDark, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mob ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mob]);

  const go = id => { setCurrent(id); setMob(false); };

  const navLinks = PAGES.filter(p => !["packs","livraison"].includes(p.id));

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        background: scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
        transition:"all .35s",
        padding:"0 5%", display:"flex", alignItems:"center", justifyContent:"space-between", height:64,
      }}>
        {/* Logo */}
        <div onClick={()=>go("home")} style={{ cursor:"pointer", display:"flex", alignItems:"baseline", gap:6 }}>
          <span style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700,
            background:t.shimmer, backgroundSize:"300% auto",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            animation:"shimmer 5s linear infinite", letterSpacing:3,
          }}>NADi</span>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:7, fontWeight:300, letterSpacing:5, color:t.textMut, textTransform:"uppercase" }}>ACCESSOIRE</span>
        </div>

        {/* Desktop links */}
        <div className="nav-links">
          {navLinks.map(p => (
            <span key={p.id} onClick={()=>go(p.id)} style={{
              fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontWeight:500,
              cursor:"pointer", color:current===p.id ? t.gold : t.textMut, transition:"color .2s",
              borderBottom: current===p.id ? `1px solid ${t.gold}` : "1px solid transparent", paddingBottom:2,
            }}
              onMouseEnter={e=>e.target.style.color=t.gold}
              onMouseLeave={e=>e.target.style.color=current===p.id?t.gold:t.textMut}
            >{p.label}</span>
          ))}
          {/* Packs & Livraison links */}
          {["packs","livraison"].map(id => {
            const p = PAGES.find(x=>x.id===id);
            return (
              <span key={id} onClick={()=>go(id)} style={{
                fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:1.5, textTransform:"uppercase", fontWeight:500,
                cursor:"pointer", color:current===id?t.gold:t.textMut, transition:"color .2s",
                borderBottom:current===id?`1px solid ${t.gold}`:"1px solid transparent", paddingBottom:2,
              }}
                onMouseEnter={e=>e.target.style.color=t.gold}
                onMouseLeave={e=>e.target.style.color=current===id?t.gold:t.textMut}
              >{p.label}</span>
            );
          })}
          {/* Toggle */}
          <button onClick={()=>setDark(!dark)} style={{
            background:dark?"#1E1830":"#EDE5D0", border:`1px solid ${t.border2}`,
            borderRadius:30, cursor:"pointer", width:50, height:26, padding:"2px 3px",
            display:"flex", alignItems:"center", justifyContent:dark?"flex-end":"flex-start", transition:"all .3s",
          }}>
            <div style={{ width:20, height:20, borderRadius:"50%", background:dark?"linear-gradient(135deg,#B47FFF,#6E3AFF)":"linear-gradient(135deg,#E8C97A,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, transition:"all .3s" }}>{dark?"🌙":"☀️"}</div>
          </button>
        </div>

        {/* Hamburger */}
        <div className="hamburger" style={{ display:"flex", alignItems:"center", gap:12 }}>
          <button onClick={()=>setDark(!dark)} style={{
            background:dark?"#1E1830":"#EDE5D0", border:`1px solid ${t.border2}`,
            borderRadius:30, cursor:"pointer", width:46, height:24, padding:"2px 3px",
            display:"flex", alignItems:"center", justifyContent:dark?"flex-end":"flex-start", transition:"all .3s",
          }}>
            <div style={{ width:18, height:18, borderRadius:"50%", background:dark?"linear-gradient(135deg,#B47FFF,#6E3AFF)":"linear-gradient(135deg,#E8C97A,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>{dark?"🌙":"☀️"}</div>
          </button>
          <button onClick={()=>setMob(!mob)} style={{ background:"transparent", border:"none", cursor:"pointer", padding:6, color:t.text, fontSize:22, lineHeight:1 }}>
            {mob?"✕":"☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mob && (
        <div style={{
          position:"fixed", inset:0, zIndex:999,
          background:dark?"rgba(7,6,10,0.98)":"rgba(250,247,242,0.98)",
          backdropFilter:"blur(20px)",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          gap:0, animation:"fadeIn .2s ease", overflowY:"auto", paddingTop:80, paddingBottom:40,
        }}>
          {PAGES.map((p,i)=>(
            <div key={p.id} onClick={()=>go(p.id)} style={{
              width:"100%", textAlign:"center", padding:"14px 0",
              borderBottom:`1px solid ${t.border}`,
              animation:`fadeUp .4s ${i*.04}s both`,
            }}>
              <span style={{
                fontFamily:"'Cormorant Garamond',serif", fontSize:26, letterSpacing:2,
                color:current===p.id?t.gold:t.text, cursor:"pointer",
              }}>{p.emoji} {p.label}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION HEADER helper
══════════════════════════════════════════════════════ */
function SectionHeader({ sub, title, t }) {
  return (
    <div style={{ textAlign:"center", marginBottom:50 }}>
      <div style={{ width:44, height:2, background:`linear-gradient(90deg,${t.purple},${t.gold})`, margin:"0 auto 14px" }}/>
      <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:5, textTransform:"uppercase", color:t.purple, marginBottom:10 }}>{sub}</p>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,5vw,48px)", fontWeight:400, color:t.text }}>{title}</h2>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════ */
function HomePage({ setCurrent, dark, t }) {
  return (
    <div>
      {/* ── HERO ── */}
      <div style={{
        minHeight:"100vh", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        textAlign:"center", padding:"120px 6% 80px",
        position:"relative", overflow:"hidden",
        background: t.heroGrad,
      }}>
        {[
          { s:600, bg:dark?"rgba(110,58,255,.14)":"rgba(90,46,200,.08)", top:-180, right:-180, dur:"10s" },
          { s:450, bg:dark?"rgba(201,168,76,.1)":"rgba(184,134,11,.09)", bottom:-80, left:-80, dur:"12s" },
          { s:300, bg:dark?"rgba(201,74,106,.08)":"rgba(180,60,90,.06)", top:"38%", left:"12%", dur:"9s" },
        ].map((o,i)=>(
          <div key={i} style={{
            position:"absolute", width:o.s, height:o.s, borderRadius:"50%",
            background:`radial-gradient(circle,${o.bg} 0%,transparent 65%)`,
            top:o.top, right:o.right, bottom:o.bottom, left:o.left,
            pointerEvents:"none", animation:`floatY ${o.dur} ${i}s ease-in-out infinite`,
          }}/>
        ))}
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, letterSpacing:6, textTransform:"uppercase", color:t.purple, marginBottom:18, animation:"fadeUp .6s both" }}>✦ Maison de Luxe & Raffinement ✦</p>
        <h1 className="hero-logo" style={{
          fontFamily:"'Cormorant Garamond',serif", fontWeight:700, lineHeight:.9, letterSpacing:-3, marginBottom:4,
          background:t.shimmer, backgroundSize:"300% auto",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          animation:"shimmer 5s linear infinite, fadeUp .6s .1s both",
        }}>NADi</h1>
        <p className="hero-sub" style={{ fontFamily:"'Outfit',sans-serif", fontWeight:300, textTransform:"uppercase", color:t.textMut, marginBottom:6, animation:"fadeUp .6s .15s both" }}>ACCESSOIRE</p>
        <p className="hero-tag" style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", color:t.textSub, marginBottom:48, maxWidth:500, animation:"fadeUp .6s .25s both" }}>L'art du détail, l'excellence du goût</p>
        <div className="hero-btns" style={{ animation:"fadeUp .6s .35s both" }}>
          <button onClick={()=>setCurrent("bijoux")} style={{
            padding:"14px 34px", borderRadius:40, border:"none", cursor:"pointer",
            background:`linear-gradient(135deg,${t.purple},${t.purpleL})`,
            color:"#fff", fontFamily:"'Outfit',sans-serif", fontWeight:500,
            fontSize:11, letterSpacing:2, textTransform:"uppercase", transition:"opacity .2s,transform .2s",
          }}
            onMouseEnter={e=>{e.target.style.opacity=".85";e.target.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.target.style.opacity="1";e.target.style.transform="translateY(0)";}}
          >Découvrir les collections</button>
          <button onClick={()=>setCurrent("packs")} style={{
            padding:"14px 34px", borderRadius:40, cursor:"pointer",
            background:dark?"transparent":"rgba(74,40,204,0.08)",
            border:`1px solid ${t.border2}`,
            color:t.textSub, fontFamily:"'Outfit',sans-serif", fontWeight:500,
            fontSize:11, letterSpacing:2, textTransform:"uppercase", transition:"all .2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=t.gold;e.currentTarget.style.color=t.gold;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border2;e.currentTarget.style.color=t.textSub;}}
          >🎁 Nos Packs Cadeaux</button>
          <button onClick={()=>setCurrent("contact")} style={{
            padding:"14px 34px", borderRadius:40, cursor:"pointer",
            background:"transparent", border:`1px solid ${t.border}`,
            color:t.textMut, fontFamily:"'Outfit',sans-serif", fontWeight:400,
            fontSize:11, letterSpacing:2, textTransform:"uppercase", transition:"all .2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=t.gold;e.currentTarget.style.color=t.gold;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.color=t.textMut;}}
          >Nous contacter</button>
        </div>
        <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:t.textMut }}>Parcourir</span>
          <div style={{ width:1, height:32, background:`linear-gradient(${t.purple},transparent)` }}/>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ background:t.statBg, borderTop:`1px solid ${t.border}`, borderBottom:`1px solid ${t.border}`, padding:"12px 5%" }}>
        <div className="stats-row" style={{ maxWidth:900, margin:"0 auto" }}>
          {[["6","Catégories"],["200+","Articles"],["12 ans","D'expertise"],["98%","Satisfaction"]].map(([n,l])=>(
            <div className="stat-item" key={l}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:t.gold }}>{n}</div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:t.textMut, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <div className="section-pad" style={{ background:t.bg }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionHeader sub="NOS UNIVERS" title="Explorez nos collections" t={t}/>
          <div className="hero-grid">
            {HERO_CATS.map((cat,i)=>(
              <div key={cat.id} onClick={()=>setCurrent(cat.id)} style={{
                borderRadius:14, overflow:"hidden", position:"relative", height:220, cursor:"pointer",
                border:`1px solid ${t.border}`, transition:"transform .3s,box-shadow .3s",
                animation:`fadeUp .6s ${i*.07}s cubic-bezier(.16,1,.3,1) both`,
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(0,0,0,0.25)";e.currentTarget.querySelector("img").style.transform="scale(1.06)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";e.currentTarget.querySelector("img").style.transform="scale(1)";}}
              >
                <img src={cat.img} alt={cat.label} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .5s" }}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.08) 60%)" }}/>
                <div style={{ position:"absolute", bottom:16, left:16 }}>
                  <span style={{ fontSize:20, display:"block", marginBottom:4 }}>{cat.emoji}</span>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:"#FFF", marginBottom:2 }}>{cat.label}</h3>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:"rgba(255,255,255,0.75)" }}>{cat.desc}</p>
                </div>
                <div style={{ position:"absolute", top:12, right:12, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(4px)", borderRadius:20, padding:"3px 10px", fontFamily:"'Outfit',sans-serif", fontSize:9, color:"#fff", letterSpacing:1.5, textTransform:"uppercase" }}>Voir →</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PACKS TEASER ── */}
      <div className="section-pad" style={{ background:t.bg2, borderTop:`1px solid ${t.border}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionHeader sub="OCCASIONS SPÉCIALES" title="Packs cadeaux exclusifs" t={t}/>
          <div className="packs-grid">
            {PACKS.map((pk,i)=>(
              <div key={pk.id} onClick={()=>setCurrent("packs")} style={{
                background:t.cardBg, border:`1px solid ${t.border}`,
                borderRadius:16, padding:"24px 22px", cursor:"pointer",
                transition:"transform .3s,box-shadow .3s",
                animation:`fadeUp .6s ${i*.07}s both`,
                borderLeft:`4px solid ${pk.color}`,
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 14px 36px ${pk.color}22`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}
              >
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                  <span style={{ fontSize:32 }}>{pk.icon}</span>
                  <div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:t.text }}>{pk.title}</h3>
                    <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:pk.color, fontWeight:600 }}>{pk.price}</p>
                  </div>
                </div>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textSub, lineHeight:1.7, marginBottom:14 }}>{pk.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {pk.items.map(it=>(
                    <span key={it} style={{ background:`${pk.color}14`, border:`1px solid ${pk.color}30`, color:pk.color, padding:"3px 10px", borderRadius:20, fontFamily:"'Outfit',sans-serif", fontSize:10 }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:36 }}>
            <button onClick={()=>setCurrent("packs")} style={{
              padding:"13px 32px", borderRadius:30, border:`1px solid ${t.border2}`,
              background:"transparent", color:t.textSub, cursor:"pointer",
              fontFamily:"'Outfit',sans-serif", fontSize:11, letterSpacing:2, textTransform:"uppercase", transition:"all .2s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=t.gold;e.currentTarget.style.color=t.gold;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border2;e.currentTarget.style.color=t.textSub;}}
            >Voir tous les packs →</button>
          </div>
        </div>
      </div>

      {/* ── FEATURED ── */}
      <div className="section-pad" style={{ background:t.bg, borderTop:`1px solid ${t.border}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <SectionHeader sub="SÉLECTION" title="Coups de cœur" t={t}/>
          <div className="product-grid">
            {[
              { item:PRODUCTS.bijoux[0],  img:IMGS.bijoux[0] },
              { item:PRODUCTS.montres[0], img:IMGS.montres[0] },
              { item:PRODUCTS.parfums[0], img:IMGS.parfums[0] },
              { item:PRODUCTS.art[0],     img:IMGS.art[0] },
            ].map(({item,img},i)=>(
              <ProductCard key={item.id} item={item} img={img} idx={i} t={t}/>
            ))}
          </div>
        </div>
      </div>

      {/* ── LIVRAISON TEASER ── */}
      <div className="section-pad" style={{ background:t.bg2, borderTop:`1px solid ${t.border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionHeader sub="SERVICE PREMIUM" title="Livraison à domicile" t={t}/>
          <div className="livraison-grid">
            {[
              { icon:"🏠", title:"Livraison Douala", desc:"Livraison à domicile dans tout Douala sous 24h.", color:"#4AC9A0" },
              { icon:"📦", title:"Livraison Nationale", desc:"Envoi sécurisé partout au Cameroun sous 48–72h.", color:"#4A8AC9" },
              { icon:"✈️", title:"Livraison Internationale", desc:"Expédition mondiale disponible sur demande.", color:"#8A4AC9" },
            ].map((l,i)=>(
              <div key={i} onClick={()=>setCurrent("livraison")} style={{
                background:t.cardBg, border:`1px solid ${t.border}`,
                borderRadius:14, padding:"24px 20px", cursor:"pointer",
                transition:"transform .3s",
                borderTop:`3px solid ${l.color}`,
              }}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
                onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
              >
                <span style={{ fontSize:36, display:"block", marginBottom:12 }}>{l.icon}</span>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:t.text, marginBottom:8 }}>{l.title}</h3>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textSub, lineHeight:1.7 }}>{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="section-pad" style={{ background:t.bg, borderTop:`1px solid ${t.border}` }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <SectionHeader sub="AVIS CLIENTS" title="Ils nous font confiance" t={t}/>
          <div className="livraison-grid">
            {[
              { name:"Marie-Claire D.", city:"Douala", text:"Bijoux absolument magnifiques, qualité irréprochable. Je recommande à 100% !", col:"#C9A84C", init:"M" },
              { name:"Jean-Baptiste K.", city:"Yaoundé", text:"Le cadre Empire doré a transformé mon salon. Service client exceptionnel.", col:"#8AAAD4", init:"J" },
              { name:"Aminata S.", city:"Abidjan", text:"Parfum identique à la description. Livraison rapide, emballage somptueux.", col:"#C94A6A", init:"A" },
            ].map(rv=>(
              <div key={rv.name} style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:14, padding:"24px 20px" }}>
                <div style={{ color:"#C9A84C", fontSize:13, marginBottom:12, letterSpacing:4 }}>★★★★★</div>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:16, color:t.textSub, lineHeight:1.7, marginBottom:18 }}>«{rv.text}»</p>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:`${rv.col}22`, border:`1px solid ${rv.col}44`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:rv.col, fontWeight:700 }}>{rv.init}</div>
                  <div>
                    <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:500, color:t.text }}>{rv.name}</p>
                    <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:t.textMut }}>{rv.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CATEGORY PAGE
══════════════════════════════════════════════════════ */
function CategoryPage({ catId, setCurrent, t }) {
  const items = PRODUCTS[catId] || [];
  const imgs  = IMGS[catId] || [];
  const page  = PAGES.find(p=>p.id===catId);
  const [filt, setFilt] = useState("all");
  const FILTERS = ["all","nouveau","promo","exclusif","rare","bestseller"];
  const filtered = filt==="all" ? items : items.filter(i=>i.badge.toLowerCase().replace(/[.\s]/g,"")===filt.replace(/[.\s]/g,""));

  return (
    <div className="page-pad" style={{ background:t.bg, minHeight:"100vh" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:50 }}>
          <div style={{ width:44, height:2, background:`linear-gradient(90deg,${t.purple},${t.gold})`, margin:"0 auto 16px" }}/>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:5, textTransform:"uppercase", color:t.purple, marginBottom:10 }}>NAD ACCESSOIRE</p>
          <h1 style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,7vw,66px)",
            fontWeight:600, lineHeight:.95,
            background:`linear-gradient(135deg,${t.goldL},${t.gold})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:12,
          }}>{page?.emoji} {page?.label}</h1>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub, maxWidth:460, margin:"0 auto" }}>
            Découvrez notre sélection exclusive de {page?.label.toLowerCase()} choisis pour leur qualité et élégance.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:44 }}>
          {FILTERS.map(f=>(
            <button key={f} onClick={()=>setFilt(f)} style={{
              padding:"7px 18px", borderRadius:30,
              fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:1.5, textTransform:"uppercase", cursor:"pointer",
              background:filt===f?`linear-gradient(135deg,${t.purple},${t.purpleL})`:"transparent",
              color:filt===f?"#fff":t.textMut, border:filt===f?"none":`1px solid ${t.border}`,
              transition:"all .2s",
            }}>{f==="all"?"Tous":f}</button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((item,i)=>(
              <ProductCard key={item.id} item={item} img={imgs[i]||imgs[0]} idx={i} t={t}/>
            ))}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"70px 0" }}>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontStyle:"italic", color:t.textMut }}>Aucun article pour ce filtre</p>
            <button onClick={()=>setFilt("all")} style={{ marginTop:18, padding:"10px 22px", borderRadius:24, background:"transparent", border:`1px solid ${t.border2}`, color:t.textSub, cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontSize:11 }}>Voir tout</button>
          </div>
        )}

        <div style={{ textAlign:"center", marginTop:54 }}>
          <button onClick={()=>setCurrent("home")} style={{
            padding:"12px 30px", borderRadius:30, background:"transparent",
            border:`1px solid ${t.border2}`, color:t.textSub, cursor:"pointer",
            fontFamily:"'Outfit',sans-serif", fontSize:11, letterSpacing:1.5, textTransform:"uppercase", transition:"all .2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=t.gold;e.currentTarget.style.color=t.gold;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border2;e.currentTarget.style.color=t.textSub;}}
          >← Retour à l'accueil</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PACKS PAGE
══════════════════════════════════════════════════════ */
function PacksPage({ setCurrent, t }) {
  return (
    <div className="page-pad" style={{ background:t.bg, minHeight:"100vh" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:54 }}>
          <div style={{ width:44, height:2, background:`linear-gradient(90deg,${t.purple},${t.gold})`, margin:"0 auto 16px" }}/>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:5, textTransform:"uppercase", color:t.purple, marginBottom:10 }}>OCCASIONS SPÉCIALES</p>
          <h1 style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(34px,7vw,64px)",
            fontWeight:600, background:`linear-gradient(135deg,${t.goldL},${t.gold})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>🎁 Packs Cadeaux</h1>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub, maxWidth:500, margin:"14px auto 0", lineHeight:1.7 }}>
            Nous composons des coffrets sur mesure pour chaque occasion. Chaque pack inclut un emballage premium et une carte personnalisée offerte.
          </p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
          {PACKS.map((pk,i)=>(
            <div key={pk.id} style={{
              background:t.cardBg, border:`1px solid ${t.border}`,
              borderRadius:18, overflow:"hidden",
              display:"grid", gridTemplateColumns:"auto 1fr",
              animation:`fadeUp .6s ${i*.08}s both`,
            }}>
              {/* Color bar */}
              <div style={{ width:6, background:`linear-gradient(to bottom,${pk.color},${pk.colorLight})` }}/>
              <div style={{ padding:"28px 28px 28px 24px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:18, flexWrap:"wrap", marginBottom:16 }}>
                  <span style={{ fontSize:48, lineHeight:1 }}>{pk.icon}</span>
                  <div style={{ flex:1, minWidth:180 }}>
                    <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:600, color:t.text, marginBottom:4 }}>{pk.title}</h2>
                    <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:16, fontWeight:600, color:pk.color }}>{pk.price}</p>
                  </div>
                </div>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub, lineHeight:1.8, marginBottom:18 }}>{pk.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:22 }}>
                  {pk.items.map(it=>(
                    <span key={it} style={{ background:`${pk.color}12`, border:`1px solid ${pk.color}30`, color:pk.color, padding:"5px 14px", borderRadius:30, fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:500 }}>✦ {it}</span>
                  ))}
                </div>
                <a href="https://wa.me/237678680811" target="_blank" rel="noreferrer" style={{
                  display:"inline-block", padding:"12px 28px", borderRadius:30, border:"none", cursor:"pointer",
                  background:`linear-gradient(135deg,${pk.color},${pk.colorLight})`,
                  color:"#fff", fontFamily:"'Outfit',sans-serif", fontWeight:600,
                  fontSize:11, letterSpacing:2, textTransform:"uppercase", textDecoration:"none",
                  transition:"opacity .2s",
                }}>Commander ce pack via WhatsApp</a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:16, padding:"28px 24px", textAlign:"center", marginTop:40 }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:400, color:t.text, marginBottom:8 }}>Pack personnalisé sur mesure</p>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub, marginBottom:20, lineHeight:1.7 }}>Vous avez une idée précise ? Contactez-nous et nous créons votre coffret unique.</p>
          <button onClick={()=>setCurrent("contact")} style={{
            padding:"12px 30px", borderRadius:30, border:`1px solid ${t.border2}`,
            background:"transparent", color:t.textSub, cursor:"pointer",
            fontFamily:"'Outfit',sans-serif", fontSize:11, letterSpacing:2, textTransform:"uppercase", transition:"all .2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=t.gold;e.currentTarget.style.color=t.gold;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border2;e.currentTarget.style.color=t.textSub;}}
          >Nous contacter →</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   LIVRAISON PAGE
══════════════════════════════════════════════════════ */
function LivraisonPage({ setCurrent, t }) {
  const zones = [
    { icon:"🏠", title:"Douala – Express", delay:"Sous 24h", price:"2 000 – 5 000 XAF", color:"#4AC9A0", desc:"Livraison à domicile dans tout Douala. Zone couverte : Akwa, Bonanjo, Deido, Bali, Makepe, Logpom, PK, Bonamoussadi, etc." },
    { icon:"🚗", title:"Yaoundé & Villes Principales", delay:"48 – 72h", price:"8 000 – 15 000 XAF", color:"#4A8AC9", desc:"Couverture nationale via transporteurs partenaires fiables. Livraison à domicile ou en point relais selon la ville." },
    { icon:"✈️", title:"International", delay:"5 – 10 jours ouvrables", price:"Sur devis", color:"#8A4AC9", desc:"Expédition mondiale via DHL ou Chronopost. Emballage sécurisé renforcé pour vos pièces précieuses." },
  ];

  const garanties = [
    { icon:"📦", title:"Emballage sécurisé", desc:"Chaque article est emballé avec soin dans un écrin premium résistant aux chocs." },
    { icon:"🔒", title:"Paiement sécurisé", desc:"Paiement à la livraison disponible à Douala. Mobile Money & virement acceptés." },
    { icon:"📍", title:"Suivi en temps réel", desc:"Numéro de suivi fourni pour chaque commande. Mises à jour WhatsApp." },
    { icon:"↩️", title:"Retour & Échange", desc:"7 jours pour retourner un article non conforme. Échange ou remboursement garanti." },
  ];

  return (
    <div className="page-pad" style={{ background:t.bg, minHeight:"100vh" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:54 }}>
          <div style={{ width:44, height:2, background:`linear-gradient(90deg,${t.purple},${t.gold})`, margin:"0 auto 16px" }}/>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:5, textTransform:"uppercase", color:t.purple, marginBottom:10 }}>SERVICE PREMIUM</p>
          <h1 style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(34px,7vw,64px)",
            fontWeight:600, background:`linear-gradient(135deg,${t.goldL},${t.gold})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>🚚 Livraison</h1>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub, maxWidth:500, margin:"14px auto 0", lineHeight:1.7 }}>
            Nous livrons vos articles avec soin partout au Cameroun et à l'international. Votre satisfaction est notre priorité.
          </p>
        </div>

        {/* Zones */}
        <div style={{ marginBottom:50 }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:400, color:t.text, marginBottom:24, textAlign:"center" }}>Zones de livraison</h2>
          <div className="livraison-grid">
            {zones.map((z,i)=>(
              <div key={i} style={{
                background:t.cardBg, border:`1px solid ${t.border}`,
                borderRadius:16, padding:"26px 22px",
                borderTop:`3px solid ${z.color}`,
                animation:`fadeUp .6s ${i*.08}s both`,
              }}>
                <span style={{ fontSize:38, display:"block", marginBottom:14 }}>{z.icon}</span>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:21, fontWeight:600, color:t.text, marginBottom:6 }}>{z.title}</h3>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:12 }}>
                  <span style={{ background:`${z.color}14`, border:`1px solid ${z.color}30`, color:z.color, padding:"3px 12px", borderRadius:20, fontFamily:"'Outfit',sans-serif", fontSize:10 }}>⏱ {z.delay}</span>
                  <span style={{ background:`${t.gold}14`, border:`1px solid ${t.gold}30`, color:t.gold, padding:"3px 12px", borderRadius:20, fontFamily:"'Outfit',sans-serif", fontSize:10 }}>💰 {z.price}</span>
                </div>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textSub, lineHeight:1.7 }}>{z.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Garanties */}
        <div style={{ marginBottom:44 }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:400, color:t.text, marginBottom:24, textAlign:"center" }}>Nos garanties</h2>
          <div className="packs-grid">
            {garanties.map((g,i)=>(
              <div key={i} style={{
                background:t.cardBg, border:`1px solid ${t.border}`,
                borderRadius:14, padding:"22px 20px", display:"flex", gap:14,
                animation:`fadeUp .6s ${i*.06}s both`,
              }}>
                <span style={{ fontSize:30, flexShrink:0 }}>{g.icon}</span>
                <div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:600, color:t.text, marginBottom:6 }}>{g.title}</h3>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textSub, lineHeight:1.7 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background:dark?`linear-gradient(135deg,${t.bg2},${t.surface})`:`linear-gradient(135deg,#EDE5D0,#F5EDD8)`, border:`1px solid ${t.border}`, borderRadius:18, padding:"34px 28px", textAlign:"center" }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:400, color:t.text, marginBottom:10 }}>Prêt à commander ?</p>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub, marginBottom:24, lineHeight:1.7 }}>Contactez-nous via WhatsApp pour passer votre commande et organiser votre livraison.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="https://wa.me/237678680811" target="_blank" rel="noreferrer" style={{
              padding:"13px 30px", borderRadius:30, border:"none", cursor:"pointer",
              background:"#25D366", color:"#fff", fontFamily:"'Outfit',sans-serif", fontWeight:600,
              fontSize:11, letterSpacing:2, textTransform:"uppercase", textDecoration:"none",
            }}>📱 WhatsApp – 678 680 811</a>
            <button onClick={()=>setCurrent("contact")} style={{
              padding:"13px 30px", borderRadius:30, background:"transparent",
              border:`1px solid ${t.border2}`, color:t.textSub, cursor:"pointer",
              fontFamily:"'Outfit',sans-serif", fontSize:11, letterSpacing:2, textTransform:"uppercase", transition:"all .2s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=t.gold;e.currentTarget.style.color=t.gold;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border2;e.currentTarget.style.color=t.textSub;}}
            >Formulaire de contact</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   CONTACT PAGE
══════════════════════════════════════════════════════ */
function ContactPage({ t }) {
  const [form, setForm] = useState({ nom:"", email:"", sujet:"", msg:"" });
  const [sent, setSent] = useState(false);
  const ok = form.nom && form.email && form.msg;

  return (
    <div className="page-pad" style={{ background:t.bg, minHeight:"100vh" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div style={{ width:44, height:2, background:`linear-gradient(90deg,${t.purple},${t.gold})`, margin:"0 auto 16px" }}/>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:5, textTransform:"uppercase", color:t.purple, marginBottom:10 }}>NAD ACCESSOIRE</p>
          <h1 style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(34px,6vw,58px)", fontWeight:600,
            background:`linear-gradient(135deg,${t.goldL},${t.gold})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>Contactez-nous</h1>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {[
              { icon:"📍", label:"Adresse",   val:"Feu Rouge Deido\nDouala, Cameroun" },
              { icon:"📞", label:"Téléphone", val:"+237 678 680 811" },
              { icon:"📱", label:"WhatsApp",  val:"+237 678 680 811" },
              { icon:"✉️", label:"Email",     val:"contact@nadaccessoire.com" },
              { icon:"🕐", label:"Horaires",  val:"Lun – Sam : 9h – 19h" },
            ].map(({icon,label,val})=>(
              <div key={label} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                <div style={{ width:42, height:42, borderRadius:10, flexShrink:0, background:t.surface, border:`1px solid ${t.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{icon}</div>
                <div>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:t.gold, marginBottom:3 }}>{label}</p>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub, lineHeight:1.6, whiteSpace:"pre-line" }}>{val}</p>
                </div>
              </div>
            ))}
            {/* WhatsApp direct CTA */}
            <a href="https://wa.me/237678680811" target="_blank" rel="noreferrer" style={{
              display:"flex", alignItems:"center", gap:10, padding:"14px 20px",
              borderRadius:12, background:"#25D366", textDecoration:"none",
              fontFamily:"'Outfit',sans-serif", fontSize:12, fontWeight:600,
              color:"#fff", letterSpacing:1, transition:"opacity .2s",
            }}
              onMouseEnter={e=>e.currentTarget.style.opacity=".88"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}
            >
              <span style={{ fontSize:22 }}>💬</span>
              <span>Écrire sur WhatsApp maintenant</span>
            </a>
          </div>

          {/* Form */}
          {sent ? (
            <div style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:18, padding:"56px 36px", textAlign:"center" }}>
              <div style={{ fontSize:52, marginBottom:14 }}>💌</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:400, color:t.gold, marginBottom:8 }}>Message envoyé !</h3>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textMut, marginBottom:24 }}>Nous vous répondrons dans les 24 heures.</p>
              <button onClick={()=>{setSent(false);setForm({nom:"",email:"",sujet:"",msg:""});}} style={{
                padding:"12px 28px", borderRadius:30, border:"none", cursor:"pointer",
                background:`linear-gradient(135deg,${t.purple},${t.purpleL})`,
                color:"#fff", fontFamily:"'Outfit',sans-serif", fontSize:11, letterSpacing:2, textTransform:"uppercase",
              }}>Nouveau message</button>
            </div>
          ) : (
            <div style={{ background:t.cardBg, border:`1px solid ${t.border}`, borderRadius:18, padding:"32px 28px", display:"flex", flexDirection:"column", gap:16 }}>
              <div className="form-row">
                {[{key:"nom",label:"Nom",ph:"Votre nom",type:"text"},{key:"email",label:"Email",ph:"votre@email.com",type:"email"}].map(f=>(
                  <div key={f.key}>
                    <label style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:t.gold, display:"block", marginBottom:7 }}>{f.label}</label>
                    <input type={f.type} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} placeholder={f.ph}
                      style={{ background:t.inputBg, border:`1px solid ${t.border2}`, color:t.text, fontFamily:"'Outfit',sans-serif", fontSize:13, padding:"11px 13px", borderRadius:8, outline:"none", width:"100%", transition:"border-color .2s" }}
                      onFocus={e=>e.target.style.borderColor=t.purple}
                      onBlur={e=>e.target.style.borderColor=t.border2}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:t.gold, display:"block", marginBottom:7 }}>Sujet</label>
                <select value={form.sujet} onChange={e=>setForm({...form,sujet:e.target.value})}
                  style={{ width:"100%", background:t.inputBg, border:`1px solid ${t.border2}`, color:form.sujet?t.text:t.textMut, fontFamily:"'Outfit',sans-serif", fontSize:13, padding:"11px 13px", borderRadius:8, outline:"none" }}>
                  <option value="" disabled>Choisir un sujet...</option>
                  <option>Bijoux – commande ou renseignement</option>
                  <option>Montres – demande d'information</option>
                  <option>Cadres & Art – devis sur mesure</option>
                  <option>Pack Saint-Valentin</option>
                  <option>Pack Noël</option>
                  <option>Pack Anniversaire</option>
                  <option>Pack Corporate</option>
                  <option>Livraison – suivi ou question</option>
                  <option>Autre demande</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:t.gold, display:"block", marginBottom:7 }}>Message</label>
                <textarea value={form.msg} rows={5} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="Décrivez votre demande..."
                  style={{ background:t.inputBg, border:`1px solid ${t.border2}`, color:t.text, fontFamily:"'Outfit',sans-serif", fontSize:13, padding:"11px 13px", borderRadius:8, outline:"none", width:"100%", resize:"vertical", transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor=t.purple}
                  onBlur={e=>e.target.style.borderColor=t.border2}
                />
              </div>
              <button onClick={()=>ok&&setSent(true)} style={{
                padding:14, borderRadius:12, border:"none", cursor:ok?"pointer":"not-allowed",
                background:ok?`linear-gradient(135deg,${t.goldD},${t.gold})`:t.border,
                color:ok?t.bg:t.textMut, fontFamily:"'Outfit',sans-serif", fontWeight:600,
                fontSize:11, letterSpacing:2, textTransform:"uppercase", transition:"opacity .2s",
              }}>Envoyer le message ✦</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════ */
function Footer({ setCurrent, t }) {
  return (
    <footer style={{ background:t.bg2, borderTop:`1px solid ${t.border}`, padding:"50px 5% 26px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div className="footer-grid" style={{ marginBottom:40 }}>
          <div>
            <div style={{ marginBottom:14 }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, background:t.shimmer, backgroundSize:"300% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmer 5s linear infinite", letterSpacing:3 }}>NAD</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:7, fontWeight:300, letterSpacing:5, color:t.textMut, textTransform:"uppercase", display:"block", marginTop:2 }}>ACCESSOIRE</span>
            </div>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textMut, lineHeight:1.7, maxWidth:220 }}>
              Votre destination premium pour bijoux, montres, cadres, accessoires et art de vivre depuis 2012.
            </p>
            <div style={{ marginTop:20, display:"flex", flexDirection:"column", gap:8 }}>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textSub }}>📍 Feu Rouge Deido, Douala</p>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textSub }}>📞 +237 678 680 811</p>
            </div>
          </div>
          {[
            { title:"Collections", links:["bijoux","montres","cadres","accessoires"] },
            { title:"Univers",     links:["parfums","art","packs","livraison"] },
          ].map(col=>(
            <div key={col.title}>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:t.gold, marginBottom:14 }}>{col.title}</p>
              {col.links.map(id=>{
                const p=PAGES.find(x=>x.id===id);
                return (
                  <p key={id} onClick={()=>setCurrent(id)} style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textMut, marginBottom:9, cursor:"pointer", transition:"color .2s" }}
                    onMouseEnter={e=>e.target.style.color=t.gold}
                    onMouseLeave={e=>e.target.style.color=t.textMut}
                  >{p?.label}</p>
                );
              })}
            </div>
          ))}
          <div>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:t.gold, marginBottom:14 }}>Horaires</p>
            {["Lun – Sam","9h – 19h","Dimanche : fermé"].map(v=>(
              <p key={v} style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textMut, marginBottom:7 }}>{v}</p>
            ))}
            <a href="https://wa.me/237678680811" target="_blank" rel="noreferrer" style={{
              display:"inline-flex", alignItems:"center", gap:8, marginTop:14,
              padding:"10px 18px", borderRadius:30, background:"#25D366",
              textDecoration:"none", fontFamily:"'Outfit',sans-serif", fontSize:11,
              fontWeight:600, color:"#fff", letterSpacing:1,
            }}>💬 WhatsApp</a>
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${t.border}`, paddingTop:20, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:t.textMut }}>© 2026 Nad Accessoire — Tous droits réservés</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontStyle:"italic", color:t.textMut }}>L'élégance est un art de vivre</p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════ */
let dark = true; // module-level for LivraisonPage access

export default function App() {
  const [current, setCurrent] = useState("home");
  const [isDark, setIsDark]   = useState(true);
  dark = isDark;
  const t = isDark ? DARK : LIGHT;

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color      = t.text;
    const sb = document.querySelector("style[data-sb]") || document.createElement("style");
    sb.setAttribute("data-sb","1");
    sb.textContent = `::-webkit-scrollbar-thumb{background:${t.scrollThumb};}`;
    if (!document.querySelector("style[data-sb]")) document.head.appendChild(sb);
  }, [isDark, t]);

  const navigate = id => { setCurrent(id); window.scrollTo({ top:0, behavior:"smooth" }); };

  const renderPage = () => {
    if (current==="home")      return <HomePage setCurrent={navigate} dark={isDark} t={t}/>;
    if (current==="contact")   return <ContactPage t={t}/>;
    if (current==="packs")     return <PacksPage setCurrent={navigate} t={t}/>;
    if (current==="livraison") return <LivraisonPage setCurrent={navigate} t={t}/>;
    if (PRODUCTS[current])     return <CategoryPage catId={current} setCurrent={navigate} t={t}/>;
    return <HomePage setCurrent={navigate} dark={isDark} t={t}/>;
  };

  return (
    <div style={{ minHeight:"100vh", background:t.bg, color:t.text, transition:"background .35s,color .35s" }}>
      <Navbar current={current} setCurrent={navigate} dark={isDark} setDark={setIsDark} t={t}/>
      <main>{renderPage()}</main>
      <Footer setCurrent={navigate} t={t}/>
      {/* WhatsApp floating button */}
      <a href="https://wa.me/237678680811" target="_blank" rel="noreferrer" className="wa-btn" title="Commander sur WhatsApp">💬</a>
    </div>
  );
}