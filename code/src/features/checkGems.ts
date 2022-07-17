import {ICheckGem, ICheckGemQuality, IGear} from "../interfaces";
import {listOfSocketItems,} from "../util/listOfSocketedItems";


// 3shirt, 12;13trinkets, 14back, 17relic/libram, 18tabard
const ignoreSlots = [3, 12, 13, 14, 17, 18,];

// gray 55
// green 60
// blue 70
// epic 100
function checkQualityOfGems(gear: IGear) {
    return gear?.gems?.map((gem) => {
        if (gem.itemLevel === 100) {
            return {
                gem,
                meta: null
            };
        }
        return {
            gem,
            meta: {
                note: 'Not highest quality'
            }
        };
    });
}

function checkIfGemsExist(gear: IGear) {
    if (ignoreSlots.includes(gear.slot)) {
        return {
            gear,
            meta: null
        };
    }
    // check if gear is not socketed.
    const isAnEmptySocketedItem = listOfSocketItems[gear.id] || 0;
    if (isAnEmptySocketedItem === 0) {
        return {
            gear,
            meta: null
        };
    }
    return {
        gear,
        meta: {
            error: `Missing ${isAnEmptySocketedItem} Sockets`
        }
    };
}

const checkGems = (gears: IGear[]) => {
    return gears.map((gear) => {
        // {gear, meta}
        const checkedGear: ICheckGem = checkIfGemsExist(gear);
        // { gem, meta}
        const checkedGem: ICheckGemQuality[] = checkQualityOfGems(checkedGear.gear);
        return {
            gems: checkedGear,
            quality: checkedGem,
        };
    });
};

export default checkGems;
