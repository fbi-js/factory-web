/**
 * @desc uploads an image
 */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks';

import * as SWR from 'swr';

import { PontCore } from '../../pontCore';

export class Params {
  /** ID of pet to update */
  petId;
}

export const method = 'POST';

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/pet/{petId}/uploadImage', params, 'POST'),
    newValue,
    shouldRevalidate,
  );
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/pet/{petId}/uploadImage', params, 'POST'),
    shouldRevalidate,
  );
}

export function useDeprecatedRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/pet/{petId}/uploadImage', params, swrOptions, {
    method: 'POST',
  });
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(
    PontCore.getUrl('/pet/{petId}/uploadImage', params, 'POST'),
    {
      ...option,
      method: 'POST',
    },
  );
}
