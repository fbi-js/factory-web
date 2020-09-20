/**
 * @desc Add a new pet to the store
 */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks'

import * as SWR from 'swr'

import { PontCore } from '../../pontCore'

export class Params {}

export const method = 'POST'

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/pet', params, 'POST'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(Hooks.getUrlKey('/pet', params, 'POST'), shouldRevalidate)
}

export function useDeprecatedRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/pet', params, swrOptions, { method: 'POST' })
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/pet', params, 'POST'), {
    ...option,
    method: 'POST',
  })
}
