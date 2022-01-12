const newEnvelopeContainer = document.getElementById('new-envelope');
const submitButton = document.getElementById('submit-envelope');

const createNewEnvelope = async () => {
    const name = document.getElementById('name').value;
    const budget = document.getElementById('budget').value;

    try {
        const response = await fetch('/envelopes', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                budget: budget
            }),
            headers: {
                'Content-Type': 'application/json'
              }
        });
        if(response.ok) {
            const responseJSON = await response.json();
            newEnvelopeContainer.innerHTML = `<h3>Your new envelope ${responseJSON.name} with the budget ${responseJSON.budget} has been created!</h3>
            `;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch(error) {
        console.log(error);
    }
};

submitButton.addEventListener('click', createNewEnvelope);