export const removeWhitespace = (str: string) => str.replace(/\s+/g, '');

// TODO: Format names backend instead ?
export const capitalizeFirsLetterOnly = (str?: string | null) => {
    if (str) {
        return `${str.substring(0, 1).toUpperCase()}${
            str.length > 1 ? str.substring(1).toLowerCase() : ''
        }`;
    }
    return '';
};
