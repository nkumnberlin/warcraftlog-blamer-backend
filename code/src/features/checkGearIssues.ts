import {IGear} from "../interfaces";
import checkGems from "./checkGems";

// ignore slots without enchant & OH which are no shields
// 1neck, 3shirt, 5belt, 12;13trinkets, 17relic/libram, 18tabard,
const ignoreSlots = [1, 3, 5, 12, 13, 17, 18];
const ringSlots = [10, 11];
const offHandSlot = [16];

const checkGearIssues = (gears: IGear[]) => {
    return gears.map((gear) => {
        const updatedGear = checkGems(gear);
        const errorObject = {
            //
            ...updatedGear,
            metaEnchant: {
                error: 'Missing Enchant'
            }
        };

        // { gem, meta}
        if (ignoreSlots.includes(gear.slot)) return {
            ...gear,
            metaEnchant: null
        };
        if (!gear.permanentEnchant && !ringSlots.includes(gear.slot)) {
            return errorObject;
        }
        if (!gear.permanentEnchant && ringSlots.includes(gear.slot)) {
            return {
                ...gear,
                metaEnchant: {
                    error: 'Missing Enchant (Requires Profession Enchanting 375)'
                }
            };
        }
        // offHands can also be Tomes or Books, which cannot have enchantments
        if (!gear.permanentEnchant && offHandSlot.includes(gear.slot) && !gear.icon.includes('shield')) {
            return errorObject;
        }
        return {
            ...gear,
            metaEnchant: null
        };
    });
};


export default checkGearIssues;
