/**
     * @desc Delete purchase order by ID
For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
     */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks'

import * as SWR from 'swr'

import { PontCore } from '../../pontCore'

export class Params {
  /** ID of the order that needs to be deleted */
  orderId: number
}

export const method = 'DELETE'

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/store/order/{orderId}', params, 'DELETE'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/store/order/{orderId}', params, 'DELETE'),
    shouldRevalidate,
  )
}

export function useDeprecatedRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/store/order/{orderId}', params, swrOptions, {
    method: 'DELETE',
  })
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(
    PontCore.getUrl('/store/order/{orderId}', params, 'DELETE'),
    {
      ...option,
      method: 'DELETE',
    },
  )
}
