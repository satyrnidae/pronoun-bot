import i18n = require('i18n')

export function contains<T>(items: T[], item: T) {
    return items.indexOf(item) >= 0;
}