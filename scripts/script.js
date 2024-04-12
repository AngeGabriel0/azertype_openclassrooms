// Cette fonction affiche la proposition actuelle dans la div .zoneProposition
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition");
    zoneProposition.innerText = proposition;
}

/** Pré-codé par le formateur
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}


// Cette fonction affiche le score actuel et le nombre total de propositions dans la div .zoneScore
function afficherResultat(score, i) {
    let spanScore = document.querySelector(".zoneScore span")
    let affichageScore = ` ${score} /  ${i}`
    spanScore.innerText = affichageScore
}

 /** 
* Fonction de validation du nom
* @param {string} nom : le nom du joueur
* @throws {Error} si le nom ne contient pas au moins 2 caractères
*/

 function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom doit contenir au moins 2 caractères");
    }
}

 /** 
* Fonction de validation de l'email
* l'expression régulière 
* @param {string} nom : l'email du joueur
* @throws {Error} si l'email n'est pas valide
*/

function validerEmail(email) {
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(email)) {
        throw new Error("L'email n'est pas valide");
    }
}

function afficherMessageErreur(message) {
   
    let spanErreurMessage = document.getElementById("erreurMessage");

    if(!spanErreurMessage) {
        let popup = document.querySelector(".popup");
        spanErreurMessage = document.createElement("span");
        spanErreurMessage.id = "erreurMessage";

        popup.append(spanErreurMessage);
    }

    spanErreurMessage.innerText = message;
}

// Cette fonction gère l'affichage du popup (formulaire) lors du clic sur le bouton "Partager"
function gererFormulaire(scoreEmail) {

    try {
        let baliseNom = document.getElementById("nom");
        let nom = baliseNom.value;
        validerNom(nom)

        let baliseEmail = document.getElementById("email");
        let email = baliseEmail.value;
        validerEmail(email)
        afficherMessageErreur("");
        afficherEmail(nom, email, scoreEmail);

    } catch (error) {
        afficherMessageErreur(error.message);
    }
}

// Cette fonction lance le jeu
function lancerJeu() {
    // Initialisation du score et de l'index de la proposition actuelle
    let score = 0;
    let i = 0
    let listePropositions = listeMots;
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