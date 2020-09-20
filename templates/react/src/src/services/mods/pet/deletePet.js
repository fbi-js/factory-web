/**
 * @desc Deletes a pet
 */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks';

import * as SWR from 'swr';

import { PontCore } from '../../pontCore';

export class Params {
  /** Pet id to delete */
  petId;
}

export const method = 'DELETE';

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/pet/{petId}', params, 'DELETE'),
    newValue,
    shouldRevalidate,
  );
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/pet/{petId}', params, 'DELETE'),
    shouldRevalidate,
  );
}

export function useDeprecatedRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/pet/{petId}', params, swrOptions, {
    method: 'DELETE',
  });
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/pet/{petId}', params, 'DELETE'), {
    ...option,
    method: 'DELETE',
  });
}
