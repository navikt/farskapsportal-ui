export const removeWhitespace = (str: string) => str.replace(/\s+/g, '');

export const capitalizeFirsLetterInEveryWord = (str?: string | null) => {
    if (str) {
        const words = str.split(' ');
        const capitalizedWords = words.map(
            (w) =>
                `${w.substring(0, 1).toUpperCase()}${
                    w.length > 1 ? w.substring(1).toLowerCase() : ''
                }`
        );
        return capitalizedWords.join(' ');
    }
    return '';
};
