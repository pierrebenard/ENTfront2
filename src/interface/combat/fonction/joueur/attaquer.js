
import { typeArme } from "../../typeArme";

import { recupActionArme, recupIdArme } from "./recupActionArme";
import { calculAttaqueJoueur } from "./calculAttaqueJoueur";
import { calculDefenseEnnemi } from "./calculDefenseEnnemi";
import { animation } from "./animation";

export const attaquer = (choix, storeEnnemis, storeJoueurs, lexiqueArme, storeInventaire, storeCombat, joueurUtilisableSet, tourSet, ennemiEnVieSet, ennemiEnVie, nom, historique, historiqueSet) => {

        //console.log('storeJoueurs : ', storeJoueurs);

        ennemiEnVieSet(nom);
        // RECUPERATION ACTION & ID ARME
        const id = recupIdArme(storeJoueurs, storeInventaire, choix);

        // VERIFICATION TYPE ARME
        typeArme[0].offensive.forEach((offensive) => {
            if (offensive == id || id == 'main') {

                // CALCUL ATTAQUE JOUEUR BRUT
                const attaqueBrut = calculAttaqueJoueur(storeJoueurs);

                // CALCUL DEFENSE ENNEMI BRUT
                const defenseEnnemi = calculDefenseEnnemi(storeEnnemis);
                //console.log('attaqueBrut ', attaqueBrut, ' - defenseEnnemi ', defenseEnnemi, ' = ', attaqueBrut - defenseEnnemi);
        
                let attaqueNet = parseInt(attaqueBrut - defenseEnnemi);
                if (attaqueNet <= 0) {attaqueNet = 1;}

                //console.log('attaque Net : ', attaqueNet);

                const vie = storeEnnemis.vie;

                //console.log('vie : ', vie, ' , ', vie - attaqueNet);

                storeEnnemis.retirer('vie', attaqueNet);

                historiqueSet([...historique, {
                    icone: storeJoueurs.imgIcone,
                    couleurFond: 'rgb(109, 255, 109)',
                    couleurPolice: 'black',
                    texte: `${storeJoueurs.nom} a attaqué ${storeEnnemis.nom} avec l'item ${id} pour des dégat de ${attaqueNet}PV. La vie initiale de ${storeEnnemis.vie}PV baisse à ${storeEnnemis.vie - attaqueNet}PV.`,
                    resume: `${storeJoueurs.nom} => ${storeEnnemis.nom} | vie: ${storeEnnemis.vie} - attaque: ${attaqueNet} = ${storeEnnemis.vie - attaqueNet}PV.`,
                }]);

                if (vie - attaqueNet <= 0) {
                    const nouveauTableau = nom.filter(item => item !== storeEnnemis.nom);
                    ennemiEnVieSet(nouveauTableau);
                    console.log('nouveauTableau : ', nouveauTableau);
                }

                // ANIMATION
                animation(storeJoueurs);

                tourSet('ennemi(s)');


                if (storeEnnemis.vie < 0) {

                    storeEnnemis.vie = 0;
                    storeCombat.retirer('nombreEnnemi', -1);

                    // drop item

                    let ligne;

                    storeEnnemis.itemDropable.forEach(item => {
                        let id = item.id;
                        let img = item.img;
                        let action = item.action;
                        let description = item.description;
                        let important = item.important;
                        let nom = item.nom;
                        let valeur = item.valeur;
                        let type = item.type;
                        let quantite = Math.floor(Math.random() * (item.quantite.max - item.quantite.min + 1)) + item.quantite.min;

                        ligne = {
                            id: id, 
                            quantite: quantite, 
                            img: img, 
                            description: description, 
                            action: action,
                            important: important,
                            nom: nom,
                            valeur: valeur,
                            type: type,
                        };

                        //console.log('ligne a ajouter :', ligne);

                        //itemGagne.item.push(ligne);
                    });

                    if (storeCombat.nombreEnnemi <= 0) {
                        //itemGagne.etat = 'oui';
                    }
                    
                }
            }
        });
}