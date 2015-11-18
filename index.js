var dust = require('dust')();
var serand = require('serand');

dust.loadSource(dust.compile(require('./template'), 'accounts-authorize'));

module.exports = function (sandbox, fn, options) {
    dust.render('accounts-authorize', options, function (err, out) {
        if (err) {
            return;
        }
        sandbox.append(out);
        sandbox.on('click', '.accounts-authorize .allow', function (e) {
            serand.emit('user', 'authorized', options);
            return false;
        });
        fn(false, function () {
            $('.accounts-authorize', sandbox).remove();
        });
    });
};