/**
 * @desc Logs out current logged in user session
 */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks'

import * as SWR from 'swr'

import { PontCore } from '../../pontCore'

export class Params {}

export const method = 'GET'

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/user/logout', params, 'GET'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/user/logout', params, 'GET'),
    shouldRevalidate,
  )
}

export function useRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/user/logout', params, swrOptions)
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/user/logout', params, 'GET'), {
    ...option,
    method: 'GET',
  })
}
