/**
 * @desc Update an existing pet
 */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks'

import * as SWR from 'swr'

import { PontCore } from '../../pontCore'

export class Params {}

export const method = 'PUT'

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/pet', params, 'PUT'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(Hooks.getUrlKey('/pet', params, 'PUT'), shouldRevalidate)
}

export function useDeprecatedRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/pet', params, swrOptions, { method: 'PUT' })
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/pet', params, 'PUT'), {
    ...option,
    method: 'PUT',
  })
}
