/**
 * @desc Logs user into the system
 */

// import * as defs from '../../baseClass';
import * as Hooks from '../../hooks';

import * as SWR from 'swr';

import { PontCore } from '../../pontCore';

export class Params {
  /** The user name for login */
  username;
  /** The password for login in clear text */
  password;
}

export const method = 'GET';

export function mutate(
  params = {},
  newValue = undefined,
  shouldRevalidate = true,
) {
  return SWR.mutate(
    Hooks.getUrlKey('/user/login', params, 'GET'),
    newValue,
    shouldRevalidate,
  );
}

export function trigger(params = {}, shouldRevalidate = true) {
  return SWR.trigger(
    Hooks.getUrlKey('/user/login', params, 'GET'),
    shouldRevalidate,
  );
}

export function useRequest(params = {}, swrOptions = {}) {
  return Hooks.useRequest('/user/login', params, swrOptions);
}

export function request(params = {}, option = {}) {
  return PontCore.fetch(PontCore.getUrl('/user/login', params, 'GET'), {
    ...option,
    method: 'GET',
  });
}
