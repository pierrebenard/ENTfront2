import create from 'zustand';
import coffre from '../../asset/stockage/coffre.png';

import { pommeURL, epeeURL, bouclierURL, casqueURL, plastronURL, jambiereURL, epauliereURL, nikeURL } from '../../graphisme/item/item';

const heightCoffre = 10;
const widthCoffre = 10;

const oncheStore = create((set) => ({
    stockage: [
        {
            zoneX: 0, zoneY: 0, zoneZ: 0,
            x: 100, y: 300,
            idStockage: '1', type: 'coffre',
            img: coffre,
            height: heightCoffre, width: widthCoffre,
            inventaire: [
                { equipe: 0, action: 5, important: 'non', id: 'pomme', nom: 'Pomme', quantite: 15, img: pommeURL, description: 'fdp.', valeur: 2, type: 'consomable', poid: 1},
            ],
        },
        {
            zoneX: 0, zoneY: -1, zoneZ: 0,
            x: 700, y: 300,
            idStockage: '2', type: 'coffre',
            img: coffre,
            height: heightCoffre, width: widthCoffre,
            inventaire: [
                { equipe: 0, action: 5, important: 'non', id: 'epee', nom: 'Epée', quantite: 5, img: epeeURL, description: 'fdp.', valeur: 50, type: 'arme', poid: 10},
                { equipe: 0, action: 5, important: 'non', id: 'bouclier', nom: 'Bouclier', quantite: 5, img: bouclierURL, description: 'fdp.', valeur: 30, type: 'arme', poid: 17},
            ],
        },
    ],

    ajouter: (champ, valeur) => {
        set((state) => ({
            ...state,
            [champ]: state[champ] + valeur,
        }));
    },

    retirer: (champ, valeur) => {
        set((state) => ({
            ...state,
            [champ]: state[champ] - valeur,
        }));
    },

    ajouterQuantiteItem: (id, champ, nombre, idStockage) => {
        set((state) => ({
            ...state,
            stockage: state.stockage.map((stock) => {
                if (stock.idStockage === idStockage) {
                    return {
                        ...stock,
                        inventaire: stock.inventaire.map((item) =>
                            item.id === id ? { ...item, [champ]: item[champ] + nombre } : item
                        ),
                    };
                }
                return stock;
            }),
        }));
    },

    retirerQuantiteItem: (id, champs, valeur, idStockage) => {
        console.log('id : ', id);
        console.log('champs : ', champs);
        console.log('valeur : ', valeur);
        console.log('idStockage : ', idStockage);
        set((state) => ({
            stockage: state.stockage.map((stockageElement) => 
                stockageElement.idStockage === idStockage ? {
                    ...stockageElement,
                    inventaire: stockageElement.inventaire.map((inventaireElement) => 
                        inventaireElement.id === id && inventaireElement[champs] !== undefined ? {
                            ...inventaireElement,
                            [champs]: inventaireElement[champs] - valeur,
                        } : inventaireElement
                    ),
                } : stockageElement
            ),
        }));
    },
    
    
    ajouterLigneInventaire: (nouvelItem, idStockage) => {
        set((state) => ({
            ...state,
            stockage: state.stockage.map((stock) => {
                if (stock.idStockage === idStockage) {
                    return {
                        ...stock,
                        inventaire: [...stock.inventaire, nouvelItem],
                    };
                }
                return stock;
            }),
        }));
    },
    
    retirerLigneInventaire: (id, idStockage) => {
        set((state) => ({
            ...state,
            stockage: state.stockage.map((stock) => {
                if (stock.idStockage === idStockage) {
                    return {
                        ...stock,
                        inventaire: stock.inventaire.filter((item) => item.id !== id),
                    };
                }
                return stock;
            }),
        }));
    },

    calculerPoid: () => {
        let globalPoids = 0;

        set((state) => ({
            ...state,
            stockage: state.personnages.map((perso) => {
                let localPoids = 0;
                const newInventaire = perso.inventaire.map((item) => {
                    const lignePoids = item.quantite * item.poid;
                    localPoids += lignePoids;
                    return item;
                });

                return {
                    ...perso,
                    inventaire: newInventaire,
                };
            }),
        }));
    },
}));

export default oncheStore;