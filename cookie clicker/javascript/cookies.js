/*-----------------------------------------------------------------------------*\
                                variables
\*-----------------------------------------------------------------------------*/
$amelioclick = document.getElementById("amelioclick");
$autoclick = document.getElementById("autoclick");
$bouton = document.getElementById("bouton");
$error = document.getElementById("error");
$multiplicateur = document.getElementById("multiplicateur");
$score = document.getElementById("score");

amelio = 1000;
nbMultiplicateur = 1;
nbMultiplicateurAmelioAutoclick = 1;
score = 0;

/*-----------------------------------------------------------------------------*\
            affichage et calcule du score et du contenu des bouttons
\*-----------------------------------------------------------------------------*/
//affichage du score
function afficherScore() {
    $score.innerHTML = "Score : " + score + " cookies";
}

//affiche le mombre multiplicateur
function afficherNbMultiplicateur() {
    $multiplicateur.innerHTML = "Multiplicateur x" + nbMultiplicateur + " (prix du prochain verre de lait : " + prix() + ")";
}

//affichage du prix du click auto
function afficherPrixAutoclick(){
    $autoclick.innerHTML = "Acheter un autoclick de " + amelioration() + " secondes au prix de " + autoclickprix() + " cookies";
}

//affiche le prix de l augmentation de duree de l autoclick
function afficherPrixAmelioAutoclick(){
    $amelioclick.innerHTML = "Acheter une augmentation de la duree de l autoclic d une seconde pour " + prixamelioclick() + " cookies";
}

//mise a jour du score a chaque clique
function clic() {
    score = score + nbMultiplicateur;
    afficherScore();
}

/*----------------------------------------------------------------------*\
       calcule du prix des ameliorations et de la duree de l autoclic
\*----------------------------------------------------------------------*/

//calcule le prix des augmentations
function prix() {
    return 50 * (nbMultiplicateur * nbMultiplicateur * 0.2);
}

//calcule le prix de la prochaine amelioration de l autoclic
function autoclickprix(){
    return Math.round(200 * (nbMultiplicateurAmelioAutoclick * 0.40));
}

//prix pour augmenter la duree du clic auto
function prixamelioclick(){
    return Math.round(500 * (nbMultiplicateurAmelioAutoclick * 0.5));
}

//calcule de la duree de l autoclick
function amelioration(){
    return nbMultiplicateurAmelioAutoclick +9;
}

/*----------------------------------------------------------------------*\
                          achat des ameliorations
\*----------------------------------------------------------------------*/

//achete une amelioration et retire du score le prix de l amelioration
function acheterMultiplicateur() {
    if (score >= prix()) {
        score = score - prix();
        nbMultiplicateur = nbMultiplicateur + 1;
        afficherNbMultiplicateur();
        afficherScore();
    } else {
        error();
    }
}

//acheter une augmentation de la duree d autoclick et retire le prix du score
function acheterMultiplicateurAutoclick(){
    if (score >= prixamelioclick()){
        score = score - prixamelioclick();
        nbMultiplicateurAmelioAutoclick = nbMultiplicateurAmelioAutoclick +1;
        afficherPrixAmelioAutoclick();
        afficherPrixAutoclick();
        afficherScore();
    } else {
        error();
    }
}

//achete un autoclic et retire du score le prix de l amelioration
function acheterAutoclick() {
    if (score >= autoclickprix()) {
        score = score - autoclickprix();
        afficherPrixAutoclick();
        autoclicker();
        stopintervall();
    } else {
        error();
    }
}

/*----------------------------------------------------------------------*\
            interval entre les clic et duree du clic auto
\*----------------------------------------------------------------------*/

//interval entre chaque clic auto
function autoclicker(){
    $stop = setInterval($bouton.onclick,500);
}

//duree du click auto
function stopintervall(){
    setTimeout(stopint,(9000 + (amelio * nbMultiplicateurAmelioAutoclick)));
}

//stop le click auto
function stopint(){
    clearInterval($stop);
}

/*----------------------------------------------------------------------*\
                  message d erreur
\*----------------------------------------------------------------------*/

//affiche les message d erreur pendant quelques secondes
function error(){
    $error.innerHTML = "votre score est insufisant !";
    setTimeout(function(){
        $error.innerHTML = ''
    },3000);
}

$amelioclick.onclick = acheterMultiplicateurAutoclick;
$bouton.onclick = clic;
$multiplicateur.onclick = acheterMultiplicateur;
$autoclick.onclick = acheterAutoclick;
afficherScore();
afficherNbMultiplicateur();
afficherPrixAutoclick();
afficherPrixAmelioAutoclick();