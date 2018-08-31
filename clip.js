const args = require('yargs')
        .validate('comando', 'comprimenta o usuário')
        .demand('comando')
        .argv;