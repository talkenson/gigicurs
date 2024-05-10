export const imageMap = (suit: string, rank: number) => {
    switch (suit) {
        case 'cups':
            return `cups/C${rank}.jpg`;
        case 'pentacles':
            return `pentacles/P${rank}.jpg`;
        case 'swords':
            return `swords/S${rank}.jpg`;
        case 'wands':
            return `wands/W${rank}.jpg`;
        case 'main':
            return `main/M${rank}.jpg`;
        default:
            return undefined;
    }
}
