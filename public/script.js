const envelopeContainer = document.getElementById('envelope-container');
const envelopeButtonContainer = document.getElementById('envelope-button-container');
const transferContainer = document.getElementById('transfer-container');

const resetEnvelopes = () => {
    envelopeContainer.innerHTML = '';
}

const resetTransfer = () => {
    transferContainer.innerHTML = '';
}

const renderEnvelopeButton = (envelope, id) => {

    envelopeButtonContainer.innerHTML = `
    <div>
      <label for="name">Envelope name:</label>
      <input id="name" value=${envelope.name}>
      <br>
      <label for="budget">Budget:</label>
      <input id="budget" value=${envelope.budget}>
    </div>
    <div>
      <button id="update-envelope" onclick="updateEnvelope(${id})">Update your envelope</button>
      <button id="delete-envelope" onclick="deleteEnvelope(${id})">Delete your envelope</button>
      <button id="render-transfer-envelope" onclick="renderTransferButton(${id})">Transfer</button>
    </div>
    `
};

const renderTransferButton = (id) => {

    transferContainer.innerHTML = `
    <div>
      <label for="transferTo">Transfer to:</label>
      <input id="transferTo" value="">
      <br>
      <label for="value">Transfer value:</label>
      <input id="value" value="">
    </div>
    <div>
      <button id="transfer-envelope" onclick="transferEnvelope(${id})">Transfer</button>
    </div>
    `
};

const fetchEnvelope = async (event) => {
    try {
        const response = await fetch(`/envelopes/${event.target.id}`);
        if(response.ok) {
            const responseJSON = await response.json();
            renderEnvelopeButton(responseJSON, event.target.id);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(error) {
        console.log(error);
    }
};

const fetchEnvelopeId = async (name) => {
    try {
        const response = await fetch(`/envelopes/name/${name}`);
        if(response.ok) {
            const responseJSON = await response.json();
            return responseJSON;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(error) {
        console.log(error);
    }
};

const updateEnvelope = async (id) => {
    const name = document.getElementById('name').value;
    const budget = document.getElementById('budget').value;

    try {
        const response = await fetch(`/envelopes/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                budget: budget
            }),
            headers: {
                'Content-Type': 'application/json'
              }
        });
        if(response.ok) {
            envelopeButtonContainer.innerHTML = 'The envelope has been updated.'
            resetEnvelopes();
            fetchEnvelopes();
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(error) {
        console.log(error);
    }
};

const transferEnvelope = async (id) => {
    const transferTo = document.getElementById('transferTo').value;
    const value = document.getElementById('value').value;
    const transferId = await fetchEnvelopeId(transferTo);
    try {
        const response = await fetch(`/envelopes/${id}/${transferId.id}`, {
            method: 'POST',
            body: JSON.stringify({
                value: value
            }),
            headers: {
                'Content-Type': 'application/json'
              }
        });
        if(response.ok) {
            envelopeButtonContainer.innerHTML = 'The envelope amount has been transfered.'
            resetEnvelopes();
            resetTransfer();
            fetchEnvelopes();
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(error) {
        console.log(error);
    }
};

const deleteEnvelope = async (id) => {
    try {
        const response = await fetch(`/envelopes/${id}`, {
            method: 'DELETE'
        });
        if(response.ok) {
            envelopeButtonContainer.innerHTML = 'The envelope has been deleted.'
            resetEnvelopes();
            fetchEnvelopes();
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(error) {
        console.log(error);
    }
};

const renderEnvelopes = envelopes => {
    envelopes.forEach((envelope) => {
        const newEnvelope = document.createElement('button');
        newEnvelope.className = 'envelope-button';
        newEnvelope.id = envelope.id;
        newEnvelope.onclick = fetchEnvelope;
        newEnvelope.innerHTML = `${envelope.name}<br>Budget: ${envelope.budget}`;
        envelopeContainer.appendChild(newEnvelope);
    });
};

const fetchEnvelopes = async () => {
    try {
        const response = await fetch('/envelopes');
        if(response.ok) {
            const responseJSON = await response.json();
            renderEnvelopes(responseJSON);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(error) {
        console.log(error);
    }
};

fetchEnvelopes();