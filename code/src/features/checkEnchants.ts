import {IGear} from "../interfaces";

// ignore slots without enchant & OH which are no shields
// 1neck, 3shirt, 5belt, 12;13trinkets, 17relic/libram, 18tabard,
const ignoreSlots = [1, 3, 5, 12, 13, 17, 18];
const ringSlots = [10, 11];
const offHandSlot = [16];

const checkEnchants = (gears: IGear[]) => {
    const slotsWithPossibleEnchants = gears.filter((gear) => !ignoreSlots.includes(gear.slot));
    return slotsWithPossibleEnchants.map((gear) => {
        if (!gear.permanentEnchant && !ringSlots.includes(gear.slot)) {
            return {
                ...gear,
                error: 'Missing Enchant'
            };
        }
        if (!gear.permanentEnchant && ringSlots.includes(gear.slot)) {
            return {
                ...gear,
                error: 'Missing Enchant (Requires Profession Enchanting 375)'
            };
        }
        // offHands can also be Tomes or Books, which cannot have enchantments
        if (!gear.permanentEnchant && offHandSlot.includes(gear.slot) && !gear.icon.includes('shield')) {
            return {
                ...gear,
                error: 'Missing Enchant'
            };
        }
        return gear;
    });
};


export default checkEnchants;
