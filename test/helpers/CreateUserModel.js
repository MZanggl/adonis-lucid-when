module.exports = function createUserModel(lucid) {
    const User = class extends lucid.Model {
        static boot () {
          super.boot()
      
          this.addTrait('@provider:Lucid/When')
        }
    }
      
    lucid.Models.add('User', User)

    return User
}