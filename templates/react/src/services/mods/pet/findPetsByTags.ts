/**
     * @desc Finds Pets by tags
Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
     */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks'

import * as SWR from 'swr'

import { PontCore } from '../../pontCore'

export class Params {
  /** Tags to filter by */
  tags: Array<string>
}

export const method = 'GET'

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/pet/findByTags', params, 'GET'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/pet/findByTags', params, 'GET'),
    shouldRevalidate,
  )
}

export function useRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/pet/findByTags', params, swrOptions)
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/pet/findByTags', params, 'GET'), {
    ...option,
    method: 'GET',
  })
}
