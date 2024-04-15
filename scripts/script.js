/** Idées d'améliorations
 *  1 : Insérer la vitesse de dactylographie (en mots / minute) dans le score : remplacer les mots par minute en nombre de caractères tapés au total (voir function.js)
 * 2 : Ajouter un bouton "Rejouer" pour recommencer une partie
 * 3 : Ajouter un mode entraînement, pour s'entraîner sur des mots ou des phrases sans la pression du score
 * 4 : Ajouter un minuteur pour limiter le temps de jeu
 * 5 : Ajouter un bouton "Commencer" pour lancer le jeu
 */

    let debutJeu;
    let totalMots = listeMots.length;
    let score = 0;
    let i = 0
    let listePropositions = listeMots;

// Cette fonction lance le jeu
function lancerJeu() {
    // Initialisation du score et de l'index de la proposition actuelle
    
    initAddEventListenerPopup();
    // Récupération des éléments du DOM nécessaires
    let boutonValidation = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")

    //Amélioration n°1 : Valider la proposition en appuyant sur la touche "Entrée"
    inputEcriture.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            boutonValidation.click();
        }
    });

    // Affichage de la première proposition
    afficherProposition(listePropositions[i]);
    tempsEcouléJeu();

    // Ajout d'un écouteur d'événements sur les boutons radio Mots et Phrases
    let radioMotsEtPhrases = document.querySelectorAll(".optionSource input");
    for (let index = 0; index < radioMotsEtPhrases.length; index++) {
        radioMotsEtPhrases[index].addEventListener("change", (event) => {
            if (event.target.value === "1") {
                listePropositions = listeMots;
            } else {
                listePropositions = listePhrases;

            }
            afficherProposition(listePropositions[i]);
        })
    }

    // Ajout d'un écouteur d'événements sur le bouton de validation
    boutonValidation.addEventListener("click", () => {
        // Si la valeur entrée par l'utilisateur correspond à la proposition actuelle, le score est augmenté
        if (inputEcriture.value === listePropositions[i]) {
            score++;
        }
        // L'index de la proposition actuelle est augmenté
        i++;
        // Affichage du score et de la proposition suivante
        afficherResultat(score, i);
        inputEcriture.value = "";
        afficherProposition(listePropositions[i]);

        // Si toutes les propositions ont été faites, le jeu est terminé
        if (i === listePropositions.length) {
            afficherProposition("Le jeu est fini")
            boutonValidation.disabled = true
            verifierFinJeu();
        } else {
            // Sinon, la prochaine proposition est affichée
            afficherProposition(listePropositions[i])
        }

    })

    // POP-UP : Cette fonction affiche le popup lors du clic sur le bouton "Partager"
    let boutonPartager = document.querySelector(".zonePartage button");
    boutonPartager.addEventListener("click", () => {
        let popup = document.querySelector(".popup");
        popup.classList.add("active");
    });

    // Récupération des éléments du formulaire et empêchement du rechargement de la page lors de la soumission
    let form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let scoreEmail = `${score} / ${i}`;
        gererFormulaire(scoreEmail);
    });

    //Affichage du score initial
    afficherResultat(score, i);

}