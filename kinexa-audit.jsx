import { useState, useMemo } from "react";

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 0, label: "Réactivité Cognitive",      color: "#2563eb", icon: "⚡", desc: "Vitesse et agilité de traitement mental" },
  { id: 1, label: "Surcharge & Régulation",     color: "#dc2626", icon: "🌊", desc: "Niveau de saturation et capacité de régulation" },
  { id: 2, label: "Capital Corps & Biologie",   color: "#16a34a", icon: "🧬", desc: "Ressources corporelles et biologiques" },
  { id: 3, label: "Architecture du Pouvoir",    color: "#7c3aed", icon: "🏛️", desc: "Rapport au pouvoir, contrôle et domination" },
  { id: 4, label: "Structure Émotionnelle",     color: "#d97706", icon: "❤️", desc: "Accès et intégration émotionnelle" },
  { id: 5, label: "Allégeances & Relations",    color: "#db2777", icon: "🤝", desc: "Qualité des liens et fidélités" },
  { id: 6, label: "Obsolescence & Renouveau",   color: "#0891b2", icon: "🔄", desc: "Capacité d'adaptation et de renouvellement" },
  { id: 7, label: "Intime & Transcendance",     color: "#65a30d", icon: "✨", desc: "Vie intérieure, sens et profondeur" },
];

// ─── PERSONAS ─────────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    id: 0, name: "Le Pilote Surchargé", icon: "✈️",
    tagline: "Maître du cockpit, esclave du tableau de bord",
    sig: [4.5, 4.5, 3.0, 3.5, 2.0, 2.5, 3.0, 2.0],
    desc: "Vous gérez tout avec une précision redoutable — mais le coût cognitif s'accumule. Votre cerveau tourne en permanence à plein régime, laissant peu d'espace pour l'essentiel.",
    strengths: ["Réactivité exceptionnelle", "Gestion simultanée de flux complexes", "Résistance à la pression"],
    risks: ["Épuisement cognitif progressif", "Décisions automatisées sans recul", "Déconnexion émotionnelle"],
    recs: ["Instaurez des plages de silence cognitif quotidiennes", "Pratiquez la délégation profonde", "Reconstruisez un ancrage corporel"],
  },
  {
    id: 1, name: "Le Stratège Blindé", icon: "🔒",
    tagline: "La forteresse qui ne laisse plus entrer la lumière",
    sig: [4.0, 3.0, 2.0, 5.0, 1.5, 1.5, 3.5, 1.5],
    desc: "Votre architecture de pensée est solide, voire indestructible. Mais cette armure vous isole autant qu'elle vous protège. L'accès à vous-même — et aux autres — s'est rétréci.",
    strengths: ["Vision stratégique long terme", "Maîtrise des structures de pouvoir", "Cohérence dans l'action"],
    risks: ["Imperméabilité aux signaux faibles humains", "Solitude stratégique", "Rigidité face au changement"],
    recs: ["Exposez-vous volontairement à la vulnérabilité", "Reconstruisez des relations de confiance sans agenda", "Interrogez vos certitudes fondatrices"],
  },
  {
    id: 2, name: "Le Conquérant Épuisé", icon: "⚔️",
    tagline: "Tout gagner, ne plus sentir pourquoi",
    sig: [3.0, 5.0, 2.0, 4.5, 2.0, 2.0, 2.0, 2.0],
    desc: "Vous avez construit une trajectoire impressionnante — mais à quel prix ? Le moteur tourne encore, mais le carburant s'épuise. La victoire a perdu son goût.",
    strengths: ["Endurance hors norme", "Capacité d'exécution massive", "Résolution face aux obstacles"],
    risks: ["Burnout profond imminent", "Perte de sens et de motivation intrinsèque", "Corps ignoré jusqu'à la rupture"],
    recs: ["Arrêtez-vous avant d'être arrêté", "Identifiez ce qui vous motive réellement", "Réintégrez le corps dans votre quotidien"],
  },
  {
    id: 3, name: "L'Architecte du Vide", icon: "🔬",
    tagline: "Brillant dans les systèmes, absent dans la vie",
    sig: [5.0, 4.0, 1.5, 4.0, 1.0, 1.5, 4.5, 1.0],
    desc: "Votre intelligence analytique est remarquable. Vous construisez des systèmes complexes avec aisance. Mais cette puissance intellectuelle masque un vide intérieur croissant.",
    strengths: ["Puissance analytique et systémique", "Capacité de modélisation", "Adaptabilité intellectuelle"],
    risks: ["Dissociation émotion-cognition", "Vie relationnelle appauvrie", "Corps négligé comme variable secondaire"],
    recs: ["Réinvestissez le champ émotionnel comme données valides", "Cultivez des relations sans utilité apparente", "Réincorporez votre existence"],
  },
  {
    id: 4, name: "Le Prédateur Solitaire", icon: "🦅",
    tagline: "L'altitude vous isole autant qu'elle vous élève",
    sig: [4.0, 3.0, 3.0, 5.0, 1.0, 1.0, 3.0, 1.5],
    desc: "Vous opérez seul, au sommet. Vous n'avez besoin de personne — du moins, c'est ce que vous croyez. Cette indépendance cache une solitude structurelle.",
    strengths: ["Autonomie totale", "Vision indépendante", "Capacité de prise de risque élevée"],
    risks: ["Isolement décisionnel dangereux", "Angles morts permanents", "Fragilité cachée de la structure"],
    recs: ["Construisez une équipe de confiance réelle", "Pratiquez la pensée collective", "Explorez ce que la solitude cache"],
  },
  {
    id: 5, name: "Le Titan Fragile", icon: "⚡",
    tagline: "Invincible en surface, fissuré en profondeur",
    sig: [4.0, 4.0, 3.0, 4.5, 3.0, 2.0, 3.0, 3.0],
    desc: "De l'extérieur, tout semble parfait. Puissant, cohérent, impressionnant. Mais à l'intérieur, les tensions s'accumulent. La fissure existe — vous seul la voyez.",
    strengths: ["Présence charismatique forte", "Gestion des apparences", "Énergie de façade remarquable"],
    risks: ["Épuisement de la performance permanente", "Déconnexion entre image et réalité interne", "Rupture soudaine possible"],
    recs: ["Permettez-vous d'être imparfait avec des personnes de confiance", "Travaillez l'authenticité progressive", "Intégrez la fragilité comme force"],
  },
  {
    id: 6, name: "Le Fugitif Brillant", icon: "💨",
    tagline: "Toujours en mouvement, jamais rattrapé — ni ancré",
    sig: [5.0, 4.0, 2.0, 3.0, 3.0, 2.0, 3.5, 4.0],
    desc: "Votre esprit ne s'arrête jamais. Vous fuyez en avant avec brio. Mais cette vélocité permanente est aussi une façon de ne jamais avoir à rester en place avec vous-même.",
    strengths: ["Agilité cognitive exceptionnelle", "Innovation permanente", "Capacité à rebondir"],
    risks: ["Incapacité à s'ancrer", "Relations sacrifiées sur l'autel du mouvement", "Fuite de soi structurelle"],
    recs: ["Apprenez à terminer avant de recommencer", "Investissez dans des relations durables", "Pratiquez l'immobilité comme discipline"],
  },
  {
    id: 7, name: "L'Optimiseur Dysfonctionnel", icon: "⚙️",
    tagline: "Tout optimiser sauf l'essentiel",
    sig: [5.0, 5.0, 1.5, 4.0, 1.0, 1.5, 4.5, 1.0],
    desc: "Vous avez transformé votre vie en machine à optimiser. Chaque paramètre est mesuré, ajusté, maximisé — sauf ceux qui comptent vraiment. Le système tourne, mais pour quoi ?",
    strengths: ["Efficacité opérationnelle maximale", "Discipline et structure", "Intelligence des processus"],
    risks: ["Déshumanisation des relations", "Perte de sens dans l'efficience", "Surcharge chronique structurelle"],
    recs: ["Interrogez l'objectif de toute cette optimisation", "Laissez de l'espace à l'inefficience créatrice", "Réintroduisez du hasard et de la spontanéité"],
  },
  {
    id: 8, name: "Le Père de Fer", icon: "🏛️",
    tagline: "Protéger et contrôler : les deux faces d'une même médaille",
    sig: [3.0, 3.0, 3.0, 5.0, 2.0, 3.0, 2.0, 2.0],
    desc: "Vous exercez votre pouvoir avec la conviction de servir. Autorité, structure, protection — ces valeurs vous définissent. Mais elles peuvent aussi enfermer ceux que vous prétendez élever.",
    strengths: ["Autorité naturelle et respectée", "Sens du devoir et de la transmission", "Stabilité et cohérence"],
    risks: ["Contrôle masqué en bienveillance", "Étouffement de l'autonomie d'autrui", "Rigidité générationnelle"],
    recs: ["Distinguez protection et contrôle", "Permettez la contradiction constructive", "Développez la capacité à lâcher prise"],
  },
  {
    id: 9, name: "Le Phénix Potentiel", icon: "🔥",
    tagline: "Les cendres sont là — il reste à choisir de brûler",
    sig: [3.0, 3.0, 4.0, 2.5, 4.0, 4.0, 4.5, 4.5],
    desc: "Vous portez en vous une capacité de renaissance remarquable. Votre profil indique une ouverture réelle, des ressources intactes. La transformation est accessible — si vous choisissez de l'embrasser.",
    strengths: ["Ouverture au changement profond", "Capital relationnel réel", "Vie intérieure riche"],
    risks: ["Potentiel sous-exploité par peur du saut", "Hésitation entre l'ancien et le nouveau", "Dispersion dans les possibles"],
    recs: ["Engagez-vous dans une transformation concrète et datée", "Entourez-vous de personnes qui vous voient vraiment", "Faites confiance au processus plus qu'au résultat"],
  },
];

// ─── QUESTIONS (340) ──────────────────────────────────────────────────────────
// type: undefined = échelle 1–5 | type: "open" = réponse libre (non scorée)
const INITIAL_QUESTIONS = [
  // ══════════════════════════════════════════════════════════════════════════
  // BLOC A — QUESTIONNAIRE KINEXA DIRIGEANTS (240 questions, q001–q240)
  // ══════════════════════════════════════════════════════════════════════════

  // CAT 0 — Réactivité Cognitive (q001–q030)
  { id:"q001", cat:0, text:"Je prends des décisions rapidement, même sous pression, sans avoir besoin de temps long de réflexion." },
  { id:"q002", cat:0, text:"Mon cerveau reste alerte et précis lors de longues journées de travail intensif." },
  { id:"q003", cat:0, text:"Je rebondis vite après un imprévu ou une information contradictoire." },
  { id:"q004", cat:0, text:"Je traite simultanément plusieurs flux d'information sans perdre le fil." },
  { id:"q005", cat:0, text:"Je remarque des connexions entre des idées que les autres ne perçoivent pas encore." },
  { id:"q006", cat:0, text:"Dans une réunion, je saisisse l'enjeu central avant que les autres l'aient formulé." },
  { id:"q007", cat:0, text:"Mes analyses sont souvent en avance sur celles de mon entourage professionnel." },
  { id:"q008", cat:0, text:"Je change de registre mental — stratégique, opérationnel, relationnel — avec fluidité." },
  { id:"q009", cat:0, text:"Je m'adapte rapidement à une nouvelle information qui contredit mes hypothèses." },
  { id:"q010", cat:0, text:"Je peux interrompre un processus cognitif en cours pour en démarrer un autre sans perte d'efficacité." },
  { id:"q011", cat:0, text:"Mes réponses en situation de crise sont rapides et pertinentes." },
  { id:"q012", cat:0, text:"Je mobilise mon attention sur un point précis même dans un environnement bruyant ou stimulant." },
  { id:"q013", cat:0, text:"Je synthétise un dossier complexe en peu de temps avec une bonne précision." },
  { id:"q014", cat:0, text:"Je détecte les non-dits et les sous-entendus dans une conversation avec facilité." },
  { id:"q015", cat:0, text:"Je navigue sans effort entre pensée abstraite et application concrète." },
  { id:"q016", cat:0, text:"Je mémorise les éléments structurants d'une présentation ou d'un échange sans prise de notes." },
  { id:"q017", cat:0, text:"Mon attention reste soutenue lors de tâches longues qui exigent de la concentration." },
  { id:"q018", cat:0, text:"Je repère les incohérences dans un raisonnement ou un discours très rapidement." },
  { id:"q019", cat:0, text:"J'anticipe les objections avant qu'elles soient formulées et je les intègre dans ma réponse." },
  { id:"q020", cat:0, text:"Je suis capable d'interrompre une habitude de pensée pour explorer une perspective nouvelle." },
  { id:"q021", cat:0, text:"Mes intuitions professionnelles se révèlent justes plus souvent qu'à leur tour." },
  { id:"q022", cat:0, text:"Je classe et hiérarchise les informations entrantes sans effort apparent." },
  { id:"q023", cat:0, text:"Je comprends un problème complexe dans sa globalité avant d'entrer dans les détails." },
  { id:"q024", cat:0, text:"Je détecte rapidement les signaux faibles qui annoncent un changement important." },
  { id:"q025", cat:0, text:"Mon cerveau génère spontanément des solutions originales face aux obstacles." },
  { id:"q026", cat:0, text:"Je suis capable de reformuler un problème de façon à le rendre plus soluble." },
  { id:"q027", cat:0, text:"J'identifie les leviers d'action clés dans une situation avant les autres acteurs." },
  { id:"q028", cat:0, text:"Je peux maintenir deux hypothèses contradictoires actives simultanément pour les comparer." },
  { id:"q029", cat:0, text:"Ma vitesse de lecture et de compréhension est nettement au-dessus de la moyenne." },
  { id:"q030", cat:0, text:"Je suis à l'aise pour argumenter spontanément sur des sujets que je connais peu." },

  // CAT 1 — Surcharge & Régulation (q031–q060)
  { id:"q031", cat:1, text:"Je me sens dépassé par le volume de tâches à accomplir dans ma journée." },
  { id:"q032", cat:1, text:"J'ai du mal à terminer ce que je commence avant d'être interrompu." },
  { id:"q033", cat:1, text:"Je m'endors avec des pensées professionnelles qui tournent en boucle." },
  { id:"q034", cat:1, text:"Je ressens une tension mentale persistante même pendant les moments censés être de repos." },
  { id:"q035", cat:1, text:"Je prends des décisions importantes dans l'urgence plutôt qu'avec le recul nécessaire." },
  { id:"q036", cat:1, text:"Mon niveau d'irritabilité augmente quand la pression s'accumule." },
  { id:"q037", cat:1, text:"Je ne parviens pas à « couper » mentalement le soir ou le week-end." },
  { id:"q038", cat:1, text:"J'ai l'impression que tout repose sur moi et que je ne peux pas déléguer réellement." },
  { id:"q039", cat:1, text:"Je remarque des trous de mémoire ou des oublis inhabituels dans mon travail." },
  { id:"q040", cat:1, text:"Mon temps de latence pour traiter une information nouvelle a augmenté ces derniers mois." },
  { id:"q041", cat:1, text:"Je ressens une fatigue mentale dès le matin, avant même de commencer ma journée." },
  { id:"q042", cat:1, text:"J'ai des difficultés à prioriser : tout me semble également urgent." },
  { id:"q043", cat:1, text:"Je réagis de façon disproportionnée à des contrariétés mineures." },
  { id:"q044", cat:1, text:"J'ai l'impression de fonctionner en mode automatique sans pleine conscience de mes actes." },
  { id:"q045", cat:1, text:"Je remets à plus tard des décisions importantes parce que je me sens saturé." },
  { id:"q046", cat:1, text:"Je compense la fatigue mentale par des excitants — café, sucre, stimulants." },
  { id:"q047", cat:1, text:"Je ressens une forme d'anxiété diffuse sans objet clairement identifiable." },
  { id:"q048", cat:1, text:"Mon niveau d'engagement et d'enthousiasme professionnel a baissé." },
  { id:"q049", cat:1, text:"Je consomme du contenu informationnel de façon compulsive sans pouvoir m'arrêter." },
  { id:"q050", cat:1, text:"Je n'ai pas de réelle pratique de récupération mentale structurée." },
  { id:"q051", cat:1, text:"Je perds le fil d'une conversation longue ou d'un document dense." },
  { id:"q052", cat:1, text:"Je vis mal les temps de latence, les attentes, les pauses imposées." },
  { id:"q053", cat:1, text:"Ma capacité à générer des idées créatives a diminué ces derniers mois." },
  { id:"q054", cat:1, text:"J'ai des maux de tête, tensions cervicales ou vertiges liés au stress cognitif." },
  { id:"q055", cat:1, text:"Je me sens coupable quand je ne travaille pas ou ne suis pas productif." },
  { id:"q056", cat:1, text:"Mon cerveau continue à « travailler » même lors d'activités de loisir." },
  { id:"q057", cat:1, text:"J'ai du mal à finir des tâches créatives ou réflexives longues sans m'interrompre." },
  { id:"q058", cat:1, text:"Je me retrouve parfois à relire la même phrase plusieurs fois sans la comprendre." },
  { id:"q059", cat:1, text:"Je dors moins de 6 heures par nuit régulièrement." },
  { id:"q060", cat:1, text:"J'utilise les week-ends pour « rattraper » le travail de la semaine." },

  // CAT 2 — Capital Corps & Biologie (q061–q090)
  { id:"q061", cat:2, text:"Je néglige mon alimentation quand le travail s'intensifie." },
  { id:"q062", cat:2, text:"Je mange souvent en travaillant, devant un écran ou en réunion." },
  { id:"q063", cat:2, text:"Mon activité physique est insuffisante ou inexistante dans mon quotidien actuel." },
  { id:"q064", cat:2, text:"Je ressens des douleurs corporelles chroniques — dos, nuque, épaules — sans les traiter sérieusement." },
  { id:"q065", cat:2, text:"Mon sommeil est perturbé, peu réparateur ou insuffisant en durée." },
  { id:"q066", cat:2, text:"Je consomme de l'alcool ou d'autres substances pour décompresser." },
  { id:"q067", cat:2, text:"Je reporte les consultations médicales même quand des signaux d'alarme se manifestent." },
  { id:"q068", cat:2, text:"Mon corps est principalement un outil au service de ma performance professionnelle." },
  { id:"q069", cat:2, text:"Je ne fais pas la différence entre fatigue physique normale et épuisement biologique." },
  { id:"q070", cat:2, text:"J'ignore les messages corporels — douleurs, tensions, signaux de fatigue — pendant les périodes intenses." },
  { id:"q071", cat:2, text:"Je ne dispose pas de rituel de récupération physique structuré." },
  { id:"q072", cat:2, text:"Mes hormones du stress — cortisol, adrénaline — semblent constamment activées." },
  { id:"q073", cat:2, text:"Je n'ai pas pratiqué de bilan de santé complet depuis plus de deux ans." },
  { id:"q074", cat:2, text:"Mon poids ou ma composition corporelle a évolué de façon significative sans que j'en sois l'auteur conscient." },
  { id:"q075", cat:2, text:"Je n'ai pas de pratique régulière de respiration consciente ou de relaxation." },
  { id:"q076", cat:2, text:"Ma libido ou mon énergie sexuelle a diminué significativement." },
  { id:"q077", cat:2, text:"Je consomme plus de médicaments — anxiolytiques, antalgiques, somnifères — qu'il y a deux ans." },
  { id:"q078", cat:2, text:"Je n'intègre pas de temps de marche ou de mouvement spontané dans mes journées." },
  { id:"q079", cat:2, text:"Mon microbiote et ma digestion me semblent perturbés sans que j'y prête attention." },
  { id:"q080", cat:2, text:"Je résiste à toute forme de ralentissement, de pause ou de convalescence." },
  { id:"q081", cat:2, text:"Je n'utilise pas la nature, l'exposition au soleil ou le plein air comme ressource de régulation." },
  { id:"q082", cat:2, text:"Je consomme beaucoup de caféine pour maintenir mes performances cognitives." },
  { id:"q083", cat:2, text:"Ma posture et ma présence corporelle dans l'espace se sont dégradées." },
  { id:"q084", cat:2, text:"Je ne pratique aucune activité qui engage directement mon corps de façon ludique ou plaisante." },
  { id:"q085", cat:2, text:"Je ne m'hydrate pas suffisamment dans mes journées de travail intense." },
  { id:"q086", cat:2, text:"Mon système immunitaire semble affaibli — rhumes, infections fréquentes." },
  { id:"q087", cat:2, text:"Je n'ai pas de pratique de récupération active — froid, chaleur, massage, étirements." },
  { id:"q088", cat:2, text:"Je me sens déconnecté de mon corps, comme si je vivais dans ma tête." },
  { id:"q089", cat:2, text:"Mon rythme circadien est perturbé — coucher tardif, lever difficile, énergie irrégulière." },
  { id:"q090", cat:2, text:"La qualité de mon souffle — profondeur, régularité — ne me préoccupe pas." },

  // CAT 3 — Architecture du Pouvoir (q091–q120)
  { id:"q091", cat:3, text:"J'ai besoin d'avoir le dernier mot dans les décisions importantes, même quand d'autres sont compétents." },
  { id:"q092", cat:3, text:"Je ressens une gêne ou une menace quand quelqu'un remet en question mon autorité." },
  { id:"q093", cat:3, text:"J'ai tendance à réduire l'espace d'autonomie de mes collaborateurs pour maintenir le contrôle." },
  { id:"q094", cat:3, text:"Je structure mon environnement de façon à rester indispensable." },
  { id:"q095", cat:3, text:"La compétition me motive davantage que la coopération." },
  { id:"q096", cat:3, text:"Je maintiens une hiérarchie claire, même informelle, dans toutes mes relations." },
  { id:"q097", cat:3, text:"Je juge rapidement la valeur d'une personne à partir de son statut ou de ses résultats." },
  { id:"q098", cat:3, text:"Je ressens une forme de mépris ou d'impatience face aux personnes que je considère comme lentes ou limitées." },
  { id:"q099", cat:3, text:"La loyauté que j'exige de mon entourage est supérieure à celle que je leur offre." },
  { id:"q100", cat:3, text:"Je manipule les situations pour obtenir l'issue que je souhaite, même inconsciemment." },
  { id:"q101", cat:3, text:"J'utilise le silence, la distance ou la pression pour signaler mon mécontentement." },
  { id:"q102", cat:3, text:"Je préfère décider seul plutôt que de partager le pouvoir décisionnel." },
  { id:"q103", cat:3, text:"Mon estime de moi dépend largement de ma position dans la hiérarchie." },
  { id:"q104", cat:3, text:"Je cultive des relations de dépendance plutôt que d'interdépendance." },
  { id:"q105", cat:3, text:"Je préfère que mes collaborateurs me craignent plutôt qu'ils ne m'apprécient." },
  { id:"q106", cat:3, text:"Je me pose rarement la question de l'impact de mon pouvoir sur les autres." },
  { id:"q107", cat:3, text:"Admettre une erreur publiquement me coûte énormément." },
  { id:"q108", cat:3, text:"Je tiens des comptes — des services rendus, des trahisons perçues." },
  { id:"q109", cat:3, text:"Je considère que la fin justifie les moyens dans la plupart des cas professionnels." },
  { id:"q110", cat:3, text:"Je surveille qui monte dans la hiérarchie et j'évalue les menaces potentielles." },
  { id:"q111", cat:3, text:"Je cherche à occuper le territoire symbolique autant que le territoire réel." },
  { id:"q112", cat:3, text:"Mon identité serait profondément perturbée si je perdais mon poste ou mon statut." },
  { id:"q113", cat:3, text:"Je teste régulièrement les loyautés de mon entourage, consciemment ou non." },
  { id:"q114", cat:3, text:"Je m'approprie les succès collectifs comme les miens propres." },
  { id:"q115", cat:3, text:"J'attribue les échecs à des facteurs externes ou à d'autres personnes." },
  { id:"q116", cat:3, text:"Je me sens plus vivant dans les rapports de force que dans la coopération." },
  { id:"q117", cat:3, text:"La transparence me semble une faiblesse stratégique dans la plupart des contextes." },
  { id:"q118", cat:3, text:"Je construis mes réseaux principalement pour leur utilité potentielle future." },
  { id:"q119", cat:3, text:"J'utilise l'information comme monnaie d'échange et instrument de pouvoir." },
  { id:"q120", cat:3, text:"Mon rapport au pouvoir est plus défensif qu'offensif — je protège plus que je construis." },

  // CAT 4 — Structure Émotionnelle (q121–q150)
  { id:"q121", cat:4, text:"Je peux nommer précisément ce que je ressens dans la plupart des situations." },
  { id:"q122", cat:4, text:"J'accueille mes émotions comme des informations utiles plutôt que comme des perturbations." },
  { id:"q123", cat:4, text:"Je suis capable de ressentir de la tristesse sans être submergé par elle." },
  { id:"q124", cat:4, text:"La colère est une émotion que j'exprime de façon constructive plutôt que destructive." },
  { id:"q125", cat:4, text:"Je reconnais quand une réaction émotionnelle vient d'un schéma passé plutôt que de la situation présente." },
  { id:"q126", cat:4, text:"Je peux exprimer ma vulnérabilité à des personnes de confiance sans honte excessive." },
  { id:"q127", cat:4, text:"Je suis sensible aux états émotionnels de mon entourage sans les absorber." },
  { id:"q128", cat:4, text:"J'ai accès à des émotions dites « douces » — tendresse, gratitude, émerveillement." },
  { id:"q129", cat:4, text:"Je peux rester présent face à la détresse d'autrui sans fuir ni me fermer." },
  { id:"q130", cat:4, text:"Je sais faire la différence entre une réaction émotionnelle et un jugement rationnel." },
  { id:"q131", cat:4, text:"Mes émotions m'informent sur mes besoins profonds de façon fiable." },
  { id:"q132", cat:4, text:"Je ne dissimule pas systématiquement mes émotions derrière une posture professionnelle." },
  { id:"q133", cat:4, text:"Je peux pleurer ou être ému sans ressentir que ma crédibilité est entamée." },
  { id:"q134", cat:4, text:"J'ai développé une capacité à tolérer l'incertitude sans que l'anxiété prenne le dessus." },
  { id:"q135", cat:4, text:"Je peux recevoir des compliments sincères sans les minimiser ou les rejeter." },
  { id:"q136", cat:4, text:"Je reconnais la peur comme signal d'information plutôt que comme menace à éliminer." },
  { id:"q137", cat:4, text:"Je maintiens une connexion émotionnelle avec moi-même même en période de forte pression." },
  { id:"q138", cat:4, text:"Je peux exprimer de l'enthousiasme ou de la joie en contexte professionnel sans retenue excessive." },
  { id:"q139", cat:4, text:"J'ai conscience de mes mécanismes de défense — humour, rationalisation, distanciation." },
  { id:"q140", cat:4, text:"Je peux demander de l'aide sans ressentir cela comme une défaite." },
  { id:"q141", cat:4, text:"Mes décisions importantes intègrent une dimension émotionnelle et intuitive, pas seulement rationnelle." },
  { id:"q142", cat:4, text:"Je me souviens d'émotions positives passées avec facilité et elles m'ancrent." },
  { id:"q143", cat:4, text:"Je suis capable d'empathie réelle, pas seulement stratégique." },
  { id:"q144", cat:4, text:"Je ne confonds pas durci et fort, ému et faible." },
  { id:"q145", cat:4, text:"Je me reconnecte à mes émotions après une période de coupure." },
  { id:"q146", cat:4, text:"J'ai des relations dans lesquelles je peux être authentiquement moi-même." },
  { id:"q147", cat:4, text:"Je peux me laisser toucher par une œuvre d'art, un paysage, une histoire humaine." },
  { id:"q148", cat:4, text:"Je ressens de la fierté sincère, pas seulement performée." },
  { id:"q149", cat:4, text:"Je suis capable de pardonner — à moi-même et aux autres — de façon réelle et non forcée." },
  { id:"q150", cat:4, text:"Mon rapport à l'échec inclut une composante émotionnelle que j'intègre plutôt que que je nie." },

  // CAT 5 — Allégeances & Relations (q151–q180)
  { id:"q151", cat:5, text:"J'ai des personnes dans ma vie à qui je peux tout dire sans filtre ni agenda." },
  { id:"q152", cat:5, text:"Mes amitiés profondes ont survécu aux transformations de ma trajectoire professionnelle." },
  { id:"q153", cat:5, text:"Je suis capable d'être loyal envers quelqu'un même quand cela me coûte quelque chose." },
  { id:"q154", cat:5, text:"Je maintiens des liens avec des personnes qui ne m'apportent rien de stratégique." },
  { id:"q155", cat:5, text:"Je m'intéresse sincèrement à la vie de ceux qui m'entourent, pas seulement à leur utilité." },
  { id:"q156", cat:5, text:"Je peux être en désaccord profond avec quelqu'un et maintenir le lien intact." },
  { id:"q157", cat:5, text:"Je prends des nouvelles de mes proches de façon régulière et authentique." },
  { id:"q158", cat:5, text:"Je suis capable d'être présent à quelqu'un sans avoir d'autre agenda que la relation elle-même." },
  { id:"q159", cat:5, text:"Je maintiens des liens intergénérationnels — mentors, personnes plus jeunes que moi." },
  { id:"q160", cat:5, text:"Je peux exprimer de la reconnaissance sincère à des personnes qui m'ont aidé." },
  { id:"q161", cat:5, text:"Je m'investis dans des relations qui ne sont pas directement liées à ma sphère professionnelle." },
  { id:"q162", cat:5, text:"Je suis capable de défendre quelqu'un en son absence quand il est injustement critiqué." },
  { id:"q163", cat:5, text:"Mes engagements relationnels — parole donnée, promesses, rendez-vous — sont tenus." },
  { id:"q164", cat:5, text:"Je reconnais les personnes qui m'ont construit et j'en parle avec respect." },
  { id:"q165", cat:5, text:"Je suis capable de recevoir de l'aide sans que cela crée une dette insupportable." },
  { id:"q166", cat:5, text:"Mes relations professionnelles incluent une dimension humaine réelle, pas seulement fonctionnelle." },
  { id:"q167", cat:5, text:"Je suis capable de me réjouir sincèrement du succès d'un proche ou d'un concurrent." },
  { id:"q168", cat:5, text:"Je répare les relations abîmées quand c'est possible et souhaitable." },
  { id:"q169", cat:5, text:"Je peux dire non à quelqu'un que j'aime sans que cela fracture le lien." },
  { id:"q170", cat:5, text:"Je suis attentif aux signaux de détresse chez ceux qui m'entourent." },
  { id:"q171", cat:5, text:"Je connais les valeurs profondes des personnes qui me sont chères." },
  { id:"q172", cat:5, text:"Je suis capable de m'excuser de façon sincère et non défensive." },
  { id:"q173", cat:5, text:"Ma vie relationnelle est diverse — différents milieux, âges, cultures." },
  { id:"q174", cat:5, text:"Je distingue clairement les relations de confiance des relations d'intérêt." },
  { id:"q175", cat:5, text:"Je peux être dans la vie de quelqu'un sans avoir besoin de la diriger." },
  { id:"q176", cat:5, text:"Je maintiens des relations profondes malgré la distance géographique ou temporelle." },
  { id:"q177", cat:5, text:"Je suis capable d'accompagner quelqu'un dans sa souffrance sans vouloir la résoudre immédiatement." },
  { id:"q178", cat:5, text:"Mes relations familiales, même complexes, ont une qualité de présence réelle." },
  { id:"q179", cat:5, text:"Je sais qui compterait pour moi dans les moments vraiment difficiles." },
  { id:"q180", cat:5, text:"Je prends le temps de célébrer avec mes proches les étapes importantes de la vie." },

  // CAT 6 — Obsolescence & Renouveau (q181–q210)
  { id:"q181", cat:6, text:"Je remets en question régulièrement mes croyances professionnelles fondatrices." },
  { id:"q182", cat:6, text:"Je lis ou me forme dans des domaines éloignés de mon expertise principale." },
  { id:"q183", cat:6, text:"Je suis capable de reconnaître quand une compétence que je maîtrise devient obsolète." },
  { id:"q184", cat:6, text:"J'apprends volontiers de personnes plus jeunes ou moins expérimentées que moi." },
  { id:"q185", cat:6, text:"Je suis à l'aise pour commencer quelque chose en tant que débutant." },
  { id:"q186", cat:6, text:"Je peux abandonner une stratégie qui ne fonctionne plus, même si elle a été un succès." },
  { id:"q187", cat:6, text:"Je m'expose volontairement à des idées qui déstabilisent ma vision du monde." },
  { id:"q188", cat:6, text:"J'ai une pratique de veille ou de curiosité structurée dans ma vie professionnelle." },
  { id:"q189", cat:6, text:"Je suis capable de changer d'avis publiquement sans ressentir que ma crédibilité est compromise." },
  { id:"q190", cat:6, text:"J'accueille la contradiction comme une opportunité d'affiner ma pensée." },
  { id:"q191", cat:6, text:"Je peux accepter de ne pas savoir sans que cela génère une anxiété excessive." },
  { id:"q192", cat:6, text:"J'ai intégré dans ma vie des pratiques nouvelles — sport, méditation, art — ces deux dernières années." },
  { id:"q193", cat:6, text:"Je suis capable de désapprendre un réflexe ou une habitude qui ne me sert plus." },
  { id:"q194", cat:6, text:"Je m'intéresse à la façon dont les générations suivantes pensent et travaillent." },
  { id:"q195", cat:6, text:"Je consacre du temps à des projets qui n'ont pas de rentabilité immédiate." },
  { id:"q196", cat:6, text:"Je résiste moins que par le passé aux changements imposés de l'extérieur." },
  { id:"q197", cat:6, text:"Je peux envisager sereinement une reconversion ou une transformation majeure de ma trajectoire." },
  { id:"q198", cat:6, text:"Je me réjouis des nouvelles technologies ou méthodes même quand elles remettent en cause mes pratiques." },
  { id:"q199", cat:6, text:"J'ai des personnes dans mon entourage qui me challengent et que je choisis pour cela." },
  { id:"q200", cat:6, text:"Je suis capable de traverser une période de désorientation professionnelle sans panique." },
  { id:"q201", cat:6, text:"J'interroge régulièrement la valeur de mes habitudes et de mes rituels." },
  { id:"q202", cat:6, text:"Je peux reconnaître la valeur d'un modèle différent du mien sans le menacer." },
  { id:"q203", cat:6, text:"J'accepte que mon expérience passée puisse parfois être un obstacle autant qu'une ressource." },
  { id:"q204", cat:6, text:"Je m'intéresse à ce qui se passe aux marges et aux frontières de mon domaine." },
  { id:"q205", cat:6, text:"Je cultive une forme d'humilité épistémique — je sais que je ne sais pas tout." },
  { id:"q206", cat:6, text:"J'ai la capacité de recommencer quelque chose à zéro si nécessaire." },
  { id:"q207", cat:6, text:"Je suis ouvert à être transformé par mes expériences plutôt que de simplement les traverser." },
  { id:"q208", cat:6, text:"Je peux parler de mes erreurs passées de façon claire et non défensive." },
  { id:"q209", cat:6, text:"Je cherche des mentors ou des interlocuteurs qui me dépassent dans certains domaines." },
  { id:"q210", cat:6, text:"Mon rapport à l'avenir est davantage ouvert et curieux qu'anxieux et défensif." },

  // CAT 7 — Intime & Transcendance (q211–q240)
  { id:"q211", cat:7, text:"J'ai une vie intérieure riche — réflexions, rêveries, méditations — indépendamment de ma productivité." },
  { id:"q212", cat:7, text:"Je me pose régulièrement des questions sur le sens de ce que je fais." },
  { id:"q213", cat:7, text:"J'ai une vision claire de ce qui compte vraiment pour moi au-delà de la performance." },
  { id:"q214", cat:7, text:"Je peux rester seul avec moi-même sans ressentir le besoin de me distraire." },
  { id:"q215", cat:7, text:"J'ai une pratique spirituelle, philosophique ou contemplative, quelle qu'elle soit." },
  { id:"q216", cat:7, text:"Je me sens en accord avec mes valeurs profondes dans les décisions importantes." },
  { id:"q217", cat:7, text:"J'ai une forme de relation avec la mort — la mienne — qui ne me paralyse pas." },
  { id:"q218", cat:7, text:"Je suis capable d'être présent au moment présent de façon prolongée." },
  { id:"q219", cat:7, text:"Je ressens parfois une forme d'émerveillement devant l'existence — nature, art, science." },
  { id:"q220", cat:7, text:"J'ai une vision de ma propre mort qui donne du sens à ma vie plutôt qu'elle ne l'inhibe." },
  { id:"q221", cat:7, text:"Je peux tolérer le mystère et l'inexplicable sans avoir besoin de tout résoudre." },
  { id:"q222", cat:7, text:"Je me sens relié à quelque chose de plus grand que moi — famille, humanité, nature, cosmos." },
  { id:"q223", cat:7, text:"J'ai des convictions profondes sur ce qui vaut la peine d'être vécu." },
  { id:"q224", cat:7, text:"Je suis capable de traverser une épreuve en lui trouvant un sens, même a posteriori." },
  { id:"q225", cat:7, text:"Je peux passer une journée entière sans consulter d'écrans ou de flux d'information." },
  { id:"q226", cat:7, text:"J'ai accès à des états de flow — absorption totale — dans certaines activités." },
  { id:"q227", cat:7, text:"Je cultive une pratique d'introspection régulière — journal, thérapie, supervision." },
  { id:"q228", cat:7, text:"Je fais confiance à quelque chose en moi qui dépasse la logique rationnelle." },
  { id:"q229", cat:7, text:"Je me souviens de rêves ou d'images intérieures avec intérêt et je les interroge." },
  { id:"q230", cat:7, text:"J'ai une vision de ce que je veux laisser derrière moi — héritage, transmission, impact." },
  { id:"q231", cat:7, text:"Je me sens en accord avec ma propre histoire, y compris ses parts sombres." },
  { id:"q232", cat:7, text:"J'ai une pratique de gratitude authentique — pas performée — dans ma vie quotidienne." },
  { id:"q233", cat:7, text:"Je peux traverser une période de vide sans la fuir par l'hyperactivité." },
  { id:"q234", cat:7, text:"Je reconnais les moments de grâce ou de beauté dans mon quotidien, même ordinaire." },
  { id:"q235", cat:7, text:"Ma vie a un fil narratif que je comprends et que je peux raconter de façon cohérente." },
  { id:"q236", cat:7, text:"Je suis capable de me pardonner des erreurs passées avec bienveillance." },
  { id:"q237", cat:7, text:"Je peux exprimer ce que je crois profondément sans craindre le regard des autres." },
  { id:"q238", cat:7, text:"Je m'interroge sur l'impact de mon existence sur les autres avec honnêteté." },
  { id:"q239", cat:7, text:"Je ressens parfois une paix intérieure qui ne dépend pas des circonstances extérieures." },
  { id:"q240", cat:7, text:"Ma façon d'habiter le monde correspond à ce que je suis réellement, pas à ce que l'on attend de moi." },

  // ══════════════════════════════════════════════════════════════════════════
  // BLOC B — QUESTIONNAIRE D'ORIENTATION PROFONDE (100 questions, h001–h100)
  // Questions mixtes : échelle (1–5) ou réponse libre (type:"open")
  // ══════════════════════════════════════════════════════════════════════════

  // SECTION I — LE CORPS ET LE RYTHME DE VIE (h001–h012) → Cat 2
  { id:"h001", cat:2, type:"open", text:"À quelle heure vous couchez-vous et vous levez-vous en moyenne ? (semaine et week-end)" },
  { id:"h002", cat:2, text:"Comment qualifiez-vous votre sommeil sur les 3 derniers mois ?" /* 1=très récupérateur → 5=épuisant, jamais assez */ },
  { id:"h003", cat:2, text:"Votre premier geste au réveil : restez-vous immobile, ou ouvrez-vous votre téléphone immédiatement ?" /* 1=je reste immobile → 5=téléphone immédiatement */ },
  { id:"h004", cat:2, text:"Combien de fois par semaine faites-vous du sport — vraiment, pas dans vos intentions ?" /* 1=4 fois ou plus → 5=jamais */ },
  { id:"h004b", cat:2, type:"open", text:"Quel sport ? Depuis quand ? Seul ou en groupe ?" },
  { id:"h005", cat:2, type:"open", text:"Tabac — combien par jour, ou depuis quand avez-vous arrêté ?" },
  { id:"h006", cat:2, type:"open", text:"Alcool — à quelle fréquence ? Combien de verres lors d'une soirée type ?" },
  { id:"h007", cat:2, type:"open", text:"Cannabis ou autres substances — fréquence réelle ? (sans jugement)" },
  { id:"h008", cat:2, text:"Comment mangez-vous ? Repas assis et cuisinés, ou alimentation au hasard sur le pouce ?" /* 1=repas structurés → 5=n'importe quoi, n'importe quand */ },
  { id:"h009", cat:2, type:"open", text:"Avez-vous des douleurs physiques récurrentes ? Où, depuis quand ? (dos, tête, ventre, tensions…)" },
  { id:"h010", cat:2, text:"En fin de journée, vous sentez-vous épuisé ou au contraire pas assez sollicité ?" /* 1=épuisé → 3=équilibré → 5=pas assez utilisé */ },
  { id:"h011", cat:2, type:"open", text:"Avez-vous un traitement médicamenteux en cours ? Lequel, depuis quand, prescrit par qui ? (y compris compléments, anxiolytiques, médicaments du sommeil)" },
  { id:"h012", cat:2, type:"open", text:"Quand avez-vous ressenti pour la dernière fois une vraie fatigue physique — celle qu'on mérite après un effort ? Décrivez la situation." },

  // SECTION II — MENTAL, CONCENTRATION, EFFORT (h013–h024) → Cat 0/1
  { id:"h013", cat:0, text:"Combien de temps pouvez-vous lire un texte difficile sans vous arrêter ?" /* 1=plus d'une heure → 5=moins de 10 minutes */ },
  { id:"h014", cat:6, type:"open", text:"Le dernier livre que vous avez lu entièrement — lequel, et quand ? (titre, auteur, date approximative)" },
  { id:"h015", cat:6, type:"open", text:"Combien de livres avez-vous lus cette année ? Quels genres ?" },
  { id:"h016", cat:1, text:"Face à une tâche difficile, votre réaction naturelle est de vous y mettre ou de la reporter ?" /* 1=je m'y mets directement → 5=je remets à demain */ },
  { id:"h017", cat:6, text:"Utilisez-vous des outils IA pour rédiger, structurer vos idées ou prendre des décisions ?" /* 1=jamais ou technique pur → 5=pour presque tout */ },
  { id:"h017b", cat:6, type:"open", text:"Pour quoi exactement utilisez-vous ces outils IA ? Soyez précis." },
  { id:"h018", cat:0, text:"Pouvez-vous travailler sans musique, sans fond sonore, dans le silence complet ?" /* 1=oui, je préfère le silence → 5=impossible sans bruit */ },
  { id:"h019", cat:0, text:"Êtes-vous exigeant avec vous-même — par rapport à votre propre idée de ce que vous devriez être capable de faire ?" /* 1=très, souvent insatisfait → 5=peu */ },
  { id:"h020", cat:7, type:"open", text:"Un sujet vous a-t-il déjà tellement absorbé que vous en avez perdu la notion du temps ? Lequel ? Décrivez les circonstances." },
  { id:"h021", cat:1, text:"Avez-vous un suivi psychologique ou psychiatrique en cours ?" /* 1=aucun → 5=traitement actif */ },
  { id:"h021b", cat:4, type:"open", text:"Qui a posé ce diagnostic ou accompagnement ? Êtes-vous en accord avec lui ?" },
  { id:"h022", cat:4, type:"open", text:"Avez-vous fait un bilan psychologique ou neuropsychologique ? Quand, et ce que ça a donné ?" },
  { id:"h023", cat:0, text:"Votre mémoire — vous faites confiance à votre mémoire dans la durée ?" /* 1=très bonne → 5=je l'externalise, notes partout */ },
  { id:"h024", cat:1, type:"open", text:"Combien d'heures par jour passez-vous sur votre téléphone — réellement ? Estimation honnête." },

  // SECTION III — VIE SOCIALE ET AUTONOMIE (h025–h036) → Cat 3/5
  { id:"h025", cat:3, text:"Dans votre environnement, êtes-vous celui qui influence ou celui qui suit ?" /* 1=j'influence souvent → 5=je suis la majorité */ },
  { id:"h026", cat:7, text:"Pouvez-vous passer une journée entière seul, sans téléphone, sans personne — et en ressortir bien ?" /* 1=oui, j'aime ça → 5=c'est insupportable */ },
  { id:"h027", cat:4, type:"open", text:"Quand votre entourage a une opinion unanime sur quelque chose, vous arrive-t-il de penser le contraire sans le dire ? Donnez un exemple récent." },
  { id:"h028", cat:6, text:"Vos opinions sur des sujets importants — d'où viennent-elles réellement ?" /* 1=de ma propre réflexion → 5=de mon groupe, des réseaux */ },
  { id:"h028b", cat:6, type:"open", text:"Une conviction importante — comment y êtes-vous arrivé concrètement ?" },
  { id:"h029", cat:5, type:"open", text:"Ce que vos proches pensent de vous — est-ce une image juste ou une image qu'ils ont construite ? Qu'est-ce qu'ils ne savent pas ?" },
  { id:"h030", cat:5, text:"Avez-vous quelqu'un à qui vous dites vraiment ce que vous pensez — pas un collègue, quelqu'un de confiance ?" /* 1=oui, vraiment → 5=non, personne */ },
  { id:"h031", cat:5, text:"Êtes-vous capable de refuser quelque chose à quelqu'un que vous estimez, sans vous justifier longuement ?" /* 1=oui, facilement → 5=j'ai énormément de mal */ },
  { id:"h032", cat:5, type:"open", text:"Décrivez votre cercle social : qui sont les 5 personnes avec qui vous passez le plus de temps ? Que font-elles ? (profils, âges, activités)" },
  { id:"h033", cat:5, type:"open", text:"Avez-vous des personnes qui pensent très différemment de vous — et que vous choisissez d'écouter vraiment ?" },
  { id:"h034", cat:1, type:"open", text:"Les réseaux sociaux — combien de plateformes, et pour quoi faire concrètement ? (usage réel, pas déclaratif)" },
  { id:"h035", cat:6, type:"open", text:"Avez-vous déjà vécu seul, dans une ville ou un pays étrangers, loin de votre réseau habituel ? Comment ça s'est passé ?" },
  { id:"h036", cat:5, type:"open", text:"Vos relations intimes — stables ou instables ? Vous faites confiance facilement ou pas ?" },

  // SECTION IV — SENS, SATISFACTION, PROJECTION (h037–h048) → Cat 4/7
  { id:"h037", cat:7, type:"open", text:"Qu'est-ce qui vous donne du vrai plaisir — pas du soulagement, pas de la distraction ? (prenez le temps, c'est la question clé)" },
  { id:"h038", cat:4, type:"open", text:"Quand avez-vous ressenti pour la dernière fois de la fierté — de la vraie, pas de la satisfaction sociale ? Décrivez la situation." },
  { id:"h039", cat:7, type:"open", text:"Dans 10 ans — pas ce que vous êtes censé vouloir, ce que vous voulez vraiment ? Soyez honnête." },
  { id:"h040", cat:3, text:"L'argent — critère central de vos choix professionnels ou élément parmi d'autres ?" /* 1=secondaire → 5=critère principal */ },
  { id:"h040b", cat:7, type:"open", text:"Pourquoi ce rapport à l'argent ? D'où vient-il ?" },
  { id:"h041", cat:1, text:"Avez-vous peur — diffusément, en arrière-plan, sans raison précise ?" /* 1=non, je me sens solide → 5=souvent, sans pouvoir nommer quoi */ },
  { id:"h042", cat:4, type:"open", text:"Quand quelque chose ne marche pas — réaction naturelle : vous y retournez, cherchez un coupable, ou abandonnez ? Donnez un exemple récent et concret." },
  { id:"h043", cat:1, type:"open", text:"Avez-vous quelque chose que vous repoussez depuis des mois ? Quoi, et pourquoi ?" },
  { id:"h044", cat:1, text:"Est-ce que vous vous ennuyez souvent ?" /* 1=non, jamais → 5=très souvent */ },
  { id:"h045", cat:4, type:"open", text:"Y a-t-il quelque chose que vous faites très bien et qui n'est reconnu par personne dans votre entourage ?" },
  { id:"h046", cat:7, type:"open", text:"Si vous n'aviez pas besoin d'argent — que feriez-vous de vos journées ? (pas ce qu'il faudrait faire. Ce que vous feriez.)" },
  { id:"h047", cat:7, type:"open", text:"Qu'est-ce que vous regrettez déjà — à l'âge que vous avez ?" },
  { id:"h048", cat:4, type:"open", text:"Qu'est-ce qui vous révolte ? Et qu'est-ce que vous faites avec cette révolte ?" },

  // SECTION V — CENTRES D'INTÉRÊT : LE HYPE ET LE RÉEL (h049–h060) → Cat 6/7
  { id:"h049", cat:6, text:"La technologie et l'IA vous intéressent vraiment — ou suivez-vous le courant de ce qui paraît important en ce moment ?" /* 1=intérêt profond, je pratique → 5=je suis le hype ambiant */ },
  { id:"h049b", cat:6, type:"open", text:"Décrivez ce que vous faites concrètement avec la technologie — pas ce que vous en dites." },
  { id:"h050", cat:6, text:"L'histoire — civilisations, art, grandes périodes — ça vous touche quelque chose ?" /* 1=oui, profondément → 5=pas du tout */ },
  { id:"h050b", cat:6, type:"open", text:"Quelle période, quoi en particulier vous attire dans l'histoire ?" },
  { id:"h051", cat:6, text:"Avez-vous une pratique artistique, musicale, physique ou manuelle — quelque chose fait avec le corps ou les mains ?" /* 1=oui, régulièrement → 5=non, rien */ },
  { id:"h051b", cat:6, type:"open", text:"Laquelle, depuis quand, à quel niveau ?" },
  { id:"h052", cat:7, type:"open", text:"Vous avez visité un lieu — musée, ville, édifice — et quelque chose vous a vraiment arrêté. Où, et quoi ? Décrivez ce que vous avez ressenti." },
  { id:"h053", cat:6, type:"open", text:"Que lisez-vous en dehors de ce que vous êtes obligé de lire ? (titres, auteurs, fréquence — soyez précis)" },
  { id:"h054", cat:7, type:"open", text:"La musique — vous l'écoutez en fond, ou vous l'écoutez vraiment ? Quels genres, quels artistes, dans quelles circonstances ?" },
  { id:"h055", cat:6, type:"open", text:"Vous intéressez-vous à quelque chose que personne autour de vous ne partage ?" },
  { id:"h056", cat:6, type:"open", text:"Suivez-vous des personnalités pour leurs idées — pas leur style de vie ? Qui, pourquoi, depuis quand ?" },
  { id:"h057", cat:6, type:"open", text:"Avez-vous un projet — pas un rêve, un projet avec des étapes concrètes que vous suivez ? Décrivez-le." },
  { id:"h058", cat:6, type:"open", text:"Avez-vous voyagé vraiment — pas en vacances organisées, mais seul ou avec un but précis ? Où, quand, ce que ça vous a appris." },
  { id:"h059", cat:6, type:"open", text:"Y a-t-il une compétence que vous avez développée seul — sans cours, sans programme ?" },
  { id:"h060", cat:7, type:"open", text:"Si on vous donnait 3 mois entièrement libres, avec les moyens nécessaires — que feriez-vous ? (pas ce qu'il faudrait faire. Ce que vous feriez.)" },

  // SECTION VI — PARCOURS PROFESSIONNEL (h061–h068) → Cat 6/0
  { id:"h061", cat:6, type:"open", text:"Quel est votre parcours professionnel et de formation — en version honnête, pas la version CV ? (ce que vous avez aimé, raté, contourné, abandonné)" },
  { id:"h062", cat:6, type:"open", text:"Comment votre carrière a-t-elle vraiment commencé ? Qu'est-ce qui s'est passé réellement — pas la version publique ?" },
  { id:"h063", cat:4, type:"open", text:"Ce que vos collaborateurs et supérieurs vous ont dit sur vous — le plus juste, et le plus faux ?" },
  { id:"h064", cat:5, type:"open", text:"Avez-vous déjà eu un mentor ou un responsable que vous avez vraiment respecté ? Pourquoi ?" },
  { id:"h065", cat:6, type:"open", text:"Quelle est votre connaissance réelle du terrain dans votre domaine — au-delà de votre position officielle ?" },
  { id:"h066", cat:3, text:"Si vous deviez décrire votre niveau réel dans votre domaine — pas le niveau officiel, le vrai — où vous situez-vous parmi vos pairs ?" /* 1=top 10% → 5=dans la masse */ },
  { id:"h067", cat:6, type:"open", text:"Qu'est-ce que vous avez évité — dans vos choix professionnels — parce que c'était trop difficile ou risqué ?" },
  { id:"h068", cat:0, type:"open", text:"Avez-vous déjà réussi quelque chose d'important sans l'aide de personne ? Quoi ?" },

  // SECTION VII — MATURITÉ ET CONNAISSANCE DE SOI (h069–h080) → Cat 4/0/6
  { id:"h069", cat:4, type:"open", text:"Votre plus grande force réelle — pas celle que vous mettez en avant habituellement." },
  { id:"h070", cat:4, type:"open", text:"Votre plus grande faiblesse réelle — pas la version polie. La vraie." },
  { id:"h071", cat:4, type:"open", text:"La dernière vraie décision difficile que vous avez prise — quand, quoi, et ce que ça vous a coûté." },
  { id:"h072", cat:4, text:"Êtes-vous capable d'assumer une erreur sans chercher à la justifier ?" /* 1=toujours → 5=j'ai toujours une explication */ },
  { id:"h073", cat:6, type:"open", text:"Avez-vous changé d'avis sur quelque chose d'important récemment — et pourquoi ?" },
  { id:"h074", cat:4, type:"open", text:"Quelqu'un vous a dit quelque chose de difficile à entendre sur vous-même. Comment avez-vous réagi ? Donnez un exemple précis." },
  { id:"h075", cat:0, text:"Faites-vous confiance à votre jugement — ou avez-vous besoin de validation externe pour décider ?" /* 1=grande confiance → 5=j'ai besoin que les autres confirment */ },
  { id:"h076", cat:4, type:"open", text:"Êtes-vous patient — vraiment ? Donnez un exemple où vous l'avez été, et un où vous ne l'avez pas été." },
  { id:"h077", cat:4, type:"open", text:"Qu'est-ce que vous ne supportez pas chez les autres ?" },
  { id:"h078", cat:4, type:"open", text:"Qu'est-ce que vous ne supportez pas chez vous-même ?" },
  { id:"h079", cat:4, type:"open", text:"Quelqu'un vous a-t-il appris quelque chose d'important sur vous — que vous n'auriez pas vu seul ? Qui, quoi, comment ?" },
  { id:"h080", cat:7, type:"open", text:"Si vous deviez décrire votre vie dans 5 ans à quelqu'un qui ne vous connaît pas — honnêtement, pas avec ambition — que diriez-vous ?" },

  // SECTION VIII — LA QUESTION DE FOND (h081–h100) → Cat 7/3/4/5
  { id:"h081", cat:7, type:"open", text:"Qu'est-ce qui vous manque — que vous ne trouvez ni dans votre travail, ni dans vos relations actuelles ?" },
  { id:"h082", cat:7, text:"Êtes-vous en train de faire ce que vous voulez — ou ce qu'on attend de vous ?" /* 1=ce que je veux vraiment → 5=ce qu'on attend de moi */ },
  { id:"h083", cat:3, type:"open", text:"Avez-vous quelque chose à prouver ? À qui ?" },
  { id:"h084", cat:7, type:"open", text:"Qu'est-ce que vous voudriez qu'on pense de vous dans 10 ans — pas professionnellement, humainement ?" },
  { id:"h085", cat:4, type:"open", text:"Êtes-vous quelqu'un de courageux ? Donnez un exemple." },
  { id:"h086", cat:4, type:"open", text:"Avez-vous déjà fait quelque chose dont vous êtes vraiment fier — et que personne ne sait ?" },
  { id:"h087", cat:7, type:"open", text:"Si vous pouviez tout recommencer depuis vos 20 ans — une seule chose à changer. Laquelle ?" },
  { id:"h088", cat:7, type:"open", text:"Qu'est-ce que vous n'avez jamais dit à personne sur vous-même, et que vous pourriez dire ici ?" },
  { id:"h089", cat:5, type:"open", text:"Avez-vous l'impression que les personnes autour de vous vous voient vraiment — ou une version simplifiée de vous ?" },
  { id:"h090", cat:7, type:"open", text:"Qu'est-ce que vous attendez réellement d'un accompagnement — pas ce qu'on vous a dit d'en attendre ?" },
  { id:"h091", cat:7, type:"open", text:"Pourquoi maintenant ? Qu'est-ce qui s'est passé — ou ne s'est pas passé — pour que vous soyez là aujourd'hui ?" },
  { id:"h092", cat:3, type:"open", text:"Qui a décidé que vous entreprendriez cette démarche — vous, ou quelqu'un d'autre ? Soyez honnête." },
  { id:"h093", cat:6, type:"open", text:"Qu'est-ce que vous êtes prêt à changer — vraiment, pas en théorie ?" },
  { id:"h094", cat:3, type:"open", text:"Qu'est-ce que vous refusez de changer — et pourquoi ?" },
  { id:"h095", cat:7, type:"open", text:"Si dans 3 mois vous êtes exactement pareil — qu'est-ce que ça voudra dire sur vous ?" },
  { id:"h096", cat:5, type:"open", text:"Qu'est-ce qu'un proche vous a dit un jour qui vous a vraiment marqué — positivement ou négativement ?" },
  { id:"h097", cat:7, type:"open", text:"Y a-t-il une question que vous auriez voulu qu'on vous pose, et qu'on ne vous a jamais posée ? Posez-la — et répondez-y." },
  { id:"h098", cat:7, type:"open", text:"En une phrase : qui êtes-vous, vraiment ? (la première qui vient)" },
  { id:"h099", cat:7, type:"open", text:"En une phrase : qui voulez-vous être ?" },
  { id:"h100", cat:7, type:"open", text:"Pourquoi êtes-vous là — dans cette démarche, aujourd'hui ? La vraie réponse. Prenez tout le temps qu'il faut." },
];

// ─── SCORING HELPERS ──────────────────────────────────────────────────────────
function computeCatScores(questions, answers) {
  const sums = Array(8).fill(0);
  const counts = Array(8).fill(0);
  questions.forEach(q => {
    const ans = answers[q.id];
    if (typeof ans === "number") {
      sums[q.cat] += ans;
      counts[q.cat]++;
    }
  });
  return sums.map((s, i) => counts[i] > 0 ? s / counts[i] : 0);
}

function rankPersonas(catScores) {
  return PERSONAS.map(p => {
    const dist = Math.sqrt(p.sig.reduce((acc, s, i) => acc + Math.pow(s - catScores[i], 2), 0));
    const maxDist = Math.sqrt(8 * 25);
    const similarity = Math.round(100 * (1 - dist / maxDist));
    return { ...p, dist, similarity };
  }).sort((a, b) => a.dist - b.dist);
}

function interpretScore(catId, score) {
  const concerning = [1, 2, 3];
  if (concerning.includes(catId)) {
    if (score >= 4) return { label: "Niveau élevé — vigilance", color: "#dc2626" };
    if (score >= 2.5) return { label: "Niveau modéré", color: "#d97706" };
    return { label: "Niveau faible — bon signe", color: "#16a34a" };
  } else {
    if (score >= 4) return { label: "Niveau élevé — ressource forte", color: "#16a34a" };
    if (score >= 2.5) return { label: "Niveau modéré", color: "#d97706" };
    return { label: "Niveau faible — à développer", color: "#dc2626" };
  }
}

// ─── RADAR CHART ──────────────────────────────────────────────────────────────
function RadarChart({ scores }) {
  const cx = 200, cy = 200, R = 150;
  const n = 8;
  const axes = CATEGORIES.map((cat, i) => {
    const angle = (i * 2 * Math.PI / n) - Math.PI / 2;
    return { ...cat, angle, x: cx + R * Math.cos(angle), y: cy + R * Math.sin(angle) };
  });
  const rings = [1, 2, 3, 4, 5];
  const ringPaths = rings.map(r => {
    return axes.map(a => {
      const rr = (r / 5) * R;
      return `${cx + rr * Math.cos(a.angle)},${cy + rr * Math.sin(a.angle)}`;
    }).join(" ");
  });
  const dataPoints = axes.map((a, i) => {
    const rr = (Math.min(scores[i] || 0, 5) / 5) * R;
    return `${cx + rr * Math.cos(a.angle)},${cy + rr * Math.sin(a.angle)}`;
  });
  return (
    <svg viewBox="0 0 400 400" style={{ width: "100%", maxWidth: 420, display: "block", margin: "0 auto" }}>
      {ringPaths.map((pts, ri) => (
        <polygon key={ri} points={pts} fill="none" stroke="#e5e7eb" strokeWidth={ri === 4 ? 1.5 : 0.8} />
      ))}
      {axes.map((a, i) => (
        <line key={i} x1={cx} y1={cy} x2={a.x} y2={a.y} stroke="#e5e7eb" strokeWidth={1} />
      ))}
      <polygon points={dataPoints.join(" ")} fill="rgba(37,99,235,0.15)" stroke="#2563eb" strokeWidth={2.5} />
      {axes.map((a, i) => {
        const rr = (Math.min(scores[i] || 0, 5) / 5) * R;
        return <circle key={i} cx={cx + rr * Math.cos(a.angle)} cy={cy + rr * Math.sin(a.angle)} r={5} fill="#2563eb" />;
      })}
      {axes.map((a, i) => {
        const lx = cx + (R + 22) * Math.cos(a.angle);
        const ly = cy + (R + 22) * Math.sin(a.angle);
        const words = a.label.split(" ");
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" fontSize={9.5} fill="#374151" fontFamily="Georgia, serif">
            <tspan x={lx} dy={0}>{a.icon} {words[0]}</tspan>
            {words.slice(1).length > 0 && <tspan x={lx} dy={12}>{words.slice(1).join(" ")}</tspan>}
          </text>
        );
      })}
      {[1,2,3,4,5].map(r => (
        <text key={r} x={cx + 4} y={cy - (r/5)*R + 3} fontSize={8} fill="#9ca3af">{r}</text>
      ))}
    </svg>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function KinexaAudit() {
  const [phase, setPhase] = useState("intro");
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [answers, setAnswers] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [editCatFilter, setEditCatFilter] = useState(-1);
  const [editTypeFilter, setEditTypeFilter] = useState("all");
  const [newQCat, setNewQCat] = useState(0);
  const [newQText, setNewQText] = useState("");
  const [newQType, setNewQType] = useState("scale");
  const [resultTab, setResultTab] = useState("persona");
  const [editDeleteConfirm, setEditDeleteConfirm] = useState(null);

  const scaleQs = useMemo(() => questions.filter(q => !q.type || q.type !== "open"), [questions]);
  const openQs = useMemo(() => questions.filter(q => q.type === "open"), [questions]);

  const scaleAnswered = scaleQs.filter(q => typeof answers[q.id] === "number").length;
  const openAnswered = openQs.filter(q => answers[q.id] && String(answers[q.id]).trim()).length;
  const totalAnswered = scaleAnswered + openAnswered;
  const canSeeResults = scaleAnswered >= Math.max(1, Math.floor(scaleQs.length * 0.25));
  const progress = Math.round((totalAnswered / questions.length) * 100);

  const catScores = useMemo(() => computeCatScores(questions, answers), [questions, answers]);
  const rankedPersonas = useMemo(() => rankPersonas(catScores), [catScores]);
  const topPersona = rankedPersonas[0];

  const currentQ = questions[currentIdx];

  function handleScaleAnswer(val) {
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
    if (currentIdx < questions.length - 1) setCurrentIdx(i => i + 1);
  }

  function handleOpenAnswer(val) {
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  }

  function deleteQuestion(id) {
    setQuestions(qs => qs.filter(q => q.id !== id));
    setAnswers(prev => { const n = { ...prev }; delete n[id]; return n; });
    setEditDeleteConfirm(null);
  }

  function addQuestion() {
    if (!newQText.trim()) return;
    const newQ = {
      id: `q_custom_${Date.now()}`,
      cat: newQCat,
      text: newQText.trim(),
      ...(newQType === "open" ? { type: "open" } : {}),
    };
    setQuestions(qs => [...qs, newQ]);
    setNewQText("");
  }

  const editFiltered = useMemo(() => {
    let qs = editCatFilter === -1 ? questions : questions.filter(q => q.cat === editCatFilter);
    if (editTypeFilter === "scale") qs = qs.filter(q => !q.type || q.type !== "open");
    if (editTypeFilter === "open") qs = qs.filter(q => q.type === "open");
    return qs;
  }, [questions, editCatFilter, editTypeFilter]);

  const SCALE = ["Jamais", "Rarement", "Parfois", "Souvent", "Toujours"];
  const catColor = (id) => CATEGORIES[id]?.color || "#666";
  const isOpen = (q) => q && q.type === "open";

  const S = {
    root: { fontFamily: "system-ui, -apple-system, sans-serif", background: "#ffffff", minHeight: "100vh", color: "#111827", maxWidth: 820, margin: "0 auto", padding: "0 0 80px" },
    header: { borderBottom: "2px solid #111827", padding: "28px 40px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 },
    logo: { fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", color: "#111827" },
    logoSub: { fontFamily: "Georgia, serif", fontSize: 13, color: "#6b7280", marginTop: 2 },
    navBtn: (active) => ({ background: active ? "#111827" : "transparent", color: active ? "#fff" : "#374151", border: "1.5px solid #111827", borderRadius: 6, padding: "7px 18px", fontSize: 13, cursor: "pointer", fontFamily: "system-ui", fontWeight: 500 }),
    page: { padding: "48px 40px" },
    h1: { fontFamily: "Georgia, serif", fontSize: 42, fontWeight: 700, lineHeight: 1.15, marginBottom: 16, color: "#111827" },
    lead: { fontSize: 17, lineHeight: 1.7, color: "#374151", maxWidth: 580, marginBottom: 32 },
    btn: (variant = "primary") => ({ display: "inline-block", background: variant === "primary" ? "#111827" : "#fff", color: variant === "primary" ? "#fff" : "#111827", border: "2px solid #111827", borderRadius: 8, padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "system-ui" }),
    progressBar: { width: "100%", height: 6, background: "#f3f4f6", borderRadius: 99, overflow: "hidden", marginBottom: 8 },
    catPill: (catId) => ({ display: "inline-block", background: catColor(catId) + "18", color: catColor(catId), border: `1.5px solid ${catColor(catId)}40`, borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 600, marginBottom: 24 }),
    openPill: { display: "inline-block", background: "#f9fafb", color: "#6b7280", border: "1.5px solid #e5e7eb", borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 600, marginLeft: 8 },
    questionText: { fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 26, lineHeight: 1.55, color: "#111827", marginBottom: 32, maxWidth: 640 },
    scaleRow: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 },
    scaleBtn: (selected) => ({ flex: 1, minWidth: 80, background: selected ? "#111827" : "#f9fafb", color: selected ? "#fff" : "#374151", border: selected ? "2px solid #111827" : "1.5px solid #e5e7eb", borderRadius: 10, padding: "16px 8px", fontSize: 13, fontWeight: selected ? 700 : 400, cursor: "pointer", textAlign: "center" }),
    textarea: { width: "100%", border: "1.5px solid #d1d5db", borderRadius: 10, padding: "16px 18px", fontSize: 16, fontFamily: "Georgia, serif", outline: "none", resize: "vertical", minHeight: 120, boxSizing: "border-box", lineHeight: 1.6, color: "#111827", background: "#fafafa" },
    navRow: { display: "flex", gap: 12, alignItems: "center", marginTop: 8, flexWrap: "wrap" },
    card: { border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "28px 32px", marginBottom: 20, background: "#fff" },
    tab: (active) => ({ padding: "10px 22px", border: "none", borderBottom: active ? "3px solid #111827" : "3px solid transparent", background: "transparent", color: active ? "#111827" : "#6b7280", fontSize: 14, fontWeight: active ? 700 : 400, cursor: "pointer" }),
    select: { border: "1.5px solid #d1d5db", borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none", background: "#fff", cursor: "pointer", color: "#111827" },
    badge: (color) => ({ display: "inline-block", background: color + "18", color: color, border: `1.5px solid ${color}40`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, marginLeft: 8 }),
    editInput: { width: "100%", border: "1.5px solid #d1d5db", borderRadius: 8, padding: "12px 14px", fontSize: 15, fontFamily: "Georgia, serif", outline: "none", resize: "vertical", minHeight: 80, boxSizing: "border-box" },
  };

  // ── HEADER ───────────────────────────────────────────────────────────────────
  const Header = ({ current }) => (
    <div style={S.header}>
      <div>
        <div style={S.logo}>KINEXA</div>
        <div style={S.logoSub}>Audit Cognitif Dirigeant — Dr Christophe Delong</div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button style={S.navBtn(current === "intro")} onClick={() => setPhase("intro")}>Accueil</button>
        <button style={S.navBtn(current === "test")} onClick={() => { setPhase("test"); }}>Questionnaire</button>
        {canSeeResults && <button style={S.navBtn(current === "results")} onClick={() => setPhase("results")}>Résultats</button>}
        <button style={S.navBtn(current === "edit")} onClick={() => setPhase("edit")}>Éditer</button>
      </div>
    </div>
  );

  // ── INTRO ────────────────────────────────────────────────────────────────────
  if (phase === "intro") {
    return (
      <div style={S.root}>
        <Header current="intro" />
        <div style={S.page}>
          <div style={{ ...S.h1, fontSize: 48 }}>Audit de Surcharge Cognitive</div>
          <p style={S.lead}>
            Ce questionnaire en <strong>{questions.length} questions</strong> explore 8 dimensions fondamentales du fonctionnement mental, corporel et relationnel des cadres dirigeants. Il combine des échelles d'évaluation (<strong>{scaleQs.length} questions notées</strong>) et des questions de réflexion libre (<strong>{openQs.length} questions ouvertes</strong>).
          </p>
          <p style={S.lead}>
            À l'issue, vous obtiendrez votre <strong>profil parmi 10 archétypes</strong>, un radar cognitif détaillé et des recommandations ciblées.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 48 }}>
            {CATEGORIES.map(cat => {
              const cQs = questions.filter(q => q.cat === cat.id);
              const cScale = cQs.filter(q => !q.type || q.type !== "open").length;
              const cOpen = cQs.filter(q => q.type === "open").length;
              return (
                <div key={cat.id} style={{ border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "14px 18px", minWidth: 180, borderLeft: `4px solid ${cat.color}` }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{cat.icon}</div>
                  <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 13, color: "#111827" }}>{cat.label}</div>
                  <div style={{ fontSize: 11.5, color: "#6b7280", marginTop: 4 }}>{cat.desc}</div>
                  <div style={{ fontSize: 11, color: cat.color, marginTop: 6, fontWeight: 600 }}>{cScale} échelles · {cOpen} libres</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <button style={S.btn("primary")} onClick={() => { setCurrentIdx(0); setPhase("test"); }}>
              {totalAnswered > 0 ? `Reprendre (${totalAnswered}/${questions.length})` : "Commencer le questionnaire →"}
            </button>
            {canSeeResults && <button style={S.btn("secondary")} onClick={() => setPhase("results")}>Voir les résultats</button>}
          </div>
          {totalAnswered > 0 && (
            <p style={{ marginTop: 16, fontSize: 13, color: "#6b7280" }}>
              {scaleAnswered} échelles répondues (/{scaleQs.length}) · {openAnswered} questions libres renseignées (/{openQs.length}).
              {canSeeResults ? " Résultats disponibles." : ` Résultats disponibles à partir de ${Math.floor(scaleQs.length * 0.25)} échelles.`}
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── TEST ─────────────────────────────────────────────────────────────────────
  if (phase === "test") {
    const isOpenQ = isOpen(currentQ);
    return (
      <div style={S.root}>
        <Header current="test" />
        <div style={{ padding: "24px 40px 8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>Question {currentIdx + 1} / {questions.length}</span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>{totalAnswered} réponses · {progress}%</span>
          </div>
          <div style={S.progressBar}>
            <div style={{ height: "100%", background: "#111827", width: `${progress}%`, borderRadius: 99, transition: "width 0.3s" }} />
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
            {CATEGORIES.map(cat => {
              const catQs = questions.filter(q => q.cat === cat.id && (!q.type || q.type !== "open"));
              const catAns = catQs.filter(q => typeof answers[q.id] === "number").length;
              const catPct = catQs.length > 0 ? catAns / catQs.length : 0;
              return (
                <div key={cat.id} style={{ flex: 1 }}>
                  <div style={{ height: 4, background: "#f3f4f6", borderRadius: 99 }}>
                    <div style={{ height: "100%", background: cat.color, width: `${catPct * 100}%`, borderRadius: 99 }} />
                  </div>
                  <div style={{ fontSize: 9, color: cat.color, textAlign: "center", marginTop: 2 }}>{cat.icon}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ ...S.page, paddingTop: 32 }}>
          {currentQ ? (
            <>
              <div>
                <span style={S.catPill(currentQ.cat)}>{CATEGORIES[currentQ.cat].icon} {CATEGORIES[currentQ.cat].label}</span>
                {isOpenQ && <span style={S.openPill}>✏️ Réponse libre</span>}
              </div>
              <div style={S.questionText}>{currentQ.text}</div>

              {isOpenQ ? (
                <>
                  <textarea
                    style={S.textarea}
                    placeholder="Prenez le temps de répondre honnêtement…"
                    value={answers[currentQ.id] || ""}
                    onChange={e => handleOpenAnswer(e.target.value)}
                    rows={5}
                  />
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 8, marginBottom: 24 }}>
                    Les réponses libres sont conservées mais ne sont pas scorées automatiquement.
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>
                    1 = Jamais &nbsp;·&nbsp; 5 = Toujours
                  </div>
                  <div style={S.scaleRow}>
                    {SCALE.map((label, i) => (
                      <button key={i} style={S.scaleBtn(answers[currentQ.id] === i + 1)} onClick={() => handleScaleAnswer(i + 1)}>
                        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{i + 1}</div>
                        <div>{label}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div style={S.navRow}>
                <button style={{ ...S.btn("secondary"), padding: "10px 20px", fontSize: 14 }} onClick={() => setCurrentIdx(i => Math.max(0, i - 1))} disabled={currentIdx === 0}>← Précédent</button>
                <button style={{ ...S.btn("secondary"), padding: "10px 20px", fontSize: 14 }} onClick={() => setCurrentIdx(i => Math.min(questions.length - 1, i + 1))} disabled={currentIdx === questions.length - 1}>Suivant →</button>
                {isOpenQ && answers[currentQ.id] && String(answers[currentQ.id]).trim() && (
                  <button style={{ ...S.btn("primary"), padding: "10px 20px", fontSize: 14 }} onClick={() => setCurrentIdx(i => Math.min(questions.length - 1, i + 1))}>Valider →</button>
                )}
              </div>

              {canSeeResults && (
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1.5px solid #e5e7eb" }}>
                  <button style={S.btn("primary")} onClick={() => setPhase("results")}>Voir les résultats →</button>
                </div>
              )}

              {/* Grid navigation */}
              <div style={{ marginTop: 32, paddingTop: 16, borderTop: "1.5px solid #f3f4f6" }}>
                <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Navigation rapide :</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {questions.map((q, i) => {
                    const done = q.type === "open"
                      ? (answers[q.id] && String(answers[q.id]).trim())
                      : typeof answers[q.id] === "number";
                    return (
                      <button key={q.id} onClick={() => setCurrentIdx(i)} style={{
                        width: 24, height: 24, fontSize: 9,
                        border: "1px solid",
                        borderColor: i === currentIdx ? "#111827" : done ? CATEGORIES[q.cat].color : "#e5e7eb",
                        borderRadius: q.type === "open" ? 4 : 99,
                        background: i === currentIdx ? "#111827" : done ? CATEGORIES[q.cat].color + "20" : "#fff",
                        color: i === currentIdx ? "#fff" : "#374151",
                        cursor: "pointer", padding: 0,
                      }}>
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: "#9ca3af", display: "flex", gap: 16 }}>
                  <span>⬭ = question libre</span>
                  <span>● = question notée</span>
                </div>
              </div>
            </>
          ) : (
            <p style={S.lead}>Aucune question disponible.</p>
          )}
        </div>
      </div>
    );
  }

  // ── RESULTS ──────────────────────────────────────────────────────────────────
  if (phase === "results") {
    return (
      <div style={S.root}>
        <Header current="results" />
        <div style={S.page}>
          <div style={{ ...S.h1, marginBottom: 8 }}>Votre profil cognitif</div>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 32 }}>
            Basé sur {scaleAnswered} réponses notées (/{scaleQs.length}) et {openAnswered} réponses libres (/{openQs.length}).
            {scaleAnswered < scaleQs.length && (
              <span> <button style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", padding: 0, fontSize: 14, textDecoration: "underline" }} onClick={() => setPhase("test")}>Compléter</button></span>
            )}
          </p>
          <div style={{ borderBottom: "1.5px solid #e5e7eb", marginBottom: 32, display: "flex", gap: 4, flexWrap: "wrap" }}>
            {[{ key: "persona", label: "Persona" }, { key: "radar", label: "Radar" }, { key: "categories", label: "Catégories" }, { key: "ranking", label: "Classement" }, { key: "open", label: `Réponses libres (${openAnswered})` }].map(t => (
              <button key={t.key} style={S.tab(resultTab === t.key)} onClick={() => setResultTab(t.key)}>{t.label}</button>
            ))}
          </div>

          {resultTab === "persona" && (
            <div>
              <div style={{ border: "3px solid #111827", borderRadius: 16, padding: "32px", marginBottom: 28, background: "#f9fafb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 56 }}>{topPersona.icon}</div>
                  <div>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 700 }}>{topPersona.name}</div>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 16, color: "#6b7280", marginTop: 4, fontStyle: "italic" }}>"{topPersona.tagline}"</div>
                    <span style={{ display: "inline-block", marginTop: 8, background: "#16a34a18", color: "#16a34a", border: "1.5px solid #16a34a40", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>Similarité : {topPersona.similarity}%</span>
                  </div>
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "#374151", marginBottom: 24 }}>{topPersona.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                  <div style={{ background: "#f0fdf4", borderRadius: 10, padding: "16px 18px" }}>
                    <div style={{ fontWeight: 700, color: "#16a34a", marginBottom: 8, fontSize: 13 }}>✓ Forces</div>
                    {topPersona.strengths.map((s, i) => <div key={i} style={{ fontSize: 14, color: "#374151", marginBottom: 6, lineHeight: 1.5 }}>· {s}</div>)}
                  </div>
                  <div style={{ background: "#fef2f2", borderRadius: 10, padding: "16px 18px" }}>
                    <div style={{ fontWeight: 700, color: "#dc2626", marginBottom: 8, fontSize: 13 }}>⚠ Risques</div>
                    {topPersona.risks.map((r, i) => <div key={i} style={{ fontSize: 14, color: "#374151", marginBottom: 6, lineHeight: 1.5 }}>· {r}</div>)}
                  </div>
                  <div style={{ background: "#eff6ff", borderRadius: 10, padding: "16px 18px" }}>
                    <div style={{ fontWeight: 700, color: "#2563eb", marginBottom: 8, fontSize: 13 }}>→ Recommandations</div>
                    {topPersona.recs.map((r, i) => <div key={i} style={{ fontSize: 14, color: "#374151", marginBottom: 6, lineHeight: 1.5 }}>· {r}</div>)}
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Comparaison avec la signature {topPersona.name}</div>
              {CATEGORIES.map((cat, i) => {
                const userScore = catScores[i];
                const sigScore = topPersona.sig[i];
                return (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{cat.icon} {cat.label}</span>
                      <span style={{ fontSize: 12, color: "#6b7280" }}>Vous : <strong style={{ color: cat.color }}>{userScore.toFixed(1)}</strong> · Profil : {sigScore.toFixed(1)}</span>
                    </div>
                    <div style={{ position: "relative", height: 8, background: "#f3f4f6", borderRadius: 99 }}>
                      <div style={{ height: 8, background: cat.color, width: `${(userScore / 5) * 100}%`, borderRadius: 99, opacity: 0.7 }} />
                      <div style={{ position: "absolute", top: -3, left: `calc(${(sigScore / 5) * 100}% - 1px)`, width: 2, height: 14, background: "#111827", borderRadius: 99 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {resultTab === "radar" && (
            <div>
              <RadarChart scores={catScores} />
              <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                {CATEGORIES.map((cat, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 99, background: cat.color }} />
                    <span>{cat.icon} {cat.label} : <strong>{catScores[i].toFixed(1)}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resultTab === "categories" && (
            <div>
              {CATEGORIES.map((cat, i) => {
                const score = catScores[i];
                const interp = interpretScore(i, score);
                const catScaleQs = questions.filter(q => q.cat === i && (!q.type || q.type !== "open"));
                const catOpenQs = questions.filter(q => q.cat === i && q.type === "open");
                const catScaleAns = catScaleQs.filter(q => typeof answers[q.id] === "number").length;
                const catOpenAns = catOpenQs.filter(q => answers[q.id] && String(answers[q.id]).trim()).length;
                return (
                  <div key={i} style={{ ...S.card, borderLeft: `5px solid ${cat.color}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700 }}>{cat.icon} {cat.label}</div>
                        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{cat.desc}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{catScaleAns}/{catScaleQs.length} échelles · {catOpenAns}/{catOpenQs.length} libres</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 36, fontWeight: 700, fontFamily: "Georgia, serif", color: cat.color }}>{score.toFixed(1)}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af" }}>sur 5</div>
                      </div>
                    </div>
                    <div style={{ height: 10, background: "#f3f4f6", borderRadius: 99, overflow: "hidden", marginBottom: 10 }}>
                      <div style={{ height: "100%", background: cat.color, width: `${(score / 5) * 100}%`, borderRadius: 99 }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 99, background: interp.color }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: interp.color }}>{interp.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {resultTab === "ranking" && (
            <div>
              {rankedPersonas.map((p, rank) => (
                <div key={p.id} style={{ ...S.card, display: "flex", alignItems: "center", gap: 16, padding: "18px 24px", borderLeft: rank === 0 ? "5px solid #111827" : "1.5px solid #e5e7eb", flexWrap: "wrap" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: rank === 0 ? "#111827" : "#9ca3af", minWidth: 24 }}>#{rank + 1}</div>
                  <div style={{ fontSize: 28 }}>{p.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 16 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontStyle: "italic" }}>"{p.tagline}"</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: rank === 0 ? "#16a34a" : "#6b7280" }}>{p.similarity}%</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>similarité</div>
                  </div>
                  <div style={{ width: "100%", display: "flex", gap: 3, marginTop: 4 }}>
                    {p.sig.map((s, i) => (
                      <div key={i} style={{ flex: 1 }}>
                        <div style={{ height: 4, background: "#f3f4f6", borderRadius: 99 }}>
                          <div style={{ height: "100%", background: CATEGORIES[i].color, width: `${(s/5)*100}%`, borderRadius: 99, opacity: 0.7 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {resultTab === "open" && (
            <div>
              <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
                {openAnswered} réponse{openAnswered > 1 ? "s" : ""} libre{openAnswered > 1 ? "s" : ""} sur {openQs.length} questions.
              </p>
              {CATEGORIES.map(cat => {
                const catOQs = openQs.filter(q => q.cat === cat.id && answers[q.id] && String(answers[q.id]).trim());
                if (catOQs.length === 0) return null;
                return (
                  <div key={cat.id} style={{ ...S.card, borderLeft: `4px solid ${cat.color}`, marginBottom: 16 }}>
                    <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>{cat.icon} {cat.label}</div>
                    {catOQs.map(q => (
                      <div key={q.id} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f3f4f6" }}>
                        <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: "#374151", marginBottom: 8, lineHeight: 1.5, fontStyle: "italic" }}>{q.text}</div>
                        <div style={{ fontSize: 15, color: "#111827", lineHeight: 1.7, background: "#f9fafb", borderRadius: 8, padding: "12px 16px", borderLeft: `3px solid ${cat.color}` }}>
                          {answers[q.id]}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
              {openAnswered === 0 && (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af" }}>
                  Aucune réponse libre renseignée. <button style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", textDecoration: "underline", fontSize: 14 }} onClick={() => setPhase("test")}>Compléter le questionnaire</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── EDIT ─────────────────────────────────────────────────────────────────────
  if (phase === "edit") {
    return (
      <div style={S.root}>
        <Header current="edit" />
        <div style={S.page}>
          <div style={S.h1}>Éditeur de questions</div>
          <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 28 }}>
            {questions.length} questions au total — {scaleQs.length} à échelle + {openQs.length} réponses libres.
          </p>

          {/* Add question */}
          <div style={{ ...S.card, background: "#f9fafb", marginBottom: 32 }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>+ Ajouter une question</div>
            <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
              <select style={S.select} value={newQCat} onChange={e => setNewQCat(+e.target.value)}>
                {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>)}
              </select>
              <select style={S.select} value={newQType} onChange={e => setNewQType(e.target.value)}>
                <option value="scale">Échelle 1–5</option>
                <option value="open">Réponse libre</option>
              </select>
            </div>
            <textarea style={S.editInput} placeholder="Rédigez votre question ici…" value={newQText} onChange={e => setNewQText(e.target.value)} />
            <div style={{ marginTop: 12 }}>
              <button style={{ ...S.btn("primary"), padding: "11px 24px", fontSize: 14, opacity: newQText.trim() ? 1 : 0.4 }} onClick={addQuestion} disabled={!newQText.trim()}>
                Ajouter la question
              </button>
            </div>
          </div>

          {/* Filters */}
          <div style={{ borderBottom: "1.5px solid #e5e7eb", marginBottom: 12, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <button style={S.tab(editCatFilter === -1)} onClick={() => setEditCatFilter(-1)}>Toutes ({questions.length})</button>
            {CATEGORIES.map(cat => (
              <button key={cat.id} style={S.tab(editCatFilter === cat.id)} onClick={() => setEditCatFilter(cat.id)}>
                {cat.icon} ({questions.filter(q => q.cat === cat.id).length})
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {[["all", "Toutes"], ["scale", "Échelles"], ["open", "Libres"]].map(([v, l]) => (
              <button key={v} style={{ ...S.navBtn(editTypeFilter === v), padding: "5px 14px", fontSize: 12 }} onClick={() => setEditTypeFilter(v)}>{l}</button>
            ))}
          </div>

          {/* Question list */}
          <div>
            {editFiltered.map((q) => {
              const globalIdx = questions.findIndex(x => x.id === q.id);
              const cat = CATEGORIES[q.cat];
              const isCustom = q.id.startsWith("q_custom_");
              const isOpenQ = q.type === "open";
              const hasAns = isOpenQ ? (answers[q.id] && String(answers[q.id]).trim()) : typeof answers[q.id] === "number";
              return (
                <div key={q.id} style={{ ...S.card, padding: "16px 18px", borderLeft: `4px solid ${cat.color}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ color: "#9ca3af", fontSize: 12, minWidth: 28, paddingTop: 3 }}>#{globalIdx + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 6, display: "flex", flexWrap: "wrap", gap: 4 }}>
                      <span style={{ ...S.catPill(q.cat), marginBottom: 0, fontSize: 11 }}>{cat.icon} {cat.label}</span>
                      {isOpenQ && <span style={S.openPill}>✏️ Libre</span>}
                      {isCustom && <span style={{ ...S.badge("#2563eb") }}>Perso</span>}
                      {hasAns && <span style={{ ...S.badge("#16a34a") }}>{isOpenQ ? "Répondu" : `Répondu : ${answers[q.id]}`}</span>}
                    </div>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.55, color: "#111827" }}>{q.text}</div>
                  </div>
                  <div>
                    {editDeleteConfirm === q.id ? (
                      <div style={{ display: "flex", gap: 6, flexDirection: "column" }}>
                        <span style={{ fontSize: 12, color: "#dc2626" }}>Confirmer ?</span>
                        <button style={{ background: "#dc2626", border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", padding: "6px 12px", fontSize: 12 }} onClick={() => deleteQuestion(q.id)}>Supprimer</button>
                        <button style={{ background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 6, color: "#374151", cursor: "pointer", padding: "6px 12px", fontSize: 12 }} onClick={() => setEditDeleteConfirm(null)}>Annuler</button>
                      </div>
                    ) : (
                      <button style={{ background: "none", border: "1.5px solid #fee2e2", borderRadius: 6, color: "#dc2626", cursor: "pointer", padding: "6px 12px", fontSize: 13 }} onClick={() => setEditDeleteConfirm(q.id)}>✕</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {editFiltered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af" }}>Aucune question dans ce filtre.</div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
