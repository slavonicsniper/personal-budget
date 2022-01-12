// load express Router class
const envelopesRouter = require('express').Router();
// import help functions from db
const { addToDB, getAllFromDB, getFromDBById, updateInDB, deleteFromDBById, transferBudget, getFromDbIdByName } = require('./db');

// create an envelope
envelopesRouter.post('/', (req, res, next) => {
    res.status(201).send(addToDB(req.body));
});

// list all envelopes
envelopesRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDB());
});

// list one envelope by id
envelopesRouter.get('/:id', (req, res, next) => {
    res.status(200).send(getFromDBById(req.params.id));
});

// list one envelope by name
envelopesRouter.get('/name/:name', (req, res, next) => {
    res.status(200).send(getFromDbIdByName(req.params.name));
});

// update an envelope
envelopesRouter.put('/:id', (req, res, next) => {
    req.body.id = req.params.id;
    res.status(200).send(updateInDB(req.body));
});

// delete an envelope
envelopesRouter.delete('/:id', (req, res, next) => {
    res.status(204).send(deleteFromDBById(req.params.id));
});

// check whether id exists before a request
envelopesRouter.param('id', (req, res, next, id) => {
    if (getFromDBById(id) === undefined) {
        res.status(404).send('Not Found');
    } else {
        next();
    }
});

// check whether name exists before a request
envelopesRouter.param('name', (req, res, next, id) => {
    if (getFromDbIdByName(id) === undefined) {
        res.status(404).send('Not Found');
    } else {
        next();
    }
});

// transfer budget from one envelope to another
envelopesRouter.post('/:from/:to', (req, res, next) => {
    res.status(200).send(transferBudget(req.params.from, req.params.to, req.body.value));
});

module.exports = envelopesRouter;