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

//Les fonctions tempsEcouleJeu et verifierFinJeu permettent de calculer le temps écoulé pendant le jeu, et d'indiquer la vitesse de frappe (mots par minute) --> A compléter

let nombreCaracteres = listePropositions.join("").length; // Calcule le nombre de caractères dans la liste des propositions


function tempsEcouléJeu() {
    debutJeu = Date.now();
    inputEcriture.addEventListener("click", () => {
        debutJeu = Date.now();
        
        intervalId = setInterval(verifierFinJeu, 1000); // Vérifie chaque seconde si le jeu est fini
    })
}

function verifierFinJeu() {
    let zoneProposition = document.querySelector(".zoneProposition");

    if (zoneProposition.innerText === "Le jeu est fini") {
    clearInterval(intervalId); // Arrête la vérification
    let tempsEcoule = (Date.now() - debutJeu) / 1000; // Convertit le temps en secondes

    //Affichage du temps écoulé et de la vitesse de frappe juste en dessous du score, en italique
    let spanScore = document.querySelector(".zoneScore");
    spanScore.innerHTML += `<br><i>Le temps écoulé est de ${tempsEcoule} secondes, soit une vitesse de frappe de ${Math.round(nombreCaracteres / totalMots / tempsEcoule * 60)} mots par minute.</i>`;
}
}