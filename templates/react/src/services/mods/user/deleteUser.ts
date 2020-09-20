/**
     * @desc Delete user
This can only be done by the logged in user.
     */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks'

import * as SWR from 'swr'

import { PontCore } from '../../pontCore'

export class Params {
  /** The name that needs to be deleted */
  username: string
}

export const method = 'DELETE'

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/user/{username}', params, 'DELETE'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/user/{username}', params, 'DELETE'),
    shouldRevalidate,
  )
}

export function useDeprecatedRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/user/{username}', params, swrOptions, {
    method: 'DELETE',
  })
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/user/{username}', params, 'DELETE'), {
    ...option,
    method: 'DELETE',
  })
}
