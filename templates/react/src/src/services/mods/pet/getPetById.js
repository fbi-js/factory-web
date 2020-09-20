/**
     * @desc Find pet by ID
Returns a single pet
     */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks';

import * as SWR from 'swr';

import { PontCore } from '../../pontCore';

export class Params {
  /** ID of pet to return */
  petId;
}

export const method = 'GET';

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/pet/{petId}', params, 'GET'),
    newValue,
    shouldRevalidate,
  );
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/pet/{petId}', params, 'GET'),
    shouldRevalidate,
  );
}

export function useRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/pet/{petId}', params, swrOptions);
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/pet/{petId}', params, 'GET'), {
    ...option,
    method: 'GET',
  });
}
