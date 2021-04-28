"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    //puerto
    port: process.env.PORT || 3000,
    //database
    db: 'mongodb://localhost/productos',
    dbparams: {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    //ambiente de pruebas
    test_env: 'test',
    test_db: 'mongodb://localhost/productos-test',
    test_port: 3001
};
exports.default = config;
//# sourceMappingURL=main.js.map