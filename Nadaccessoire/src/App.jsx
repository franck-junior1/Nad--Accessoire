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
};
const LIGHT = {
  bg:       "#FDFBF7",
  bg2:      "#F5F0E8",
  bg3:      "#EDE5D4",
  surface:  "#FFFFFF",
  border:   "#E8DCC8",
  border2:  "#D4C4A0",
  text:     "#1A1408",
  textSub:  "#5C4A2A",
  textMut:  "#9A8060",
  gold:     "#B8860B",
  goldL:    "#D4A820",
  goldD:    "#7A5C08",
  purple:   "#5B2EE0",
  purpleL:  "#7A4FCC",
  navBg:    "rgba(253,251,247,0.97)",
  cardBg:   "#FFFFFF",
  inputBg:  "#F5F0E8",
  shimmer:  "linear-gradient(90deg,#5B2EE0,#8B4FCC,#B8860B,#8B4FCC,#5B2EE0)",
  scrollThumb: "#D4C4A0",
};

/* ── IMAGES (Unsplash free) ── */
const IMGS = {
  bijoux: [
    "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    "https://images.unsplash.com/photo-1573408301185-9519f94816f5?w=600&q=80",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80",
    "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80",
  ],
  montres: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80",
    "https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=600&q=80",
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80",
    "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&q=80",
    "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80",
  ],
  cadres: [
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    "https://images.unsplash.com/photo-1582673937754-8d0cfed5dcc9?w=600&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
    "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&q=80",
  ],
  accessoires: [
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    "https://images.unsplash.com/photo-1611010344444-5f9e4d86a6c4?w=600&q=80",
    "https://images.unsplash.com/photo-1583394293214-0b3b7e7c4b0c?w=600&q=80",
    "https://images.unsplash.com/photo-1521369909029-2afed882baaa?w=600&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
  ],
  parfums: [
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
    "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
    "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80",
    "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80",
    "https://images.unsplash.com/photo-1595535873420-a599195b3f4a?w=600&q=80",
    "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
  ],
  art: [
    "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80",
    "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80",
    "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&q=80",
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=600&q=80",
  ],
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
    { id:"mo1", name:"Chronographe Prestige",   price:"1 850 000 XAF", old:null,              badge:"Icône",       badgeColor:"#7A8FD4", desc:"Mouvement automatique suisse ETA 7750, boîtier acier 316L 42mm, verre saphir, étanche 100m.", details:["Mvt. automatique suisse","Boîtier acier 316L","Verre saphir","Étanche 100m"] },
    { id:"mo2", name:"Dame Or Rose",             price:"2 400 000 XAF", old:null,              badge:"Luxe",        badgeColor:"#D4834A", desc:"Or rose 18K massif, cadran nacre blanche, bracelet alligator bordeaux, diamètre 28mm.", details:["Or rose 18K","Cadran nacre","Bracelet alligator","28mm"] },
    { id:"mo3", name:"Skeleton Titanium",        price:"3 200 000 XAF", old:null,              badge:"Exclusif",    badgeColor:"#8AD48A", desc:"Titane grade 5 ultra-léger, mouvement squelette visible, réserve de marche 72h. Chef-d'œuvre mécanique.", details:["Titane grade 5","Squelette fait main","Réserve 72h","Édition limitée"] },
    { id:"mo4", name:"Sport Céramique Noire",   price:"980 000 XAF",  old:"1 100 000 XAF",   badge:"Promo",       badgeColor:"#C9C94A", desc:"Céramique haute résistance, lunette en saphir, fonction GMT double fuseau, mouvement automatique.", details:["Céramique haute résistance","Lunette saphir","GMT double fuseau","Automatique"] },
    { id:"mo5", name:"Vintage Millésime",        price:"760 000 XAF",  old:null,              badge:"Collection",  badgeColor:"#C4A862", desc:"Montre restaurée d'époque 1970, bracelet milanais acier, garantie 5 ans. Pièce de collection unique.", details:["Époque 1970 restaurée","Bracelet milanais","Garantie 5 ans","Pièce unique"] },
    { id:"mo6", name:"Tourbillon Grand Feu",    price:"8 500 000 XAF", old:null,              badge:"Haute Horl.", badgeColor:"#E8A050", desc:"Tourbillon volant, cadran émail grand feu peint à la main, pièce numérotée 1/50. Excellence absolue.", details:["Tourbillon volant","Émail grand feu","Numéroté 1/50","Livraison sécurisée"] },
  ],
  cadres: [
    { id:"ca1", name:"Cadre Empire Doré",        price:"185 000 XAF", old:null,          badge:"Classique",  badgeColor:"#C9A84C", desc:"Bois de tilleul sculpté à la main par des artisans, recouvert de feuilles d'or 22K. Format 40×50 cm.", details:["Bois de tilleul","Feuille d'or 22K","40×50 cm","Fait main"] },
    { id:"ca2", name:"Miroir Louis XVI",         price:"420 000 XAF", old:null,          badge:"Antique",    badgeColor:"#D4B862", desc:"Reproduction fidèle du style Louis XVI, dorure à l'or fin, verre biseauté, dimensions 80×120 cm.", details:["Style Louis XVI","Dorure or fin","Verre biseauté","80×120 cm"] },
    { id:"ca3", name:"Cadre Art Déco Noir",      price:"95 000 XAF",  old:"115 000 XAF", badge:"Promo",      badgeColor:"#4AC9A0", desc:"Laque noire mat de haute qualité, filets dorés géométriques Art Déco. Disponible en formats sur mesure.", details:["Laque noire mat","Filets or géométriques","Formats sur mesure","Style Art Déco"] },
    { id:"ca4", name:"Triptyque Bambou Zen",     price:"145 000 XAF", old:null,          badge:"Naturel",    badgeColor:"#7AC97A", desc:"Bambou naturel traité contre l'humidité, triptyque modulable pour photos 3×(20×30). Esprit zen.", details:["Bambou naturel traité","Triptyque modulable","3×(20×30) cm","Esprit zen"] },
    { id:"ca5", name:"Cadre Acier Poli",         price:"68 000 XAF",  old:null,          badge:"Moderne",    badgeColor:"#8AAAD4", desc:"Acier inoxydable brossé, design ultra-minimaliste, disponible en formats A3 et A4. Pour intérieur moderne.", details:["Acier inoxydable","Design minimaliste","Formats A3/A4","Pour intérieur moderne"] },
    { id:"ca6", name:"Cadre Laiton Gravé",       price:"225 000 XAF", old:null,          badge:"Rare",       badgeColor:"#D4A84A", desc:"Laiton massif patiné à l'ancienne, gravure florale réalisée à la main par un artisan. Pièce unique.", details:["Laiton massif patiné","Gravure florale main","Pièce unique","Certificat artisan"] },
  ],
  accessoires: [
    { id:"ac1", name:"Sac Cuir Nappa",           price:"485 000 XAF", old:null,          badge:"Signature",  badgeColor:"#C4844A", desc:"Cuir nappa pleine fleur tanné végétal, doublure soie naturelle, quincaillerie or brossé 18K.", details:["Cuir nappa pleine fleur","Doublure soie","Quincaillerie or 18K","Garantie artisan"] },
    { id:"ac2", name:"Ceinture Crocodile",       price:"320 000 XAF", old:null,          badge:"Exclusif",   badgeColor:"#4AC98A", desc:"Cuir crocodile du Nil certifié CITES, boucle en argent massif 925, réalisée sur mesure à votre taille.", details:["Crocodile certifié CITES","Boucle argent 925","Sur mesure","Livraison sous 10j"] },
    { id:"ac3", name:"Foulard Soie Pure",        price:"95 000 XAF",  old:"110 000 XAF", badge:"Promo",      badgeColor:"#C94AA8", desc:"Soie 100% lyonnaise haute couture, impression digitale haute résolution, ourlet roulotté main. 90×90 cm.", details:["Soie 100% lyonnaise","Impression digitale HD","Ourlet main","90×90 cm"] },
    { id:"ac4", name:"Chapeau Panama Fino",      price:"175 000 XAF", old:null,          badge:"Artisan",    badgeColor:"#C9B04A", desc:"Tressage Fino equatoriano, 20 tresses au cm, ruban soie changeant, boîte transport incluse.", details:["Tressage Fino","20 tresses/cm","Ruban soie","Boîte incluse"] },
    { id:"ac5", name:"Lunettes Titane",          price:"285 000 XAF", old:null,          badge:"Design",     badgeColor:"#4A8AC9", desc:"Monture titane aéronautique ultra-légère (8g), verres polarisés catégorie 3, étui cuir artisanal.", details:["Titane aéronautique","Verres polarisés cat.3","Poids 8g seulement","Étui cuir inclus"] },
    { id:"ac6", name:"Portefeuille Vachette",    price:"78 000 XAF",  old:null,          badge:"Essentiel",  badgeColor:"#D4A04A", desc:"Vachette pleine fleur tannée végétal, 12 emplacements carte, poche monnaie, protection RFID.", details:["Vachette tannée végétal","12 emplacements","Protection RFID","Format compact"] },
  ],
  parfums: [
    { id:"pa1", name:"Oud Impérial",             price:"185 000 XAF", old:null,          badge:"Oriental",   badgeColor:"#C94A6A", desc:"Oud de Laos vieilli 10 ans, rose de Damas absolue, ambre gris naturel. Extrait de parfum 50ml.", details:["Oud de Laos 10 ans","Rose de Damas absolue","Ambre gris naturel","50ml extrait"] },
    { id:"pa2", name:"Iris Blanc Absolu",        price:"145 000 XAF", old:null,          badge:"Floral",     badgeColor:"#9A8AD4", desc:"Iris florentin absolue, musc blanc ambrée, cèdre de l'Atlas, sillage long. Eau de parfum 75ml.", details:["Iris florentin absolue","Musc blanc ambré","Cèdre Atlas","75ml EDP"] },
    { id:"pa3", name:"Citrus Marine",            price:"98 000 XAF",  old:"115 000 XAF", badge:"Promo",      badgeColor:"#4AC4C9", desc:"Bergamote de Calabre, vétiver de Haïti, écume marine. Frais et élégant. Eau de toilette 100ml.", details:["Bergamote Calabre","Vétiver Haïti","Notes marines","100ml EDT"] },
    { id:"pa4", name:"Santal Mysore",            price:"125 000 XAF", old:null,          badge:"Boisé",      badgeColor:"#C47A4A", desc:"Santal de Mysore certifié, cacao du Ghana, vanille Bourbon, bois précieux. EDP 50ml.", details:["Santal Mysore certifié","Cacao Ghana","Vanille Bourbon","50ml EDP"] },
    { id:"pa5", name:"Nuit d'Arabie",            price:"220 000 XAF", old:null,          badge:"Rare",       badgeColor:"#8A4AC9", desc:"Oud attar naturel distillé, rose Taif Arabie, musc blanc pur. Extrait pur 30ml. Collection de niche.", details:["Oud attar naturel","Rose Taif Arabie","Musc blanc pur","30ml extrait pur"] },
    { id:"pa6", name:"Coffret Découverte",       price:"75 000 XAF",  old:null,          badge:"Cadeau",     badgeColor:"#D4504A", desc:"Coffret collector avec 5 miniatures 5ml de nos meilleures fragrances. Idéal en cadeau.", details:["5 miniatures 5ml","Sélection bestsellers","Coffret collector","Idéal cadeau"] },
  ],
  art: [
    { id:"ar1", name:"Sculpture Bronze",         price:"1 200 000 XAF", old:null,        badge:"Unique",     badgeColor:"#C47A4A", desc:"Bronze à la cire perdue, artiste camerounais renommé, signée + certificat authenticité. H.45cm.", details:["Bronze cire perdue","Artiste certifié","Signée + certificat","Hauteur 45 cm"] },
    { id:"ar2", name:"Tableau Abstrait",         price:"380 000 XAF",  old:null,         badge:"Original",   badgeColor:"#7A4AC9", desc:"Huile sur toile 80×100cm, technique couteau et pinceau, pièce unique signée au dos.", details:["Huile sur toile","80×100 cm","Technique couteau","Pièce unique signée"] },
    { id:"ar3", name:"Vase Porcelaine Or",       price:"145 000 XAF",  old:null,         badge:"Artisan",    badgeColor:"#C9C94A", desc:"Porcelaine de Limoges, décoration or 24K appliquée à la main, hauteur 35cm. Pièce numérotée.", details:["Porcelaine Limoges","Or 24K à la main","Hauteur 35 cm","Pièce numérotée"] },
    { id:"ar4", name:"Lampe Laiton Design",      price:"265 000 XAF",  old:null,         badge:"Exclusif",   badgeColor:"#D4A84A", desc:"Laiton martelé artisanalement, abat-jour soie naturelle, 3 intensités lumineuses, câble tressé.", details:["Laiton martelé main","Abat-jour soie","3 intensités","Câble tressé"] },
    { id:"ar5", name:"Tapis Berbère Laine",      price:"195 000 XAF",  old:null,         badge:"Artisanat",  badgeColor:"#E8736A", desc:"Laine mérinos naturelle non traitée, tissage berbère traditionnel 150×200 cm. Motifs géométriques.", details:["Laine mérinos naturelle","Tissage berbère","150×200 cm","Motifs géométriques"] },
    { id:"ar6", name:"Photographie Fine Art",   price:"95 000 XAF",   old:null,         badge:"Photo Art",  badgeColor:"#8AAAD4", desc:"Tirage fine art 50×70cm sur papier baryté 310g, encres archivales 100 ans, édition numérotée 10.", details:["Papier baryté 310g","Encres archivales","50×70 cm","Édition 10 ex."] },
  ],
};

const PAGES = [
  { id:"home",        label:"Accueil",     emoji:"✦" },
  { id:"bijoux",      label:"Bijoux",      emoji:"💍" },
  { id:"montres",     label:"Montres",     emoji:"⌚" },
  { id:"cadres",      label:"Cadres",      emoji:"🖼️" },
  { id:"accessoires", label:"Accessoires", emoji:"👜" },
  { id:"parfums",     label:"Parfums",     emoji:"🌹" },
  { id:"art",         label:"Art & Déco",  emoji:"🎨" },
  { id:"contact",     label:"Contact",     emoji:"✉️" },
];

const HERO_CATS = [
  { id:"bijoux",      label:"Bijoux",      emoji:"💍", desc:"Or, argent & pierres précieuses",   img:"https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80" },
  { id:"montres",     label:"Montres",     emoji:"⌚", desc:"Haute horlogerie & prestige",       img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
  { id:"cadres",      label:"Cadres",      emoji:"🖼️", desc:"Décoration murale d'exception",   img:"https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80" },
  { id:"accessoires", label:"Accessoires", emoji:"👜", desc:"Mode & élégance au quotidien",     img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80" },
  { id:"parfums",     label:"Parfums",     emoji:"🌹", desc:"Fragrances rares & exclusives",    img:"https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80" },
  { id:"art",         label:"Art & Déco",  emoji:"🎨", desc:"Pièces uniques & sculptures",      img:"https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80" },
];

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
    <div
      onClick={onClose}
      style={{
        position:"fixed", inset:0, zIndex:9999,
        background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)",
        display:"flex", alignItems:"center", justifyContent:"center",
        padding:"20px", animation:"fadeIn .25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: t.surface, border:`1px solid ${t.border}`,
          borderRadius:20, overflow:"hidden",
          width:"100%", maxWidth:780,
          display:"grid", gridTemplateColumns:"1fr 1fr",
          animation:"fadeUp .35s cubic-bezier(.16,1,.3,1)",
          maxHeight:"90vh",
        }}
      >
        {/* Image */}
        <div style={{ position:"relative", overflow:"hidden" }}>
          <img src={img} alt={item.name}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(to right,transparent 60%,rgba(0,0,0,0.3))",
          }}/>
          <div style={{
            position:"absolute", top:16, left:16,
            background: `${item.badgeColor}22`,
            border:`1px solid ${item.badgeColor}44`,
            color: item.badgeColor,
            padding:"4px 12px", borderRadius:20,
            fontFamily:"'Outfit',sans-serif", fontSize:10,
            fontWeight:600, letterSpacing:2, textTransform:"uppercase",
          }}>{item.badge}</div>
        </div>

        {/* Content */}
        <div style={{ padding:"32px 28px", overflowY:"auto", display:"flex", flexDirection:"column", gap:16 }}>
          <button onClick={onClose} style={{
            alignSelf:"flex-end", background:"transparent", border:"none",
            color:t.textMut, cursor:"pointer", fontSize:20, lineHeight:1,
          }}>✕</button>

          <div>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:3,
              textTransform:"uppercase", color:t.purple, marginBottom:6 }}>Nad Accessoire</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:600,
              color:t.text, lineHeight:1.2 }}>{item.name}</h2>
          </div>

          <div style={{ display:"flex", alignItems:"baseline", gap:10 }}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24,
              fontWeight:700, color:t.gold }}>{item.price}</span>
            {item.old && <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:12,
              color:t.textMut, textDecoration:"line-through" }}>{item.old}</span>}
          </div>

          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub,
            lineHeight:1.7 }}>{item.desc}</p>

          <div style={{ borderTop:`1px solid ${t.border}`, paddingTop:16 }}>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2,
              textTransform:"uppercase", color:t.gold, marginBottom:12 }}>Caractéristiques</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {item.details.map((d, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ color:t.gold, fontSize:12 }}>✦</span>
                  <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub }}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:"flex", gap:10, marginTop:"auto", paddingTop:8 }}>
            <button
              onClick={onClose}
              style={{
                flex:1, padding:"12px 0", borderRadius:12, border:"none", cursor:"pointer",
                background:`linear-gradient(135deg,${t.goldD},${t.gold})`,
                color: t.bg, fontFamily:"'Outfit',sans-serif", fontWeight:600,
                fontSize:11, letterSpacing:2, textTransform:"uppercase",
              }}
            >Demander →</button>
            <button
              onClick={onClose}
              style={{
                padding:"12px 16px", borderRadius:12, cursor:"pointer",
                background:"transparent", border:`1px solid ${t.border2}`,
                color:t.textSub, fontFamily:"'Outfit',sans-serif", fontSize:12,
              }}
            >✕</button>
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
  const [imgErr, setImgErr] = useState(false);

  return (
    <>
      {modal && <ProductModal item={item} img={imgErr ? null : img} t={t} onClose={() => setModal(false)}/>}
      <div
        onClick={() => setModal(true)}
        style={{
          background: t.cardBg,
          border:`1px solid ${t.border}`,
          borderRadius:16, overflow:"hidden",
          cursor:"pointer",
          transition:"transform .3s, box-shadow .3s",
          animation:`fadeUp .65s ${idx*0.07}s cubic-bezier(.16,1,.3,1) both`,
          display:"flex", flexDirection:"column",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = `0 20px 50px ${t.purple}22`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div style={{ position:"relative", overflow:"hidden", height:220, background:t.bg2 }}>
          {!imgErr ? (
            <img
              src={img}
              alt={item.name}
              onError={() => setImgErr(true)}
              style={{
                width:"100%", height:"100%", objectFit:"cover",
                display:"block", transition:"transform .4s ease",
              }}
            />
          ) : (
            <div style={{ width:"100%", height:"100%", display:"flex",
              alignItems:"center", justifyContent:"center", fontSize:56 }}>
              {["💍","⌚","🖼️","👜","🌹","🎨"][idx % 6]}
            </div>
          )}
          {/* Gradient overlay */}
          <div style={{ position:"absolute", inset:0,
            background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%)" }}/>
          {/* Badge */}
          <div style={{ position:"absolute", top:12, left:12 }}>
            <span style={{
              background:`${item.badgeColor}22`, border:`1px solid ${item.badgeColor}55`,
              color:item.badgeColor, padding:"3px 10px", borderRadius:20,
              fontFamily:"'Outfit',sans-serif", fontSize:10, fontWeight:600,
              letterSpacing:1.5, textTransform:"uppercase",
            }}>{item.badge}</span>
          </div>
          {/* Wishlist */}
          <div
            onClick={e => { e.stopPropagation(); setWish(!wish); }}
            style={{ position:"absolute", top:10, right:12, fontSize:18,
              cursor:"pointer", transition:"transform .2s",
              transform: wish ? "scale(1.2)" : "scale(1)" }}
          >{wish ? "❤️" : "🤍"}</div>
        </div>

        {/* Content */}
        <div style={{ padding:"18px 18px 22px", flex:1, display:"flex", flexDirection:"column", gap:8 }}>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, fontWeight:600,
            color:t.text, lineHeight:1.2 }}>{item.name}</h3>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textMut,
            lineHeight:1.6, flex:1 }}>{item.desc.substring(0,80)}…</p>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:4 }}>
            <div>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19,
                fontWeight:700, color:t.gold }}>{item.price}</span>
              {item.old && <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:11,
                color:t.textMut, textDecoration:"line-through", marginLeft:6 }}>{item.old}</span>}
            </div>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:11,
              color:t.purple, letterSpacing:1 }}>Voir →</span>
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

  const go = id => { setCurrent(id); setMob(false); };

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        background: scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
        transition:"all .35s",
        padding:"0 5%", display:"flex", alignItems:"center",
        justifyContent:"space-between", height:68,
      }}>
        {/* Logo */}
        <div onClick={() => go("home")} style={{ cursor:"pointer" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
            <span style={{
              fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700,
              background: t.shimmer, backgroundSize:"300% auto",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              animation:"shimmer 5s linear infinite", letterSpacing:3,
            }}>NAD</span>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:8, fontWeight:300,
              letterSpacing:5, color:t.textMut, textTransform:"uppercase" }}>ACCESSOIRE</span>
          </div>
        </div>

        {/* Desktop nav */}
        <div style={{ display:"flex", gap:24, alignItems:"center" }}>
          {PAGES.map(p => (
            <span key={p.id} onClick={() => go(p.id)} style={{
              fontFamily:"'Outfit',sans-serif", fontSize:11, letterSpacing:1.5,
              textTransform:"uppercase", fontWeight:500, cursor:"pointer",
              color: current===p.id ? t.gold : t.textMut,
              transition:"color .2s",
              borderBottom: current===p.id ? `1px solid ${t.gold}` : "1px solid transparent",
              paddingBottom:2,
            }}
              onMouseEnter={e => e.target.style.color = t.gold}
              onMouseLeave={e => e.target.style.color = current===p.id ? t.gold : t.textMut}
            >{p.label}</span>
          ))}

          {/* Dark/Light toggle */}
          <button
            onClick={() => setDark(!dark)}
            title={dark ? "Mode clair" : "Mode sombre"}
            style={{
              background: dark ? "#1E1830" : "#F0E8D0",
              border: `1px solid ${t.border2}`,
              borderRadius:30, cursor:"pointer",
              width:52, height:28, padding:"2px 3px",
              display:"flex", alignItems:"center",
              justifyContent: dark ? "flex-end" : "flex-start",
              transition:"all .3s",
            }}
          >
            <div style={{
              width:22, height:22, borderRadius:"50%",
              background: dark
                ? "linear-gradient(135deg,#B47FFF,#6E3AFF)"
                : "linear-gradient(135deg,#E8C97A,#C9A84C)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:12, transition:"all .3s",
            }}>{dark ? "🌙" : "☀️"}</div>
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMob(!mob)}
          style={{ display:"none", background:"transparent", border:"none",
            cursor:"pointer", padding:8, color:t.text, fontSize:20 }}
          id="hamburger"
        >☰</button>
      </nav>

      {/* Mobile menu overlay */}
      {mob && (
        <div style={{
          position:"fixed", inset:0, zIndex:999,
          background: dark ? "rgba(7,6,10,0.98)" : "rgba(253,251,247,0.98)",
          backdropFilter:"blur(20px)",
          display:"flex", flexDirection:"column", alignItems:"center",
          justifyContent:"center", gap:24, animation:"fadeIn .25s ease",
        }}>
          <button onClick={() => setMob(false)} style={{ position:"absolute", top:20, right:24,
            background:"transparent", border:"none", cursor:"pointer",
            color:t.textMut, fontSize:24 }}>✕</button>
          {PAGES.map(p => (
            <span key={p.id} onClick={() => go(p.id)} style={{
              fontFamily:"'Cormorant Garamond',serif", fontSize:30, letterSpacing:2,
              color: current===p.id ? t.gold : t.text, cursor:"pointer",
            }}>{p.emoji} {p.label}</span>
          ))}
        </div>
      )}
    </>
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
        textAlign:"center", padding:"110px 5% 70px",
        position:"relative", overflow:"hidden",
        background: dark
          ? "radial-gradient(ellipse at 30% 50%,#1A0F2E 0%,#07060A 60%)"
          : "radial-gradient(ellipse at 30% 50%,#F5EDD8 0%,#FDFBF7 60%)",
      }}>
        {/* Orbs */}
        {[
          { s:700, bg:dark?"rgba(110,58,255,.12)":"rgba(90,46,200,.07)", top:-200, right:-200, dur:"10s" },
          { s:500, bg:dark?"rgba(201,168,76,.09)":"rgba(184,134,11,.08)", bottom:-100, left:-100, dur:"12s" },
          { s:350, bg:dark?"rgba(201,74,106,.07)":"rgba(180,60,90,.05)", top:"40%", left:"15%", dur:"9s" },
        ].map((o, i) => (
          <div key={i} style={{
            position:"absolute", width:o.s, height:o.s, borderRadius:"50%",
            background:`radial-gradient(circle,${o.bg} 0%,transparent 65%)`,
            top:o.top, right:o.right, bottom:o.bottom, left:o.left,
            pointerEvents:"none", animation:`floatY ${o.dur} ${i}s ease-in-out infinite`,
          }}/>
        ))}

        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, letterSpacing:6,
          textTransform:"uppercase", color:t.purple, marginBottom:20,
          animation:"fadeUp .65s both" }}>✦ Maison de Luxe & Raffinement ✦</p>

        <h1 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(80px,14vw,150px)", fontWeight:700,
          lineHeight:.9, letterSpacing:-3, marginBottom:4,
          background:t.shimmer, backgroundSize:"300% auto",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          animation:"shimmer 5s linear infinite, fadeUp .65s .1s both",
        }}>NAD</h1>

        <p style={{
          fontFamily:"'Outfit',sans-serif", fontSize:"clamp(11px,2vw,14px)",
          fontWeight:300, letterSpacing:"clamp(10px,3vw,22px)",
          textTransform:"uppercase", color:t.textMut, marginBottom:6,
          animation:"fadeUp .65s .15s both",
        }}>ACCESSOIRE</p>

        <p style={{
          fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
          fontSize:"clamp(18px,3vw,26px)", color:t.textSub,
          marginBottom:52, maxWidth:540, animation:"fadeUp .65s .25s both",
        }}>L'art du détail, l'excellence du goût</p>

        <div style={{ display:"flex", gap:14, flexWrap:"wrap",
          justifyContent:"center", animation:"fadeUp .65s .35s both" }}>
          <button onClick={() => setCurrent("bijoux")} style={{
            padding:"15px 38px", borderRadius:40, border:"none", cursor:"pointer",
            background:`linear-gradient(135deg,${t.purple},${t.purpleL})`,
            color:"#fff", fontFamily:"'Outfit',sans-serif", fontWeight:500,
            fontSize:11, letterSpacing:2, textTransform:"uppercase",
            transition:"opacity .2s,transform .2s",
          }}
            onMouseEnter={e=>{e.target.style.opacity=".85";e.target.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.target.style.opacity="1";e.target.style.transform="translateY(0)";}}
          >Découvrir les collections</button>
          <button onClick={() => setCurrent("contact")} style={{
            padding:"15px 38px", borderRadius:40, cursor:"pointer",
            background:"transparent", border:`1px solid ${t.border2}`,
            color:t.textSub, fontFamily:"'Outfit',sans-serif", fontWeight:500,
            fontSize:11, letterSpacing:2, textTransform:"uppercase",
            transition:"border-color .2s,color .2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=t.gold;e.currentTarget.style.color=t.gold;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border2;e.currentTarget.style.color=t.textSub;}}
          >Nous contacter</button>
        </div>

        <div style={{ position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:9, letterSpacing:3,
            textTransform:"uppercase", color:t.textMut }}>Parcourir</span>
          <div style={{ width:1, height:36, background:`linear-gradient(${t.purple},transparent)` }}/>
        </div>
      </div>

      {/* ── STATS ── */}
      <div style={{ background:t.bg2, borderTop:`1px solid ${t.border}`, borderBottom:`1px solid ${t.border}`, padding:"28px 5%" }}>
        <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", maxWidth:900, margin:"0 auto" }}>
          {[["6","Catégories"],["200+","Articles"],["12 ans","D'expertise"],["98%","Satisfaction"]].map(([n,l]) => (
            <div key={l} style={{ flex:"1 1 140px", textAlign:"center",
              padding:"16px 20px", borderRight:`1px solid ${t.border}` }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36,
                fontWeight:700, color:t.gold }}>{n}</div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2,
                textTransform:"uppercase", color:t.textMut, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORY CARDS ── */}
      <div style={{ padding:"90px 5%", background:t.bg }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <div style={{ width:50, height:2, background:`linear-gradient(90deg,${t.purple},${t.gold})`, margin:"0 auto 14px" }}/>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:5,
              textTransform:"uppercase", color:t.purple, marginBottom:12 }}>NOS UNIVERS</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(30px,5vw,50px)", fontWeight:400, color:t.text }}>
              Explorez nos collections
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:20 }}>
            {HERO_CATS.map((cat, i) => (
              <div key={cat.id} onClick={() => setCurrent(cat.id)} style={{
                borderRadius:16, overflow:"hidden", position:"relative",
                height:240, cursor:"pointer",
                border:`1px solid ${t.border}`,
                transition:"transform .3s, box-shadow .3s",
                animation:`fadeUp .65s ${i*.08}s cubic-bezier(.16,1,.3,1) both`,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform="translateY(-5px)";
                  e.currentTarget.style.boxShadow=`0 16px 40px rgba(0,0,0,0.3)`;
                  e.currentTarget.querySelector("img").style.transform="scale(1.07)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform="translateY(0)";
                  e.currentTarget.style.boxShadow="none";
                  e.currentTarget.querySelector("img").style.transform="scale(1)";
                }}
              >
                <img src={cat.img} alt={cat.label}
                  style={{ width:"100%", height:"100%", objectFit:"cover",
                    display:"block", transition:"transform .5s ease" }}/>
                <div style={{ position:"absolute", inset:0,
                  background:"linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.1) 60%)" }}/>
                <div style={{ position:"absolute", bottom:20, left:20 }}>
                  <span style={{ fontSize:24, display:"block", marginBottom:6 }}>{cat.emoji}</span>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22,
                    fontWeight:600, color:"#FFF", marginBottom:4 }}>{cat.label}</h3>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12,
                    color:"rgba(255,255,255,0.7)" }}>{cat.desc}</p>
                </div>
                <div style={{ position:"absolute", top:16, right:16,
                  background:"rgba(255,255,255,0.15)", backdropFilter:"blur(4px)",
                  borderRadius:20, padding:"4px 12px",
                  fontFamily:"'Outfit',sans-serif", fontSize:10, color:"#fff",
                  letterSpacing:1.5, textTransform:"uppercase" }}>Voir →</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <div style={{ padding:"80px 5%", background:t.bg2, borderTop:`1px solid ${t.border}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:50 }}>
            <div style={{ width:50, height:2, background:`linear-gradient(90deg,${t.purple},${t.gold})`, margin:"0 auto 14px" }}/>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:5,
              textTransform:"uppercase", color:t.gold, marginBottom:12 }}>SÉLECTION</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(30px,5vw,48px)", fontWeight:400, color:t.text }}>
              Coups de cœur
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:22 }}>
            {[
              { item:PRODUCTS.bijoux[0],   img:IMGS.bijoux[0] },
              { item:PRODUCTS.montres[0],  img:IMGS.montres[0] },
              { item:PRODUCTS.parfums[0],  img:IMGS.parfums[0] },
              { item:PRODUCTS.art[0],      img:IMGS.art[0] },
            ].map(({item,img},i) => (
              <ProductCard key={item.id} item={item} img={img} idx={i} t={t}/>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div style={{ padding:"80px 5%", background:t.bg, borderTop:`1px solid ${t.border}` }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:50 }}>
            <div style={{ width:50, height:2, background:`linear-gradient(90deg,${t.purple},${t.gold})`, margin:"0 auto 14px" }}/>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(28px,4vw,44px)", fontWeight:400, color:t.text }}>
              Ils nous font confiance
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:20 }}>
            {[
              { name:"Marie-Claire D.", city:"Douala", text:"Bijoux absolument magnifiques, qualité irréprochable. Je recommande à 100% !", col:"#C9A84C", init:"M" },
              { name:"Jean-Baptiste K.", city:"Yaoundé", text:"Le cadre Empire doré a transformé mon salon. Service client exceptionnel.", col:"#8AAAD4", init:"J" },
              { name:"Aminata S.", city:"Abidjan", text:"Parfum identique à la description. Livraison rapide, emballage somptueux.", col:"#C94A6A", init:"A" },
            ].map(t2 => (
              <div key={t2.name} style={{ background:t.cardBg, border:`1px solid ${t.border}`,
                borderRadius:16, padding:"28px 24px" }}>
                <div style={{ color:"#C9A84C", fontSize:14, marginBottom:14, letterSpacing:4 }}>★★★★★</div>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
                  fontSize:17, color:t.textSub, lineHeight:1.7, marginBottom:20 }}>«{t2.text}»</p>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%",
                    background:`${t2.col}22`, border:`1px solid ${t2.col}44`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:t2.col, fontWeight:700 }}>{t2.init}</div>
                  <div>
                    <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:500, color:t.text }}>{t2.name}</p>
                    <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:t.textMut }}>{t2.city}</p>
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
  const items  = PRODUCTS[catId] || [];
  const imgs   = IMGS[catId] || [];
  const page   = PAGES.find(p => p.id === catId);
  const [filt, setFilt] = useState("all");
  const FILTERS = ["all","nouveau","promo","exclusif","rare","bestseller"];

  const filtered = filt === "all" ? items
    : items.filter(i => i.badge.toLowerCase().replace(/[.\s]/g,"") === filt.replace(/[.\s]/g,""));

  return (
    <div style={{ padding:"110px 5% 80px", background:t.bg, minHeight:"100vh" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div style={{ width:50, height:2, background:`linear-gradient(90deg,${t.purple},${t.gold})`, margin:"0 auto 20px" }}/>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:5,
            textTransform:"uppercase", color:t.purple, marginBottom:12,
            animation:"fadeUp .5s both" }}>NAD ACCESSOIRE</p>
          <h1 style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(38px,7vw,70px)", fontWeight:600, lineHeight:.95,
            background:`linear-gradient(135deg,${t.goldL},${t.gold})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            marginBottom:14, animation:"fadeUp .5s .1s both",
          }}>{page?.emoji} {page?.label}</h1>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:14, color:t.textMut,
            maxWidth:480, margin:"0 auto", animation:"fadeUp .5s .2s both" }}>
            Découvrez notre sélection exclusive de {page?.label.toLowerCase()} choisis pour leur qualité et élégance.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display:"flex", gap:10, justifyContent:"center",
          flexWrap:"wrap", marginBottom:50, animation:"fadeUp .5s .3s both" }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilt(f)} style={{
              padding:"8px 20px", borderRadius:30,
              fontFamily:"'Outfit',sans-serif", fontSize:10,
              letterSpacing:1.5, textTransform:"uppercase", cursor:"pointer",
              background: filt===f
                ? `linear-gradient(135deg,${t.purple},${t.purpleL})`
                : "transparent",
              color: filt===f ? "#fff" : t.textMut,
              border: filt===f ? "none" : `1px solid ${t.border}`,
              transition:"all .2s",
            }}>{f==="all" ? "Tous" : f}</button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:24 }}>
            {filtered.map((item, i) => (
              <ProductCard key={item.id} item={item} img={imgs[i] || imgs[0]} idx={i} t={t}/>
            ))}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22,
              fontStyle:"italic", color:t.textMut }}>Aucun article pour ce filtre</p>
            <button onClick={() => setFilt("all")} style={{
              marginTop:20, padding:"10px 24px", borderRadius:24,
              background:"transparent", border:`1px solid ${t.border2}`,
              color:t.textSub, cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontSize:11,
            }}>Voir tout</button>
          </div>
        )}

        {/* Back */}
        <div style={{ textAlign:"center", marginTop:60 }}>
          <button onClick={() => setCurrent("home")} style={{
            padding:"12px 32px", borderRadius:30, background:"transparent",
            border:`1px solid ${t.border2}`, color:t.textSub,
            cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontSize:11,
            letterSpacing:1.5, textTransform:"uppercase", transition:"border-color .2s,color .2s",
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
   CONTACT PAGE
══════════════════════════════════════════════════════ */
function ContactPage({ t }) {
  const [form, setForm] = useState({ nom:"", email:"", sujet:"", msg:"" });
  const [sent, setSent] = useState(false);
  const ok = form.nom && form.email && form.msg;

  return (
    <div style={{ padding:"110px 5% 80px", background:t.bg, minHeight:"100vh" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <div style={{ width:50, height:2, background:`linear-gradient(90deg,${t.purple},${t.gold})`, margin:"0 auto 20px" }}/>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:5,
            textTransform:"uppercase", color:t.purple, marginBottom:12 }}>NAD ACCESSOIRE</p>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(36px,6vw,60px)", fontWeight:600,
            background:`linear-gradient(135deg,${t.goldL},${t.gold})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Contactez-nous
          </h1>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:50, alignItems:"start" }}>
          {/* Info */}
          <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
            {[
              { icon:"📍", label:"Adresse",    val:"Akwa, Douala\nCameroun" },
              { icon:"📞", label:"Téléphone",  val:"+237 6XX XXX XXX" },
              { icon:"✉️", label:"Email",      val:"contact@nadaccessoire.com" },
              { icon:"🕐", label:"Horaires",   val:"Lun – Sam : 9h – 19h" },
              { icon:"📱", label:"WhatsApp",   val:"+237 6XX XXX XXX" },
            ].map(({ icon, label, val }) => (
              <div key={label} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                <div style={{ width:44, height:44, borderRadius:10, flexShrink:0,
                  background:t.surface, border:`1px solid ${t.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{icon}</div>
                <div>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2,
                    textTransform:"uppercase", color:t.gold, marginBottom:4 }}>{label}</p>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textSub,
                    lineHeight:1.6, whiteSpace:"pre-line" }}>{val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          {sent ? (
            <div style={{ background:t.cardBg, border:`1px solid ${t.border}`,
              borderRadius:20, padding:"60px 40px", textAlign:"center" }}>
              <div style={{ fontSize:56, marginBottom:16 }}>💌</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28,
                fontWeight:400, color:t.gold, marginBottom:10 }}>Message envoyé !</h3>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textMut, marginBottom:28 }}>
                Nous vous répondrons dans les 24 heures.
              </p>
              <button onClick={() => { setSent(false); setForm({nom:"",email:"",sujet:"",msg:""}); }}
                style={{ padding:"12px 30px", borderRadius:30, border:"none", cursor:"pointer",
                  background:`linear-gradient(135deg,${t.purple},${t.purpleL})`,
                  color:"#fff", fontFamily:"'Outfit',sans-serif", fontSize:11,
                  letterSpacing:2, textTransform:"uppercase" }}>
                Nouveau message
              </button>
            </div>
          ) : (
            <div style={{ background:t.cardBg, border:`1px solid ${t.border}`,
              borderRadius:20, padding:"36px 32px", display:"flex", flexDirection:"column", gap:18 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                {[
                  { key:"nom",   label:"Nom",   ph:"Votre nom",        type:"text" },
                  { key:"email", label:"Email", ph:"votre@email.com",  type:"email" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2,
                      textTransform:"uppercase", color:t.gold, display:"block", marginBottom:8 }}>{f.label}</label>
                    <input type={f.type} value={form[f.key]}
                      onChange={e => setForm({...form,[f.key]:e.target.value})}
                      placeholder={f.ph} style={{
                        background:t.inputBg, border:`1px solid ${t.border2}`, color:t.text,
                        fontFamily:"'Outfit',sans-serif", fontSize:13,
                        padding:"12px 14px", borderRadius:8, outline:"none", width:"100%",
                        transition:"border-color .2s",
                      }}
                      onFocus={e=>e.target.style.borderColor=t.purple}
                      onBlur={e=>e.target.style.borderColor=t.border2}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2,
                  textTransform:"uppercase", color:t.gold, display:"block", marginBottom:8 }}>Sujet</label>
                <select value={form.sujet} onChange={e=>setForm({...form,sujet:e.target.value})}
                  style={{ width:"100%", background:t.inputBg, border:`1px solid ${t.border2}`,
                    color:form.sujet?t.text:t.textMut, fontFamily:"'Outfit',sans-serif",
                    fontSize:13, padding:"12px 14px", borderRadius:8, outline:"none" }}>
                  <option value="" disabled>Choisir un sujet...</option>
                  <option>Bijoux – commande ou renseignement</option>
                  <option>Montres – demande d'information</option>
                  <option>Cadres & Art – devis sur mesure</option>
                  <option>Accessoires & Parfums</option>
                  <option>Autre demande</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:2,
                  textTransform:"uppercase", color:t.gold, display:"block", marginBottom:8 }}>Message</label>
                <textarea value={form.msg} rows={5}
                  onChange={e=>setForm({...form,msg:e.target.value})}
                  placeholder="Décrivez votre demande..."
                  style={{ background:t.inputBg, border:`1px solid ${t.border2}`,
                    color:t.text, fontFamily:"'Outfit',sans-serif", fontSize:13,
                    padding:"12px 14px", borderRadius:8, outline:"none",
                    width:"100%", resize:"vertical", transition:"border-color .2s" }}
                  onFocus={e=>e.target.style.borderColor=t.purple}
                  onBlur={e=>e.target.style.borderColor=t.border2}
                />
              </div>
              <button onClick={() => ok && setSent(true)} style={{
                padding:15, borderRadius:12, border:"none",
                cursor: ok ? "pointer" : "not-allowed",
                background: ok
                  ? `linear-gradient(135deg,${t.goldD},${t.gold})`
                  : t.border,
                color: ok ? t.bg : t.textMut,
                fontFamily:"'Outfit',sans-serif", fontWeight:600,
                fontSize:11, letterSpacing:2, textTransform:"uppercase",
                transition:"opacity .2s",
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
    <footer style={{ background:t.bg2, borderTop:`1px solid ${t.border}`, padding:"56px 5% 28px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:44 }}>
          <div>
            <div style={{ marginBottom:14 }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700,
                background:t.shimmer, backgroundSize:"300% auto",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                animation:"shimmer 5s linear infinite", letterSpacing:3 }}>NAD</span>
              <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:8, fontWeight:300,
                letterSpacing:5, color:t.textMut, textTransform:"uppercase",
                display:"block", marginTop:2 }}>ACCESSOIRE</span>
            </div>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textMut,
              lineHeight:1.7, maxWidth:240 }}>
              Votre destination premium pour bijoux, montres, cadres, accessoires et art de vivre depuis 2012.
            </p>
          </div>
          {[
            { title:"Collections", links:["bijoux","montres","cadres","accessoires"] },
            { title:"Univers",     links:["parfums","art","contact"] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:3,
                textTransform:"uppercase", color:t.gold, marginBottom:16 }}>{col.title}</p>
              {col.links.map(id => {
                const p = PAGES.find(x=>x.id===id);
                return (
                  <p key={id} onClick={() => setCurrent(id)} style={{
                    fontFamily:"'Outfit',sans-serif", fontSize:13, color:t.textMut,
                    marginBottom:10, cursor:"pointer", transition:"color .2s",
                  }}
                    onMouseEnter={e=>e.target.style.color=t.gold}
                    onMouseLeave={e=>e.target.style.color=t.textMut}
                  >{p?.label}</p>
                );
              })}
            </div>
          ))}
          <div>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:3,
              textTransform:"uppercase", color:t.gold, marginBottom:16 }}>Contact</p>
            {["Akwa, Douala","+237 6XX XXX XXX","Lun–Sam : 9h–19h"].map(v => (
              <p key={v} style={{ fontFamily:"'Outfit',sans-serif", fontSize:13,
                color:t.textMut, marginBottom:8 }}>{v}</p>
            ))}
          </div>
        </div>
        <div style={{ borderTop:`1px solid ${t.border}`, paddingTop:22,
          display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:t.textMut }}>
            © 2026 Nad Accessoire — Tous droits réservés
          </p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13,
            fontStyle:"italic", color:t.textMut }}>
            L'élégance est un art de vivre
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════
   CSS INJECTION (animations + global reset)
══════════════════════════════════════════════════════ */
if (typeof document !== "undefined") {
  const s = document.createElement("style");
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Outfit', sans-serif; transition: background .3s, color .3s; }
    @keyframes fadeUp  { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);} }
    @keyframes fadeIn  { from{opacity:0;}to{opacity:1;} }
    @keyframes shimmer { 0%{background-position:-300% center;}100%{background-position:300% center;} }
    @keyframes floatY  { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
    ::-webkit-scrollbar{width:4px;}
  `;
  document.head.appendChild(s);
}

/* ══════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════ */
export default function App() {
  const [current, setCurrent] = useState("home");
  const [dark, setDark]       = useState(true);
  const t = dark ? DARK : LIGHT;

  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color      = t.text;
    const sb = document.querySelector("style[data-sb]");
    const style = sb || document.createElement("style");
    style.setAttribute("data-sb","1");
    style.textContent = `::-webkit-scrollbar-thumb{background:${t.scrollThumb};}`;
    if (!sb) document.head.appendChild(style);
  }, [dark, t]);

  const navigate = (id) => {
    setCurrent(id);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const renderPage = () => {
    if (current === "home")    return <HomePage setCurrent={navigate} dark={dark} t={t}/>;
    if (current === "contact") return <ContactPage t={t}/>;
    if (PRODUCTS[current])     return <CategoryPage catId={current} setCurrent={navigate} t={t}/>;
    return <HomePage setCurrent={navigate} dark={dark} t={t}/>;
  };

  return (
    <div style={{ minHeight:"100vh", background:t.bg, color:t.text, transition:"background .35s,color .35s" }}>
      <Navbar current={current} setCurrent={navigate} dark={dark} setDark={setDark} t={t}/>
      <main>{renderPage()}</main>
      <Footer setCurrent={navigate} t={t}/>
    </div>
  );
}