Turns

```javascript
const User = use('App/Models/User')

const query = User.query().where('active', true)

if (request.input('name')) {
  query = query.where('name', request.input('name'))
}

if (request.input('city')) {
  query = query.where('city', request.input('city'))
}

query.fetch()
```

into

```javascript
const User = use('App/Models/User')

User.query()
    .where('active', true)
    .when(request.input('name'), (q, value) => q.where('name', value))
    .when(request.input('city'), (q, value) => q.where('city', value))
    .fetch()
```


### Installation

```bash
npm i adonis-lucid-when --save
```

### Registering provider

Make sure to register the provider inside start/app.js

```javascript
const providers = [
  'adonis-lucid-when/providers/WhenProvider'
]
```

### Usage

First add the trait to the model.

```javascript
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    this.addTrait('@provider:Lucid/When')
  }
}
```

Finally use the method as in the example above.

### Apply default value

```javascript
const User = use('App/Models/User')

User.query()
    .where('active', true)
    .when(request.input('status'), (q, value) => q.where('status', value), 1)
    .when(request.input('is_deleted'), (q, value) => q.where('is_deleted', value), false)
    .fetch()
```

The third parameter deals as a default value in case the first variable is falsy.

> 0 and '0' are not considered falsy

> empty array / object is considered falsy

## tests

Run tests using

```javascript
npm test
```