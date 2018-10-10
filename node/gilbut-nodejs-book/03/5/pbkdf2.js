const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  console.log('salt:', salt);
  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    console.log('password:', key.toString('base64'));
  });
});

/*
salt: 0oLQssWpHVS0FZXC5XNdmMeTFxV5aNfnBSMQ5Lxs4mnHOOfy8+d8sXUMalSXvObSRbz6d34xQ6SslzX837cLzQ==
password: btGYpojY02FUviu996PYQ5OUmZhITO7WDnlSyrxHjXE454MWIRR/JQFHCFXyUOdL7me9zpuqMCNuYwhj1sfcqA==
*/
