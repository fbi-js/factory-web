/**
     * @desc Updated user
This can only be done by the logged in user.
     */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks'

import * as SWR from 'swr'

import { PontCore } from '../../pontCore'

export class Params {
  /** name that need to be updated */
  username: string
}

export const method = 'PUT'

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/user/{username}', params, 'PUT'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/user/{username}', params, 'PUT'),
    shouldRevalidate,
  )
}

export function useDeprecatedRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/user/{username}', params, swrOptions, {
    method: 'PUT',
  })
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/user/{username}', params, 'PUT'), {
    ...option,
    method: 'PUT',
  })
}
