import * as messages from '../config/messages.json';

export function getHeart() {
    //TODO: Per-guild configurable heart reactions via data access
    const i = Math.floor(Math.random() * messages.hearts.length)
    return `:${messages.hearts[i]}:`;
}
