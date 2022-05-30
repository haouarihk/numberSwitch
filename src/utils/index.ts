export function turnDiffToNumber(diff: number | string) {
    if (typeof diff === 'string')
        switch (diff) {
            case "easy": return 3;
            case "hard": return 20;
            default: return 10;
        }

    return diff;
}