import i18n = require('i18n')

export function areEqual(first: object, second: object) {
    return Object.keys(first).every(key =>
        second.hasOwnProperty(key) &&
        second[key] === first[key]
    );
}

export function format(formatString: string, ...args: any[]): string {
    return formatString.replace(/{{\d+}}/g, (match, number) =>
        args[number] || match
    );
}

export function formatLocal(formatString: string, ...args: any[]): string {
    return format(i18n.__(formatString), ...args);
}

export function contains<T>(items: T[], item: T) {
    return items.indexOf(item) >= 0;
}