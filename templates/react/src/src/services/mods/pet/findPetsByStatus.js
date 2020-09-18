/**
     * @desc Finds Pets by status
Multiple status values can be provided with comma separated strings
     */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks';

import * as SWR from 'swr';

import { PontCore } from '../../pontCore';

export class Params {
  /** Status values that need to be considered for filter */
  status;
}

export const method = 'GET';

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/pet/findByStatus', params, 'GET'),
    newValue,
    shouldRevalidate,
  );
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/pet/findByStatus', params, 'GET'),
    shouldRevalidate,
  );
}

export function useRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/pet/findByStatus', params, swrOptions);
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/pet/findByStatus', params, 'GET'), {
    ...option,
    method: 'GET',
  });
}
