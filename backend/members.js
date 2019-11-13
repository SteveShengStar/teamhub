const router = require('express').Router();
const data = require('./data/index.js');

//get list of all members
router.get('/', async (req, res, next) => {
    try {
        res.send(await data.util.resWrapper(async () => {
            return await data.members.getAll();
        }));
    } catch (err) {
        next(err);
    }
});

//get all info about a particular member
router.get('/:id/info', async (req, res, next) => {
    try {
        res.send(await data.util.resWrapper(async () => {
            return await data.members.search({ _id: req.params.id });
        }));

    } catch (err) {
        next(err);
    }
});

//add a member
router.post('/add', async (req, res, next) => {
    try {
        res.send(await data.util.resWrapper(async () => {
            return await data.members.add(req.body.data);
        }));
    } catch (err) {
        next(err);
    }
});

//delete a member given id
router.delete('/:id/remove', async (req, res, next) => {
    try {
        res.send(await data.util.resWrapper(async () => {
            return await data.members.delete({ _id: req.params.id });
        }));
    } catch (err) {
        next(err);
    }
});

//update member
router.put('/:id/update', async (req, res, next) => {
    try {
        res.send(await data.util.resWrapper(async () => {
            return await data.members.updateMember({ _id: req.params.id }, req.body.data);
        }));
    } catch (err) {
        next(err);
    }
});

//search by query object
router.post('/search', async (req, res, next) => {
    try {
        res.send(await data.util.resWrapper(async () => {
            return await data.members.search(req.body.query);
        }));
    } catch (err) {
        next(err);
    }
});

//get members by a particular field -- beta
// router.put('/by/:field', async (req, res, next) => {
//     try {
//         res.send(await data.members.findBy(req.params.field));
//     } catch (err) {
//         next(err);
//     }
// });

module.exports = router;
