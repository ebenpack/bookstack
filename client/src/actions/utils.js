export const makeAction = (type, args) => ({
    type,
    ...args
});