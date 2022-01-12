const express = require('express');
const app = express();

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 3000;

// server static files from public folder
app.use(express.static('public'));

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// envelopes endpoint

const envelopesRouter = require('./envelopes');
app.use('/envelopes', envelopesRouter);

// Middleware for handling errors
var errorhandler = require('errorhandler')
app.use(errorhandler())

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT);
}
