'use strict'

const assert = require('chai').assert
const createLucid = require('./helpers/CreateLucid')
const createProvider = require('./helpers/createProvider')
const createUserModel = require('./helpers/CreateUserModel')

function getWhereCondition(query) {
  query = query.toString().replace('select * from `users`', '').trim()
  if (query.startsWith('where')) {
    query = query.substr(6)
  }

  return query.trim()
}

let User
describe('when', function () {
  before(async () => {
    const { ioc } = createProvider()
    const lucid = createLucid(ioc)

    User = createUserModel(lucid)
  })

  it('includes condition if value is truthy', () => {
    const query = User.query()
      .when(true, query => query.where('active', true))
  
    assert.equal(getWhereCondition(query), "`active` = true")
  })

  it('can access result of test in second argument', () => {
    const query = User.query()
      .when(true, (query, value) => query.where('active', value))
  
    assert.equal(getWhereCondition(query), "`active` = true")
  })

  it('uses defaultValue if value is falsy', () => {
    const query = User.query()
      .when(false, (query, value) => query.where('active', value), true)
  
    assert.equal(getWhereCondition(query), "`active` = true")
  })
  
  describe('ignore', () => {
    it('ignores empty object', () => {
      const query = User.query()
      .when([], query => query
        .whereIn('tags', [])
      )
    
      assert.equal(getWhereCondition(query), "")
    })
    
    it('ignores empty string', () => {
      const query = User.query()
      .when('', query => query
        .where('test', '')
      )
    
      assert.equal(getWhereCondition(query), "")
    })

    it('ignores boolean false', () => {
      const query = User.query()
      .when(false, query => query
        .where('test', false)
      )
    
      assert.equal(getWhereCondition(query), "")
    })
    
    it('ignores null', () => {
      const query = User.query()
      .when(null, query => query
        .where('test2', null)
      )
    
      assert.equal(getWhereCondition(query), "")
    })
    
    it('ignores undefined', () => {
      const query = User.query()
      .when(undefined, query => query
        .where('test', undefined)
      )
    
      assert.equal(getWhereCondition(query), "")
    })
  })
  
  describe('does not ignore', () => {
    it('does not ignore 0', () => {
      const query = User.query()
        .when(0, query => query.where('test', 0))
    
      assert.equal(getWhereCondition(query), "`test` = 0")
    })
  })
})