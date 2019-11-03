const util = {};

util.replaceNamesWithIdsArray = async (values, handler) => {
    const ids = [];
    for (const value of values) {
        const id = (await handler.findOrCreate({ name: value })).id;
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
    return (await handler.findOrCreate({ name: value })).id;
};

util.replaceBodyWithId = async (value, handler) => {
    return (await handler.findOrCreate(value)).id;
};

util.findOrCreate = async (Model, body) => {
    return (await (Model.findOneAndUpdate(body, body, { new: true, upsert: true, useFindAndModify: false }).exec()));
};

util.handleWrapper = async (func) => {
    return (await func());
};

util.resWrapper = async (func) => {
    try {
        const body = (await func());
        return ({
            success: true,
            body
        });
    } catch (error) {
        return ({
            success: false,
            error
        });
    }
};

module.exports = util;