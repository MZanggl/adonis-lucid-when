const lucidFactory = require('@adonisjs/lucid')

module.exports = function createLucid(ioc) {
    const lucid = lucidFactory({
        connection: process.env.NODE_ENV || 'mysql',
        mysql: {
          client: 'mysql',
        },
        user: 'test',
        database: 'test',
        password: 'test',
        port: 7000,
        host: 'localhost'
    })

    ioc.singleton('Adonis/Src/Database', () => lucid.db)
    ioc.alias('Adonis/Src/Database', 'Database')
    
    ioc.bind('Adonis/Src/Model', () => lucid.Model)
    ioc.alias('Adonis/Src/Model', 'Model')

    return lucid
}