import {ICheckGem, IGear} from "./interfaces";
import {listOfSocketItems, metaGemList,} from "../../gameDataReferences/listOfSocketedItems";


// 3shirt, 12;13trinkets, 14back, 17relic/libram, 18tabard
const ignoreSlots = [3, 12, 13, 14, 17, 18,];

// gray 55
// green 60
// blue 70
// epic 100
function checkQualityOfGems(gear: ICheckGem) {
    // return if gem has the highest itemlvl or gear has no gems
    if (!gear.gems) return {...gear};
    // {gems}
    const updatedGems = gear.gems?.map((gem) => {
        // gemPos. Meta Gems are always iLv 70 and on Pos 0.
        if (gem.itemLevel === 100 || metaGemList.includes(gem.id)) {
            return {
                ...gem,
                metaGem: null
            };
        }
        return {
            ...gem,
            metaGem: {
                note: 'Not highest quality'
            }
        };
    });
    return {
        ...gear,
        gems: {...updatedGems}
    };
}

function checkIfGemsExist(gear: IGear) {
    if (ignoreSlots.includes(gear.slot)) {
        return {
            ...gear,
            metaGem: null
        };
    }
    // check if gear is not socketed.
    const amountOfSocketsToGear = listOfSocketItems[gear.id] || 0;
    if (gear?.gems?.length === amountOfSocketsToGear || amountOfSocketsToGear === 0) {
        return {
            ...gear,
            metaGem: null
        };
    }
    return {
        ...gear,
        metaGem: {
            error: `Missing ${amountOfSocketsToGear} Sockets`
        }
    };
}

const checkGems = (gear: IGear) => {
    // {...gear, metaGem}
    const gemsExist: ICheckGem = checkIfGemsExist(gear);
    // { ...gem, metaGem}
    const updatedGems = checkQualityOfGems(gemsExist);
    return {
        ...updatedGems,
    };
};

export default checkGems;
