global.process = require('process');
process.browser = false;
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer;
