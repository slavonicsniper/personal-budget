// load express Router class
const transactionsRouter = require('express').Router();
const {checkAuthentication} = require('../auth')

// load db model
const {Envelope, Transaction, User} = require('../models')

// check authentication for all endpoints
transactionsRouter.use(checkAuthentication)

// envelope page
transactionsRouter.get('/new', (req, res) => {
    res.render('transaction', {title: "New transaction"})
})

// list all transactions
transactionsRouter.get('/', async(req, res, next) => {
    try {
        const sentTransactions = await Transaction.findAll({
            include: [{
                model: User,
                as: 'sender_user',
                attributes: ['username']
            },
            {
                model: User,
                as: 'reciever_user',
                attributes: ['username']
            },
            {
                model: Envelope,
                as: 'sender_envelope',
                attributes: ['name']
            },
            {
                model: Envelope,
                as: 'reciever_envelope',
                attributes: ['name']
            },
            ],
            where: {
                sender_user_id: req.user.id
            }
        })
        const recievedTransactions = await Transaction.findAll({
            include: [{
                model: User,
                as: 'sender_user',
                attributes: ['username']
            },
            {
                model: User,
                as: 'reciever_user',
                attributes: ['username']
            },
            {
                model: Envelope,
                as: 'sender_envelope',
                attributes: ['name']
            },
            {
                model: Envelope,
                as: 'reciever_envelope',
                attributes: ['name']
            },
            ],
            where: {
                reciever_user_id: req.user.id
            }
        })
        //res.send(transactions)
        res.render('transactions', {sentTransactions, recievedTransactions, user: req.user.username})
    } catch(err) {
        next(err)
    }
});

// list one transaction by id
transactionsRouter.get('/:id', async(req, res, next) => {
    try {
        const transaction = await Transaction.findOne({
            include: [{
                model: User,
                as: 'sender_user',
                attributes: ['username']
            },
            {
                model: User,
                as: 'reciever_user',
                attributes: ['username']
            },
            {
                model: Envelope,
                as: 'sender_envelope',
                attributes: ['name']
            },
            {
                model: Envelope,
                as: 'reciever_envelope',
                attributes: ['name']
            },
            ],
            where: {
                id: req.params.id
            }
        })
        res.render('transaction', {transaction, title: "Transaction Details"})
    } catch(err) {
        next(err)
    }
});

// update an transaction
transactionsRouter.put('/:id', async(req, res, next) => {
    try {
        const currentTrasaction = await Transaction.findByPk(req.params.id)
        const currentSender = await Envelope.findByPk(currentTrasaction.sender_envelope_id)
        await currentSender.update({budget: currentSender.budget + currentTrasaction.payment_amount})
        const currentReciever = await Envelope.findByPk(currentTrasaction.reciever_envelope_id)
        await currentReciever.update({budget: currentReciever.budget - currentTrasaction.payment_amount})

        const sender = await Envelope.findByPk(req.body.sender_envelope_id)
        await sender.update({budget: sender.budget - req.body.payment_amount})
        const reciever = await Envelope.findByPk(req.body.reciever_envelope_id)
        await reciever.update({budget: reciever.budget + req.body.payment_amount})

        const updatedTransaction = await currentTrasaction.update(req.body, {returning: true})
        res.status(200).send(updatedTransaction)
    } catch(err){
        next(err)
    }
});

// delete an transaction
transactionsRouter.delete('/:id', async(req, res, next) => {
    try {
        const currentTrasaction = await Transaction.findByPk(req.params.id)
        const currentSender = await Envelope.findByPk(currentTrasaction.sender_envelope_id)
        await currentSender.update({budget: currentSender.budget + currentTrasaction.payment_amount})
        const currentReciever = await Envelope.findByPk(currentTrasaction.reciever_envelope_id)
        await currentReciever.update({budget: currentReciever.budget - currentTrasaction.payment_amount})
        
        await currentTrasaction.destroy()
        res.status(200).json({message: 'Transaction deleted!'})
    } catch(err){
        next(err)
    }
});

// transfer budget from one envelope to another
transactionsRouter.post('/', async(req, res, next) => {
    try {
        const paymentAmount = parseFloat(req.body.payment_amount)
        const sender = await Envelope.findOne({where: {name: req.body.sender_envelope, user_id: req.user.id}})
        const recieverUser = await User.findOne({where: {username: req.body.reciever_user}})
        const reciever = await Envelope.findOne({where: {name: req.body.reciever_envelope, user_id: recieverUser.id}})
        await sender.update({budget: sender.budget - paymentAmount})
        await reciever.update({budget: reciever.budget + paymentAmount})
        console.log(req.body)
        await Transaction.create({
            sender_user_id: req.user.id, 
            sender_envelope_id: sender.id,
            reciever_envelope_id: reciever.id,
            reciever_user_id: recieverUser.id,
            payment_amount: paymentAmount
        })
        req.flash("success_msg", "Transaction sent.")
        res.redirect('/')
    } catch(err) {
        next(err)
    }
});

module.exports = transactionsRouter;