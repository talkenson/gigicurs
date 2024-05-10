import cardStore from './items.json'
import { CardInterpreted } from "../../types";
import {imageMap} from "./imageMap";

export const selectSomeCards = (count: number) => {
    const stack = [...cardStore.cards] as CardInterpreted[]
    const hand = []
    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * stack.length)
        hand.push(stack.splice(index, 1)[0])
    }
    return hand.map((v) => ({
        name: v.name,
        meanings: {
            good: v.meanings.at(
                Math.floor(Math.random() * v.meanings.length),
            ),
        },
        image: imageMap(v.suit, v.rank),
    }))
}
