const bprocess = require('process');

if (typeof __dirname === 'undefined') global.__dirname = '/';
if (typeof __filename === 'undefined') global.__filename = '';

global.process = bprocess;
bprocess.browser = false;
global.Buffer = require('buffer').Buffer;

const isDev = typeof __DEV__ === 'boolean' && __DEV__;
bprocess.env['NODE_ENV'] = isDev ? 'development' : 'production';
