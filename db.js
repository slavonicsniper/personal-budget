// example envelope for testing and the end user
const envelopes = [{
    id: "1",
    name: "work",
    budget: "100"
}];

// counter used for creation of a new envelope
let envelopeCounter = 2;


// create a new envelope
const addToDB = envelope => {
    envelope.id = `${envelopeCounter++}`;
    envelopes.push(envelope);
    return envelopes[envelopes.length - 1];
};

// get all envelopes
const getAllFromDB = () => {
    return envelopes;
};

// get an envelope by an id
const getFromDBById = (id) => {
    return envelopes.find(envelope => {
        return envelope.id === id;
    });
};

// get an envelope by a name
const getFromDbIdByName = (name) => {
    return envelopes.find(envelope => {
        return envelope.name === name;
    });
};

// update an envelope
const updateInDB = instance => {
    const envelopeIndex = envelopes.findIndex(envelope => {
        return envelope.id === instance.id;
    });

    if(envelopeIndex > -1) {
        envelopes[envelopeIndex] = instance;
        return envelopes[envelopeIndex];
    } else {
        return null;
    }
};

// delete an envelope
const deleteFromDBById = id => {
    const envelopeIndex = envelopes.findIndex(envelope => {
        return envelope.id === id;
    });

    if(envelopeIndex > -1) {
        envelopes.splice(envelopeIndex, 1);
        return true;
    } else {
        return false;
    }
};

// transfer budget from one envelope to another
const transferBudget = (from, to, value) => {
    const fromIndex = envelopes.findIndex(envelope => {
        return envelope.id === from;
    });
    const toIndex = envelopes.findIndex(envelope => {
        return envelope.id === to;
    });

    if(fromIndex > -1 && toIndex > -1) {
        envelopes[fromIndex].budget = `${+envelopes[fromIndex].budget - +value}`;
        envelopes[toIndex].budget = `${+envelopes[toIndex].budget + +value}`;
        return true;
    } else {
        return false;
    }
}

// export help functions
module.exports = {
    addToDB,
    getAllFromDB,
    getFromDBById,
    updateInDB,
    deleteFromDBById,
    transferBudget,
    getFromDbIdByName
};