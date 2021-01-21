export const removeBadValuesAndDuplicates = (array) => {
    const uniqueSet = new Set(array.map(i => i.trim().toLowerCase()))
    return [...uniqueSet].filter(i => i);
}