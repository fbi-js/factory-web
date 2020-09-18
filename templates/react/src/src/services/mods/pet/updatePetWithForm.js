/**
 * @desc Updates a pet in the store with form data
 */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks';

import * as SWR from 'swr';

import { PontCore } from '../../pontCore';

export class Params {
  /** ID of pet that needs to be updated */
  petId;
}

export const method = 'POST';

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/pet/{petId}', params, 'POST'),
    newValue,
    shouldRevalidate,
  );
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/pet/{petId}', params, 'POST'),
    shouldRevalidate,
  );
}

export function useDeprecatedRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/pet/{petId}', params, swrOptions, {
    method: 'POST',
  });
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/pet/{petId}', params, 'POST'), {
    ...option,
    method: 'POST',
  });
}
