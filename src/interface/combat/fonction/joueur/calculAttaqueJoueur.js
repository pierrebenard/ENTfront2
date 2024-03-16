
import { lexiqueBadge } from "../../../../variableGlobal/item/badge/lexiqueBadge";

export const calculAttaqueJoueur = (storeJoueurs) => {

    const attaque = storeJoueurs[0].attaque;
    const courage = storeJoueurs[0].courage;
    const niveau = storeJoueurs[0].niveau;
    const testo = storeJoueurs[0].testo;

    const joie = storeJoueurs[0].joie;
    const tristesse = storeJoueurs[0].tristesse;
    const peur = storeJoueurs[0].peur;
    const colere = storeJoueurs[0].colere;

    //  CALCUL ATTAQUE STAT
    var tauxNiveau = niveau / 10 + 1;
    var tauxColere = colere / 10 + 1;
    var tauxTesto = (testo / 10) * tauxColere + 1;

    var attaqueStat = attaque;

    //console.log('Attaque stat : ', attaqueStat);

    // PROBABILITE COUP CRITIQUE
    const randomValue = Math.random();
    if (randomValue < 1 / courage) {
        attaqueStat = attaqueStat * 2;
        //console.log('Attaque apres probabilité : ', attaqueStat);
    }

    //CALCUL ATTAQUE NET
    var attaqueHumeur = 0;
    var tauxJoie = 0;
    var tauxTristesse = 0;
    var tauxPeur = 0;

    if (joie > 0) {tauxJoie = joie / 100 + 1;} else {tauxJoie = 0;}
    if (tristesse > 0) {tauxTristesse = tristesse / 100 + 1;} else {tauxTristesse = 0;}
    if (peur > 0) {tauxPeur = peur / 100 + 1;} else {tauxPeur = 0;}

    let attaqueJoie = 0;
    let attaquePeur = 0;
    let attaqueTristesse = 0;

    if (tauxJoie > 0) {attaqueJoie = attaqueStat * tauxJoie;}
    if (tauxTristesse > 0) {attaqueTristesse = attaqueStat / tauxTristesse;}
    if (tauxPeur > 0) {attaquePeur = attaqueStat / tauxPeur;}

    let compteur = 0;

    if (attaqueJoie > 0) {attaqueHumeur = attaqueHumeur + attaqueJoie; compteur++}
    if (attaqueTristesse > 0) {attaqueHumeur = attaqueHumeur + attaqueTristesse; compteur++}
    if (attaquePeur > 0) {attaqueHumeur = attaqueHumeur + attaquePeur; compteur++}

    if (compteur > 0) {attaqueHumeur = parseInt(attaqueHumeur / compteur);} else {attaqueHumeur = attaqueStat}

    attaqueStat = (attaqueHumeur * tauxNiveau) * tauxTesto;

    // VERIFICATION BADGE
    for (let i = 0; i < storeJoueurs.badge; i++) {
        const badge = storeJoueurs.badge[i];
        if (badge.id == 'chat') {
            attaqueStat = attaqueStat * lexiqueBadge.chat.consequence.action;
        }
    }

    return attaqueHumeur;
}