const updateEnvelope = async (envelopeId) => {
    const name = document.getElementById('name').value;
    const budget = document.getElementById('budget').value;

    try {
        const response = await fetch(`/envelopes/${envelopeId}`, {
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
            window.location.replace("/")
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

const deleteEnvelope = async (envelopeId) => {
    try {
        const response = await fetch(`/envelopes/${envelopeId}`, {
            method: 'DELETE'
        });
        if(response.ok) {
            window.location.replace("/")
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(error) {
        console.log(error);
    }
};
