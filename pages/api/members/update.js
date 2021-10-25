// atm, this route is meant to update all members with a new parameter (of whatever)

const data = require("../../../backend/data/index.js");
module.exports = async (req, res) => {
  await data.initIfNotStarted();
  if (req.method === "POST") {

    const authStatus = await data.auth.checkAnyUser(req.headers['authorization'], res);
    if (authStatus) {
        res.setHeader('Content-Type', 'application/json');
        console.log(req.body);

        if (await data.util.checkIsEmptyBody(req.body)) {
            res.statusCode = 400;
            res.end(JSON.stringify(await data.util.resWrapper(async () => {
                throw Error('body must be present in request.');
            })));
            return;
        }

        res.statusCode = 200;
        res.end(JSON.stringify(await data.util.resWrapper(async () => {
          return await data.members.updateAllMembers({$set: req.body });

        })));
    }
    else {
      res.statusCode = 404;
      res.end();
  }

  }
};
