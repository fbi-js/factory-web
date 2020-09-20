/**
 * @desc Get user by user name
 */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks';

import * as SWR from 'swr';

import { PontCore } from '../../pontCore';

export class Params {
  /** The name that needs to be fetched. Use user1 for testing.  */
  username;
}

export const method = 'GET';

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/user/{username}', params, 'GET'),
    newValue,
    shouldRevalidate,
  );
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/user/{username}', params, 'GET'),
    shouldRevalidate,
  );
}

export function useRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/user/{username}', params, swrOptions);
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/user/{username}', params, 'GET'), {
    ...option,
    method: 'GET',
  });
}
