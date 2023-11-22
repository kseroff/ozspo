(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math === Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$N =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || commonjsGlobal || Function('return this')();

	var shared$7 = {exports: {}};

	var isPure = false;

	var global$M = global$N;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$b = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$b(global$M, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$M[key] = value;
	  } return value;
	};

	var global$L = global$N;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$L[SHARED] || defineGlobalProperty$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$7.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.33.2',
	  mode: 'global',
	  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.33.2/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var sharedExports = shared$7.exports;

	var fails$V = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$U = fails$V;

	var functionBindNative = !fails$U(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$4 = functionBindNative;

	var FunctionPrototype$3 = Function.prototype;
	var call$A = FunctionPrototype$3.call;
	var uncurryThisWithBind = NATIVE_BIND$4 && FunctionPrototype$3.bind.bind(call$A, call$A);

	var functionUncurryThis = NATIVE_BIND$4 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$A.apply(fn, arguments);
	  };
	};

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$a = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$9 = isNullOrUndefined$a;

	var $TypeError$q = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$b = function (it) {
	  if (isNullOrUndefined$9(it)) throw new $TypeError$q("Can't call method on " + it);
	  return it;
	};

	var requireObjectCoercible$a = requireObjectCoercible$b;

	var $Object$4 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$i = function (argument) {
	  return $Object$4(requireObjectCoercible$a(argument));
	};

	var uncurryThis$W = functionUncurryThis;
	var toObject$h = toObject$i;

	var hasOwnProperty = uncurryThis$W({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$h(it), key);
	};

	var uncurryThis$V = functionUncurryThis;

	var id$1 = 0;
	var postfix = Math.random();
	var toString$o = uncurryThis$V(1.0.toString);

	var uid$5 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$o(++id$1 + postfix, 36);
	};

	var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

	var global$K = global$N;
	var userAgent$5 = engineUserAgent;

	var process$3 = global$K.process;
	var Deno$1 = global$K.Deno;
	var versions = process$3 && process$3.versions || Deno$1 && Deno$1.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent$5) {
	  match = userAgent$5.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$5.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION$3 = engineV8Version;
	var fails$T = fails$V;
	var global$J = global$N;

	var $String$7 = global$J.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$T(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$7(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL$7 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$7
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$I = global$N;
	var shared$6 = sharedExports;
	var hasOwn$s = hasOwnProperty_1;
	var uid$4 = uid$5;
	var NATIVE_SYMBOL$6 = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var Symbol$1 = global$I.Symbol;
	var WellKnownSymbolsStore$1 = shared$6('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$4;

	var wellKnownSymbol$x = function (name) {
	  if (!hasOwn$s(WellKnownSymbolsStore$1, name)) {
	    WellKnownSymbolsStore$1[name] = NATIVE_SYMBOL$6 && hasOwn$s(Symbol$1, name)
	      ? Symbol$1[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore$1[name];
	};

	var wellKnownSymbol$w = wellKnownSymbol$x;

	var TO_STRING_TAG$6 = wellKnownSymbol$w('toStringTag');
	var test$1 = {};

	test$1[TO_STRING_TAG$6] = 'z';

	var toStringTagSupport = String(test$1) === '[object z]';

	var documentAll$2 = typeof document == 'object' && document.all;

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

	var documentAll_1 = {
	  all: documentAll$2,
	  IS_HTMLDDA: IS_HTMLDDA
	};

	var $documentAll$1 = documentAll_1;

	var documentAll$1 = $documentAll$1.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$w = $documentAll$1.IS_HTMLDDA ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll$1;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var objectDefineProperty = {};

	var fails$S = fails$V;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$S(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
	});

	var isCallable$v = isCallable$w;
	var $documentAll = documentAll_1;

	var documentAll = $documentAll.all;

	var isObject$p = $documentAll.IS_HTMLDDA ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$v(it) || it === documentAll;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$v(it);
	};

	var global$H = global$N;
	var isObject$o = isObject$p;

	var document$3 = global$H.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$o(document$3) && isObject$o(document$3.createElement);

	var documentCreateElement$2 = function (it) {
	  return EXISTS$1 ? document$3.createElement(it) : {};
	};

	var DESCRIPTORS$v = descriptors;
	var fails$R = fails$V;
	var createElement$1 = documentCreateElement$2;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$v && !fails$R(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement$1('div'), 'a', {
	    get: function () { return 7; }
	  }).a !== 7;
	});

	var DESCRIPTORS$u = descriptors;
	var fails$Q = fails$V;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$u && fails$Q(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});

	var isObject$n = isObject$p;

	var $String$6 = String;
	var $TypeError$p = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$u = function (argument) {
	  if (isObject$n(argument)) return argument;
	  throw new $TypeError$p($String$6(argument) + ' is not an object');
	};

	var NATIVE_BIND$3 = functionBindNative;

	var call$z = Function.prototype.call;

	var functionCall = NATIVE_BIND$3 ? call$z.bind(call$z) : function () {
	  return call$z.apply(call$z, arguments);
	};

	var global$G = global$N;
	var isCallable$u = isCallable$w;

	var aFunction = function (argument) {
	  return isCallable$u(argument) ? argument : undefined;
	};

	var getBuiltIn$d = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$G[namespace]) : global$G[namespace] && global$G[namespace][method];
	};

	var uncurryThis$U = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$U({}.isPrototypeOf);

	var getBuiltIn$c = getBuiltIn$d;
	var isCallable$t = isCallable$w;
	var isPrototypeOf$a = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var $Object$3 = Object;

	var isSymbol$6 = USE_SYMBOL_AS_UID ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$c('Symbol');
	  return isCallable$t($Symbol) && isPrototypeOf$a($Symbol.prototype, $Object$3(it));
	};

	var $String$5 = String;

	var tryToString$7 = function (argument) {
	  try {
	    return $String$5(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$s = isCallable$w;
	var tryToString$6 = tryToString$7;

	var $TypeError$o = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$j = function (argument) {
	  if (isCallable$s(argument)) return argument;
	  throw new $TypeError$o(tryToString$6(argument) + ' is not a function');
	};

	var aCallable$i = aCallable$j;
	var isNullOrUndefined$8 = isNullOrUndefined$a;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$8 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined$8(func) ? undefined : aCallable$i(func);
	};

	var call$y = functionCall;
	var isCallable$r = isCallable$w;
	var isObject$m = isObject$p;

	var $TypeError$n = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$2 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$r(fn = input.toString) && !isObject$m(val = call$y(fn, input))) return val;
	  if (isCallable$r(fn = input.valueOf) && !isObject$m(val = call$y(fn, input))) return val;
	  if (pref !== 'string' && isCallable$r(fn = input.toString) && !isObject$m(val = call$y(fn, input))) return val;
	  throw new $TypeError$n("Can't convert object to primitive value");
	};

	var call$x = functionCall;
	var isObject$l = isObject$p;
	var isSymbol$5 = isSymbol$6;
	var getMethod$7 = getMethod$8;
	var ordinaryToPrimitive$1 = ordinaryToPrimitive$2;
	var wellKnownSymbol$v = wellKnownSymbol$x;

	var $TypeError$m = TypeError;
	var TO_PRIMITIVE$1 = wellKnownSymbol$v('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$3 = function (input, pref) {
	  if (!isObject$l(input) || isSymbol$5(input)) return input;
	  var exoticToPrim = getMethod$7(input, TO_PRIMITIVE$1);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$x(exoticToPrim, input, pref);
	    if (!isObject$l(result) || isSymbol$5(result)) return result;
	    throw new $TypeError$m("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive$1(input, pref);
	};

	var toPrimitive$2 = toPrimitive$3;
	var isSymbol$4 = isSymbol$6;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$5 = function (argument) {
	  var key = toPrimitive$2(argument, 'string');
	  return isSymbol$4(key) ? key : key + '';
	};

	var DESCRIPTORS$t = descriptors;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$t = anObject$u;
	var toPropertyKey$4 = toPropertyKey$5;

	var $TypeError$l = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$t ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$t(O);
	  P = toPropertyKey$4(P);
	  anObject$t(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$2(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty$1(O, P, Attributes);
	} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$t(O);
	  P = toPropertyKey$4(P);
	  anObject$t(Attributes);
	  if (IE8_DOM_DEFINE$1) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$l('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var makeBuiltIn$3 = {exports: {}};

	var DESCRIPTORS$s = descriptors;
	var hasOwn$r = hasOwnProperty_1;

	var FunctionPrototype$2 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$s && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$r(FunctionPrototype$2, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$s || (DESCRIPTORS$s && getDescriptor(FunctionPrototype$2, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var uncurryThis$T = functionUncurryThis;
	var isCallable$q = isCallable$w;
	var store$1 = sharedStore;

	var functionToString$1 = uncurryThis$T(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$q(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString$1(it);
	  };
	}

	var inspectSource$3 = store$1.inspectSource;

	var global$F = global$N;
	var isCallable$p = isCallable$w;

	var WeakMap$1 = global$F.WeakMap;

	var weakMapBasicDetection = isCallable$p(WeakMap$1) && /native code/.test(String(WeakMap$1));

	var createPropertyDescriptor$8 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var DESCRIPTORS$r = descriptors;
	var definePropertyModule$6 = objectDefineProperty;
	var createPropertyDescriptor$7 = createPropertyDescriptor$8;

	var createNonEnumerableProperty$f = DESCRIPTORS$r ? function (object, key, value) {
	  return definePropertyModule$6.f(object, key, createPropertyDescriptor$7(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var shared$5 = sharedExports;
	var uid$3 = uid$5;

	var keys$2 = shared$5('keys');

	var sharedKey$4 = function (key) {
	  return keys$2[key] || (keys$2[key] = uid$3(key));
	};

	var hiddenKeys$6 = {};

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var global$E = global$N;
	var isObject$k = isObject$p;
	var createNonEnumerableProperty$e = createNonEnumerableProperty$f;
	var hasOwn$q = hasOwnProperty_1;
	var shared$4 = sharedStore;
	var sharedKey$3 = sharedKey$4;
	var hiddenKeys$5 = hiddenKeys$6;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$8 = global$E.TypeError;
	var WeakMap = global$E.WeakMap;
	var set$2, get$1, has;

	var enforce = function (it) {
	  return has(it) ? get$1(it) : set$2(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$k(it) || (state = get$1(it)).type !== TYPE) {
	      throw new TypeError$8('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$4.state) {
	  var store = shared$4.state || (shared$4.state = new WeakMap());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set$2 = function (it, metadata) {
	    if (store.has(it)) throw new TypeError$8(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return store.get(it) || {};
	  };
	  has = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey$3('state');
	  hiddenKeys$5[STATE] = true;
	  set$2 = function (it, metadata) {
	    if (hasOwn$q(it, STATE)) throw new TypeError$8(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$e(it, STATE, metadata);
	    return metadata;
	  };
	  get$1 = function (it) {
	    return hasOwn$q(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$q(it, STATE);
	  };
	}

	var internalState = {
	  set: set$2,
	  get: get$1,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var uncurryThis$S = functionUncurryThis;
	var fails$P = fails$V;
	var isCallable$o = isCallable$w;
	var hasOwn$p = hasOwnProperty_1;
	var DESCRIPTORS$q = descriptors;
	var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
	var inspectSource$2 = inspectSource$3;
	var InternalStateModule$b = internalState;

	var enforceInternalState$3 = InternalStateModule$b.enforce;
	var getInternalState$8 = InternalStateModule$b.get;
	var $String$4 = String;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$a = Object.defineProperty;
	var stringSlice$c = uncurryThis$S(''.slice);
	var replace$b = uncurryThis$S(''.replace);
	var join$5 = uncurryThis$S([].join);

	var CONFIGURABLE_LENGTH = DESCRIPTORS$q && !fails$P(function () {
	  return defineProperty$a(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
	  if (stringSlice$c($String$4(name), 0, 7) === 'Symbol(') {
	    name = '[' + replace$b($String$4(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$p(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name)) {
	    if (DESCRIPTORS$q) defineProperty$a(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$p(options, 'arity') && value.length !== options.arity) {
	    defineProperty$a(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$p(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$q) defineProperty$a(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState$3(value);
	  if (!hasOwn$p(state, 'source')) {
	    state.source = join$5(TEMPLATE, typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$2(function toString() {
	  return isCallable$o(this) && getInternalState$8(this).source || inspectSource$2(this);
	}, 'toString');

	var makeBuiltInExports = makeBuiltIn$3.exports;

	var isCallable$n = isCallable$w;
	var definePropertyModule$5 = objectDefineProperty;
	var makeBuiltIn$1 = makeBuiltInExports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$j = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$n(value)) makeBuiltIn$1(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$5.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var uncurryThis$R = functionUncurryThis;

	var toString$n = uncurryThis$R({}.toString);
	var stringSlice$b = uncurryThis$R(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$b(toString$n(it), 8, -1);
	};

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$m = isCallable$w;
	var classofRaw$1 = classofRaw$2;
	var wellKnownSymbol$u = wellKnownSymbol$x;

	var TO_STRING_TAG$5 = wellKnownSymbol$u('toStringTag');
	var $Object$2 = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) === 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$k = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$5)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw$1(O)
	    // ES3 arguments fallback
	    : (result = classofRaw$1(O)) === 'Object' && isCallable$m(O.callee) ? 'Arguments' : result;
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$j = classof$k;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$j(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineBuiltIn$i = defineBuiltIn$j;
	var toString$m = objectToString;

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!TO_STRING_TAG_SUPPORT) {
	  defineBuiltIn$i(Object.prototype, 'toString', toString$m, { unsafe: true });
	}

	var objectGetOwnPropertyDescriptor = {};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$6 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$6 && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$6(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$2;

	var uncurryThis$Q = functionUncurryThis;
	var fails$O = fails$V;
	var classof$i = classofRaw$2;

	var $Object$1 = Object;
	var split$3 = uncurryThis$Q(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$O(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$1('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$i(it) === 'String' ? split$3(it, '') : $Object$1(it);
	} : $Object$1;

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$5 = indexedObject;
	var requireObjectCoercible$9 = requireObjectCoercible$b;

	var toIndexedObject$c = function (it) {
	  return IndexedObject$5(requireObjectCoercible$9(it));
	};

	var DESCRIPTORS$p = descriptors;
	var call$w = functionCall;
	var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$6 = createPropertyDescriptor$8;
	var toIndexedObject$b = toIndexedObject$c;
	var toPropertyKey$3 = toPropertyKey$5;
	var hasOwn$o = hasOwnProperty_1;
	var IE8_DOM_DEFINE = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$p ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$b(O);
	  P = toPropertyKey$3(P);
	  if (IE8_DOM_DEFINE) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$o(O, P)) return createPropertyDescriptor$6(!call$w(propertyIsEnumerableModule$2.f, O, P), O[P]);
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor$8 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$8 : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$e = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$d = toIntegerOrInfinity$e;

	var max$4 = Math.max;
	var min$7 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$7 = function (index, length) {
	  var integer = toIntegerOrInfinity$d(index);
	  return integer < 0 ? max$4(integer + length, 0) : min$7(integer, length);
	};

	var toIntegerOrInfinity$c = toIntegerOrInfinity$e;

	var min$6 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$8 = function (argument) {
	  return argument > 0 ? min$6(toIntegerOrInfinity$c(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$7 = toLength$8;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$m = function (obj) {
	  return toLength$7(obj.length);
	};

	var toIndexedObject$a = toIndexedObject$c;
	var toAbsoluteIndex$6 = toAbsoluteIndex$7;
	var lengthOfArrayLike$l = lengthOfArrayLike$m;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$6 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$a($this);
	    var length = lengthOfArrayLike$l(O);
	    var index = toAbsoluteIndex$6(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el !== el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value !== value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$6(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$6(false)
	};

	var uncurryThis$P = functionUncurryThis;
	var hasOwn$n = hasOwnProperty_1;
	var toIndexedObject$9 = toIndexedObject$c;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$4 = hiddenKeys$6;

	var push$e = uncurryThis$P([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$9(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$n(hiddenKeys$4, key) && hasOwn$n(O, key) && push$e(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$n(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push$e(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$3 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$3);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$b = getBuiltIn$d;
	var uncurryThis$O = functionUncurryThis;
	var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule$3 = objectGetOwnPropertySymbols;
	var anObject$s = anObject$u;

	var concat$3 = uncurryThis$O([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$b('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule$2.f(anObject$s(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$3.f;
	  return getOwnPropertySymbols ? concat$3(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn$m = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
	var definePropertyModule$4 = objectDefineProperty;

	var copyConstructorProperties$4 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$4.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn$m(target, key) && !(exceptions && hasOwn$m(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$N = fails$V;
	var isCallable$l = isCallable$w;

	var replacement = /#|\.prototype\./;

	var isForced$5 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true
	    : value === NATIVE ? false
	    : isCallable$l(detection) ? fails$N(detection)
	    : !!detection;
	};

	var normalize = isForced$5.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$5.data = {};
	var NATIVE = isForced$5.NATIVE = 'N';
	var POLYFILL = isForced$5.POLYFILL = 'P';

	var isForced_1 = isForced$5;

	var global$D = global$N;
	var getOwnPropertyDescriptor$5 = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$d = createNonEnumerableProperty$f;
	var defineBuiltIn$h = defineBuiltIn$j;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties$3 = copyConstructorProperties$4;
	var isForced$4 = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$D;
	  } else if (STATIC) {
	    target = global$D[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = (global$D[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$5(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced$4(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties$3(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$d(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$h(target, key, sourceProperty, options);
	  }
	};

	var global$C = global$N;
	var classof$h = classofRaw$2;

	var engineIsNode = classof$h(global$C.process) === 'process';

	var uncurryThis$N = functionUncurryThis;
	var aCallable$h = aCallable$j;

	var functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis$N(aCallable$h(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};

	var isCallable$k = isCallable$w;

	var $String$3 = String;
	var $TypeError$k = TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable$k(argument)) return argument;
	  throw new $TypeError$k("Can't set " + $String$3(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */
	var uncurryThisAccessor$2 = functionUncurryThisAccessor;
	var anObject$r = anObject$u;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = uncurryThisAccessor$2(Object.prototype, '__proto__', 'set');
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject$r(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var defineProperty$9 = objectDefineProperty.f;
	var hasOwn$l = hasOwnProperty_1;
	var wellKnownSymbol$t = wellKnownSymbol$x;

	var TO_STRING_TAG$4 = wellKnownSymbol$t('toStringTag');

	var setToStringTag$9 = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwn$l(target, TO_STRING_TAG$4)) {
	    defineProperty$9(target, TO_STRING_TAG$4, { configurable: true, value: TAG });
	  }
	};

	var makeBuiltIn = makeBuiltInExports;
	var defineProperty$8 = objectDefineProperty;

	var defineBuiltInAccessor$f = function (target, name, descriptor) {
	  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
	  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
	  return defineProperty$8.f(target, name, descriptor);
	};

	var getBuiltIn$a = getBuiltIn$d;
	var defineBuiltInAccessor$e = defineBuiltInAccessor$f;
	var wellKnownSymbol$s = wellKnownSymbol$x;
	var DESCRIPTORS$o = descriptors;

	var SPECIES$6 = wellKnownSymbol$s('species');

	var setSpecies$5 = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn$a(CONSTRUCTOR_NAME);

	  if (DESCRIPTORS$o && Constructor && !Constructor[SPECIES$6]) {
	    defineBuiltInAccessor$e(Constructor, SPECIES$6, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var isPrototypeOf$9 = objectIsPrototypeOf;

	var $TypeError$j = TypeError;

	var anInstance$8 = function (it, Prototype) {
	  if (isPrototypeOf$9(Prototype, it)) return it;
	  throw new $TypeError$j('Incorrect invocation');
	};

	var uncurryThis$M = functionUncurryThis;
	var fails$M = fails$V;
	var isCallable$j = isCallable$w;
	var classof$g = classof$k;
	var getBuiltIn$9 = getBuiltIn$d;
	var inspectSource$1 = inspectSource$3;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct$1 = getBuiltIn$9('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$8 = uncurryThis$M(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$j(argument)) return false;
	  try {
	    construct$1(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$j(argument)) return false;
	  switch (classof$g(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$8(constructorRegExp, inspectSource$1(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$4 = !construct$1 || fails$M(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isConstructor$3 = isConstructor$4;
	var tryToString$5 = tryToString$7;

	var $TypeError$i = TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor$3 = function (argument) {
	  if (isConstructor$3(argument)) return argument;
	  throw new $TypeError$i(tryToString$5(argument) + ' is not a constructor');
	};

	var anObject$q = anObject$u;
	var aConstructor$2 = aConstructor$3;
	var isNullOrUndefined$7 = isNullOrUndefined$a;
	var wellKnownSymbol$r = wellKnownSymbol$x;

	var SPECIES$5 = wellKnownSymbol$r('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor$3 = function (O, defaultConstructor) {
	  var C = anObject$q(O).constructor;
	  var S;
	  return C === undefined || isNullOrUndefined$7(S = anObject$q(C)[SPECIES$5]) ? defaultConstructor : aConstructor$2(S);
	};

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var apply$9 = FunctionPrototype$1.apply;
	var call$v = FunctionPrototype$1.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$2 ? call$v.bind(apply$9) : function () {
	  return call$v.apply(apply$9, arguments);
	});

	var classofRaw = classofRaw$2;
	var uncurryThis$L = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw(fn) === 'Function') return uncurryThis$L(fn);
	};

	var uncurryThis$K = functionUncurryThisClause;
	var aCallable$g = aCallable$j;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$c = uncurryThis$K(uncurryThis$K.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$g(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$c(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var getBuiltIn$8 = getBuiltIn$d;

	var html$2 = getBuiltIn$8('document', 'documentElement');

	var uncurryThis$J = functionUncurryThis;

	var arraySlice$a = uncurryThis$J([].slice);

	var $TypeError$h = TypeError;

	var validateArgumentsLength$5 = function (passed, required) {
	  if (passed < required) throw new $TypeError$h('Not enough arguments');
	  return passed;
	};

	var userAgent$4 = engineUserAgent;

	// eslint-disable-next-line redos/no-vulnerable -- safe
	var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$4);

	var global$B = global$N;
	var apply$8 = functionApply;
	var bind$b = functionBindContext;
	var isCallable$i = isCallable$w;
	var hasOwn$k = hasOwnProperty_1;
	var fails$L = fails$V;
	var html$1 = html$2;
	var arraySlice$9 = arraySlice$a;
	var createElement = documentCreateElement$2;
	var validateArgumentsLength$4 = validateArgumentsLength$5;
	var IS_IOS$1 = engineIsIos;
	var IS_NODE$5 = engineIsNode;

	var set$1 = global$B.setImmediate;
	var clear = global$B.clearImmediate;
	var process$2 = global$B.process;
	var Dispatch = global$B.Dispatch;
	var Function$1 = global$B.Function;
	var MessageChannel = global$B.MessageChannel;
	var String$1 = global$B.String;
	var counter = 0;
	var queue$2 = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var $location, defer, channel$1, port;

	fails$L(function () {
	  // Deno throws a ReferenceError on `location` access without `--location` flag
	  $location = global$B.location;
	});

	var run = function (id) {
	  if (hasOwn$k(queue$2, id)) {
	    var fn = queue$2[id];
	    delete queue$2[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var eventListener = function (event) {
	  run(event.data);
	};

	var globalPostMessageDefer = function (id) {
	  // old engines have not location.origin
	  global$B.postMessage(String$1(id), $location.protocol + '//' + $location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$1 || !clear) {
	  set$1 = function setImmediate(handler) {
	    validateArgumentsLength$4(arguments.length, 1);
	    var fn = isCallable$i(handler) ? handler : Function$1(handler);
	    var args = arraySlice$9(arguments, 1);
	    queue$2[++counter] = function () {
	      apply$8(fn, undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue$2[id];
	  };
	  // Node.js 0.8-
	  if (IS_NODE$5) {
	    defer = function (id) {
	      process$2.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !IS_IOS$1) {
	    channel$1 = new MessageChannel();
	    port = channel$1.port2;
	    channel$1.port1.onmessage = eventListener;
	    defer = bind$b(port.postMessage, port);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global$B.addEventListener &&
	    isCallable$i(global$B.postMessage) &&
	    !global$B.importScripts &&
	    $location && $location.protocol !== 'file:' &&
	    !fails$L(globalPostMessageDefer)
	  ) {
	    defer = globalPostMessageDefer;
	    global$B.addEventListener('message', eventListener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in createElement('script')) {
	    defer = function (id) {
	      html$1.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
	        html$1.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task$1 = {
	  set: set$1,
	  clear: clear
	};

	var Queue$2 = function () {
	  this.head = null;
	  this.tail = null;
	};

	Queue$2.prototype = {
	  add: function (item) {
	    var entry = { item: item, next: null };
	    var tail = this.tail;
	    if (tail) tail.next = entry;
	    else this.head = entry;
	    this.tail = entry;
	  },
	  get: function () {
	    var entry = this.head;
	    if (entry) {
	      var next = this.head = entry.next;
	      if (next === null) this.tail = null;
	      return entry.item;
	    }
	  }
	};

	var queue$1 = Queue$2;

	var userAgent$3 = engineUserAgent;

	var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$3) && typeof Pebble != 'undefined';

	var userAgent$2 = engineUserAgent;

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$2);

	var global$A = global$N;
	var bind$a = functionBindContext;
	var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;
	var Queue$1 = queue$1;
	var IS_IOS = engineIsIos;
	var IS_IOS_PEBBLE = engineIsIosPebble;
	var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
	var IS_NODE$4 = engineIsNode;

	var MutationObserver = global$A.MutationObserver || global$A.WebKitMutationObserver;
	var document$2 = global$A.document;
	var process$1 = global$A.process;
	var Promise$1 = global$A.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$4(global$A, 'queueMicrotask');
	var microtask$1 = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
	var notify$1, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!microtask$1) {
	  var queue = new Queue$1();

	  var flush = function () {
	    var parent, fn;
	    if (IS_NODE$4 && (parent = process$1.domain)) parent.exit();
	    while (fn = queue.get()) try {
	      fn();
	    } catch (error) {
	      if (queue.head) notify$1();
	      throw error;
	    }
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!IS_IOS && !IS_NODE$4 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify$1 = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise.constructor = Promise$1;
	    then = bind$a(promise.then, promise);
	    notify$1 = function () {
	      then(flush);
	    };
	  // Node.js without promises
	  } else if (IS_NODE$4) {
	    notify$1 = function () {
	      process$1.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessage
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    // `webpack` dev server bug on IE global methods - use bind(fn, global)
	    macrotask = bind$a(macrotask, global$A);
	    notify$1 = function () {
	      macrotask(flush);
	    };
	  }

	  microtask$1 = function (fn) {
	    if (!queue.head) notify$1();
	    queue.add(fn);
	  };
	}

	var microtask_1 = microtask$1;

	var hostReportErrors$1 = function (a, b) {
	  try {
	    // eslint-disable-next-line no-console -- safe
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  } catch (error) { /* empty */ }
	};

	var perform$3 = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var global$z = global$N;

	var promiseNativeConstructor = global$z.Promise;

	/* global Deno -- Deno case */
	var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

	var IS_DENO$2 = engineIsDeno;
	var IS_NODE$3 = engineIsNode;

	var engineIsBrowser = !IS_DENO$2 && !IS_NODE$3
	  && typeof window == 'object'
	  && typeof document == 'object';

	var global$y = global$N;
	var NativePromiseConstructor$3 = promiseNativeConstructor;
	var isCallable$h = isCallable$w;
	var isForced$3 = isForced_1;
	var inspectSource = inspectSource$3;
	var wellKnownSymbol$q = wellKnownSymbol$x;
	var IS_BROWSER$1 = engineIsBrowser;
	var IS_DENO$1 = engineIsDeno;
	var V8_VERSION$2 = engineV8Version;

	NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
	var SPECIES$4 = wellKnownSymbol$q('species');
	var SUBCLASSING = false;
	var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$h(global$y.PromiseRejectionEvent);

	var FORCED_PROMISE_CONSTRUCTOR$5 = isForced$3('Promise', function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION$2 === 66) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (!V8_VERSION$2 || V8_VERSION$2 < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
	    // Detect correctness of subclassing with @@species support
	    var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
	    var FakePromise = function (exec) {
	      exec(function () { /* empty */ }, function () { /* empty */ });
	    };
	    var constructor = promise.constructor = {};
	    constructor[SPECIES$4] = FakePromise;
	    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	    if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER$1 || IS_DENO$1) && !NATIVE_PROMISE_REJECTION_EVENT$1;
	});

	var promiseConstructorDetection = {
	  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
	  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
	  SUBCLASSING: SUBCLASSING
	};

	var newPromiseCapability$2 = {};

	var aCallable$f = aCallable$j;

	var $TypeError$g = TypeError;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw new $TypeError$g('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable$f(resolve);
	  this.reject = aCallable$f(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability$2.f = function (C) {
	  return new PromiseCapability(C);
	};

	var $$_ = _export;
	var IS_NODE$2 = engineIsNode;
	var global$x = global$N;
	var call$u = functionCall;
	var defineBuiltIn$g = defineBuiltIn$j;
	var setPrototypeOf$6 = objectSetPrototypeOf;
	var setToStringTag$8 = setToStringTag$9;
	var setSpecies$4 = setSpecies$5;
	var aCallable$e = aCallable$j;
	var isCallable$g = isCallable$w;
	var isObject$j = isObject$p;
	var anInstance$7 = anInstance$8;
	var speciesConstructor$2 = speciesConstructor$3;
	var task = task$1.set;
	var microtask = microtask_1;
	var hostReportErrors = hostReportErrors$1;
	var perform$2 = perform$3;
	var Queue = queue$1;
	var InternalStateModule$a = internalState;
	var NativePromiseConstructor$2 = promiseNativeConstructor;
	var PromiseConstructorDetection = promiseConstructorDetection;
	var newPromiseCapabilityModule$3 = newPromiseCapability$2;

	var PROMISE = 'Promise';
	var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
	var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
	var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
	var getInternalPromiseState = InternalStateModule$a.getterFor(PROMISE);
	var setInternalState$9 = InternalStateModule$a.set;
	var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
	var PromiseConstructor = NativePromiseConstructor$2;
	var PromisePrototype = NativePromisePrototype$1;
	var TypeError$7 = global$x.TypeError;
	var document$1 = global$x.document;
	var process = global$x.process;
	var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
	var newGenericPromiseCapability = newPromiseCapability$1;

	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$x.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;

	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject$j(it) && isCallable$g(then = it.then) ? then : false;
	};

	var callReaction = function (reaction, state) {
	  var value = state.value;
	  var ok = state.state === FULFILLED;
	  var handler = ok ? reaction.ok : reaction.fail;
	  var resolve = reaction.resolve;
	  var reject = reaction.reject;
	  var domain = reaction.domain;
	  var result, then, exited;
	  try {
	    if (handler) {
	      if (!ok) {
	        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	        state.rejection = HANDLED;
	      }
	      if (handler === true) result = value;
	      else {
	        if (domain) domain.enter();
	        result = handler(value); // can throw
	        if (domain) {
	          domain.exit();
	          exited = true;
	        }
	      }
	      if (result === reaction.promise) {
	        reject(new TypeError$7('Promise-chain cycle'));
	      } else if (then = isThenable(result)) {
	        call$u(then, result, resolve, reject);
	      } else resolve(result);
	    } else reject(value);
	  } catch (error) {
	    if (domain && !exited) domain.exit();
	    reject(error);
	  }
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  microtask(function () {
	    var reactions = state.reactions;
	    var reaction;
	    while (reaction = reactions.get()) {
	      callReaction(reaction, state);
	    }
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$1.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global$x.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$x['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  call$u(task, global$x, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform$2(function () {
	        if (IS_NODE$2) {
	          process.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$2 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  call$u(task, global$x, function () {
	    var promise = state.facade;
	    if (IS_NODE$2) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind$9 = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw new TypeError$7("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          call$u(then, value,
	            bind$9(internalResolve, wrapper, state),
	            bind$9(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED_PROMISE_CONSTRUCTOR$4) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance$7(this, PromisePrototype);
	    aCallable$e(executor);
	    call$u(Internal, this);
	    var state = getInternalPromiseState(this);
	    try {
	      executor(bind$9(internalResolve, state), bind$9(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };

	  PromisePrototype = PromiseConstructor.prototype;

	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState$9(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: new Queue(),
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };

	  // `Promise.prototype.then` method
	  // https://tc39.es/ecma262/#sec-promise.prototype.then
	  Internal.prototype = defineBuiltIn$g(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
	    var state = getInternalPromiseState(this);
	    var reaction = newPromiseCapability$1(speciesConstructor$2(this, PromiseConstructor));
	    state.parent = true;
	    reaction.ok = isCallable$g(onFulfilled) ? onFulfilled : true;
	    reaction.fail = isCallable$g(onRejected) && onRejected;
	    reaction.domain = IS_NODE$2 ? process.domain : undefined;
	    if (state.state === PENDING) state.reactions.add(reaction);
	    else microtask(function () {
	      callReaction(reaction, state);
	    });
	    return reaction.promise;
	  });

	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalPromiseState(promise);
	    this.promise = promise;
	    this.resolve = bind$9(internalResolve, state);
	    this.reject = bind$9(internalReject, state);
	  };

	  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if (isCallable$g(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
	    nativeThen = NativePromisePrototype$1.then;

	    if (!NATIVE_PROMISE_SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      defineBuiltIn$g(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          call$u(nativeThen, that, resolve, reject);
	        }).then(onFulfilled, onRejected);
	      // https://github.com/zloirock/core-js/issues/640
	      }, { unsafe: true });
	    }

	    // make `.constructor === Promise` work for native promise-based APIs
	    try {
	      delete NativePromisePrototype$1.constructor;
	    } catch (error) { /* empty */ }

	    // make `instanceof Promise` work for native promise-based APIs
	    if (setPrototypeOf$6) {
	      setPrototypeOf$6(NativePromisePrototype$1, PromisePrototype);
	    }
	  }
	}

	$$_({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag$8(PromiseConstructor, PROMISE, false);
	setSpecies$4(PROMISE);

	var iterators = {};

	var wellKnownSymbol$p = wellKnownSymbol$x;
	var Iterators$4 = iterators;

	var ITERATOR$8 = wellKnownSymbol$p('iterator');
	var ArrayPrototype$1 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod$3 = function (it) {
	  return it !== undefined && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$8] === it);
	};

	var classof$f = classof$k;
	var getMethod$6 = getMethod$8;
	var isNullOrUndefined$6 = isNullOrUndefined$a;
	var Iterators$3 = iterators;
	var wellKnownSymbol$o = wellKnownSymbol$x;

	var ITERATOR$7 = wellKnownSymbol$o('iterator');

	var getIteratorMethod$5 = function (it) {
	  if (!isNullOrUndefined$6(it)) return getMethod$6(it, ITERATOR$7)
	    || getMethod$6(it, '@@iterator')
	    || Iterators$3[classof$f(it)];
	};

	var call$t = functionCall;
	var aCallable$d = aCallable$j;
	var anObject$p = anObject$u;
	var tryToString$4 = tryToString$7;
	var getIteratorMethod$4 = getIteratorMethod$5;

	var $TypeError$f = TypeError;

	var getIterator$4 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$4(argument) : usingIterator;
	  if (aCallable$d(iteratorMethod)) return anObject$p(call$t(iteratorMethod, argument));
	  throw new $TypeError$f(tryToString$4(argument) + ' is not iterable');
	};

	var call$s = functionCall;
	var anObject$o = anObject$u;
	var getMethod$5 = getMethod$8;

	var iteratorClose$3 = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject$o(iterator);
	  try {
	    innerResult = getMethod$5(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call$s(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject$o(innerResult);
	  return value;
	};

	var bind$8 = functionBindContext;
	var call$r = functionCall;
	var anObject$n = anObject$u;
	var tryToString$3 = tryToString$7;
	var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
	var lengthOfArrayLike$k = lengthOfArrayLike$m;
	var isPrototypeOf$8 = objectIsPrototypeOf;
	var getIterator$3 = getIterator$4;
	var getIteratorMethod$3 = getIteratorMethod$5;
	var iteratorClose$2 = iteratorClose$3;

	var $TypeError$e = TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	var iterate$9 = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_RECORD = !!(options && options.IS_RECORD);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind$8(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose$2(iterator, 'normal', condition);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject$n(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_RECORD) {
	    iterator = iterable.iterator;
	  } else if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod$3(iterable);
	    if (!iterFn) throw new $TypeError$e(tryToString$3(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod$2(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike$k(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf$8(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator$3(iterable, iterFn);
	  }

	  next = IS_RECORD ? iterable.next : iterator.next;
	  while (!(step = call$r(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose$2(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && isPrototypeOf$8(ResultPrototype, result)) return result;
	  } return new Result(false);
	};

	var wellKnownSymbol$n = wellKnownSymbol$x;

	var ITERATOR$6 = wellKnownSymbol$n('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$6] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration$4 = function (exec, SKIP_CLOSING) {
	  try {
	    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$6] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var NativePromiseConstructor$1 = promiseNativeConstructor;
	var checkCorrectnessOfIteration$3 = checkCorrectnessOfIteration$4;
	var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

	var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$3(function (iterable) {
	  NativePromiseConstructor$1.all(iterable).then(undefined, function () { /* empty */ });
	});

	var $$Z = _export;
	var call$q = functionCall;
	var aCallable$c = aCallable$j;
	var newPromiseCapabilityModule$2 = newPromiseCapability$2;
	var perform$1 = perform$3;
	var iterate$8 = iterate$9;
	var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

	// `Promise.all` method
	// https://tc39.es/ecma262/#sec-promise.all
	$$Z({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule$2.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform$1(function () {
	      var $promiseResolve = aCallable$c(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate$8(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call$q($promiseResolve, C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$Y = _export;
	var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
	var NativePromiseConstructor = promiseNativeConstructor;
	var getBuiltIn$7 = getBuiltIn$d;
	var isCallable$f = isCallable$w;
	var defineBuiltIn$f = defineBuiltIn$j;

	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

	// `Promise.prototype.catch` method
	// https://tc39.es/ecma262/#sec-promise.prototype.catch
	$$Y({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
	  'catch': function (onRejected) {
	    return this.then(undefined, onRejected);
	  }
	});

	// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	if (isCallable$f(NativePromiseConstructor)) {
	  var method = getBuiltIn$7('Promise').prototype['catch'];
	  if (NativePromisePrototype['catch'] !== method) {
	    defineBuiltIn$f(NativePromisePrototype, 'catch', method, { unsafe: true });
	  }
	}

	var $$X = _export;
	var call$p = functionCall;
	var aCallable$b = aCallable$j;
	var newPromiseCapabilityModule$1 = newPromiseCapability$2;
	var perform = perform$3;
	var iterate$7 = iterate$9;
	var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

	// `Promise.race` method
	// https://tc39.es/ecma262/#sec-promise.race
	$$X({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule$1.f(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable$b(C.resolve);
	      iterate$7(iterable, function (promise) {
	        call$p($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var $$W = _export;
	var call$o = functionCall;
	var newPromiseCapabilityModule = newPromiseCapability$2;
	var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

	// `Promise.reject` method
	// https://tc39.es/ecma262/#sec-promise.reject
	$$W({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
	  reject: function reject(r) {
	    var capability = newPromiseCapabilityModule.f(this);
	    call$o(capability.reject, undefined, r);
	    return capability.promise;
	  }
	});

	var anObject$m = anObject$u;
	var isObject$i = isObject$p;
	var newPromiseCapability = newPromiseCapability$2;

	var promiseResolve$1 = function (C, x) {
	  anObject$m(C);
	  if (isObject$i(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var $$V = _export;
	var getBuiltIn$6 = getBuiltIn$d;
	var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
	var promiseResolve = promiseResolve$1;

	getBuiltIn$6('Promise');

	// `Promise.resolve` method
	// https://tc39.es/ecma262/#sec-promise.resolve
	$$V({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
	  resolve: function resolve(x) {
	    return promiseResolve(this, x);
	  }
	});

	var defineProperty$7 = objectDefineProperty.f;

	var proxyAccessor$2 = function (Target, Source, key) {
	  key in Target || defineProperty$7(Target, key, {
	    configurable: true,
	    get: function () { return Source[key]; },
	    set: function (it) { Source[key] = it; }
	  });
	};

	var isCallable$e = isCallable$w;
	var isObject$h = isObject$p;
	var setPrototypeOf$5 = objectSetPrototypeOf;

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired$5 = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    setPrototypeOf$5 &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable$e(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject$h(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) setPrototypeOf$5($this, NewTargetPrototype);
	  return $this;
	};

	var classof$e = classof$k;

	var $String$2 = String;

	var toString$l = function (argument) {
	  if (classof$e(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
	  return $String$2(argument);
	};

	var toString$k = toString$l;

	var normalizeStringArgument$1 = function (argument, $default) {
	  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$k(argument);
	};

	var isObject$g = isObject$p;
	var createNonEnumerableProperty$c = createNonEnumerableProperty$f;

	// `InstallErrorCause` abstract operation
	// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
	var installErrorCause$1 = function (O, options) {
	  if (isObject$g(options) && 'cause' in options) {
	    createNonEnumerableProperty$c(O, 'cause', options.cause);
	  }
	};

	var uncurryThis$I = functionUncurryThis;

	var $Error = Error;
	var replace$a = uncurryThis$I(''.replace);

	var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
	// eslint-disable-next-line redos/no-vulnerable -- safe
	var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
	var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

	var errorStackClear = function (stack, dropEntries) {
	  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
	    while (dropEntries--) stack = replace$a(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
	  } return stack;
	};

	var fails$K = fails$V;
	var createPropertyDescriptor$5 = createPropertyDescriptor$8;

	var errorStackInstallable = !fails$K(function () {
	  var error = new Error('a');
	  if (!('stack' in error)) return true;
	  // eslint-disable-next-line es/no-object-defineproperty -- safe
	  Object.defineProperty(error, 'stack', createPropertyDescriptor$5(1, 7));
	  return error.stack !== 7;
	});

	var createNonEnumerableProperty$b = createNonEnumerableProperty$f;
	var clearErrorStack = errorStackClear;
	var ERROR_STACK_INSTALLABLE = errorStackInstallable;

	// non-standard V8
	var captureStackTrace = Error.captureStackTrace;

	var errorStackInstall = function (error, C, stack, dropEntries) {
	  if (ERROR_STACK_INSTALLABLE) {
	    if (captureStackTrace) captureStackTrace(error, C);
	    else createNonEnumerableProperty$b(error, 'stack', clearErrorStack(stack, dropEntries));
	  }
	};

	var getBuiltIn$5 = getBuiltIn$d;
	var hasOwn$j = hasOwnProperty_1;
	var createNonEnumerableProperty$a = createNonEnumerableProperty$f;
	var isPrototypeOf$7 = objectIsPrototypeOf;
	var setPrototypeOf$4 = objectSetPrototypeOf;
	var copyConstructorProperties$2 = copyConstructorProperties$4;
	var proxyAccessor$1 = proxyAccessor$2;
	var inheritIfRequired$4 = inheritIfRequired$5;
	var normalizeStringArgument = normalizeStringArgument$1;
	var installErrorCause = installErrorCause$1;
	var installErrorStack = errorStackInstall;
	var DESCRIPTORS$n = descriptors;

	var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
	  var STACK_TRACE_LIMIT = 'stackTraceLimit';
	  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
	  var path = FULL_NAME.split('.');
	  var ERROR_NAME = path[path.length - 1];
	  var OriginalError = getBuiltIn$5.apply(null, path);

	  if (!OriginalError) return;

	  var OriginalErrorPrototype = OriginalError.prototype;

	  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
	  if (hasOwn$j(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

	  if (!FORCED) return OriginalError;

	  var BaseError = getBuiltIn$5('Error');

	  var WrappedError = wrapper(function (a, b) {
	    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
	    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
	    if (message !== undefined) createNonEnumerableProperty$a(result, 'message', message);
	    installErrorStack(result, WrappedError, result.stack, 2);
	    if (this && isPrototypeOf$7(OriginalErrorPrototype, this)) inheritIfRequired$4(result, this, WrappedError);
	    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
	    return result;
	  });

	  WrappedError.prototype = OriginalErrorPrototype;

	  if (ERROR_NAME !== 'Error') {
	    if (setPrototypeOf$4) setPrototypeOf$4(WrappedError, BaseError);
	    else copyConstructorProperties$2(WrappedError, BaseError, { name: true });
	  } else if (DESCRIPTORS$n && STACK_TRACE_LIMIT in OriginalError) {
	    proxyAccessor$1(WrappedError, OriginalError, STACK_TRACE_LIMIT);
	    proxyAccessor$1(WrappedError, OriginalError, 'prepareStackTrace');
	  }

	  copyConstructorProperties$2(WrappedError, OriginalError);

	  try {
	    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
	    if (OriginalErrorPrototype.name !== ERROR_NAME) {
	      createNonEnumerableProperty$a(OriginalErrorPrototype, 'name', ERROR_NAME);
	    }
	    OriginalErrorPrototype.constructor = WrappedError;
	  } catch (error) { /* empty */ }

	  return WrappedError;
	};

	/* eslint-disable no-unused-vars -- required for functions `.length` */
	var $$U = _export;
	var global$w = global$N;
	var apply$7 = functionApply;
	var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

	var WEB_ASSEMBLY = 'WebAssembly';
	var WebAssembly = global$w[WEB_ASSEMBLY];

	// eslint-disable-next-line es/no-error-cause -- feature detection
	var FORCED$d = new Error('e', { cause: 7 }).cause !== 7;

	var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
	  var O = {};
	  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$d);
	  $$U({ global: true, constructor: true, arity: 1, forced: FORCED$d }, O);
	};

	var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
	  if (WebAssembly && WebAssembly[ERROR_NAME]) {
	    var O = {};
	    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$d);
	    $$U({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$d }, O);
	  }
	};

	// https://tc39.es/ecma262/#sec-nativeerror
	exportGlobalErrorCauseWrapper('Error', function (init) {
	  return function Error(message) { return apply$7(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('EvalError', function (init) {
	  return function EvalError(message) { return apply$7(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('RangeError', function (init) {
	  return function RangeError(message) { return apply$7(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
	  return function ReferenceError(message) { return apply$7(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
	  return function SyntaxError(message) { return apply$7(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('TypeError', function (init) {
	  return function TypeError(message) { return apply$7(init, this, arguments); };
	});
	exportGlobalErrorCauseWrapper('URIError', function (init) {
	  return function URIError(message) { return apply$7(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
	  return function CompileError(message) { return apply$7(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
	  return function LinkError(message) { return apply$7(init, this, arguments); };
	});
	exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
	  return function RuntimeError(message) { return apply$7(init, this, arguments); };
	});

	var DESCRIPTORS$m = descriptors;
	var FUNCTION_NAME_EXISTS = functionName.EXISTS;
	var uncurryThis$H = functionUncurryThis;
	var defineBuiltInAccessor$d = defineBuiltInAccessor$f;

	var FunctionPrototype = Function.prototype;
	var functionToString = uncurryThis$H(FunctionPrototype.toString);
	var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
	var regExpExec$3 = uncurryThis$H(nameRE.exec);
	var NAME$1 = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (DESCRIPTORS$m && !FUNCTION_NAME_EXISTS) {
	  defineBuiltInAccessor$d(FunctionPrototype, NAME$1, {
	    configurable: true,
	    get: function () {
	      try {
	        return regExpExec$3(nameRE, functionToString(this))[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var fails$J = fails$V;

	var correctPrototypeGetter = !fails$J(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var hasOwn$i = hasOwnProperty_1;
	var isCallable$d = isCallable$w;
	var toObject$g = toObject$i;
	var sharedKey$2 = sharedKey$4;
	var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;

	var IE_PROTO$1 = sharedKey$2('IE_PROTO');
	var $Object = Object;
	var ObjectPrototype$4 = $Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf$1 = CORRECT_PROTOTYPE_GETTER$1 ? $Object.getPrototypeOf : function (O) {
	  var object = toObject$g(O);
	  if (hasOwn$i(object, IE_PROTO$1)) return object[IE_PROTO$1];
	  var constructor = object.constructor;
	  if (isCallable$d(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof $Object ? ObjectPrototype$4 : null;
	};

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$4 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS$l = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$3 = objectDefineProperty;
	var anObject$l = anObject$u;
	var toIndexedObject$8 = toIndexedObject$c;
	var objectKeys$3 = objectKeys$4;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$l && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$l(O);
	  var props = toIndexedObject$8(Properties);
	  var keys = objectKeys$3(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);
	  return O;
	};

	/* global ActiveXObject -- old IE, WSH */
	var anObject$k = anObject$u;
	var definePropertiesModule$1 = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys$2 = hiddenKeys$6;
	var html = html$2;
	var documentCreateElement$1 = documentCreateElement$2;
	var sharedKey$1 = sharedKey$4;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$2 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey$1('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement$1('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$2[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$2] = anObject$k(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$2] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
	};

	var fails$I = fails$V;
	var isCallable$c = isCallable$w;
	var isObject$f = isObject$p;
	var getPrototypeOf$4 = objectGetPrototypeOf$1;
	var defineBuiltIn$e = defineBuiltIn$j;
	var wellKnownSymbol$m = wellKnownSymbol$x;

	var ITERATOR$5 = wellKnownSymbol$m('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$4, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$4(getPrototypeOf$4(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$4 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = !isObject$f(IteratorPrototype$4) || fails$I(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$4[ITERATOR$5].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$4 = {};

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$c(IteratorPrototype$4[ITERATOR$5])) {
	  defineBuiltIn$e(IteratorPrototype$4, ITERATOR$5, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$4,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var $$T = _export;
	var global$v = global$N;
	var anInstance$6 = anInstance$8;
	var isCallable$b = isCallable$w;
	var getPrototypeOf$3 = objectGetPrototypeOf$1;
	var createNonEnumerableProperty$9 = createNonEnumerableProperty$f;
	var fails$H = fails$V;
	var hasOwn$h = hasOwnProperty_1;
	var wellKnownSymbol$l = wellKnownSymbol$x;
	var IteratorPrototype$3 = iteratorsCore.IteratorPrototype;

	var TO_STRING_TAG$3 = wellKnownSymbol$l('toStringTag');

	var $TypeError$d = TypeError;
	var NativeIterator = global$v.Iterator;

	// FF56- have non-standard global helper `Iterator`
	var FORCED$c = !isCallable$b(NativeIterator)
	  || NativeIterator.prototype !== IteratorPrototype$3
	  // FF44- non-standard `Iterator` passes previous tests
	  || !fails$H(function () { NativeIterator({}); });

	var IteratorConstructor = function Iterator() {
	  anInstance$6(this, IteratorPrototype$3);
	  if (getPrototypeOf$3(this) === IteratorPrototype$3) throw new $TypeError$d('Abstract class Iterator not directly constructable');
	};

	if (!hasOwn$h(IteratorPrototype$3, TO_STRING_TAG$3)) {
	  createNonEnumerableProperty$9(IteratorPrototype$3, TO_STRING_TAG$3, 'Iterator');
	}

	if (FORCED$c || !hasOwn$h(IteratorPrototype$3, 'constructor') || IteratorPrototype$3.constructor === Object) {
	  createNonEnumerableProperty$9(IteratorPrototype$3, 'constructor', IteratorConstructor);
	}

	IteratorConstructor.prototype = IteratorPrototype$3;

	// `Iterator` constructor
	// https://github.com/tc39/proposal-iterator-helpers
	$$T({ global: true, constructor: true, forced: FORCED$c }, {
	  Iterator: IteratorConstructor
	});

	// `GetIteratorDirect(obj)` abstract operation
	// https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
	var getIteratorDirect$7 = function (obj) {
	  return {
	    iterator: obj,
	    next: obj.next,
	    done: false
	  };
	};

	var $$S = _export;
	var iterate$6 = iterate$9;
	var aCallable$a = aCallable$j;
	var anObject$j = anObject$u;
	var getIteratorDirect$6 = getIteratorDirect$7;

	// `Iterator.prototype.every` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$S({ target: 'Iterator', proto: true, real: true }, {
	  every: function every(predicate) {
	    anObject$j(this);
	    aCallable$a(predicate);
	    var record = getIteratorDirect$6(this);
	    var counter = 0;
	    return !iterate$6(record, function (value, stop) {
	      if (!predicate(value, counter++)) return stop();
	    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
	  }
	});

	var classof$d = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$6 = Array.isArray || function isArray(argument) {
	  return classof$d(argument) === 'Array';
	};

	var toPropertyKey$2 = toPropertyKey$5;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor$4 = createPropertyDescriptor$8;

	var createProperty$6 = function (object, key, value) {
	  var propertyKey = toPropertyKey$2(key);
	  if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor$4(0, value));
	  else object[propertyKey] = value;
	};

	var fails$G = fails$V;
	var wellKnownSymbol$k = wellKnownSymbol$x;
	var V8_VERSION$1 = engineV8Version;

	var SPECIES$3 = wellKnownSymbol$k('species');

	var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$G(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$3] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$R = _export;
	var isArray$5 = isArray$6;
	var isConstructor$2 = isConstructor$4;
	var isObject$e = isObject$p;
	var toAbsoluteIndex$5 = toAbsoluteIndex$7;
	var lengthOfArrayLike$j = lengthOfArrayLike$m;
	var toIndexedObject$7 = toIndexedObject$c;
	var createProperty$5 = createProperty$6;
	var wellKnownSymbol$j = wellKnownSymbol$x;
	var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;
	var nativeSlice = arraySlice$a;

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$4('slice');

	var SPECIES$2 = wellKnownSymbol$j('species');
	var $Array$4 = Array;
	var max$3 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$R({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject$7(this);
	    var length = lengthOfArrayLike$j(O);
	    var k = toAbsoluteIndex$5(start, length);
	    var fin = toAbsoluteIndex$5(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$5(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor$2(Constructor) && (Constructor === $Array$4 || isArray$5(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$e(Constructor)) {
	        Constructor = Constructor[SPECIES$2];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === $Array$4 || Constructor === undefined) {
	        return nativeSlice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? $Array$4 : Constructor)(max$3(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$5(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var DESCRIPTORS$k = descriptors;
	var uncurryThis$G = functionUncurryThis;
	var call$n = functionCall;
	var fails$F = fails$V;
	var objectKeys$2 = objectKeys$4;
	var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var toObject$f = toObject$i;
	var IndexedObject$4 = indexedObject;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty$6 = Object.defineProperty;
	var concat$2 = uncurryThis$G([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$F(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$k && $assign({ b: 1 }, $assign(defineProperty$6({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$6(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es/no-symbol -- safe
	  var symbol = Symbol('assign detection');
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] !== 7 || objectKeys$2($assign({}, B)).join('') !== alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$f(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule$1.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject$4(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat$2(objectKeys$2(S), getOwnPropertySymbols(S)) : objectKeys$2(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$k || call$n(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$Q = _export;
	var assign$1 = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$Q({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign$1 }, {
	  assign: assign$1
	});

	var DESCRIPTORS$j = descriptors;
	var fails$E = fails$V;
	var uncurryThis$F = functionUncurryThis;
	var objectGetPrototypeOf = objectGetPrototypeOf$1;
	var objectKeys$1 = objectKeys$4;
	var toIndexedObject$6 = toIndexedObject$c;
	var $propertyIsEnumerable$1 = objectPropertyIsEnumerable.f;

	var propertyIsEnumerable = uncurryThis$F($propertyIsEnumerable$1);
	var push$d = uncurryThis$F([].push);

	// in some IE versions, `propertyIsEnumerable` returns incorrect result on integer keys
	// of `null` prototype objects
	var IE_BUG = DESCRIPTORS$j && fails$E(function () {
	  // eslint-disable-next-line es/no-object-create -- safe
	  var O = Object.create(null);
	  O[2] = 2;
	  return !propertyIsEnumerable(O, 2);
	});

	// `Object.{ entries, values }` methods implementation
	var createMethod$5 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject$6(it);
	    var keys = objectKeys$1(O);
	    var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null;
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS$j || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
	        push$d(result, TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.es/ecma262/#sec-object.entries
	  entries: createMethod$5(true),
	  // `Object.values` method
	  // https://tc39.es/ecma262/#sec-object.values
	  values: createMethod$5(false)
	};

	var $$P = _export;
	var $values = objectToArray.values;

	// `Object.values` method
	// https://tc39.es/ecma262/#sec-object.values
	$$P({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return $values(O);
	  }
	});

	var DESCRIPTORS$i = descriptors;
	var isArray$4 = isArray$6;

	var $TypeError$c = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$i && !function () {
	  // makes no sense without proper strict mode support
	  if (this !== undefined) return true;
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).length = 1;
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	}();

	var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
	  if (isArray$4(O) && !getOwnPropertyDescriptor$3(O, 'length').writable) {
	    throw new $TypeError$c('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};

	var $TypeError$b = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$3 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError$b('Maximum allowed index exceeded');
	  return it;
	};

	var $$O = _export;
	var toObject$e = toObject$i;
	var lengthOfArrayLike$i = lengthOfArrayLike$m;
	var setArrayLength$1 = arraySetLength;
	var doesNotExceedSafeInteger$2 = doesNotExceedSafeInteger$3;
	var fails$D = fails$V;

	var INCORRECT_TO_LENGTH = fails$D(function () {
	  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
	});

	// V8 and Safari <= 15.4, FF < 23 throws InternalError
	// https://bugs.chromium.org/p/v8/issues/detail?id=12681
	var properErrorOnNonWritableLength = function () {
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).push();
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	};

	var FORCED$b = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

	// `Array.prototype.push` method
	// https://tc39.es/ecma262/#sec-array.prototype.push
	$$O({ target: 'Array', proto: true, arity: 1, forced: FORCED$b }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  push: function push(item) {
	    var O = toObject$e(this);
	    var len = lengthOfArrayLike$i(O);
	    var argCount = arguments.length;
	    doesNotExceedSafeInteger$2(len + argCount);
	    for (var i = 0; i < argCount; i++) {
	      O[len] = arguments[i];
	      len++;
	    }
	    setArrayLength$1(O, len);
	    return len;
	  }
	});

	var $$N = _export;
	var toObject$d = toObject$i;
	var nativeKeys = objectKeys$4;
	var fails$C = fails$V;

	var FAILS_ON_PRIMITIVES$3 = fails$C(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$N({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$3 }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$d(it));
	  }
	});

	var isArray$3 = isArray$6;
	var isConstructor$1 = isConstructor$4;
	var isObject$d = isObject$p;
	var wellKnownSymbol$i = wellKnownSymbol$x;

	var SPECIES$1 = wellKnownSymbol$i('species');
	var $Array$3 = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$3(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$1(C) && (C === $Array$3 || isArray$3(C.prototype))) C = undefined;
	    else if (isObject$d(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array$3 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$3 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var tryToString$2 = tryToString$7;

	var $TypeError$a = TypeError;

	var deletePropertyOrThrow$3 = function (O, P) {
	  if (!delete O[P]) throw new $TypeError$a('Cannot delete property ' + tryToString$2(P) + ' of ' + tryToString$2(O));
	};

	var $$M = _export;
	var toObject$c = toObject$i;
	var toAbsoluteIndex$4 = toAbsoluteIndex$7;
	var toIntegerOrInfinity$b = toIntegerOrInfinity$e;
	var lengthOfArrayLike$h = lengthOfArrayLike$m;
	var setArrayLength = arraySetLength;
	var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$3;
	var arraySpeciesCreate$2 = arraySpeciesCreate$3;
	var createProperty$4 = createProperty$6;
	var deletePropertyOrThrow$2 = deletePropertyOrThrow$3;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('splice');

	var max$2 = Math.max;
	var min$5 = Math.min;

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$$M({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject$c(this);
	    var len = lengthOfArrayLike$h(O);
	    var actualStart = toAbsoluteIndex$4(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$5(max$2(toIntegerOrInfinity$b(deleteCount), 0), len - actualStart);
	    }
	    doesNotExceedSafeInteger$1(len + insertCount - actualDeleteCount);
	    A = arraySpeciesCreate$2(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty$4(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow$2(O, to);
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow$2(O, k - 1);
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow$2(O, to);
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    setArrayLength(O, len - actualDeleteCount + insertCount);
	    return A;
	  }
	});

	var $$L = _export;
	var iterate$5 = iterate$9;
	var aCallable$9 = aCallable$j;
	var anObject$i = anObject$u;
	var getIteratorDirect$5 = getIteratorDirect$7;

	// `Iterator.prototype.forEach` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$L({ target: 'Iterator', proto: true, real: true }, {
	  forEach: function forEach(fn) {
	    anObject$i(this);
	    aCallable$9(fn);
	    var record = getIteratorDirect$5(this);
	    var counter = 0;
	    iterate$5(record, function (value) {
	      fn(value, counter++);
	    }, { IS_RECORD: true });
	  }
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
	var documentCreateElement = documentCreateElement$2;

	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? undefined : DOMTokenListPrototype$2;

	var bind$7 = functionBindContext;
	var uncurryThis$E = functionUncurryThis;
	var IndexedObject$3 = indexedObject;
	var toObject$b = toObject$i;
	var lengthOfArrayLike$g = lengthOfArrayLike$m;
	var arraySpeciesCreate$1 = arraySpeciesCreate$3;

	var push$c = uncurryThis$E([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$4 = function (TYPE) {
	  var IS_MAP = TYPE === 1;
	  var IS_FILTER = TYPE === 2;
	  var IS_SOME = TYPE === 3;
	  var IS_EVERY = TYPE === 4;
	  var IS_FIND_INDEX = TYPE === 6;
	  var IS_FILTER_REJECT = TYPE === 7;
	  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$b($this);
	    var self = IndexedObject$3(O);
	    var boundFunction = bind$7(callbackfn, that);
	    var length = lengthOfArrayLike$g(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate$1;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push$c(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$c(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$4(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$4(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$4(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$4(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$4(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$4(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$4(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$4(7)
	};

	var fails$B = fails$V;

	var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$B(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach$2 = arrayIteration.forEach;
	var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;

	var STRICT_METHOD$2 = arrayMethodIsStrict$3('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$2 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$2(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	var global$u = global$N;
	var DOMIterables$1 = domIterables;
	var DOMTokenListPrototype$1 = domTokenListPrototype;
	var forEach$3 = arrayForEach;
	var createNonEnumerableProperty$8 = createNonEnumerableProperty$f;

	var handlePrototype$1 = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach$3) try {
	    createNonEnumerableProperty$8(CollectionPrototype, 'forEach', forEach$3);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach$3;
	  }
	};

	for (var COLLECTION_NAME$1 in DOMIterables$1) {
	  if (DOMIterables$1[COLLECTION_NAME$1]) {
	    handlePrototype$1(global$u[COLLECTION_NAME$1] && global$u[COLLECTION_NAME$1].prototype);
	  }
	}

	handlePrototype$1(DOMTokenListPrototype$1);

	var $$K = _export;
	var uncurryThis$D = functionUncurryThis;
	var IndexedObject$2 = indexedObject;
	var toIndexedObject$5 = toIndexedObject$c;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$4;

	var nativeJoin = uncurryThis$D([].join);

	var ES3_STRINGS = IndexedObject$2 !== Object;
	var FORCED$a = ES3_STRINGS || !arrayMethodIsStrict$2('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	$$K({ target: 'Array', proto: true, forced: FORCED$a }, {
	  join: function join(separator) {
	    return nativeJoin(toIndexedObject$5(this), separator === undefined ? ',' : separator);
	  }
	});

	// eslint-disable-next-line es/no-math-expm1 -- safe
	var $expm1 = Math.expm1;
	var exp = Math.exp;

	// `Math.expm1` method implementation
	// https://tc39.es/ecma262/#sec-math.expm1
	var mathExpm1 = (!$expm1
	  // Old FF bug
	  // eslint-disable-next-line no-loss-of-precision -- required for old engines
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) !== -2e-17
	) ? function expm1(x) {
	  var n = +x;
	  return n === 0 ? n : n > -1e-6 && n < 1e-6 ? n + n * n / 2 : exp(n) - 1;
	} : $expm1;

	var $$J = _export;
	var expm1 = mathExpm1;

	// eslint-disable-next-line es/no-math-cosh -- required for testing
	var $cosh = Math.cosh;
	var abs$2 = Math.abs;
	var E = Math.E;

	var FORCED$9 = !$cosh || $cosh(710) === Infinity;

	// `Math.cosh` method
	// https://tc39.es/ecma262/#sec-math.cosh
	$$J({ target: 'Math', stat: true, forced: FORCED$9 }, {
	  cosh: function cosh(x) {
	    var t = expm1(abs$2(x) - 1) + 1;
	    return (t + 1 / (t * E * E)) * (E / 2);
	  }
	});

	var $$I = _export;

	var log$2 = Math.log;
	var LN2$1 = Math.LN2;

	// `Math.log2` method
	// https://tc39.es/ecma262/#sec-math.log2
	$$I({ target: 'Math', stat: true }, {
	  log2: function log2(x) {
	    return log$2(x) / LN2$1;
	  }
	});

	var uncurryThis$C = functionUncurryThis;

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue$2 = uncurryThis$C(1.0.valueOf);

	var toIntegerOrInfinity$a = toIntegerOrInfinity$e;
	var toString$j = toString$l;
	var requireObjectCoercible$8 = requireObjectCoercible$b;

	var $RangeError$6 = RangeError;

	// `String.prototype.repeat` method implementation
	// https://tc39.es/ecma262/#sec-string.prototype.repeat
	var stringRepeat = function repeat(count) {
	  var str = toString$j(requireObjectCoercible$8(this));
	  var result = '';
	  var n = toIntegerOrInfinity$a(count);
	  if (n < 0 || n === Infinity) throw new $RangeError$6('Wrong number of repetitions');
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
	  return result;
	};

	var $$H = _export;
	var uncurryThis$B = functionUncurryThis;
	var toIntegerOrInfinity$9 = toIntegerOrInfinity$e;
	var thisNumberValue$1 = thisNumberValue$2;
	var $repeat = stringRepeat;
	var fails$A = fails$V;

	var $RangeError$5 = RangeError;
	var $String$1 = String;
	var floor$7 = Math.floor;
	var repeat = uncurryThis$B($repeat);
	var stringSlice$a = uncurryThis$B(''.slice);
	var nativeToFixed = uncurryThis$B(1.0.toFixed);

	var pow$2 = function (x, n, acc) {
	  return n === 0 ? acc : n % 2 === 1 ? pow$2(x, n - 1, acc * x) : pow$2(x * x, n / 2, acc);
	};

	var log$1 = function (x) {
	  var n = 0;
	  var x2 = x;
	  while (x2 >= 4096) {
	    n += 12;
	    x2 /= 4096;
	  }
	  while (x2 >= 2) {
	    n += 1;
	    x2 /= 2;
	  } return n;
	};

	var multiply = function (data, n, c) {
	  var index = -1;
	  var c2 = c;
	  while (++index < 6) {
	    c2 += n * data[index];
	    data[index] = c2 % 1e7;
	    c2 = floor$7(c2 / 1e7);
	  }
	};

	var divide = function (data, n) {
	  var index = 6;
	  var c = 0;
	  while (--index >= 0) {
	    c += data[index];
	    data[index] = floor$7(c / n);
	    c = (c % n) * 1e7;
	  }
	};

	var dataToString = function (data) {
	  var index = 6;
	  var s = '';
	  while (--index >= 0) {
	    if (s !== '' || index === 0 || data[index] !== 0) {
	      var t = $String$1(data[index]);
	      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
	    }
	  } return s;
	};

	var FORCED$8 = fails$A(function () {
	  return nativeToFixed(0.00008, 3) !== '0.000' ||
	    nativeToFixed(0.9, 0) !== '1' ||
	    nativeToFixed(1.255, 2) !== '1.25' ||
	    nativeToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
	}) || !fails$A(function () {
	  // V8 ~ Android 4.3-
	  nativeToFixed({});
	});

	// `Number.prototype.toFixed` method
	// https://tc39.es/ecma262/#sec-number.prototype.tofixed
	$$H({ target: 'Number', proto: true, forced: FORCED$8 }, {
	  toFixed: function toFixed(fractionDigits) {
	    var number = thisNumberValue$1(this);
	    var fractDigits = toIntegerOrInfinity$9(fractionDigits);
	    var data = [0, 0, 0, 0, 0, 0];
	    var sign = '';
	    var result = '0';
	    var e, z, j, k;

	    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
	    if (fractDigits < 0 || fractDigits > 20) throw new $RangeError$5('Incorrect fraction digits');
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (number !== number) return 'NaN';
	    if (number <= -1e21 || number >= 1e21) return $String$1(number);
	    if (number < 0) {
	      sign = '-';
	      number = -number;
	    }
	    if (number > 1e-21) {
	      e = log$1(number * pow$2(2, 69, 1)) - 69;
	      z = e < 0 ? number * pow$2(2, -e, 1) : number / pow$2(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if (e > 0) {
	        multiply(data, 0, z);
	        j = fractDigits;
	        while (j >= 7) {
	          multiply(data, 1e7, 0);
	          j -= 7;
	        }
	        multiply(data, pow$2(10, j, 1), 0);
	        j = e - 1;
	        while (j >= 23) {
	          divide(data, 1 << 23);
	          j -= 23;
	        }
	        divide(data, 1 << j);
	        multiply(data, 1, 1);
	        divide(data, 2);
	        result = dataToString(data);
	      } else {
	        multiply(data, 0, z);
	        multiply(data, 1 << -e, 0);
	        result = dataToString(data) + repeat('0', fractDigits);
	      }
	    }
	    if (fractDigits > 0) {
	      k = result.length;
	      result = sign + (k <= fractDigits
	        ? '0.' + repeat('0', fractDigits - k) + result
	        : stringSlice$a(result, 0, k - fractDigits) + '.' + stringSlice$a(result, k - fractDigits));
	    } else {
	      result = sign + result;
	    } return result;
	  }
	});

	var anObject$h = anObject$u;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$h(this);
	  var result = '';
	  if (that.hasIndices) result += 'd';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.unicodeSets) result += 'v';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var fails$z = fails$V;
	var global$t = global$N;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global$t.RegExp;

	var UNSUPPORTED_Y$3 = fails$z(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') !== null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY$2 = UNSUPPORTED_Y$3 || fails$z(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$3 || fails$z(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') !== null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY$2,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$3
	};

	var fails$y = fails$V;
	var global$s = global$N;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global$s.RegExp;

	var regexpUnsupportedDotAll = fails$y(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.test('\n') && re.flags === 's');
	});

	var fails$x = fails$V;
	var global$r = global$N;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global$r.RegExp;

	var regexpUnsupportedNcg = fails$x(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$m = functionCall;
	var uncurryThis$A = functionUncurryThis;
	var toString$i = toString$l;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers$2 = regexpStickyHelpers;
	var shared$3 = sharedExports;
	var create$7 = objectCreate;
	var getInternalState$7 = internalState.get;
	var UNSUPPORTED_DOT_ALL$2 = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

	var nativeReplace = shared$3('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$8 = uncurryThis$A(''.charAt);
	var indexOf = uncurryThis$A(''.indexOf);
	var replace$9 = uncurryThis$A(''.replace);
	var stringSlice$9 = uncurryThis$A(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$m(nativeExec, re1, 'a');
	  call$m(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$2 = stickyHelpers$2.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$2 || UNSUPPORTED_NCG$1;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState$7(re);
	    var str = toString$i(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$m(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$2 && re.sticky;
	    var flags = call$m(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$9(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$9(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$8(str, re.lastIndex - 1) !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = call$m(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$9(match.input, charsAdded);
	        match[0] = stringSlice$9(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      call$m(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create$7(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$3 = patchedExec;

	var $$G = _export;
	var exec$7 = regexpExec$3;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$G({ target: 'RegExp', proto: true, forced: /./.exec !== exec$7 }, {
	  exec: exec$7
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var uncurryThis$z = functionUncurryThisClause;
	var defineBuiltIn$d = defineBuiltIn$j;
	var regexpExec$2 = regexpExec$3;
	var fails$w = fails$V;
	var wellKnownSymbol$h = wellKnownSymbol$x;
	var createNonEnumerableProperty$7 = createNonEnumerableProperty$f;

	var SPECIES = wellKnownSymbol$h('species');
	var RegExpPrototype$5 = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol$h(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$w(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) !== 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$w(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () {
	      execCalled = true;
	      return null;
	    };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var uncurriedNativeRegExpMethod = uncurryThis$z(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = uncurryThis$z(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$2 || $exec === RegExpPrototype$5.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
	        }
	        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn$d(String.prototype, KEY, methods[0]);
	    defineBuiltIn$d(RegExpPrototype$5, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty$7(RegExpPrototype$5[SYMBOL], 'sham', true);
	};

	var uncurryThis$y = functionUncurryThis;
	var toIntegerOrInfinity$8 = toIntegerOrInfinity$e;
	var toString$h = toString$l;
	var requireObjectCoercible$7 = requireObjectCoercible$b;

	var charAt$7 = uncurryThis$y(''.charAt);
	var charCodeAt$3 = uncurryThis$y(''.charCodeAt);
	var stringSlice$8 = uncurryThis$y(''.slice);

	var createMethod$3 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$h(requireObjectCoercible$7($this));
	    var position = toIntegerOrInfinity$8(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt$3(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt$3(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$7(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$8(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$3(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$3(true)
	};

	var charAt$6 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$3 = function (S, index, unicode) {
	  return index + (unicode ? charAt$6(S, index).length : 1);
	};

	var uncurryThis$x = functionUncurryThis;
	var toObject$a = toObject$i;

	var floor$6 = Math.floor;
	var charAt$5 = uncurryThis$x(''.charAt);
	var replace$8 = uncurryThis$x(''.replace);
	var stringSlice$7 = uncurryThis$x(''.slice);
	// eslint-disable-next-line redos/no-vulnerable -- safe
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

	// `GetSubstitution` abstract operation
	// https://tc39.es/ecma262/#sec-getsubstitution
	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject$a(namedCaptures);
	    symbols = SUBSTITUTION_SYMBOLS;
	  }
	  return replace$8(replacement, symbols, function (match, ch) {
	    var capture;
	    switch (charAt$5(ch, 0)) {
	      case '$': return '$';
	      case '&': return matched;
	      case '`': return stringSlice$7(str, 0, position);
	      case "'": return stringSlice$7(str, tailPos);
	      case '<':
	        capture = namedCaptures[stringSlice$7(ch, 1, -1)];
	        break;
	      default: // \d\d?
	        var n = +ch;
	        if (n === 0) return match;
	        if (n > m) {
	          var f = floor$6(n / 10);
	          if (f === 0) return match;
	          if (f <= m) return captures[f - 1] === undefined ? charAt$5(ch, 1) : captures[f - 1] + charAt$5(ch, 1);
	          return match;
	        }
	        capture = captures[n - 1];
	    }
	    return capture === undefined ? '' : capture;
	  });
	};

	var call$l = functionCall;
	var anObject$g = anObject$u;
	var isCallable$a = isCallable$w;
	var classof$c = classofRaw$2;
	var regexpExec$1 = regexpExec$3;

	var $TypeError$9 = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$a(exec)) {
	    var result = call$l(exec, R, S);
	    if (result !== null) anObject$g(result);
	    return result;
	  }
	  if (classof$c(R) === 'RegExp') return call$l(regexpExec$1, R, S);
	  throw new $TypeError$9('RegExp#exec called on incompatible receiver');
	};

	var apply$6 = functionApply;
	var call$k = functionCall;
	var uncurryThis$w = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$3 = fixRegexpWellKnownSymbolLogic;
	var fails$v = fails$V;
	var anObject$f = anObject$u;
	var isCallable$9 = isCallable$w;
	var isNullOrUndefined$5 = isNullOrUndefined$a;
	var toIntegerOrInfinity$7 = toIntegerOrInfinity$e;
	var toLength$6 = toLength$8;
	var toString$g = toString$l;
	var requireObjectCoercible$6 = requireObjectCoercible$b;
	var advanceStringIndex$2 = advanceStringIndex$3;
	var getMethod$4 = getMethod$8;
	var getSubstitution = getSubstitution$1;
	var regExpExec$2 = regexpExecAbstract;
	var wellKnownSymbol$g = wellKnownSymbol$x;

	var REPLACE = wellKnownSymbol$g('replace');
	var max$1 = Math.max;
	var min$4 = Math.min;
	var concat$1 = uncurryThis$w([].concat);
	var push$b = uncurryThis$w([].push);
	var stringIndexOf$2 = uncurryThis$w(''.indexOf);
	var stringSlice$6 = uncurryThis$w(''.slice);

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }
	  return false;
	})();

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$v(function () {
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
	  return ''.replace(re, '$<a>') !== '7';
	});

	// @@replace logic
	fixRegExpWellKnownSymbolLogic$3('replace', function (_, nativeReplace, maybeCallNative) {
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

	  return [
	    // `String.prototype.replace` method
	    // https://tc39.es/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = requireObjectCoercible$6(this);
	      var replacer = isNullOrUndefined$5(searchValue) ? undefined : getMethod$4(searchValue, REPLACE);
	      return replacer
	        ? call$k(replacer, searchValue, O, replaceValue)
	        : call$k(nativeReplace, toString$g(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	    function (string, replaceValue) {
	      var rx = anObject$f(this);
	      var S = toString$g(string);

	      if (
	        typeof replaceValue == 'string' &&
	        stringIndexOf$2(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
	        stringIndexOf$2(replaceValue, '$<') === -1
	      ) {
	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
	        if (res.done) return res.value;
	      }

	      var functionalReplace = isCallable$9(replaceValue);
	      if (!functionalReplace) replaceValue = toString$g(replaceValue);

	      var global = rx.global;
	      var fullUnicode;
	      if (global) {
	        fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }

	      var results = [];
	      var result;
	      while (true) {
	        result = regExpExec$2(rx, S);
	        if (result === null) break;

	        push$b(results, result);
	        if (!global) break;

	        var matchStr = toString$g(result[0]);
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$6(rx.lastIndex), fullUnicode);
	      }

	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];

	        var matched = toString$g(result[0]);
	        var position = max$1(min$4(toIntegerOrInfinity$7(result.index), S.length), 0);
	        var captures = [];
	        var replacement;
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) push$b(captures, maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = concat$1([matched], captures, position, S);
	          if (namedCaptures !== undefined) push$b(replacerArgs, namedCaptures);
	          replacement = toString$g(apply$6(replaceValue, undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += stringSlice$6(S, nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }

	      return accumulatedResult + stringSlice$6(S, nextSourcePosition);
	    }
	  ];
	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

	var toAbsoluteIndex$3 = toAbsoluteIndex$7;
	var lengthOfArrayLike$f = lengthOfArrayLike$m;
	var createProperty$3 = createProperty$6;

	var $Array$2 = Array;
	var max = Math.max;

	var arraySliceSimple = function (O, start, end) {
	  var length = lengthOfArrayLike$f(O);
	  var k = toAbsoluteIndex$3(start, length);
	  var fin = toAbsoluteIndex$3(end === undefined ? length : end, length);
	  var result = $Array$2(max(fin - k, 0));
	  var n = 0;
	  for (; k < fin; k++, n++) createProperty$3(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	var arraySlice$8 = arraySliceSimple;

	var floor$5 = Math.floor;

	var mergeSort = function (array, comparefn) {
	  var length = array.length;
	  var middle = floor$5(length / 2);
	  return length < 8 ? insertionSort(array, comparefn) : merge(
	    array,
	    mergeSort(arraySlice$8(array, 0, middle), comparefn),
	    mergeSort(arraySlice$8(array, middle), comparefn),
	    comparefn
	  );
	};

	var insertionSort = function (array, comparefn) {
	  var length = array.length;
	  var i = 1;
	  var element, j;

	  while (i < length) {
	    j = i;
	    element = array[i];
	    while (j && comparefn(array[j - 1], element) > 0) {
	      array[j] = array[--j];
	    }
	    if (j !== i++) array[j] = element;
	  } return array;
	};

	var merge = function (array, left, right, comparefn) {
	  var llength = left.length;
	  var rlength = right.length;
	  var lindex = 0;
	  var rindex = 0;

	  while (lindex < llength || rindex < rlength) {
	    array[lindex + rindex] = (lindex < llength && rindex < rlength)
	      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
	      : lindex < llength ? left[lindex++] : right[rindex++];
	  } return array;
	};

	var arraySort$1 = mergeSort;

	var userAgent$1 = engineUserAgent;

	var firefox = userAgent$1.match(/firefox\/(\d+)/i);

	var engineFfVersion = !!firefox && +firefox[1];

	var UA = engineUserAgent;

	var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

	var userAgent = engineUserAgent;

	var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

	var engineWebkitVersion = !!webkit && +webkit[1];

	var $$F = _export;
	var uncurryThis$v = functionUncurryThis;
	var aCallable$8 = aCallable$j;
	var toObject$9 = toObject$i;
	var lengthOfArrayLike$e = lengthOfArrayLike$m;
	var deletePropertyOrThrow$1 = deletePropertyOrThrow$3;
	var toString$f = toString$l;
	var fails$u = fails$V;
	var internalSort$1 = arraySort$1;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;
	var FF$1 = engineFfVersion;
	var IE_OR_EDGE$1 = engineIsIeOrEdge;
	var V8$2 = engineV8Version;
	var WEBKIT$1 = engineWebkitVersion;

	var test = [];
	var nativeSort$1 = uncurryThis$v(test.sort);
	var push$a = uncurryThis$v(test.push);

	// IE8-
	var FAILS_ON_UNDEFINED = fails$u(function () {
	  test.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails$u(function () {
	  test.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD$1 = arrayMethodIsStrict$1('sort');

	var STABLE_SORT$1 = !fails$u(function () {
	  // feature detection can be too slow, so check engines versions
	  if (V8$2) return V8$2 < 70;
	  if (FF$1 && FF$1 > 3) return;
	  if (IE_OR_EDGE$1) return true;
	  if (WEBKIT$1) return WEBKIT$1 < 603;

	  var result = '';
	  var code, chr, value, index;

	  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
	  for (code = 65; code < 76; code++) {
	    chr = String.fromCharCode(code);

	    switch (code) {
	      case 66: case 69: case 70: case 72: value = 3; break;
	      case 68: case 71: value = 4; break;
	      default: value = 2;
	    }

	    for (index = 0; index < 47; index++) {
	      test.push({ k: chr + index, v: value });
	    }
	  }

	  test.sort(function (a, b) { return b.v - a.v; });

	  for (index = 0; index < test.length; index++) {
	    chr = test[index].k.charAt(0);
	    if (result.charAt(result.length - 1) !== chr) result += chr;
	  }

	  return result !== 'DGBEFHACIJK';
	});

	var FORCED$7 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$1 || !STABLE_SORT$1;

	var getSortCompare$1 = function (comparefn) {
	  return function (x, y) {
	    if (y === undefined) return -1;
	    if (x === undefined) return 1;
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    return toString$f(x) > toString$f(y) ? 1 : -1;
	  };
	};

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	$$F({ target: 'Array', proto: true, forced: FORCED$7 }, {
	  sort: function sort(comparefn) {
	    if (comparefn !== undefined) aCallable$8(comparefn);

	    var array = toObject$9(this);

	    if (STABLE_SORT$1) return comparefn === undefined ? nativeSort$1(array) : nativeSort$1(array, comparefn);

	    var items = [];
	    var arrayLength = lengthOfArrayLike$e(array);
	    var itemsLength, index;

	    for (index = 0; index < arrayLength; index++) {
	      if (index in array) push$a(items, array[index]);
	    }

	    internalSort$1(items, getSortCompare$1(comparefn));

	    itemsLength = lengthOfArrayLike$e(items);
	    index = 0;

	    while (index < itemsLength) array[index] = items[index++];
	    while (index < arrayLength) deletePropertyOrThrow$1(array, index++);

	    return array;
	  }
	});

	var $$E = _export;
	var $map$1 = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$E({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var defineBuiltIn$c = defineBuiltIn$j;

	var defineBuiltIns$4 = function (target, src, options) {
	  for (var key in src) defineBuiltIn$c(target, key, src[key], options);
	  return target;
	};

	// `CreateIterResultObject` abstract operation
	// https://tc39.es/ecma262/#sec-createiterresultobject
	var createIterResultObject$5 = function (value, done) {
	  return { value: value, done: done };
	};

	var call$j = functionCall;
	var create$6 = objectCreate;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$f;
	var defineBuiltIns$3 = defineBuiltIns$4;
	var wellKnownSymbol$f = wellKnownSymbol$x;
	var InternalStateModule$9 = internalState;
	var getMethod$3 = getMethod$8;
	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var createIterResultObject$4 = createIterResultObject$5;
	var iteratorClose$1 = iteratorClose$3;

	var TO_STRING_TAG$2 = wellKnownSymbol$f('toStringTag');
	var ITERATOR_HELPER = 'IteratorHelper';
	var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
	var setInternalState$8 = InternalStateModule$9.set;

	var createIteratorProxyPrototype = function (IS_ITERATOR) {
	  var getInternalState = InternalStateModule$9.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

	  return defineBuiltIns$3(create$6(IteratorPrototype$2), {
	    next: function next() {
	      var state = getInternalState(this);
	      // for simplification:
	      //   for `%WrapForValidIteratorPrototype%.next` our `nextHandler` returns `IterResultObject`
	      //   for `%IteratorHelperPrototype%.next` - just a value
	      if (IS_ITERATOR) return state.nextHandler();
	      try {
	        var result = state.done ? undefined : state.nextHandler();
	        return createIterResultObject$4(result, state.done);
	      } catch (error) {
	        state.done = true;
	        throw error;
	      }
	    },
	    'return': function () {
	      var state = getInternalState(this);
	      var iterator = state.iterator;
	      state.done = true;
	      if (IS_ITERATOR) {
	        var returnMethod = getMethod$3(iterator, 'return');
	        return returnMethod ? call$j(returnMethod, iterator) : createIterResultObject$4(undefined, true);
	      }
	      if (state.inner) try {
	        iteratorClose$1(state.inner.iterator, 'normal');
	      } catch (error) {
	        return iteratorClose$1(iterator, 'throw', error);
	      }
	      iteratorClose$1(iterator, 'normal');
	      return createIterResultObject$4(undefined, true);
	    }
	  });
	};

	var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
	var IteratorHelperPrototype = createIteratorProxyPrototype(false);

	createNonEnumerableProperty$6(IteratorHelperPrototype, TO_STRING_TAG$2, 'Iterator Helper');

	var iteratorCreateProxy = function (nextHandler, IS_ITERATOR) {
	  var IteratorProxy = function Iterator(record, state) {
	    if (state) {
	      state.iterator = record.iterator;
	      state.next = record.next;
	    } else state = record;
	    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
	    state.nextHandler = nextHandler;
	    state.counter = 0;
	    state.done = false;
	    setInternalState$8(this, state);
	  };

	  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

	  return IteratorProxy;
	};

	var anObject$e = anObject$u;
	var iteratorClose = iteratorClose$3;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing$3 = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject$e(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose(iterator, 'throw', error);
	  }
	};

	var call$i = functionCall;
	var aCallable$7 = aCallable$j;
	var anObject$d = anObject$u;
	var getIteratorDirect$4 = getIteratorDirect$7;
	var createIteratorProxy$1 = iteratorCreateProxy;
	var callWithSafeIterationClosing$2 = callWithSafeIterationClosing$3;

	var IteratorProxy$1 = createIteratorProxy$1(function () {
	  var iterator = this.iterator;
	  var result = anObject$d(call$i(this.next, iterator));
	  var done = this.done = !!result.done;
	  if (!done) return callWithSafeIterationClosing$2(iterator, this.mapper, [result.value, this.counter++], true);
	});

	// `Iterator.prototype.map` method
	// https://github.com/tc39/proposal-iterator-helpers
	var iteratorMap = function map(mapper) {
	  anObject$d(this);
	  aCallable$7(mapper);
	  return new IteratorProxy$1(getIteratorDirect$4(this), {
	    mapper: mapper
	  });
	};

	var $$D = _export;
	var map = iteratorMap;
	var IS_PURE$3 = isPure;

	// `Iterator.prototype.map` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$D({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$3 }, {
	  map: map
	});

	var global$q = global$N;

	var path$2 = global$q;

	// a string of all valid unicode whitespaces
	var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var uncurryThis$u = functionUncurryThis;
	var requireObjectCoercible$5 = requireObjectCoercible$b;
	var toString$e = toString$l;
	var whitespaces$1 = whitespaces$2;

	var replace$7 = uncurryThis$u(''.replace);
	var ltrim = RegExp('^[' + whitespaces$1 + ']+');
	var rtrim = RegExp('(^|[^' + whitespaces$1 + '])[' + whitespaces$1 + ']+$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$2 = function (TYPE) {
	  return function ($this) {
	    var string = toString$e(requireObjectCoercible$5($this));
	    if (TYPE & 1) string = replace$7(string, ltrim, '');
	    if (TYPE & 2) string = replace$7(string, rtrim, '$1');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$2(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$2(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$2(3)
	};

	var $$C = _export;
	var IS_PURE$2 = isPure;
	var DESCRIPTORS$h = descriptors;
	var global$p = global$N;
	var path$1 = path$2;
	var uncurryThis$t = functionUncurryThis;
	var isForced$2 = isForced_1;
	var hasOwn$g = hasOwnProperty_1;
	var inheritIfRequired$3 = inheritIfRequired$5;
	var isPrototypeOf$6 = objectIsPrototypeOf;
	var isSymbol$3 = isSymbol$6;
	var toPrimitive$1 = toPrimitive$3;
	var fails$t = fails$V;
	var getOwnPropertyNames$3 = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$5 = objectDefineProperty.f;
	var thisNumberValue = thisNumberValue$2;
	var trim = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global$p[NUMBER];
	path$1[NUMBER];
	var NumberPrototype = NativeNumber.prototype;
	var TypeError$6 = global$p.TypeError;
	var stringSlice$5 = uncurryThis$t(''.slice);
	var charCodeAt$2 = uncurryThis$t(''.charCodeAt);

	// `ToNumeric` abstract operation
	// https://tc39.es/ecma262/#sec-tonumeric
	var toNumeric = function (value) {
	  var primValue = toPrimitive$1(value, 'number');
	  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
	};

	// `ToNumber` abstract operation
	// https://tc39.es/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive$1(argument, 'number');
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (isSymbol$3(it)) throw new TypeError$6('Cannot convert a Symbol value to a number');
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim(it);
	    first = charCodeAt$2(it, 0);
	    if (first === 43 || first === 45) {
	      third = charCodeAt$2(it, 2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (charCodeAt$2(it, 1)) {
	        // fast equal of /^0b[01]+$/i
	        case 66:
	        case 98:
	          radix = 2;
	          maxCode = 49;
	          break;
	        // fast equal of /^0o[0-7]+$/i
	        case 79:
	        case 111:
	          radix = 8;
	          maxCode = 55;
	          break;
	        default:
	          return +it;
	      }
	      digits = stringSlice$5(it, 2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = charCodeAt$2(digits, index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	var FORCED$6 = isForced$2(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'));

	var calledWithNew = function (dummy) {
	  // includes check on 1..constructor(foo) case
	  return isPrototypeOf$6(NumberPrototype, dummy) && fails$t(function () { thisNumberValue(dummy); });
	};

	// `Number` constructor
	// https://tc39.es/ecma262/#sec-number-constructor
	var NumberWrapper = function Number(value) {
	  var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
	  return calledWithNew(this) ? inheritIfRequired$3(Object(n), this, NumberWrapper) : n;
	};

	NumberWrapper.prototype = NumberPrototype;
	if (FORCED$6 && !IS_PURE$2) NumberPrototype.constructor = NumberWrapper;

	$$C({ global: true, constructor: true, wrap: true, forced: FORCED$6 }, {
	  Number: NumberWrapper
	});

	// Use `internal/copy-constructor-properties` helper in `core-js@4`
	var copyConstructorProperties$1 = function (target, source) {
	  for (var keys = DESCRIPTORS$h ? getOwnPropertyNames$3(source) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
	    // ESNext
	    'fromString,range'
	  ).split(','), j = 0, key; keys.length > j; j++) {
	    if (hasOwn$g(source, key = keys[j]) && !hasOwn$g(target, key)) {
	      defineProperty$5(target, key, getOwnPropertyDescriptor$2(source, key));
	    }
	  }
	};
	if (FORCED$6 || IS_PURE$2) copyConstructorProperties$1(path$1[NUMBER], NativeNumber);

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var $$B = _export;
	var call$h = functionCall;
	var isCallable$8 = isCallable$w;
	var anObject$c = anObject$u;
	var toString$d = toString$l;

	var DELEGATES_TO_EXEC = function () {
	  var execCalled = false;
	  var re = /[ac]/;
	  re.exec = function () {
	    execCalled = true;
	    return /./.exec.apply(this, arguments);
	  };
	  return re.test('abc') === true && execCalled;
	}();

	var nativeTest = /./.test;

	// `RegExp.prototype.test` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.test
	$$B({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
	  test: function (S) {
	    var R = anObject$c(this);
	    var string = toString$d(S);
	    var exec = R.exec;
	    if (!isCallable$8(exec)) return call$h(nativeTest, R, string);
	    var result = call$h(exec, R, string);
	    if (result === null) return false;
	    anObject$c(result);
	    return true;
	  }
	});

	var $$A = _export;
	var global$o = global$N;
	var defineBuiltInAccessor$c = defineBuiltInAccessor$f;
	var DESCRIPTORS$g = descriptors;

	var $TypeError$8 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$4 = Object.defineProperty;
	var INCORRECT_VALUE = global$o.self !== global$o;

	// `self` getter
	// https://html.spec.whatwg.org/multipage/window-object.html#dom-self
	try {
	  if (DESCRIPTORS$g) {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    var descriptor = Object.getOwnPropertyDescriptor(global$o, 'self');
	    // some engines have `self`, but with incorrect descriptor
	    // https://github.com/denoland/deno/issues/15765
	    if (INCORRECT_VALUE || !descriptor || !descriptor.get || !descriptor.enumerable) {
	      defineBuiltInAccessor$c(global$o, 'self', {
	        get: function self() {
	          return global$o;
	        },
	        set: function self(value) {
	          if (this !== global$o) throw new $TypeError$8('Illegal invocation');
	          defineProperty$4(global$o, 'self', {
	            value: value,
	            writable: true,
	            configurable: true,
	            enumerable: true
	          });
	        },
	        configurable: true,
	        enumerable: true
	      });
	    }
	  } else $$A({ global: true, simple: true, forced: INCORRECT_VALUE }, {
	    self: global$o
	  });
	} catch (error) { /* empty */ }

	var isObject$c = isObject$p;
	var classof$b = classofRaw$2;
	var wellKnownSymbol$e = wellKnownSymbol$x;

	var MATCH$2 = wellKnownSymbol$e('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$c(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$b(it) === 'RegExp');
	};

	var call$g = functionCall;
	var hasOwn$f = hasOwnProperty_1;
	var isPrototypeOf$5 = objectIsPrototypeOf;
	var regExpFlags = regexpFlags$1;

	var RegExpPrototype$4 = RegExp.prototype;

	var regexpGetFlags = function (R) {
	  var flags = R.flags;
	  return flags === undefined && !('flags' in RegExpPrototype$4) && !hasOwn$f(R, 'flags') && isPrototypeOf$5(RegExpPrototype$4, R)
	    ? call$g(regExpFlags, R) : flags;
	};

	var DESCRIPTORS$f = descriptors;
	var global$n = global$N;
	var uncurryThis$s = functionUncurryThis;
	var isForced$1 = isForced_1;
	var inheritIfRequired$2 = inheritIfRequired$5;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$f;
	var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
	var isPrototypeOf$4 = objectIsPrototypeOf;
	var isRegExp$2 = isRegexp;
	var toString$c = toString$l;
	var getRegExpFlags$1 = regexpGetFlags;
	var stickyHelpers$1 = regexpStickyHelpers;
	var proxyAccessor = proxyAccessor$2;
	var defineBuiltIn$b = defineBuiltIn$j;
	var fails$s = fails$V;
	var hasOwn$e = hasOwnProperty_1;
	var enforceInternalState$2 = internalState.enforce;
	var setSpecies$3 = setSpecies$5;
	var wellKnownSymbol$d = wellKnownSymbol$x;
	var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var MATCH$1 = wellKnownSymbol$d('match');
	var NativeRegExp = global$n.RegExp;
	var RegExpPrototype$3 = NativeRegExp.prototype;
	var SyntaxError$2 = global$n.SyntaxError;
	var exec$6 = uncurryThis$s(RegExpPrototype$3.exec);
	var charAt$4 = uncurryThis$s(''.charAt);
	var replace$6 = uncurryThis$s(''.replace);
	var stringIndexOf$1 = uncurryThis$s(''.indexOf);
	var stringSlice$4 = uncurryThis$s(''.slice);
	// TODO: Use only proper RegExpIdentifierName
	var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
	var re1 = /a/g;
	var re2 = /a/g;

	// "new" should create a new object, old webkit bug
	var CORRECT_NEW = new NativeRegExp(re1) !== re1;

	var MISSED_STICKY$1 = stickyHelpers$1.MISSED_STICKY;
	var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;

	var BASE_FORCED = DESCRIPTORS$f &&
	  (!CORRECT_NEW || MISSED_STICKY$1 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG || fails$s(function () {
	    re2[MATCH$1] = false;
	    // RegExp constructor can alter flags and IsRegExp works correct with @@match
	    return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
	  }));

	var handleDotAll = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var brackets = false;
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt$4(string, index);
	    if (chr === '\\') {
	      result += chr + charAt$4(string, ++index);
	      continue;
	    }
	    if (!brackets && chr === '.') {
	      result += '[\\s\\S]';
	    } else {
	      if (chr === '[') {
	        brackets = true;
	      } else if (chr === ']') {
	        brackets = false;
	      } result += chr;
	    }
	  } return result;
	};

	var handleNCG = function (string) {
	  var length = string.length;
	  var index = 0;
	  var result = '';
	  var named = [];
	  var names = {};
	  var brackets = false;
	  var ncg = false;
	  var groupid = 0;
	  var groupname = '';
	  var chr;
	  for (; index <= length; index++) {
	    chr = charAt$4(string, index);
	    if (chr === '\\') {
	      chr += charAt$4(string, ++index);
	    } else if (chr === ']') {
	      brackets = false;
	    } else if (!brackets) switch (true) {
	      case chr === '[':
	        brackets = true;
	        break;
	      case chr === '(':
	        if (exec$6(IS_NCG, stringSlice$4(string, index + 1))) {
	          index += 2;
	          ncg = true;
	        }
	        result += chr;
	        groupid++;
	        continue;
	      case chr === '>' && ncg:
	        if (groupname === '' || hasOwn$e(names, groupname)) {
	          throw new SyntaxError$2('Invalid capture group name');
	        }
	        names[groupname] = true;
	        named[named.length] = [groupname, groupid];
	        ncg = false;
	        groupname = '';
	        continue;
	    }
	    if (ncg) groupname += chr;
	    else result += chr;
	  } return [result, named];
	};

	// `RegExp` constructor
	// https://tc39.es/ecma262/#sec-regexp-constructor
	if (isForced$1('RegExp', BASE_FORCED)) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = isPrototypeOf$4(RegExpPrototype$3, this);
	    var patternIsRegExp = isRegExp$2(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var groups = [];
	    var rawPattern = pattern;
	    var rawFlags, dotAll, sticky, handled, result, state;

	    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
	      return pattern;
	    }

	    if (patternIsRegExp || isPrototypeOf$4(RegExpPrototype$3, pattern)) {
	      pattern = pattern.source;
	      if (flagsAreUndefined) flags = getRegExpFlags$1(rawPattern);
	    }

	    pattern = pattern === undefined ? '' : toString$c(pattern);
	    flags = flags === undefined ? '' : toString$c(flags);
	    rawPattern = pattern;

	    if (UNSUPPORTED_DOT_ALL$1 && 'dotAll' in re1) {
	      dotAll = !!flags && stringIndexOf$1(flags, 's') > -1;
	      if (dotAll) flags = replace$6(flags, /s/g, '');
	    }

	    rawFlags = flags;

	    if (MISSED_STICKY$1 && 'sticky' in re1) {
	      sticky = !!flags && stringIndexOf$1(flags, 'y') > -1;
	      if (sticky && UNSUPPORTED_Y$1) flags = replace$6(flags, /y/g, '');
	    }

	    if (UNSUPPORTED_NCG) {
	      handled = handleNCG(pattern);
	      pattern = handled[0];
	      groups = handled[1];
	    }

	    result = inheritIfRequired$2(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$3, RegExpWrapper);

	    if (dotAll || sticky || groups.length) {
	      state = enforceInternalState$2(result);
	      if (dotAll) {
	        state.dotAll = true;
	        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
	      }
	      if (sticky) state.sticky = true;
	      if (groups.length) state.groups = groups;
	    }

	    if (pattern !== rawPattern) try {
	      // fails in old engines, but we have no alternatives for unsupported regex syntax
	      createNonEnumerableProperty$5(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
	    } catch (error) { /* empty */ }

	    return result;
	  };

	  for (var keys$1 = getOwnPropertyNames$2(NativeRegExp), index = 0; keys$1.length > index;) {
	    proxyAccessor(RegExpWrapper, NativeRegExp, keys$1[index++]);
	  }

	  RegExpPrototype$3.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$3;
	  defineBuiltIn$b(global$n, 'RegExp', RegExpWrapper, { constructor: true });
	}

	// https://tc39.es/ecma262/#sec-get-regexp-@@species
	setSpecies$3('RegExp');

	var DESCRIPTORS$e = descriptors;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var classof$a = classofRaw$2;
	var defineBuiltInAccessor$b = defineBuiltInAccessor$f;
	var getInternalState$6 = internalState.get;

	var RegExpPrototype$2 = RegExp.prototype;
	var $TypeError$7 = TypeError;

	// `RegExp.prototype.dotAll` getter
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
	if (DESCRIPTORS$e && UNSUPPORTED_DOT_ALL) {
	  defineBuiltInAccessor$b(RegExpPrototype$2, 'dotAll', {
	    configurable: true,
	    get: function dotAll() {
	      if (this === RegExpPrototype$2) return undefined;
	      // We can't use InternalStateModule.getterFor because
	      // we don't add metadata for regexps created by a literal.
	      if (classof$a(this) === 'RegExp') {
	        return !!getInternalState$6(this).dotAll;
	      }
	      throw new $TypeError$7('Incompatible receiver, RegExp required');
	    }
	  });
	}

	var DESCRIPTORS$d = descriptors;
	var MISSED_STICKY = regexpStickyHelpers.MISSED_STICKY;
	var classof$9 = classofRaw$2;
	var defineBuiltInAccessor$a = defineBuiltInAccessor$f;
	var getInternalState$5 = internalState.get;

	var RegExpPrototype$1 = RegExp.prototype;
	var $TypeError$6 = TypeError;

	// `RegExp.prototype.sticky` getter
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
	if (DESCRIPTORS$d && MISSED_STICKY) {
	  defineBuiltInAccessor$a(RegExpPrototype$1, 'sticky', {
	    configurable: true,
	    get: function sticky() {
	      if (this === RegExpPrototype$1) return;
	      // We can't use InternalStateModule.getterFor because
	      // we don't add metadata for regexps created by a literal.
	      if (classof$9(this) === 'RegExp') {
	        return !!getInternalState$5(this).sticky;
	      }
	      throw new $TypeError$6('Incompatible receiver, RegExp required');
	    }
	  });
	}

	var PROPER_FUNCTION_NAME$3 = functionName.PROPER;
	var defineBuiltIn$a = defineBuiltIn$j;
	var anObject$b = anObject$u;
	var $toString$3 = toString$l;
	var fails$r = fails$V;
	var getRegExpFlags = regexpGetFlags;

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];

	var NOT_GENERIC = fails$r(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = PROPER_FUNCTION_NAME$3 && nativeToString.name !== TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  defineBuiltIn$a(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject$b(this);
	    var pattern = $toString$3(R.source);
	    var flags = $toString$3(getRegExpFlags(R));
	    return '/' + pattern + '/' + flags;
	  }, { unsafe: true });
	}

	var call$f = functionCall;
	var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
	var anObject$a = anObject$u;
	var isNullOrUndefined$4 = isNullOrUndefined$a;
	var toLength$5 = toLength$8;
	var toString$b = toString$l;
	var requireObjectCoercible$4 = requireObjectCoercible$b;
	var getMethod$2 = getMethod$8;
	var advanceStringIndex$1 = advanceStringIndex$3;
	var regExpExec$1 = regexpExecAbstract;

	// @@match logic
	fixRegExpWellKnownSymbolLogic$2('match', function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible$4(this);
	      var matcher = isNullOrUndefined$4(regexp) ? undefined : getMethod$2(regexp, MATCH);
	      return matcher ? call$f(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$b(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (string) {
	      var rx = anObject$a(this);
	      var S = toString$b(string);
	      var res = maybeCallNative(nativeMatch, rx, S);

	      if (res.done) return res.value;

	      if (!rx.global) return regExpExec$1(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec$1(rx, S)) !== null) {
	        var matchStr = toString$b(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$5(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var apply$5 = functionApply;
	var call$e = functionCall;
	var uncurryThis$r = functionUncurryThis;
	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var anObject$9 = anObject$u;
	var isNullOrUndefined$3 = isNullOrUndefined$a;
	var isRegExp$1 = isRegexp;
	var requireObjectCoercible$3 = requireObjectCoercible$b;
	var speciesConstructor$1 = speciesConstructor$3;
	var advanceStringIndex = advanceStringIndex$3;
	var toLength$4 = toLength$8;
	var toString$a = toString$l;
	var getMethod$1 = getMethod$8;
	var arraySlice$7 = arraySliceSimple;
	var callRegExpExec = regexpExecAbstract;
	var regexpExec = regexpExec$3;
	var stickyHelpers = regexpStickyHelpers;
	var fails$q = fails$V;

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
	var MAX_UINT32 = 0xFFFFFFFF;
	var min$3 = Math.min;
	var $push = [].push;
	var exec$5 = uncurryThis$r(/./.exec);
	var push$9 = uncurryThis$r($push);
	var stringSlice$3 = uncurryThis$r(''.slice);

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$q(function () {
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	// @@split logic
	fixRegExpWellKnownSymbolLogic$1('split', function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] === 'c' ||
	    // eslint-disable-next-line regexp/no-empty-group -- required for testing
	    'test'.split(/(?:)/, -1).length !== 4 ||
	    'ab'.split(/(?:ab)*/).length !== 2 ||
	    '.'.split(/(.?)(.?)/).length !== 4 ||
	    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = toString$a(requireObjectCoercible$3(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp$1(separator)) {
	        return call$e(nativeSplit, string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = call$e(regexpExec, separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          push$9(output, stringSlice$3(string, lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) apply$5($push, output, arraySlice$7(match, 1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !exec$5(separatorCopy, '')) push$9(output, '');
	      } else push$9(output, stringSlice$3(string, lastLastIndex));
	      return output.length > lim ? arraySlice$7(output, 0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : call$e(nativeSplit, this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.es/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible$3(this);
	      var splitter = isNullOrUndefined$3(separator) ? undefined : getMethod$1(separator, SPLIT);
	      return splitter
	        ? call$e(splitter, separator, O, limit)
	        : call$e(internalSplit, toString$a(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (string, limit) {
	      var rx = anObject$9(this);
	      var S = toString$a(string);
	      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

	      if (res.done) return res.value;

	      var C = speciesConstructor$1(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (UNSUPPORTED_Y ? 'g' : 'y');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
	        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice$3(S, q) : S);
	        var e;
	        if (
	          z === null ||
	          (e = min$3(toLength$4(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          push$9(A, stringSlice$3(S, p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            push$9(A, z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      push$9(A, stringSlice$3(S, p));
	      return A;
	    }
	  ];
	}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

	var toObject$8 = toObject$i;
	var toAbsoluteIndex$2 = toAbsoluteIndex$7;
	var lengthOfArrayLike$d = lengthOfArrayLike$m;

	// `Array.prototype.fill` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.fill
	var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject$8(this);
	  var length = lengthOfArrayLike$d(O);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex$2(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex$2(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	var wellKnownSymbol$c = wellKnownSymbol$x;
	var create$5 = objectCreate;
	var defineProperty$3 = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol$c('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] === undefined) {
	  defineProperty$3(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: create$5(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables$3 = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $$z = _export;
	var fill$1 = arrayFill$1;
	var addToUnscopables$2 = addToUnscopables$3;

	// `Array.prototype.fill` method
	// https://tc39.es/ecma262/#sec-array.prototype.fill
	$$z({ target: 'Array', proto: true }, {
	  fill: fill$1
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$2('fill');

	var $$y = _export;
	var fails$p = fails$V;
	var isArray$2 = isArray$6;
	var isObject$b = isObject$p;
	var toObject$7 = toObject$i;
	var lengthOfArrayLike$c = lengthOfArrayLike$m;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$3;
	var createProperty$2 = createProperty$6;
	var arraySpeciesCreate = arraySpeciesCreate$3;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;
	var wellKnownSymbol$b = wellKnownSymbol$x;
	var V8_VERSION = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$b('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$p(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var isConcatSpreadable = function (O) {
	  if (!isObject$b(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$2(O);
	};

	var FORCED$5 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$1('concat');

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$y({ target: 'Array', proto: true, arity: 1, forced: FORCED$5 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$7(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$c(E);
	        doesNotExceedSafeInteger(n + len);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$2(A, n, E[k]);
	      } else {
	        doesNotExceedSafeInteger(n + 1);
	        createProperty$2(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var $$x = _export;
	var iterate$4 = iterate$9;
	var aCallable$6 = aCallable$j;
	var anObject$8 = anObject$u;
	var getIteratorDirect$3 = getIteratorDirect$7;

	// `Iterator.prototype.some` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$x({ target: 'Iterator', proto: true, real: true }, {
	  some: function some(predicate) {
	    anObject$8(this);
	    aCallable$6(predicate);
	    var record = getIteratorDirect$3(this);
	    var counter = 0;
	    return iterate$4(record, function (value, stop) {
	      if (predicate(value, counter++)) return stop();
	    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
	  }
	});

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create$4 = objectCreate;
	var createPropertyDescriptor$3 = createPropertyDescriptor$8;
	var setToStringTag$7 = setToStringTag$9;
	var Iterators$2 = iterators;

	var returnThis$1 = function () { return this; };

	var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$4(IteratorPrototype$1, { next: createPropertyDescriptor$3(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$7(IteratorConstructor, TO_STRING_TAG, false);
	  Iterators$2[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var $$w = _export;
	var call$d = functionCall;
	var FunctionName$1 = functionName;
	var isCallable$7 = isCallable$w;
	var createIteratorConstructor$1 = iteratorCreateConstructor;
	var getPrototypeOf$2 = objectGetPrototypeOf$1;
	var setPrototypeOf$3 = objectSetPrototypeOf;
	var setToStringTag$6 = setToStringTag$9;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$f;
	var defineBuiltIn$9 = defineBuiltIn$j;
	var wellKnownSymbol$a = wellKnownSymbol$x;
	var Iterators$1 = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME$2 = FunctionName$1.PROPER;
	var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol$a('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor$1(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    }

	    return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf$3) {
	          setPrototypeOf$3(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (!isCallable$7(CurrentIteratorPrototype[ITERATOR$4])) {
	          defineBuiltIn$9(CurrentIteratorPrototype, ITERATOR$4, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag$6(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME$2 && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (CONFIGURABLE_FUNCTION_NAME$1) {
	      createNonEnumerableProperty$4(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call$d(nativeIterator, this); };
	    }
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        defineBuiltIn$9(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$w({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    defineBuiltIn$9(IterablePrototype, ITERATOR$4, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$1[NAME] = defaultIterator;

	  return methods;
	};

	var toIndexedObject$4 = toIndexedObject$c;
	var addToUnscopables$1 = addToUnscopables$3;
	var Iterators = iterators;
	var InternalStateModule$8 = internalState;
	var defineProperty$2 = objectDefineProperty.f;
	var defineIterator$2 = iteratorDefine;
	var createIterResultObject$3 = createIterResultObject$5;
	var DESCRIPTORS$c = descriptors;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$7 = InternalStateModule$8.set;
	var getInternalState$4 = InternalStateModule$8.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator$2(Array, 'Array', function (iterated, kind) {
	  setInternalState$7(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$4(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$4(this);
	  var target = state.target;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return createIterResultObject$3(undefined, true);
	  }
	  switch (state.kind) {
	    case 'keys': return createIterResultObject$3(index, false);
	    case 'values': return createIterResultObject$3(target[index], false);
	  } return createIterResultObject$3([index, target[index]], false);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	var values = Iterators.Arguments = Iterators.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables$1('keys');
	addToUnscopables$1('values');
	addToUnscopables$1('entries');

	// V8 ~ Chrome 45- bug
	if (DESCRIPTORS$c && values.name !== 'values') try {
	  defineProperty$2(values, 'name', { value: 'values' });
	} catch (error) { /* empty */ }

	var typedArrayConstructor = {exports: {}};

	// eslint-disable-next-line es/no-typed-arrays -- safe
	var arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

	var NATIVE_ARRAY_BUFFER$1 = arrayBufferBasicDetection;
	var DESCRIPTORS$b = descriptors;
	var global$m = global$N;
	var isCallable$6 = isCallable$w;
	var isObject$a = isObject$p;
	var hasOwn$d = hasOwnProperty_1;
	var classof$8 = classof$k;
	var tryToString$1 = tryToString$7;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$f;
	var defineBuiltIn$8 = defineBuiltIn$j;
	var defineBuiltInAccessor$9 = defineBuiltInAccessor$f;
	var isPrototypeOf$3 = objectIsPrototypeOf;
	var getPrototypeOf$1 = objectGetPrototypeOf$1;
	var setPrototypeOf$2 = objectSetPrototypeOf;
	var wellKnownSymbol$9 = wellKnownSymbol$x;
	var uid$2 = uid$5;
	var InternalStateModule$7 = internalState;

	var enforceInternalState$1 = InternalStateModule$7.enforce;
	var getInternalState$3 = InternalStateModule$7.get;
	var Int8Array$4 = global$m.Int8Array;
	var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
	var Uint8ClampedArray$1 = global$m.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
	var TypedArray$1 = Int8Array$4 && getPrototypeOf$1(Int8Array$4);
	var TypedArrayPrototype$2 = Int8ArrayPrototype$1 && getPrototypeOf$1(Int8ArrayPrototype$1);
	var ObjectPrototype$3 = Object.prototype;
	var TypeError$5 = global$m.TypeError;

	var TO_STRING_TAG$1 = wellKnownSymbol$9('toStringTag');
	var TYPED_ARRAY_TAG$1 = uid$2('TYPED_ARRAY_TAG');
	var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
	// Fixing native typed arrays in Opera Presto crashes the browser, see #595
	var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER$1 && !!setPrototypeOf$2 && classof$8(global$m.opera) !== 'Opera';
	var TYPED_ARRAY_TAG_REQUIRED = false;
	var NAME, Constructor, Prototype;

	var TypedArrayConstructorsList = {
	  Int8Array: 1,
	  Uint8Array: 1,
	  Uint8ClampedArray: 1,
	  Int16Array: 2,
	  Uint16Array: 2,
	  Int32Array: 4,
	  Uint32Array: 4,
	  Float32Array: 4,
	  Float64Array: 8
	};

	var BigIntArrayConstructorsList = {
	  BigInt64Array: 8,
	  BigUint64Array: 8
	};

	var isView = function isView(it) {
	  if (!isObject$a(it)) return false;
	  var klass = classof$8(it);
	  return klass === 'DataView'
	    || hasOwn$d(TypedArrayConstructorsList, klass)
	    || hasOwn$d(BigIntArrayConstructorsList, klass);
	};

	var getTypedArrayConstructor$4 = function (it) {
	  var proto = getPrototypeOf$1(it);
	  if (!isObject$a(proto)) return;
	  var state = getInternalState$3(proto);
	  return (state && hasOwn$d(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor$4(proto);
	};

	var isTypedArray$1 = function (it) {
	  if (!isObject$a(it)) return false;
	  var klass = classof$8(it);
	  return hasOwn$d(TypedArrayConstructorsList, klass)
	    || hasOwn$d(BigIntArrayConstructorsList, klass);
	};

	var aTypedArray$s = function (it) {
	  if (isTypedArray$1(it)) return it;
	  throw new TypeError$5('Target is not a typed array');
	};

	var aTypedArrayConstructor$3 = function (C) {
	  if (isCallable$6(C) && (!setPrototypeOf$2 || isPrototypeOf$3(TypedArray$1, C))) return C;
	  throw new TypeError$5(tryToString$1(C) + ' is not a typed array constructor');
	};

	var exportTypedArrayMethod$t = function (KEY, property, forced, options) {
	  if (!DESCRIPTORS$b) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = global$m[ARRAY];
	    if (TypedArrayConstructor && hasOwn$d(TypedArrayConstructor.prototype, KEY)) try {
	      delete TypedArrayConstructor.prototype[KEY];
	    } catch (error) {
	      // old WebKit bug - some methods are non-configurable
	      try {
	        TypedArrayConstructor.prototype[KEY] = property;
	      } catch (error2) { /* empty */ }
	    }
	  }
	  if (!TypedArrayPrototype$2[KEY] || forced) {
	    defineBuiltIn$8(TypedArrayPrototype$2, KEY, forced ? property
	      : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype$1[KEY] || property, options);
	  }
	};

	var exportTypedArrayStaticMethod = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!DESCRIPTORS$b) return;
	  if (setPrototypeOf$2) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = global$m[ARRAY];
	      if (TypedArrayConstructor && hasOwn$d(TypedArrayConstructor, KEY)) try {
	        delete TypedArrayConstructor[KEY];
	      } catch (error) { /* empty */ }
	    }
	    if (!TypedArray$1[KEY] || forced) {
	      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
	      try {
	        return defineBuiltIn$8(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
	      } catch (error) { /* empty */ }
	    } else return;
	  }
	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = global$m[ARRAY];
	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      defineBuiltIn$8(TypedArrayConstructor, KEY, property);
	    }
	  }
	};

	for (NAME in TypedArrayConstructorsList) {
	  Constructor = global$m[NAME];
	  Prototype = Constructor && Constructor.prototype;
	  if (Prototype) enforceInternalState$1(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
	  else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
	}

	for (NAME in BigIntArrayConstructorsList) {
	  Constructor = global$m[NAME];
	  Prototype = Constructor && Constructor.prototype;
	  if (Prototype) enforceInternalState$1(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
	}

	// WebKit bug - typed arrays constructors prototype is Object.prototype
	if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !isCallable$6(TypedArray$1) || TypedArray$1 === Function.prototype) {
	  // eslint-disable-next-line no-shadow -- safe
	  TypedArray$1 = function TypedArray() {
	    throw new TypeError$5('Incorrect invocation');
	  };
	  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
	    if (global$m[NAME]) setPrototypeOf$2(global$m[NAME], TypedArray$1);
	  }
	}

	if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$2 || TypedArrayPrototype$2 === ObjectPrototype$3) {
	  TypedArrayPrototype$2 = TypedArray$1.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
	    if (global$m[NAME]) setPrototypeOf$2(global$m[NAME].prototype, TypedArrayPrototype$2);
	  }
	}

	// WebKit bug - one more object in Uint8ClampedArray prototype chain
	if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf$1(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$2) {
	  setPrototypeOf$2(Uint8ClampedArrayPrototype, TypedArrayPrototype$2);
	}

	if (DESCRIPTORS$b && !hasOwn$d(TypedArrayPrototype$2, TO_STRING_TAG$1)) {
	  TYPED_ARRAY_TAG_REQUIRED = true;
	  defineBuiltInAccessor$9(TypedArrayPrototype$2, TO_STRING_TAG$1, {
	    configurable: true,
	    get: function () {
	      return isObject$a(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
	    }
	  });
	  for (NAME in TypedArrayConstructorsList) if (global$m[NAME]) {
	    createNonEnumerableProperty$3(global$m[NAME], TYPED_ARRAY_TAG$1, NAME);
	  }
	}

	var arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
	  aTypedArray: aTypedArray$s,
	  aTypedArrayConstructor: aTypedArrayConstructor$3,
	  exportTypedArrayMethod: exportTypedArrayMethod$t,
	  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
	  getTypedArrayConstructor: getTypedArrayConstructor$4,
	  isView: isView,
	  isTypedArray: isTypedArray$1,
	  TypedArray: TypedArray$1,
	  TypedArrayPrototype: TypedArrayPrototype$2
	};

	/* eslint-disable no-new -- required for testing */
	var global$l = global$N;
	var fails$o = fails$V;
	var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$4;
	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

	var ArrayBuffer$4 = global$l.ArrayBuffer;
	var Int8Array$3 = global$l.Int8Array;

	var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$o(function () {
	  Int8Array$3(1);
	}) || !fails$o(function () {
	  new Int8Array$3(-1);
	}) || !checkCorrectnessOfIteration$2(function (iterable) {
	  new Int8Array$3();
	  new Int8Array$3(null);
	  new Int8Array$3(1.5);
	  new Int8Array$3(iterable);
	}, true) || fails$o(function () {
	  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
	  return new Int8Array$3(new ArrayBuffer$4(2), 1, undefined).length !== 1;
	});

	var toIntegerOrInfinity$6 = toIntegerOrInfinity$e;
	var toLength$3 = toLength$8;

	var $RangeError$4 = RangeError;

	// `ToIndex` abstract operation
	// https://tc39.es/ecma262/#sec-toindex
	var toIndex$3 = function (it) {
	  if (it === undefined) return 0;
	  var number = toIntegerOrInfinity$6(it);
	  var length = toLength$3(number);
	  if (number !== length) throw new $RangeError$4('Wrong length or index');
	  return length;
	};

	// `Math.sign` method implementation
	// https://tc39.es/ecma262/#sec-math.sign
	// eslint-disable-next-line es/no-math-sign -- safe
	var mathSign = Math.sign || function sign(x) {
	  var n = +x;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return n === 0 || n !== n ? n : n < 0 ? -1 : 1;
	};

	var sign = mathSign;

	var abs$1 = Math.abs;

	var EPSILON = 2.220446049250313e-16; // Number.EPSILON
	var INVERSE_EPSILON = 1 / EPSILON;

	var roundTiesToEven = function (n) {
	  return n + INVERSE_EPSILON - INVERSE_EPSILON;
	};

	var mathFloatRound = function (x, FLOAT_EPSILON, FLOAT_MAX_VALUE, FLOAT_MIN_VALUE) {
	  var n = +x;
	  var absolute = abs$1(n);
	  var s = sign(n);
	  if (absolute < FLOAT_MIN_VALUE) return s * roundTiesToEven(absolute / FLOAT_MIN_VALUE / FLOAT_EPSILON) * FLOAT_MIN_VALUE * FLOAT_EPSILON;
	  var a = (1 + FLOAT_EPSILON / EPSILON) * absolute;
	  var result = a - (a - absolute);
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (result > FLOAT_MAX_VALUE || result !== result) return s * Infinity;
	  return s * result;
	};

	var floatRound = mathFloatRound;

	var FLOAT32_EPSILON = 1.1920928955078125e-7; // 2 ** -23;
	var FLOAT32_MAX_VALUE = 3.4028234663852886e+38; // 2 ** 128 - 2 ** 104
	var FLOAT32_MIN_VALUE = 1.1754943508222875e-38; // 2 ** -126;

	// `Math.fround` method implementation
	// https://tc39.es/ecma262/#sec-math.fround
	// eslint-disable-next-line es/no-math-fround -- safe
	var mathFround = Math.fround || function fround(x) {
	  return floatRound(x, FLOAT32_EPSILON, FLOAT32_MAX_VALUE, FLOAT32_MIN_VALUE);
	};

	// IEEE754 conversions based on https://github.com/feross/ieee754
	var $Array$1 = Array;
	var abs = Math.abs;
	var pow$1 = Math.pow;
	var floor$4 = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;

	var pack = function (number, mantissaLength, bytes) {
	  var buffer = $Array$1(bytes);
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var rt = mantissaLength === 23 ? pow$1(2, -24) - pow$1(2, -77) : 0;
	  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
	  var index = 0;
	  var exponent, mantissa, c;
	  number = abs(number);
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (number !== number || number === Infinity) {
	    // eslint-disable-next-line no-self-compare -- NaN check
	    mantissa = number !== number ? 1 : 0;
	    exponent = eMax;
	  } else {
	    exponent = floor$4(log(number) / LN2);
	    c = pow$1(2, -exponent);
	    if (number * c < 1) {
	      exponent--;
	      c *= 2;
	    }
	    if (exponent + eBias >= 1) {
	      number += rt / c;
	    } else {
	      number += rt * pow$1(2, 1 - eBias);
	    }
	    if (number * c >= 2) {
	      exponent++;
	      c /= 2;
	    }
	    if (exponent + eBias >= eMax) {
	      mantissa = 0;
	      exponent = eMax;
	    } else if (exponent + eBias >= 1) {
	      mantissa = (number * c - 1) * pow$1(2, mantissaLength);
	      exponent += eBias;
	    } else {
	      mantissa = number * pow$1(2, eBias - 1) * pow$1(2, mantissaLength);
	      exponent = 0;
	    }
	  }
	  while (mantissaLength >= 8) {
	    buffer[index++] = mantissa & 255;
	    mantissa /= 256;
	    mantissaLength -= 8;
	  }
	  exponent = exponent << mantissaLength | mantissa;
	  exponentLength += mantissaLength;
	  while (exponentLength > 0) {
	    buffer[index++] = exponent & 255;
	    exponent /= 256;
	    exponentLength -= 8;
	  }
	  buffer[--index] |= sign * 128;
	  return buffer;
	};

	var unpack = function (buffer, mantissaLength) {
	  var bytes = buffer.length;
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var nBits = exponentLength - 7;
	  var index = bytes - 1;
	  var sign = buffer[index--];
	  var exponent = sign & 127;
	  var mantissa;
	  sign >>= 7;
	  while (nBits > 0) {
	    exponent = exponent * 256 + buffer[index--];
	    nBits -= 8;
	  }
	  mantissa = exponent & (1 << -nBits) - 1;
	  exponent >>= -nBits;
	  nBits += mantissaLength;
	  while (nBits > 0) {
	    mantissa = mantissa * 256 + buffer[index--];
	    nBits -= 8;
	  }
	  if (exponent === 0) {
	    exponent = 1 - eBias;
	  } else if (exponent === eMax) {
	    return mantissa ? NaN : sign ? -Infinity : Infinity;
	  } else {
	    mantissa += pow$1(2, mantissaLength);
	    exponent -= eBias;
	  } return (sign ? -1 : 1) * mantissa * pow$1(2, exponent - mantissaLength);
	};

	var ieee754 = {
	  pack: pack,
	  unpack: unpack
	};

	var global$k = global$N;
	var uncurryThis$q = functionUncurryThis;
	var DESCRIPTORS$a = descriptors;
	var NATIVE_ARRAY_BUFFER = arrayBufferBasicDetection;
	var FunctionName = functionName;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$f;
	var defineBuiltInAccessor$8 = defineBuiltInAccessor$f;
	var defineBuiltIns$2 = defineBuiltIns$4;
	var fails$n = fails$V;
	var anInstance$5 = anInstance$8;
	var toIntegerOrInfinity$5 = toIntegerOrInfinity$e;
	var toLength$2 = toLength$8;
	var toIndex$2 = toIndex$3;
	var fround = mathFround;
	var IEEE754 = ieee754;
	var getPrototypeOf = objectGetPrototypeOf$1;
	var setPrototypeOf$1 = objectSetPrototypeOf;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var arrayFill = arrayFill$1;
	var arraySlice$6 = arraySliceSimple;
	var setToStringTag$5 = setToStringTag$9;
	var InternalStateModule$6 = internalState;

	var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var ARRAY_BUFFER$1 = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE$1 = 'prototype';
	var WRONG_LENGTH$1 = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var getInternalArrayBufferState = InternalStateModule$6.getterFor(ARRAY_BUFFER$1);
	var getInternalDataViewState = InternalStateModule$6.getterFor(DATA_VIEW);
	var setInternalState$6 = InternalStateModule$6.set;
	var NativeArrayBuffer$1 = global$k[ARRAY_BUFFER$1];
	var $ArrayBuffer$1 = NativeArrayBuffer$1;
	var ArrayBufferPrototype$3 = $ArrayBuffer$1 && $ArrayBuffer$1[PROTOTYPE$1];
	var $DataView = global$k[DATA_VIEW];
	var DataViewPrototype$1 = $DataView && $DataView[PROTOTYPE$1];
	var ObjectPrototype$2 = Object.prototype;
	var Array$1 = global$k.Array;
	var RangeError$4 = global$k.RangeError;
	var fill = uncurryThis$q(arrayFill);
	var reverse = uncurryThis$q([].reverse);

	var packIEEE754 = IEEE754.pack;
	var unpackIEEE754 = IEEE754.unpack;

	var packInt8 = function (number) {
	  return [number & 0xFF];
	};

	var packInt16 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF];
	};

	var packInt32 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
	};

	var unpackInt32 = function (buffer) {
	  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
	};

	var packFloat32 = function (number) {
	  return packIEEE754(fround(number), 23, 4);
	};

	var packFloat64 = function (number) {
	  return packIEEE754(number, 52, 8);
	};

	var addGetter$1 = function (Constructor, key, getInternalState) {
	  defineBuiltInAccessor$8(Constructor[PROTOTYPE$1], key, {
	    configurable: true,
	    get: function () {
	      return getInternalState(this)[key];
	    }
	  });
	};

	var get = function (view, count, index, isLittleEndian) {
	  var store = getInternalDataViewState(view);
	  var intIndex = toIndex$2(index);
	  var boolIsLittleEndian = !!isLittleEndian;
	  if (intIndex + count > store.byteLength) throw new RangeError$4(WRONG_INDEX);
	  var bytes = store.bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = arraySlice$6(bytes, start, start + count);
	  return boolIsLittleEndian ? pack : reverse(pack);
	};

	var set = function (view, count, index, conversion, value, isLittleEndian) {
	  var store = getInternalDataViewState(view);
	  var intIndex = toIndex$2(index);
	  var pack = conversion(+value);
	  var boolIsLittleEndian = !!isLittleEndian;
	  if (intIndex + count > store.byteLength) throw new RangeError$4(WRONG_INDEX);
	  var bytes = store.bytes;
	  var start = intIndex + store.byteOffset;
	  for (var i = 0; i < count; i++) bytes[start + i] = pack[boolIsLittleEndian ? i : count - i - 1];
	};

	if (!NATIVE_ARRAY_BUFFER) {
	  $ArrayBuffer$1 = function ArrayBuffer(length) {
	    anInstance$5(this, ArrayBufferPrototype$3);
	    var byteLength = toIndex$2(length);
	    setInternalState$6(this, {
	      type: ARRAY_BUFFER$1,
	      bytes: fill(Array$1(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!DESCRIPTORS$a) {
	      this.byteLength = byteLength;
	      this.detached = false;
	    }
	  };

	  ArrayBufferPrototype$3 = $ArrayBuffer$1[PROTOTYPE$1];

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance$5(this, DataViewPrototype$1);
	    anInstance$5(buffer, ArrayBufferPrototype$3);
	    var bufferState = getInternalArrayBufferState(buffer);
	    var bufferLength = bufferState.byteLength;
	    var offset = toIntegerOrInfinity$5(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw new RangeError$4('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength$2(byteLength);
	    if (offset + byteLength > bufferLength) throw new RangeError$4(WRONG_LENGTH$1);
	    setInternalState$6(this, {
	      type: DATA_VIEW,
	      buffer: buffer,
	      byteLength: byteLength,
	      byteOffset: offset,
	      bytes: bufferState.bytes
	    });
	    if (!DESCRIPTORS$a) {
	      this.buffer = buffer;
	      this.byteLength = byteLength;
	      this.byteOffset = offset;
	    }
	  };

	  DataViewPrototype$1 = $DataView[PROTOTYPE$1];

	  if (DESCRIPTORS$a) {
	    addGetter$1($ArrayBuffer$1, 'byteLength', getInternalArrayBufferState);
	    addGetter$1($DataView, 'buffer', getInternalDataViewState);
	    addGetter$1($DataView, 'byteLength', getInternalDataViewState);
	    addGetter$1($DataView, 'byteOffset', getInternalDataViewState);
	  }

	  defineBuiltIns$2(DataViewPrototype$1, {
	    getInt8: function getInt8(byteOffset) {
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false)) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false), 23);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : false), 52);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set(this, 1, byteOffset, packInt8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set(this, 1, byteOffset, packInt8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : false);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : false);
	    }
	  });
	} else {
	  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$1 && NativeArrayBuffer$1.name !== ARRAY_BUFFER$1;
	  /* eslint-disable no-new -- required for testing */
	  if (!fails$n(function () {
	    NativeArrayBuffer$1(1);
	  }) || !fails$n(function () {
	    new NativeArrayBuffer$1(-1);
	  }) || fails$n(function () {
	    new NativeArrayBuffer$1();
	    new NativeArrayBuffer$1(1.5);
	    new NativeArrayBuffer$1(NaN);
	    return NativeArrayBuffer$1.length !== 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
	  })) {
	    /* eslint-enable no-new -- required for testing */
	    $ArrayBuffer$1 = function ArrayBuffer(length) {
	      anInstance$5(this, ArrayBufferPrototype$3);
	      return new NativeArrayBuffer$1(toIndex$2(length));
	    };

	    $ArrayBuffer$1[PROTOTYPE$1] = ArrayBufferPrototype$3;

	    for (var keys = getOwnPropertyNames$1(NativeArrayBuffer$1), j = 0, key; keys.length > j;) {
	      if (!((key = keys[j++]) in $ArrayBuffer$1)) {
	        createNonEnumerableProperty$2($ArrayBuffer$1, key, NativeArrayBuffer$1[key]);
	      }
	    }

	    ArrayBufferPrototype$3.constructor = $ArrayBuffer$1;
	  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
	    createNonEnumerableProperty$2(NativeArrayBuffer$1, 'name', ARRAY_BUFFER$1);
	  }

	  // WebKit bug - the same parent prototype for typed arrays and data view
	  if (setPrototypeOf$1 && getPrototypeOf(DataViewPrototype$1) !== ObjectPrototype$2) {
	    setPrototypeOf$1(DataViewPrototype$1, ObjectPrototype$2);
	  }

	  // iOS Safari 7.x bug
	  var testView = new $DataView(new $ArrayBuffer$1(2));
	  var $setInt8 = uncurryThis$q(DataViewPrototype$1.setInt8);
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns$2(DataViewPrototype$1, {
	    setInt8: function setInt8(byteOffset, value) {
	      $setInt8(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      $setInt8(this, byteOffset, value << 24 >> 24);
	    }
	  }, { unsafe: true });
	}

	setToStringTag$5($ArrayBuffer$1, ARRAY_BUFFER$1);
	setToStringTag$5($DataView, DATA_VIEW);

	var arrayBuffer = {
	  ArrayBuffer: $ArrayBuffer$1,
	  DataView: $DataView
	};

	var isObject$9 = isObject$p;

	var floor$3 = Math.floor;

	// `IsIntegralNumber` abstract operation
	// https://tc39.es/ecma262/#sec-isintegralnumber
	// eslint-disable-next-line es/no-number-isinteger -- safe
	var isIntegralNumber$2 = Number.isInteger || function isInteger(it) {
	  return !isObject$9(it) && isFinite(it) && floor$3(it) === it;
	};

	var toIntegerOrInfinity$4 = toIntegerOrInfinity$e;

	var $RangeError$3 = RangeError;

	var toPositiveInteger$1 = function (it) {
	  var result = toIntegerOrInfinity$4(it);
	  if (result < 0) throw new $RangeError$3("The argument can't be less than 0");
	  return result;
	};

	var toPositiveInteger = toPositiveInteger$1;

	var $RangeError$2 = RangeError;

	var toOffset$2 = function (it, BYTES) {
	  var offset = toPositiveInteger(it);
	  if (offset % BYTES) throw new $RangeError$2('Wrong offset');
	  return offset;
	};

	var round = Math.round;

	var toUint8Clamped$1 = function (it) {
	  var value = round(it);
	  return value < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
	};

	var classof$7 = classof$k;

	var isBigIntArray$2 = function (it) {
	  var klass = classof$7(it);
	  return klass === 'BigInt64Array' || klass === 'BigUint64Array';
	};

	var toPrimitive = toPrimitive$3;

	var $TypeError$5 = TypeError;

	// `ToBigInt` abstract operation
	// https://tc39.es/ecma262/#sec-tobigint
	var toBigInt$3 = function (argument) {
	  var prim = toPrimitive(argument, 'number');
	  if (typeof prim == 'number') throw new $TypeError$5("Can't convert number to bigint");
	  // eslint-disable-next-line es/no-bigint -- safe
	  return BigInt(prim);
	};

	var bind$6 = functionBindContext;
	var call$c = functionCall;
	var aConstructor$1 = aConstructor$3;
	var toObject$6 = toObject$i;
	var lengthOfArrayLike$b = lengthOfArrayLike$m;
	var getIterator$2 = getIterator$4;
	var getIteratorMethod$2 = getIteratorMethod$5;
	var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
	var isBigIntArray$1 = isBigIntArray$2;
	var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
	var toBigInt$2 = toBigInt$3;

	var typedArrayFrom$1 = function from(source /* , mapfn, thisArg */) {
	  var C = aConstructor$1(this);
	  var O = toObject$6(source);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod$2(O);
	  var i, length, result, thisIsBigIntArray, value, step, iterator, next;
	  if (iteratorMethod && !isArrayIteratorMethod$1(iteratorMethod)) {
	    iterator = getIterator$2(O, iteratorMethod);
	    next = iterator.next;
	    O = [];
	    while (!(step = call$c(next, iterator)).done) {
	      O.push(step.value);
	    }
	  }
	  if (mapping && argumentsLength > 2) {
	    mapfn = bind$6(mapfn, arguments[2]);
	  }
	  length = lengthOfArrayLike$b(O);
	  result = new (aTypedArrayConstructor$2(C))(length);
	  thisIsBigIntArray = isBigIntArray$1(result);
	  for (i = 0; length > i; i++) {
	    value = mapping ? mapfn(O[i], i) : O[i];
	    // FF30- typed arrays doesn't properly convert objects to typed array values
	    result[i] = thisIsBigIntArray ? toBigInt$2(value) : +value;
	  }
	  return result;
	};

	var $$v = _export;
	var global$j = global$N;
	var call$b = functionCall;
	var DESCRIPTORS$9 = descriptors;
	var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
	var ArrayBufferViewCore$t = arrayBufferViewCore;
	var ArrayBufferModule = arrayBuffer;
	var anInstance$4 = anInstance$8;
	var createPropertyDescriptor$2 = createPropertyDescriptor$8;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$f;
	var isIntegralNumber$1 = isIntegralNumber$2;
	var toLength$1 = toLength$8;
	var toIndex$1 = toIndex$3;
	var toOffset$1 = toOffset$2;
	var toUint8Clamped = toUint8Clamped$1;
	var toPropertyKey$1 = toPropertyKey$5;
	var hasOwn$c = hasOwnProperty_1;
	var classof$6 = classof$k;
	var isObject$8 = isObject$p;
	var isSymbol$2 = isSymbol$6;
	var create$3 = objectCreate;
	var isPrototypeOf$2 = objectIsPrototypeOf;
	var setPrototypeOf = objectSetPrototypeOf;
	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var typedArrayFrom = typedArrayFrom$1;
	var forEach$2 = arrayIteration.forEach;
	var setSpecies$2 = setSpecies$5;
	var defineBuiltInAccessor$7 = defineBuiltInAccessor$f;
	var definePropertyModule$1 = objectDefineProperty;
	var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
	var InternalStateModule$5 = internalState;
	var inheritIfRequired$1 = inheritIfRequired$5;

	var getInternalState$2 = InternalStateModule$5.get;
	var setInternalState$5 = InternalStateModule$5.set;
	var enforceInternalState = InternalStateModule$5.enforce;
	var nativeDefineProperty$1 = definePropertyModule$1.f;
	var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
	var RangeError$3 = global$j.RangeError;
	var ArrayBuffer$3 = ArrayBufferModule.ArrayBuffer;
	var ArrayBufferPrototype$2 = ArrayBuffer$3.prototype;
	var DataView$2 = ArrayBufferModule.DataView;
	var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$t.NATIVE_ARRAY_BUFFER_VIEWS;
	var TYPED_ARRAY_TAG = ArrayBufferViewCore$t.TYPED_ARRAY_TAG;
	var TypedArray = ArrayBufferViewCore$t.TypedArray;
	var TypedArrayPrototype$1 = ArrayBufferViewCore$t.TypedArrayPrototype;
	var aTypedArrayConstructor$1 = ArrayBufferViewCore$t.aTypedArrayConstructor;
	var isTypedArray = ArrayBufferViewCore$t.isTypedArray;
	var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	var WRONG_LENGTH = 'Wrong length';

	var fromList = function (C, list) {
	  aTypedArrayConstructor$1(C);
	  var index = 0;
	  var length = list.length;
	  var result = new C(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	};

	var addGetter = function (it, key) {
	  defineBuiltInAccessor$7(it, key, {
	    configurable: true,
	    get: function () {
	      return getInternalState$2(this)[key];
	    }
	  });
	};

	var isArrayBuffer = function (it) {
	  var klass;
	  return isPrototypeOf$2(ArrayBufferPrototype$2, it) || (klass = classof$6(it)) === 'ArrayBuffer' || klass === 'SharedArrayBuffer';
	};

	var isTypedArrayIndex = function (target, key) {
	  return isTypedArray(target)
	    && !isSymbol$2(key)
	    && key in target
	    && isIntegralNumber$1(+key)
	    && key >= 0;
	};

	var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
	  key = toPropertyKey$1(key);
	  return isTypedArrayIndex(target, key)
	    ? createPropertyDescriptor$2(2, target[key])
	    : nativeGetOwnPropertyDescriptor$1(target, key);
	};

	var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	  key = toPropertyKey$1(key);
	  if (isTypedArrayIndex(target, key)
	    && isObject$8(descriptor)
	    && hasOwn$c(descriptor, 'value')
	    && !hasOwn$c(descriptor, 'get')
	    && !hasOwn$c(descriptor, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	    && !descriptor.configurable
	    && (!hasOwn$c(descriptor, 'writable') || descriptor.writable)
	    && (!hasOwn$c(descriptor, 'enumerable') || descriptor.enumerable)
	  ) {
	    target[key] = descriptor.value;
	    return target;
	  } return nativeDefineProperty$1(target, key, descriptor);
	};

	if (DESCRIPTORS$9) {
	  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	    getOwnPropertyDescriptorModule$1.f = wrappedGetOwnPropertyDescriptor;
	    definePropertyModule$1.f = wrappedDefineProperty;
	    addGetter(TypedArrayPrototype$1, 'buffer');
	    addGetter(TypedArrayPrototype$1, 'byteOffset');
	    addGetter(TypedArrayPrototype$1, 'byteLength');
	    addGetter(TypedArrayPrototype$1, 'length');
	  }

	  $$v({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
	    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	    defineProperty: wrappedDefineProperty
	  });

	  typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
	    var BYTES = TYPE.match(/\d+/)[0] / 8;
	    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + TYPE;
	    var SETTER = 'set' + TYPE;
	    var NativeTypedArrayConstructor = global$j[CONSTRUCTOR_NAME];
	    var TypedArrayConstructor = NativeTypedArrayConstructor;
	    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
	    var exported = {};

	    var getter = function (that, index) {
	      var data = getInternalState$2(that);
	      return data.view[GETTER](index * BYTES + data.byteOffset, true);
	    };

	    var setter = function (that, index, value) {
	      var data = getInternalState$2(that);
	      data.view[SETTER](index * BYTES + data.byteOffset, CLAMPED ? toUint8Clamped(value) : value, true);
	    };

	    var addElement = function (that, index) {
	      nativeDefineProperty$1(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };

	    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
	        anInstance$4(that, TypedArrayConstructorPrototype);
	        var index = 0;
	        var byteOffset = 0;
	        var buffer, byteLength, length;
	        if (!isObject$8(data)) {
	          length = toIndex$1(data);
	          byteLength = length * BYTES;
	          buffer = new ArrayBuffer$3(byteLength);
	        } else if (isArrayBuffer(data)) {
	          buffer = data;
	          byteOffset = toOffset$1(offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw new RangeError$3(WRONG_LENGTH);
	            byteLength = $len - byteOffset;
	            if (byteLength < 0) throw new RangeError$3(WRONG_LENGTH);
	          } else {
	            byteLength = toLength$1($length) * BYTES;
	            if (byteLength + byteOffset > $len) throw new RangeError$3(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (isTypedArray(data)) {
	          return fromList(TypedArrayConstructor, data);
	        } else {
	          return call$b(typedArrayFrom, TypedArrayConstructor, data);
	        }
	        setInternalState$5(that, {
	          buffer: buffer,
	          byteOffset: byteOffset,
	          byteLength: byteLength,
	          length: length,
	          view: new DataView$2(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });

	      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
	      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create$3(TypedArrayPrototype$1);
	    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
	      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
	        anInstance$4(dummy, TypedArrayConstructorPrototype);
	        return inheritIfRequired$1(function () {
	          if (!isObject$8(data)) return new NativeTypedArrayConstructor(toIndex$1(data));
	          if (isArrayBuffer(data)) return $length !== undefined
	            ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
	            : typedArrayOffset !== undefined
	              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
	              : new NativeTypedArrayConstructor(data);
	          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
	          return call$b(typedArrayFrom, TypedArrayConstructor, data);
	        }(), dummy, TypedArrayConstructor);
	      });

	      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
	      forEach$2(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
	        if (!(key in TypedArrayConstructor)) {
	          createNonEnumerableProperty$1(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	        }
	      });
	      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	    }

	    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	      createNonEnumerableProperty$1(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	    }

	    enforceInternalState(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;

	    if (TYPED_ARRAY_TAG) {
	      createNonEnumerableProperty$1(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	    }

	    var FORCED = TypedArrayConstructor !== NativeTypedArrayConstructor;

	    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

	    $$v({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	      createNonEnumerableProperty$1(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	    }

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	      createNonEnumerableProperty$1(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	    }

	    setSpecies$2(CONSTRUCTOR_NAME);
	  };
	} else typedArrayConstructor.exports = function () { /* empty */ };

	var typedArrayConstructorExports = typedArrayConstructor.exports;

	var createTypedArrayConstructor$4 = typedArrayConstructorExports;

	// `Uint8Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$4('Uint8', function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var ArrayBufferViewCore$s = arrayBufferViewCore;
	var lengthOfArrayLike$a = lengthOfArrayLike$m;
	var toIntegerOrInfinity$3 = toIntegerOrInfinity$e;

	var aTypedArray$r = ArrayBufferViewCore$s.aTypedArray;
	var exportTypedArrayMethod$s = ArrayBufferViewCore$s.exportTypedArrayMethod;

	// `%TypedArray%.prototype.at` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.at
	exportTypedArrayMethod$s('at', function at(index) {
	  var O = aTypedArray$r(this);
	  var len = lengthOfArrayLike$a(O);
	  var relativeIndex = toIntegerOrInfinity$3(index);
	  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
	  return (k < 0 || k >= len) ? undefined : O[k];
	});

	var toObject$5 = toObject$i;
	var toAbsoluteIndex$1 = toAbsoluteIndex$7;
	var lengthOfArrayLike$9 = lengthOfArrayLike$m;
	var deletePropertyOrThrow = deletePropertyOrThrow$3;

	var min$2 = Math.min;

	// `Array.prototype.copyWithin` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.copywithin
	// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
	var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = toObject$5(this);
	  var len = lengthOfArrayLike$9(O);
	  var to = toAbsoluteIndex$1(target, len);
	  var from = toAbsoluteIndex$1(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = min$2((end === undefined ? len : toAbsoluteIndex$1(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else deletePropertyOrThrow(O, to);
	    to += inc;
	    from += inc;
	  } return O;
	};

	var uncurryThis$p = functionUncurryThis;
	var ArrayBufferViewCore$r = arrayBufferViewCore;
	var $ArrayCopyWithin = arrayCopyWithin;

	var u$ArrayCopyWithin = uncurryThis$p($ArrayCopyWithin);
	var aTypedArray$q = ArrayBufferViewCore$r.aTypedArray;
	var exportTypedArrayMethod$r = ArrayBufferViewCore$r.exportTypedArrayMethod;

	// `%TypedArray%.prototype.copyWithin` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
	exportTypedArrayMethod$r('copyWithin', function copyWithin(target, start /* , end */) {
	  return u$ArrayCopyWithin(aTypedArray$q(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var ArrayBufferViewCore$q = arrayBufferViewCore;
	var $every = arrayIteration.every;

	var aTypedArray$p = ArrayBufferViewCore$q.aTypedArray;
	var exportTypedArrayMethod$q = ArrayBufferViewCore$q.exportTypedArrayMethod;

	// `%TypedArray%.prototype.every` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
	exportTypedArrayMethod$q('every', function every(callbackfn /* , thisArg */) {
	  return $every(aTypedArray$p(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$p = arrayBufferViewCore;
	var $fill = arrayFill$1;
	var toBigInt$1 = toBigInt$3;
	var classof$5 = classof$k;
	var call$a = functionCall;
	var uncurryThis$o = functionUncurryThis;
	var fails$m = fails$V;

	var aTypedArray$o = ArrayBufferViewCore$p.aTypedArray;
	var exportTypedArrayMethod$p = ArrayBufferViewCore$p.exportTypedArrayMethod;
	var slice$4 = uncurryThis$o(''.slice);

	// V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
	var CONVERSION_BUG = fails$m(function () {
	  var count = 0;
	  // eslint-disable-next-line es/no-typed-arrays -- safe
	  new Int8Array(2).fill({ valueOf: function () { return count++; } });
	  return count !== 1;
	});

	// `%TypedArray%.prototype.fill` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
	exportTypedArrayMethod$p('fill', function fill(value /* , start, end */) {
	  var length = arguments.length;
	  aTypedArray$o(this);
	  var actualValue = slice$4(classof$5(this), 0, 3) === 'Big' ? toBigInt$1(value) : +value;
	  return call$a($fill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
	}, CONVERSION_BUG);

	var lengthOfArrayLike$8 = lengthOfArrayLike$m;

	var arrayFromConstructorAndList$2 = function (Constructor, list) {
	  var index = 0;
	  var length = lengthOfArrayLike$8(list);
	  var result = new Constructor(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	};

	var ArrayBufferViewCore$o = arrayBufferViewCore;
	var speciesConstructor = speciesConstructor$3;

	var aTypedArrayConstructor = ArrayBufferViewCore$o.aTypedArrayConstructor;
	var getTypedArrayConstructor$3 = ArrayBufferViewCore$o.getTypedArrayConstructor;

	// a part of `TypedArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#typedarray-species-create
	var typedArraySpeciesConstructor$4 = function (originalArray) {
	  return aTypedArrayConstructor(speciesConstructor(originalArray, getTypedArrayConstructor$3(originalArray)));
	};

	var arrayFromConstructorAndList$1 = arrayFromConstructorAndList$2;
	var typedArraySpeciesConstructor$3 = typedArraySpeciesConstructor$4;

	var typedArrayFromSpeciesAndList = function (instance, list) {
	  return arrayFromConstructorAndList$1(typedArraySpeciesConstructor$3(instance), list);
	};

	var ArrayBufferViewCore$n = arrayBufferViewCore;
	var $filter$1 = arrayIteration.filter;
	var fromSpeciesAndList = typedArrayFromSpeciesAndList;

	var aTypedArray$n = ArrayBufferViewCore$n.aTypedArray;
	var exportTypedArrayMethod$o = ArrayBufferViewCore$n.exportTypedArrayMethod;

	// `%TypedArray%.prototype.filter` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
	exportTypedArrayMethod$o('filter', function filter(callbackfn /* , thisArg */) {
	  var list = $filter$1(aTypedArray$n(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  return fromSpeciesAndList(this, list);
	});

	var ArrayBufferViewCore$m = arrayBufferViewCore;
	var $find = arrayIteration.find;

	var aTypedArray$m = ArrayBufferViewCore$m.aTypedArray;
	var exportTypedArrayMethod$n = ArrayBufferViewCore$m.exportTypedArrayMethod;

	// `%TypedArray%.prototype.find` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
	exportTypedArrayMethod$n('find', function find(predicate /* , thisArg */) {
	  return $find(aTypedArray$m(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$l = arrayBufferViewCore;
	var $findIndex = arrayIteration.findIndex;

	var aTypedArray$l = ArrayBufferViewCore$l.aTypedArray;
	var exportTypedArrayMethod$m = ArrayBufferViewCore$l.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findIndex` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
	exportTypedArrayMethod$m('findIndex', function findIndex(predicate /* , thisArg */) {
	  return $findIndex(aTypedArray$l(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var bind$5 = functionBindContext;
	var IndexedObject$1 = indexedObject;
	var toObject$4 = toObject$i;
	var lengthOfArrayLike$7 = lengthOfArrayLike$m;

	// `Array.prototype.{ findLast, findLastIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_FIND_LAST_INDEX = TYPE === 1;
	  return function ($this, callbackfn, that) {
	    var O = toObject$4($this);
	    var self = IndexedObject$1(O);
	    var boundFunction = bind$5(callbackfn, that);
	    var index = lengthOfArrayLike$7(self);
	    var value, result;
	    while (index-- > 0) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (result) switch (TYPE) {
	        case 0: return value; // findLast
	        case 1: return index; // findLastIndex
	      }
	    }
	    return IS_FIND_LAST_INDEX ? -1 : undefined;
	  };
	};

	var arrayIterationFromLast = {
	  // `Array.prototype.findLast` method
	  // https://github.com/tc39/proposal-array-find-from-last
	  findLast: createMethod$1(0),
	  // `Array.prototype.findLastIndex` method
	  // https://github.com/tc39/proposal-array-find-from-last
	  findLastIndex: createMethod$1(1)
	};

	var ArrayBufferViewCore$k = arrayBufferViewCore;
	var $findLast = arrayIterationFromLast.findLast;

	var aTypedArray$k = ArrayBufferViewCore$k.aTypedArray;
	var exportTypedArrayMethod$l = ArrayBufferViewCore$k.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findLast` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlast
	exportTypedArrayMethod$l('findLast', function findLast(predicate /* , thisArg */) {
	  return $findLast(aTypedArray$k(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$j = arrayBufferViewCore;
	var $findLastIndex = arrayIterationFromLast.findLastIndex;

	var aTypedArray$j = ArrayBufferViewCore$j.aTypedArray;
	var exportTypedArrayMethod$k = ArrayBufferViewCore$j.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findLastIndex` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlastindex
	exportTypedArrayMethod$k('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
	  return $findLastIndex(aTypedArray$j(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$i = arrayBufferViewCore;
	var $forEach$1 = arrayIteration.forEach;

	var aTypedArray$i = ArrayBufferViewCore$i.aTypedArray;
	var exportTypedArrayMethod$j = ArrayBufferViewCore$i.exportTypedArrayMethod;

	// `%TypedArray%.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
	exportTypedArrayMethod$j('forEach', function forEach(callbackfn /* , thisArg */) {
	  $forEach$1(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$h = arrayBufferViewCore;
	var $includes$1 = arrayIncludes.includes;

	var aTypedArray$h = ArrayBufferViewCore$h.aTypedArray;
	var exportTypedArrayMethod$i = ArrayBufferViewCore$h.exportTypedArrayMethod;

	// `%TypedArray%.prototype.includes` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
	exportTypedArrayMethod$i('includes', function includes(searchElement /* , fromIndex */) {
	  return $includes$1(aTypedArray$h(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$g = arrayBufferViewCore;
	var $indexOf = arrayIncludes.indexOf;

	var aTypedArray$g = ArrayBufferViewCore$g.aTypedArray;
	var exportTypedArrayMethod$h = ArrayBufferViewCore$g.exportTypedArrayMethod;

	// `%TypedArray%.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
	exportTypedArrayMethod$h('indexOf', function indexOf(searchElement /* , fromIndex */) {
	  return $indexOf(aTypedArray$g(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var global$i = global$N;
	var fails$l = fails$V;
	var uncurryThis$n = functionUncurryThis;
	var ArrayBufferViewCore$f = arrayBufferViewCore;
	var ArrayIterators = es_array_iterator;
	var wellKnownSymbol$8 = wellKnownSymbol$x;

	var ITERATOR$3 = wellKnownSymbol$8('iterator');
	var Uint8Array$1 = global$i.Uint8Array;
	var arrayValues = uncurryThis$n(ArrayIterators.values);
	var arrayKeys = uncurryThis$n(ArrayIterators.keys);
	var arrayEntries = uncurryThis$n(ArrayIterators.entries);
	var aTypedArray$f = ArrayBufferViewCore$f.aTypedArray;
	var exportTypedArrayMethod$g = ArrayBufferViewCore$f.exportTypedArrayMethod;
	var TypedArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype;

	var GENERIC = !fails$l(function () {
	  TypedArrayPrototype[ITERATOR$3].call([1]);
	});

	var ITERATOR_IS_VALUES = !!TypedArrayPrototype
	  && TypedArrayPrototype.values
	  && TypedArrayPrototype[ITERATOR$3] === TypedArrayPrototype.values
	  && TypedArrayPrototype.values.name === 'values';

	var typedArrayValues = function values() {
	  return arrayValues(aTypedArray$f(this));
	};

	// `%TypedArray%.prototype.entries` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
	exportTypedArrayMethod$g('entries', function entries() {
	  return arrayEntries(aTypedArray$f(this));
	}, GENERIC);
	// `%TypedArray%.prototype.keys` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
	exportTypedArrayMethod$g('keys', function keys() {
	  return arrayKeys(aTypedArray$f(this));
	}, GENERIC);
	// `%TypedArray%.prototype.values` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
	exportTypedArrayMethod$g('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });
	// `%TypedArray%.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
	exportTypedArrayMethod$g(ITERATOR$3, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });

	var ArrayBufferViewCore$e = arrayBufferViewCore;
	var uncurryThis$m = functionUncurryThis;

	var aTypedArray$e = ArrayBufferViewCore$e.aTypedArray;
	var exportTypedArrayMethod$f = ArrayBufferViewCore$e.exportTypedArrayMethod;
	var $join = uncurryThis$m([].join);

	// `%TypedArray%.prototype.join` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
	exportTypedArrayMethod$f('join', function join(separator) {
	  return $join(aTypedArray$e(this), separator);
	});

	/* eslint-disable es/no-array-prototype-lastindexof -- safe */
	var apply$4 = functionApply;
	var toIndexedObject$3 = toIndexedObject$c;
	var toIntegerOrInfinity$2 = toIntegerOrInfinity$e;
	var lengthOfArrayLike$6 = lengthOfArrayLike$m;
	var arrayMethodIsStrict = arrayMethodIsStrict$4;

	var min$1 = Math.min;
	var $lastIndexOf$1 = [].lastIndexOf;
	var NEGATIVE_ZERO = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
	var FORCED$4 = NEGATIVE_ZERO || !STRICT_METHOD;

	// `Array.prototype.lastIndexOf` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
	var arrayLastIndexOf = FORCED$4 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO) return apply$4($lastIndexOf$1, this, arguments) || 0;
	  var O = toIndexedObject$3(this);
	  var length = lengthOfArrayLike$6(O);
	  var index = length - 1;
	  if (arguments.length > 1) index = min$1(index, toIntegerOrInfinity$2(arguments[1]));
	  if (index < 0) index = length + index;
	  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
	  return -1;
	} : $lastIndexOf$1;

	var ArrayBufferViewCore$d = arrayBufferViewCore;
	var apply$3 = functionApply;
	var $lastIndexOf = arrayLastIndexOf;

	var aTypedArray$d = ArrayBufferViewCore$d.aTypedArray;
	var exportTypedArrayMethod$e = ArrayBufferViewCore$d.exportTypedArrayMethod;

	// `%TypedArray%.prototype.lastIndexOf` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
	exportTypedArrayMethod$e('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
	  var length = arguments.length;
	  return apply$3($lastIndexOf, aTypedArray$d(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
	});

	var ArrayBufferViewCore$c = arrayBufferViewCore;
	var $map = arrayIteration.map;
	var typedArraySpeciesConstructor$2 = typedArraySpeciesConstructor$4;

	var aTypedArray$c = ArrayBufferViewCore$c.aTypedArray;
	var exportTypedArrayMethod$d = ArrayBufferViewCore$c.exportTypedArrayMethod;

	// `%TypedArray%.prototype.map` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
	exportTypedArrayMethod$d('map', function map(mapfn /* , thisArg */) {
	  return $map(aTypedArray$c(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
	    return new (typedArraySpeciesConstructor$2(O))(length);
	  });
	});

	var aCallable$5 = aCallable$j;
	var toObject$3 = toObject$i;
	var IndexedObject = indexedObject;
	var lengthOfArrayLike$5 = lengthOfArrayLike$m;

	var $TypeError$4 = TypeError;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aCallable$5(callbackfn);
	    var O = toObject$3(that);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike$5(O);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw new $TypeError$4('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod(true)
	};

	var ArrayBufferViewCore$b = arrayBufferViewCore;
	var $reduce = arrayReduce.left;

	var aTypedArray$b = ArrayBufferViewCore$b.aTypedArray;
	var exportTypedArrayMethod$c = ArrayBufferViewCore$b.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
	exportTypedArrayMethod$c('reduce', function reduce(callbackfn /* , initialValue */) {
	  var length = arguments.length;
	  return $reduce(aTypedArray$b(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$a = arrayBufferViewCore;
	var $reduceRight = arrayReduce.right;

	var aTypedArray$a = ArrayBufferViewCore$a.aTypedArray;
	var exportTypedArrayMethod$b = ArrayBufferViewCore$a.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduceRight` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
	exportTypedArrayMethod$b('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
	  var length = arguments.length;
	  return $reduceRight(aTypedArray$a(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
	});

	var ArrayBufferViewCore$9 = arrayBufferViewCore;

	var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
	var exportTypedArrayMethod$a = ArrayBufferViewCore$9.exportTypedArrayMethod;
	var floor$2 = Math.floor;

	// `%TypedArray%.prototype.reverse` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
	exportTypedArrayMethod$a('reverse', function reverse() {
	  var that = this;
	  var length = aTypedArray$9(that).length;
	  var middle = floor$2(length / 2);
	  var index = 0;
	  var value;
	  while (index < middle) {
	    value = that[index];
	    that[index++] = that[--length];
	    that[length] = value;
	  } return that;
	});

	var global$h = global$N;
	var call$9 = functionCall;
	var ArrayBufferViewCore$8 = arrayBufferViewCore;
	var lengthOfArrayLike$4 = lengthOfArrayLike$m;
	var toOffset = toOffset$2;
	var toIndexedObject$2 = toObject$i;
	var fails$k = fails$V;

	var RangeError$2 = global$h.RangeError;
	var Int8Array$2 = global$h.Int8Array;
	var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
	var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
	var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
	var exportTypedArrayMethod$9 = ArrayBufferViewCore$8.exportTypedArrayMethod;

	var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails$k(function () {
	  // eslint-disable-next-line es/no-typed-arrays -- required for testing
	  var array = new Uint8ClampedArray(2);
	  call$9($set, array, { length: 1, 0: 3 }, 1);
	  return array[1] !== 3;
	});

	// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
	var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$8.NATIVE_ARRAY_BUFFER_VIEWS && fails$k(function () {
	  var array = new Int8Array$2(2);
	  array.set(1);
	  array.set('2', 1);
	  return array[0] !== 0 || array[1] !== 2;
	});

	// `%TypedArray%.prototype.set` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
	exportTypedArrayMethod$9('set', function set(arrayLike /* , offset */) {
	  aTypedArray$8(this);
	  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
	  var src = toIndexedObject$2(arrayLike);
	  if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call$9($set, this, src, offset);
	  var length = this.length;
	  var len = lengthOfArrayLike$4(src);
	  var index = 0;
	  if (len + offset > length) throw new RangeError$2('Wrong length');
	  while (index < len) this[offset + index] = src[index++];
	}, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

	var ArrayBufferViewCore$7 = arrayBufferViewCore;
	var typedArraySpeciesConstructor$1 = typedArraySpeciesConstructor$4;
	var fails$j = fails$V;
	var arraySlice$5 = arraySlice$a;

	var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
	var exportTypedArrayMethod$8 = ArrayBufferViewCore$7.exportTypedArrayMethod;

	var FORCED$3 = fails$j(function () {
	  // eslint-disable-next-line es/no-typed-arrays -- required for testing
	  new Int8Array(1).slice();
	});

	// `%TypedArray%.prototype.slice` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
	exportTypedArrayMethod$8('slice', function slice(start, end) {
	  var list = arraySlice$5(aTypedArray$7(this), start, end);
	  var C = typedArraySpeciesConstructor$1(this);
	  var index = 0;
	  var length = list.length;
	  var result = new C(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	}, FORCED$3);

	var ArrayBufferViewCore$6 = arrayBufferViewCore;
	var $some = arrayIteration.some;

	var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
	var exportTypedArrayMethod$7 = ArrayBufferViewCore$6.exportTypedArrayMethod;

	// `%TypedArray%.prototype.some` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
	exportTypedArrayMethod$7('some', function some(callbackfn /* , thisArg */) {
	  return $some(aTypedArray$6(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var global$g = global$N;
	var uncurryThis$l = functionUncurryThisClause;
	var fails$i = fails$V;
	var aCallable$4 = aCallable$j;
	var internalSort = arraySort$1;
	var ArrayBufferViewCore$5 = arrayBufferViewCore;
	var FF = engineFfVersion;
	var IE_OR_EDGE = engineIsIeOrEdge;
	var V8$1 = engineV8Version;
	var WEBKIT = engineWebkitVersion;

	var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
	var exportTypedArrayMethod$6 = ArrayBufferViewCore$5.exportTypedArrayMethod;
	var Uint16Array = global$g.Uint16Array;
	var nativeSort = Uint16Array && uncurryThis$l(Uint16Array.prototype.sort);

	// WebKit
	var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !(fails$i(function () {
	  nativeSort(new Uint16Array(2), null);
	}) && fails$i(function () {
	  nativeSort(new Uint16Array(2), {});
	}));

	var STABLE_SORT = !!nativeSort && !fails$i(function () {
	  // feature detection can be too slow, so check engines versions
	  if (V8$1) return V8$1 < 74;
	  if (FF) return FF < 67;
	  if (IE_OR_EDGE) return true;
	  if (WEBKIT) return WEBKIT < 602;

	  var array = new Uint16Array(516);
	  var expected = Array(516);
	  var index, mod;

	  for (index = 0; index < 516; index++) {
	    mod = index % 4;
	    array[index] = 515 - index;
	    expected[index] = index - 2 * mod + 3;
	  }

	  nativeSort(array, function (a, b) {
	    return (a / 4 | 0) - (b / 4 | 0);
	  });

	  for (index = 0; index < 516; index++) {
	    if (array[index] !== expected[index]) return true;
	  }
	});

	var getSortCompare = function (comparefn) {
	  return function (x, y) {
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (y !== y) return -1;
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (x !== x) return 1;
	    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
	    return x > y;
	  };
	};

	// `%TypedArray%.prototype.sort` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
	exportTypedArrayMethod$6('sort', function sort(comparefn) {
	  if (comparefn !== undefined) aCallable$4(comparefn);
	  if (STABLE_SORT) return nativeSort(this, comparefn);

	  return internalSort(aTypedArray$5(this), getSortCompare(comparefn));
	}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

	var ArrayBufferViewCore$4 = arrayBufferViewCore;
	var toLength = toLength$8;
	var toAbsoluteIndex = toAbsoluteIndex$7;
	var typedArraySpeciesConstructor = typedArraySpeciesConstructor$4;

	var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
	var exportTypedArrayMethod$5 = ArrayBufferViewCore$4.exportTypedArrayMethod;

	// `%TypedArray%.prototype.subarray` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
	exportTypedArrayMethod$5('subarray', function subarray(begin, end) {
	  var O = aTypedArray$4(this);
	  var length = O.length;
	  var beginIndex = toAbsoluteIndex(begin, length);
	  var C = typedArraySpeciesConstructor(O);
	  return new C(
	    O.buffer,
	    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
	    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
	  );
	});

	var global$f = global$N;
	var apply$2 = functionApply;
	var ArrayBufferViewCore$3 = arrayBufferViewCore;
	var fails$h = fails$V;
	var arraySlice$4 = arraySlice$a;

	var Int8Array$1 = global$f.Int8Array;
	var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
	var exportTypedArrayMethod$4 = ArrayBufferViewCore$3.exportTypedArrayMethod;
	var $toLocaleString = [].toLocaleString;

	// iOS Safari 6.x fails here
	var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$h(function () {
	  $toLocaleString.call(new Int8Array$1(1));
	});

	var FORCED$2 = fails$h(function () {
	  return [1, 2].toLocaleString() !== new Int8Array$1([1, 2]).toLocaleString();
	}) || !fails$h(function () {
	  Int8Array$1.prototype.toLocaleString.call([1, 2]);
	});

	// `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
	exportTypedArrayMethod$4('toLocaleString', function toLocaleString() {
	  return apply$2(
	    $toLocaleString,
	    TO_LOCALE_STRING_BUG ? arraySlice$4(aTypedArray$3(this)) : aTypedArray$3(this),
	    arraySlice$4(arguments)
	  );
	}, FORCED$2);

	var lengthOfArrayLike$3 = lengthOfArrayLike$m;

	// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
	// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
	var arrayToReversed$1 = function (O, C) {
	  var len = lengthOfArrayLike$3(O);
	  var A = new C(len);
	  var k = 0;
	  for (; k < len; k++) A[k] = O[len - k - 1];
	  return A;
	};

	var arrayToReversed = arrayToReversed$1;
	var ArrayBufferViewCore$2 = arrayBufferViewCore;

	var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
	var exportTypedArrayMethod$3 = ArrayBufferViewCore$2.exportTypedArrayMethod;
	var getTypedArrayConstructor$2 = ArrayBufferViewCore$2.getTypedArrayConstructor;

	// `%TypedArray%.prototype.toReversed` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.toreversed
	exportTypedArrayMethod$3('toReversed', function toReversed() {
	  return arrayToReversed(aTypedArray$2(this), getTypedArrayConstructor$2(this));
	});

	var ArrayBufferViewCore$1 = arrayBufferViewCore;
	var uncurryThis$k = functionUncurryThis;
	var aCallable$3 = aCallable$j;
	var arrayFromConstructorAndList = arrayFromConstructorAndList$2;

	var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
	var getTypedArrayConstructor$1 = ArrayBufferViewCore$1.getTypedArrayConstructor;
	var exportTypedArrayMethod$2 = ArrayBufferViewCore$1.exportTypedArrayMethod;
	var sort = uncurryThis$k(ArrayBufferViewCore$1.TypedArrayPrototype.sort);

	// `%TypedArray%.prototype.toSorted` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tosorted
	exportTypedArrayMethod$2('toSorted', function toSorted(compareFn) {
	  if (compareFn !== undefined) aCallable$3(compareFn);
	  var O = aTypedArray$1(this);
	  var A = arrayFromConstructorAndList(getTypedArrayConstructor$1(O), O);
	  return sort(A, compareFn);
	});

	var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;
	var fails$g = fails$V;
	var global$e = global$N;
	var uncurryThis$j = functionUncurryThis;

	var Uint8Array = global$e.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
	var arrayToString = [].toString;
	var join$4 = uncurryThis$j([].join);

	if (fails$g(function () { arrayToString.call({}); })) {
	  arrayToString = function toString() {
	    return join$4(this);
	  };
	}

	var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString !== arrayToString;

	// `%TypedArray%.prototype.toString` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
	exportTypedArrayMethod$1('toString', arrayToString, IS_NOT_ARRAY_METHOD);

	var lengthOfArrayLike$2 = lengthOfArrayLike$m;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$e;

	var $RangeError$1 = RangeError;

	// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
	// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
	var arrayWith$1 = function (O, C, index, value) {
	  var len = lengthOfArrayLike$2(O);
	  var relativeIndex = toIntegerOrInfinity$1(index);
	  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
	  if (actualIndex >= len || actualIndex < 0) throw new $RangeError$1('Incorrect index');
	  var A = new C(len);
	  var k = 0;
	  for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
	  return A;
	};

	var arrayWith = arrayWith$1;
	var ArrayBufferViewCore = arrayBufferViewCore;
	var isBigIntArray = isBigIntArray$2;
	var toIntegerOrInfinity = toIntegerOrInfinity$e;
	var toBigInt = toBigInt$3;

	var aTypedArray = ArrayBufferViewCore.aTypedArray;
	var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
	var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

	var PROPER_ORDER = !!function () {
	  try {
	    // eslint-disable-next-line no-throw-literal, es/no-typed-arrays, es/no-array-prototype-with -- required for testing
	    new Int8Array(1)['with'](2, { valueOf: function () { throw 8; } });
	  } catch (error) {
	    // some early implementations, like WebKit, does not follow the final semantic
	    // https://github.com/tc39/proposal-change-array-by-copy/pull/86
	    return error === 8;
	  }
	}();

	// `%TypedArray%.prototype.with` method
	// https://tc39.es/ecma262/#sec-%typedarray%.prototype.with
	exportTypedArrayMethod('with', { 'with': function (index, value) {
	  var O = aTypedArray(this);
	  var relativeIndex = toIntegerOrInfinity(index);
	  var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
	  return arrayWith(O, getTypedArrayConstructor(O), relativeIndex, actualValue);
	} }['with'], !PROPER_ORDER);

	var uncurryThisAccessor$1 = functionUncurryThisAccessor;
	var classof$4 = classofRaw$2;

	var $TypeError$3 = TypeError;

	// Includes
	// - Perform ? RequireInternalSlot(O, [[ArrayBufferData]]).
	// - If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
	var arrayBufferByteLength$2 = uncurryThisAccessor$1(ArrayBuffer.prototype, 'byteLength', 'get') || function (O) {
	  if (classof$4(O) !== 'ArrayBuffer') throw new $TypeError$3('ArrayBuffer expected');
	  return O.byteLength;
	};

	var uncurryThis$i = functionUncurryThis;
	var arrayBufferByteLength$1 = arrayBufferByteLength$2;

	var slice$3 = uncurryThis$i(ArrayBuffer.prototype.slice);

	var arrayBufferIsDetached = function (O) {
	  if (arrayBufferByteLength$1(O) !== 0) return false;
	  try {
	    slice$3(O, 0, 0);
	    return false;
	  } catch (error) {
	    return true;
	  }
	};

	var DESCRIPTORS$8 = descriptors;
	var defineBuiltInAccessor$6 = defineBuiltInAccessor$f;
	var isDetached$1 = arrayBufferIsDetached;

	var ArrayBufferPrototype$1 = ArrayBuffer.prototype;

	if (DESCRIPTORS$8 && !('detached' in ArrayBufferPrototype$1)) {
	  defineBuiltInAccessor$6(ArrayBufferPrototype$1, 'detached', {
	    configurable: true,
	    get: function detached() {
	      return isDetached$1(this);
	    }
	  });
	}

	var IS_NODE$1 = engineIsNode;

	var tryNodeRequire$1 = function (name) {
	  try {
	    // eslint-disable-next-line no-new-func -- safe
	    if (IS_NODE$1) return Function('return require("' + name + '")')();
	  } catch (error) { /* empty */ }
	};

	var global$d = global$N;
	var fails$f = fails$V;
	var V8 = engineV8Version;
	var IS_BROWSER = engineIsBrowser;
	var IS_DENO = engineIsDeno;
	var IS_NODE = engineIsNode;

	var structuredClone$2 = global$d.structuredClone;

	var structuredCloneProperTransfer = !!structuredClone$2 && !fails$f(function () {
	  // prevent V8 ArrayBufferDetaching protector cell invalidation and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if ((IS_DENO && V8 > 92) || (IS_NODE && V8 > 94) || (IS_BROWSER && V8 > 97)) return false;
	  var buffer = new ArrayBuffer(8);
	  var clone = structuredClone$2(buffer, { transfer: [buffer] });
	  return buffer.byteLength !== 0 || clone.byteLength !== 8;
	});

	var global$c = global$N;
	var tryNodeRequire = tryNodeRequire$1;
	var PROPER_STRUCTURED_CLONE_TRANSFER$1 = structuredCloneProperTransfer;

	var structuredClone$1 = global$c.structuredClone;
	var $ArrayBuffer = global$c.ArrayBuffer;
	var $MessageChannel = global$c.MessageChannel;
	var detach = false;
	var WorkerThreads, channel, buffer, $detach;

	if (PROPER_STRUCTURED_CLONE_TRANSFER$1) {
	  detach = function (transferable) {
	    structuredClone$1(transferable, { transfer: [transferable] });
	  };
	} else if ($ArrayBuffer) try {
	  if (!$MessageChannel) {
	    WorkerThreads = tryNodeRequire('worker_threads');
	    if (WorkerThreads) $MessageChannel = WorkerThreads.MessageChannel;
	  }

	  if ($MessageChannel) {
	    channel = new $MessageChannel();
	    buffer = new $ArrayBuffer(2);

	    $detach = function (transferable) {
	      channel.port1.postMessage(null, [transferable]);
	    };

	    if (buffer.byteLength === 2) {
	      $detach(buffer);
	      if (buffer.byteLength === 0) detach = $detach;
	    }
	  }
	} catch (error) { /* empty */ }

	var detachTransferable$1 = detach;

	var global$b = global$N;
	var uncurryThis$h = functionUncurryThis;
	var uncurryThisAccessor = functionUncurryThisAccessor;
	var toIndex = toIndex$3;
	var isDetached = arrayBufferIsDetached;
	var arrayBufferByteLength = arrayBufferByteLength$2;
	var detachTransferable = detachTransferable$1;
	var PROPER_STRUCTURED_CLONE_TRANSFER = structuredCloneProperTransfer;

	var structuredClone = global$b.structuredClone;
	var ArrayBuffer$2 = global$b.ArrayBuffer;
	var DataView$1 = global$b.DataView;
	var TypeError$4 = global$b.TypeError;
	var min = Math.min;
	var ArrayBufferPrototype = ArrayBuffer$2.prototype;
	var DataViewPrototype = DataView$1.prototype;
	var slice$2 = uncurryThis$h(ArrayBufferPrototype.slice);
	var isResizable = uncurryThisAccessor(ArrayBufferPrototype, 'resizable', 'get');
	var maxByteLength = uncurryThisAccessor(ArrayBufferPrototype, 'maxByteLength', 'get');
	var getInt8 = uncurryThis$h(DataViewPrototype.getInt8);
	var setInt8 = uncurryThis$h(DataViewPrototype.setInt8);

	var arrayBufferTransfer = (PROPER_STRUCTURED_CLONE_TRANSFER || detachTransferable) && function (arrayBuffer, newLength, preserveResizability) {
	  var byteLength = arrayBufferByteLength(arrayBuffer);
	  var newByteLength = newLength === undefined ? byteLength : toIndex(newLength);
	  var fixedLength = !isResizable || !isResizable(arrayBuffer);
	  var newBuffer;
	  if (isDetached(arrayBuffer)) throw new TypeError$4('ArrayBuffer is detached');
	  if (PROPER_STRUCTURED_CLONE_TRANSFER) {
	    arrayBuffer = structuredClone(arrayBuffer, { transfer: [arrayBuffer] });
	    if (byteLength === newByteLength && (preserveResizability || fixedLength)) return arrayBuffer;
	  }
	  if (byteLength >= newByteLength && (!preserveResizability || fixedLength)) {
	    newBuffer = slice$2(arrayBuffer, 0, newByteLength);
	  } else {
	    var options = preserveResizability && !fixedLength && maxByteLength ? { maxByteLength: maxByteLength(arrayBuffer) } : undefined;
	    newBuffer = new ArrayBuffer$2(newByteLength, options);
	    var a = new DataView$1(arrayBuffer);
	    var b = new DataView$1(newBuffer);
	    var copyLength = min(newByteLength, byteLength);
	    for (var i = 0; i < copyLength; i++) setInt8(b, i, getInt8(a, i));
	  }
	  if (!PROPER_STRUCTURED_CLONE_TRANSFER) detachTransferable(arrayBuffer);
	  return newBuffer;
	};

	var $$u = _export;
	var $transfer$1 = arrayBufferTransfer;

	// `ArrayBuffer.prototype.transfer` method
	// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfer
	if ($transfer$1) $$u({ target: 'ArrayBuffer', proto: true }, {
	  transfer: function transfer() {
	    return $transfer$1(this, arguments.length ? arguments[0] : undefined, true);
	  }
	});

	var $$t = _export;
	var $transfer = arrayBufferTransfer;

	// `ArrayBuffer.prototype.transferToFixedLength` method
	// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfertofixedlength
	if ($transfer) $$t({ target: 'ArrayBuffer', proto: true }, {
	  transferToFixedLength: function transferToFixedLength() {
	    return $transfer(this, arguments.length ? arguments[0] : undefined, false);
	  }
	});

	var $$s = _export;
	var global$a = global$N;

	// `globalThis` object
	// https://tc39.es/ecma262/#sec-globalthis
	$$s({ global: true, forced: global$a.globalThis !== global$a }, {
	  globalThis: global$a
	});

	// `SameValue` abstract operation
	// https://tc39.es/ecma262/#sec-samevalue
	// eslint-disable-next-line es/no-object-is -- safe
	var sameValue$1 = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y;
	};

	var call$8 = functionCall;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var anObject$7 = anObject$u;
	var isNullOrUndefined$2 = isNullOrUndefined$a;
	var requireObjectCoercible$2 = requireObjectCoercible$b;
	var sameValue = sameValue$1;
	var toString$9 = toString$l;
	var getMethod = getMethod$8;
	var regExpExec = regexpExecAbstract;

	// @@search logic
	fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.es/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = requireObjectCoercible$2(this);
	      var searcher = isNullOrUndefined$2(regexp) ? undefined : getMethod(regexp, SEARCH);
	      return searcher ? call$8(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$9(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
	    function (string) {
	      var rx = anObject$7(this);
	      var S = toString$9(string);
	      var res = maybeCallNative(nativeSearch, rx, S);

	      if (res.done) return res.value;

	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regExpExec(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	var $$r = _export;
	var call$7 = functionCall;

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	$$r({ target: 'URL', proto: true, enumerable: true }, {
	  toJSON: function toJSON() {
	    return call$7(URL.prototype.toString, this);
	  }
	});

	var uncurryThis$g = functionUncurryThis;
	var requireObjectCoercible$1 = requireObjectCoercible$b;
	var toString$8 = toString$l;

	var quot = /"/g;
	var replace$5 = uncurryThis$g(''.replace);

	// `CreateHTML` abstract operation
	// https://tc39.es/ecma262/#sec-createhtml
	var createHtml = function (string, tag, attribute, value) {
	  var S = toString$8(requireObjectCoercible$1(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + replace$5(toString$8(value), quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};

	var fails$e = fails$V;

	// check the existence of a method, lowercase
	// of a tag and escaping quotes in arguments
	var stringHtmlForced = function (METHOD_NAME) {
	  return fails$e(function () {
	    var test = ''[METHOD_NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  });
	};

	var $$q = _export;
	var createHTML = createHtml;
	var forcedStringHTMLMethod = stringHtmlForced;

	// `String.prototype.anchor` method
	// https://tc39.es/ecma262/#sec-string.prototype.anchor
	$$q({ target: 'String', proto: true, forced: forcedStringHTMLMethod('anchor') }, {
	  anchor: function anchor(name) {
	    return createHTML(this, 'a', 'name', name);
	  }
	});

	var $$p = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$p({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$o = _export;
	var call$6 = functionCall;
	var aCallable$2 = aCallable$j;
	var anObject$6 = anObject$u;
	var getIteratorDirect$2 = getIteratorDirect$7;
	var createIteratorProxy = iteratorCreateProxy;
	var callWithSafeIterationClosing$1 = callWithSafeIterationClosing$3;
	var IS_PURE$1 = isPure;

	var IteratorProxy = createIteratorProxy(function () {
	  var iterator = this.iterator;
	  var predicate = this.predicate;
	  var next = this.next;
	  var result, done, value;
	  while (true) {
	    result = anObject$6(call$6(next, iterator));
	    done = this.done = !!result.done;
	    if (done) return;
	    value = result.value;
	    if (callWithSafeIterationClosing$1(iterator, predicate, [value, this.counter++], true)) return value;
	  }
	});

	// `Iterator.prototype.filter` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$o({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$1 }, {
	  filter: function filter(predicate) {
	    anObject$6(this);
	    aCallable$2(predicate);
	    return new IteratorProxy(getIteratorDirect$2(this), {
	      predicate: predicate
	    });
	  }
	});

	var global$9 = global$N;
	var DOMIterables = domIterables;
	var DOMTokenListPrototype = domTokenListPrototype;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty = createNonEnumerableProperty$f;
	var wellKnownSymbol$7 = wellKnownSymbol$x;

	var ITERATOR$2 = wellKnownSymbol$7('iterator');
	var TO_STRING_TAG = wellKnownSymbol$7('toStringTag');
	var ArrayValues = ArrayIteratorMethods.values;

	var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$2] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	    }
	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	};

	for (var COLLECTION_NAME in DOMIterables) {
	  handlePrototype(global$9[COLLECTION_NAME] && global$9[COLLECTION_NAME].prototype, COLLECTION_NAME);
	}

	handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

	var uncurryThis$f = functionUncurryThis;
	var isArray$1 = isArray$6;
	var isCallable$5 = isCallable$w;
	var classof$3 = classofRaw$2;
	var toString$7 = toString$l;

	var push$8 = uncurryThis$f([].push);

	var getJsonReplacerFunction = function (replacer) {
	  if (isCallable$5(replacer)) return replacer;
	  if (!isArray$1(replacer)) return;
	  var rawLength = replacer.length;
	  var keys = [];
	  for (var i = 0; i < rawLength; i++) {
	    var element = replacer[i];
	    if (typeof element == 'string') push$8(keys, element);
	    else if (typeof element == 'number' || classof$3(element) === 'Number' || classof$3(element) === 'String') push$8(keys, toString$7(element));
	  }
	  var keysLength = keys.length;
	  var root = true;
	  return function (key, value) {
	    if (root) {
	      root = false;
	      return value;
	    }
	    if (isArray$1(this)) return value;
	    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
	  };
	};

	var $$n = _export;
	var getBuiltIn$4 = getBuiltIn$d;
	var apply$1 = functionApply;
	var call$5 = functionCall;
	var uncurryThis$e = functionUncurryThis;
	var fails$d = fails$V;
	var isCallable$4 = isCallable$w;
	var isSymbol$1 = isSymbol$6;
	var arraySlice$3 = arraySlice$a;
	var getReplacerFunction = getJsonReplacerFunction;
	var NATIVE_SYMBOL$5 = symbolConstructorDetection;

	var $String = String;
	var $stringify = getBuiltIn$4('JSON', 'stringify');
	var exec$4 = uncurryThis$e(/./.exec);
	var charAt$3 = uncurryThis$e(''.charAt);
	var charCodeAt$1 = uncurryThis$e(''.charCodeAt);
	var replace$4 = uncurryThis$e(''.replace);
	var numberToString$1 = uncurryThis$e(1.0.toString);

	var tester = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$5 || fails$d(function () {
	  var symbol = getBuiltIn$4('Symbol')('stringify detection');
	  // MS Edge converts symbol values to JSON as {}
	  return $stringify([symbol]) !== '[null]'
	    // WebKit converts symbol values to JSON as null
	    || $stringify({ a: symbol }) !== '{}'
	    // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) !== '{}';
	});

	// https://github.com/tc39/proposal-well-formed-stringify
	var ILL_FORMED_UNICODE = fails$d(function () {
	  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify('\uDEAD') !== '"\\udead"';
	});

	var stringifyWithSymbolsFix = function (it, replacer) {
	  var args = arraySlice$3(arguments);
	  var $replacer = getReplacerFunction(replacer);
	  if (!isCallable$4($replacer) && (it === undefined || isSymbol$1(it))) return; // IE8 returns string on undefined
	  args[1] = function (key, value) {
	    // some old implementations (like WebKit) could pass numbers as keys
	    if (isCallable$4($replacer)) value = call$5($replacer, this, $String(key), value);
	    if (!isSymbol$1(value)) return value;
	  };
	  return apply$1($stringify, null, args);
	};

	var fixIllFormed = function (match, offset, string) {
	  var prev = charAt$3(string, offset - 1);
	  var next = charAt$3(string, offset + 1);
	  if ((exec$4(low, match) && !exec$4(hi, next)) || (exec$4(hi, match) && !exec$4(low, prev))) {
	    return '\\u' + numberToString$1(charCodeAt$1(match, 0), 16);
	  } return match;
	};

	if ($stringify) {
	  // `JSON.stringify` method
	  // https://tc39.es/ecma262/#sec-json.stringify
	  $$n({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice$3(arguments);
	      var result = apply$1(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
	      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace$4(result, tester, fixIllFormed) : result;
	    }
	  });
	}

	var uncurryThis$d = functionUncurryThis;
	var hasOwn$b = hasOwnProperty_1;

	var $SyntaxError = SyntaxError;
	var $parseInt = parseInt;
	var fromCharCode$1 = String.fromCharCode;
	var at$1 = uncurryThis$d(''.charAt);
	var slice$1 = uncurryThis$d(''.slice);
	var exec$3 = uncurryThis$d(/./.exec);

	var codePoints = {
	  '\\"': '"',
	  '\\\\': '\\',
	  '\\/': '/',
	  '\\b': '\b',
	  '\\f': '\f',
	  '\\n': '\n',
	  '\\r': '\r',
	  '\\t': '\t'
	};

	var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
	// eslint-disable-next-line regexp/no-control-character -- safe
	var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;

	var parseJsonString = function (source, i) {
	  var unterminated = true;
	  var value = '';
	  while (i < source.length) {
	    var chr = at$1(source, i);
	    if (chr === '\\') {
	      var twoChars = slice$1(source, i, i + 2);
	      if (hasOwn$b(codePoints, twoChars)) {
	        value += codePoints[twoChars];
	        i += 2;
	      } else if (twoChars === '\\u') {
	        i += 2;
	        var fourHexDigits = slice$1(source, i, i + 4);
	        if (!exec$3(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError('Bad Unicode escape at: ' + i);
	        value += fromCharCode$1($parseInt(fourHexDigits, 16));
	        i += 4;
	      } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
	    } else if (chr === '"') {
	      unterminated = false;
	      i++;
	      break;
	    } else {
	      if (exec$3(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError('Bad control character in string literal at: ' + i);
	      value += chr;
	      i++;
	    }
	  }
	  if (unterminated) throw new $SyntaxError('Unterminated string at: ' + i);
	  return { value: value, end: i };
	};

	var $$m = _export;
	var DESCRIPTORS$7 = descriptors;
	var global$8 = global$N;
	var getBuiltIn$3 = getBuiltIn$d;
	var uncurryThis$c = functionUncurryThis;
	var call$4 = functionCall;
	var isCallable$3 = isCallable$w;
	var isObject$7 = isObject$p;
	var isArray = isArray$6;
	var hasOwn$a = hasOwnProperty_1;
	var toString$6 = toString$l;
	var lengthOfArrayLike$1 = lengthOfArrayLike$m;
	var createProperty$1 = createProperty$6;
	var fails$c = fails$V;
	var parseJSONString = parseJsonString;
	var NATIVE_SYMBOL$4 = symbolConstructorDetection;

	var JSON$1 = global$8.JSON;
	var Number$1 = global$8.Number;
	var SyntaxError$1 = global$8.SyntaxError;
	var nativeParse = JSON$1 && JSON$1.parse;
	var enumerableOwnProperties = getBuiltIn$3('Object', 'keys');
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var at = uncurryThis$c(''.charAt);
	var slice = uncurryThis$c(''.slice);
	var exec$2 = uncurryThis$c(/./.exec);
	var push$7 = uncurryThis$c([].push);

	var IS_DIGIT = /^\d$/;
	var IS_NON_ZERO_DIGIT = /^[1-9]$/;
	var IS_NUMBER_START = /^(?:-|\d)$/;
	var IS_WHITESPACE = /^[\t\n\r ]$/;

	var PRIMITIVE = 0;
	var OBJECT = 1;

	var $parse = function (source, reviver) {
	  source = toString$6(source);
	  var context = new Context(source, 0);
	  var root = context.parse();
	  var value = root.value;
	  var endIndex = context.skip(IS_WHITESPACE, root.end);
	  if (endIndex < source.length) {
	    throw new SyntaxError$1('Unexpected extra character: "' + at(source, endIndex) + '" after the parsed data at: ' + endIndex);
	  }
	  return isCallable$3(reviver) ? internalize({ '': value }, '', reviver, root) : value;
	};

	var internalize = function (holder, name, reviver, node) {
	  var val = holder[name];
	  var unmodified = node && val === node.value;
	  var context = unmodified && typeof node.source == 'string' ? { source: node.source } : {};
	  var elementRecordsLen, keys, len, i, P;
	  if (isObject$7(val)) {
	    var nodeIsArray = isArray(val);
	    var nodes = unmodified ? node.nodes : nodeIsArray ? [] : {};
	    if (nodeIsArray) {
	      elementRecordsLen = nodes.length;
	      len = lengthOfArrayLike$1(val);
	      for (i = 0; i < len; i++) {
	        internalizeProperty(val, i, internalize(val, '' + i, reviver, i < elementRecordsLen ? nodes[i] : undefined));
	      }
	    } else {
	      keys = enumerableOwnProperties(val);
	      len = lengthOfArrayLike$1(keys);
	      for (i = 0; i < len; i++) {
	        P = keys[i];
	        internalizeProperty(val, P, internalize(val, P, reviver, hasOwn$a(nodes, P) ? nodes[P] : undefined));
	      }
	    }
	  }
	  return call$4(reviver, holder, name, val, context);
	};

	var internalizeProperty = function (object, key, value) {
	  if (DESCRIPTORS$7) {
	    var descriptor = getOwnPropertyDescriptor$1(object, key);
	    if (descriptor && !descriptor.configurable) return;
	  }
	  if (value === undefined) delete object[key];
	  else createProperty$1(object, key, value);
	};

	var Node = function (value, end, source, nodes) {
	  this.value = value;
	  this.end = end;
	  this.source = source;
	  this.nodes = nodes;
	};

	var Context = function (source, index) {
	  this.source = source;
	  this.index = index;
	};

	// https://www.json.org/json-en.html
	Context.prototype = {
	  fork: function (nextIndex) {
	    return new Context(this.source, nextIndex);
	  },
	  parse: function () {
	    var source = this.source;
	    var i = this.skip(IS_WHITESPACE, this.index);
	    var fork = this.fork(i);
	    var chr = at(source, i);
	    if (exec$2(IS_NUMBER_START, chr)) return fork.number();
	    switch (chr) {
	      case '{':
	        return fork.object();
	      case '[':
	        return fork.array();
	      case '"':
	        return fork.string();
	      case 't':
	        return fork.keyword(true);
	      case 'f':
	        return fork.keyword(false);
	      case 'n':
	        return fork.keyword(null);
	    } throw new SyntaxError$1('Unexpected character: "' + chr + '" at: ' + i);
	  },
	  node: function (type, value, start, end, nodes) {
	    return new Node(value, end, type ? null : slice(this.source, start, end), nodes);
	  },
	  object: function () {
	    var source = this.source;
	    var i = this.index + 1;
	    var expectKeypair = false;
	    var object = {};
	    var nodes = {};
	    while (i < source.length) {
	      i = this.until(['"', '}'], i);
	      if (at(source, i) === '}' && !expectKeypair) {
	        i++;
	        break;
	      }
	      // Parsing the key
	      var result = this.fork(i).string();
	      var key = result.value;
	      i = result.end;
	      i = this.until([':'], i) + 1;
	      // Parsing value
	      i = this.skip(IS_WHITESPACE, i);
	      result = this.fork(i).parse();
	      createProperty$1(nodes, key, result);
	      createProperty$1(object, key, result.value);
	      i = this.until([',', '}'], result.end);
	      var chr = at(source, i);
	      if (chr === ',') {
	        expectKeypair = true;
	        i++;
	      } else if (chr === '}') {
	        i++;
	        break;
	      }
	    }
	    return this.node(OBJECT, object, this.index, i, nodes);
	  },
	  array: function () {
	    var source = this.source;
	    var i = this.index + 1;
	    var expectElement = false;
	    var array = [];
	    var nodes = [];
	    while (i < source.length) {
	      i = this.skip(IS_WHITESPACE, i);
	      if (at(source, i) === ']' && !expectElement) {
	        i++;
	        break;
	      }
	      var result = this.fork(i).parse();
	      push$7(nodes, result);
	      push$7(array, result.value);
	      i = this.until([',', ']'], result.end);
	      if (at(source, i) === ',') {
	        expectElement = true;
	        i++;
	      } else if (at(source, i) === ']') {
	        i++;
	        break;
	      }
	    }
	    return this.node(OBJECT, array, this.index, i, nodes);
	  },
	  string: function () {
	    var index = this.index;
	    var parsed = parseJSONString(this.source, this.index + 1);
	    return this.node(PRIMITIVE, parsed.value, index, parsed.end);
	  },
	  number: function () {
	    var source = this.source;
	    var startIndex = this.index;
	    var i = startIndex;
	    if (at(source, i) === '-') i++;
	    if (at(source, i) === '0') i++;
	    else if (exec$2(IS_NON_ZERO_DIGIT, at(source, i))) i = this.skip(IS_DIGIT, ++i);
	    else throw new SyntaxError$1('Failed to parse number at: ' + i);
	    if (at(source, i) === '.') i = this.skip(IS_DIGIT, ++i);
	    if (at(source, i) === 'e' || at(source, i) === 'E') {
	      i++;
	      if (at(source, i) === '+' || at(source, i) === '-') i++;
	      var exponentStartIndex = i;
	      i = this.skip(IS_DIGIT, i);
	      if (exponentStartIndex === i) throw new SyntaxError$1("Failed to parse number's exponent value at: " + i);
	    }
	    return this.node(PRIMITIVE, Number$1(slice(source, startIndex, i)), startIndex, i);
	  },
	  keyword: function (value) {
	    var keyword = '' + value;
	    var index = this.index;
	    var endIndex = index + keyword.length;
	    if (slice(this.source, index, endIndex) !== keyword) throw new SyntaxError$1('Failed to parse value at: ' + index);
	    return this.node(PRIMITIVE, value, index, endIndex);
	  },
	  skip: function (regex, i) {
	    var source = this.source;
	    for (; i < source.length; i++) if (!exec$2(regex, at(source, i))) break;
	    return i;
	  },
	  until: function (array, i) {
	    i = this.skip(IS_WHITESPACE, i);
	    var chr = at(this.source, i);
	    for (var j = 0; j < array.length; j++) if (array[j] === chr) return i;
	    throw new SyntaxError$1('Unexpected character: "' + chr + '" at: ' + i);
	  }
	};

	var NO_SOURCE_SUPPORT = fails$c(function () {
	  var unsafeInt = '9007199254740993';
	  var source;
	  nativeParse(unsafeInt, function (key, value, context) {
	    source = context.source;
	  });
	  return source !== unsafeInt;
	});

	var PROPER_BASE_PARSE = NATIVE_SYMBOL$4 && !fails$c(function () {
	  // Safari 9 bug
	  return 1 / nativeParse('-0 \t') !== -Infinity;
	});

	// `JSON.parse` method
	// https://tc39.es/ecma262/#sec-json.parse
	// https://github.com/tc39/proposal-json-parse-with-source
	$$m({ target: 'JSON', stat: true, forced: NO_SOURCE_SUPPORT }, {
	  parse: function parse(text, reviver) {
	    return PROPER_BASE_PARSE && !isCallable$3(reviver) ? nativeParse(text) : $parse(text, reviver);
	  }
	});

	var PROPER_FUNCTION_NAME = functionName.PROPER;
	var fails$b = fails$V;
	var whitespaces = whitespaces$2;

	var non = '\u200B\u0085\u180E';

	// check that a method works with the correct list
	// of whitespaces and has a correct name
	var stringTrimForced = function (METHOD_NAME) {
	  return fails$b(function () {
	    return !!whitespaces[METHOD_NAME]()
	      || non[METHOD_NAME]() !== non
	      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
	  });
	};

	var $$l = _export;
	var $trim = stringTrim.trim;
	var forcedStringTrimMethod = stringTrimForced;

	// `String.prototype.trim` method
	// https://tc39.es/ecma262/#sec-string.prototype.trim
	$$l({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
	  trim: function trim() {
	    return $trim(this);
	  }
	});

	var charAt$2 = stringMultibyte.charAt;
	var toString$5 = toString$l;
	var InternalStateModule$4 = internalState;
	var defineIterator$1 = iteratorDefine;
	var createIterResultObject$2 = createIterResultObject$5;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$4 = InternalStateModule$4.set;
	var getInternalState$1 = InternalStateModule$4.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator$1(String, 'String', function (iterated) {
	  setInternalState$4(this, {
	    type: STRING_ITERATOR,
	    string: toString$5(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$1(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return createIterResultObject$2(undefined, true);
	  point = charAt$2(string, index);
	  state.index += point.length;
	  return createIterResultObject$2(point, false);
	});

	var fails$a = fails$V;
	var wellKnownSymbol$6 = wellKnownSymbol$x;
	var DESCRIPTORS$6 = descriptors;
	var IS_PURE = isPure;

	var ITERATOR$1 = wellKnownSymbol$6('iterator');

	var urlConstructorDetection = !fails$a(function () {
	  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
	  var url = new URL('b?a=1&b=2&c=3', 'http://a');
	  var params = url.searchParams;
	  var params2 = new URLSearchParams('a=1&a=2&b=3');
	  var result = '';
	  url.pathname = 'c%20d';
	  params.forEach(function (value, key) {
	    params['delete']('b');
	    result += key + value;
	  });
	  params2['delete']('a', 2);
	  // `undefined` case is a Chromium 117 bug
	  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
	  params2['delete']('b', undefined);
	  return (IS_PURE && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b')))
	    || (!params.size && (IS_PURE || !DESCRIPTORS$6))
	    || !params.sort
	    || url.href !== 'http://a/c%20d?a=1&c=3'
	    || params.get('c') !== '3'
	    || String(new URLSearchParams('?a=1')) !== 'a=1'
	    || !params[ITERATOR$1]
	    // throws in Edge
	    || new URL('https://a@b').username !== 'a'
	    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
	    // not punycoded in Edge
	    || new URL('http://тест').host !== 'xn--e1aybc'
	    // not escaped in Chrome 62-
	    || new URL('http://a#б').hash !== '#%D0%B1'
	    // fails in Chrome 66-
	    || result !== 'a1c3'
	    // throws in Safari
	    || new URL('http://x', undefined).host !== 'x';
	});

	var bind$4 = functionBindContext;
	var call$3 = functionCall;
	var toObject$2 = toObject$i;
	var callWithSafeIterationClosing = callWithSafeIterationClosing$3;
	var isArrayIteratorMethod = isArrayIteratorMethod$3;
	var isConstructor = isConstructor$4;
	var lengthOfArrayLike = lengthOfArrayLike$m;
	var createProperty = createProperty$6;
	var getIterator$1 = getIterator$4;
	var getIteratorMethod$1 = getIteratorMethod$5;

	var $Array = Array;

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject$2(arrayLike);
	  var IS_CONSTRUCTOR = isConstructor(this);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  if (mapping) mapfn = bind$4(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
	  var iteratorMethod = getIteratorMethod$1(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = getIterator$1(O, iteratorMethod);
	    next = iterator.next;
	    result = IS_CONSTRUCTOR ? new this() : [];
	    for (;!(step = call$3(next, iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = lengthOfArrayLike(O);
	    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
	var uncurryThis$b = functionUncurryThis;

	var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
	var base = 36;
	var tMin = 1;
	var tMax = 26;
	var skew = 38;
	var damp = 700;
	var initialBias = 72;
	var initialN = 128; // 0x80
	var delimiter = '-'; // '\x2D'
	var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
	var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
	var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
	var baseMinusTMin = base - tMin;

	var $RangeError = RangeError;
	var exec$1 = uncurryThis$b(regexSeparators.exec);
	var floor$1 = Math.floor;
	var fromCharCode = String.fromCharCode;
	var charCodeAt = uncurryThis$b(''.charCodeAt);
	var join$3 = uncurryThis$b([].join);
	var push$6 = uncurryThis$b([].push);
	var replace$3 = uncurryThis$b(''.replace);
	var split$2 = uncurryThis$b(''.split);
	var toLowerCase$1 = uncurryThis$b(''.toLowerCase);

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 */
	var ucs2decode = function (string) {
	  var output = [];
	  var counter = 0;
	  var length = string.length;
	  while (counter < length) {
	    var value = charCodeAt(string, counter++);
	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	      // It's a high surrogate, and there is a next character.
	      var extra = charCodeAt(string, counter++);
	      if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
	        push$6(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        // It's an unmatched surrogate; only append this code unit, in case the
	        // next code unit is the high surrogate of a surrogate pair.
	        push$6(output, value);
	        counter--;
	      }
	    } else {
	      push$6(output, value);
	    }
	  }
	  return output;
	};

	/**
	 * Converts a digit/integer into a basic code point.
	 */
	var digitToBasic = function (digit) {
	  //  0..25 map to ASCII a..z or A..Z
	  // 26..35 map to ASCII 0..9
	  return digit + 22 + 75 * (digit < 26);
	};

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 */
	var adapt = function (delta, numPoints, firstTime) {
	  var k = 0;
	  delta = firstTime ? floor$1(delta / damp) : delta >> 1;
	  delta += floor$1(delta / numPoints);
	  while (delta > baseMinusTMin * tMax >> 1) {
	    delta = floor$1(delta / baseMinusTMin);
	    k += base;
	  }
	  return floor$1(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 */
	var encode = function (input) {
	  var output = [];

	  // Convert the input in UCS-2 to an array of Unicode code points.
	  input = ucs2decode(input);

	  // Cache the length.
	  var inputLength = input.length;

	  // Initialize the state.
	  var n = initialN;
	  var delta = 0;
	  var bias = initialBias;
	  var i, currentValue;

	  // Handle the basic code points.
	  for (i = 0; i < input.length; i++) {
	    currentValue = input[i];
	    if (currentValue < 0x80) {
	      push$6(output, fromCharCode(currentValue));
	    }
	  }

	  var basicLength = output.length; // number of basic code points.
	  var handledCPCount = basicLength; // number of code points that have been handled;

	  // Finish the basic string with a delimiter unless it's empty.
	  if (basicLength) {
	    push$6(output, delimiter);
	  }

	  // Main encoding loop:
	  while (handledCPCount < inputLength) {
	    // All non-basic code points < n have been handled already. Find the next larger one:
	    var m = maxInt;
	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue >= n && currentValue < m) {
	        m = currentValue;
	      }
	    }

	    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
	    var handledCPCountPlusOne = handledCPCount + 1;
	    if (m - n > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
	      throw new $RangeError(OVERFLOW_ERROR);
	    }

	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;

	    for (i = 0; i < input.length; i++) {
	      currentValue = input[i];
	      if (currentValue < n && ++delta > maxInt) {
	        throw new $RangeError(OVERFLOW_ERROR);
	      }
	      if (currentValue === n) {
	        // Represent delta as a generalized variable-length integer.
	        var q = delta;
	        var k = base;
	        while (true) {
	          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
	          if (q < t) break;
	          var qMinusT = q - t;
	          var baseMinusT = base - t;
	          push$6(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
	          q = floor$1(qMinusT / baseMinusT);
	          k += base;
	        }

	        push$6(output, fromCharCode(digitToBasic(q)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
	        delta = 0;
	        handledCPCount++;
	      }
	    }

	    delta++;
	    n++;
	  }
	  return join$3(output, '');
	};

	var stringPunycodeToAscii = function (input) {
	  var encoded = [];
	  var labels = split$2(replace$3(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
	  var i, label;
	  for (i = 0; i < labels.length; i++) {
	    label = labels[i];
	    push$6(encoded, exec$1(regexNonASCII, label) ? 'xn--' + encode(label) : label);
	  }
	  return join$3(encoded, '.');
	};

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

	var $$k = _export;
	var global$7 = global$N;
	var call$2 = functionCall;
	var uncurryThis$a = functionUncurryThis;
	var DESCRIPTORS$5 = descriptors;
	var USE_NATIVE_URL$1 = urlConstructorDetection;
	var defineBuiltIn$7 = defineBuiltIn$j;
	var defineBuiltInAccessor$5 = defineBuiltInAccessor$f;
	var defineBuiltIns$1 = defineBuiltIns$4;
	var setToStringTag$4 = setToStringTag$9;
	var createIteratorConstructor = iteratorCreateConstructor;
	var InternalStateModule$3 = internalState;
	var anInstance$3 = anInstance$8;
	var isCallable$2 = isCallable$w;
	var hasOwn$9 = hasOwnProperty_1;
	var bind$3 = functionBindContext;
	var classof$2 = classof$k;
	var anObject$5 = anObject$u;
	var isObject$6 = isObject$p;
	var $toString$2 = toString$l;
	var create$2 = objectCreate;
	var createPropertyDescriptor$1 = createPropertyDescriptor$8;
	var getIterator = getIterator$4;
	var getIteratorMethod = getIteratorMethod$5;
	var createIterResultObject$1 = createIterResultObject$5;
	var validateArgumentsLength$3 = validateArgumentsLength$5;
	var wellKnownSymbol$5 = wellKnownSymbol$x;
	var arraySort = arraySort$1;

	var ITERATOR = wellKnownSymbol$5('iterator');
	var URL_SEARCH_PARAMS = 'URLSearchParams';
	var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
	var setInternalState$3 = InternalStateModule$3.set;
	var getInternalParamsState = InternalStateModule$3.getterFor(URL_SEARCH_PARAMS);
	var getInternalIteratorState = InternalStateModule$3.getterFor(URL_SEARCH_PARAMS_ITERATOR);
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Avoid NodeJS experimental warning
	var safeGetBuiltIn = function (name) {
	  if (!DESCRIPTORS$5) return global$7[name];
	  var descriptor = getOwnPropertyDescriptor(global$7, name);
	  return descriptor && descriptor.value;
	};

	var nativeFetch = safeGetBuiltIn('fetch');
	var NativeRequest = safeGetBuiltIn('Request');
	var Headers = safeGetBuiltIn('Headers');
	var RequestPrototype = NativeRequest && NativeRequest.prototype;
	var HeadersPrototype = Headers && Headers.prototype;
	var RegExp$1 = global$7.RegExp;
	var TypeError$3 = global$7.TypeError;
	var decodeURIComponent = global$7.decodeURIComponent;
	var encodeURIComponent$1 = global$7.encodeURIComponent;
	var charAt$1 = uncurryThis$a(''.charAt);
	var join$2 = uncurryThis$a([].join);
	var push$5 = uncurryThis$a([].push);
	var replace$2 = uncurryThis$a(''.replace);
	var shift$1 = uncurryThis$a([].shift);
	var splice = uncurryThis$a([].splice);
	var split$1 = uncurryThis$a(''.split);
	var stringSlice$2 = uncurryThis$a(''.slice);

	var plus = /\+/g;
	var sequences = Array(4);

	var percentSequence = function (bytes) {
	  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$1('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
	};

	var percentDecode = function (sequence) {
	  try {
	    return decodeURIComponent(sequence);
	  } catch (error) {
	    return sequence;
	  }
	};

	var deserialize = function (it) {
	  var result = replace$2(it, plus, ' ');
	  var bytes = 4;
	  try {
	    return decodeURIComponent(result);
	  } catch (error) {
	    while (bytes) {
	      result = replace$2(result, percentSequence(bytes--), percentDecode);
	    }
	    return result;
	  }
	};

	var find = /[!'()~]|%20/g;

	var replacements = {
	  '!': '%21',
	  "'": '%27',
	  '(': '%28',
	  ')': '%29',
	  '~': '%7E',
	  '%20': '+'
	};

	var replacer = function (match) {
	  return replacements[match];
	};

	var serialize = function (it) {
	  return replace$2(encodeURIComponent$1(it), find, replacer);
	};

	var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
	  setInternalState$3(this, {
	    type: URL_SEARCH_PARAMS_ITERATOR,
	    target: getInternalParamsState(params).entries,
	    index: 0,
	    kind: kind
	  });
	}, URL_SEARCH_PARAMS, function next() {
	  var state = getInternalIteratorState(this);
	  var target = state.target;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return createIterResultObject$1(undefined, true);
	  }
	  var entry = target[index];
	  switch (state.kind) {
	    case 'keys': return createIterResultObject$1(entry.key, false);
	    case 'values': return createIterResultObject$1(entry.value, false);
	  } return createIterResultObject$1([entry.key, entry.value], false);
	}, true);

	var URLSearchParamsState = function (init) {
	  this.entries = [];
	  this.url = null;

	  if (init !== undefined) {
	    if (isObject$6(init)) this.parseObject(init);
	    else this.parseQuery(typeof init == 'string' ? charAt$1(init, 0) === '?' ? stringSlice$2(init, 1) : init : $toString$2(init));
	  }
	};

	URLSearchParamsState.prototype = {
	  type: URL_SEARCH_PARAMS,
	  bindURL: function (url) {
	    this.url = url;
	    this.update();
	  },
	  parseObject: function (object) {
	    var entries = this.entries;
	    var iteratorMethod = getIteratorMethod(object);
	    var iterator, next, step, entryIterator, entryNext, first, second;

	    if (iteratorMethod) {
	      iterator = getIterator(object, iteratorMethod);
	      next = iterator.next;
	      while (!(step = call$2(next, iterator)).done) {
	        entryIterator = getIterator(anObject$5(step.value));
	        entryNext = entryIterator.next;
	        if (
	          (first = call$2(entryNext, entryIterator)).done ||
	          (second = call$2(entryNext, entryIterator)).done ||
	          !call$2(entryNext, entryIterator).done
	        ) throw new TypeError$3('Expected sequence with length 2');
	        push$5(entries, { key: $toString$2(first.value), value: $toString$2(second.value) });
	      }
	    } else for (var key in object) if (hasOwn$9(object, key)) {
	      push$5(entries, { key: key, value: $toString$2(object[key]) });
	    }
	  },
	  parseQuery: function (query) {
	    if (query) {
	      var entries = this.entries;
	      var attributes = split$1(query, '&');
	      var index = 0;
	      var attribute, entry;
	      while (index < attributes.length) {
	        attribute = attributes[index++];
	        if (attribute.length) {
	          entry = split$1(attribute, '=');
	          push$5(entries, {
	            key: deserialize(shift$1(entry)),
	            value: deserialize(join$2(entry, '='))
	          });
	        }
	      }
	    }
	  },
	  serialize: function () {
	    var entries = this.entries;
	    var result = [];
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      push$5(result, serialize(entry.key) + '=' + serialize(entry.value));
	    } return join$2(result, '&');
	  },
	  update: function () {
	    this.entries.length = 0;
	    this.parseQuery(this.url.query);
	  },
	  updateURL: function () {
	    if (this.url) this.url.update();
	  }
	};

	// `URLSearchParams` constructor
	// https://url.spec.whatwg.org/#interface-urlsearchparams
	var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
	  anInstance$3(this, URLSearchParamsPrototype$3);
	  var init = arguments.length > 0 ? arguments[0] : undefined;
	  var state = setInternalState$3(this, new URLSearchParamsState(init));
	  if (!DESCRIPTORS$5) this.size = state.entries.length;
	};

	var URLSearchParamsPrototype$3 = URLSearchParamsConstructor.prototype;

	defineBuiltIns$1(URLSearchParamsPrototype$3, {
	  // `URLSearchParams.prototype.append` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
	  append: function append(name, value) {
	    var state = getInternalParamsState(this);
	    validateArgumentsLength$3(arguments.length, 2);
	    push$5(state.entries, { key: $toString$2(name), value: $toString$2(value) });
	    if (!DESCRIPTORS$5) this.length++;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.delete` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
	  'delete': function (name /* , value */) {
	    var state = getInternalParamsState(this);
	    var length = validateArgumentsLength$3(arguments.length, 1);
	    var entries = state.entries;
	    var key = $toString$2(name);
	    var $value = length < 2 ? undefined : arguments[1];
	    var value = $value === undefined ? $value : $toString$2($value);
	    var index = 0;
	    while (index < entries.length) {
	      var entry = entries[index];
	      if (entry.key === key && (value === undefined || entry.value === value)) {
	        splice(entries, index, 1);
	        if (value !== undefined) break;
	      } else index++;
	    }
	    if (!DESCRIPTORS$5) this.size = entries.length;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.get` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
	  get: function get(name) {
	    var entries = getInternalParamsState(this).entries;
	    validateArgumentsLength$3(arguments.length, 1);
	    var key = $toString$2(name);
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) return entries[index].value;
	    }
	    return null;
	  },
	  // `URLSearchParams.prototype.getAll` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
	  getAll: function getAll(name) {
	    var entries = getInternalParamsState(this).entries;
	    validateArgumentsLength$3(arguments.length, 1);
	    var key = $toString$2(name);
	    var result = [];
	    var index = 0;
	    for (; index < entries.length; index++) {
	      if (entries[index].key === key) push$5(result, entries[index].value);
	    }
	    return result;
	  },
	  // `URLSearchParams.prototype.has` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
	  has: function has(name /* , value */) {
	    var entries = getInternalParamsState(this).entries;
	    var length = validateArgumentsLength$3(arguments.length, 1);
	    var key = $toString$2(name);
	    var $value = length < 2 ? undefined : arguments[1];
	    var value = $value === undefined ? $value : $toString$2($value);
	    var index = 0;
	    while (index < entries.length) {
	      var entry = entries[index++];
	      if (entry.key === key && (value === undefined || entry.value === value)) return true;
	    }
	    return false;
	  },
	  // `URLSearchParams.prototype.set` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
	  set: function set(name, value) {
	    var state = getInternalParamsState(this);
	    validateArgumentsLength$3(arguments.length, 1);
	    var entries = state.entries;
	    var found = false;
	    var key = $toString$2(name);
	    var val = $toString$2(value);
	    var index = 0;
	    var entry;
	    for (; index < entries.length; index++) {
	      entry = entries[index];
	      if (entry.key === key) {
	        if (found) splice(entries, index--, 1);
	        else {
	          found = true;
	          entry.value = val;
	        }
	      }
	    }
	    if (!found) push$5(entries, { key: key, value: val });
	    if (!DESCRIPTORS$5) this.size = entries.length;
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.sort` method
	  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
	  sort: function sort() {
	    var state = getInternalParamsState(this);
	    arraySort(state.entries, function (a, b) {
	      return a.key > b.key ? 1 : -1;
	    });
	    state.updateURL();
	  },
	  // `URLSearchParams.prototype.forEach` method
	  forEach: function forEach(callback /* , thisArg */) {
	    var entries = getInternalParamsState(this).entries;
	    var boundFunction = bind$3(callback, arguments.length > 1 ? arguments[1] : undefined);
	    var index = 0;
	    var entry;
	    while (index < entries.length) {
	      entry = entries[index++];
	      boundFunction(entry.value, entry.key, this);
	    }
	  },
	  // `URLSearchParams.prototype.keys` method
	  keys: function keys() {
	    return new URLSearchParamsIterator(this, 'keys');
	  },
	  // `URLSearchParams.prototype.values` method
	  values: function values() {
	    return new URLSearchParamsIterator(this, 'values');
	  },
	  // `URLSearchParams.prototype.entries` method
	  entries: function entries() {
	    return new URLSearchParamsIterator(this, 'entries');
	  }
	}, { enumerable: true });

	// `URLSearchParams.prototype[@@iterator]` method
	defineBuiltIn$7(URLSearchParamsPrototype$3, ITERATOR, URLSearchParamsPrototype$3.entries, { name: 'entries' });

	// `URLSearchParams.prototype.toString` method
	// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
	defineBuiltIn$7(URLSearchParamsPrototype$3, 'toString', function toString() {
	  return getInternalParamsState(this).serialize();
	}, { enumerable: true });

	// `URLSearchParams.prototype.size` getter
	// https://github.com/whatwg/url/pull/734
	if (DESCRIPTORS$5) defineBuiltInAccessor$5(URLSearchParamsPrototype$3, 'size', {
	  get: function size() {
	    return getInternalParamsState(this).entries.length;
	  },
	  configurable: true,
	  enumerable: true
	});

	setToStringTag$4(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

	$$k({ global: true, constructor: true, forced: !USE_NATIVE_URL$1 }, {
	  URLSearchParams: URLSearchParamsConstructor
	});

	// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
	if (!USE_NATIVE_URL$1 && isCallable$2(Headers)) {
	  var headersHas = uncurryThis$a(HeadersPrototype.has);
	  var headersSet = uncurryThis$a(HeadersPrototype.set);

	  var wrapRequestOptions = function (init) {
	    if (isObject$6(init)) {
	      var body = init.body;
	      var headers;
	      if (classof$2(body) === URL_SEARCH_PARAMS) {
	        headers = init.headers ? new Headers(init.headers) : new Headers();
	        if (!headersHas(headers, 'content-type')) {
	          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	        return create$2(init, {
	          body: createPropertyDescriptor$1(0, $toString$2(body)),
	          headers: createPropertyDescriptor$1(0, headers)
	        });
	      }
	    } return init;
	  };

	  if (isCallable$2(nativeFetch)) {
	    $$k({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
	      fetch: function fetch(input /* , init */) {
	        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	      }
	    });
	  }

	  if (isCallable$2(NativeRequest)) {
	    var RequestConstructor = function Request(input /* , init */) {
	      anInstance$3(this, RequestPrototype);
	      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
	    };

	    RequestPrototype.constructor = RequestConstructor;
	    RequestConstructor.prototype = RequestPrototype;

	    $$k({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
	      Request: RequestConstructor
	    });
	  }
	}

	var web_urlSearchParams_constructor = {
	  URLSearchParams: URLSearchParamsConstructor,
	  getState: getInternalParamsState
	};

	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

	var $$j = _export;
	var DESCRIPTORS$4 = descriptors;
	var USE_NATIVE_URL = urlConstructorDetection;
	var global$6 = global$N;
	var bind$2 = functionBindContext;
	var uncurryThis$9 = functionUncurryThis;
	var defineBuiltIn$6 = defineBuiltIn$j;
	var defineBuiltInAccessor$4 = defineBuiltInAccessor$f;
	var anInstance$2 = anInstance$8;
	var hasOwn$8 = hasOwnProperty_1;
	var assign = objectAssign;
	var arrayFrom = arrayFrom$1;
	var arraySlice$2 = arraySliceSimple;
	var codeAt = stringMultibyte.codeAt;
	var toASCII = stringPunycodeToAscii;
	var $toString$1 = toString$l;
	var setToStringTag$3 = setToStringTag$9;
	var validateArgumentsLength$2 = validateArgumentsLength$5;
	var URLSearchParamsModule = web_urlSearchParams_constructor;
	var InternalStateModule$2 = internalState;

	var setInternalState$2 = InternalStateModule$2.set;
	var getInternalURLState = InternalStateModule$2.getterFor('URL');
	var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
	var getInternalSearchParamsState = URLSearchParamsModule.getState;

	var NativeURL = global$6.URL;
	var TypeError$2 = global$6.TypeError;
	var parseInt$1 = global$6.parseInt;
	var floor = Math.floor;
	var pow = Math.pow;
	var charAt = uncurryThis$9(''.charAt);
	var exec = uncurryThis$9(/./.exec);
	var join$1 = uncurryThis$9([].join);
	var numberToString = uncurryThis$9(1.0.toString);
	var pop = uncurryThis$9([].pop);
	var push$4 = uncurryThis$9([].push);
	var replace$1 = uncurryThis$9(''.replace);
	var shift = uncurryThis$9([].shift);
	var split = uncurryThis$9(''.split);
	var stringSlice$1 = uncurryThis$9(''.slice);
	var toLowerCase = uncurryThis$9(''.toLowerCase);
	var unshift = uncurryThis$9([].unshift);

	var INVALID_AUTHORITY = 'Invalid authority';
	var INVALID_SCHEME = 'Invalid scheme';
	var INVALID_HOST = 'Invalid host';
	var INVALID_PORT = 'Invalid port';

	var ALPHA = /[a-z]/i;
	// eslint-disable-next-line regexp/no-obscure-range -- safe
	var ALPHANUMERIC = /[\d+-.a-z]/i;
	var DIGIT = /\d/;
	var HEX_START = /^0x/i;
	var OCT = /^[0-7]+$/;
	var DEC = /^\d+$/;
	var HEX = /^[\da-f]+$/i;
	/* eslint-disable regexp/no-control-character -- safe */
	var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
	var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
	var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
	var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
	var TAB_AND_NEW_LINE = /[\t\n\r]/g;
	/* eslint-enable regexp/no-control-character -- safe */
	var EOF;

	// https://url.spec.whatwg.org/#ipv4-number-parser
	var parseIPv4 = function (input) {
	  var parts = split(input, '.');
	  var partsLength, numbers, index, part, radix, number, ipv4;
	  if (parts.length && parts[parts.length - 1] === '') {
	    parts.length--;
	  }
	  partsLength = parts.length;
	  if (partsLength > 4) return input;
	  numbers = [];
	  for (index = 0; index < partsLength; index++) {
	    part = parts[index];
	    if (part === '') return input;
	    radix = 10;
	    if (part.length > 1 && charAt(part, 0) === '0') {
	      radix = exec(HEX_START, part) ? 16 : 8;
	      part = stringSlice$1(part, radix === 8 ? 1 : 2);
	    }
	    if (part === '') {
	      number = 0;
	    } else {
	      if (!exec(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input;
	      number = parseInt$1(part, radix);
	    }
	    push$4(numbers, number);
	  }
	  for (index = 0; index < partsLength; index++) {
	    number = numbers[index];
	    if (index === partsLength - 1) {
	      if (number >= pow(256, 5 - partsLength)) return null;
	    } else if (number > 255) return null;
	  }
	  ipv4 = pop(numbers);
	  for (index = 0; index < numbers.length; index++) {
	    ipv4 += numbers[index] * pow(256, 3 - index);
	  }
	  return ipv4;
	};

	// https://url.spec.whatwg.org/#concept-ipv6-parser
	// eslint-disable-next-line max-statements -- TODO
	var parseIPv6 = function (input) {
	  var address = [0, 0, 0, 0, 0, 0, 0, 0];
	  var pieceIndex = 0;
	  var compress = null;
	  var pointer = 0;
	  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

	  var chr = function () {
	    return charAt(input, pointer);
	  };

	  if (chr() === ':') {
	    if (charAt(input, 1) !== ':') return;
	    pointer += 2;
	    pieceIndex++;
	    compress = pieceIndex;
	  }
	  while (chr()) {
	    if (pieceIndex === 8) return;
	    if (chr() === ':') {
	      if (compress !== null) return;
	      pointer++;
	      pieceIndex++;
	      compress = pieceIndex;
	      continue;
	    }
	    value = length = 0;
	    while (length < 4 && exec(HEX, chr())) {
	      value = value * 16 + parseInt$1(chr(), 16);
	      pointer++;
	      length++;
	    }
	    if (chr() === '.') {
	      if (length === 0) return;
	      pointer -= length;
	      if (pieceIndex > 6) return;
	      numbersSeen = 0;
	      while (chr()) {
	        ipv4Piece = null;
	        if (numbersSeen > 0) {
	          if (chr() === '.' && numbersSeen < 4) pointer++;
	          else return;
	        }
	        if (!exec(DIGIT, chr())) return;
	        while (exec(DIGIT, chr())) {
	          number = parseInt$1(chr(), 10);
	          if (ipv4Piece === null) ipv4Piece = number;
	          else if (ipv4Piece === 0) return;
	          else ipv4Piece = ipv4Piece * 10 + number;
	          if (ipv4Piece > 255) return;
	          pointer++;
	        }
	        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
	        numbersSeen++;
	        if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
	      }
	      if (numbersSeen !== 4) return;
	      break;
	    } else if (chr() === ':') {
	      pointer++;
	      if (!chr()) return;
	    } else if (chr()) return;
	    address[pieceIndex++] = value;
	  }
	  if (compress !== null) {
	    swaps = pieceIndex - compress;
	    pieceIndex = 7;
	    while (pieceIndex !== 0 && swaps > 0) {
	      swap = address[pieceIndex];
	      address[pieceIndex--] = address[compress + swaps - 1];
	      address[compress + --swaps] = swap;
	    }
	  } else if (pieceIndex !== 8) return;
	  return address;
	};

	var findLongestZeroSequence = function (ipv6) {
	  var maxIndex = null;
	  var maxLength = 1;
	  var currStart = null;
	  var currLength = 0;
	  var index = 0;
	  for (; index < 8; index++) {
	    if (ipv6[index] !== 0) {
	      if (currLength > maxLength) {
	        maxIndex = currStart;
	        maxLength = currLength;
	      }
	      currStart = null;
	      currLength = 0;
	    } else {
	      if (currStart === null) currStart = index;
	      ++currLength;
	    }
	  }
	  if (currLength > maxLength) {
	    maxIndex = currStart;
	    maxLength = currLength;
	  }
	  return maxIndex;
	};

	// https://url.spec.whatwg.org/#host-serializing
	var serializeHost = function (host) {
	  var result, index, compress, ignore0;
	  // ipv4
	  if (typeof host == 'number') {
	    result = [];
	    for (index = 0; index < 4; index++) {
	      unshift(result, host % 256);
	      host = floor(host / 256);
	    } return join$1(result, '.');
	  // ipv6
	  } else if (typeof host == 'object') {
	    result = '';
	    compress = findLongestZeroSequence(host);
	    for (index = 0; index < 8; index++) {
	      if (ignore0 && host[index] === 0) continue;
	      if (ignore0) ignore0 = false;
	      if (compress === index) {
	        result += index ? ':' : '::';
	        ignore0 = true;
	      } else {
	        result += numberToString(host[index], 16);
	        if (index < 7) result += ':';
	      }
	    }
	    return '[' + result + ']';
	  } return host;
	};

	var C0ControlPercentEncodeSet = {};
	var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
	  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
	});
	var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
	  '#': 1, '?': 1, '{': 1, '}': 1
	});
	var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
	  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
	});

	var percentEncode = function (chr, set) {
	  var code = codeAt(chr, 0);
	  return code > 0x20 && code < 0x7F && !hasOwn$8(set, chr) ? chr : encodeURIComponent(chr);
	};

	// https://url.spec.whatwg.org/#special-scheme
	var specialSchemes = {
	  ftp: 21,
	  file: null,
	  http: 80,
	  https: 443,
	  ws: 80,
	  wss: 443
	};

	// https://url.spec.whatwg.org/#windows-drive-letter
	var isWindowsDriveLetter = function (string, normalized) {
	  var second;
	  return string.length === 2 && exec(ALPHA, charAt(string, 0))
	    && ((second = charAt(string, 1)) === ':' || (!normalized && second === '|'));
	};

	// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
	var startsWithWindowsDriveLetter = function (string) {
	  var third;
	  return string.length > 1 && isWindowsDriveLetter(stringSlice$1(string, 0, 2)) && (
	    string.length === 2 ||
	    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
	  );
	};

	// https://url.spec.whatwg.org/#single-dot-path-segment
	var isSingleDot = function (segment) {
	  return segment === '.' || toLowerCase(segment) === '%2e';
	};

	// https://url.spec.whatwg.org/#double-dot-path-segment
	var isDoubleDot = function (segment) {
	  segment = toLowerCase(segment);
	  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
	};

	// States:
	var SCHEME_START = {};
	var SCHEME = {};
	var NO_SCHEME = {};
	var SPECIAL_RELATIVE_OR_AUTHORITY = {};
	var PATH_OR_AUTHORITY = {};
	var RELATIVE = {};
	var RELATIVE_SLASH = {};
	var SPECIAL_AUTHORITY_SLASHES = {};
	var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
	var AUTHORITY = {};
	var HOST = {};
	var HOSTNAME = {};
	var PORT = {};
	var FILE = {};
	var FILE_SLASH = {};
	var FILE_HOST = {};
	var PATH_START = {};
	var PATH = {};
	var CANNOT_BE_A_BASE_URL_PATH = {};
	var QUERY = {};
	var FRAGMENT = {};

	var URLState = function (url, isBase, base) {
	  var urlString = $toString$1(url);
	  var baseState, failure, searchParams;
	  if (isBase) {
	    failure = this.parse(urlString);
	    if (failure) throw new TypeError$2(failure);
	    this.searchParams = null;
	  } else {
	    if (base !== undefined) baseState = new URLState(base, true);
	    failure = this.parse(urlString, null, baseState);
	    if (failure) throw new TypeError$2(failure);
	    searchParams = getInternalSearchParamsState(new URLSearchParams$1());
	    searchParams.bindURL(this);
	    this.searchParams = searchParams;
	  }
	};

	URLState.prototype = {
	  type: 'URL',
	  // https://url.spec.whatwg.org/#url-parsing
	  // eslint-disable-next-line max-statements -- TODO
	  parse: function (input, stateOverride, base) {
	    var url = this;
	    var state = stateOverride || SCHEME_START;
	    var pointer = 0;
	    var buffer = '';
	    var seenAt = false;
	    var seenBracket = false;
	    var seenPasswordToken = false;
	    var codePoints, chr, bufferCodePoints, failure;

	    input = $toString$1(input);

	    if (!stateOverride) {
	      url.scheme = '';
	      url.username = '';
	      url.password = '';
	      url.host = null;
	      url.port = null;
	      url.path = [];
	      url.query = null;
	      url.fragment = null;
	      url.cannotBeABaseURL = false;
	      input = replace$1(input, LEADING_C0_CONTROL_OR_SPACE, '');
	      input = replace$1(input, TRAILING_C0_CONTROL_OR_SPACE, '$1');
	    }

	    input = replace$1(input, TAB_AND_NEW_LINE, '');

	    codePoints = arrayFrom(input);

	    while (pointer <= codePoints.length) {
	      chr = codePoints[pointer];
	      switch (state) {
	        case SCHEME_START:
	          if (chr && exec(ALPHA, chr)) {
	            buffer += toLowerCase(chr);
	            state = SCHEME;
	          } else if (!stateOverride) {
	            state = NO_SCHEME;
	            continue;
	          } else return INVALID_SCHEME;
	          break;

	        case SCHEME:
	          if (chr && (exec(ALPHANUMERIC, chr) || chr === '+' || chr === '-' || chr === '.')) {
	            buffer += toLowerCase(chr);
	          } else if (chr === ':') {
	            if (stateOverride && (
	              (url.isSpecial() !== hasOwn$8(specialSchemes, buffer)) ||
	              (buffer === 'file' && (url.includesCredentials() || url.port !== null)) ||
	              (url.scheme === 'file' && !url.host)
	            )) return;
	            url.scheme = buffer;
	            if (stateOverride) {
	              if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null;
	              return;
	            }
	            buffer = '';
	            if (url.scheme === 'file') {
	              state = FILE;
	            } else if (url.isSpecial() && base && base.scheme === url.scheme) {
	              state = SPECIAL_RELATIVE_OR_AUTHORITY;
	            } else if (url.isSpecial()) {
	              state = SPECIAL_AUTHORITY_SLASHES;
	            } else if (codePoints[pointer + 1] === '/') {
	              state = PATH_OR_AUTHORITY;
	              pointer++;
	            } else {
	              url.cannotBeABaseURL = true;
	              push$4(url.path, '');
	              state = CANNOT_BE_A_BASE_URL_PATH;
	            }
	          } else if (!stateOverride) {
	            buffer = '';
	            state = NO_SCHEME;
	            pointer = 0;
	            continue;
	          } else return INVALID_SCHEME;
	          break;

	        case NO_SCHEME:
	          if (!base || (base.cannotBeABaseURL && chr !== '#')) return INVALID_SCHEME;
	          if (base.cannotBeABaseURL && chr === '#') {
	            url.scheme = base.scheme;
	            url.path = arraySlice$2(base.path);
	            url.query = base.query;
	            url.fragment = '';
	            url.cannotBeABaseURL = true;
	            state = FRAGMENT;
	            break;
	          }
	          state = base.scheme === 'file' ? FILE : RELATIVE;
	          continue;

	        case SPECIAL_RELATIVE_OR_AUTHORITY:
	          if (chr === '/' && codePoints[pointer + 1] === '/') {
	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	            pointer++;
	          } else {
	            state = RELATIVE;
	            continue;
	          } break;

	        case PATH_OR_AUTHORITY:
	          if (chr === '/') {
	            state = AUTHORITY;
	            break;
	          } else {
	            state = PATH;
	            continue;
	          }

	        case RELATIVE:
	          url.scheme = base.scheme;
	          if (chr === EOF) {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$2(base.path);
	            url.query = base.query;
	          } else if (chr === '/' || (chr === '\\' && url.isSpecial())) {
	            state = RELATIVE_SLASH;
	          } else if (chr === '?') {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$2(base.path);
	            url.query = '';
	            state = QUERY;
	          } else if (chr === '#') {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$2(base.path);
	            url.query = base.query;
	            url.fragment = '';
	            state = FRAGMENT;
	          } else {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            url.path = arraySlice$2(base.path);
	            url.path.length--;
	            state = PATH;
	            continue;
	          } break;

	        case RELATIVE_SLASH:
	          if (url.isSpecial() && (chr === '/' || chr === '\\')) {
	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          } else if (chr === '/') {
	            state = AUTHORITY;
	          } else {
	            url.username = base.username;
	            url.password = base.password;
	            url.host = base.host;
	            url.port = base.port;
	            state = PATH;
	            continue;
	          } break;

	        case SPECIAL_AUTHORITY_SLASHES:
	          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
	          if (chr !== '/' || charAt(buffer, pointer + 1) !== '/') continue;
	          pointer++;
	          break;

	        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
	          if (chr !== '/' && chr !== '\\') {
	            state = AUTHORITY;
	            continue;
	          } break;

	        case AUTHORITY:
	          if (chr === '@') {
	            if (seenAt) buffer = '%40' + buffer;
	            seenAt = true;
	            bufferCodePoints = arrayFrom(buffer);
	            for (var i = 0; i < bufferCodePoints.length; i++) {
	              var codePoint = bufferCodePoints[i];
	              if (codePoint === ':' && !seenPasswordToken) {
	                seenPasswordToken = true;
	                continue;
	              }
	              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
	              if (seenPasswordToken) url.password += encodedCodePoints;
	              else url.username += encodedCodePoints;
	            }
	            buffer = '';
	          } else if (
	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
	            (chr === '\\' && url.isSpecial())
	          ) {
	            if (seenAt && buffer === '') return INVALID_AUTHORITY;
	            pointer -= arrayFrom(buffer).length + 1;
	            buffer = '';
	            state = HOST;
	          } else buffer += chr;
	          break;

	        case HOST:
	        case HOSTNAME:
	          if (stateOverride && url.scheme === 'file') {
	            state = FILE_HOST;
	            continue;
	          } else if (chr === ':' && !seenBracket) {
	            if (buffer === '') return INVALID_HOST;
	            failure = url.parseHost(buffer);
	            if (failure) return failure;
	            buffer = '';
	            state = PORT;
	            if (stateOverride === HOSTNAME) return;
	          } else if (
	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
	            (chr === '\\' && url.isSpecial())
	          ) {
	            if (url.isSpecial() && buffer === '') return INVALID_HOST;
	            if (stateOverride && buffer === '' && (url.includesCredentials() || url.port !== null)) return;
	            failure = url.parseHost(buffer);
	            if (failure) return failure;
	            buffer = '';
	            state = PATH_START;
	            if (stateOverride) return;
	            continue;
	          } else {
	            if (chr === '[') seenBracket = true;
	            else if (chr === ']') seenBracket = false;
	            buffer += chr;
	          } break;

	        case PORT:
	          if (exec(DIGIT, chr)) {
	            buffer += chr;
	          } else if (
	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
	            (chr === '\\' && url.isSpecial()) ||
	            stateOverride
	          ) {
	            if (buffer !== '') {
	              var port = parseInt$1(buffer, 10);
	              if (port > 0xFFFF) return INVALID_PORT;
	              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
	              buffer = '';
	            }
	            if (stateOverride) return;
	            state = PATH_START;
	            continue;
	          } else return INVALID_PORT;
	          break;

	        case FILE:
	          url.scheme = 'file';
	          if (chr === '/' || chr === '\\') state = FILE_SLASH;
	          else if (base && base.scheme === 'file') {
	            switch (chr) {
	              case EOF:
	                url.host = base.host;
	                url.path = arraySlice$2(base.path);
	                url.query = base.query;
	                break;
	              case '?':
	                url.host = base.host;
	                url.path = arraySlice$2(base.path);
	                url.query = '';
	                state = QUERY;
	                break;
	              case '#':
	                url.host = base.host;
	                url.path = arraySlice$2(base.path);
	                url.query = base.query;
	                url.fragment = '';
	                state = FRAGMENT;
	                break;
	              default:
	                if (!startsWithWindowsDriveLetter(join$1(arraySlice$2(codePoints, pointer), ''))) {
	                  url.host = base.host;
	                  url.path = arraySlice$2(base.path);
	                  url.shortenPath();
	                }
	                state = PATH;
	                continue;
	            }
	          } else {
	            state = PATH;
	            continue;
	          } break;

	        case FILE_SLASH:
	          if (chr === '/' || chr === '\\') {
	            state = FILE_HOST;
	            break;
	          }
	          if (base && base.scheme === 'file' && !startsWithWindowsDriveLetter(join$1(arraySlice$2(codePoints, pointer), ''))) {
	            if (isWindowsDriveLetter(base.path[0], true)) push$4(url.path, base.path[0]);
	            else url.host = base.host;
	          }
	          state = PATH;
	          continue;

	        case FILE_HOST:
	          if (chr === EOF || chr === '/' || chr === '\\' || chr === '?' || chr === '#') {
	            if (!stateOverride && isWindowsDriveLetter(buffer)) {
	              state = PATH;
	            } else if (buffer === '') {
	              url.host = '';
	              if (stateOverride) return;
	              state = PATH_START;
	            } else {
	              failure = url.parseHost(buffer);
	              if (failure) return failure;
	              if (url.host === 'localhost') url.host = '';
	              if (stateOverride) return;
	              buffer = '';
	              state = PATH_START;
	            } continue;
	          } else buffer += chr;
	          break;

	        case PATH_START:
	          if (url.isSpecial()) {
	            state = PATH;
	            if (chr !== '/' && chr !== '\\') continue;
	          } else if (!stateOverride && chr === '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (!stateOverride && chr === '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr !== EOF) {
	            state = PATH;
	            if (chr !== '/') continue;
	          } break;

	        case PATH:
	          if (
	            chr === EOF || chr === '/' ||
	            (chr === '\\' && url.isSpecial()) ||
	            (!stateOverride && (chr === '?' || chr === '#'))
	          ) {
	            if (isDoubleDot(buffer)) {
	              url.shortenPath();
	              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
	                push$4(url.path, '');
	              }
	            } else if (isSingleDot(buffer)) {
	              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
	                push$4(url.path, '');
	              }
	            } else {
	              if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
	                if (url.host) url.host = '';
	                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
	              }
	              push$4(url.path, buffer);
	            }
	            buffer = '';
	            if (url.scheme === 'file' && (chr === EOF || chr === '?' || chr === '#')) {
	              while (url.path.length > 1 && url.path[0] === '') {
	                shift(url.path);
	              }
	            }
	            if (chr === '?') {
	              url.query = '';
	              state = QUERY;
	            } else if (chr === '#') {
	              url.fragment = '';
	              state = FRAGMENT;
	            }
	          } else {
	            buffer += percentEncode(chr, pathPercentEncodeSet);
	          } break;

	        case CANNOT_BE_A_BASE_URL_PATH:
	          if (chr === '?') {
	            url.query = '';
	            state = QUERY;
	          } else if (chr === '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr !== EOF) {
	            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
	          } break;

	        case QUERY:
	          if (!stateOverride && chr === '#') {
	            url.fragment = '';
	            state = FRAGMENT;
	          } else if (chr !== EOF) {
	            if (chr === "'" && url.isSpecial()) url.query += '%27';
	            else if (chr === '#') url.query += '%23';
	            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
	          } break;

	        case FRAGMENT:
	          if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
	          break;
	      }

	      pointer++;
	    }
	  },
	  // https://url.spec.whatwg.org/#host-parsing
	  parseHost: function (input) {
	    var result, codePoints, index;
	    if (charAt(input, 0) === '[') {
	      if (charAt(input, input.length - 1) !== ']') return INVALID_HOST;
	      result = parseIPv6(stringSlice$1(input, 1, -1));
	      if (!result) return INVALID_HOST;
	      this.host = result;
	    // opaque host
	    } else if (!this.isSpecial()) {
	      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
	      result = '';
	      codePoints = arrayFrom(input);
	      for (index = 0; index < codePoints.length; index++) {
	        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
	      }
	      this.host = result;
	    } else {
	      input = toASCII(input);
	      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
	      result = parseIPv4(input);
	      if (result === null) return INVALID_HOST;
	      this.host = result;
	    }
	  },
	  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
	  cannotHaveUsernamePasswordPort: function () {
	    return !this.host || this.cannotBeABaseURL || this.scheme === 'file';
	  },
	  // https://url.spec.whatwg.org/#include-credentials
	  includesCredentials: function () {
	    return this.username !== '' || this.password !== '';
	  },
	  // https://url.spec.whatwg.org/#is-special
	  isSpecial: function () {
	    return hasOwn$8(specialSchemes, this.scheme);
	  },
	  // https://url.spec.whatwg.org/#shorten-a-urls-path
	  shortenPath: function () {
	    var path = this.path;
	    var pathSize = path.length;
	    if (pathSize && (this.scheme !== 'file' || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
	      path.length--;
	    }
	  },
	  // https://url.spec.whatwg.org/#concept-url-serializer
	  serialize: function () {
	    var url = this;
	    var scheme = url.scheme;
	    var username = url.username;
	    var password = url.password;
	    var host = url.host;
	    var port = url.port;
	    var path = url.path;
	    var query = url.query;
	    var fragment = url.fragment;
	    var output = scheme + ':';
	    if (host !== null) {
	      output += '//';
	      if (url.includesCredentials()) {
	        output += username + (password ? ':' + password : '') + '@';
	      }
	      output += serializeHost(host);
	      if (port !== null) output += ':' + port;
	    } else if (scheme === 'file') output += '//';
	    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join$1(path, '/') : '';
	    if (query !== null) output += '?' + query;
	    if (fragment !== null) output += '#' + fragment;
	    return output;
	  },
	  // https://url.spec.whatwg.org/#dom-url-href
	  setHref: function (href) {
	    var failure = this.parse(href);
	    if (failure) throw new TypeError$2(failure);
	    this.searchParams.update();
	  },
	  // https://url.spec.whatwg.org/#dom-url-origin
	  getOrigin: function () {
	    var scheme = this.scheme;
	    var port = this.port;
	    if (scheme === 'blob') try {
	      return new URLConstructor(scheme.path[0]).origin;
	    } catch (error) {
	      return 'null';
	    }
	    if (scheme === 'file' || !this.isSpecial()) return 'null';
	    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
	  },
	  // https://url.spec.whatwg.org/#dom-url-protocol
	  getProtocol: function () {
	    return this.scheme + ':';
	  },
	  setProtocol: function (protocol) {
	    this.parse($toString$1(protocol) + ':', SCHEME_START);
	  },
	  // https://url.spec.whatwg.org/#dom-url-username
	  getUsername: function () {
	    return this.username;
	  },
	  setUsername: function (username) {
	    var codePoints = arrayFrom($toString$1(username));
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    this.username = '';
	    for (var i = 0; i < codePoints.length; i++) {
	      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	    }
	  },
	  // https://url.spec.whatwg.org/#dom-url-password
	  getPassword: function () {
	    return this.password;
	  },
	  setPassword: function (password) {
	    var codePoints = arrayFrom($toString$1(password));
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    this.password = '';
	    for (var i = 0; i < codePoints.length; i++) {
	      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
	    }
	  },
	  // https://url.spec.whatwg.org/#dom-url-host
	  getHost: function () {
	    var host = this.host;
	    var port = this.port;
	    return host === null ? ''
	      : port === null ? serializeHost(host)
	      : serializeHost(host) + ':' + port;
	  },
	  setHost: function (host) {
	    if (this.cannotBeABaseURL) return;
	    this.parse(host, HOST);
	  },
	  // https://url.spec.whatwg.org/#dom-url-hostname
	  getHostname: function () {
	    var host = this.host;
	    return host === null ? '' : serializeHost(host);
	  },
	  setHostname: function (hostname) {
	    if (this.cannotBeABaseURL) return;
	    this.parse(hostname, HOSTNAME);
	  },
	  // https://url.spec.whatwg.org/#dom-url-port
	  getPort: function () {
	    var port = this.port;
	    return port === null ? '' : $toString$1(port);
	  },
	  setPort: function (port) {
	    if (this.cannotHaveUsernamePasswordPort()) return;
	    port = $toString$1(port);
	    if (port === '') this.port = null;
	    else this.parse(port, PORT);
	  },
	  // https://url.spec.whatwg.org/#dom-url-pathname
	  getPathname: function () {
	    var path = this.path;
	    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join$1(path, '/') : '';
	  },
	  setPathname: function (pathname) {
	    if (this.cannotBeABaseURL) return;
	    this.path = [];
	    this.parse(pathname, PATH_START);
	  },
	  // https://url.spec.whatwg.org/#dom-url-search
	  getSearch: function () {
	    var query = this.query;
	    return query ? '?' + query : '';
	  },
	  setSearch: function (search) {
	    search = $toString$1(search);
	    if (search === '') {
	      this.query = null;
	    } else {
	      if (charAt(search, 0) === '?') search = stringSlice$1(search, 1);
	      this.query = '';
	      this.parse(search, QUERY);
	    }
	    this.searchParams.update();
	  },
	  // https://url.spec.whatwg.org/#dom-url-searchparams
	  getSearchParams: function () {
	    return this.searchParams.facade;
	  },
	  // https://url.spec.whatwg.org/#dom-url-hash
	  getHash: function () {
	    var fragment = this.fragment;
	    return fragment ? '#' + fragment : '';
	  },
	  setHash: function (hash) {
	    hash = $toString$1(hash);
	    if (hash === '') {
	      this.fragment = null;
	      return;
	    }
	    if (charAt(hash, 0) === '#') hash = stringSlice$1(hash, 1);
	    this.fragment = '';
	    this.parse(hash, FRAGMENT);
	  },
	  update: function () {
	    this.query = this.searchParams.serialize() || null;
	  }
	};

	// `URL` constructor
	// https://url.spec.whatwg.org/#url-class
	var URLConstructor = function URL(url /* , base */) {
	  var that = anInstance$2(this, URLPrototype);
	  var base = validateArgumentsLength$2(arguments.length, 1) > 1 ? arguments[1] : undefined;
	  var state = setInternalState$2(that, new URLState(url, false, base));
	  if (!DESCRIPTORS$4) {
	    that.href = state.serialize();
	    that.origin = state.getOrigin();
	    that.protocol = state.getProtocol();
	    that.username = state.getUsername();
	    that.password = state.getPassword();
	    that.host = state.getHost();
	    that.hostname = state.getHostname();
	    that.port = state.getPort();
	    that.pathname = state.getPathname();
	    that.search = state.getSearch();
	    that.searchParams = state.getSearchParams();
	    that.hash = state.getHash();
	  }
	};

	var URLPrototype = URLConstructor.prototype;

	var accessorDescriptor = function (getter, setter) {
	  return {
	    get: function () {
	      return getInternalURLState(this)[getter]();
	    },
	    set: setter && function (value) {
	      return getInternalURLState(this)[setter](value);
	    },
	    configurable: true,
	    enumerable: true
	  };
	};

	if (DESCRIPTORS$4) {
	  // `URL.prototype.href` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-href
	  defineBuiltInAccessor$4(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
	  // `URL.prototype.origin` getter
	  // https://url.spec.whatwg.org/#dom-url-origin
	  defineBuiltInAccessor$4(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
	  // `URL.prototype.protocol` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-protocol
	  defineBuiltInAccessor$4(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
	  // `URL.prototype.username` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-username
	  defineBuiltInAccessor$4(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
	  // `URL.prototype.password` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-password
	  defineBuiltInAccessor$4(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
	  // `URL.prototype.host` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-host
	  defineBuiltInAccessor$4(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
	  // `URL.prototype.hostname` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-hostname
	  defineBuiltInAccessor$4(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
	  // `URL.prototype.port` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-port
	  defineBuiltInAccessor$4(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
	  // `URL.prototype.pathname` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-pathname
	  defineBuiltInAccessor$4(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
	  // `URL.prototype.search` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-search
	  defineBuiltInAccessor$4(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
	  // `URL.prototype.searchParams` getter
	  // https://url.spec.whatwg.org/#dom-url-searchparams
	  defineBuiltInAccessor$4(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
	  // `URL.prototype.hash` accessors pair
	  // https://url.spec.whatwg.org/#dom-url-hash
	  defineBuiltInAccessor$4(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
	}

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	defineBuiltIn$6(URLPrototype, 'toJSON', function toJSON() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	// `URL.prototype.toString` method
	// https://url.spec.whatwg.org/#URL-stringification-behavior
	defineBuiltIn$6(URLPrototype, 'toString', function toString() {
	  return getInternalURLState(this).serialize();
	}, { enumerable: true });

	if (NativeURL) {
	  var nativeCreateObjectURL = NativeURL.createObjectURL;
	  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
	  // `URL.createObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
	  if (nativeCreateObjectURL) defineBuiltIn$6(URLConstructor, 'createObjectURL', bind$2(nativeCreateObjectURL, NativeURL));
	  // `URL.revokeObjectURL` method
	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
	  if (nativeRevokeObjectURL) defineBuiltIn$6(URLConstructor, 'revokeObjectURL', bind$2(nativeRevokeObjectURL, NativeURL));
	}

	setToStringTag$3(URLConstructor, 'URL');

	$$j({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS$4 }, {
	  URL: URLConstructor
	});

	var defineBuiltIn$5 = defineBuiltIn$j;
	var uncurryThis$8 = functionUncurryThis;
	var toString$4 = toString$l;
	var validateArgumentsLength$1 = validateArgumentsLength$5;

	var $URLSearchParams$1 = URLSearchParams;
	var URLSearchParamsPrototype$2 = $URLSearchParams$1.prototype;
	var append = uncurryThis$8(URLSearchParamsPrototype$2.append);
	var $delete = uncurryThis$8(URLSearchParamsPrototype$2['delete']);
	var forEach$1 = uncurryThis$8(URLSearchParamsPrototype$2.forEach);
	var push$3 = uncurryThis$8([].push);
	var params$1 = new $URLSearchParams$1('a=1&a=2&b=3');

	params$1['delete']('a', 1);
	// `undefined` case is a Chromium 117 bug
	// https://bugs.chromium.org/p/v8/issues/detail?id=14222
	params$1['delete']('b', undefined);

	if (params$1 + '' !== 'a=2') {
	  defineBuiltIn$5(URLSearchParamsPrototype$2, 'delete', function (name /* , value */) {
	    var length = arguments.length;
	    var $value = length < 2 ? undefined : arguments[1];
	    if (length && $value === undefined) return $delete(this, name);
	    var entries = [];
	    forEach$1(this, function (v, k) { // also validates `this`
	      push$3(entries, { key: k, value: v });
	    });
	    validateArgumentsLength$1(length, 1);
	    var key = toString$4(name);
	    var value = toString$4($value);
	    var index = 0;
	    var dindex = 0;
	    var found = false;
	    var entriesLength = entries.length;
	    var entry;
	    while (index < entriesLength) {
	      entry = entries[index++];
	      if (found || entry.key === key) {
	        found = true;
	        $delete(this, entry.key);
	      } else dindex++;
	    }
	    while (dindex < entriesLength) {
	      entry = entries[dindex++];
	      if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);
	    }
	  }, { enumerable: true, unsafe: true });
	}

	var defineBuiltIn$4 = defineBuiltIn$j;
	var uncurryThis$7 = functionUncurryThis;
	var toString$3 = toString$l;
	var validateArgumentsLength = validateArgumentsLength$5;

	var $URLSearchParams = URLSearchParams;
	var URLSearchParamsPrototype$1 = $URLSearchParams.prototype;
	var getAll = uncurryThis$7(URLSearchParamsPrototype$1.getAll);
	var $has = uncurryThis$7(URLSearchParamsPrototype$1.has);
	var params = new $URLSearchParams('a=1');

	// `undefined` case is a Chromium 117 bug
	// https://bugs.chromium.org/p/v8/issues/detail?id=14222
	if (params.has('a', 2) || !params.has('a', undefined)) {
	  defineBuiltIn$4(URLSearchParamsPrototype$1, 'has', function has(name /* , value */) {
	    var length = arguments.length;
	    var $value = length < 2 ? undefined : arguments[1];
	    if (length && $value === undefined) return $has(this, name);
	    var values = getAll(this, name); // also validates `this`
	    validateArgumentsLength(length, 1);
	    var value = toString$3($value);
	    var index = 0;
	    while (index < values.length) {
	      if (values[index++] === value) return true;
	    } return false;
	  }, { enumerable: true, unsafe: true });
	}

	var DESCRIPTORS$3 = descriptors;
	var uncurryThis$6 = functionUncurryThis;
	var defineBuiltInAccessor$3 = defineBuiltInAccessor$f;

	var URLSearchParamsPrototype = URLSearchParams.prototype;
	var forEach = uncurryThis$6(URLSearchParamsPrototype.forEach);

	// `URLSearchParams.prototype.size` getter
	// https://github.com/whatwg/url/pull/734
	if (DESCRIPTORS$3 && !('size' in URLSearchParamsPrototype)) {
	  defineBuiltInAccessor$3(URLSearchParamsPrototype, 'size', {
	    get: function size() {
	      var count = 0;
	      forEach(this, function () { count++; });
	      return count;
	    },
	    configurable: true,
	    enumerable: true
	  });
	}

	var $$i = _export;
	var global$5 = global$N;
	var arrayBufferModule = arrayBuffer;
	var setSpecies$1 = setSpecies$5;

	var ARRAY_BUFFER = 'ArrayBuffer';
	var ArrayBuffer$1 = arrayBufferModule[ARRAY_BUFFER];
	var NativeArrayBuffer = global$5[ARRAY_BUFFER];

	// `ArrayBuffer` constructor
	// https://tc39.es/ecma262/#sec-arraybuffer-constructor
	$$i({ global: true, constructor: true, forced: NativeArrayBuffer !== ArrayBuffer$1 }, {
	  ArrayBuffer: ArrayBuffer$1
	});

	setSpecies$1(ARRAY_BUFFER);

	var createTypedArrayConstructor$3 = typedArrayConstructorExports;

	// `Float32Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$3('Float32', function (init) {
	  return function Float32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var createTypedArrayConstructor$2 = typedArrayConstructorExports;

	// `Uint32Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$2('Uint32', function (init) {
	  return function Uint32Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var createTypedArrayConstructor$1 = typedArrayConstructorExports;

	// `Uint16Array` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor$1('Uint16', function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var $$h = _export;
	var iterate$3 = iterate$9;
	var aCallable$1 = aCallable$j;
	var anObject$4 = anObject$u;
	var getIteratorDirect$1 = getIteratorDirect$7;

	var $TypeError$2 = TypeError;

	// `Iterator.prototype.reduce` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$h({ target: 'Iterator', proto: true, real: true }, {
	  reduce: function reduce(reducer /* , initialValue */) {
	    anObject$4(this);
	    aCallable$1(reducer);
	    var record = getIteratorDirect$1(this);
	    var noInitial = arguments.length < 2;
	    var accumulator = noInitial ? undefined : arguments[1];
	    var counter = 0;
	    iterate$3(record, function (value) {
	      if (noInitial) {
	        noInitial = false;
	        accumulator = value;
	      } else {
	        accumulator = reducer(accumulator, value, counter);
	      }
	      counter++;
	    }, { IS_RECORD: true });
	    if (noInitial) throw new $TypeError$2('Reduce of empty iterator with no initial value');
	    return accumulator;
	  }
	});

	var $$g = _export;
	var anObject$3 = anObject$u;
	var iterate$2 = iterate$9;
	var getIteratorDirect = getIteratorDirect$7;

	var push$2 = [].push;

	// `Iterator.prototype.toArray` method
	// https://github.com/tc39/proposal-iterator-helpers
	$$g({ target: 'Iterator', proto: true, real: true }, {
	  toArray: function toArray() {
	    var result = [];
	    iterate$2(getIteratorDirect(anObject$3(this)), push$2, { that: result, IS_RECORD: true });
	    return result;
	  }
	});

	var fails$9 = fails$V;

	var freezing = !fails$9(function () {
	  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = {exports: {}};

	var objectGetOwnPropertyNamesExternal = {};

	/* eslint-disable es/no-object-getownpropertynames -- safe */
	var classof$1 = classofRaw$2;
	var toIndexedObject$1 = toIndexedObject$c;
	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var arraySlice$1 = arraySliceSimple;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return arraySlice$1(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof$1(it) === 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames$1(toIndexedObject$1(it));
	};

	// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
	var fails$8 = fails$V;

	var arrayBufferNonExtensible = fails$8(function () {
	  if (typeof ArrayBuffer == 'function') {
	    var buffer = new ArrayBuffer(8);
	    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
	    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
	  }
	});

	var fails$7 = fails$V;
	var isObject$5 = isObject$p;
	var classof = classofRaw$2;
	var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

	// eslint-disable-next-line es/no-object-isextensible -- safe
	var $isExtensible = Object.isExtensible;
	var FAILS_ON_PRIMITIVES$2 = fails$7(function () { $isExtensible(1); });

	// `Object.isExtensible` method
	// https://tc39.es/ecma262/#sec-object.isextensible
	var objectIsExtensible = (FAILS_ON_PRIMITIVES$2 || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
	  if (!isObject$5(it)) return false;
	  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return false;
	  return $isExtensible ? $isExtensible(it) : true;
	} : $isExtensible;

	var $$f = _export;
	var uncurryThis$5 = functionUncurryThis;
	var hiddenKeys$1 = hiddenKeys$6;
	var isObject$4 = isObject$p;
	var hasOwn$7 = hasOwnProperty_1;
	var defineProperty$1 = objectDefineProperty.f;
	var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
	var isExtensible = objectIsExtensible;
	var uid$1 = uid$5;
	var FREEZING$1 = freezing;

	var REQUIRED = false;
	var METADATA = uid$1('meta');
	var id = 0;

	var setMetadata = function (it) {
	  defineProperty$1(it, METADATA, { value: {
	    objectID: 'O' + id++, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey$1 = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject$4(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!hasOwn$7(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!hasOwn$7(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze$1 = function (it) {
	  if (FREEZING$1 && REQUIRED && isExtensible(it) && !hasOwn$7(it, METADATA)) setMetadata(it);
	  return it;
	};

	var enable = function () {
	  meta.enable = function () { /* empty */ };
	  REQUIRED = true;
	  var getOwnPropertyNames = getOwnPropertyNamesModule$1.f;
	  var splice = uncurryThis$5([].splice);
	  var test = {};
	  test[METADATA] = 1;

	  // prevent exposing of metadata key
	  if (getOwnPropertyNames(test).length) {
	    getOwnPropertyNamesModule$1.f = function (it) {
	      var result = getOwnPropertyNames(it);
	      for (var i = 0, length = result.length; i < length; i++) {
	        if (result[i] === METADATA) {
	          splice(result, i, 1);
	          break;
	        }
	      } return result;
	    };

	    $$f({ target: 'Object', stat: true, forced: true }, {
	      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
	    });
	  }
	};

	var meta = internalMetadata.exports = {
	  enable: enable,
	  fastKey: fastKey$1,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze$1
	};

	hiddenKeys$1[METADATA] = true;

	var internalMetadataExports = internalMetadata.exports;

	var $$e = _export;
	var FREEZING = freezing;
	var fails$6 = fails$V;
	var isObject$3 = isObject$p;
	var onFreeze = internalMetadataExports.onFreeze;

	// eslint-disable-next-line es/no-object-freeze -- safe
	var $freeze = Object.freeze;
	var FAILS_ON_PRIMITIVES$1 = fails$6(function () { $freeze(1); });

	// `Object.freeze` method
	// https://tc39.es/ecma262/#sec-object.freeze
	$$e({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !FREEZING }, {
	  freeze: function freeze(it) {
	    return $freeze && isObject$3(it) ? $freeze(onFreeze(it)) : it;
	  }
	});

	var $$d = _export;

	// `Number.MAX_SAFE_INTEGER` constant
	// https://tc39.es/ecma262/#sec-number.max_safe_integer
	$$d({ target: 'Number', stat: true, nonConfigurable: true, nonWritable: true }, {
	  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
	});

	var $$c = _export;
	var fails$5 = fails$V;
	var toObject$1 = toObject$i;
	var nativeGetPrototypeOf = objectGetPrototypeOf$1;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var FAILS_ON_PRIMITIVES = fails$5(function () { nativeGetPrototypeOf(1); });

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	$$c({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return nativeGetPrototypeOf(toObject$1(it));
	  }
	});

	var $$b = _export;
	var isIntegralNumber = isIntegralNumber$2;

	// `Number.isInteger` method
	// https://tc39.es/ecma262/#sec-number.isinteger
	$$b({ target: 'Number', stat: true }, {
	  isInteger: isIntegralNumber
	});

	var $$a = _export;
	var $includes = arrayIncludes.includes;
	var fails$4 = fails$V;
	var addToUnscopables = addToUnscopables$3;

	// FF99+ bug
	var BROKEN_ON_SPARSE = fails$4(function () {
	  // eslint-disable-next-line es/no-array-prototype-includes -- detection
	  return !Array(1).includes();
	});

	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	$$a({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var isRegExp = isRegexp;

	var $TypeError$1 = TypeError;

	var notARegexp = function (it) {
	  if (isRegExp(it)) {
	    throw new $TypeError$1("The method doesn't accept regular expressions");
	  } return it;
	};

	var wellKnownSymbol$4 = wellKnownSymbol$x;

	var MATCH = wellKnownSymbol$4('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var $$9 = _export;
	var uncurryThis$4 = functionUncurryThis;
	var notARegExp = notARegexp;
	var requireObjectCoercible = requireObjectCoercible$b;
	var toString$2 = toString$l;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	var stringIndexOf = uncurryThis$4(''.indexOf);

	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	$$9({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~stringIndexOf(
	      toString$2(requireObjectCoercible(this)),
	      toString$2(notARegExp(searchString)),
	      arguments.length > 1 ? arguments[1] : undefined
	    );
	  }
	});

	var createTypedArrayConstructor = typedArrayConstructorExports;

	// `Uint8ClampedArray` constructor
	// https://tc39.es/ecma262/#sec-typedarray-objects
	createTypedArrayConstructor('Uint8', function (init) {
	  return function Uint8ClampedArray(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	}, true);

	var $$8 = _export;
	var from = arrayFrom$1;
	var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$4;

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration$1(function (iterable) {
	  // eslint-disable-next-line es/no-array-from -- required for testing
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	$$8({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: from
	});

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$3 = wellKnownSymbol$x;

	wellKnownSymbolWrapped.f = wellKnownSymbol$3;

	var path = path$2;
	var hasOwn$6 = hasOwnProperty_1;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty = objectDefineProperty.f;

	var wellKnownSymbolDefine = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!hasOwn$6(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var call$1 = functionCall;
	var getBuiltIn$2 = getBuiltIn$d;
	var wellKnownSymbol$2 = wellKnownSymbol$x;
	var defineBuiltIn$3 = defineBuiltIn$j;

	var symbolDefineToPrimitive = function () {
	  var Symbol = getBuiltIn$2('Symbol');
	  var SymbolPrototype = Symbol && Symbol.prototype;
	  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
	  var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');

	  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
	    // `Symbol.prototype[@@toPrimitive]` method
	    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	    // eslint-disable-next-line no-unused-vars -- required for .length
	    defineBuiltIn$3(SymbolPrototype, TO_PRIMITIVE, function (hint) {
	      return call$1(valueOf, this);
	    }, { arity: 1 });
	  }
	};

	var $$7 = _export;
	var global$4 = global$N;
	var call = functionCall;
	var uncurryThis$3 = functionUncurryThis;
	var DESCRIPTORS$2 = descriptors;
	var NATIVE_SYMBOL$3 = symbolConstructorDetection;
	var fails$3 = fails$V;
	var hasOwn$5 = hasOwnProperty_1;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var anObject$2 = anObject$u;
	var toIndexedObject = toIndexedObject$c;
	var toPropertyKey = toPropertyKey$5;
	var $toString = toString$l;
	var createPropertyDescriptor = createPropertyDescriptor$8;
	var nativeObjectCreate = objectCreate;
	var objectKeys = objectKeys$4;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;
	var definePropertiesModule = objectDefineProperties;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var defineBuiltIn$2 = defineBuiltIn$j;
	var defineBuiltInAccessor$2 = defineBuiltInAccessor$f;
	var shared$2 = sharedExports;
	var sharedKey = sharedKey$4;
	var hiddenKeys = hiddenKeys$6;
	var uid = uid$5;
	var wellKnownSymbol$1 = wellKnownSymbol$x;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol$2 = wellKnownSymbolDefine;
	var defineSymbolToPrimitive$1 = symbolDefineToPrimitive;
	var setToStringTag$2 = setToStringTag$9;
	var InternalStateModule$1 = internalState;
	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';

	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalState = InternalStateModule$1.getterFor(SYMBOL);

	var ObjectPrototype$1 = Object[PROTOTYPE];
	var $Symbol = global$4.Symbol;
	var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE];
	var RangeError$1 = global$4.RangeError;
	var TypeError$1 = global$4.TypeError;
	var QObject = global$4.QObject;
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
	var push$1 = uncurryThis$3([].push);

	var AllSymbols = shared$2('symbols');
	var ObjectPrototypeSymbols = shared$2('op-symbols');
	var WellKnownSymbolsStore = shared$2('wks');

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var fallbackDefineProperty = function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	};

	var setSymbolDescriptor = DESCRIPTORS$2 && fails$3(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a !== 7;
	}) ? fallbackDefineProperty : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype$1);
	  setInternalState$1(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$2) symbol.description = description;
	  return symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$2(O);
	  var key = toPropertyKey(P);
	  anObject$2(Attributes);
	  if (hasOwn$5(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!hasOwn$5(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (hasOwn$5(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject$2(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!DESCRIPTORS$2 || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPropertyKey(V);
	  var enumerable = call(nativePropertyIsEnumerable, this, P);
	  if (this === ObjectPrototype$1 && hasOwn$5(AllSymbols, P) && !hasOwn$5(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !hasOwn$5(this, P) || !hasOwn$5(AllSymbols, P) || hasOwn$5(this, HIDDEN) && this[HIDDEN][P]
	    ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPropertyKey(P);
	  if (it === ObjectPrototype$1 && hasOwn$5(AllSymbols, key) && !hasOwn$5(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
	  if (descriptor && hasOwn$5(AllSymbols, key) && !(hasOwn$5(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!hasOwn$5(AllSymbols, key) && !hasOwn$5(hiddenKeys, key)) push$1(result, key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function (O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (hasOwn$5(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$5(ObjectPrototype$1, key))) {
	      push$1(result, AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL$3) {
	  $Symbol = function Symbol() {
	    if (isPrototypeOf$1(SymbolPrototype$1, this)) throw new TypeError$1('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      var $this = this === undefined ? global$4 : this;
	      if ($this === ObjectPrototype$1) call(setter, ObjectPrototypeSymbols, value);
	      if (hasOwn$5($this, HIDDEN) && hasOwn$5($this[HIDDEN], tag)) $this[HIDDEN][tag] = false;
	      var descriptor = createPropertyDescriptor(1, value);
	      try {
	        setSymbolDescriptor($this, tag, descriptor);
	      } catch (error) {
	        if (!(error instanceof RangeError$1)) throw error;
	        fallbackDefineProperty($this, tag, descriptor);
	      }
	    };
	    if (DESCRIPTORS$2 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  SymbolPrototype$1 = $Symbol[PROTOTYPE];

	  defineBuiltIn$2(SymbolPrototype$1, 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  defineBuiltIn$2($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  propertyIsEnumerableModule.f = $propertyIsEnumerable;
	  definePropertyModule.f = $defineProperty;
	  definePropertiesModule.f = $defineProperties;
	  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule$1.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol$1(name), name);
	  };

	  if (DESCRIPTORS$2) {
	    // https://github.com/tc39/proposal-Symbol-description
	    defineBuiltInAccessor$2(SymbolPrototype$1, 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    {
	      defineBuiltIn$2(ObjectPrototype$1, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	$$7({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL$3, sham: !NATIVE_SYMBOL$3 }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol$2(name);
	});

	$$7({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$3 }, {
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$7({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3, sham: !DESCRIPTORS$2 }, {
	  // `Object.create` method
	  // https://tc39.es/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.es/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.es/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	$$7({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3 }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames
	});

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	defineSymbolToPrimitive$1();

	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$2($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var NATIVE_SYMBOL$2 = symbolConstructorDetection;

	/* eslint-disable es/no-symbol -- safe */
	var symbolRegistryDetection = NATIVE_SYMBOL$2 && !!Symbol['for'] && !!Symbol.keyFor;

	var $$6 = _export;
	var getBuiltIn$1 = getBuiltIn$d;
	var hasOwn$4 = hasOwnProperty_1;
	var toString$1 = toString$l;
	var shared$1 = sharedExports;
	var NATIVE_SYMBOL_REGISTRY$1 = symbolRegistryDetection;

	var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
	var SymbolToStringRegistry$1 = shared$1('symbol-to-string-registry');

	// `Symbol.for` method
	// https://tc39.es/ecma262/#sec-symbol.for
	$$6({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY$1 }, {
	  'for': function (key) {
	    var string = toString$1(key);
	    if (hasOwn$4(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = getBuiltIn$1('Symbol')(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry$1[symbol] = string;
	    return symbol;
	  }
	});

	var $$5 = _export;
	var hasOwn$3 = hasOwnProperty_1;
	var isSymbol = isSymbol$6;
	var tryToString = tryToString$7;
	var shared = sharedExports;
	var NATIVE_SYMBOL_REGISTRY = symbolRegistryDetection;

	var SymbolToStringRegistry = shared('symbol-to-string-registry');

	// `Symbol.keyFor` method
	// https://tc39.es/ecma262/#sec-symbol.keyfor
	$$5({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw new TypeError(tryToString(sym) + ' is not a symbol');
	    if (hasOwn$3(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  }
	});

	var $$4 = _export;
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;
	var fails$2 = fails$V;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var toObject = toObject$i;

	// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FORCED$1 = !NATIVE_SYMBOL$1 || fails$2(function () { getOwnPropertySymbolsModule.f(1); });

	// `Object.getOwnPropertySymbols` method
	// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	$$4({ target: 'Object', stat: true, forced: FORCED$1 }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : [];
	  }
	});

	var $$3 = _export;
	var DESCRIPTORS$1 = descriptors;
	var global$3 = global$N;
	var uncurryThis$2 = functionUncurryThis;
	var hasOwn$2 = hasOwnProperty_1;
	var isCallable$1 = isCallable$w;
	var isPrototypeOf = objectIsPrototypeOf;
	var toString = toString$l;
	var defineBuiltInAccessor$1 = defineBuiltInAccessor$f;
	var copyConstructorProperties = copyConstructorProperties$4;

	var NativeSymbol = global$3.Symbol;
	var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

	if (DESCRIPTORS$1 && isCallable$1(NativeSymbol) && (!('description' in SymbolPrototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
	    var result = isPrototypeOf(SymbolPrototype, this)
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };

	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  SymbolWrapper.prototype = SymbolPrototype;
	  SymbolPrototype.constructor = SymbolWrapper;

	  var NATIVE_SYMBOL = String(NativeSymbol('description detection')) === 'Symbol(description detection)';
	  var thisSymbolValue = uncurryThis$2(SymbolPrototype.valueOf);
	  var symbolDescriptiveString = uncurryThis$2(SymbolPrototype.toString);
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  var replace = uncurryThis$2(''.replace);
	  var stringSlice = uncurryThis$2(''.slice);

	  defineBuiltInAccessor$1(SymbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = thisSymbolValue(this);
	      if (hasOwn$2(EmptyStringDescriptionStore, symbol)) return '';
	      var string = symbolDescriptiveString(symbol);
	      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  $$3({ global: true, constructor: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	var defineWellKnownSymbol$1 = wellKnownSymbolDefine;

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol$1('iterator');

	var $$2 = _export;
	var global$2 = global$N;
	var setToStringTag$1 = setToStringTag$9;

	$$2({ global: true }, { Reflect: {} });

	// Reflect[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-reflect-@@tostringtag
	setToStringTag$1(global$2.Reflect, 'Reflect', true);

	var uncurryThis$1 = functionUncurryThis;
	var aCallable = aCallable$j;
	var isObject$2 = isObject$p;
	var hasOwn$1 = hasOwnProperty_1;
	var arraySlice = arraySlice$a;
	var NATIVE_BIND = functionBindNative;

	var $Function = Function;
	var concat = uncurryThis$1([].concat);
	var join = uncurryThis$1([].join);
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!hasOwn$1(factories, argsLength)) {
	    var list = [];
	    var i = 0;
	    for (; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	// eslint-disable-next-line es/no-function-prototype-bind -- detection
	var functionBind = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
	  var F = aCallable(this);
	  var Prototype = F.prototype;
	  var partArgs = arraySlice(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = concat(partArgs, arraySlice(arguments));
	    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
	  };
	  if (isObject$2(Prototype)) boundFunction.prototype = Prototype;
	  return boundFunction;
	};

	var $$1 = _export;
	var getBuiltIn = getBuiltIn$d;
	var apply = functionApply;
	var bind$1 = functionBind;
	var aConstructor = aConstructor$3;
	var anObject$1 = anObject$u;
	var isObject$1 = isObject$p;
	var create$1 = objectCreate;
	var fails$1 = fails$V;

	var nativeConstruct = getBuiltIn('Reflect', 'construct');
	var ObjectPrototype = Object.prototype;
	var push = [].push;

	// `Reflect.construct` method
	// https://tc39.es/ecma262/#sec-reflect.construct
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails$1(function () {
	  function F() { /* empty */ }
	  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
	});

	var ARGS_BUG = !fails$1(function () {
	  nativeConstruct(function () { /* empty */ });
	});

	var FORCED = NEW_TARGET_BUG || ARGS_BUG;

	$$1({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
	  construct: function construct(Target, args /* , newTarget */) {
	    aConstructor(Target);
	    anObject$1(args);
	    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
	    if (Target === newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      apply(push, $args, args);
	      return new (apply(bind$1, Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = create$1(isObject$1(proto) ? proto : ObjectPrototype);
	    var result = apply(Target, instance, args);
	    return isObject$1(result) ? result : instance;
	  }
	});

	var $ = _export;
	var global$1 = global$N;
	var uncurryThis = functionUncurryThis;
	var isForced = isForced_1;
	var defineBuiltIn$1 = defineBuiltIn$j;
	var InternalMetadataModule = internalMetadataExports;
	var iterate$1 = iterate$9;
	var anInstance$1 = anInstance$8;
	var isCallable = isCallable$w;
	var isNullOrUndefined$1 = isNullOrUndefined$a;
	var isObject = isObject$p;
	var fails = fails$V;
	var checkCorrectnessOfIteration = checkCorrectnessOfIteration$4;
	var setToStringTag = setToStringTag$9;
	var inheritIfRequired = inheritIfRequired$5;

	var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global$1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY]);
	    defineBuiltIn$1(NativePrototype, KEY,
	      KEY === 'add' ? function add(value) {
	        uncurriedNativeMethod(this, value === 0 ? 0 : value);
	        return this;
	      } : KEY === 'delete' ? function (key) {
	        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : KEY === 'get' ? function get(key) {
	        return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : KEY === 'has' ? function has(key) {
	        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
	      } : function set(key, value) {
	        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
	        return this;
	      }
	    );
	  };

	  var REPLACE = isForced(
	    CONSTRUCTOR_NAME,
	    !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	      new NativeConstructor().entries().next();
	    }))
	  );

	  if (REPLACE) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    InternalMetadataModule.enable();
	  } else if (isForced(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new -- required for testing
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance$1(dummy, NativePrototype);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (!isNullOrUndefined$1(iterable)) iterate$1(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

	    // weak collections should not contains .clear method
	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  $({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported);

	  setToStringTag(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var create = objectCreate;
	var defineBuiltInAccessor = defineBuiltInAccessor$f;
	var defineBuiltIns = defineBuiltIns$4;
	var bind = functionBindContext;
	var anInstance = anInstance$8;
	var isNullOrUndefined = isNullOrUndefined$a;
	var iterate = iterate$9;
	var defineIterator = iteratorDefine;
	var createIterResultObject = createIterResultObject$5;
	var setSpecies = setSpecies$5;
	var DESCRIPTORS = descriptors;
	var fastKey = internalMetadataExports.fastKey;
	var InternalStateModule = internalState;

	var setInternalState = InternalStateModule.set;
	var internalStateGetterFor = InternalStateModule.getterFor;

	var collectionStrong$1 = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var Constructor = wrapper(function (that, iterable) {
	      anInstance(that, Prototype);
	      setInternalState(that, {
	        type: CONSTRUCTOR_NAME,
	        index: create(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!DESCRIPTORS) that.size = 0;
	      if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
	    });

	    var Prototype = Constructor.prototype;

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (DESCRIPTORS) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key === key) return entry;
	      }
	    };

	    defineBuiltIns(Prototype, {
	      // `{ Map, Set }.prototype.clear()` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.clear
	      // https://tc39.es/ecma262/#sec-set.prototype.clear
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }
	        state.first = state.last = undefined;
	        if (DESCRIPTORS) state.size = 0;
	        else that.size = 0;
	      },
	      // `{ Map, Set }.prototype.delete(key)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.delete
	      // https://tc39.es/ecma262/#sec-set.prototype.delete
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first === entry) state.first = next;
	          if (state.last === entry) state.last = prev;
	          if (DESCRIPTORS) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.foreach
	      // https://tc39.es/ecma262/#sec-set.prototype.foreach
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // `{ Map, Set}.prototype.has(key)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.has
	      // https://tc39.es/ecma262/#sec-set.prototype.has
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    defineBuiltIns(Prototype, IS_MAP ? {
	      // `Map.prototype.get(key)` method
	      // https://tc39.es/ecma262/#sec-map.prototype.get
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // `Map.prototype.set(key, value)` method
	      // https://tc39.es/ecma262/#sec-map.prototype.set
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // `Set.prototype.add(value)` method
	      // https://tc39.es/ecma262/#sec-set.prototype.add
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (DESCRIPTORS) defineBuiltInAccessor(Prototype, 'size', {
	      configurable: true,
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return Constructor;
	  },
	  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
	    // https://tc39.es/ecma262/#sec-map.prototype.entries
	    // https://tc39.es/ecma262/#sec-map.prototype.keys
	    // https://tc39.es/ecma262/#sec-map.prototype.values
	    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
	    // https://tc39.es/ecma262/#sec-set.prototype.entries
	    // https://tc39.es/ecma262/#sec-set.prototype.keys
	    // https://tc39.es/ecma262/#sec-set.prototype.values
	    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
	    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return createIterResultObject(undefined, true);
	      }
	      // return step by kind
	      if (kind === 'keys') return createIterResultObject(entry.key, false);
	      if (kind === 'values') return createIterResultObject(entry.value, false);
	      return createIterResultObject([entry.key, entry.value], false);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // `{ Map, Set }.prototype[@@species]` accessors
	    // https://tc39.es/ecma262/#sec-get-map-@@species
	    // https://tc39.es/ecma262/#sec-get-set-@@species
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	var collection = collection$1;
	var collectionStrong = collectionStrong$1;

	// `Map` constructor
	// https://tc39.es/ecma262/#sec-map-objects
	collection('Map', function (init) {
	  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var defineWellKnownSymbol = wellKnownSymbolDefine;
	var defineSymbolToPrimitive = symbolDefineToPrimitive;

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol('toPrimitive');

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	defineSymbolToPrimitive();

	var anObject = anObject$u;
	var ordinaryToPrimitive = ordinaryToPrimitive$2;

	var $TypeError = TypeError;

	// `Date.prototype[@@toPrimitive](hint)` method implementation
	// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
	var dateToPrimitive$1 = function (hint) {
	  anObject(this);
	  if (hint === 'string' || hint === 'default') hint = 'string';
	  else if (hint !== 'number') throw new $TypeError('Incorrect hint');
	  return ordinaryToPrimitive(this, hint);
	};

	var hasOwn = hasOwnProperty_1;
	var defineBuiltIn = defineBuiltIn$j;
	var dateToPrimitive = dateToPrimitive$1;
	var wellKnownSymbol = wellKnownSymbol$x;

	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var DatePrototype = Date.prototype;

	// `Date.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
	if (!hasOwn(DatePrototype, TO_PRIMITIVE)) {
	  defineBuiltIn(DatePrototype, TO_PRIMITIVE, dateToPrimitive);
	}

	/*!
	 * SJS 6.14.2
	 */

	!function(){function e(e,t){return (t||"")+" (SystemJS https://github.com/systemjs/systemjs/blob/main/docs/errors.md#"+e+")"}function t(e,t){if(-1!==e.indexOf("\\")&&(e=e.replace(j,"/")),"/"===e[0]&&"/"===e[1])return t.slice(0,t.indexOf(":")+1)+e;if("."===e[0]&&("/"===e[1]||"."===e[1]&&("/"===e[2]||2===e.length&&(e+="/"))||1===e.length&&(e+="/"))||"/"===e[0]){var r,n=t.slice(0,t.indexOf(":")+1);if(r="/"===t[n.length+1]?"file:"!==n?(r=t.slice(n.length+2)).slice(r.indexOf("/")+1):t.slice(8):t.slice(n.length+("/"===t[n.length])),"/"===e[0])return t.slice(0,t.length-r.length-1)+e;for(var i=r.slice(0,r.lastIndexOf("/")+1)+e,o=[],s=-1,c=0;c<i.length;c++)-1!==s?"/"===i[c]&&(o.push(i.slice(s,c+1)),s=-1):"."===i[c]?"."!==i[c+1]||"/"!==i[c+2]&&c+2!==i.length?"/"===i[c+1]||c+1===i.length?c+=1:s=c:(o.pop(),c+=2):s=c;return -1!==s&&o.push(i.slice(s)),t.slice(0,t.length-r.length)+o.join("")}}function r(e,r){return t(e,r)||(-1!==e.indexOf(":")?e:t("./"+e,r))}function n(e,r,n,i,o){for(var s in e){var f=t(s,n)||s,a=e[s];if("string"==typeof a){var l=u(i,t(a,n)||a,o);l?r[f]=l:c("W1",s,a);}}}function i(e,t,i){var o;for(o in e.imports&&n(e.imports,i.imports,t,i,null),e.scopes||{}){var s=r(o,t);n(e.scopes[o],i.scopes[s]||(i.scopes[s]={}),t,i,s);}for(o in e.depcache||{})i.depcache[r(o,t)]=e.depcache[o];for(o in e.integrity||{})i.integrity[r(o,t)]=e.integrity[o];}function o(e,t){if(t[e])return e;var r=e.length;do{var n=e.slice(0,r+1);if(n in t)return n}while(-1!==(r=e.lastIndexOf("/",r-1)))}function s(e,t){var r=o(e,t);if(r){var n=t[r];if(null===n)return;if(!(e.length>r.length&&"/"!==n[n.length-1]))return n+e.slice(r.length);c("W2",r,n);}}function c(t,r,n){console.warn(e(t,[n,r].join(", ")));}function u(e,t,r){for(var n=e.scopes,i=r&&o(r,n);i;){var c=s(t,n[i]);if(c)return c;i=o(i.slice(0,i.lastIndexOf("/")),n);}return s(t,e.imports)||-1!==t.indexOf(":")&&t}function f(){this[b]={};}function a(t,r,n,i){var o=t[b][r];if(o)return o;var s=[],c=Object.create(null);S&&Object.defineProperty(c,S,{value:"Module"});var u=Promise.resolve().then((function(){return t.instantiate(r,n,i)})).then((function(n){if(!n)throw Error(e(2,r));var i=n[1]((function(e,t){o.h=!0;var r=!1;if("string"==typeof e)e in c&&c[e]===t||(c[e]=t,r=!0);else {for(var n in e)t=e[n],n in c&&c[n]===t||(c[n]=t,r=!0);e&&e.__esModule&&(c.__esModule=e.__esModule);}if(r)for(var i=0;i<s.length;i++){var u=s[i];u&&u(c);}return t}),2===n[1].length?{import:function(e,n){return t.import(e,r,n)},meta:t.createContext(r)}:void 0);return o.e=i.execute||function(){},[n[0],i.setters||[],n[2]||[]]}),(function(e){throw o.e=null,o.er=e,e})),f=u.then((function(e){return Promise.all(e[0].map((function(n,i){var o=e[1][i],s=e[2][i];return Promise.resolve(t.resolve(n,r)).then((function(e){var n=a(t,e,r,s);return Promise.resolve(n.I).then((function(){return o&&(n.i.push(o),!n.h&&n.I||o(n.n)),n}))}))}))).then((function(e){o.d=e;}))}));return o=t[b][r]={id:r,i:s,n:c,m:i,I:u,L:f,h:!1,d:void 0,e:void 0,er:void 0,E:void 0,C:void 0,p:void 0}}function l(e,t,r,n){if(!n[t.id])return n[t.id]=!0,Promise.resolve(t.L).then((function(){return t.p&&null!==t.p.e||(t.p=r),Promise.all(t.d.map((function(t){return l(e,t,r,n)})))})).catch((function(e){if(t.er)throw e;throw t.e=null,e}))}function h(e,t){return t.C=l(e,t,t,{}).then((function(){return d(e,t,{})})).then((function(){return t.n}))}function d(e,t,r){function n(){try{var e=o.call(I);if(e)return e=e.then((function(){t.C=t.n,t.E=null;}),(function(e){throw t.er=e,t.E=null,e})),t.E=e;t.C=t.n,t.L=t.I=void 0;}catch(r){throw t.er=r,r}}if(!r[t.id]){if(r[t.id]=!0,!t.e){if(t.er)throw t.er;return t.E?t.E:void 0}var i,o=t.e;return t.e=null,t.d.forEach((function(n){try{var o=d(e,n,r);o&&(i=i||[]).push(o);}catch(s){throw t.er=s,s}})),i?Promise.all(i).then(n):n()}}function v(){[].forEach.call(document.querySelectorAll("script"),(function(t){if(!t.sp)if("systemjs-module"===t.type){if(t.sp=!0,!t.src)return;System.import("import:"===t.src.slice(0,7)?t.src.slice(7):r(t.src,p)).catch((function(e){if(e.message.indexOf("https://github.com/systemjs/systemjs/blob/main/docs/errors.md#3")>-1){var r=document.createEvent("Event");r.initEvent("error",!1,!1),t.dispatchEvent(r);}return Promise.reject(e)}));}else if("systemjs-importmap"===t.type){t.sp=!0;var n=t.src?(System.fetch||fetch)(t.src,{integrity:t.integrity,passThrough:!0}).then((function(e){if(!e.ok)throw Error(e.status);return e.text()})).catch((function(r){return r.message=e("W4",t.src)+"\n"+r.message,console.warn(r),"function"==typeof t.onerror&&t.onerror(),"{}"})):t.innerHTML;M=M.then((function(){return n})).then((function(r){!function(t,r,n){var o={};try{o=JSON.parse(r);}catch(s){console.warn(Error(e("W5")));}i(o,n,t);}(R,r,t.src||p);}));}}));}var p,m="undefined"!=typeof Symbol,g="undefined"!=typeof self,y="undefined"!=typeof document,E=g?self:commonjsGlobal;if(y){var w=document.querySelector("base[href]");w&&(p=w.href);}if(!p&&"undefined"!=typeof location){var x=(p=location.href.split("#")[0].split("?")[0]).lastIndexOf("/");-1!==x&&(p=p.slice(0,x+1));}var O,j=/\\/g,S=m&&Symbol.toStringTag,b=m?Symbol():"@",P=f.prototype;P.import=function(e,t,r){var n=this;return t&&"object"==typeof t&&(r=t,t=void 0),Promise.resolve(n.prepareImport()).then((function(){return n.resolve(e,t,r)})).then((function(e){var t=a(n,e,void 0,r);return t.C||h(n,t)}))},P.createContext=function(e){var t=this;return {url:e,resolve:function(r,n){return Promise.resolve(t.resolve(r,n||e))}}},P.register=function(e,t,r){O=[e,t,r];},P.getRegister=function(){var e=O;return O=void 0,e};var I=Object.freeze(Object.create(null));E.System=new f;var L,C,M=Promise.resolve(),R={imports:{},scopes:{},depcache:{},integrity:{}},T=y;if(P.prepareImport=function(e){return (T||e)&&(v(),T=!1),M},y&&(v(),window.addEventListener("DOMContentLoaded",v)),P.addImportMap=function(e,t){i(e,t||p,R);},y){window.addEventListener("error",(function(e){W=e.filename,q=e.error;}));var _=location.origin;}P.createScript=function(e){var t=document.createElement("script");t.async=!0,e.indexOf(_+"/")&&(t.crossOrigin="anonymous");var r=R.integrity[e];return r&&(t.integrity=r),t.src=e,t};var W,q,k={},A=P.register;P.register=function(e,t){if(y&&"loading"===document.readyState&&"string"!=typeof e){var r=document.querySelectorAll("script[src]"),n=r[r.length-1];if(n){L=e;var i=this;C=setTimeout((function(){k[n.src]=[e,t],i.import(n.src);}));}}else L=void 0;return A.call(this,e,t)},P.instantiate=function(t,r){var n=k[t];if(n)return delete k[t],n;var i=this;return Promise.resolve(P.createScript(t)).then((function(n){return new Promise((function(o,s){n.addEventListener("error",(function(){s(Error(e(3,[t,r].join(", "))));})),n.addEventListener("load",(function(){if(document.head.removeChild(n),W===t)s(q);else {var e=i.getRegister(t);e&&e[0]===L&&clearTimeout(C),o(e);}})),document.head.appendChild(n);}))}))},P.shouldFetch=function(){return !1},"undefined"!=typeof fetch&&(P.fetch=fetch);var F=P.instantiate,J=/^(text|application)\/(x-)?javascript(;|$)/;P.instantiate=function(t,r,n){var i=this;return this.shouldFetch(t,r,n)?this.fetch(t,{credentials:"same-origin",integrity:R.integrity[t],meta:n}).then((function(n){if(!n.ok)throw Error(e(7,[n.status,n.statusText,t,r].join(", ")));var o=n.headers.get("content-type");if(!o||!J.test(o))throw Error(e(4,o));return n.text().then((function(e){return e.indexOf("//# sourceURL=")<0&&(e+="\n//# sourceURL="+t),(0, eval)(e),i.getRegister(t)}))})):F.apply(this,arguments)},P.resolve=function(r,n){return u(R,t(r,n=n||p)||r,n)||function(t,r){throw Error(e(8,[t,r].join(", ")))}(r,n)};var U=P.instantiate;P.instantiate=function(e,t,r){var n=R.depcache[e];if(n)for(var i=0;i<n.length;i++)a(this,this.resolve(n[i],e),e);return U.call(this,e,t,r)},g&&"function"==typeof importScripts&&(P.instantiate=function(e){var t=this;return Promise.resolve().then((function(){return importScripts(e),t.getRegister(e)}))});}();

})();
