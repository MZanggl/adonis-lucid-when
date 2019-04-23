const { ServiceProvider } = require('@adonisjs/fold')

class WhenProvider extends ServiceProvider {
  register () {
    this.app.bind('Adonis/Addons/When', () => {
      const When = require('../src/Traits/When')

      return new When()
    })

    this.app.alias('Adonis/Addons/When', 'Lucid/When')
  }
}

module.exports = WhenProvider