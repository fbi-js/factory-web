/**
     * @desc Returns pet inventories by status
Returns a map of status codes to quantities
     */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks';

import * as SWR from 'swr';

import { PontCore } from '../../pontCore';

export class Params {}

export const method = 'GET';

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/store/inventory', params, 'GET'),
    newValue,
    shouldRevalidate,
  );
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/store/inventory', params, 'GET'),
    shouldRevalidate,
  );
}

export function useRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/store/inventory', params, swrOptions);
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/store/inventory', params, 'GET'), {
    ...option,
    method: 'GET',
  });
}
