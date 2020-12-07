/* import-map-overrides@1.16.0 */
!(function () {
  'use strict'
  function e(e, t) {
    if (!(e instanceof t))
      throw new TypeError('Cannot call a class as a function')
  }
  function t(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n]
      ;(r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r)
    }
  }
  function n(e, n, r) {
    return n && t(e.prototype, n), r && t(e, r), e
  }
  function r(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    )
  }
  function o(e, t) {
    if ('function' != typeof t && null !== t)
      throw new TypeError('Super expression must either be null or a function')
    ;(e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, writable: !0, configurable: !0 },
    })),
      t && l(e, t)
  }
  function i(e) {
    return (i = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
  }
  function l(e, t) {
    return (l =
      Object.setPrototypeOf ||
      function (e, t) {
        return (e.__proto__ = t), e
      })(e, t)
  }
  function a() {
    if ('undefined' == typeof Reflect || !Reflect.construct) return !1
    if (Reflect.construct.sham) return !1
    if ('function' == typeof Proxy) return !0
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {}),
        ),
        !0
      )
    } catch (e) {
      return !1
    }
  }
  function u(e, t, n) {
    return (u = a()
      ? Reflect.construct
      : function (e, t, n) {
          var r = [null]
          r.push.apply(r, t)
          var o = new (Function.bind.apply(e, r))()
          return n && l(o, n.prototype), o
        }).apply(null, arguments)
  }
  function s(e) {
    var t = 'function' == typeof Map ? new Map() : void 0
    return (s = function (e) {
      if (
        null === e ||
        ((n = e), -1 === Function.toString.call(n).indexOf('[native code]'))
      )
        return e
      var n
      if ('function' != typeof e)
        throw new TypeError(
          'Super expression must either be null or a function',
        )
      if (void 0 !== t) {
        if (t.has(e)) return t.get(e)
        t.set(e, r)
      }
      function r() {
        return u(e, arguments, i(this).constructor)
      }
      return (
        (r.prototype = Object.create(e.prototype, {
          constructor: {
            value: r,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        l(r, e)
      )
    })(e)
  }
  function d(e) {
    if (void 0 === e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      )
    return e
  }
  function c(e, t) {
    return !t || ('object' != typeof t && 'function' != typeof t) ? d(e) : t
  }
  function p(e) {
    var t = a()
    return function () {
      var n,
        r = i(e)
      if (t) {
        var o = i(this).constructor
        n = Reflect.construct(r, arguments, o)
      } else n = r.apply(this, arguments)
      return c(this, n)
    }
  }
  function m(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e
      })(e) ||
      (function (e, t) {
        if ('undefined' != typeof Symbol && Symbol.iterator in Object(e)) {
          var n = [],
            r = !0,
            o = !1,
            i = void 0
          try {
            for (
              var l, a = e[Symbol.iterator]();
              !(r = (l = a.next()).done) &&
              (n.push(l.value), !t || n.length !== t);
              r = !0
            );
          } catch (e) {
            ;(o = !0), (i = e)
          } finally {
            try {
              r || null == a.return || a.return()
            } finally {
              if (o) throw i
            }
          }
          return n
        }
      })(e, t) ||
      f(e, t) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        )
      })()
    )
  }
  function f(e, t) {
    if (e) {
      if ('string' == typeof e) return v(e, t)
      var n = Object.prototype.toString.call(e).slice(8, -1)
      return (
        'Object' === n && e.constructor && (n = e.constructor.name),
        'Map' === n || 'Set' === n
          ? Array.from(e)
          : 'Arguments' === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          ? v(e, t)
          : void 0
      )
    }
  }
  function v(e, t) {
    ;(null == t || t > e.length) && (t = e.length)
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
    return r
  }
  var h,
    g = 'import-map-overrides-domains',
    _ = /^\d+$/g,
    y = document.querySelector('meta[name="importmap-type"]'),
    b = document.querySelector('meta[name="'.concat(g, '"]')),
    w = {},
    x = y ? y.getAttribute('content') : 'importmap'
  if (b) {
    var M = b.getAttribute('content')
    M ||
      console.warn('Invalid '.concat(g, ' meta element - content required.')),
      M.startsWith('allowlist:')
        ? (h = !M.slice('allowlist:'.length)
            .split(',')
            .some(function (e) {
              return window.location.hostname === e
            }))
        : M.startsWith('denylist:')
        ? (h = M.slice('denylist:'.length)
            .split(',')
            .some(function (e) {
              return e === window.location.hostname
            }))
        : console.log(
            'Invalid '
              .concat(g, ' meta content attribute - must start with ')
              .concat('allowlist:', ' or ')
              .concat('denylist:'),
          )
  } else h = !1
  h ||
    (function () {
      var e,
        t = !!y && y.hasAttribute('server-cookie'),
        n = !!y && y.hasAttribute('server-only')
      window.importMapOverrides = {
        addOverride: function (e, n) {
          _.test(n) && (n = r.getUrlFromPort(e, n))
          var o = 'import-map-override:' + e
          return (
            localStorage.setItem(o, n),
            t && (document.cookie = ''.concat(o, '=').concat(n)),
            i(),
            r.getOverrideMap()
          )
        },
        getOverrideMap: function () {
          for (
            var e =
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              t = { imports: {}, scopes: {} },
              n = r.getDisabledOverrides(),
              o = 0;
            o < localStorage.length;
            o++
          ) {
            var i = localStorage.key(o)
            if (0 === i.indexOf('import-map-override:')) {
              var l = i.slice('import-map-override:'.length)
              ;(!e && n.indexOf(l) >= 0) ||
                (t.imports[l] = localStorage.getItem(i))
            }
          }
          return t
        },
        removeOverride: function (e) {
          var n = 'import-map-override:' + e,
            o = null !== localStorage.getItem(n)
          return (
            localStorage.removeItem(n),
            t &&
              (document.cookie = ''.concat(
                n,
                '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;',
              )),
            r.enableOverride(e),
            i(),
            o
          )
        },
        resetOverrides: function () {
          return (
            Object.keys(r.getOverrideMap(!0).imports).forEach(function (e) {
              r.removeOverride(e)
            }),
            localStorage.removeItem('import-map-overrides-disabled'),
            localStorage.removeItem('import-map-overrides-external-maps'),
            i(),
            r.getOverrideMap()
          )
        },
        hasOverrides: function () {
          return Object.keys(r.getOverrideMap().imports).length > 0
        },
        getUrlFromPort: function (e, t) {
          var n = e.replace(/@/g, '').replace(/\//g, '-')
          return '//localhost:'.concat(t, '/').concat(n, '.js')
        },
        enableUI: function () {
          var e = document.querySelector('import-map-overrides-full')
          e ||
            ((e = document.createElement(
              'import-map-overrides-full',
            )).setAttribute('show-when-local-storage', 'true'),
            document.body.appendChild(e))
          var t = e.getAttribute('show-when-local-storage')
          t && (localStorage.setItem(t, !0), e.renderWithPreact())
        },
        mergeImportMap: function (e, t) {
          var n = { imports: {}, scopes: {} }
          for (var r in e.imports) n.imports[r] = e.imports[r]
          for (var o in t.imports) n.imports[o] = t.imports[o]
          for (var i in e.scopes) n.scopes[i] = e.scopes[i]
          for (var l in t.scopes) n.scopes[l] = t.scopes[l]
          return n
        },
        getDefaultMap: function () {
          return (
            e ||
            (e = Array.prototype.reduce.call(
              document.querySelectorAll(
                'script[type="'.concat(
                  x,
                  '"], script[type="overridable-importmap"]',
                ),
              ),
              function (e, t) {
                return t.hasAttribute('data-is-importmap-override')
                  ? e
                  : ((n = t.src
                      ? f(t.src)
                      : Promise.resolve(JSON.parse(t.textContent))),
                    Promise.all([e, n]).then(function (e) {
                      var t = m(e, 2),
                        n = t[0],
                        o = t[1]
                      return r.mergeImportMap(n, o)
                    }))
                var n
              },
              Promise.resolve({ imports: {}, scopes: {} }),
            ))
          )
        },
        getCurrentPageMap: function () {
          return Promise.all([
            r.getDefaultMap(),
            r.getExternalOverrideMap(r.getCurrentPageExternalOverrides()),
          ]).then(function (e) {
            var t = m(e, 2),
              n = t[0],
              o = t[1]
            return r.mergeImportMap(r.mergeImportMap(n, o), a)
          })
        },
        getCurrentPageExternalOverrides: function () {
          var e = []
          return (
            document
              .querySelectorAll(
                '['.concat(
                  'data-is-importmap-override',
                  ']:not([id="import-map-overrides"])',
                ),
              )
              .forEach(function (t) {
                e.push(t.src)
              }),
            e
          )
        },
        getNextPageMap: function () {
          return Promise.all([
            r.getDefaultMap(),
            r.getExternalOverrideMap(),
          ]).then(function (e) {
            var t = m(e, 2),
              n = t[0],
              o = t[1]
            return r.mergeImportMap(r.mergeImportMap(n, o), r.getOverrideMap())
          })
        },
        disableOverride: function (e) {
          var t = r.getDisabledOverrides()
          return (
            !t.includes(e) &&
            (localStorage.setItem(
              'import-map-overrides-disabled',
              JSON.stringify(t.concat(e)),
            ),
            i(),
            !0)
          )
        },
        enableOverride: function (e) {
          var t = r.getDisabledOverrides(),
            n = t.indexOf(e)
          return (
            n >= 0 &&
            (t.splice(n, 1),
            localStorage.setItem(
              'import-map-overrides-disabled',
              JSON.stringify(t),
            ),
            i(),
            !0)
          )
        },
        getDisabledOverrides: function () {
          var e = localStorage.getItem('import-map-overrides-disabled')
          return e ? JSON.parse(e) : []
        },
        isDisabled: function (e) {
          return r.getDisabledOverrides().includes(e)
        },
        getExternalOverrides: function () {
          var e = localStorage.getItem('import-map-overrides-external-maps')
          return e ? JSON.parse(e).sort() : []
        },
        addExternalOverride: function (e) {
          e = new URL(e, document.baseURI).href
          var t = r.getExternalOverrides()
          return (
            !t.includes(e) &&
            (localStorage.setItem(
              'import-map-overrides-external-maps',
              JSON.stringify(t.concat(e)),
            ),
            i(),
            !0)
          )
        },
        removeExternalOverride: function (e) {
          var t = r.getExternalOverrides()
          return (
            !!t.includes(e) &&
            (localStorage.setItem(
              'import-map-overrides-external-maps',
              JSON.stringify(
                t.filter(function (t) {
                  return t !== e
                }),
              ),
            ),
            i(),
            !0)
          )
        },
        getExternalOverrideMap: function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : r.getExternalOverrides()
          return e.reduce(function (e, t) {
            var n = w[t] || (w[t] = f(t))
            return Promise.all([e, n]).then(function (e) {
              var t = m(e, 2),
                n = t[0],
                o = t[1]
              return r.mergeImportMap(n, o)
            })
          }, Promise.resolve({ imports: {}, scopes: {} }))
        },
        isExternalMapValid: function (e) {
          return (w[e] || (w[e] = f(e))).then(function () {
            return invalidExternalMaps.includes(e)
          })
        },
        invalidExternalMaps: [],
      }
      var r = window.importMapOverrides,
        o = !0
      try {
        CustomEvent ? new CustomEvent('a') : (o = !1)
      } catch (e) {
        o = !1
      }
      function i() {
        setTimeout(function () {
          o &&
            window.dispatchEvent(new CustomEvent('import-map-overrides:change'))
        })
      }
      var l,
        a = r.getOverrideMap(),
        u = r.getExternalOverrides()
      if (!n) {
        var s = document.querySelector('script[type="overridable-importmap"]')
        if (!(l = s)) {
          var d = document.querySelectorAll('script[type="'.concat(x, '"]'))
          l = d ? d[d.length - 1] : null
        }
        if (s) {
          if (s.src)
            throw Error(
              'import-map-overrides: external import maps with type="overridable-importmap" are not supported',
            )
          var c
          try {
            c = JSON.parse(s.textContent)
          } catch (e) {
            throw Error(
              'Invalid <script type="overridable-importmap"> - text content must be json',
            )
          }
          ;(l = p(r.mergeImportMap(c, a), 'import-map-overrides', l)), v()
        } else
          v(),
            Object.keys(a.imports).length > 0 &&
              (l = p(a, 'import-map-overrides', l))
      }
      function p(e, t, n) {
        var r = document.createElement('script')
        return (
          (r.type = x),
          (r.id = t),
          r.setAttribute('data-is-importmap-override', ''),
          'string' == typeof e
            ? (r.src = e)
            : (r.textContent = JSON.stringify(e, null, 2)),
          n
            ? n.insertAdjacentElement('afterend', r)
            : document.head.appendChild(r),
          r
        )
      }
      function f(e) {
        return fetch(e).then(
          function (e) {
            return e.ok
              ? e.json().catch(function (t) {
                  return (
                    console.warn(
                      Error(
                        'External override import map contained invalid json, at url '
                          .concat(e.url, '. ')
                          .concat(t),
                      ),
                    ),
                    r.invalidExternalMaps.push(e.url),
                    { imports: {}, scopes: {} }
                  )
                })
              : (console.warn(
                  Error(
                    'Unable to download external override import map from url '
                      .concat(e.url, '. Server responded with status ')
                      .concat(e.status),
                  ),
                ),
                r.invalidExternalMaps.push(e.url),
                { imports: {}, scopes: {} })
          },
          function () {
            return (
              console.warn(
                Error(
                  "Unable to download external import map at url '".concat(
                    e,
                    "'",
                  ),
                ),
              ),
              r.invalidExternalMaps.push(new URL(e, document.baseURI).href),
              { imports: {}, scopes: {} }
            )
          },
        )
      }
      function v() {
        u.length > 0 &&
          u.forEach(function (e, t) {
            l = p(e, 'import-map-overrides-external-'.concat(t))
          })
      }
    })(),
    (function (e, t) {
      void 0 === t && (t = {})
      var n = t.insertAt
      if ('undefined' != typeof document) {
        var r = document.head || document.getElementsByTagName('head')[0],
          o = document.createElement('style')
        ;(o.type = 'text/css'),
          'top' === n && r.firstChild
            ? r.insertBefore(o, r.firstChild)
            : r.appendChild(o),
          o.styleSheet
            ? (o.styleSheet.cssText = e)
            : o.appendChild(document.createTextNode(e))
      }
    })(
      '.imo-unstyled {\n  border: none;\n  padding: 0;\n  width: auto;\n  overflow: visible;\n  background: transparent;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  cursor: pointer;\n  -webkit-font-smoothing: inherit;\n  -moz-osx-font-smoothing: inherit;\n  -webkit-appearance: none;\n}\n\n.imo-unstyled::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n.imo-trigger {\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  margin: 10px;\n  border-radius: 5px;\n  background-color: navajowhite;\n  height: 50px;\n  width: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  font-family: sans-serif;\n  z-index: 10500;\n}\n\n.imo-popup {\n  box-sizing: border-box;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 50%;\n  z-index: 10000;\n  background-color: black;\n  color: white;\n  font-family: sans-serif;\n  padding: 24px;\n  overflow-y: auto;\n}\n\n.imo-popup a:visited,\nimo-popup a {\n  color: white;\n}\n\n.imo-popup .imo-module-dialog {\n  left: calc(50% - 200px);\n}\n\n.imo-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n\n.imo-list {\n  margin-left: 16px;\n}\n\n.imo-list > *:not(:last-child) {\n  margin-bottom: 8px;\n}\n\n.imo-list-container *,\n.imo-modal-container * {\n  font-family: sans-serif;\n  box-sizing: border-box;\n}\n\n.imo-module-dialog {\n  position: fixed;\n  z-index: 30000000;\n  top: 30%;\n  max-width: 600px;\n  margin: 0 auto;\n  border: 4px solid navajowhite;\n}\n\n.imo-module-dialog input {\n  width: 100%;\n  font-size: 16px;\n  box-sizing: border-box;\n  padding-right: 20px;\n}\n\n.imo-module-dialog table {\n  margin-bottom: 16px;\n}\n\n.imo-module-dialog table td:first-child {\n  text-align: right;\n  padding-right: 16px;\n  word-break: keep-all;\n}\n\n.imo-module-dialog table td {\n  word-break: break-all;\n}\n\n.imo-module-dialog.imo-overridden {\n  border: 4px solid salmon;\n}\n\n.imo-table-header-actions {\n  display: flex;\n  align-items: center;\n}\n\n.imo-overrides-table {\n  border-collapse: collapse;\n  margin-top: 32px;\n}\n\n.imo-overrides-table tr td:first-child {\n  display: flex;\n  align-items: center;\n  padding-right: 32px;\n  position: relative;\n}\n\n.imo-needs-refresh {\n  position: absolute;\n  right: 8px;\n  font-size: 32px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.imo-needs-refresh::before {\n  content: "\\27F2";\n}\n\n.imo-status {\n  height: 16px;\n  width: 16px;\n  border-radius: 8px;\n  border: 1px solid white;\n  margin-right: 8px;\n}\n\n.imo-disabled-override {\n  background-color: lightblue;\n}\n\n.imo-next-override {\n  background-color: darkred;\n}\n\n.imo-current-override {\n  background-color: salmon;\n}\n\n.imo-default-module {\n  background-color: lightgoldenrodyellow;\n}\n\n.imo-external-override {\n  background-color: orange;\n}\n\n.imo-next-default {\n  background-color: darkgoldenrod;\n}\n\n.imo-dev-lib-override {\n  background-color: lightpink;\n}\n\n.imo-overrides-table tbody tr:hover {\n  cursor: pointer;\n  background-color: #404040;\n}\n\n.imo-overrides-table td,\n.imo-overrides-table th {\n  line-height: 18px;\n  padding: 16px;\n  border: 1px solid white;\n}\n\n.imo-add-new {\n  margin-left: 16px;\n}\n\n.imo-clear-input {\n  position: absolute;\n  top: 0;\n  right: 4px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  height: 100%;\n}\n\n.imo-modal-container {\n  font-family: sans-serif;\n}\n\n.imo-modal {\n  background-color: rgba(61, 70, 77, 0.6);\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  z-index: 20000000;\n}\n\n.imo-list-search,\n.imo-list-container button,\n.imo-modal-container button {\n  font-size: 14px;\n  height: 27px;\n  line-height: 27px;\n}\n\n.imo-list-search {\n  line-height: 22px;\n  border: none;\n  padding: 5px;\n}\n',
    )
  var k,
    O,
    N,
    E,
    S,
    U = {},
    C = [],
    I = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i
  function P(e, t) {
    for (var n in t) e[n] = t[n]
    return e
  }
  function D(e) {
    var t = e.parentNode
    t && t.removeChild(e)
  }
  function A(e, t, n) {
    var r,
      o = arguments,
      i = {}
    for (r in t) 'key' !== r && 'ref' !== r && (i[r] = t[r])
    if (arguments.length > 3)
      for (n = [n], r = 3; r < arguments.length; r++) n.push(o[r])
    if (
      (null != n && (i.children = n),
      'function' == typeof e && null != e.defaultProps)
    )
      for (r in e.defaultProps) void 0 === i[r] && (i[r] = e.defaultProps[r])
    return j(e, i, t && t.key, t && t.ref, null)
  }
  function j(e, t, n, r, o) {
    var i = {
      type: e,
      props: t,
      key: n,
      ref: r,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      constructor: void 0,
      __v: o,
    }
    return null == o && (i.__v = i), k.vnode && k.vnode(i), i
  }
  function L(e) {
    return e.children
  }
  function R(e, t) {
    ;(this.props = e), (this.context = t)
  }
  function T(e, t) {
    if (null == t) return e.__ ? T(e.__, e.__.__k.indexOf(e) + 1) : null
    for (var n; t < e.__k.length; t++)
      if (null != (n = e.__k[t]) && null != n.__e) return n.__e
    return 'function' == typeof e.type ? T(e) : null
  }
  function F(e) {
    var t, n
    if (null != (e = e.__) && null != e.__c) {
      for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
        if (null != (n = e.__k[t]) && null != n.__e) {
          e.__e = e.__c.base = n.__e
          break
        }
      return F(e)
    }
  }
  function W(e) {
    ;((!e.__d && (e.__d = !0) && O.push(e) && !z.__r++) ||
      E !== k.debounceRendering) &&
      ((E = k.debounceRendering) || N)(z)
  }
  function z() {
    for (var e; (z.__r = O.length); )
      (e = O.sort(function (e, t) {
        return e.__v.__b - t.__v.__b
      })),
        (O = []),
        e.some(function (e) {
          var t, n, r, o, i, l, a
          e.__d &&
            ((l = (i = (t = e).__v).__e),
            (a = t.__P) &&
              ((n = []),
              ((r = P({}, i)).__v = r),
              (o = G(
                a,
                i,
                r,
                t.__n,
                void 0 !== a.ownerSVGElement,
                null,
                n,
                null == l ? T(i) : l,
              )),
              K(n, i),
              o != l && F(i)))
        })
  }
  function q(e, t, n, r, o, i, l, a, u, s) {
    var d,
      c,
      p,
      m,
      f,
      v,
      h,
      g = (r && r.__k) || C,
      _ = g.length
    for (
      u == U && (u = null != l ? l[0] : _ ? T(r, 0) : null), n.__k = [], d = 0;
      d < t.length;
      d++
    )
      if (
        null !=
        (m = n.__k[d] =
          null == (m = t[d]) || 'boolean' == typeof m
            ? null
            : 'string' == typeof m || 'number' == typeof m
            ? j(null, m, null, null, m)
            : Array.isArray(m)
            ? j(L, { children: m }, null, null, null)
            : null != m.__e || null != m.__c
            ? j(m.type, m.props, m.key, null, m.__v)
            : m)
      ) {
        if (
          ((m.__ = n),
          (m.__b = n.__b + 1),
          null === (p = g[d]) || (p && m.key == p.key && m.type === p.type))
        )
          g[d] = void 0
        else
          for (c = 0; c < _; c++) {
            if ((p = g[c]) && m.key == p.key && m.type === p.type) {
              g[c] = void 0
              break
            }
            p = null
          }
        ;(f = G(e, m, (p = p || U), o, i, l, a, u, s)),
          (c = m.ref) &&
            p.ref != c &&
            (h || (h = []),
            p.ref && h.push(p.ref, null, m),
            h.push(c, m.__c || f, m)),
          null != f
            ? (null == v && (v = f),
              (u = J(e, m, p, g, l, f, u)),
              'option' == n.type
                ? (e.value = '')
                : 'function' == typeof n.type && (n.__d = u))
            : u && p.__e == u && u.parentNode != e && (u = T(p))
      }
    if (((n.__e = v), null != l && 'function' != typeof n.type))
      for (d = l.length; d--; ) null != l[d] && D(l[d])
    for (d = _; d--; ) null != g[d] && Y(g[d], g[d])
    if (h) for (d = 0; d < h.length; d++) X(h[d], h[++d], h[++d])
  }
  function J(e, t, n, r, o, i, l) {
    var a, u, s
    if (void 0 !== t.__d) (a = t.__d), (t.__d = void 0)
    else if (o == n || i != l || null == i.parentNode)
      e: if (null == l || l.parentNode !== e) e.appendChild(i), (a = null)
      else {
        for (u = l, s = 0; (u = u.nextSibling) && s < r.length; s += 2)
          if (u == i) break e
        e.insertBefore(i, l), (a = l)
      }
    return void 0 !== a ? a : i.nextSibling
  }
  function V(e, t, n) {
    '-' === t[0]
      ? e.setProperty(t, n)
      : (e[t] =
          'number' == typeof n && !1 === I.test(t)
            ? n + 'px'
            : null == n
            ? ''
            : n)
  }
  function B(e, t, n, r, o) {
    var i, l, a, u, s
    if (
      (o
        ? 'className' === t && (t = 'class')
        : 'class' === t && (t = 'className'),
      'style' === t)
    )
      if (((i = e.style), 'string' == typeof n)) i.cssText = n
      else {
        if (('string' == typeof r && ((i.cssText = ''), (r = null)), r))
          for (u in r) (n && u in n) || V(i, u, '')
        if (n) for (s in n) (r && n[s] === r[s]) || V(i, s, n[s])
      }
    else
      'o' === t[0] && 'n' === t[1]
        ? ((l = t !== (t = t.replace(/Capture$/, ''))),
          (a = t.toLowerCase()),
          (t = (a in e ? a : t).slice(2)),
          n
            ? (r || e.addEventListener(t, H, l), ((e.l || (e.l = {}))[t] = n))
            : e.removeEventListener(t, H, l))
        : 'list' !== t &&
          'tagName' !== t &&
          'form' !== t &&
          'type' !== t &&
          'size' !== t &&
          !o &&
          t in e
        ? (e[t] = null == n ? '' : n)
        : 'function' != typeof n &&
          'dangerouslySetInnerHTML' !== t &&
          (t !== (t = t.replace(/^xlink:?/, ''))
            ? null == n || !1 === n
              ? e.removeAttributeNS(
                  'http://www.w3.org/1999/xlink',
                  t.toLowerCase(),
                )
              : e.setAttributeNS(
                  'http://www.w3.org/1999/xlink',
                  t.toLowerCase(),
                  n,
                )
            : null == n || (!1 === n && !/^ar/.test(t))
            ? e.removeAttribute(t)
            : e.setAttribute(t, n))
  }
  function H(e) {
    this.l[e.type](k.event ? k.event(e) : e)
  }
  function $(e, t, n) {
    var r, o
    for (r = 0; r < e.__k.length; r++)
      (o = e.__k[r]) &&
        ((o.__ = e),
        o.__e &&
          ('function' == typeof o.type && o.__k.length > 1 && $(o, t, n),
          (t = J(n, o, o, e.__k, null, o.__e, t)),
          'function' == typeof e.type && (e.__d = t)))
  }
  function G(e, t, n, r, o, i, l, a, u) {
    var s,
      d,
      c,
      p,
      m,
      f,
      v,
      h,
      g,
      _,
      y,
      b = t.type
    if (void 0 !== t.constructor) return null
    ;(s = k.__b) && s(t)
    try {
      e: if ('function' == typeof b) {
        if (
          ((h = t.props),
          (g = (s = b.contextType) && r[s.__c]),
          (_ = s ? (g ? g.props.value : s.__) : r),
          n.__c
            ? (v = (d = t.__c = n.__c).__ = d.__E)
            : ('prototype' in b && b.prototype.render
                ? (t.__c = d = new b(h, _))
                : ((t.__c = d = new R(h, _)),
                  (d.constructor = b),
                  (d.render = Z)),
              g && g.sub(d),
              (d.props = h),
              d.state || (d.state = {}),
              (d.context = _),
              (d.__n = r),
              (c = d.__d = !0),
              (d.__h = [])),
          null == d.__s && (d.__s = d.state),
          null != b.getDerivedStateFromProps &&
            (d.__s == d.state && (d.__s = P({}, d.__s)),
            P(d.__s, b.getDerivedStateFromProps(h, d.__s))),
          (p = d.props),
          (m = d.state),
          c)
        )
          null == b.getDerivedStateFromProps &&
            null != d.componentWillMount &&
            d.componentWillMount(),
            null != d.componentDidMount && d.__h.push(d.componentDidMount)
        else {
          if (
            (null == b.getDerivedStateFromProps &&
              h !== p &&
              null != d.componentWillReceiveProps &&
              d.componentWillReceiveProps(h, _),
            (!d.__e &&
              null != d.shouldComponentUpdate &&
              !1 === d.shouldComponentUpdate(h, d.__s, _)) ||
              t.__v === n.__v)
          ) {
            ;(d.props = h),
              (d.state = d.__s),
              t.__v !== n.__v && (d.__d = !1),
              (d.__v = t),
              (t.__e = n.__e),
              (t.__k = n.__k),
              d.__h.length && l.push(d),
              $(t, a, e)
            break e
          }
          null != d.componentWillUpdate && d.componentWillUpdate(h, d.__s, _),
            null != d.componentDidUpdate &&
              d.__h.push(function () {
                d.componentDidUpdate(p, m, f)
              })
        }
        ;(d.context = _),
          (d.props = h),
          (d.state = d.__s),
          (s = k.__r) && s(t),
          (d.__d = !1),
          (d.__v = t),
          (d.__P = e),
          (s = d.render(d.props, d.state, d.context)),
          (d.state = d.__s),
          null != d.getChildContext && (r = P(P({}, r), d.getChildContext())),
          c ||
            null == d.getSnapshotBeforeUpdate ||
            (f = d.getSnapshotBeforeUpdate(p, m)),
          (y =
            null != s && s.type == L && null == s.key ? s.props.children : s),
          q(e, Array.isArray(y) ? y : [y], t, n, r, o, i, l, a, u),
          (d.base = t.__e),
          d.__h.length && l.push(d),
          v && (d.__E = d.__ = null),
          (d.__e = !1)
      } else
        null == i && t.__v === n.__v
          ? ((t.__k = n.__k), (t.__e = n.__e))
          : (t.__e = Q(n.__e, t, n, r, o, i, l, u))
      ;(s = k.diffed) && s(t)
    } catch (e) {
      ;(t.__v = null), k.__e(e, t, n)
    }
    return t.__e
  }
  function K(e, t) {
    k.__c && k.__c(t, e),
      e.some(function (t) {
        try {
          ;(e = t.__h),
            (t.__h = []),
            e.some(function (e) {
              e.call(t)
            })
        } catch (e) {
          k.__e(e, t.__v)
        }
      })
  }
  function Q(e, t, n, r, o, i, l, a) {
    var u,
      s,
      d,
      c,
      p,
      m = n.props,
      f = t.props
    if (((o = 'svg' === t.type || o), null != i))
      for (u = 0; u < i.length; u++)
        if (
          null != (s = i[u]) &&
          ((null === t.type ? 3 === s.nodeType : s.localName === t.type) ||
            e == s)
        ) {
          ;(e = s), (i[u] = null)
          break
        }
    if (null == e) {
      if (null === t.type) return document.createTextNode(f)
      ;(e = o
        ? document.createElementNS('http://www.w3.org/2000/svg', t.type)
        : document.createElement(t.type, f.is && { is: f.is })),
        (i = null),
        (a = !1)
    }
    if (null === t.type) m !== f && e.data != f && (e.data = f)
    else {
      if (
        (null != i && (i = C.slice.call(e.childNodes)),
        (d = (m = n.props || U).dangerouslySetInnerHTML),
        (c = f.dangerouslySetInnerHTML),
        !a)
      ) {
        if (null != i)
          for (m = {}, p = 0; p < e.attributes.length; p++)
            m[e.attributes[p].name] = e.attributes[p].value
        ;(c || d) &&
          ((c && d && c.__html == d.__html) ||
            (e.innerHTML = (c && c.__html) || ''))
      }
      ;(function (e, t, n, r, o) {
        var i
        for (i in n)
          'children' === i || 'key' === i || i in t || B(e, i, null, n[i], r)
        for (i in t)
          (o && 'function' != typeof t[i]) ||
            'children' === i ||
            'key' === i ||
            'value' === i ||
            'checked' === i ||
            n[i] === t[i] ||
            B(e, i, t[i], n[i], r)
      })(e, f, m, o, a),
        c
          ? (t.__k = [])
          : ((u = t.props.children),
            q(
              e,
              Array.isArray(u) ? u : [u],
              t,
              n,
              r,
              'foreignObject' !== t.type && o,
              i,
              l,
              U,
              a,
            )),
        a ||
          ('value' in f &&
            void 0 !== (u = f.value) &&
            u !== e.value &&
            B(e, 'value', u, m.value, !1),
          'checked' in f &&
            void 0 !== (u = f.checked) &&
            u !== e.checked &&
            B(e, 'checked', u, m.checked, !1))
    }
    return e
  }
  function X(e, t, n) {
    try {
      'function' == typeof e ? e(t) : (e.current = t)
    } catch (e) {
      k.__e(e, n)
    }
  }
  function Y(e, t, n) {
    var r, o, i
    if (
      (k.unmount && k.unmount(e),
      (r = e.ref) && ((r.current && r.current !== e.__e) || X(r, null, t)),
      n || 'function' == typeof e.type || (n = null != (o = e.__e)),
      (e.__e = e.__d = void 0),
      null != (r = e.__c))
    ) {
      if (r.componentWillUnmount)
        try {
          r.componentWillUnmount()
        } catch (e) {
          k.__e(e, t)
        }
      r.base = r.__P = null
    }
    if ((r = e.__k)) for (i = 0; i < r.length; i++) r[i] && Y(r[i], t, n)
    null != o && D(o)
  }
  function Z(e, t, n) {
    return this.constructor(e, n)
  }
  function ee(e, t, n) {
    var r, o, i
    k.__ && k.__(e, t),
      (o = (r = n === S) ? null : (n && n.__k) || t.__k),
      (e = A(L, null, [e])),
      (i = []),
      G(
        t,
        ((r ? t : n || t).__k = e),
        o || U,
        U,
        void 0 !== t.ownerSVGElement,
        n && !r
          ? [n]
          : o
          ? null
          : t.childNodes.length
          ? C.slice.call(t.childNodes)
          : null,
        i,
        n || U,
        r,
      ),
      K(i, e)
  }
  ;(k = {
    __e: function (e, t) {
      for (var n, r; (t = t.__); )
        if ((n = t.__c) && !n.__)
          try {
            if (
              (n.constructor &&
                null != n.constructor.getDerivedStateFromError &&
                ((r = !0),
                n.setState(n.constructor.getDerivedStateFromError(e))),
              null != n.componentDidCatch && ((r = !0), n.componentDidCatch(e)),
              r)
            )
              return W((n.__E = n))
          } catch (t) {
            e = t
          }
      throw e
    },
  }),
    (R.prototype.setState = function (e, t) {
      var n
      ;(n =
        this.__s !== this.state ? this.__s : (this.__s = P({}, this.state))),
        'function' == typeof e && (e = e(n, this.props)),
        e && P(n, e),
        null != e && this.__v && (t && this.__h.push(t), W(this))
    }),
    (R.prototype.forceUpdate = function (e) {
      this.__v && ((this.__e = !0), e && this.__h.push(e), W(this))
    }),
    (R.prototype.render = L),
    (O = []),
    (N =
      'function' == typeof Promise
        ? Promise.prototype.then.bind(Promise.resolve())
        : setTimeout),
    (z.__r = 0),
    (S = U)
  var te = (function (t) {
      o(l, t)
      var i = p(l)
      function l() {
        var t
        e(this, l)
        for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)
          o[a] = arguments[a]
        return (
          r(
            d((t = i.call.apply(i, [this].concat(o)))),
            'getInitialOverrideUrl',
            function () {
              var e = new RegExp('//localhost:([0-9]+)/').exec(
                t.props.module.overrideUrl,
              )
              return e &&
                t.props.module.overrideUrl ===
                  window.importMapOverrides.getUrlFromPort(
                    t.props.module.moduleName,
                    e[1],
                  )
                ? e[1]
                : t.props.module.overrideUrl
                ? t.props.module.overrideUrl
                : ''
            },
          ),
          r(d(t), 'state', {
            overrideUrl: t.getInitialOverrideUrl(),
            moduleName: '',
          }),
          r(d(t), 'inputEl', null),
          r(d(t), 'moduleNameEl', null),
          r(d(t), 'handleInputRef', function (e) {
            t.inputEl = e
          }),
          r(d(t), 'handleModuleNameRef', function (e) {
            t.moduleNameEl = e
          }),
          r(d(t), 'dialogRef', function (e) {
            t.dialogEl = e
          }),
          r(d(t), 'handleSubmit', function (e) {
            e.preventDefault(),
              t.props.module.moduleName &&
                window.importMapOverrides.isDisabled(
                  t.props.module.moduleName,
                ) &&
                window.importMapOverrides.enableOverride(
                  t.props.module.moduleName,
                ),
              t.props.module.isNew
                ? t.props.addNewModule(t.state.moduleName, t.state.overrideUrl)
                : t.props.updateModuleUrl(t.state.overrideUrl)
          }),
          r(d(t), 'getDerivedUrl', function () {
            var e = t.props.module.isNew
              ? t.state.moduleName
              : t.props.module.moduleName
            return ne.test(t.state.overrideUrl)
              ? window.importMapOverrides.getUrlFromPort(e, t.state.overrideUrl)
              : t.state.overrideUrl
          }),
          r(d(t), 'keyDown', function (e) {
            'Escape' === e.key && (e.stopPropagation(), t.props.cancel())
          }),
          r(d(t), 'focusFirstInput', function () {
            ;(t.moduleNameEl || t.inputEl).select()
          }),
          r(d(t), 'clearModuleName', function () {
            t.setState({ moduleName: '' }, function () {
              t.focusFirstInput()
            })
          }),
          r(d(t), 'clearInput', function () {
            t.setState({ overrideUrl: '' }, function () {
              t.focusFirstInput()
            })
          }),
          t
        )
      }
      return (
        n(l, [
          {
            key: 'componentDidMount',
            value: function () {
              this.focusFirstInput(),
                this.dialogEl.addEventListener('keydown', this.keyDown)
            },
          },
          {
            key: 'componentDidUpdate',
            value: function (e, t) {
              var n = this
              this.props.module !== e.module &&
                this.setState(
                  { overrideUrl: this.props.module.overrideUrl || '' },
                  function () {
                    n.focusFirstInput()
                  },
                )
            },
          },
          {
            key: 'componentWillUnmount',
            value: function () {
              this.dialogEl.removeEventListener('keydown', this.keyDown)
            },
          },
          {
            key: 'render',
            value: function (e) {
              var t = this,
                n = e.module
              return A(
                'div',
                { className: 'imo-modal-container' },
                A('div', { className: 'imo-modal' }),
                A(
                  'dialog',
                  {
                    className: 'imo-module-dialog '.concat(
                      this.state.overrideUrl.length > 0
                        ? 'imo-overridden'
                        : 'imo-default',
                    ),
                    open: !0,
                    ref: this.dialogRef,
                  },
                  A(
                    'form',
                    { method: 'dialog', onSubmit: this.handleSubmit },
                    A('h3', { style: { marginTop: 0 } }, n.moduleName),
                    A(
                      'table',
                      null,
                      A(
                        'tbody',
                        null,
                        !n.isNew &&
                          A(
                            'tr',
                            null,
                            A('td', null, 'Default URL:'),
                            A('td', null, n.defaultUrl),
                          ),
                        n.isNew &&
                          A(
                            'tr',
                            null,
                            A(
                              'td',
                              null,
                              A(
                                'span',
                                { id: 'module-name-label' },
                                'Module Name:',
                              ),
                            ),
                            A(
                              'td',
                              { style: { position: 'relative' } },
                              A('input', {
                                type: 'text',
                                tabIndex: 1,
                                value: this.state.moduleName,
                                'aria-labelledby': 'module-name-label',
                                onInput: function (e) {
                                  return t.setState({
                                    moduleName: e.target.value,
                                  })
                                },
                                ref: this.handleModuleNameRef,
                                required: !0,
                              }),
                              A(
                                'div',
                                {
                                  role: 'button',
                                  tabIndex: 3,
                                  className: 'imo-clear-input',
                                  onClick: this.clearModuleName,
                                },
                                A('div', null, 'ⓧ'),
                              ),
                            ),
                          ),
                        A(
                          'tr',
                          null,
                          A(
                            'td',
                            null,
                            A(
                              'span',
                              { id: 'override-url-label' },
                              'Override URL:',
                            ),
                          ),
                          A(
                            'td',
                            { style: { position: 'relative' } },
                            A('input', {
                              ref: this.handleInputRef,
                              type: 'text',
                              value: this.state.overrideUrl,
                              'aria-labelledby': 'override-url-label',
                              tabIndex: 2,
                              onInput: function (e) {
                                return t.setState({
                                  overrideUrl: e.target.value,
                                })
                              },
                            }),
                            A(
                              'div',
                              {
                                role: 'button',
                                tabIndex: 4,
                                className: 'imo-clear-input',
                                onClick: this.clearInput,
                              },
                              A('div', null, 'ⓧ'),
                            ),
                          ),
                        ),
                        ne.test(this.state.overrideUrl) &&
                          A(
                            'tr',
                            null,
                            A('td', null, 'Derived url:'),
                            A('td', null, this.getDerivedUrl()),
                          ),
                      ),
                    ),
                    A(
                      'div',
                      { className: 'imo-dialog-actions' },
                      A(
                        'button',
                        {
                          type: 'button',
                          tabIndex: 5,
                          onClick: this.props.cancel,
                          style: { marginRight: '16px' },
                        },
                        'Cancel',
                      ),
                      this.props.module.overrideUrl &&
                        !this.props.module.disabled &&
                        A(
                          'button',
                          {
                            type: 'button',
                            onClick: function () {
                              t.props.module.disabled
                                ? window.importMapOverrides.enableOverride(
                                    t.props.module.moduleName,
                                  )
                                : window.importMapOverrides.disableOverride(
                                    t.props.module.moduleName,
                                  ),
                                t.props.cancel()
                            },
                            tabIndex: 6,
                            style: { marginRight: '16px' },
                          },
                          this.props.module.disabled ? 'Enable' : 'Disable',
                          ' Override',
                        ),
                      A(
                        'button',
                        {
                          type: 'submit',
                          tabIndex: 7,
                          className: this.state.overrideUrl
                            ? 'imo-overridden'
                            : 'imo-default',
                        },
                        this.state.overrideUrl
                          ? 'Apply override'
                          : 'Reset to default',
                      ),
                    ),
                  ),
                ),
              )
            },
          },
        ]),
        l
      )
    })(R),
    ne = /^\d+$/,
    re = (function (t) {
      o(l, t)
      var i = p(l)
      function l() {
        var t
        e(this, l)
        for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)
          o[a] = arguments[a]
        return (
          r(d((t = i.call.apply(i, [this].concat(o)))), 'state', {
            url: t.props.dialogExternalMap.isNew
              ? ''
              : t.props.dialogExternalMap.url,
          }),
          r(d(t), 'inputEl', null),
          r(d(t), 'handleSubmit', function (e) {
            e.preventDefault(),
              t.props.dialogExternalMap.isNew ||
                window.importMapOverrides.removeExternalOverride(
                  t.props.dialogExternalMap.url,
                ),
              t.state.url &&
                window.importMapOverrides.addExternalOverride(t.state.url),
              t.props.cancel()
          }),
          r(d(t), 'keyDown', function (e) {
            'Escape' === e.key && (e.stopPropagation(), t.props.cancel())
          }),
          t
        )
      }
      return (
        n(l, [
          {
            key: 'componentDidMount',
            value: function () {
              this.inputEl.focus(),
                this.dialogEl.addEventListener('keydown', this.keyDown)
            },
          },
          {
            key: 'componentWillUnmount',
            value: function () {
              this.dialogEl.removeEventListener('keydown', this.keyDown)
            },
          },
          {
            key: 'render',
            value: function () {
              var e = this
              return A(
                'div',
                { className: 'imo-modal-container' },
                A('div', { className: 'imo-modal' }),
                A(
                  'dialog',
                  {
                    className: 'imo-module-dialog',
                    open: !0,
                    ref: function (t) {
                      return (e.dialogEl = t)
                    },
                  },
                  A(
                    'form',
                    { method: 'dialog', onSubmit: this.handleSubmit },
                    A(
                      'h3',
                      { style: { marginTop: 0 } },
                      this.props.dialogExternalMap.isNew
                        ? 'Add External Import Map'
                        : 'Edit External Import Map',
                    ),
                    A(
                      'div',
                      { style: { marginBottom: '20px' } },
                      A(
                        'label',
                        { htmlFor: 'external-importmap-url' },
                        'URL to import map:',
                      ),
                      A(
                        'span',
                        { style: { position: 'relative' } },
                        A('input', {
                          id: 'external-importmap-url',
                          type: 'text',
                          value: this.state.url,
                          onInput: function (t) {
                            return e.setState({ url: t.target.value })
                          },
                          ref: function (t) {
                            return (e.inputEl = t)
                          },
                          required: this.props.dialogExternalMap.isNew,
                        }),
                        A(
                          'div',
                          {
                            role: 'button',
                            tabIndex: 0,
                            className: 'imo-clear-input',
                            onClick: function () {
                              return e.setState({ url: '' })
                            },
                          },
                          A('div', null, 'ⓧ'),
                        ),
                      ),
                    ),
                    A(
                      'div',
                      { className: 'imo-dialog-actions' },
                      A(
                        'button',
                        {
                          type: 'button',
                          onClick: this.props.cancel,
                          style: { marginRight: '16px' },
                        },
                        'Cancel',
                      ),
                      A(
                        'button',
                        {
                          type: 'submit',
                          className: this.state.url
                            ? 'imo-overridden'
                            : 'imo-default',
                        },
                        this.state.url || this.props.dialogExternalMap.isNew
                          ? 'Apply override'
                          : 'Remove override',
                      ),
                    ),
                  ),
                ),
              )
            },
          },
        ]),
        l
      )
    })(R),
    oe = (function (t) {
      o(i, t)
      var r = p(i)
      function i() {
        return e(this, i), r.apply(this, arguments)
      }
      return (
        n(i, [
          {
            key: 'componentDidMount',
            value: function () {
              window.importMapOverrides.getCurrentPageMap().then(ae)
            },
          },
          {
            key: 'render',
            value: function () {
              return null
            },
          },
        ]),
        i
      )
    })(R),
    ie = function (e) {
      return e.replace('.min.js', '.js')
    },
    le = {
      react: function (e) {
        return e.replace('production.min', 'development')
      },
      'react-dom': function (e) {
        return e.replace('production.min', 'development')
      },
      'single-spa': function (e) {
        return e.replace('single-spa.min.js', 'single-spa.dev.js')
      },
      vue: ie,
      'vue-router': ie,
      '@angular/core': ie,
      '@angular/common': ie,
      '@angular/router': ie,
      '@angular/platform-browser': ie,
    }
  function ae(e) {
    Object.keys(e.imports)
      .filter(function (e) {
        return le[e]
      })
      .forEach(function (t) {
        window.importMapOverrides.addOverride(t, le[t](e.imports[t]))
      })
  }
  function ue() {
    return (
      Object.keys(window.importMapOverrides.getOverrideMap().imports).filter(
        function (e) {
          return !le[e]
        },
      ).length > 0
    )
  }
  var se = (function (t) {
    o(l, t)
    var i = p(l)
    function l() {
      var t
      e(this, l)
      for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)
        o[a] = arguments[a]
      return (
        r(d((t = i.call.apply(i, [this].concat(o)))), 'state', {
          notOverriddenMap: { imports: {} },
          currentPageMap: { imports: {} },
          nextPageMap: { imports: {} },
          dialogModule: null,
          dialogExternalMap: null,
          searchVal: '',
        }),
        r(d(t), 'cancel', function () {
          t.setState({ dialogModule: null, dialogExternalMap: null })
        }),
        r(d(t), 'updateModuleUrl', function (e) {
          null === (e = e || null)
            ? window.importMapOverrides.removeOverride(
                t.state.dialogModule.moduleName,
              )
            : window.importMapOverrides.addOverride(
                t.state.dialogModule.moduleName,
                e,
              ),
            t.setState({ dialogModule: null })
        }),
        r(d(t), 'doUpdate', function () {
          t.forceUpdate(),
            window.importMapOverrides.getNextPageMap().then(function (e) {
              t.setState({ nextPageMap: e })
            })
        }),
        r(d(t), 'addNewModule', function (e, n) {
          e && n && window.importMapOverrides.addOverride(e, n),
            t.setState({ dialogModule: null })
        }),
        r(d(t), 'filterModuleNames', function (e) {
          return (
            !(t.state.searchVal.trim().length > 0) ||
            e.includes(t.state.searchVal)
          )
        }),
        t
      )
    }
    return (
      n(l, [
        {
          key: 'componentDidMount',
          value: function () {
            var e = this
            window.importMapOverrides.getDefaultMap().then(function (t) {
              e.setState({ notOverriddenMap: t })
            }),
              window.importMapOverrides.getCurrentPageMap().then(function (t) {
                e.setState({ currentPageMap: t })
              }),
              window.importMapOverrides.getNextPageMap().then(function (t) {
                e.setState({ nextPageMap: t })
              }),
              window.addEventListener(
                'import-map-overrides:change',
                this.doUpdate,
              ),
              this.inputRef.focus()
          },
        },
        {
          key: 'componentWillUnmount',
          value: function () {
            window.removeEventListener(
              'import-map-overrides:change',
              this.doUpdate,
            )
          },
        },
        {
          key: 'componentDidUpdate',
          value: function (e, t) {
            !t.dialogModule && this.state.dialogModule
              ? ((this.dialogContainer = document.createElement('div')),
                document.body.appendChild(this.dialogContainer),
                ee(
                  A(te, {
                    module: this.state.dialogModule,
                    cancel: this.cancel,
                    updateModuleUrl: this.updateModuleUrl,
                    addNewModule: this.addNewModule,
                  }),
                  this.dialogContainer,
                ))
              : t.dialogModule &&
                !this.state.dialogModule &&
                (ee(null, this.dialogContainer),
                this.dialogContainer.remove(),
                delete this.dialogContainer),
              !t.dialogExternalMap && this.state.dialogExternalMap
                ? ((this.dialogContainer = document.createElement('div')),
                  document.body.appendChild(this.dialogContainer),
                  ee(
                    A(re, {
                      dialogExternalMap: this.state.dialogExternalMap,
                      cancel: this.cancel,
                    }),
                    this.dialogContainer,
                  ))
                : t.dialogExternalMap &&
                  !this.state.dialogExternalMap &&
                  (ee(null, this.dialogContainer),
                  this.dialogContainer.remove(),
                  delete this.dialogContainer)
          },
        },
        {
          key: 'render',
          value: function () {
            var e = this,
              t = [],
              n = [],
              r = [],
              o = [],
              i = [],
              l = [],
              a = [],
              u = window.importMapOverrides.getOverrideMap(!0).imports,
              s = Object.keys(this.state.notOverriddenMap.imports),
              d = window.importMapOverrides.getDisabledOverrides()
            s.filter(this.filterModuleNames).forEach(function (s) {
              var c = {
                moduleName: s,
                defaultUrl: e.state.notOverriddenMap.imports[s],
                overrideUrl: u[s],
                disabled: d.includes(s),
              }
              c.disabled
                ? r.push(c)
                : u[s]
                ? e.state.currentPageMap.imports[s] === u[s]
                  ? le[s] && le[s](e.state.currentPageMap.imports[s]) === u[s]
                    ? a.push(c)
                    : t.push(c)
                  : n.push(c)
                : e.state.notOverriddenMap.imports[s] ===
                  e.state.currentPageMap.imports[s]
                ? o.push(c)
                : e.state.notOverriddenMap.imports[s] ===
                  e.state.nextPageMap.imports[s]
                ? l.push(c)
                : i.push(c)
            }),
              Object.keys(u)
                .filter(this.filterModuleNames)
                .forEach(function (o) {
                  if (!s.includes(o)) {
                    var i = {
                      moduleName: o,
                      defaultUrl: null,
                      overrideUrl: u[o],
                      disabled: d.includes(o),
                    }
                    i.disabled
                      ? r.push(i)
                      : e.state.currentPageMap.imports[o] === u[o]
                      ? t.push(i)
                      : n.push(i)
                  }
                }),
              t.sort(de),
              o.sort(de),
              n.sort(de)
            var c = (function () {
                var e,
                  t = window.importMapOverrides.getExternalOverrides(),
                  n = window.importMapOverrides.getCurrentPageExternalOverrides(),
                  r = [],
                  o = [],
                  i = [],
                  l = (function (e, t) {
                    var n
                    if (
                      'undefined' == typeof Symbol ||
                      null == e[Symbol.iterator]
                    ) {
                      if (Array.isArray(e) || (n = f(e))) {
                        n && (e = n)
                        var r = 0,
                          o = function () {}
                        return {
                          s: o,
                          n: function () {
                            return r >= e.length
                              ? { done: !0 }
                              : { done: !1, value: e[r++] }
                          },
                          e: function (e) {
                            throw e
                          },
                          f: o,
                        }
                      }
                      throw new TypeError(
                        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                      )
                    }
                    var i,
                      l = !0,
                      a = !1
                    return {
                      s: function () {
                        n = e[Symbol.iterator]()
                      },
                      n: function () {
                        var e = n.next()
                        return (l = e.done), e
                      },
                      e: function (e) {
                        ;(a = !0), (i = e)
                      },
                      f: function () {
                        try {
                          l || null == n.return || n.return()
                        } finally {
                          if (a) throw i
                        }
                      },
                    }
                  })(t)
                try {
                  for (l.s(); !(e = l.n()).done; ) {
                    var a = e.value
                    window.importMapOverrides.invalidExternalMaps.includes(a)
                      ? r.push(a)
                      : n.includes(a)
                      ? o.push(a)
                      : i.push(a)
                  }
                } catch (e) {
                  l.e(e)
                } finally {
                  l.f()
                }
                return {
                  brokenMaps: r,
                  workingCurrentPageMaps: o,
                  workingNextPageMaps: i,
                }
              })(),
              p = c.brokenMaps,
              m = c.workingCurrentPageMaps,
              v = c.workingNextPageMaps
            return A(
              'div',
              { className: 'imo-list-container' },
              A(
                'div',
                { className: 'imo-table-header-actions' },
                A('input', {
                  className: 'imo-list-search',
                  'aria-label': 'Search modules',
                  placeholder: 'Search modules',
                  value: this.state.searchVal,
                  onInput: function (t) {
                    return e.setState({ searchVal: t.target.value })
                  },
                  ref: function (t) {
                    return (e.inputRef = t)
                  },
                }),
                A(
                  'div',
                  { className: 'imo-add-new' },
                  A(
                    'button',
                    {
                      onClick: function () {
                        return e.setState({
                          dialogModule: { moduleName: 'New module', isNew: !0 },
                        })
                      },
                    },
                    'Add new module',
                  ),
                ),
                A(
                  'div',
                  { className: 'imo-add-new' },
                  A(
                    'button',
                    {
                      onClick: function () {
                        e.setState({
                          dialogExternalMap: { url: '', isNew: !0 },
                        })
                      },
                    },
                    'Add import map',
                  ),
                ),
                A(
                  'div',
                  { className: 'imo-add-new' },
                  A(
                    'button',
                    {
                      onClick: function () {
                        return window.importMapOverrides.resetOverrides()
                      },
                    },
                    'Reset all overrides',
                  ),
                ),
              ),
              A(
                'table',
                { className: 'imo-overrides-table' },
                A(
                  'thead',
                  null,
                  A(
                    'tr',
                    null,
                    A('th', null, 'Module Status'),
                    A('th', null, 'Module Name'),
                    A('th', null, 'Domain'),
                    A('th', null, 'Filename'),
                  ),
                ),
                A(
                  'tbody',
                  null,
                  n.map(function (t) {
                    return A(
                      'tr',
                      {
                        role: 'button',
                        tabIndex: 0,
                        onClick: function () {
                          return e.setState({ dialogModule: t })
                        },
                        key: t.moduleName,
                      },
                      A(
                        'td',
                        null,
                        A('div', { className: 'imo-status imo-next-override' }),
                        A('div', null, 'Inline Override'),
                        A('div', { className: 'imo-needs-refresh' }),
                      ),
                      A('td', null, t.moduleName),
                      A('td', null, pe(t)),
                      A('td', null, me(t)),
                    )
                  }),
                  l.map(function (t) {
                    return A(
                      'tr',
                      {
                        role: 'button',
                        tabIndex: 0,
                        onClick: function () {
                          return e.setState({ dialogModule: t })
                        },
                        key: t.moduleName,
                      },
                      A(
                        'td',
                        { style: { position: 'relative' } },
                        A('div', { className: 'imo-status imo-next-default' }),
                        A('div', null, 'Default'),
                        A('div', { className: 'imo-needs-refresh' }),
                      ),
                      A('td', null, t.moduleName),
                      A('td', null, pe(t)),
                      A('td', null, me(t)),
                    )
                  }),
                  r.map(function (t) {
                    return A(
                      'tr',
                      {
                        role: 'button',
                        tabIndex: 0,
                        onClick: function () {
                          return e.setState({ dialogModule: t })
                        },
                        key: t.moduleName,
                      },
                      A(
                        'td',
                        null,
                        A('div', {
                          className: 'imo-status imo-disabled-override',
                        }),
                        A('div', null, 'Override disabled'),
                      ),
                      A('td', null, t.moduleName),
                      A('td', null, pe(t)),
                      A('td', null, me(t)),
                    )
                  }),
                  t.map(function (t) {
                    return A(
                      'tr',
                      {
                        role: 'button',
                        tabIndex: 0,
                        onClick: function () {
                          return e.setState({ dialogModule: t })
                        },
                        key: t.moduleName,
                      },
                      A(
                        'td',
                        null,
                        A('div', {
                          className: 'imo-status imo-current-override',
                        }),
                        A('div', null, 'Inline Override'),
                      ),
                      A('td', null, t.moduleName),
                      A('td', null, pe(t)),
                      A('td', null, me(t)),
                    )
                  }),
                  i.map(function (t) {
                    return A(
                      'tr',
                      {
                        role: 'button',
                        tabIndex: 0,
                        onClick: function () {
                          return e.setState({ dialogModule: t })
                        },
                        key: t.moduleName,
                      },
                      A(
                        'td',
                        null,
                        A('div', {
                          className: 'imo-status imo-external-override',
                        }),
                        A('div', null, 'External Override'),
                      ),
                      A('td', null, t.moduleName),
                      A('td', null, pe(t)),
                      A('td', null, me(t)),
                    )
                  }),
                  a.map(function (t) {
                    return A(
                      'tr',
                      {
                        role: 'button',
                        tabIndex: 0,
                        onClick: function () {
                          return e.setState({ dialogModule: t })
                        },
                        key: t.moduleName,
                        title:
                          'Automatically use dev version of certain npm libs',
                      },
                      A(
                        'td',
                        null,
                        A('div', {
                          className: 'imo-status imo-dev-lib-override',
                        }),
                        A('div', null, 'Dev Lib Override'),
                      ),
                      A('td', null, t.moduleName),
                      A('td', null, pe(t)),
                      A('td', null, me(t)),
                    )
                  }),
                  o.map(function (t) {
                    return A(
                      'tr',
                      {
                        role: 'button',
                        tabIndex: 0,
                        onClick: function () {
                          return e.setState({ dialogModule: t })
                        },
                        key: t.moduleName,
                      },
                      A(
                        'td',
                        null,
                        A('div', {
                          className: 'imo-status imo-default-module',
                        }),
                        A('div', null, 'Default'),
                      ),
                      A('td', null, t.moduleName),
                      A('td', null, pe(t)),
                      A('td', null, me(t)),
                    )
                  }),
                ),
              ),
              (p.length > 0 || m.length > 0 || v.length > 0) &&
                A(
                  'table',
                  { className: 'imo-overrides-table' },
                  A(
                    'thead',
                    null,
                    A('th', null, 'Import Map Status'),
                    A('th', null, 'URL'),
                  ),
                  A(
                    'tbody',
                    null,
                    p.map(function (t) {
                      return A(
                        'tr',
                        {
                          role: 'button',
                          tabIndex: 0,
                          onClick: function () {
                            return e.setState({
                              dialogExternalMap: { isNew: !1, url: t },
                            })
                          },
                          key: t,
                        },
                        A(
                          'td',
                          null,
                          A('div', {
                            className: 'imo-status imo-disabled-override',
                          }),
                          A('div', null, 'Invalid'),
                        ),
                        A('td', null, t),
                      )
                    }),
                    v.map(function (t) {
                      return A(
                        'tr',
                        {
                          role: 'button',
                          tabIndex: 0,
                          onClick: function () {
                            return e.setState({
                              dialogExternalMap: { isNew: !1, url: t },
                            })
                          },
                          key: t,
                        },
                        A(
                          'td',
                          null,
                          A('div', {
                            className: 'imo-status imo-next-override',
                          }),
                          A('div', null, 'Pending refresh'),
                        ),
                        A('td', null, t),
                      )
                    }),
                    m.map(function (t) {
                      return A(
                        'tr',
                        {
                          role: 'button',
                          tabIndex: 0,
                          onClick: function () {
                            return e.setState({
                              dialogExternalMap: { isNew: !1, url: t },
                            })
                          },
                          key: t,
                        },
                        A(
                          'td',
                          null,
                          A('div', {
                            className: 'imo-status imo-current-override',
                          }),
                          A('div', null, 'Override'),
                        ),
                        A('td', null, t),
                      )
                    }),
                  ),
                ),
            )
          },
        },
      ]),
      l
    )
  })(R)
  function de(e, t) {
    return e.moduleName > t.moduleName
  }
  var ce =
    (document.querySelector('base') && document.querySelector('base').href) ||
    location.origin + '/'
  function pe(e) {
    var t = fe(e),
      n = ve(t)
    return n ? n.host : t
  }
  function me(e) {
    var t = fe(e),
      n = ve(t)
    return n ? n.pathname.slice(n.pathname.lastIndexOf('/') + 1) : t
  }
  function fe(e) {
    return e.overrideUrl || e.defaultUrl
  }
  function ve(e) {
    try {
      return new URL(e, ce)
    } catch (e) {
      return null
    }
  }
  var he = (function (t) {
      o(l, t)
      var i = p(l)
      function l() {
        var t
        e(this, l)
        for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)
          o[a] = arguments[a]
        return (
          r(
            d((t = i.call.apply(i, [this].concat(o)))),
            'doUpdate',
            function () {
              return t.forceUpdate()
            },
          ),
          r(d(t), 'keydownListener', function (e) {
            'Escape' === e.key && t.props.close && t.props.close()
          }),
          t
        )
      }
      return (
        n(l, [
          {
            key: 'componentDidMount',
            value: function () {
              window.addEventListener('keydown', this.keydownListener),
                window.addEventListener(
                  'import-map-overrides:change',
                  this.doUpdate,
                )
            },
          },
          {
            key: 'componentWillUnmount',
            value: function () {
              window.removeEventListener('keydown', this.keydownListener),
                window.removeEventListener(
                  'import-map-overrides:change',
                  this.doUpdate,
                )
            },
          },
          {
            key: 'render',
            value: function (e) {
              return A(
                'div',
                { className: 'imo-popup' },
                A(
                  'div',
                  { className: 'imo-header' },
                  A(
                    'div',
                    null,
                    A('h1', null, 'Import Map Overrides'),
                    A(
                      'p',
                      null,
                      "This developer tool allows you to view and override your import maps. Start by clicking on a module that you'd like to override.",
                      ' ',
                      A(
                        'a',
                        {
                          target: '_blank',
                          href:
                            'https://github.com/joeldenning/import-map-overrides',
                        },
                        'See documentation for more info',
                      ),
                      '.',
                    ),
                  ),
                  A(
                    'button',
                    { className: 'imo-unstyled', onClick: e.close },
                    'ⓧ',
                  ),
                ),
                A(se, { importMapChanged: this.props.importMapChanged }),
              )
            },
          },
        ]),
        l
      )
    })(R),
    ge = (function (t) {
      o(l, t)
      var i = p(l)
      function l() {
        var t
        e(this, l)
        for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)
          o[a] = arguments[a]
        return (
          r(d((t = i.call.apply(i, [this].concat(o)))), 'state', {
            showingPopup: !1,
          }),
          r(d(t), 'doUpdate', function () {
            return t.forceUpdate()
          }),
          r(d(t), 'toggleTrigger', function () {
            t.setState(function (e) {
              return { showingPopup: !e.showingPopup }
            })
          }),
          r(d(t), 'importMapChanged', function () {
            t.forceUpdate()
          }),
          r(d(t), 'useDevLibs', function () {
            var e = localStorage.getItem('import-map-overrides-dev-libs')
            return e
              ? 'true' === e
              : t.props.customElement.hasAttribute('dev-libs')
          }),
          r(d(t), 'atLeastOneOverride', function () {
            return t.useDevLibs()
              ? ue()
              : Object.keys(window.importMapOverrides.getOverrideMap().imports)
                  .length > 0
          }),
          t
        )
      }
      return (
        n(l, [
          {
            key: 'componentDidMount',
            value: function () {
              window.addEventListener(
                'import-map-overrides:change',
                this.doUpdate,
              )
            },
          },
          {
            key: 'componentWillUnmount',
            value: function () {
              window.removeEventListener(
                'import-map-overrides:change',
                this.doUpdate,
              )
            },
          },
          {
            key: 'render',
            value: function (e, t) {
              return e.customElement.hasAttribute('show-when-local-storage') &&
                'true' !==
                  localStorage.getItem(
                    e.customElement.getAttribute('show-when-local-storage'),
                  )
                ? null
                : A(
                    'div',
                    null,
                    A(
                      'button',
                      {
                        onClick: this.toggleTrigger,
                        className: 'imo-unstyled imo-trigger '.concat(
                          this.atLeastOneOverride()
                            ? 'imo-current-override'
                            : '',
                        ),
                      },
                      '{···}',
                    ),
                    this.useDevLibs() && A(oe, null),
                    t.showingPopup &&
                      A(he, {
                        close: this.toggleTrigger,
                        importMapChanged: this.importMapChanged,
                      }),
                  )
            },
          },
        ]),
        l
      )
    })(R)
  function _e(t) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []
    return (function (i) {
      o(a, i)
      var l = p(a)
      function a() {
        return e(this, a), l.apply(this, arguments)
      }
      return (
        n(
          a,
          [
            {
              key: 'connectedCallback',
              value: function () {
                this.renderWithPreact()
              },
            },
            {
              key: 'disconnectedCallback',
              value: function () {
                ee(null, this), (this.renderedEl = null)
              },
            },
            {
              key: 'attributeChangedCallback',
              value: function () {
                this.renderWithPreact()
              },
            },
            {
              key: 'renderWithPreact',
              value: function () {
                this.renderedEl = ee(
                  A(t, { customElement: this }),
                  this,
                  this.renderedEl,
                )
              },
            },
          ],
          [
            {
              key: 'observedAttributes',
              get: function () {
                return r
              },
            },
          ],
        ),
        a
      )
    })(s(HTMLElement))
  }
  window.customElements &&
    !h &&
    (window.customElements.define(
      'import-map-overrides-full',
      _e(ge, ['show-when-local-storage']),
    ),
    window.customElements.define('import-map-overrides-popup', _e(he)),
    window.customElements.define('import-map-overrides-list', _e(se)))
})()
//# sourceMappingURL=import-map-overrides.js.map
