import {selectSomeCards} from "./selectSomeCards";

export const presentCards = (cards: ReturnType<typeof selectSomeCards>) => {
    return cards.map((card) => {
        return `<b>${card.name}</b>:\n${card.meanings.good}\n`
    }).join('\n')
}

