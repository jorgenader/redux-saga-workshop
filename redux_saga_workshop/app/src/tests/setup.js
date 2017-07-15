import 'babel-polyfill';
import Chai from 'chai';
import DirtyChai from 'dirty-chai';
import {JSDOM} from 'jsdom';
import setupBrowserGlobals from 'jsdom-global';
import appModulePath from 'app-module-path';

appModulePath.addPath(`${__dirname}/../`);

setupBrowserGlobals();

Chai.use(DirtyChai);


global.document = new JSDOM('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {userAgent: 'node.js'};
global.gettext = str => str;
global.DJ_CONST = {
    user: {
        id: 0,
        email: 'test@test.com',
        name: "Test Tester",
        permissions: [],
    },
};


// Prevent mocha from interpreting CSS @import files
function noop() {
    return null;
}

require.extensions['.css'] = noop;
