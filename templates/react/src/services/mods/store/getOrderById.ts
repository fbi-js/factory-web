/**
     * @desc Find purchase order by ID
For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
     */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks'

import * as SWR from 'swr'

import { PontCore } from '../../pontCore'

export class Params {
  /** ID of pet that needs to be fetched */
  orderId: number
}

export const method = 'GET'

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/store/order/{orderId}', params, 'GET'),
    newValue,
    shouldRevalidate,
  )
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/store/order/{orderId}', params, 'GET'),
    shouldRevalidate,
  )
}

export function useRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/store/order/{orderId}', params, swrOptions)
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(
    PontCore.getUrl('/store/order/{orderId}', params, 'GET'),
    {
      ...option,
      method: 'GET',
    },
  )
}
