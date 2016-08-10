import test = require('blue-tape');

import recompose = require('recompose');

test('withContext', function(t) {
    const withContext = recompose.withContext;
    t.equal(typeof withContext, 'function', 'I expect withContect to be a function');
    return t.end();
});
