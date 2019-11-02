const util = {};

util.replaceNamesWithIdsArray = async (values, handler) => {
    const ids = [];
    for (const value of values) {
        const id = (await handler.findOrCreate({name: value})).id;
        ids.push(id);
    }
    return ids;
};

util.replaceBodiesWithIdsArray = async (values, handler) => {
    const ids = [];
    for (const value of values) {
        const id = (await handler.findOrCreate(value)).id;
        ids.push(id);
    }
    return ids;
};

util.replaceNameWithId = async (value, handler) => {
    return (await handler.findOrCreate({name: value})).id;
};

util.replaceBodyWithId = async (value, handler) => {
    return (await handler.findOrCreate(value)).id;
};


module.exports = util;