import assert from 'assert'
import { IFactoryConfig, IFactoryPaths } from '../types'

export const assertFactoryTemplate = (factory: IFactoryConfig) => {
  const assertFailLog = `fbi factory.template field must one of "micro-main", "micro-react", "micro-vue", "react", "vue"`
  const assertIsOk =
    factory &&
    factory.template &&
    ['micro-main', 'micro-react', 'micro-vue', 'react', 'vue'].includes(factory.template)
  assert(assertIsOk, assertFailLog)
}

export const assertFbiPaths = (paths: IFactoryPaths) => {
  const assertFailLog = ``
  const assertIsOk = true
  // Object.keys()
  // const assertIsOk = factory && factory.template &&
  // ['micro-main', 'micro-react', 'micro-vue', 'react', 'vue'].includes(factory.template)
  // console.log('factory', factory)
  assert(assertIsOk, assertFailLog)
}
