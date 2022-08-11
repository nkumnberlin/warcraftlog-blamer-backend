import {IGear} from "./interfaces";
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
            ...updatedGear,
            metaEnchant: {
                error: 'enchant'
            }
        };
        // { gem, meta}
        if (ignoreSlots.includes(updatedGear.slot) || updatedGear.id === 0) return {
            ...updatedGear,
            metaEnchant: null
        };
        if (!updatedGear.permanentEnchant && !ringSlots.includes(updatedGear.slot) && !offHandSlot.includes(updatedGear.slot)) {
            return errorObject;
        }
        if (!updatedGear.permanentEnchant && ringSlots.includes(updatedGear.slot)) {
            // in this case it would be to hard to flag every player who does not have enchanting 375
            return {
                ...updatedGear,
                metaEnchant: {
                    error: 'enchant (Requires Profession Enchanting 375)'
                }
            };
        }
        // offHands can also be Tomes or Books, which cannot have enchantments
        if (offHandSlot.includes(updatedGear.slot) && !updatedGear.permanentEnchant && !updatedGear.icon.includes('offhand') ) {
            return errorObject;
        }
        return {
            ...updatedGear,
            metaEnchant: null
        };
    });
};


export default checkGearIssues;
