const iocResolver = require('@adonisjs/lucid/lib/iocResolver')
const ServiceProvider = require('../../providers/WhenProvider')
const fold = require('@adonisjs/fold')

module.exports = function createProvider() {
  const { ioc } = fold
  fold.resolver.appNamespace('Adonis')
  iocResolver.setFold(fold)
  
  
  const provider = new ServiceProvider(ioc)
  
  provider.register()

  return { ioc, provider }
}