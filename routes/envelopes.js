// load express Router class
const envelopesRouter = require('express').Router();
const {checkAuthentication} = require('../auth')

// load db model
const {Envelope} = require('../models')

// check authentication for all endpoints
envelopesRouter.use(checkAuthentication)

// envelope page
envelopesRouter.get('/new', (req, res) => {
    res.render('envelope', {title: "New envelope"})
})

// create an envelope
envelopesRouter.post('/', async(req, res, next) => {
    try {
        req.body.user_id = req.user.id
        await Envelope.create(req.body)
        req.flash("success_msg", "Envelope created.")
        res.redirect('/')
    } catch(err) {
        next(err)
    }
});

// list all envelopes
envelopesRouter.get('/', async(req, res, next) => {
    try {
        const envelopes = await Envelope.findAll()
        res.status(200).send(envelopes)
    } catch(err) {
        next(err)
    }
});

// list one envelope by id
envelopesRouter.get('/:id', async(req, res, next) => {
    try {
        const envelope = await Envelope.findByPk(req.params.id)
        res.status(200).send(envelope)
    } catch(err){
        next(err)
    }
});

// list one envelope by name
envelopesRouter.get('/name/:name', async(req, res, next) => {
    try {
        const envelope = await Envelope.findOne({where: { name: req.params.name, user_id: req.user.id}})
        res.render('envelope', {envelope, title: envelope.name})
    } catch(err){
        next(err)
    }
});

// update an envelope
envelopesRouter.put('/:id', async(req, res, next) => {
    try {
        await Envelope.update(req.body, {where: { id: req.params.id}})
        req.flash("success_msg", "Envelope updated.")
        res.json({message: 'Envelope update.'})
    } catch(err){
        next(err)
    }
});

// delete an envelope
envelopesRouter.delete('/:id', async(req, res, next) => {
    try {
        await Envelope.destroy({where: { id: req.params.id}})
        req.flash("success_msg", "Envelope deleted.")
        res.json({message: 'Envelope deleted!'})
    } catch(err){
        next(err)
    }
});

module.exports = envelopesRouter;