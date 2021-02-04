import assert from 'assert'
import { IFactoryConfig } from '../types'

export const assertFactoryTemplate = (factory: IFactoryConfig) => {
  const assertFailLog =
    'fbi factory.template field must one of "micro-main", "micro-react", "micro-vue", "react", "vue"'
  const assertIsOk =
    factory &&
    factory.template &&
    ['micro-main', 'micro-react', 'micro-vue', 'react', 'vue'].includes(
      factory.template
    )
  assert(assertIsOk, assertFailLog)
}

export const assertFbiPaths = () => {
  const assertFailLog = ''
  const assertIsOk = true
  assert(assertIsOk, assertFailLog)
}
