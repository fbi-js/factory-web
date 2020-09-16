/**
     * @desc Create user
This can only be done by the logged in user.
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
    Hooks.getUrlKey('/user', params, 'POST'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(Hooks.getUrlKey('/user', params, 'POST'), shouldRevalidate)
}

export function useDeprecatedRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/user', params, swrOptions, { method: 'POST' })
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/user', params, 'POST'), {
    ...option,
    method: 'POST',
  })
}
