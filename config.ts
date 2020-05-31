const portValue = parseInt(process.env.PORT || "3000", 10);

export const port = isNaN(portValue) ? 3000 : portValue
