/**
 * Created by Talel on 2018-10-24.
 */
/**
 * Created by Talel on 2018-10-08.
 */

const express = require('express');
const app = express();
const path = require('path');
// viewed at http://localhost:7000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(7000);