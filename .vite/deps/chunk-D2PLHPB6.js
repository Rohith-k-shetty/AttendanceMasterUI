import {
  CartesianProvider,
  DEFAULT_X_AXIS_KEY,
  DEFAULT_Y_AXIS_KEY,
  DrawingContext,
  DrawingProvider,
  PluginProvider,
  SeriesProvider,
  ZAxisContext,
  ZAxisContextProvider,
  date_default,
  getLabel,
  getScale,
  getValueToPositionMapper,
  isBandScale,
  isInfinity,
  number_default,
  useCartesianContext,
  useChartId,
  useColorProcessor,
  useDrawingArea,
  useSeries,
  useSvgRef,
  useTicks
} from "./chunk-AGGTGJ5Q.js";
import {
  globals_exports,
  useIsomorphicLayoutEffect
} from "./chunk-UDIHWF3L.js";
import {
  NoSsr_default
} from "./chunk-NIR5P3FT.js";
import {
  Popper_default
} from "./chunk-SAB4HTU4.js";
import {
  _objectWithoutPropertiesLoose
} from "./chunk-PF2VR3Y5.js";
import {
  Typography_default
} from "./chunk-3GCAC4JK.js";
import {
  useTheme
} from "./chunk-DAYEOI5M.js";
import {
  useThemeProps
} from "./chunk-LV4FTLQY.js";
import {
  require_react_is,
  shouldForwardProp,
  styled_default2 as styled_default,
  useRtl
} from "./chunk-Z2V24GCO.js";
import {
  require_jsx_runtime
} from "./chunk-RZSASJON.js";
import {
  clsx_default
} from "./chunk-KDVGFZWC.js";
import {
  _extends
} from "./chunk-HQ6ZTAWL.js";
import {
  require_prop_types
} from "./chunk-2WDQDCDP.js";
import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/x-charts/context/HighlightedProvider/HighlightedContext.js
var React = __toESM(require_react());
var HighlightedContext = React.createContext({
  isInitialized: false,
  data: {
    highlightedItem: null,
    setHighlighted: () => {
    },
    clearHighlighted: () => {
    },
    isHighlighted: () => false,
    isFaded: () => false
  }
});
if (true) {
  HighlightedContext.displayName = "HighlightedContext";
}

// node_modules/@mui/x-charts/context/HighlightedProvider/HighlightedProvider.js
var React3 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/useControlled/useControlled.js
var React2 = __toESM(require_react());
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = React2.useRef(controlled !== void 0);
  const [valueState, setValue] = React2.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  if (true) {
    React2.useEffect(() => {
      if (isControlled !== (controlled !== void 0)) {
        console.error([`MUI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React2.useRef(defaultProp);
    React2.useEffect(() => {
      if (!isControlled && !Object.is(defaultValue, defaultProp)) {
        console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
      }
    }, [JSON.stringify(defaultProp)]);
  }
  const setValueIfUncontrolled = React2.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}

// node_modules/@mui/x-charts/context/HighlightedProvider/createIsFaded.js
var createIsFaded = (highlightScope, highlightedItem) => (input) => {
  if (!highlightScope) {
    return false;
  }
  if (highlightScope.fade === "series") {
    return input.seriesId === (highlightedItem == null ? void 0 : highlightedItem.seriesId) && input.dataIndex !== (highlightedItem == null ? void 0 : highlightedItem.dataIndex);
  }
  if (highlightScope.fade === "global") {
    return input.seriesId !== (highlightedItem == null ? void 0 : highlightedItem.seriesId) || input.dataIndex !== (highlightedItem == null ? void 0 : highlightedItem.dataIndex);
  }
  return false;
};

// node_modules/@mui/x-charts/context/HighlightedProvider/createIsHighlighted.js
var createIsHighlighted = (highlightScope, highlightedItem) => (input) => {
  if (!highlightScope) {
    return false;
  }
  if (highlightScope.highlight === "series") {
    return input.seriesId === (highlightedItem == null ? void 0 : highlightedItem.seriesId);
  }
  if (highlightScope.highlight === "item") {
    return input.dataIndex === (highlightedItem == null ? void 0 : highlightedItem.dataIndex) && input.seriesId === (highlightedItem == null ? void 0 : highlightedItem.seriesId);
  }
  return false;
};

// node_modules/@mui/x-charts/context/HighlightedProvider/HighlightedProvider.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["highlighted", "faded"];
var mergeDeprecatedOptions = (options) => {
  const _ref = options ?? {}, {
    highlighted,
    faded
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded);
  return _extends({
    highlight: highlighted,
    fade: faded
  }, other);
};
function HighlightedProvider({
  children,
  highlightedItem: highlightedItemProps,
  onHighlightChange
}) {
  const [highlightedItem, setHighlightedItem] = useControlled({
    controlled: highlightedItemProps,
    default: null,
    name: "HighlightedProvider",
    state: "highlightedItem"
  });
  const series = useSeries();
  const seriesById = React3.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    Object.keys(series).forEach((seriesType) => {
      const seriesData = series[seriesType];
      Object.keys((seriesData == null ? void 0 : seriesData.series) ?? {}).forEach((seriesId) => {
        const seriesItem = seriesData == null ? void 0 : seriesData.series[seriesId];
        map.set(seriesId, mergeDeprecatedOptions(seriesItem == null ? void 0 : seriesItem.highlightScope));
      });
    });
    return map;
  }, [series]);
  const highlightScope = highlightedItem && highlightedItem.seriesId ? seriesById.get(highlightedItem.seriesId) ?? void 0 : void 0;
  const providerValue = React3.useMemo(() => {
    return {
      isInitialized: true,
      data: {
        highlightScope,
        highlightedItem,
        setHighlighted: (itemData) => {
          setHighlightedItem(itemData);
          onHighlightChange == null ? void 0 : onHighlightChange(itemData);
        },
        clearHighlighted: () => {
          setHighlightedItem(null);
          onHighlightChange == null ? void 0 : onHighlightChange(null);
        },
        isHighlighted: createIsHighlighted(highlightScope, highlightedItem),
        isFaded: createIsFaded(highlightScope, highlightedItem)
      }
    };
  }, [highlightedItem, highlightScope, setHighlightedItem, onHighlightChange]);
  return (0, import_jsx_runtime.jsx)(HighlightedContext.Provider, {
    value: providerValue,
    children
  });
}
true ? HighlightedProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types.default.node,
  /**
   * The item currently highlighted. Turns highlighting into a controlled prop.
   */
  highlightedItem: import_prop_types.default.shape({
    dataIndex: import_prop_types.default.number,
    seriesId: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])
  }),
  /**
   * The callback fired when the highlighted item changes.
   *
   * @param {HighlightItemData | null} highlightedItem  The newly highlighted item.
   */
  onHighlightChange: import_prop_types.default.func
} : void 0;

// node_modules/@mui/x-charts/context/HighlightedProvider/useHighlighted.js
var React4 = __toESM(require_react());
function useHighlighted() {
  const {
    isInitialized,
    data
  } = React4.useContext(HighlightedContext);
  if (!isInitialized) {
    throw new Error(["MUI X: Could not find the highlighted ref context.", "It looks like you rendered your component outside of a ChartsContainer parent component."].join("\n"));
  }
  return data;
}

// node_modules/@mui/x-charts/context/HighlightedProvider/useItemHighlighted.js
function useItemHighlighted(item) {
  const highlighted = useHighlighted();
  if (!item) {
    return {
      isHighlighted: false,
      isFaded: false
    };
  }
  const isHighlighted = highlighted.isHighlighted(item);
  const isFaded = !isHighlighted && highlighted.isFaded(item);
  return {
    isHighlighted,
    isFaded
  };
}

// node_modules/@mui/x-charts/ChartsText/ChartsText.js
var React5 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/internals/domUtils.js
function isSsr() {
  return typeof window === "undefined";
}
var stringCache = {
  widthCache: {},
  cacheCount: 0
};
var MAX_CACHE_NUM = 2e3;
var SPAN_STYLE = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
};
var STYLE_LIST = ["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height", "top", "left", "fontSize", "padding", "margin", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom"];
var MEASUREMENT_SPAN_ID = "mui_measurement_span";
function autoCompleteStyle(name, value) {
  if (STYLE_LIST.indexOf(name) >= 0 && value === +value) {
    return `${value}px`;
  }
  return value;
}
function camelToMiddleLine(text) {
  const strs = text.split("");
  const formatStrs = strs.reduce((result, entry) => {
    if (entry === entry.toUpperCase()) {
      return [...result, "-", entry.toLowerCase()];
    }
    return [...result, entry];
  }, []);
  return formatStrs.join("");
}
var getStyleString = (style) => Object.keys(style).sort().reduce((result, s) => `${result}${camelToMiddleLine(s)}:${autoCompleteStyle(s, style[s])};`, "");
var domCleanTimeout;
var getStringSize = (text, style = {}) => {
  if (text === void 0 || text === null || isSsr()) {
    return {
      width: 0,
      height: 0
    };
  }
  const str = `${text}`;
  const styleString = getStyleString(style);
  const cacheKey = `${str}-${styleString}`;
  if (stringCache.widthCache[cacheKey]) {
    return stringCache.widthCache[cacheKey];
  }
  try {
    let measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
    if (measurementSpan === null) {
      measurementSpan = document.createElement("span");
      measurementSpan.setAttribute("id", MEASUREMENT_SPAN_ID);
      measurementSpan.setAttribute("aria-hidden", "true");
      document.body.appendChild(measurementSpan);
    }
    const measurementSpanStyle = _extends({}, SPAN_STYLE, style);
    Object.keys(measurementSpanStyle).map((styleKey) => {
      measurementSpan.style[camelToMiddleLine(styleKey)] = autoCompleteStyle(styleKey, measurementSpanStyle[styleKey]);
      return styleKey;
    });
    measurementSpan.textContent = str;
    const rect = measurementSpan.getBoundingClientRect();
    const result = {
      width: rect.width,
      height: rect.height
    };
    stringCache.widthCache[cacheKey] = result;
    if (stringCache.cacheCount + 1 > MAX_CACHE_NUM) {
      stringCache.cacheCount = 0;
      stringCache.widthCache = {};
    } else {
      stringCache.cacheCount += 1;
    }
    if (domCleanTimeout) {
      clearTimeout(domCleanTimeout);
    }
    domCleanTimeout = setTimeout(() => {
      measurementSpan.textContent = "";
    }, 0);
    return result;
  } catch (e) {
    return {
      width: 0,
      height: 0
    };
  }
};

// node_modules/@mui/x-charts/internals/getWordsByLines.js
function getWordsByLines({
  style,
  needsComputation,
  text
}) {
  return text.split("\n").map((subText) => _extends({
    text: subText
  }, needsComputation ? getStringSize(subText, style) : {
    width: 0,
    height: 0
  }));
}

// node_modules/@mui/x-charts/ChartsText/ChartsText.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded2 = ["x", "y", "style", "text", "ownerState"];
var _excluded22 = ["angle", "textAnchor", "dominantBaseline"];
function ChartsText(props) {
  const {
    x,
    y,
    style: styleProps,
    text
  } = props, textProps = _objectWithoutPropertiesLoose(props, _excluded2);
  const _ref = styleProps ?? {}, {
    angle,
    textAnchor,
    dominantBaseline
  } = _ref, style = _objectWithoutPropertiesLoose(_ref, _excluded22);
  const wordsByLines = React5.useMemo(() => getWordsByLines({
    style,
    needsComputation: text.includes("\n"),
    text
  }), [style, text]);
  let startDy;
  switch (dominantBaseline) {
    case "hanging":
      startDy = 0;
      break;
    case "central":
      startDy = (wordsByLines.length - 1) / 2 * -wordsByLines[0].height;
      break;
    default:
      startDy = (wordsByLines.length - 1) * -wordsByLines[0].height;
      break;
  }
  const transforms = [];
  if (angle) {
    transforms.push(`rotate(${angle}, ${x}, ${y})`);
  }
  return (0, import_jsx_runtime2.jsx)("text", _extends({}, textProps, {
    transform: transforms.length > 0 ? transforms.join(" ") : void 0,
    x,
    y,
    textAnchor,
    dominantBaseline,
    style,
    children: wordsByLines.map((line, index) => (0, import_jsx_runtime2.jsx)("tspan", {
      x,
      dy: `${index === 0 ? startDy : wordsByLines[0].height}px`,
      dominantBaseline,
      children: line.text
    }, index))
  }));
}
true ? ChartsText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Height of a text line (in `em`).
   */
  lineHeight: import_prop_types2.default.number,
  /**
   * If `true`, the line width is computed.
   * @default false
   */
  needsComputation: import_prop_types2.default.bool,
  ownerState: import_prop_types2.default.any,
  /**
   * Style applied to text elements.
   */
  style: import_prop_types2.default.object,
  /**
   * Text displayed.
   */
  text: import_prop_types2.default.string.isRequired
} : void 0;

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/chainPropTypes/chainPropTypes.js
function chainPropTypes(propType1, propType2) {
  if (false) {
    return () => null;
  }
  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
}

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js
var import_prop_types3 = __toESM(require_prop_types());
function isClassComponent(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function acceptingRef(props, propName, componentName, location, propFullName) {
  const element = props[propName];
  const safePropName = propFullName || propName;
  if (element == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === "undefined") {
    return null;
  }
  let warningHint;
  const elementType = element.type;
  if (typeof elementType === "function" && !isClassComponent(elementType)) {
    warningHint = "Did you accidentally use a plain function component for an element instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var elementAcceptingRef = chainPropTypes(import_prop_types3.default.element, acceptingRef);
elementAcceptingRef.isRequired = chainPropTypes(import_prop_types3.default.element.isRequired, acceptingRef);

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/elementTypeAcceptingRef/elementTypeAcceptingRef.js
var import_prop_types4 = __toESM(require_prop_types());
function isClassComponent2(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const safePropName = propFullName || propName;
  if (propValue == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === "undefined") {
    return null;
  }
  let warningHint;
  if (typeof propValue === "function" && !isClassComponent2(propValue)) {
    warningHint = "Did you accidentally provide a plain function component instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element type that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var elementTypeAcceptingRef_default = chainPropTypes(import_prop_types4.default.elementType, elementTypeAcceptingRef);

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/getDisplayName/getDisplayName.js
var import_react_is = __toESM(require_react_is());

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/ponyfillGlobal/ponyfillGlobal.js
var ponyfillGlobal_default = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/refType/refType.js
var import_prop_types5 = __toESM(require_prop_types());
var refType = import_prop_types5.default.oneOfType([import_prop_types5.default.func, import_prop_types5.default.object]);

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/isMuiElement/isMuiElement.js
var React6 = __toESM(require_react());

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js
function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/setRef/setRef.js
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js
var React7 = __toESM(require_react());
var useEnhancedEffect = typeof window !== "undefined" ? React7.useLayoutEffect : React7.useEffect;
var useEnhancedEffect_default = useEnhancedEffect;

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
var React8 = __toESM(require_react());

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/useForkRef/useForkRef.js
var React9 = __toESM(require_react());
function useForkRef(...refs) {
  return React9.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (instance2) => {
      refs.forEach((ref) => {
        setRef(ref, instance2);
      });
    };
  }, refs);
}

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js
var React10 = __toESM(require_react());

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/useOnMount/useOnMount.js
var React11 = __toESM(require_react());

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/useTimeout/useTimeout.js
var Timeout = class _Timeout {
  constructor() {
    this.currentId = null;
    this.clear = () => {
      if (this.currentId !== null) {
        clearTimeout(this.currentId);
        this.currentId = null;
      }
    };
    this.disposeEffect = () => {
      return this.clear;
    };
  }
  static create() {
    return new _Timeout();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay, fn) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = null;
      fn();
    }, delay);
  }
};

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/useIsFocusVisible/useIsFocusVisible.js
var React12 = __toESM(require_react());
var hadFocusVisibleRecentlyTimeout = new Timeout();

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/usePreviousProps/usePreviousProps.js
var React13 = __toESM(require_react());

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/getValidReactChildren/getValidReactChildren.js
var React14 = __toESM(require_react());

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/integerPropType/integerPropType.js
function getTypeByValue(value) {
  const valueType = typeof value;
  switch (valueType) {
    case "number":
      if (Number.isNaN(value)) {
        return "NaN";
      }
      if (!Number.isFinite(value)) {
        return "Infinity";
      }
      if (value !== Math.floor(value)) {
        return "float";
      }
      return "number";
    case "object":
      if (value === null) {
        return "null";
      }
      return value.constructor.name;
    default:
      return valueType;
  }
}
function ponyfillIsInteger(x) {
  return typeof x === "number" && isFinite(x) && Math.floor(x) === x;
}
var isInteger = Number.isInteger || ponyfillIsInteger;
function requiredInteger(props, propName, componentName, location) {
  const propValue = props[propName];
  if (propValue == null || !isInteger(propValue)) {
    const propType = getTypeByValue(propValue);
    return new RangeError(`Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`);
  }
  return null;
}
function validator(props, propName, ...other) {
  const propValue = props[propName];
  if (propValue === void 0) {
    return null;
  }
  return requiredInteger(props, propName, ...other);
}
function validatorNoop() {
  return null;
}
validator.isRequired = requiredInteger;
validatorNoop.isRequired = validatorNoop;

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/composeClasses/composeClasses.js
function composeClasses(slots, getUtilityClass, classes = void 0) {
  const output = {};
  Object.keys(slots).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (slot) => {
      output[slot] = slots[slot].reduce((acc, key) => {
        if (key) {
          const utilityClass = getUtilityClass(key);
          if (utilityClass !== "") {
            acc.push(utilityClass);
          }
          if (classes && classes[key]) {
            acc.push(classes[key]);
          }
        }
        return acc;
      }, []).join(" ");
    }
  );
  return output;
}

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js
var defaultGenerator = (componentName) => componentName;
var createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator) {
      generate = generator;
    },
    generate(componentName) {
      return generate(componentName);
    },
    reset() {
      generate = defaultGenerator;
    }
  };
};
var ClassNameGenerator = createClassNameGenerator();
var ClassNameGenerator_default = ClassNameGenerator;

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js
var globalStateClasses = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function generateUtilityClass(componentName, slot, globalStatePrefix = "Mui") {
  const globalStateClass = globalStateClasses[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator_default.generate(componentName)}-${slot}`;
}

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js
function generateUtilityClasses(componentName, slots, globalStatePrefix = "Mui") {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });
  return result;
}

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/isHostComponent/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}
var isHostComponent_default = isHostComponent;

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === void 0 || isHostComponent_default(elementType)) {
    return otherProps;
  }
  return _extends({}, otherProps, {
    ownerState: _extends({}, otherProps.ownerState, ownerState)
  });
}
var appendOwnerState_default = appendOwnerState;

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var extractEventHandlers_default = extractEventHandlers;

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/omitEventHandlers/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var omitEventHandlers_default = omitEventHandlers;

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_default(additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
    const mergedStyle2 = _extends({}, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
    const props2 = _extends({}, additionalProps, externalForwardedProps, externalSlotProps);
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers_default(_extends({}, externalForwardedProps, externalSlotProps));
  const componentsPropsWithoutEventHandlers = omitEventHandlers_default(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers_default(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = _extends({}, internalSlotProps == null ? void 0 : internalSlotProps.style, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
  const props = _extends({}, internalSlotProps, additionalProps, otherPropsWithoutEventHandlers, componentsPropsWithoutEventHandlers);
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}
var mergeSlotProps_default = mergeSlotProps;

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState, slotState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState, slotState);
  }
  return componentProps;
}
var resolveComponentProps_default = resolveComponentProps;

// node_modules/@mui/x-charts/node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js
var _excluded3 = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function useSlotProps(parameters) {
  var _parameters$additiona;
  const {
    elementType,
    externalSlotProps,
    ownerState,
    skipResolvingSlotProps = false
  } = parameters, rest = _objectWithoutPropertiesLoose(parameters, _excluded3);
  const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps_default(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps_default(_extends({}, rest, {
    externalSlotProps: resolvedComponentsProps
  }));
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_parameters$additiona = parameters.additionalProps) == null ? void 0 : _parameters$additiona.ref);
  const props = appendOwnerState_default(elementType, _extends({}, mergedProps, {
    ref
  }), ownerState);
  return props;
}
var useSlotProps_default = useSlotProps;

// node_modules/@mui/x-charts/ChartsAxis/axisClasses.js
function getAxisUtilityClass(slot) {
  return generateUtilityClass("MuiChartsAxis", slot);
}
var axisClasses = generateUtilityClasses("MuiChartsAxis", ["root", "line", "tickContainer", "tick", "tickLabel", "label", "directionX", "directionY", "top", "bottom", "left", "right"]);

// node_modules/@mui/x-charts/ChartsXAxis/ChartsXAxis.js
var React16 = __toESM(require_react());
var import_prop_types6 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/internals/components/AxisSharedComponents.js
var AxisRoot = styled_default("g", {
  name: "MuiChartsAxis",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => ({
  [`& .${axisClasses.tickLabel}`]: _extends({}, theme.typography.caption, {
    fill: (theme.vars || theme).palette.text.primary
  }),
  [`& .${axisClasses.label}`]: _extends({}, theme.typography.body1, {
    fill: (theme.vars || theme).palette.text.primary
  }),
  [`& .${axisClasses.line}`]: {
    stroke: (theme.vars || theme).palette.text.primary,
    shapeRendering: "crispEdges",
    strokeWidth: 1
  },
  [`& .${axisClasses.tick}`]: {
    stroke: (theme.vars || theme).palette.text.primary,
    shapeRendering: "crispEdges"
  }
}));

// node_modules/@mui/x-charts/internals/geometry.js
var ANGLE_APPROX = 5;
var warnedOnce = false;
function getMinXTranslation(width, height, angle = 0) {
  if (true) {
    if (!warnedOnce && angle > 90 && angle < -90) {
      warnedOnce = true;
      console.warn([`MUI X: It seems you applied an angle larger than 90° or smaller than -90° to an axis text.`, `This could cause some text overlapping.`, `If you encounter a use case where it's needed, please open an issue.`].join("\n"));
    }
  }
  const standardAngle = Math.min(Math.abs(angle) % 180, Math.abs(Math.abs(angle) % 180 - 180) % 180);
  if (standardAngle < ANGLE_APPROX) {
    return width;
  }
  if (standardAngle > 90 - ANGLE_APPROX) {
    return height;
  }
  const radAngle = standardAngle * Math.PI / 180;
  const angleSwich = Math.atan2(height, width);
  if (radAngle < angleSwich) {
    return width / Math.cos(radAngle);
  }
  return height / Math.sin(radAngle);
}

// node_modules/@mui/x-charts/hooks/useMounted.js
var React15 = __toESM(require_react());
function useMounted(defer = false) {
  const [mountedState, setMountedState] = React15.useState(false);
  useEnhancedEffect_default(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  React15.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);
  return mountedState;
}

// node_modules/@mui/x-charts/ChartsXAxis/ChartsXAxis.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var _excluded4 = ["scale", "tickNumber", "reverse"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    position
  } = ownerState;
  const slots = {
    root: ["root", "directionX", position],
    line: ["line"],
    tickContainer: ["tickContainer"],
    tick: ["tick"],
    tickLabel: ["tickLabel"],
    label: ["label"]
  };
  return composeClasses(slots, getAxisUtilityClass, classes);
};
function addLabelDimension(xTicks, {
  tickLabelStyle: style,
  tickLabelInterval,
  reverse,
  isMounted
}) {
  const withDimension = xTicks.map((tick) => {
    if (!isMounted || tick.formattedValue === void 0) {
      return _extends({}, tick, {
        width: 0,
        height: 0
      });
    }
    const tickSizes = getWordsByLines({
      style,
      needsComputation: true,
      text: tick.formattedValue
    });
    return _extends({}, tick, {
      width: Math.max(...tickSizes.map((size) => size.width)),
      height: Math.max(tickSizes.length * tickSizes[0].height)
    });
  });
  if (typeof tickLabelInterval === "function") {
    return withDimension.map((item, index) => _extends({}, item, {
      skipLabel: !tickLabelInterval(item.value, index)
    }));
  }
  let currentTextLimit = 0;
  let previousTextLimit = 0;
  const direction = reverse ? -1 : 1;
  return withDimension.map((item, labelIndex) => {
    const {
      width,
      offset,
      labelOffset,
      height
    } = item;
    const distance = getMinXTranslation(width, height, style == null ? void 0 : style.angle);
    const textPosition = offset + labelOffset;
    const gapRatio = 1.2;
    currentTextLimit = textPosition - direction * (gapRatio * distance) / 2;
    if (labelIndex > 0 && direction * currentTextLimit < direction * previousTextLimit) {
      return _extends({}, item, {
        skipLabel: true
      });
    }
    previousTextLimit = textPosition + direction * (gapRatio * distance) / 2;
    return item;
  });
}
var XAxisRoot = styled_default(AxisRoot, {
  name: "MuiChartsXAxis",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({});
var defaultProps = {
  position: "bottom",
  disableLine: false,
  disableTicks: false,
  tickSize: 6
};
function ChartsXAxis(inProps) {
  const {
    xAxisIds,
    xAxis
  } = useCartesianContext();
  const _xAxis = xAxis[inProps.axisId ?? xAxisIds[0]], {
    scale: xScale,
    tickNumber,
    reverse
  } = _xAxis, settings = _objectWithoutPropertiesLoose(_xAxis, _excluded4);
  const isMounted = useMounted();
  const themedProps = useThemeProps({
    props: _extends({}, settings, inProps),
    name: "MuiChartsXAxis"
  });
  const defaultizedProps = _extends({}, defaultProps, themedProps);
  const {
    position,
    disableLine,
    disableTicks,
    tickLabelStyle,
    label,
    labelStyle,
    tickFontSize,
    labelFontSize,
    tickSize: tickSizeProp,
    valueFormatter,
    slots,
    slotProps,
    tickInterval,
    tickLabelInterval,
    tickPlacement,
    tickLabelPlacement,
    sx
  } = defaultizedProps;
  const theme = useTheme();
  const classes = useUtilityClasses(_extends({}, defaultizedProps, {
    theme
  }));
  const {
    left,
    top,
    width,
    height,
    isPointInside
  } = useDrawingArea();
  const tickSize = disableTicks ? 4 : tickSizeProp;
  const positionSign = position === "bottom" ? 1 : -1;
  const Line = (slots == null ? void 0 : slots.axisLine) ?? "line";
  const Tick = (slots == null ? void 0 : slots.axisTick) ?? "line";
  const TickLabel = (slots == null ? void 0 : slots.axisTickLabel) ?? ChartsText;
  const Label = (slots == null ? void 0 : slots.axisLabel) ?? ChartsText;
  const axisTickLabelProps = useSlotProps_default({
    elementType: TickLabel,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisTickLabel,
    additionalProps: {
      style: _extends({
        textAnchor: "middle",
        dominantBaseline: position === "bottom" ? "hanging" : "auto",
        fontSize: tickFontSize ?? 12
      }, tickLabelStyle)
    },
    className: classes.tickLabel,
    ownerState: {}
  });
  const xTicks = useTicks({
    scale: xScale,
    tickNumber,
    valueFormatter,
    tickInterval,
    tickPlacement,
    tickLabelPlacement
  });
  const xTicksWithDimension = addLabelDimension(xTicks, {
    tickLabelStyle: axisTickLabelProps.style,
    tickLabelInterval,
    reverse,
    isMounted
  });
  const labelRefPoint = {
    x: left + width / 2,
    y: positionSign * (tickSize + 22)
  };
  const axisLabelProps = useSlotProps_default({
    elementType: Label,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisLabel,
    additionalProps: {
      style: _extends({
        fontSize: labelFontSize ?? 14,
        textAnchor: "middle",
        dominantBaseline: position === "bottom" ? "hanging" : "auto"
      }, labelStyle)
    },
    ownerState: {}
  });
  const domain = xScale.domain();
  const ordinalAxis = isBandScale(xScale);
  if (ordinalAxis && domain.length === 0 || !ordinalAxis && domain.some(isInfinity)) {
    return null;
  }
  return (0, import_jsx_runtime3.jsxs)(XAxisRoot, {
    transform: `translate(0, ${position === "bottom" ? top + height : top})`,
    className: classes.root,
    sx,
    children: [!disableLine && (0, import_jsx_runtime3.jsx)(Line, _extends({
      x1: left,
      x2: left + width,
      className: classes.line
    }, slotProps == null ? void 0 : slotProps.axisLine)), xTicksWithDimension.map(({
      formattedValue,
      offset,
      labelOffset,
      skipLabel
    }, index) => {
      const xTickLabel = labelOffset ?? 0;
      const yTickLabel = positionSign * (tickSize + 3);
      const showTick = isPointInside({
        x: offset,
        y: -1
      }, {
        direction: "x"
      });
      const showTickLabel = isPointInside({
        x: offset + xTickLabel,
        y: -1
      }, {
        direction: "x"
      });
      return (0, import_jsx_runtime3.jsxs)("g", {
        transform: `translate(${offset}, 0)`,
        className: classes.tickContainer,
        children: [!disableTicks && showTick && (0, import_jsx_runtime3.jsx)(Tick, _extends({
          y2: positionSign * tickSize,
          className: classes.tick
        }, slotProps == null ? void 0 : slotProps.axisTick)), formattedValue !== void 0 && !skipLabel && showTickLabel && (0, import_jsx_runtime3.jsx)(TickLabel, _extends({
          x: xTickLabel,
          y: yTickLabel
        }, axisTickLabelProps, {
          text: formattedValue.toString()
        }))]
      }, index);
    }), label && (0, import_jsx_runtime3.jsx)("g", {
      className: classes.label,
      children: (0, import_jsx_runtime3.jsx)(Label, _extends({}, labelRefPoint, axisLabelProps, {
        text: label
      }))
    })]
  });
}
true ? ChartsXAxis.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The id of the axis to render.
   * If undefined, it will be the first defined axis.
   */
  axisId: import_prop_types6.default.oneOfType([import_prop_types6.default.number, import_prop_types6.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types6.default.object,
  /**
   * If true, the axis line is disabled.
   * @default false
   */
  disableLine: import_prop_types6.default.bool,
  /**
   * If true, the ticks are disabled.
   * @default false
   */
  disableTicks: import_prop_types6.default.bool,
  /**
   * The fill color of the axis text.
   * @default 'currentColor'
   */
  fill: import_prop_types6.default.string,
  /**
   * The label of the axis.
   */
  label: import_prop_types6.default.string,
  /**
   * The font size of the axis label.
   * @default 14
   * @deprecated Consider using `labelStyle.fontSize` instead.
   */
  labelFontSize: import_prop_types6.default.number,
  /**
   * The style applied to the axis label.
   */
  labelStyle: import_prop_types6.default.object,
  /**
   * Position of the axis.
   */
  position: import_prop_types6.default.oneOf(["bottom", "top"]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types6.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types6.default.object,
  /**
   * The stroke color of the axis line.
   * @default 'currentColor'
   */
  stroke: import_prop_types6.default.string,
  sx: import_prop_types6.default.oneOfType([import_prop_types6.default.arrayOf(import_prop_types6.default.oneOfType([import_prop_types6.default.func, import_prop_types6.default.object, import_prop_types6.default.bool])), import_prop_types6.default.func, import_prop_types6.default.object]),
  /**
   * The font size of the axis ticks text.
   * @default 12
   * @deprecated Consider using `tickLabelStyle.fontSize` instead.
   */
  tickFontSize: import_prop_types6.default.number,
  /**
   * Defines which ticks are displayed.
   * Its value can be:
   * - 'auto' In such case the ticks are computed based on axis scale and other parameters.
   * - a filtering function of the form `(value, index) => boolean` which is available only if the axis has "point" scale.
   * - an array containing the values where ticks should be displayed.
   * @see See {@link https://mui.com/x/react-charts/axis/#fixed-tick-positions}
   * @default 'auto'
   */
  tickInterval: import_prop_types6.default.oneOfType([import_prop_types6.default.oneOf(["auto"]), import_prop_types6.default.array, import_prop_types6.default.func]),
  /**
   * Defines which ticks get its label displayed. Its value can be:
   * - 'auto' In such case, labels are displayed if they do not overlap with the previous one.
   * - a filtering function of the form (value, index) => boolean. Warning: the index is tick index, not data ones.
   * @default 'auto'
   */
  tickLabelInterval: import_prop_types6.default.oneOfType([import_prop_types6.default.oneOf(["auto"]), import_prop_types6.default.func]),
  /**
   * The placement of ticks label. Can be the middle of the band, or the tick position.
   * Only used if scale is 'band'.
   * @default 'middle'
   */
  tickLabelPlacement: import_prop_types6.default.oneOf(["middle", "tick"]),
  /**
   * The style applied to ticks text.
   */
  tickLabelStyle: import_prop_types6.default.object,
  /**
   * Maximal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMaxStep: import_prop_types6.default.number,
  /**
   * Minimal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMinStep: import_prop_types6.default.number,
  /**
   * The number of ticks. This number is not guaranteed.
   * Not supported by categorical axis (band, points).
   */
  tickNumber: import_prop_types6.default.number,
  /**
   * The placement of ticks in regard to the band interval.
   * Only used if scale is 'band'.
   * @default 'extremities'
   */
  tickPlacement: import_prop_types6.default.oneOf(["end", "extremities", "middle", "start"]),
  /**
   * The size of the ticks.
   * @default 6
   */
  tickSize: import_prop_types6.default.number
} : void 0;

// node_modules/@mui/x-charts/ChartsYAxis/ChartsYAxis.js
var React17 = __toESM(require_react());
var import_prop_types7 = __toESM(require_prop_types());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var _excluded5 = ["scale", "tickNumber"];
var useUtilityClasses2 = (ownerState) => {
  const {
    classes,
    position
  } = ownerState;
  const slots = {
    root: ["root", "directionY", position],
    line: ["line"],
    tickContainer: ["tickContainer"],
    tick: ["tick"],
    tickLabel: ["tickLabel"],
    label: ["label"]
  };
  return composeClasses(slots, getAxisUtilityClass, classes);
};
var YAxisRoot = styled_default(AxisRoot, {
  name: "MuiChartsYAxis",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({});
var defaultProps2 = {
  position: "left",
  disableLine: false,
  disableTicks: false,
  tickFontSize: 12,
  labelFontSize: 14,
  tickSize: 6
};
function ChartsYAxis(inProps) {
  const {
    yAxisIds,
    yAxis
  } = useCartesianContext();
  const _yAxis = yAxis[inProps.axisId ?? yAxisIds[0]], {
    scale: yScale,
    tickNumber
  } = _yAxis, settings = _objectWithoutPropertiesLoose(_yAxis, _excluded5);
  const themedProps = useThemeProps({
    props: _extends({}, settings, inProps),
    name: "MuiChartsYAxis"
  });
  const defaultizedProps = _extends({}, defaultProps2, themedProps);
  const {
    position,
    disableLine,
    disableTicks,
    tickFontSize,
    label,
    labelFontSize,
    labelStyle,
    tickLabelStyle,
    tickSize: tickSizeProp,
    valueFormatter,
    slots,
    slotProps,
    tickPlacement,
    tickLabelPlacement,
    tickInterval,
    tickLabelInterval,
    sx
  } = defaultizedProps;
  const theme = useTheme();
  const isRtl = useRtl();
  const classes = useUtilityClasses2(_extends({}, defaultizedProps, {
    theme
  }));
  const {
    left,
    top,
    width,
    height,
    isPointInside
  } = useDrawingArea();
  const tickSize = disableTicks ? 4 : tickSizeProp;
  const yTicks = useTicks({
    scale: yScale,
    tickNumber,
    valueFormatter,
    tickPlacement,
    tickLabelPlacement,
    tickInterval
  });
  const positionSign = position === "right" ? 1 : -1;
  const labelRefPoint = {
    x: positionSign * (tickFontSize + tickSize + 10),
    y: top + height / 2
  };
  const Line = (slots == null ? void 0 : slots.axisLine) ?? "line";
  const Tick = (slots == null ? void 0 : slots.axisTick) ?? "line";
  const TickLabel = (slots == null ? void 0 : slots.axisTickLabel) ?? ChartsText;
  const Label = (slots == null ? void 0 : slots.axisLabel) ?? ChartsText;
  const revertAnchor = !isRtl && position === "right" || isRtl && position !== "right";
  const axisTickLabelProps = useSlotProps_default({
    elementType: TickLabel,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisTickLabel,
    additionalProps: {
      style: _extends({
        fontSize: tickFontSize,
        textAnchor: revertAnchor ? "start" : "end",
        dominantBaseline: "central"
      }, tickLabelStyle)
    },
    className: classes.tickLabel,
    ownerState: {}
  });
  const axisLabelProps = useSlotProps_default({
    elementType: Label,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisLabel,
    additionalProps: {
      style: _extends({
        fontSize: labelFontSize,
        angle: positionSign * 90,
        textAnchor: "middle",
        dominantBaseline: "auto"
      }, labelStyle)
    },
    ownerState: {}
  });
  const lineSlotProps = useSlotProps_default({
    elementType: Line,
    externalSlotProps: slotProps == null ? void 0 : slotProps.axisLine,
    additionalProps: {
      strokeLinecap: "square"
    },
    ownerState: {}
  });
  const domain = yScale.domain();
  const ordinalAxis = isBandScale(yScale);
  if (ordinalAxis && domain.length === 0 || !ordinalAxis && domain.some(isInfinity)) {
    return null;
  }
  return (0, import_jsx_runtime4.jsxs)(YAxisRoot, {
    transform: `translate(${position === "right" ? left + width : left}, 0)`,
    className: classes.root,
    sx,
    children: [!disableLine && (0, import_jsx_runtime4.jsx)(Line, _extends({
      y1: top,
      y2: top + height,
      className: classes.line
    }, lineSlotProps)), yTicks.map(({
      formattedValue,
      offset,
      labelOffset,
      value
    }, index) => {
      const xTickLabel = positionSign * (tickSize + 2);
      const yTickLabel = labelOffset;
      const skipLabel = typeof tickLabelInterval === "function" && !(tickLabelInterval == null ? void 0 : tickLabelInterval(value, index));
      const showLabel = isPointInside({
        x: -1,
        y: offset
      }, {
        direction: "y"
      });
      if (!showLabel) {
        return null;
      }
      return (0, import_jsx_runtime4.jsxs)("g", {
        transform: `translate(0, ${offset})`,
        className: classes.tickContainer,
        children: [!disableTicks && (0, import_jsx_runtime4.jsx)(Tick, _extends({
          x2: positionSign * tickSize,
          className: classes.tick
        }, slotProps == null ? void 0 : slotProps.axisTick)), formattedValue !== void 0 && !skipLabel && (0, import_jsx_runtime4.jsx)(TickLabel, _extends({
          x: xTickLabel,
          y: yTickLabel,
          text: formattedValue.toString()
        }, axisTickLabelProps))]
      }, index);
    }), label && (0, import_jsx_runtime4.jsx)("g", {
      className: classes.label,
      children: (0, import_jsx_runtime4.jsx)(Label, _extends({}, labelRefPoint, axisLabelProps, {
        text: label
      }))
    })]
  });
}
true ? ChartsYAxis.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The id of the axis to render.
   * If undefined, it will be the first defined axis.
   */
  axisId: import_prop_types7.default.oneOfType([import_prop_types7.default.number, import_prop_types7.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types7.default.object,
  /**
   * If true, the axis line is disabled.
   * @default false
   */
  disableLine: import_prop_types7.default.bool,
  /**
   * If true, the ticks are disabled.
   * @default false
   */
  disableTicks: import_prop_types7.default.bool,
  /**
   * The fill color of the axis text.
   * @default 'currentColor'
   */
  fill: import_prop_types7.default.string,
  /**
   * The label of the axis.
   */
  label: import_prop_types7.default.string,
  /**
   * The font size of the axis label.
   * @default 14
   * @deprecated Consider using `labelStyle.fontSize` instead.
   */
  labelFontSize: import_prop_types7.default.number,
  /**
   * The style applied to the axis label.
   */
  labelStyle: import_prop_types7.default.object,
  /**
   * Position of the axis.
   */
  position: import_prop_types7.default.oneOf(["left", "right"]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types7.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types7.default.object,
  /**
   * The stroke color of the axis line.
   * @default 'currentColor'
   */
  stroke: import_prop_types7.default.string,
  sx: import_prop_types7.default.oneOfType([import_prop_types7.default.arrayOf(import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object, import_prop_types7.default.bool])), import_prop_types7.default.func, import_prop_types7.default.object]),
  /**
   * The font size of the axis ticks text.
   * @default 12
   * @deprecated Consider using `tickLabelStyle.fontSize` instead.
   */
  tickFontSize: import_prop_types7.default.number,
  /**
   * Defines which ticks are displayed.
   * Its value can be:
   * - 'auto' In such case the ticks are computed based on axis scale and other parameters.
   * - a filtering function of the form `(value, index) => boolean` which is available only if the axis has "point" scale.
   * - an array containing the values where ticks should be displayed.
   * @see See {@link https://mui.com/x/react-charts/axis/#fixed-tick-positions}
   * @default 'auto'
   */
  tickInterval: import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["auto"]), import_prop_types7.default.array, import_prop_types7.default.func]),
  /**
   * Defines which ticks get its label displayed. Its value can be:
   * - 'auto' In such case, labels are displayed if they do not overlap with the previous one.
   * - a filtering function of the form (value, index) => boolean. Warning: the index is tick index, not data ones.
   * @default 'auto'
   */
  tickLabelInterval: import_prop_types7.default.oneOfType([import_prop_types7.default.oneOf(["auto"]), import_prop_types7.default.func]),
  /**
   * The placement of ticks label. Can be the middle of the band, or the tick position.
   * Only used if scale is 'band'.
   * @default 'middle'
   */
  tickLabelPlacement: import_prop_types7.default.oneOf(["middle", "tick"]),
  /**
   * The style applied to ticks text.
   */
  tickLabelStyle: import_prop_types7.default.object,
  /**
   * Maximal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMaxStep: import_prop_types7.default.number,
  /**
   * Minimal step between two ticks.
   * When using time data, the value is assumed to be in ms.
   * Not supported by categorical axis (band, points).
   */
  tickMinStep: import_prop_types7.default.number,
  /**
   * The number of ticks. This number is not guaranteed.
   * Not supported by categorical axis (band, points).
   */
  tickNumber: import_prop_types7.default.number,
  /**
   * The placement of ticks in regard to the band interval.
   * Only used if scale is 'band'.
   * @default 'extremities'
   */
  tickPlacement: import_prop_types7.default.oneOf(["end", "extremities", "middle", "start"]),
  /**
   * The size of the ticks.
   * @default 6
   */
  tickSize: import_prop_types7.default.number
} : void 0;

// node_modules/@mui/x-charts/ChartsAxis/ChartsAxis.js
var React18 = __toESM(require_react());
var import_prop_types8 = __toESM(require_prop_types());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var getAxisId = (propsValue, defaultAxisId) => {
  if (propsValue == null) {
    return null;
  }
  if (typeof propsValue === "object") {
    return propsValue.axisId ?? defaultAxisId ?? null;
  }
  return propsValue;
};
var mergeProps = (axisConfig, slots, slotProps) => {
  return typeof axisConfig === "object" ? _extends({}, axisConfig, {
    slots: _extends({}, slots, axisConfig == null ? void 0 : axisConfig.slots),
    slotProps: _extends({}, slotProps, axisConfig == null ? void 0 : axisConfig.slotProps)
  }) : {
    slots,
    slotProps
  };
};
function ChartsAxis(props) {
  const {
    topAxis,
    leftAxis,
    rightAxis,
    bottomAxis,
    slots,
    slotProps
  } = props;
  const {
    xAxis,
    xAxisIds,
    yAxis,
    yAxisIds
  } = useCartesianContext();
  const leftId = getAxisId(leftAxis === void 0 ? yAxisIds[0] : leftAxis, yAxisIds[0]);
  const bottomId = getAxisId(bottomAxis === void 0 ? xAxisIds[0] : bottomAxis, xAxisIds[0]);
  const topId = getAxisId(topAxis, xAxisIds[0]);
  const rightId = getAxisId(rightAxis, yAxisIds[0]);
  if (topId !== null && !xAxis[topId]) {
    throw Error([`MUI X: id used for top axis "${topId}" is not defined.`, `Available ids are: ${xAxisIds.join(", ")}.`].join("\n"));
  }
  if (leftId !== null && !yAxis[leftId]) {
    throw Error([`MUI X: id used for left axis "${leftId}" is not defined.`, `Available ids are: ${yAxisIds.join(", ")}.`].join("\n"));
  }
  if (rightId !== null && !yAxis[rightId]) {
    throw Error([`MUI X: id used for right axis "${rightId}" is not defined.`, `Available ids are: ${yAxisIds.join(", ")}.`].join("\n"));
  }
  if (bottomId !== null && !xAxis[bottomId]) {
    throw Error([`MUI X: id used for bottom axis "${bottomId}" is not defined.`, `Available ids are: ${xAxisIds.join(", ")}.`].join("\n"));
  }
  const topAxisProps = mergeProps(topAxis, slots, slotProps);
  const bottomAxisProps = mergeProps(bottomAxis, slots, slotProps);
  const leftAxisProps = mergeProps(leftAxis, slots, slotProps);
  const rightAxisProps = mergeProps(rightAxis, slots, slotProps);
  return (0, import_jsx_runtime5.jsxs)(React18.Fragment, {
    children: [topId && (0, import_jsx_runtime5.jsx)(ChartsXAxis, _extends({}, topAxisProps, {
      position: "top",
      axisId: topId
    })), bottomId && (0, import_jsx_runtime5.jsx)(ChartsXAxis, _extends({}, bottomAxisProps, {
      position: "bottom",
      axisId: bottomId
    })), leftId && (0, import_jsx_runtime5.jsx)(ChartsYAxis, _extends({}, leftAxisProps, {
      position: "left",
      axisId: leftId
    })), rightId && (0, import_jsx_runtime5.jsx)(ChartsYAxis, _extends({}, rightAxisProps, {
      position: "right",
      axisId: rightId
    }))]
  });
}
true ? ChartsAxis.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Indicate which axis to display the bottom of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default xAxisIds[0] The id of the first provided axis
   */
  bottomAxis: import_prop_types8.default.oneOfType([import_prop_types8.default.object, import_prop_types8.default.string]),
  /**
   * Indicate which axis to display the left of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default yAxisIds[0] The id of the first provided axis
   */
  leftAxis: import_prop_types8.default.oneOfType([import_prop_types8.default.object, import_prop_types8.default.string]),
  /**
   * Indicate which axis to display the right of the charts.
   * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
   * @default null
   */
  rightAxis: import_prop_types8.default.oneOfType([import_prop_types8.default.object, import_prop_types8.default.string]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types8.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types8.default.object,
  /**
   * Indicate which axis to display the top of the charts.
   * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
   * @default null
   */
  topAxis: import_prop_types8.default.oneOfType([import_prop_types8.default.object, import_prop_types8.default.string])
} : void 0;

// node_modules/@mui/x-charts/ChartsTooltip/utils.js
var React19 = __toESM(require_react());
function generateVirtualElement(mousePosition) {
  if (mousePosition === null) {
    return {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        toJSON: () => ""
      })
    };
  }
  const {
    x,
    y
  } = mousePosition;
  const boundingBox = {
    width: 0,
    height: 0,
    x,
    y,
    top: y,
    right: x,
    bottom: y,
    left: x
  };
  return {
    getBoundingClientRect: () => _extends({}, boundingBox, {
      toJSON: () => JSON.stringify(boundingBox)
    })
  };
}
function useMouseTracker() {
  const svgRef = useSvgRef();
  const [mousePosition, setMousePosition] = React19.useState(null);
  React19.useEffect(() => {
    const element = svgRef.current;
    if (element === null) {
      return () => {
      };
    }
    const handleOut = (event) => {
      if (event.pointerType !== "mouse") {
        setMousePosition(null);
      }
    };
    const handleMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
        height: event.height,
        pointerType: event.pointerType
      });
    };
    element.addEventListener("pointerdown", handleMove);
    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerup", handleOut);
    return () => {
      element.removeEventListener("pointerdown", handleMove);
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerup", handleOut);
    };
  }, [svgRef]);
  return mousePosition;
}
function getTooltipHasData(trigger, displayedData) {
  if (trigger === "item") {
    return displayedData !== null;
  }
  const hasAxisXData = displayedData.x !== null;
  const hasAxisYData = displayedData.y !== null;
  return hasAxisXData || hasAxisYData;
}
function utcFormatter(v) {
  if (v instanceof Date) {
    return v.toUTCString();
  }
  return v.toLocaleString();
}

// node_modules/@mui/x-charts/ChartsTooltip/chartsTooltipClasses.js
function getChartsTooltipUtilityClass(slot) {
  return generateUtilityClass("MuiChartsTooltip", slot);
}
var chartsTooltipClasses = generateUtilityClasses("MuiChartsTooltip", ["root", "paper", "table", "row", "cell", "mark", "markCell", "labelCell", "valueCell"]);

// node_modules/@mui/x-charts/ChartsTooltip/ChartsTooltipTable.js
var ChartsTooltipPaper = styled_default("div", {
  name: "MuiChartsTooltip",
  slot: "Container",
  overridesResolver: (props, styles) => styles.paper
})(({
  theme
}) => ({
  boxShadow: theme.shadows[1],
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.primary,
  transition: theme.transitions.create("box-shadow"),
  borderRadius: theme.shape.borderRadius
}));
var ChartsTooltipTable = styled_default("table", {
  name: "MuiChartsTooltip",
  slot: "Table",
  overridesResolver: (props, styles) => styles.table
})(({
  theme
}) => ({
  borderSpacing: 0,
  "& thead td": {
    borderBottom: `solid ${(theme.vars || theme).palette.divider} 1px`
  }
}));
var ChartsTooltipRow = styled_default("tr", {
  name: "MuiChartsTooltip",
  slot: "Row",
  overridesResolver: (props, styles) => styles.row
})(({
  theme
}) => ({
  "tr:first-of-type& td": {
    paddingTop: theme.spacing(1)
  },
  "tr:last-of-type& td": {
    paddingBottom: theme.spacing(1)
  }
}));
var ChartsTooltipCell = styled_default("td", {
  name: "MuiChartsTooltip",
  slot: "Cell",
  overridesResolver: (props, styles) => styles.cell
})(({
  theme
}) => ({
  verticalAlign: "middle",
  color: (theme.vars || theme).palette.text.secondary,
  [`&.${chartsTooltipClasses.labelCell}`]: {
    paddingLeft: theme.spacing(1)
  },
  [`&.${chartsTooltipClasses.valueCell}`]: {
    paddingLeft: theme.spacing(4),
    color: (theme.vars || theme).palette.text.primary
  },
  "td:first-of-type&": {
    paddingLeft: theme.spacing(2)
  },
  "td:last-of-type&": {
    paddingRight: theme.spacing(2)
  }
}));
var ChartsTooltipMark = styled_default("div", {
  name: "MuiChartsTooltip",
  slot: "Mark",
  overridesResolver: (props, styles) => styles.mark,
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "color"
})(({
  theme,
  color
}) => ({
  width: theme.spacing(1),
  height: theme.spacing(1),
  borderRadius: "50%",
  boxShadow: theme.shadows[1],
  backgroundColor: color,
  borderColor: (theme.vars || theme).palette.background.paper,
  border: `solid ${(theme.vars || theme).palette.background.paper} ${theme.spacing(0.25)}`,
  boxSizing: "content-box"
}));

// node_modules/@mui/x-charts/ChartsTooltip/DefaultChartsItemTooltipContent.js
var React20 = __toESM(require_react());
var import_prop_types9 = __toESM(require_prop_types());
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
function DefaultChartsItemTooltipContent(props) {
  var _a;
  const {
    series,
    itemData,
    sx,
    classes,
    getColor
  } = props;
  if (itemData.dataIndex === void 0 || !series.data[itemData.dataIndex]) {
    return null;
  }
  const {
    displayedLabel,
    color
  } = series.type === "pie" ? {
    color: getColor(itemData.dataIndex),
    displayedLabel: getLabel(series.data[itemData.dataIndex].label, "tooltip")
  } : {
    color: getColor(itemData.dataIndex),
    displayedLabel: getLabel(series.label, "tooltip")
  };
  const value = series.type === "pie" ? _extends({}, series.data[itemData.dataIndex], {
    label: getLabel(series.data[itemData.dataIndex].label, "tooltip")
  }) : series.data[itemData.dataIndex];
  const formattedValue = (_a = series.valueFormatter) == null ? void 0 : _a.call(series, value, {
    dataIndex: itemData.dataIndex
  });
  return (0, import_jsx_runtime6.jsx)(ChartsTooltipPaper, {
    sx,
    className: classes.paper,
    children: (0, import_jsx_runtime6.jsx)(ChartsTooltipTable, {
      className: classes.table,
      children: (0, import_jsx_runtime6.jsx)("tbody", {
        children: (0, import_jsx_runtime6.jsxs)(ChartsTooltipRow, {
          className: classes.row,
          children: [(0, import_jsx_runtime6.jsx)(ChartsTooltipCell, {
            className: clsx_default(classes.markCell, classes.cell),
            children: (0, import_jsx_runtime6.jsx)(ChartsTooltipMark, {
              color,
              className: classes.mark
            })
          }), (0, import_jsx_runtime6.jsx)(ChartsTooltipCell, {
            className: clsx_default(classes.labelCell, classes.cell),
            children: displayedLabel
          }), (0, import_jsx_runtime6.jsx)(ChartsTooltipCell, {
            className: clsx_default(classes.valueCell, classes.cell),
            children: formattedValue
          })]
        })
      })
    })
  });
}
true ? DefaultChartsItemTooltipContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types9.default.object.isRequired,
  /**
   * Get the color of the item with index `dataIndex`.
   * @param {number} dataIndex The data index of the item.
   * @returns {string} The color to display.
   */
  getColor: import_prop_types9.default.func.isRequired,
  /**
   * The data used to identify the triggered item.
   */
  itemData: import_prop_types9.default.shape({
    dataIndex: import_prop_types9.default.number,
    seriesId: import_prop_types9.default.oneOfType([import_prop_types9.default.number, import_prop_types9.default.string]).isRequired,
    type: import_prop_types9.default.oneOf(["bar", "line", "pie", "scatter"]).isRequired
  }).isRequired,
  /**
   * The series linked to the triggered axis.
   */
  series: import_prop_types9.default.object.isRequired,
  sx: import_prop_types9.default.oneOfType([import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object, import_prop_types9.default.bool])), import_prop_types9.default.func, import_prop_types9.default.object])
} : void 0;

// node_modules/@mui/x-charts/ChartsTooltip/ChartsItemTooltipContent.js
var React21 = __toESM(require_react());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
function ChartsItemTooltipContent(props) {
  var _a;
  const {
    content,
    itemData,
    sx,
    classes,
    contentProps
  } = props;
  const series = useSeries()[itemData.type].series[itemData.seriesId];
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = useCartesianContext();
  const {
    zAxis,
    zAxisIds
  } = React21.useContext(ZAxisContext);
  const colorProcessors = useColorProcessor();
  const xAxisId = series.xAxisId ?? series.xAxisKey ?? xAxisIds[0];
  const yAxisId = series.yAxisId ?? series.yAxisKey ?? yAxisIds[0];
  const zAxisId = series.zAxisId ?? series.zAxisKey ?? zAxisIds[0];
  const getColor = ((_a = colorProcessors[series.type]) == null ? void 0 : _a.call(colorProcessors, series, xAxisId && xAxis[xAxisId], yAxisId && yAxis[yAxisId], zAxisId && zAxis[zAxisId])) ?? (() => "");
  const Content = content ?? DefaultChartsItemTooltipContent;
  const chartTooltipContentProps = useSlotProps_default({
    elementType: Content,
    externalSlotProps: contentProps,
    additionalProps: {
      itemData,
      series,
      sx,
      classes,
      getColor
    },
    ownerState: {}
  });
  return (0, import_jsx_runtime7.jsx)(Content, _extends({}, chartTooltipContentProps));
}

// node_modules/@mui/x-charts/ChartsTooltip/DefaultChartsAxisTooltipContent.js
var React22 = __toESM(require_react());
var import_prop_types10 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/internals/configInit.js
var instance;
var CartesianSeriesTypes = class {
  constructor() {
    this.types = /* @__PURE__ */ new Set();
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this.types;
  }
  addType(value) {
    this.types.add(value);
  }
  getTypes() {
    return this.types;
  }
};
var cartesianSeriesTypes = new CartesianSeriesTypes();
cartesianSeriesTypes.addType("bar");
cartesianSeriesTypes.addType("line");
cartesianSeriesTypes.addType("scatter");

// node_modules/@mui/x-charts/internals/isCartesian.js
function isCartesianSeriesType(seriesType) {
  return cartesianSeriesTypes.getTypes().has(seriesType);
}
function isCartesianSeries(series) {
  return isCartesianSeriesType(series.type);
}

// node_modules/@mui/x-charts/ChartsTooltip/DefaultChartsAxisTooltipContent.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
function DefaultChartsAxisTooltipContent(props) {
  const {
    series,
    axis,
    dataIndex,
    axisValue,
    sx,
    classes
  } = props;
  if (dataIndex == null) {
    return null;
  }
  const axisFormatter = axis.valueFormatter ?? ((v) => axis.scaleType === "utc" ? utcFormatter(v) : v.toLocaleString());
  return (0, import_jsx_runtime8.jsx)(ChartsTooltipPaper, {
    sx,
    className: classes.paper,
    children: (0, import_jsx_runtime8.jsxs)(ChartsTooltipTable, {
      className: classes.table,
      children: [axisValue != null && !axis.hideTooltip && (0, import_jsx_runtime8.jsx)("thead", {
        children: (0, import_jsx_runtime8.jsx)(ChartsTooltipRow, {
          children: (0, import_jsx_runtime8.jsx)(ChartsTooltipCell, {
            colSpan: 3,
            children: (0, import_jsx_runtime8.jsx)(Typography_default, {
              children: axisFormatter(axisValue, {
                location: "tooltip"
              })
            })
          })
        })
      }), (0, import_jsx_runtime8.jsx)("tbody", {
        children: series.filter(isCartesianSeries).map(({
          id,
          label,
          valueFormatter,
          data,
          getColor
        }) => {
          const formattedValue = valueFormatter(data[dataIndex] ?? null, {
            dataIndex
          });
          if (formattedValue == null) {
            return null;
          }
          const formattedLabel = getLabel(label, "tooltip");
          const color = getColor(dataIndex);
          return (0, import_jsx_runtime8.jsxs)(ChartsTooltipRow, {
            className: classes.row,
            children: [(0, import_jsx_runtime8.jsx)(ChartsTooltipCell, {
              className: clsx_default(classes.markCell, classes.cell),
              children: color && (0, import_jsx_runtime8.jsx)(ChartsTooltipMark, {
                color,
                className: classes.mark
              })
            }), (0, import_jsx_runtime8.jsx)(ChartsTooltipCell, {
              className: clsx_default(classes.labelCell, classes.cell),
              children: formattedLabel ? (0, import_jsx_runtime8.jsx)(Typography_default, {
                children: formattedLabel
              }) : null
            }), (0, import_jsx_runtime8.jsx)(ChartsTooltipCell, {
              className: clsx_default(classes.valueCell, classes.cell),
              children: (0, import_jsx_runtime8.jsx)(Typography_default, {
                children: formattedValue
              })
            })]
          }, id);
        })
      })]
    })
  });
}
true ? DefaultChartsAxisTooltipContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The properties of the triggered axis.
   */
  axis: import_prop_types10.default.object.isRequired,
  /**
   * Data identifying the triggered axis.
   */
  axisData: import_prop_types10.default.shape({
    x: import_prop_types10.default.shape({
      index: import_prop_types10.default.number,
      value: import_prop_types10.default.oneOfType([import_prop_types10.default.instanceOf(Date), import_prop_types10.default.number, import_prop_types10.default.string]).isRequired
    }),
    y: import_prop_types10.default.shape({
      index: import_prop_types10.default.number,
      value: import_prop_types10.default.oneOfType([import_prop_types10.default.instanceOf(Date), import_prop_types10.default.number, import_prop_types10.default.string]).isRequired
    })
  }).isRequired,
  /**
   * The value associated to the current mouse position.
   */
  axisValue: import_prop_types10.default.oneOfType([import_prop_types10.default.instanceOf(Date), import_prop_types10.default.number, import_prop_types10.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types10.default.object.isRequired,
  /**
   * The index of the data item triggered.
   */
  dataIndex: import_prop_types10.default.number,
  /**
   * The series linked to the triggered axis.
   */
  series: import_prop_types10.default.arrayOf(import_prop_types10.default.object).isRequired,
  sx: import_prop_types10.default.oneOfType([import_prop_types10.default.arrayOf(import_prop_types10.default.oneOfType([import_prop_types10.default.func, import_prop_types10.default.object, import_prop_types10.default.bool])), import_prop_types10.default.func, import_prop_types10.default.object])
} : void 0;

// node_modules/@mui/x-charts/ChartsTooltip/ChartsAxisTooltipContent.js
var React23 = __toESM(require_react());
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
function ChartsAxisTooltipContent(props) {
  const {
    content,
    contentProps,
    axisData,
    sx,
    classes
  } = props;
  const isXaxis = axisData.x && axisData.x.index !== -1;
  const dataIndex = isXaxis ? axisData.x && axisData.x.index : axisData.y && axisData.y.index;
  const axisValue = isXaxis ? axisData.x && axisData.x.value : axisData.y && axisData.y.value;
  const {
    xAxisIds,
    xAxis,
    yAxisIds,
    yAxis
  } = useCartesianContext();
  const {
    zAxisIds,
    zAxis
  } = React23.useContext(ZAxisContext);
  const series = useSeries();
  const colorProcessors = useColorProcessor();
  const USED_AXIS_ID = isXaxis ? xAxisIds[0] : yAxisIds[0];
  const relevantSeries = React23.useMemo(() => {
    const rep = [];
    Object.keys(series).filter(isCartesianSeriesType).forEach((seriesType) => {
      series[seriesType].seriesOrder.forEach((seriesId) => {
        var _a;
        const item = series[seriesType].series[seriesId];
        const providedXAxisId = item.xAxisId ?? item.xAxisKey;
        const providedYAxisId = item.yAxisId ?? item.yAxisKey;
        const axisKey = isXaxis ? providedXAxisId : providedYAxisId;
        if (axisKey === void 0 || axisKey === USED_AXIS_ID) {
          const seriesToAdd = series[seriesType].series[seriesId];
          const xAxisId = providedXAxisId ?? xAxisIds[0];
          const yAxisId = providedYAxisId ?? yAxisIds[0];
          const zAxisId = seriesToAdd.zAxisId ?? seriesToAdd.zAxisKey ?? zAxisIds[0];
          const getColor = ((_a = colorProcessors[seriesType]) == null ? void 0 : _a.call(colorProcessors, seriesToAdd, xAxis[xAxisId], yAxis[yAxisId], zAxisId && zAxis[zAxisId])) ?? (() => "");
          rep.push(_extends({}, seriesToAdd, {
            getColor
          }));
        }
      });
    });
    return rep;
  }, [USED_AXIS_ID, colorProcessors, isXaxis, series, xAxis, xAxisIds, yAxis, yAxisIds, zAxis, zAxisIds]);
  const relevantAxis = React23.useMemo(() => {
    return isXaxis ? xAxis[USED_AXIS_ID] : yAxis[USED_AXIS_ID];
  }, [USED_AXIS_ID, isXaxis, xAxis, yAxis]);
  const Content = content ?? DefaultChartsAxisTooltipContent;
  const chartTooltipContentProps = useSlotProps_default({
    elementType: Content,
    externalSlotProps: contentProps,
    additionalProps: {
      axisData,
      series: relevantSeries,
      axis: relevantAxis,
      dataIndex,
      axisValue,
      sx,
      classes
    },
    ownerState: {}
  });
  return (0, import_jsx_runtime9.jsx)(Content, _extends({}, chartTooltipContentProps));
}

// node_modules/@mui/x-charts/ChartsTooltip/ChartsTooltip.js
var React25 = __toESM(require_react());
var import_prop_types11 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/context/InteractionProvider.js
var React24 = __toESM(require_react());
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var InteractionContext = React24.createContext({
  item: null,
  axis: {
    x: null,
    y: null
  },
  useVoronoiInteraction: false,
  dispatch: () => null
});
if (true) {
  InteractionContext.displayName = "InteractionContext";
}
var dataReducer = (prevState, action) => {
  switch (action.type) {
    case "enterItem":
      return _extends({}, prevState, {
        item: action.data
      });
    case "exitChart":
      if (prevState.item === null && prevState.axis.x === null && prevState.axis.y === null) {
        return prevState;
      }
      return _extends({}, prevState, {
        axis: {
          x: null,
          y: null
        },
        item: null
      });
    case "updateVoronoiUsage":
      return _extends({}, prevState, {
        useVoronoiInteraction: action.useVoronoiInteraction
      });
    case "leaveItem":
      if (prevState.item === null || Object.keys(action.data).some((key) => action.data[key] !== prevState.item[key])) {
        return prevState;
      }
      return _extends({}, prevState, {
        item: null
      });
    case "updateAxis":
      if (action.data.x === prevState.axis.x && action.data.y === prevState.axis.y) {
        return prevState;
      }
      return _extends({}, prevState, {
        axis: action.data
      });
    default:
      return prevState;
  }
};
function InteractionProvider(props) {
  const {
    children
  } = props;
  const [data, dispatch] = React24.useReducer(dataReducer, {
    item: null,
    axis: {
      x: null,
      y: null
    },
    useVoronoiInteraction: false
  });
  const value = React24.useMemo(() => _extends({}, data, {
    dispatch
  }), [data]);
  return (0, import_jsx_runtime10.jsx)(InteractionContext.Provider, {
    value,
    children
  });
}

// node_modules/@mui/x-charts/ChartsTooltip/ChartsTooltip.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var useUtilityClasses3 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"],
    table: ["table"],
    row: ["row"],
    cell: ["cell"],
    mark: ["mark"],
    markCell: ["markCell"],
    labelCell: ["labelCell"],
    valueCell: ["valueCell"]
  };
  return composeClasses(slots, getChartsTooltipUtilityClass, classes);
};
var ChartsTooltipRoot = styled_default(Popper_default, {
  name: "MuiChartsTooltip",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  pointerEvents: "none",
  zIndex: theme.zIndex.modal
}));
function ChartsTooltip(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiChartsTooltip"
  });
  const {
    trigger = "axis",
    itemContent,
    axisContent,
    slots,
    slotProps
  } = props;
  const mousePosition = useMouseTracker();
  const {
    item,
    axis
  } = React25.useContext(InteractionContext);
  const displayedData = trigger === "item" ? item : axis;
  const tooltipHasData = getTooltipHasData(trigger, displayedData);
  const popperOpen = mousePosition !== null && tooltipHasData;
  const classes = useUtilityClasses3({
    classes: props.classes
  });
  const PopperComponent = (slots == null ? void 0 : slots.popper) ?? ChartsTooltipRoot;
  const popperProps = useSlotProps_default({
    elementType: PopperComponent,
    externalSlotProps: slotProps == null ? void 0 : slotProps.popper,
    additionalProps: {
      open: popperOpen,
      placement: (mousePosition == null ? void 0 : mousePosition.pointerType) === "mouse" ? "right-start" : "top",
      anchorEl: generateVirtualElement(mousePosition),
      modifiers: [{
        name: "offset",
        options: {
          offset: [0, (mousePosition == null ? void 0 : mousePosition.pointerType) === "touch" ? 40 - mousePosition.height : 0]
        }
      }]
    },
    ownerState: {}
  });
  if (trigger === "none") {
    return null;
  }
  return (0, import_jsx_runtime11.jsx)(NoSsr_default, {
    children: popperOpen && (0, import_jsx_runtime11.jsx)(PopperComponent, _extends({}, popperProps, {
      className: classes.root,
      children: trigger === "item" ? (0, import_jsx_runtime11.jsx)(ChartsItemTooltipContent, {
        itemData: displayedData,
        content: (slots == null ? void 0 : slots.itemContent) ?? itemContent,
        contentProps: slotProps == null ? void 0 : slotProps.itemContent,
        sx: {
          mx: 2
        },
        classes
      }) : (0, import_jsx_runtime11.jsx)(ChartsAxisTooltipContent, {
        axisData: displayedData,
        content: (slots == null ? void 0 : slots.axisContent) ?? axisContent,
        contentProps: slotProps == null ? void 0 : slotProps.axisContent,
        sx: {
          mx: 2
        },
        classes
      })
    }))
  });
}
true ? ChartsTooltip.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Component to override the tooltip content when trigger is set to 'axis'.
   * @deprecated Use slots.axisContent instead
   */
  axisContent: import_prop_types11.default.elementType,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types11.default.object,
  /**
   * Component to override the tooltip content when trigger is set to 'item'.
   * @deprecated Use slots.itemContent instead
   */
  itemContent: import_prop_types11.default.elementType,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types11.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types11.default.object,
  /**
   * Select the kind of tooltip to display
   * - 'item': Shows data about the item below the mouse.
   * - 'axis': Shows values associated with the hovered x value
   * - 'none': Does not display tooltip
   * @default 'axis'
   */
  trigger: import_prop_types11.default.oneOf(["axis", "item", "none"])
} : void 0;

// node_modules/@mui/x-charts/ChartsTooltip/useItemTooltip.js
var React26 = __toESM(require_react());
function useItemTooltip() {
  var _a, _b, _c;
  const {
    item
  } = React26.useContext(InteractionContext);
  const series = useSeries();
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = useCartesianContext();
  const {
    zAxis,
    zAxisIds
  } = React26.useContext(ZAxisContext);
  const colorProcessors = useColorProcessor();
  const xAxisId = series.xAxisId ?? series.xAxisKey ?? xAxisIds[0];
  const yAxisId = series.yAxisId ?? series.yAxisKey ?? yAxisIds[0];
  const zAxisId = series.zAxisId ?? series.zAxisKey ?? zAxisIds[0];
  if (!item || item.dataIndex === void 0) {
    return null;
  }
  const itemSeries = series[item.type].series[item.seriesId];
  const getColor = ((_a = colorProcessors[itemSeries.type]) == null ? void 0 : _a.call(colorProcessors, itemSeries, xAxisId && xAxis[xAxisId], yAxisId && yAxis[yAxisId], zAxisId && zAxis[zAxisId])) ?? (() => "");
  if (itemSeries.type === "pie") {
    const point = itemSeries.data[item.dataIndex];
    const label2 = getLabel(point.label, "tooltip");
    const value2 = _extends({}, point, {
      label: label2
    });
    const formattedValue2 = (_b = itemSeries.valueFormatter) == null ? void 0 : _b.call(itemSeries, value2, {
      dataIndex: item.dataIndex
    });
    return {
      identifier: item,
      color: getColor(item.dataIndex),
      label: label2,
      value: value2,
      formattedValue: formattedValue2
    };
  }
  const label = getLabel(itemSeries.label, "tooltip");
  const value = itemSeries.data[item.dataIndex];
  const formattedValue = (_c = itemSeries.valueFormatter) == null ? void 0 : _c.call(itemSeries, value, {
    dataIndex: item.dataIndex
  });
  return {
    identifier: item,
    color: getColor(item.dataIndex),
    label,
    value,
    formattedValue
  };
}

// node_modules/@mui/x-charts/ChartsTooltip/useAxisTooltip.js
var React27 = __toESM(require_react());
function useAxisTooltip() {
  const {
    axis
  } = React27.useContext(InteractionContext);
  const series = useSeries();
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = useCartesianContext();
  const {
    zAxis,
    zAxisIds
  } = React27.useContext(ZAxisContext);
  const colorProcessors = useColorProcessor();
  const isXaxis = axis.x !== null && axis.x.index !== -1;
  const axisData = isXaxis ? axis.x && axis.x : axis.y && axis.y;
  if (axisData === null) {
    return null;
  }
  const {
    index: dataIndex,
    value: axisValue
  } = axisData;
  const USED_AXIS_ID = isXaxis ? xAxisIds[0] : yAxisIds[0];
  const usedAxis = isXaxis ? xAxis[USED_AXIS_ID] : yAxis[USED_AXIS_ID];
  const relevantSeries = Object.keys(series).filter(isCartesianSeriesType).flatMap((seriesType) => {
    const seriesOfType = series[seriesType];
    if (!seriesOfType) {
      return [];
    }
    return seriesOfType.seriesOrder.map((seriesId) => {
      var _a;
      const seriesToAdd = seriesOfType.series[seriesId];
      const providedXAxisId = seriesToAdd.xAxisId ?? seriesToAdd.xAxisKey;
      const providedYAxisId = seriesToAdd.yAxisId ?? seriesToAdd.yAxisKey;
      const axisKey = isXaxis ? providedXAxisId : providedYAxisId;
      if (axisKey === void 0 || axisKey === USED_AXIS_ID) {
        const xAxisId = providedXAxisId ?? xAxisIds[0];
        const yAxisId = providedYAxisId ?? yAxisIds[0];
        const zAxisId = seriesToAdd.zAxisId ?? seriesToAdd.zAxisKey ?? zAxisIds[0];
        const color = ((_a = colorProcessors[seriesType]) == null ? void 0 : _a.call(colorProcessors, seriesToAdd, xAxis[xAxisId], yAxis[yAxisId], zAxisId && zAxis[zAxisId])(dataIndex)) ?? "";
        const value = seriesToAdd.data[dataIndex] ?? null;
        const formattedValue = seriesToAdd.valueFormatter(value, {
          dataIndex
        });
        const formattedLabel = getLabel(seriesToAdd.label, "tooltip") ?? null;
        return {
          seriesId,
          color,
          value,
          formattedValue,
          formattedLabel
        };
      }
      return void 0;
    });
  }).filter((item) => item != null);
  const axisFormatter = usedAxis.valueFormatter ?? ((v) => usedAxis.scaleType === "utc" ? utcFormatter(v) : v.toLocaleString());
  const axisFormattedValue = axisFormatter(axisValue, {
    location: "tooltip"
  });
  return {
    identifier: axis,
    seriesItems: relevantSeries,
    axisValue,
    axisFormattedValue
  };
}

// node_modules/@mui/x-charts/BarChart/legend.js
var legendGetter = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      id: seriesId,
      seriesId,
      color: series[seriesId].color,
      label: formattedLabel
    });
    return acc;
  }, []);
};
var legend_default = legendGetter;

// node_modules/@mui/x-charts/ScatterChart/legend.js
var legendGetter2 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      id: seriesId,
      seriesId,
      color: series[seriesId].color,
      label: formattedLabel
    });
    return acc;
  }, []);
};
var legend_default2 = legendGetter2;

// node_modules/@mui/x-charts/LineChart/legend.js
var legendGetter3 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    const formattedLabel = getLabel(series[seriesId].label, "legend");
    if (formattedLabel === void 0) {
      return acc;
    }
    acc.push({
      id: seriesId,
      seriesId,
      color: series[seriesId].color,
      label: formattedLabel
    });
    return acc;
  }, []);
};
var legend_default3 = legendGetter3;

// node_modules/@mui/x-charts/PieChart/legend.js
var legendGetter4 = (params) => {
  const {
    seriesOrder,
    series
  } = params;
  return seriesOrder.reduce((acc, seriesId) => {
    series[seriesId].data.forEach((item) => {
      const formattedLabel = getLabel(item.label, "legend");
      if (formattedLabel === void 0) {
        return;
      }
      acc.push({
        id: item.id,
        seriesId,
        color: item.color,
        label: formattedLabel,
        itemId: item.id
      });
    });
    return acc;
  }, []);
};
var legend_default4 = legendGetter4;

// node_modules/@mui/x-charts/ChartsLegend/utils.js
var legendGetter5 = {
  bar: legend_default,
  scatter: legend_default2,
  line: legend_default3,
  pie: legend_default4
};
function getSeriesToDisplay(series) {
  return Object.keys(series).flatMap((seriesType) => {
    const getter = legendGetter5[seriesType];
    return getter === void 0 ? [] : getter(series[seriesType]);
  });
}

// node_modules/@mui/x-charts/ChartsLegend/chartsLegendClasses.js
function getLegendUtilityClass(slot) {
  return generateUtilityClass("MuiChartsLegend", slot);
}
var legendClasses = generateUtilityClasses("MuiChartsLegend", ["root", "series", "itemBackground", "mark", "label", "column", "row"]);

// node_modules/@mui/x-charts/ChartsLegend/DefaultChartsLegend.js
var React30 = __toESM(require_react());
var import_prop_types12 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/ChartsLegend/LegendPerItem.js
var React29 = __toESM(require_react());

// node_modules/@mui/x-charts/ChartsLegend/legendItemsPlacement.js
var _excluded6 = ["label"];
function legendItemPlacements(itemsToDisplay, getItemSpace, labelStyle, direction, availableWidth, availableHeight, itemGap) {
  let x = 0;
  let y = 0;
  let totalWidthUsed = 0;
  let totalHeightUsed = 0;
  let rowIndex = 0;
  const rowMaxHeight = [0];
  const seriesWithRawPosition = itemsToDisplay.map((_ref) => {
    let {
      label
    } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded6);
    const itemSpace = getItemSpace(label, labelStyle);
    const rep = _extends({}, other, {
      label,
      positionX: x,
      positionY: y,
      innerHeight: itemSpace.innerHeight,
      innerWidth: itemSpace.innerWidth,
      outerHeight: itemSpace.outerHeight,
      outerWidth: itemSpace.outerWidth,
      rowIndex
    });
    if (direction === "row") {
      if (x + itemSpace.innerWidth > availableWidth) {
        x = 0;
        y += rowMaxHeight[rowIndex];
        rowIndex += 1;
        if (rowMaxHeight.length <= rowIndex) {
          rowMaxHeight.push(0);
        }
        rep.positionX = x;
        rep.positionY = y;
        rep.rowIndex = rowIndex;
      }
      totalWidthUsed = Math.max(totalWidthUsed, x + itemSpace.outerWidth);
      totalHeightUsed = Math.max(totalHeightUsed, y + itemSpace.outerHeight);
      rowMaxHeight[rowIndex] = Math.max(rowMaxHeight[rowIndex], itemSpace.outerHeight);
      x += itemSpace.outerWidth;
    }
    if (direction === "column") {
      if (y + itemSpace.innerHeight > availableHeight) {
        x = totalWidthUsed + itemGap;
        y = 0;
        rowIndex = 0;
        rep.positionX = x;
        rep.positionY = y;
        rep.rowIndex = rowIndex;
      }
      if (rowMaxHeight.length <= rowIndex) {
        rowMaxHeight.push(0);
      }
      totalWidthUsed = Math.max(totalWidthUsed, x + itemSpace.outerWidth);
      totalHeightUsed = Math.max(totalHeightUsed, y + itemSpace.outerHeight);
      rowIndex += 1;
      y += itemSpace.outerHeight;
    }
    return rep;
  });
  return [seriesWithRawPosition.map((item) => _extends({}, item, {
    positionY: item.positionY + (direction === "row" ? rowMaxHeight[item.rowIndex] / 2 : item.outerHeight / 2)
    // Get the center of the item
  })), totalWidthUsed, totalHeightUsed];
}

// node_modules/@mui/x-charts/ChartsLegend/ChartsLegendItem.js
var React28 = __toESM(require_react());
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
function ChartsLegendItem(props) {
  const isRTL = useRtl();
  const {
    id,
    positionY,
    label,
    positionX,
    innerHeight,
    innerWidth,
    legendWidth,
    color,
    gapX,
    gapY,
    itemMarkHeight,
    itemMarkWidth,
    markGap,
    labelStyle,
    classes,
    onClick
  } = props;
  return (0, import_jsx_runtime12.jsxs)("g", {
    className: clsx_default(classes == null ? void 0 : classes.series, `${classes == null ? void 0 : classes.series}-${id}`),
    transform: `translate(${gapX + (isRTL ? legendWidth - positionX : positionX)} ${gapY + positionY})`,
    children: [(0, import_jsx_runtime12.jsx)("rect", {
      x: isRTL ? -(innerWidth + 2) : -2,
      y: -itemMarkHeight / 2 - 2,
      width: innerWidth + 4,
      height: innerHeight + 4,
      fill: "transparent",
      className: classes == null ? void 0 : classes.itemBackground,
      onClick,
      style: {
        pointerEvents: onClick ? "all" : "none",
        cursor: onClick ? "pointer" : "unset"
      }
    }), (0, import_jsx_runtime12.jsx)("rect", {
      className: classes == null ? void 0 : classes.mark,
      x: isRTL ? -itemMarkWidth : 0,
      y: -itemMarkHeight / 2,
      width: itemMarkWidth,
      height: itemMarkHeight,
      fill: color,
      style: {
        pointerEvents: "none"
      }
    }), (0, import_jsx_runtime12.jsx)(ChartsText, {
      style: _extends({
        pointerEvents: "none"
      }, labelStyle),
      text: label,
      x: (isRTL ? -1 : 1) * (itemMarkWidth + markGap),
      y: 0
    })]
  });
}

// node_modules/@mui/x-charts/ChartsLegend/LegendPerItem.js
var import_react = __toESM(require_react());
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var _excluded7 = ["rotate", "dominantBaseline"];
var ChartsLegendRoot = styled_default("g", {
  name: "MuiChartsLegend",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({});
var getStandardizedPadding = (padding) => {
  if (typeof padding === "number") {
    return {
      left: padding,
      right: padding,
      top: padding,
      bottom: padding
    };
  }
  return _extends({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }, padding);
};
function LegendPerItem(props) {
  const {
    position,
    direction,
    itemsToDisplay,
    classes,
    itemMarkWidth = 20,
    itemMarkHeight = 20,
    markGap = 5,
    itemGap = 10,
    padding: paddingProps = 10,
    labelStyle: inLabelStyle,
    onItemClick
  } = props;
  const theme = useTheme();
  const drawingArea = useDrawingArea();
  const labelStyle = React29.useMemo(
    () => _extends({}, theme.typography.subtitle1, {
      color: "inherit",
      dominantBaseline: "central",
      textAnchor: "start",
      fill: (theme.vars || theme).palette.text.primary,
      lineHeight: 1
    }, inLabelStyle),
    // To say to TS that the dominantBaseline and textAnchor are correct
    [inLabelStyle, theme]
  );
  const padding = React29.useMemo(() => getStandardizedPadding(paddingProps), [paddingProps]);
  const getItemSpace = React29.useCallback((label, inStyle = {}) => {
    const style = _objectWithoutPropertiesLoose(inStyle, _excluded7);
    const linesSize = getWordsByLines({
      style,
      needsComputation: true,
      text: label
    });
    const innerSize = {
      innerWidth: itemMarkWidth + markGap + Math.max(...linesSize.map((size) => size.width)),
      innerHeight: Math.max(itemMarkHeight, linesSize.length * linesSize[0].height)
    };
    return _extends({}, innerSize, {
      outerWidth: innerSize.innerWidth + itemGap,
      outerHeight: innerSize.innerHeight + itemGap
    });
  }, [itemGap, itemMarkHeight, itemMarkWidth, markGap]);
  const totalWidth = drawingArea.left + drawingArea.width + drawingArea.right;
  const totalHeight = drawingArea.top + drawingArea.height + drawingArea.bottom;
  const availableWidth = totalWidth - padding.left - padding.right;
  const availableHeight = totalHeight - padding.top - padding.bottom;
  const [itemsWithPosition, legendWidth, legendHeight] = React29.useMemo(() => legendItemPlacements(itemsToDisplay, getItemSpace, labelStyle, direction, availableWidth, availableHeight, itemGap), [itemsToDisplay, getItemSpace, labelStyle, direction, availableWidth, availableHeight, itemGap]);
  const gapX = React29.useMemo(() => {
    switch (position.horizontal) {
      case "left":
        return padding.left;
      case "right":
        return totalWidth - padding.right - legendWidth;
      default:
        return (totalWidth - legendWidth) / 2;
    }
  }, [position.horizontal, padding.left, padding.right, totalWidth, legendWidth]);
  const gapY = React29.useMemo(() => {
    switch (position.vertical) {
      case "top":
        return padding.top;
      case "bottom":
        return totalHeight - padding.bottom - legendHeight;
      default:
        return (totalHeight - legendHeight) / 2;
    }
  }, [position.vertical, padding.top, padding.bottom, totalHeight, legendHeight]);
  return (0, import_jsx_runtime13.jsx)(NoSsr_default, {
    children: (0, import_jsx_runtime13.jsx)(ChartsLegendRoot, {
      className: classes == null ? void 0 : classes.root,
      children: itemsWithPosition.map((item, i) => (0, import_react.createElement)(ChartsLegendItem, _extends({}, item, {
        key: item.id,
        gapX,
        gapY,
        legendWidth,
        itemMarkHeight,
        itemMarkWidth,
        markGap,
        labelStyle,
        classes,
        onClick: onItemClick ? (e) => onItemClick(e, i) : void 0
      })))
    })
  });
}

// node_modules/@mui/x-charts/ChartsLegend/DefaultChartsLegend.js
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var _excluded8 = ["drawingArea", "seriesToDisplay", "hidden", "onItemClick"];
var seriesContextBuilder = (context) => ({
  type: "series",
  color: context.color,
  label: context.label,
  seriesId: context.seriesId,
  itemId: context.itemId
});
function DefaultChartsLegend(props) {
  const {
    seriesToDisplay,
    hidden,
    onItemClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded8);
  if (hidden) {
    return null;
  }
  return (0, import_jsx_runtime14.jsx)(LegendPerItem, _extends({}, other, {
    itemsToDisplay: seriesToDisplay,
    onItemClick: onItemClick ? (e, i) => onItemClick(e, seriesContextBuilder(seriesToDisplay[i]), i) : void 0
  }));
}
true ? DefaultChartsLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types12.default.object,
  /**
   * The direction of the legend layout.
   * The default depends on the chart.
   */
  direction: import_prop_types12.default.oneOf(["column", "row"]).isRequired,
  /**
   * @deprecated Use the `useDrawingArea` hook instead.
   */
  drawingArea: import_prop_types12.default.shape({
    bottom: import_prop_types12.default.number.isRequired,
    height: import_prop_types12.default.number.isRequired,
    left: import_prop_types12.default.number.isRequired,
    right: import_prop_types12.default.number.isRequired,
    top: import_prop_types12.default.number.isRequired,
    width: import_prop_types12.default.number.isRequired
  }).isRequired,
  /**
   * Set to true to hide the legend.
   * @default false
   */
  hidden: import_prop_types12.default.bool,
  /**
   * Space between two legend items (in px).
   * @default 10
   */
  itemGap: import_prop_types12.default.number,
  /**
   * Height of the item mark (in px).
   * @default 20
   */
  itemMarkHeight: import_prop_types12.default.number,
  /**
   * Width of the item mark (in px).
   * @default 20
   */
  itemMarkWidth: import_prop_types12.default.number,
  /**
   * Style applied to legend labels.
   * @default theme.typography.subtitle1
   */
  labelStyle: import_prop_types12.default.object,
  /**
   * Space between the mark and the label (in px).
   * @default 5
   */
  markGap: import_prop_types12.default.number,
  /**
   * Callback fired when a legend item is clicked.
   * @param {React.MouseEvent<SVGRectElement, MouseEvent>} event The click event.
   * @param {SeriesLegendItemContext} legendItem The legend item data.
   * @param {number} index The index of the clicked legend item.
   */
  onItemClick: import_prop_types12.default.func,
  /**
   * Legend padding (in px).
   * Can either be a single number, or an object with top, left, bottom, right properties.
   * @default 10
   */
  padding: import_prop_types12.default.oneOfType([import_prop_types12.default.number, import_prop_types12.default.shape({
    bottom: import_prop_types12.default.number,
    left: import_prop_types12.default.number,
    right: import_prop_types12.default.number,
    top: import_prop_types12.default.number
  })]),
  /**
   * The position of the legend.
   */
  position: import_prop_types12.default.shape({
    horizontal: import_prop_types12.default.oneOf(["left", "middle", "right"]).isRequired,
    vertical: import_prop_types12.default.oneOf(["bottom", "middle", "top"]).isRequired
  }).isRequired,
  series: import_prop_types12.default.object.isRequired,
  seriesToDisplay: import_prop_types12.default.arrayOf(import_prop_types12.default.shape({
    color: import_prop_types12.default.string.isRequired,
    id: import_prop_types12.default.oneOfType([import_prop_types12.default.number, import_prop_types12.default.string]).isRequired,
    itemId: import_prop_types12.default.oneOfType([import_prop_types12.default.number, import_prop_types12.default.string]),
    label: import_prop_types12.default.string.isRequired,
    maxValue: import_prop_types12.default.oneOfType([import_prop_types12.default.instanceOf(Date), import_prop_types12.default.number]),
    minValue: import_prop_types12.default.oneOfType([import_prop_types12.default.instanceOf(Date), import_prop_types12.default.number]),
    seriesId: import_prop_types12.default.oneOfType([import_prop_types12.default.number, import_prop_types12.default.string])
  })).isRequired
} : void 0;

// node_modules/@mui/x-charts/ChartsLegend/ChartsLegend.js
var React31 = __toESM(require_react());
var import_prop_types13 = __toESM(require_prop_types());
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var _excluded9 = ["slots", "slotProps"];
var useUtilityClasses4 = (ownerState) => {
  const {
    classes,
    direction
  } = ownerState;
  const slots = {
    root: ["root", direction],
    mark: ["mark"],
    label: ["label"],
    series: ["series"],
    itemBackground: ["itemBackground"]
  };
  return composeClasses(slots, getLegendUtilityClass, classes);
};
function ChartsLegend(inProps) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiChartsLegend"
  });
  const defaultizedProps = _extends({
    direction: "row"
  }, props, {
    position: _extends({
      horizontal: "middle",
      vertical: "top"
    }, props.position)
  });
  const {
    slots,
    slotProps
  } = defaultizedProps, other = _objectWithoutPropertiesLoose(defaultizedProps, _excluded9);
  const theme = useTheme();
  const classes = useUtilityClasses4(_extends({}, defaultizedProps, {
    theme
  }));
  const drawingArea = useDrawingArea();
  const series = useSeries();
  const seriesToDisplay = getSeriesToDisplay(series);
  const ChartLegendRender = (slots == null ? void 0 : slots.legend) ?? DefaultChartsLegend;
  const chartLegendRenderProps = useSlotProps_default({
    elementType: ChartLegendRender,
    externalSlotProps: slotProps == null ? void 0 : slotProps.legend,
    additionalProps: _extends({}, other, {
      classes,
      drawingArea,
      series,
      seriesToDisplay
    }),
    ownerState: {}
  });
  return (0, import_jsx_runtime15.jsx)(ChartLegendRender, _extends({}, chartLegendRenderProps));
}
true ? ChartsLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types13.default.object,
  /**
   * The direction of the legend layout.
   * The default depends on the chart.
   */
  direction: import_prop_types13.default.oneOf(["column", "row"]),
  /**
   * Set to true to hide the legend.
   * @default false
   */
  hidden: import_prop_types13.default.bool,
  /**
   * Space between two legend items (in px).
   * @default 10
   */
  itemGap: import_prop_types13.default.number,
  /**
   * Height of the item mark (in px).
   * @default 20
   */
  itemMarkHeight: import_prop_types13.default.number,
  /**
   * Width of the item mark (in px).
   * @default 20
   */
  itemMarkWidth: import_prop_types13.default.number,
  /**
   * Style applied to legend labels.
   * @default theme.typography.subtitle1
   */
  labelStyle: import_prop_types13.default.object,
  /**
   * Space between the mark and the label (in px).
   * @default 5
   */
  markGap: import_prop_types13.default.number,
  /**
   * Callback fired when a legend item is clicked.
   * @param {React.MouseEvent<SVGRectElement, MouseEvent>} event The click event.
   * @param {SeriesLegendItemContext} legendItem The legend item data.
   * @param {number} index The index of the clicked legend item.
   */
  onItemClick: import_prop_types13.default.func,
  /**
   * Legend padding (in px).
   * Can either be a single number, or an object with top, left, bottom, right properties.
   * @default 10
   */
  padding: import_prop_types13.default.oneOfType([import_prop_types13.default.number, import_prop_types13.default.shape({
    bottom: import_prop_types13.default.number,
    left: import_prop_types13.default.number,
    right: import_prop_types13.default.number,
    top: import_prop_types13.default.number
  })]),
  /**
   * The position of the legend.
   */
  position: import_prop_types13.default.shape({
    horizontal: import_prop_types13.default.oneOf(["left", "middle", "right"]).isRequired,
    vertical: import_prop_types13.default.oneOf(["bottom", "middle", "top"]).isRequired
  }),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types13.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types13.default.object
} : void 0;

// node_modules/@mui/x-charts/ChartsLegend/ContinuousColorLegend.js
var React34 = __toESM(require_react());
var import_prop_types14 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/internals/components/ChartsAxesGradients/ChartsContinuousGradient.js
var React32 = __toESM(require_react());
var import_jsx_runtime16 = __toESM(require_jsx_runtime());
var PX_PRECISION = 10;
function ChartsContinuousGradient(props) {
  const {
    gradientUnits,
    isReversed,
    gradientId,
    size,
    direction,
    scale,
    colorScale,
    colorMap
  } = props;
  const extremValues = [colorMap.min ?? 0, colorMap.max ?? 100];
  const extremPositions = extremValues.map(scale).filter((p) => p !== void 0);
  if (extremPositions.length !== 2) {
    return null;
  }
  const interpolator = typeof extremValues[0] === "number" ? number_default(extremValues[0], extremValues[1]) : date_default(extremValues[0], extremValues[1]);
  const numberOfPoints = Math.round((Math.max(...extremPositions) - Math.min(...extremPositions)) / PX_PRECISION);
  const keyPrefix = `${extremValues[0]}-${extremValues[1]}-`;
  return (0, import_jsx_runtime16.jsx)("linearGradient", {
    id: gradientId,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "0",
    [`${direction}${isReversed ? 1 : 2}`]: gradientUnits === "objectBoundingBox" ? 1 : `${size}px`,
    gradientUnits: gradientUnits ?? "userSpaceOnUse",
    children: Array.from({
      length: numberOfPoints + 1
    }, (_, index) => {
      const value = interpolator(index / numberOfPoints);
      if (value === void 0) {
        return null;
      }
      const x = scale(value);
      if (x === void 0) {
        return null;
      }
      const offset = isReversed ? 1 - x / size : x / size;
      const color = colorScale(value);
      if (color === null) {
        return null;
      }
      return (0, import_jsx_runtime16.jsx)("stop", {
        offset,
        stopColor: color,
        stopOpacity: 1
      }, keyPrefix + index);
    })
  });
}

// node_modules/@mui/x-charts/internals/getPercentageValue.js
function getPercentageValue(value, refValue) {
  if (typeof value === "number") {
    return value;
  }
  if (value === "100%") {
    return refValue;
  }
  if (value.endsWith("%")) {
    const percentage = Number.parseFloat(value.slice(0, value.length - 1));
    if (!Number.isNaN(percentage)) {
      return percentage * refValue / 100;
    }
  }
  if (value.endsWith("px")) {
    const val = Number.parseFloat(value.slice(0, value.length - 2));
    if (!Number.isNaN(val)) {
      return val;
    }
  }
  throw Error(`MUI X: Received an unknown value "${value}". It should be a number, or a string with a percentage value.`);
}

// node_modules/@mui/x-charts/ChartsLegend/useAxis.js
var React33 = __toESM(require_react());
function useAxis({
  axisDirection,
  axisId
}) {
  const {
    xAxis,
    xAxisIds,
    yAxis,
    yAxisIds
  } = useCartesianContext();
  const {
    zAxis,
    zAxisIds
  } = React33.useContext(ZAxisContext);
  switch (axisDirection) {
    case "x": {
      const id = typeof axisId === "string" ? axisId : xAxisIds[axisId ?? 0];
      return xAxis[id];
    }
    case "y": {
      const id = typeof axisId === "string" ? axisId : yAxisIds[axisId ?? 0];
      return yAxis[id];
    }
    case "z":
    default: {
      const id = typeof axisId === "string" ? axisId : zAxisIds[axisId ?? 0];
      return zAxis[id];
    }
  }
}

// node_modules/@mui/x-charts/ChartsLegend/ContinuousColorLegend.js
var import_jsx_runtime17 = __toESM(require_jsx_runtime());
function getPositionOffset(position, legendBox, svgBox) {
  let offsetX = 0;
  let offsetY = 0;
  switch (position.horizontal) {
    case "left":
      offsetX = 0;
      break;
    case "middle":
      offsetX = (svgBox.width - legendBox.width) / 2;
      break;
    case "right":
    default:
      offsetX = svgBox.width - legendBox.width;
      break;
  }
  switch (position.vertical) {
    case "top":
      offsetY = 0;
      break;
    case "middle":
      offsetY = (svgBox.height - legendBox.height) / 2;
      break;
    case "bottom":
    default:
      offsetY = svgBox.height - legendBox.height;
      break;
  }
  return {
    offsetX,
    offsetY
  };
}
function getElementPositions(text1Box, barBox, text2Box, params) {
  if (params.direction === "column") {
    const text1 = {
      y: text1Box.height,
      dominantBaseline: "auto"
    };
    const text2 = {
      y: text1Box.height + 2 * params.spacing + barBox.height,
      dominantBaseline: "hanging"
    };
    const bar = {
      y: text1Box.height + params.spacing
    };
    const totalWidth = Math.max(text1Box.width, barBox.width, text2Box.width);
    const totalHeight = text1Box.height + barBox.height + text2Box.height + 2 * params.spacing;
    const boundingBox = {
      width: totalWidth,
      height: totalHeight
    };
    switch (params.align) {
      case "start":
        return {
          text1: _extends({}, text1, {
            textAnchor: "start",
            x: 0
          }),
          text2: _extends({}, text2, {
            textAnchor: "start",
            x: 0
          }),
          bar: _extends({}, bar, {
            x: 0
          }),
          boundingBox
        };
      case "end":
        return {
          text1: _extends({}, text1, {
            textAnchor: "end",
            x: totalWidth
          }),
          text2: _extends({}, text2, {
            textAnchor: "end",
            x: totalWidth
          }),
          bar: _extends({}, bar, {
            x: totalWidth - barBox.width
          }),
          boundingBox
        };
      case "middle":
      default:
        return {
          text1: _extends({}, text1, {
            textAnchor: "middle",
            x: totalWidth / 2
          }),
          text2: _extends({}, text2, {
            textAnchor: "middle",
            x: totalWidth / 2
          }),
          bar: _extends({}, bar, {
            x: totalWidth / 2 - barBox.width / 2
          }),
          boundingBox
        };
    }
  } else {
    const text1 = {
      x: text1Box.width,
      textAnchor: "end"
    };
    const text2 = {
      x: text1Box.width + 2 * params.spacing + barBox.width,
      textAnchor: "start"
    };
    const bar = {
      x: text1Box.width + params.spacing
    };
    const totalHeight = Math.max(text1Box.height, barBox.height, text2Box.height);
    const totalWidth = text1Box.width + barBox.width + text2Box.width + 2 * params.spacing;
    const boundingBox = {
      width: totalWidth,
      height: totalHeight
    };
    switch (params.align) {
      case "start":
        return {
          text1: _extends({}, text1, {
            dominantBaseline: "hanging",
            y: 0
          }),
          text2: _extends({}, text2, {
            dominantBaseline: "hanging",
            y: 0
          }),
          bar: _extends({}, bar, {
            y: 0
          }),
          boundingBox
        };
      case "end":
        return {
          text1: _extends({}, text1, {
            dominantBaseline: "auto",
            y: totalHeight
          }),
          text2: _extends({}, text2, {
            dominantBaseline: "auto",
            y: totalHeight
          }),
          bar: _extends({}, bar, {
            y: totalHeight - barBox.height
          }),
          boundingBox
        };
      case "middle":
      default:
        return {
          text1: _extends({}, text1, {
            dominantBaseline: "central",
            y: totalHeight / 2
          }),
          text2: _extends({}, text2, {
            dominantBaseline: "central",
            y: totalHeight / 2
          }),
          bar: _extends({}, bar, {
            y: totalHeight / 2 - barBox.height / 2
          }),
          boundingBox
        };
    }
  }
}
var defaultLabelFormatter = ({
  formattedValue
}) => formattedValue;
function ContinuousColorLegend(props) {
  var _a, _b;
  const theme = useTheme();
  const isRtl = useRtl();
  const {
    id: idProp,
    minLabel = defaultLabelFormatter,
    maxLabel = defaultLabelFormatter,
    scaleType = "linear",
    direction,
    length = "50%",
    thickness = 5,
    spacing = 4,
    align = "middle",
    labelStyle = theme.typography.subtitle1,
    position,
    axisDirection,
    axisId
  } = props;
  const chartId = useChartId();
  const id = idProp ?? `gradient-legend-${chartId}`;
  const axisItem = useAxis({
    axisDirection,
    axisId
  });
  const {
    width,
    height,
    left,
    right,
    top,
    bottom
  } = useDrawingArea();
  const refLength = direction === "column" ? height + top + bottom : width + left + right;
  const size = getPercentageValue(length, refLength);
  const isReversed = direction === "column";
  const colorMap = axisItem == null ? void 0 : axisItem.colorMap;
  if (!colorMap || !colorMap.type || colorMap.type !== "continuous") {
    return null;
  }
  const colorScale = axisItem.colorScale;
  const minValue = colorMap.min ?? 0;
  const maxValue = colorMap.max ?? 100;
  const scale = getScale(scaleType, [minValue, maxValue], isReversed ? [size, 0] : [0, size]);
  const formattedMin = ((_a = axisItem.valueFormatter) == null ? void 0 : _a.call(axisItem, minValue, {
    location: "legend"
  })) ?? minValue.toLocaleString();
  const formattedMax = ((_b = axisItem.valueFormatter) == null ? void 0 : _b.call(axisItem, maxValue, {
    location: "legend"
  })) ?? maxValue.toLocaleString();
  const minText = typeof minLabel === "string" ? minLabel : minLabel({
    value: minValue ?? 0,
    formattedValue: formattedMin
  });
  const maxText = typeof maxLabel === "string" ? maxLabel : maxLabel({
    value: maxValue ?? 0,
    formattedValue: formattedMax
  });
  const text1 = isReversed ? maxText : minText;
  const text2 = isReversed ? minText : maxText;
  const text1Box = getStringSize(text1, _extends({}, labelStyle));
  const text2Box = getStringSize(text2, _extends({}, labelStyle));
  const barBox = direction === "column" || isRtl && direction === "row" ? {
    width: thickness,
    height: size
  } : {
    width: size,
    height: thickness
  };
  const legendPositions = getElementPositions(text1Box, barBox, text2Box, {
    spacing,
    align,
    direction
  });
  const svgBoundingBox = {
    width: width + left + right,
    height: height + top + bottom
  };
  const positionOffset = getPositionOffset(_extends({
    horizontal: "middle",
    vertical: "top"
  }, position), legendPositions.boundingBox, svgBoundingBox);
  return (0, import_jsx_runtime17.jsxs)(React34.Fragment, {
    children: [(0, import_jsx_runtime17.jsx)(ChartsContinuousGradient, {
      isReversed,
      gradientId: id,
      size,
      direction: direction === "row" ? "x" : "y",
      scale,
      colorScale,
      colorMap,
      gradientUnits: "objectBoundingBox"
    }), (0, import_jsx_runtime17.jsx)(ChartsText, {
      text: text1,
      x: positionOffset.offsetX + legendPositions.text1.x,
      y: positionOffset.offsetY + legendPositions.text1.y,
      style: _extends({
        dominantBaseline: legendPositions.text1.dominantBaseline,
        textAnchor: legendPositions.text1.textAnchor
      }, labelStyle)
    }), (0, import_jsx_runtime17.jsx)("rect", _extends({
      x: positionOffset.offsetX + legendPositions.bar.x,
      y: positionOffset.offsetY + legendPositions.bar.y
    }, barBox, {
      fill: `url(#${id})`
    })), (0, import_jsx_runtime17.jsx)(ChartsText, {
      text: text2,
      x: positionOffset.offsetX + legendPositions.text2.x,
      y: positionOffset.offsetY + legendPositions.text2.y,
      style: _extends({
        dominantBaseline: legendPositions.text2.dominantBaseline,
        textAnchor: legendPositions.text2.textAnchor
      }, labelStyle)
    })]
  });
}
true ? ContinuousColorLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The alignment of the texts with the gradient bar.
   * @default 'middle'
   */
  align: import_prop_types14.default.oneOf(["end", "middle", "start"]),
  /**
   * The axis direction containing the color configuration to represent.
   * @default 'z'
   */
  axisDirection: import_prop_types14.default.oneOf(["x", "y", "z"]),
  /**
   * The id of the axis item with the color configuration to represent.
   * @default The first axis item.
   */
  axisId: import_prop_types14.default.oneOfType([import_prop_types14.default.number, import_prop_types14.default.string]),
  /**
   * The direction of the legend layout.
   * The default depends on the chart.
   */
  direction: import_prop_types14.default.oneOf(["column", "row"]),
  /**
   * A unique identifier for the gradient.
   * @default auto-generated id
   */
  id: import_prop_types14.default.string,
  /**
   * The style applied to labels.
   * @default theme.typography.subtitle1
   */
  labelStyle: import_prop_types14.default.object,
  /**
   * The length of the gradient bar.
   * Can be a number (in px) or a string with a percentage such as '50%'.
   * The '100%' is the length of the svg.
   * @default '50%'
   */
  length: import_prop_types14.default.oneOfType([import_prop_types14.default.number, import_prop_types14.default.string]),
  /**
   * The label to display at the maximum side of the gradient.
   * Can either be a string, or a function.
   * If not defined, the formatted maximal value is display.
   * @default ({ formattedValue }) => formattedValue
   */
  maxLabel: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.string]),
  /**
   * The label to display at the minimum side of the gradient.
   * Can either be a string, or a function.
   * @default ({ formattedValue }) => formattedValue
   */
  minLabel: import_prop_types14.default.oneOfType([import_prop_types14.default.func, import_prop_types14.default.string]),
  /**
   * The position of the legend.
   */
  position: import_prop_types14.default.shape({
    horizontal: import_prop_types14.default.oneOf(["left", "middle", "right"]).isRequired,
    vertical: import_prop_types14.default.oneOf(["bottom", "middle", "top"]).isRequired
  }),
  /**
   * The scale used to display gradient colors.
   * @default 'linear'
   */
  scaleType: import_prop_types14.default.oneOf(["linear", "log", "pow", "sqrt", "time", "utc"]),
  /**
   * The space between the gradient bar and the labels.
   * @default 4
   */
  spacing: import_prop_types14.default.number,
  /**
   * The thickness of the gradient bar.
   * @default 5
   */
  thickness: import_prop_types14.default.number
} : void 0;

// node_modules/@mui/x-charts/ChartsLegend/PiecewiseColorLegend.js
var React35 = __toESM(require_react());
var import_prop_types15 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/internals/notNull.js
function notNull(value) {
  return value !== null;
}

// node_modules/@mui/x-charts/ChartsLegend/PiecewiseColorLegend.js
var import_jsx_runtime18 = __toESM(require_jsx_runtime());
var _excluded10 = ["axisDirection", "axisId", "hideFirst", "hideLast", "labelFormatter", "onItemClick"];
function defaultLabelFormatter2(params) {
  if (params.min === null) {
    return `<${params.formattedMax}`;
  }
  if (params.max === null) {
    return `>${params.formattedMin}`;
  }
  return `${params.formattedMin}-${params.formattedMax}`;
}
var piecewiseColorContextBuilder = (context) => ({
  type: "piecewiseColor",
  color: context.color,
  label: context.label,
  maxValue: context.maxValue,
  minValue: context.minValue
});
function PiecewiseColorLegend(props) {
  const {
    axisDirection,
    axisId,
    hideFirst,
    hideLast,
    labelFormatter = defaultLabelFormatter2,
    onItemClick
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded10);
  const axisItem = useAxis({
    axisDirection,
    axisId
  });
  const colorMap = axisItem == null ? void 0 : axisItem.colorMap;
  if (!colorMap || !colorMap.type || colorMap.type !== "piecewise") {
    return null;
  }
  const valueFormatter = (v) => {
    var _a;
    return ((_a = axisItem.valueFormatter) == null ? void 0 : _a.call(axisItem, v, {
      location: "legend"
    })) ?? v.toLocaleString();
  };
  const formattedLabels = colorMap.thresholds.map(valueFormatter);
  const itemsToDisplay = colorMap.colors.map((color, index) => {
    const isFirst = index === 0;
    const isLast = index === colorMap.colors.length - 1;
    if (hideFirst && isFirst || hideLast && isLast) {
      return null;
    }
    const data = _extends({}, isFirst ? {
      min: null,
      formattedMin: null
    } : {
      min: colorMap.thresholds[index - 1],
      formattedMin: formattedLabels[index - 1]
    }, isLast ? {
      max: null,
      formattedMax: null
    } : {
      max: colorMap.thresholds[index],
      formattedMax: formattedLabels[index]
    });
    const label = labelFormatter(data);
    if (label === null) {
      return null;
    }
    return {
      id: label,
      color,
      label,
      minValue: data.min,
      maxValue: data.max
    };
  }).filter(notNull);
  return (0, import_jsx_runtime18.jsx)(LegendPerItem, _extends({}, other, {
    itemsToDisplay,
    onItemClick: onItemClick ? (e, i) => onItemClick(e, piecewiseColorContextBuilder(itemsToDisplay[i]), i) : void 0
  }));
}
true ? PiecewiseColorLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The axis direction containing the color configuration to represent.
   * @default 'z'
   */
  axisDirection: import_prop_types15.default.oneOf(["x", "y", "z"]),
  /**
   * The id of the axis item with the color configuration to represent.
   * @default The first axis item.
   */
  axisId: import_prop_types15.default.oneOfType([import_prop_types15.default.number, import_prop_types15.default.string]),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types15.default.object,
  /**
   * The direction of the legend layout.
   * The default depends on the chart.
   */
  direction: import_prop_types15.default.oneOf(["column", "row"]).isRequired,
  /**
   * Hide the first item of the legend, corresponding to the [-infinity, min] piece.
   * @default false
   */
  hideFirst: import_prop_types15.default.bool,
  /**
   * Hide the last item of the legend, corresponding to the [max, +infinity] piece.
   * @default false
   */
  hideLast: import_prop_types15.default.bool,
  /**
   * Space between two legend items (in px).
   * @default 10
   */
  itemGap: import_prop_types15.default.number,
  /**
   * Height of the item mark (in px).
   * @default 20
   */
  itemMarkHeight: import_prop_types15.default.number,
  /**
   * Width of the item mark (in px).
   * @default 20
   */
  itemMarkWidth: import_prop_types15.default.number,
  /**
   * Format the legend labels.
   * @param {PiecewiseLabelFormatterParams} params The bound of the piece to format.
   * @returns {string|null} The displayed label, or `null` to skip the item.
   */
  labelFormatter: import_prop_types15.default.func,
  /**
   * Style applied to legend labels.
   * @default theme.typography.subtitle1
   */
  labelStyle: import_prop_types15.default.object,
  /**
   * Space between the mark and the label (in px).
   * @default 5
   */
  markGap: import_prop_types15.default.number,
  /**
   * Callback fired when a legend item is clicked.
   * @param {React.MouseEvent<SVGRectElement, MouseEvent>} event The click event.
   * @param {PiecewiseColorLegendItemContext} legendItem The legend item data.
   * @param {number} index The index of the clicked legend item.
   */
  onItemClick: import_prop_types15.default.func,
  /**
   * Legend padding (in px).
   * Can either be a single number, or an object with top, left, bottom, right properties.
   * @default 10
   */
  padding: import_prop_types15.default.oneOfType([import_prop_types15.default.number, import_prop_types15.default.shape({
    bottom: import_prop_types15.default.number,
    left: import_prop_types15.default.number,
    right: import_prop_types15.default.number,
    top: import_prop_types15.default.number
  })]),
  /**
   * The position of the legend.
   */
  position: import_prop_types15.default.shape({
    horizontal: import_prop_types15.default.oneOf(["left", "middle", "right"]).isRequired,
    vertical: import_prop_types15.default.oneOf(["bottom", "middle", "top"]).isRequired
  }).isRequired
} : void 0;

// node_modules/@mui/x-charts/ChartsAxisHighlight/ChartsAxisHighlight.js
var React36 = __toESM(require_react());
var import_prop_types16 = __toESM(require_prop_types());
var import_jsx_runtime19 = __toESM(require_jsx_runtime());
function getAxisHighlightUtilityClass(slot) {
  return generateUtilityClass("MuiChartsAxisHighlight", slot);
}
var chartsAxisHighlightClasses = generateUtilityClasses("MuiChartsAxisHighlight", ["root"]);
var useUtilityClasses5 = () => {
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getAxisHighlightUtilityClass);
};
var ChartsAxisHighlightPath = styled_default("path", {
  name: "MuiChartsAxisHighlight",
  slot: "Root",
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  pointerEvents: "none",
  variants: [{
    props: {
      axisHighlight: "band"
    },
    style: _extends({
      fill: "white",
      fillOpacity: 0.1
    }, theme.applyStyles("light", {
      fill: "gray"
    }))
  }, {
    props: {
      axisHighlight: "line"
    },
    style: _extends({
      strokeDasharray: "5 2",
      stroke: "#ffffff"
    }, theme.applyStyles("light", {
      stroke: "#000000"
    }))
  }]
}));
function ChartsAxisHighlight(props) {
  const {
    x: xAxisHighlight,
    y: yAxisHighlight
  } = props;
  const {
    xAxisIds,
    xAxis,
    yAxisIds,
    yAxis
  } = useCartesianContext();
  const classes = useUtilityClasses5();
  const USED_X_AXIS_ID = xAxisIds[0];
  const USED_Y_AXIS_ID = yAxisIds[0];
  const xScale = xAxis[USED_X_AXIS_ID].scale;
  const yScale = yAxis[USED_Y_AXIS_ID].scale;
  const {
    axis
  } = React36.useContext(InteractionContext);
  const getXPosition = getValueToPositionMapper(xScale);
  const getYPosition = getValueToPositionMapper(yScale);
  const axisX = axis.x;
  const axisY = axis.y;
  const isBandScaleX = xAxisHighlight === "band" && axisX !== null && isBandScale(xScale);
  const isBandScaleY = yAxisHighlight === "band" && axisY !== null && isBandScale(yScale);
  if (true) {
    const isXError = isBandScaleX && xScale(axisX.value) === void 0;
    const isYError = isBandScaleY && yScale(axisY.value) === void 0;
    if (isXError || isYError) {
      console.error([`MUI X: The position value provided for the axis is not valid for the current scale.`, `This probably means something is wrong with the data passed to the chart.`, `The ChartsAxisHighlight component will not be displayed.`].join("\n"));
    }
  }
  return (0, import_jsx_runtime19.jsxs)(React36.Fragment, {
    children: [isBandScaleX && xScale(axisX.value) !== void 0 && (0, import_jsx_runtime19.jsx)(
      ChartsAxisHighlightPath,
      {
        d: `M ${xScale(axisX.value) - (xScale.step() - xScale.bandwidth()) / 2} ${yScale.range()[0]} l ${xScale.step()} 0 l 0 ${yScale.range()[1] - yScale.range()[0]} l ${-xScale.step()} 0 Z`,
        className: classes.root,
        ownerState: {
          axisHighlight: "band"
        }
      }
    ), isBandScaleY && yScale(axisY.value) !== void 0 && (0, import_jsx_runtime19.jsx)(ChartsAxisHighlightPath, {
      d: `M ${xScale.range()[0]} ${// @ts-expect-error, yScale value is checked in the statement above
      yScale(axisY.value) - (yScale.step() - yScale.bandwidth()) / 2} l 0 ${yScale.step()} l ${xScale.range()[1] - xScale.range()[0]} 0 l 0 ${-yScale.step()} Z`,
      className: classes.root,
      ownerState: {
        axisHighlight: "band"
      }
    }), xAxisHighlight === "line" && axis.x !== null && (0, import_jsx_runtime19.jsx)(ChartsAxisHighlightPath, {
      d: `M ${getXPosition(axis.x.value)} ${yScale.range()[0]} L ${getXPosition(axis.x.value)} ${yScale.range()[1]}`,
      className: classes.root,
      ownerState: {
        axisHighlight: "line"
      }
    }), yAxisHighlight === "line" && axis.y !== null && (0, import_jsx_runtime19.jsx)(ChartsAxisHighlightPath, {
      d: `M ${xScale.range()[0]} ${getYPosition(axis.y.value)} L ${xScale.range()[1]} ${getYPosition(axis.y.value)}`,
      className: classes.root,
      ownerState: {
        axisHighlight: "line"
      }
    })]
  });
}
true ? ChartsAxisHighlight.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  x: import_prop_types16.default.oneOf(["band", "line", "none"]),
  y: import_prop_types16.default.oneOf(["band", "line", "none"])
} : void 0;

// node_modules/@mui/x-charts/ChartsSurface/ChartsSurface.js
var import_prop_types17 = __toESM(require_prop_types());
var React38 = __toESM(require_react());

// node_modules/@mui/x-charts/hooks/useAxisEvents.js
var React37 = __toESM(require_react());

// node_modules/@mui/x-charts/internals/getSVGPoint.js
function getSVGPoint(svg, event) {
  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

// node_modules/@mui/x-charts/hooks/useAxisEvents.js
function getAsANumber(value) {
  return value instanceof Date ? value.getTime() : value;
}
var useAxisEvents = (disableAxisListener) => {
  const svgRef = useSvgRef();
  const drawingArea = useDrawingArea();
  const {
    xAxis,
    yAxis,
    xAxisIds,
    yAxisIds
  } = useCartesianContext();
  const {
    dispatch
  } = React37.useContext(InteractionContext);
  const usedXAxis = xAxisIds[0];
  const usedYAxis = yAxisIds[0];
  const mousePosition = React37.useRef({
    isInChart: false,
    x: -1,
    y: -1
  });
  React37.useEffect(() => {
    const element = svgRef.current;
    if (element === null || disableAxisListener) {
      return () => {
      };
    }
    function getNewAxisState(axisConfig, mouseValue) {
      const {
        scale,
        data: axisData,
        reverse
      } = axisConfig;
      if (!isBandScale(scale)) {
        const value = scale.invert(mouseValue);
        if (axisData === void 0) {
          return {
            value,
            index: -1
          };
        }
        const valueAsNumber = getAsANumber(value);
        const closestIndex = axisData == null ? void 0 : axisData.findIndex((pointValue, index) => {
          const v = getAsANumber(pointValue);
          if (v > valueAsNumber) {
            if (index === 0 || Math.abs(valueAsNumber - v) <= Math.abs(valueAsNumber - getAsANumber(axisData[index - 1]))) {
              return true;
            }
          }
          if (v <= valueAsNumber) {
            if (index === axisData.length - 1 || Math.abs(getAsANumber(value) - v) < Math.abs(getAsANumber(value) - getAsANumber(axisData[index + 1]))) {
              return true;
            }
          }
          return false;
        });
        return {
          value: closestIndex !== void 0 && closestIndex >= 0 ? axisData[closestIndex] : value,
          index: closestIndex
        };
      }
      const dataIndex = scale.bandwidth() === 0 ? Math.floor((mouseValue - Math.min(...scale.range()) + scale.step() / 2) / scale.step()) : Math.floor((mouseValue - Math.min(...scale.range())) / scale.step());
      if (dataIndex < 0 || dataIndex >= axisData.length) {
        return null;
      }
      if (reverse) {
        const reverseIndex = axisData.length - 1 - dataIndex;
        return {
          index: reverseIndex,
          value: axisData[reverseIndex]
        };
      }
      return {
        index: dataIndex,
        value: axisData[dataIndex]
      };
    }
    const handleOut = () => {
      mousePosition.current = {
        isInChart: false,
        x: -1,
        y: -1
      };
      dispatch({
        type: "exitChart"
      });
    };
    const handleMove = (event) => {
      const target = "targetTouches" in event ? event.targetTouches[0] : event;
      const svgPoint = getSVGPoint(element, target);
      mousePosition.current.x = svgPoint.x;
      mousePosition.current.y = svgPoint.y;
      if (!drawingArea.isPointInside(svgPoint, {
        targetElement: event.target
      })) {
        if (mousePosition.current.isInChart) {
          dispatch({
            type: "exitChart"
          });
          mousePosition.current.isInChart = false;
        }
        return;
      }
      mousePosition.current.isInChart = true;
      const newStateX = getNewAxisState(xAxis[usedXAxis], svgPoint.x);
      const newStateY = getNewAxisState(yAxis[usedYAxis], svgPoint.y);
      dispatch({
        type: "updateAxis",
        data: {
          x: newStateX,
          y: newStateY
        }
      });
    };
    const handleDown = (event) => {
      const target = event.currentTarget;
      if (!target) {
        return;
      }
      if (target.hasPointerCapture(event.pointerId)) {
        target.releasePointerCapture(event.pointerId);
      }
    };
    element.addEventListener("pointerdown", handleDown);
    element.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerout", handleOut);
    element.addEventListener("pointercancel", handleOut);
    element.addEventListener("pointerleave", handleOut);
    return () => {
      element.removeEventListener("pointerdown", handleDown);
      element.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerout", handleOut);
      element.removeEventListener("pointercancel", handleOut);
      element.removeEventListener("pointerleave", handleOut);
    };
  }, [svgRef, dispatch, usedYAxis, yAxis, usedXAxis, xAxis, disableAxisListener, drawingArea]);
};

// node_modules/@mui/x-charts/ChartsSurface/ChartsSurface.js
var import_jsx_runtime20 = __toESM(require_jsx_runtime());
var _excluded11 = ["children", "width", "height", "viewBox", "disableAxisListener", "className", "title", "desc"];
var ChartChartsSurfaceStyles = styled_default("svg", {
  name: "MuiChartsSurface",
  slot: "Root"
})(() => ({
  // This prevents default touch actions when using the svg on mobile devices.
  // For example, prevent page scroll & zoom.
  touchAction: "none"
}));
var ChartsSurface = React38.forwardRef(function ChartsSurface2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiChartsSurface"
  });
  const {
    children,
    width,
    height,
    viewBox,
    disableAxisListener = false,
    className,
    title,
    desc
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded11);
  const svgView = _extends({
    width,
    height,
    x: 0,
    y: 0
  }, viewBox);
  useAxisEvents(disableAxisListener);
  return (0, import_jsx_runtime20.jsxs)(ChartChartsSurfaceStyles, _extends({
    width,
    height,
    viewBox: `${svgView.x} ${svgView.y} ${svgView.width} ${svgView.height}`,
    ref,
    className
  }, other, {
    children: [(0, import_jsx_runtime20.jsx)("title", {
      children: title
    }), (0, import_jsx_runtime20.jsx)("desc", {
      children: desc
    }), children]
  }));
});
true ? ChartsSurface.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types17.default.node,
  className: import_prop_types17.default.string,
  desc: import_prop_types17.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types17.default.bool,
  /**
   * The height of the chart in px.
   */
  height: import_prop_types17.default.number.isRequired,
  sx: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object, import_prop_types17.default.bool])), import_prop_types17.default.func, import_prop_types17.default.object]),
  title: import_prop_types17.default.string,
  viewBox: import_prop_types17.default.shape({
    height: import_prop_types17.default.number,
    width: import_prop_types17.default.number,
    x: import_prop_types17.default.number,
    y: import_prop_types17.default.number
  }),
  /**
   * The width of the chart in px.
   */
  width: import_prop_types17.default.number.isRequired
} : void 0;

// node_modules/@mui/x-charts/ChartContainer/ChartContainer.js
var React43 = __toESM(require_react());
var import_prop_types18 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/internals/components/ChartsAxesGradients/ChartsAxesGradients.js
var React40 = __toESM(require_react());

// node_modules/@mui/x-charts/internals/components/ChartsAxesGradients/ChartsPiecewiseGradient.js
var React39 = __toESM(require_react());
var import_jsx_runtime21 = __toESM(require_jsx_runtime());
function ChartsPiecewiseGradient(props) {
  const {
    isReversed,
    gradientId,
    size,
    direction,
    scale,
    colorMap
  } = props;
  return (0, import_jsx_runtime21.jsx)("linearGradient", {
    id: gradientId,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "0",
    [`${direction}${isReversed ? 1 : 2}`]: `${size}px`,
    gradientUnits: "userSpaceOnUse",
    children: colorMap.thresholds.map((threshold, index) => {
      const x = scale(threshold);
      if (x === void 0) {
        return null;
      }
      const offset = isReversed ? 1 - x / size : x / size;
      return (0, import_jsx_runtime21.jsxs)(React39.Fragment, {
        children: [(0, import_jsx_runtime21.jsx)("stop", {
          offset,
          stopColor: colorMap.colors[index],
          stopOpacity: 1
        }), (0, import_jsx_runtime21.jsx)("stop", {
          offset,
          stopColor: colorMap.colors[index + 1],
          stopOpacity: 1
        })]
      }, threshold.toString() + index);
    })
  });
}

// node_modules/@mui/x-charts/internals/components/ChartsAxesGradients/ChartsAxesGradients.js
var import_jsx_runtime22 = __toESM(require_jsx_runtime());
function useChartGradient() {
  const {
    chartId
  } = React40.useContext(DrawingContext);
  return React40.useCallback((axisId, direction) => `${chartId}-gradient-${direction}-${axisId}`, [chartId]);
}
function ChartsAxesGradients() {
  const {
    top,
    height,
    bottom,
    left,
    width,
    right
  } = useDrawingArea();
  const svgHeight = top + height + bottom;
  const svgWidth = left + width + right;
  const getGradientId = useChartGradient();
  const {
    xAxisIds,
    xAxis,
    yAxisIds,
    yAxis
  } = useCartesianContext();
  return (0, import_jsx_runtime22.jsxs)("defs", {
    children: [yAxisIds.filter((axisId) => yAxis[axisId].colorMap !== void 0).map((axisId) => {
      const gradientId = getGradientId(axisId, "y");
      const {
        colorMap,
        scale,
        colorScale,
        reverse
      } = yAxis[axisId];
      if ((colorMap == null ? void 0 : colorMap.type) === "piecewise") {
        return (0, import_jsx_runtime22.jsx)(ChartsPiecewiseGradient, {
          isReversed: !reverse,
          scale,
          colorMap,
          size: svgHeight,
          gradientId,
          direction: "y"
        }, gradientId);
      }
      if ((colorMap == null ? void 0 : colorMap.type) === "continuous") {
        return (0, import_jsx_runtime22.jsx)(ChartsContinuousGradient, {
          isReversed: !reverse,
          scale,
          colorScale,
          colorMap,
          size: svgHeight,
          gradientId,
          direction: "y"
        }, gradientId);
      }
      return null;
    }), xAxisIds.filter((axisId) => xAxis[axisId].colorMap !== void 0).map((axisId) => {
      const gradientId = getGradientId(axisId, "x");
      const {
        colorMap,
        scale,
        reverse,
        colorScale
      } = xAxis[axisId];
      if ((colorMap == null ? void 0 : colorMap.type) === "piecewise") {
        return (0, import_jsx_runtime22.jsx)(ChartsPiecewiseGradient, {
          isReversed: reverse,
          scale,
          colorMap,
          size: svgWidth,
          gradientId,
          direction: "x"
        }, gradientId);
      }
      if ((colorMap == null ? void 0 : colorMap.type) === "continuous") {
        return (0, import_jsx_runtime22.jsx)(ChartsContinuousGradient, {
          isReversed: reverse,
          scale,
          colorScale,
          colorMap,
          size: svgWidth,
          gradientId,
          direction: "x"
        }, gradientId);
      }
      return null;
    })]
  });
}

// node_modules/@mui/x-charts/ChartContainer/useChartContainerProps.js
var React42 = __toESM(require_react());

// node_modules/@mui/x-charts/ChartContainer/useDefaultizeAxis.js
var React41 = __toESM(require_react());
var defaultizeAxis = (inAxis, dataset, axisName) => {
  const DEFAULT_AXIS_KEY = axisName === "x" ? DEFAULT_X_AXIS_KEY : DEFAULT_Y_AXIS_KEY;
  return [...(inAxis == null ? void 0 : inAxis.map((axis, index) => _extends({
    id: `defaultized-${axisName}-axis-${index}`
  }, axis))) ?? [], ...inAxis === void 0 || inAxis.findIndex(({
    id
  }) => id === DEFAULT_AXIS_KEY) === -1 ? [{
    id: DEFAULT_AXIS_KEY,
    scaleType: "linear"
  }] : []].map((axisConfig) => {
    const dataKey = axisConfig.dataKey;
    if (dataKey === void 0 || axisConfig.data !== void 0) {
      return axisConfig;
    }
    if (dataset === void 0) {
      throw Error(`MUI X: ${axisName}-axis uses \`dataKey\` but no \`dataset\` is provided.`);
    }
    return _extends({}, axisConfig, {
      data: dataset.map((d) => d[dataKey])
    });
  });
};
var useDefaultizeAxis = (inXAxis, inYAxis, dataset) => {
  const xAxis = React41.useMemo(() => defaultizeAxis(inXAxis, dataset, "x"), [inXAxis, dataset]);
  const yAxis = React41.useMemo(() => defaultizeAxis(inYAxis, dataset, "y"), [inYAxis, dataset]);
  return [xAxis, yAxis];
};

// node_modules/@mui/x-charts/hooks/useReducedMotion.js
var handleMediaChange = (e) => {
  globals_exports.assign({
    // Modification such the react-spring implementation such that this hook can remove animation but never activate animation.
    skipAnimation: e.matches || void 0
  });
};
var useReducedMotion = () => {
  useIsomorphicLayoutEffect(() => {
    var _a;
    const shouldSkipAnimation = !(window == null ? void 0 : window.matchMedia);
    if (shouldSkipAnimation) {
      handleMediaChange({
        matches: true
      });
      return void 0;
    }
    const mql = window.matchMedia("(prefers-reduced-motion)");
    handleMediaChange(mql);
    (_a = mql.addEventListener) == null ? void 0 : _a.call(mql, "change", handleMediaChange);
    return () => {
      var _a2;
      (_a2 = mql.removeEventListener) == null ? void 0 : _a2.call(mql, "change", handleMediaChange);
    };
  }, []);
};

// node_modules/@mui/x-charts/ChartContainer/useChartContainerProps.js
var _excluded12 = ["width", "height", "series", "margin", "xAxis", "yAxis", "zAxis", "colors", "dataset", "sx", "title", "desc", "disableAxisListener", "highlightedItem", "onHighlightChange", "plugins", "children"];
var useChartContainerProps = (props, ref) => {
  const {
    width,
    height,
    series,
    margin,
    xAxis,
    yAxis,
    zAxis,
    colors,
    dataset,
    sx,
    title,
    desc,
    disableAxisListener,
    highlightedItem,
    onHighlightChange,
    plugins,
    children
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded12);
  const svgRef = React42.useRef(null);
  const chartSurfaceRef = useForkRef(ref, svgRef);
  useReducedMotion();
  const [defaultizedXAxis, defaultizedYAxis] = useDefaultizeAxis(xAxis, yAxis, dataset);
  const drawingProviderProps = {
    width,
    height,
    margin,
    svgRef
  };
  const pluginProviderProps = {
    plugins
  };
  const seriesProviderProps = {
    series,
    colors,
    dataset
  };
  const cartesianProviderProps = {
    xAxis: defaultizedXAxis,
    yAxis: defaultizedYAxis,
    dataset
  };
  const zAxisContextProps = {
    zAxis,
    dataset
  };
  const highlightedProviderProps = {
    highlightedItem,
    onHighlightChange
  };
  const chartsSurfaceProps = _extends({}, other, {
    width,
    height,
    ref: chartSurfaceRef,
    sx,
    title,
    desc,
    disableAxisListener
  });
  return {
    children,
    drawingProviderProps,
    seriesProviderProps,
    cartesianProviderProps,
    zAxisContextProps,
    highlightedProviderProps,
    chartsSurfaceProps,
    pluginProviderProps,
    xAxis: defaultizedXAxis,
    yAxis: defaultizedYAxis
  };
};

// node_modules/@mui/x-charts/ChartContainer/ChartContainer.js
var import_jsx_runtime23 = __toESM(require_jsx_runtime());
var ChartContainer = React43.forwardRef(function ChartContainer2(props, ref) {
  const {
    children,
    drawingProviderProps,
    seriesProviderProps,
    cartesianProviderProps,
    zAxisContextProps,
    highlightedProviderProps,
    chartsSurfaceProps,
    pluginProviderProps
  } = useChartContainerProps(props, ref);
  return (0, import_jsx_runtime23.jsx)(DrawingProvider, _extends({}, drawingProviderProps, {
    children: (0, import_jsx_runtime23.jsx)(PluginProvider, _extends({}, pluginProviderProps, {
      children: (0, import_jsx_runtime23.jsx)(SeriesProvider, _extends({}, seriesProviderProps, {
        children: (0, import_jsx_runtime23.jsx)(CartesianProvider, _extends({}, cartesianProviderProps, {
          children: (0, import_jsx_runtime23.jsx)(ZAxisContextProvider, _extends({}, zAxisContextProps, {
            children: (0, import_jsx_runtime23.jsx)(InteractionProvider, {
              children: (0, import_jsx_runtime23.jsx)(HighlightedProvider, _extends({}, highlightedProviderProps, {
                children: (0, import_jsx_runtime23.jsxs)(ChartsSurface, _extends({}, chartsSurfaceProps, {
                  children: [(0, import_jsx_runtime23.jsx)(ChartsAxesGradients, {}), children]
                }))
              }))
            })
          }))
        }))
      }))
    }))
  }));
});
true ? ChartContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types18.default.node,
  className: import_prop_types18.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.string), import_prop_types18.default.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types18.default.arrayOf(import_prop_types18.default.object),
  desc: import_prop_types18.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types18.default.bool,
  /**
   * The height of the chart in px.
   */
  height: import_prop_types18.default.number.isRequired,
  /**
   * The item currently highlighted. Turns highlighting into a controlled prop.
   */
  highlightedItem: import_prop_types18.default.shape({
    dataIndex: import_prop_types18.default.number,
    seriesId: import_prop_types18.default.oneOfType([import_prop_types18.default.number, import_prop_types18.default.string])
  }),
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default object Depends on the charts type.
   */
  margin: import_prop_types18.default.shape({
    bottom: import_prop_types18.default.number,
    left: import_prop_types18.default.number,
    right: import_prop_types18.default.number,
    top: import_prop_types18.default.number
  }),
  /**
   * The callback fired when the highlighted item changes.
   *
   * @param {HighlightItemData | null} highlightedItem  The newly highlighted item.
   */
  onHighlightChange: import_prop_types18.default.func,
  /**
   * An array of plugins defining how to preprocess data.
   * If not provided, the container supports line, bar, scatter and pie charts.
   */
  plugins: import_prop_types18.default.arrayOf(import_prop_types18.default.object),
  /**
   * The array of series to display.
   * Each type of series has its own specificity.
   * Please refer to the appropriate docs page to learn more about it.
   */
  series: import_prop_types18.default.arrayOf(import_prop_types18.default.object).isRequired,
  sx: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object, import_prop_types18.default.bool])), import_prop_types18.default.func, import_prop_types18.default.object]),
  title: import_prop_types18.default.string,
  viewBox: import_prop_types18.default.shape({
    height: import_prop_types18.default.number,
    width: import_prop_types18.default.number,
    x: import_prop_types18.default.number,
    y: import_prop_types18.default.number
  }),
  /**
   * The width of the chart in px.
   */
  width: import_prop_types18.default.number.isRequired,
  /**
   * The configuration of the x-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  xAxis: import_prop_types18.default.arrayOf(import_prop_types18.default.shape({
    classes: import_prop_types18.default.object,
    colorMap: import_prop_types18.default.oneOfType([import_prop_types18.default.shape({
      colors: import_prop_types18.default.arrayOf(import_prop_types18.default.string).isRequired,
      type: import_prop_types18.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types18.default.string,
      values: import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number, import_prop_types18.default.string]).isRequired)
    }), import_prop_types18.default.shape({
      color: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.string.isRequired), import_prop_types18.default.func]).isRequired,
      max: import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]),
      min: import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]),
      type: import_prop_types18.default.oneOf(["continuous"]).isRequired
    }), import_prop_types18.default.shape({
      colors: import_prop_types18.default.arrayOf(import_prop_types18.default.string).isRequired,
      thresholds: import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]).isRequired).isRequired,
      type: import_prop_types18.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types18.default.array,
    dataKey: import_prop_types18.default.string,
    disableLine: import_prop_types18.default.bool,
    disableTicks: import_prop_types18.default.bool,
    fill: import_prop_types18.default.string,
    hideTooltip: import_prop_types18.default.bool,
    id: import_prop_types18.default.oneOfType([import_prop_types18.default.number, import_prop_types18.default.string]),
    label: import_prop_types18.default.string,
    labelFontSize: import_prop_types18.default.number,
    labelStyle: import_prop_types18.default.object,
    max: import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]),
    min: import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]),
    position: import_prop_types18.default.oneOf(["bottom", "top"]),
    reverse: import_prop_types18.default.bool,
    scaleType: import_prop_types18.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types18.default.object,
    slots: import_prop_types18.default.object,
    stroke: import_prop_types18.default.string,
    sx: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object, import_prop_types18.default.bool])), import_prop_types18.default.func, import_prop_types18.default.object]),
    tickFontSize: import_prop_types18.default.number,
    tickInterval: import_prop_types18.default.oneOfType([import_prop_types18.default.oneOf(["auto"]), import_prop_types18.default.array, import_prop_types18.default.func]),
    tickLabelInterval: import_prop_types18.default.oneOfType([import_prop_types18.default.oneOf(["auto"]), import_prop_types18.default.func]),
    tickLabelPlacement: import_prop_types18.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types18.default.object,
    tickMaxStep: import_prop_types18.default.number,
    tickMinStep: import_prop_types18.default.number,
    tickNumber: import_prop_types18.default.number,
    tickPlacement: import_prop_types18.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types18.default.number,
    valueFormatter: import_prop_types18.default.func
  })),
  /**
   * The configuration of the y-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  yAxis: import_prop_types18.default.arrayOf(import_prop_types18.default.shape({
    classes: import_prop_types18.default.object,
    colorMap: import_prop_types18.default.oneOfType([import_prop_types18.default.shape({
      colors: import_prop_types18.default.arrayOf(import_prop_types18.default.string).isRequired,
      type: import_prop_types18.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types18.default.string,
      values: import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number, import_prop_types18.default.string]).isRequired)
    }), import_prop_types18.default.shape({
      color: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.string.isRequired), import_prop_types18.default.func]).isRequired,
      max: import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]),
      min: import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]),
      type: import_prop_types18.default.oneOf(["continuous"]).isRequired
    }), import_prop_types18.default.shape({
      colors: import_prop_types18.default.arrayOf(import_prop_types18.default.string).isRequired,
      thresholds: import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]).isRequired).isRequired,
      type: import_prop_types18.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types18.default.array,
    dataKey: import_prop_types18.default.string,
    disableLine: import_prop_types18.default.bool,
    disableTicks: import_prop_types18.default.bool,
    fill: import_prop_types18.default.string,
    hideTooltip: import_prop_types18.default.bool,
    id: import_prop_types18.default.oneOfType([import_prop_types18.default.number, import_prop_types18.default.string]),
    label: import_prop_types18.default.string,
    labelFontSize: import_prop_types18.default.number,
    labelStyle: import_prop_types18.default.object,
    max: import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]),
    min: import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]),
    position: import_prop_types18.default.oneOf(["left", "right"]),
    reverse: import_prop_types18.default.bool,
    scaleType: import_prop_types18.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types18.default.object,
    slots: import_prop_types18.default.object,
    stroke: import_prop_types18.default.string,
    sx: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object, import_prop_types18.default.bool])), import_prop_types18.default.func, import_prop_types18.default.object]),
    tickFontSize: import_prop_types18.default.number,
    tickInterval: import_prop_types18.default.oneOfType([import_prop_types18.default.oneOf(["auto"]), import_prop_types18.default.array, import_prop_types18.default.func]),
    tickLabelInterval: import_prop_types18.default.oneOfType([import_prop_types18.default.oneOf(["auto"]), import_prop_types18.default.func]),
    tickLabelPlacement: import_prop_types18.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types18.default.object,
    tickMaxStep: import_prop_types18.default.number,
    tickMinStep: import_prop_types18.default.number,
    tickNumber: import_prop_types18.default.number,
    tickPlacement: import_prop_types18.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types18.default.number,
    valueFormatter: import_prop_types18.default.func
  })),
  /**
   * The configuration of the z-axes.
   */
  zAxis: import_prop_types18.default.arrayOf(import_prop_types18.default.shape({
    colorMap: import_prop_types18.default.oneOfType([import_prop_types18.default.shape({
      colors: import_prop_types18.default.arrayOf(import_prop_types18.default.string).isRequired,
      type: import_prop_types18.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types18.default.string,
      values: import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number, import_prop_types18.default.string]).isRequired)
    }), import_prop_types18.default.shape({
      color: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.string.isRequired), import_prop_types18.default.func]).isRequired,
      max: import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]),
      min: import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]),
      type: import_prop_types18.default.oneOf(["continuous"]).isRequired
    }), import_prop_types18.default.shape({
      colors: import_prop_types18.default.arrayOf(import_prop_types18.default.string).isRequired,
      thresholds: import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.instanceOf(Date), import_prop_types18.default.number]).isRequired).isRequired,
      type: import_prop_types18.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types18.default.array,
    dataKey: import_prop_types18.default.string,
    id: import_prop_types18.default.string,
    max: import_prop_types18.default.number,
    min: import_prop_types18.default.number
  }))
} : void 0;

// node_modules/@mui/x-charts/ResponsiveChartContainer/ResponsiveChartContainer.js
var React45 = __toESM(require_react());
var import_prop_types19 = __toESM(require_prop_types());

// node_modules/@mui/x-charts/ResponsiveChartContainer/ResizableContainer.js
var ResizableContainer = styled_default("div", {
  name: "MuiResponsiveChart",
  slot: "Container"
})(({
  ownerState
}) => ({
  width: ownerState.width ?? "100%",
  height: ownerState.height ?? "100%",
  display: "flex",
  position: "relative",
  flexGrow: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "&>svg": {
    width: "100%",
    height: "100%"
  }
}));

// node_modules/@mui/x-charts/ResponsiveChartContainer/useChartContainerDimensions.js
var React44 = __toESM(require_react());
var useChartContainerDimensions = (inWidth, inHeight, resolveSizeBeforeRender) => {
  const stateRef = React44.useRef({
    displayError: false,
    initialCompute: true,
    computeRun: 0
  });
  const rootRef = React44.useRef(null);
  const [width, setWidth] = React44.useState(0);
  const [height, setHeight] = React44.useState(0);
  const computeSize = React44.useCallback(() => {
    const mainEl = rootRef == null ? void 0 : rootRef.current;
    if (!mainEl) {
      return {};
    }
    const win = ownerWindow(mainEl);
    const computedStyle = win.getComputedStyle(mainEl);
    const newHeight = Math.floor(parseFloat(computedStyle.height)) || 0;
    const newWidth = Math.floor(parseFloat(computedStyle.width)) || 0;
    setWidth(newWidth);
    setHeight(newHeight);
    return {
      width: newWidth,
      height: newHeight
    };
  }, []);
  React44.useEffect(() => {
    stateRef.current.displayError = true;
  }, []);
  useEnhancedEffect_default(() => {
    if (!resolveSizeBeforeRender || !stateRef.current.initialCompute || stateRef.current.computeRun > 20) {
      return;
    }
    const computedSize = computeSize();
    if (computedSize.width !== width || computedSize.height !== height) {
      stateRef.current.computeRun += 1;
    } else if (stateRef.current.initialCompute) {
      stateRef.current.initialCompute = false;
    }
  }, [width, height, computeSize, resolveSizeBeforeRender]);
  useEnhancedEffect_default(() => {
    if (inWidth !== void 0 && inHeight !== void 0) {
      return () => {
      };
    }
    computeSize();
    const elementToObserve = rootRef.current;
    if (typeof ResizeObserver === "undefined") {
      return () => {
      };
    }
    let animationFrame;
    const observer = new ResizeObserver(() => {
      animationFrame = requestAnimationFrame(() => {
        computeSize();
      });
    });
    if (elementToObserve) {
      observer.observe(elementToObserve);
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (elementToObserve) {
        observer.unobserve(elementToObserve);
      }
    };
  }, [computeSize, inHeight, inWidth]);
  if (true) {
    if (stateRef.current.displayError && inWidth === void 0 && width === 0) {
      console.error(`MUI X: ChartContainer does not have \`width\` prop, and its container has no \`width\` defined.`);
      stateRef.current.displayError = false;
    }
    if (stateRef.current.displayError && inHeight === void 0 && height === 0) {
      console.error(`MUI X: ChartContainer does not have \`height\` prop, and its container has no \`height\` defined.`);
      stateRef.current.displayError = false;
    }
  }
  return {
    containerRef: rootRef,
    width: inWidth ?? width,
    height: inHeight ?? height
  };
};

// node_modules/@mui/x-charts/ResponsiveChartContainer/useResponsiveChartContainerProps.js
var _excluded13 = ["width", "height", "resolveSizeBeforeRender", "margin", "children", "series", "colors", "dataset", "desc", "disableAxisListener", "highlightedItem", "onHighlightChange", "plugins", "sx", "title", "viewBox", "xAxis", "yAxis", "zAxis"];
var useResponsiveChartContainerProps = (props, ref) => {
  const {
    width,
    height,
    resolveSizeBeforeRender,
    margin,
    children,
    series,
    colors,
    dataset,
    desc,
    disableAxisListener,
    highlightedItem,
    onHighlightChange,
    plugins,
    sx,
    title,
    viewBox,
    xAxis,
    yAxis,
    zAxis
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded13);
  const {
    containerRef,
    width: dWidth,
    height: dHeight
  } = useChartContainerDimensions(width, height, resolveSizeBeforeRender);
  const resizableChartContainerProps = _extends({}, other, {
    ownerState: {
      width,
      height
    },
    ref: containerRef
  });
  const chartContainerProps = {
    margin,
    children,
    series,
    colors,
    dataset,
    desc,
    disableAxisListener,
    highlightedItem,
    onHighlightChange,
    plugins,
    sx,
    title,
    viewBox,
    xAxis,
    yAxis,
    zAxis,
    width: dWidth,
    height: dHeight,
    ref
  };
  return {
    hasIntrinsicSize: dWidth && dHeight,
    chartContainerProps,
    resizableChartContainerProps
  };
};

// node_modules/@mui/x-charts/ResponsiveChartContainer/ResponsiveChartContainer.js
var import_jsx_runtime24 = __toESM(require_jsx_runtime());
var ResponsiveChartContainer = React45.forwardRef(function ResponsiveChartContainer2(props, ref) {
  const {
    hasIntrinsicSize,
    chartContainerProps,
    resizableChartContainerProps
  } = useResponsiveChartContainerProps(props, ref);
  return (0, import_jsx_runtime24.jsx)(ResizableContainer, _extends({}, resizableChartContainerProps, {
    children: hasIntrinsicSize ? (0, import_jsx_runtime24.jsx)(ChartContainer, _extends({}, chartContainerProps)) : null
  }));
});
true ? ResponsiveChartContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types19.default.node,
  className: import_prop_types19.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.string), import_prop_types19.default.func]),
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types19.default.arrayOf(import_prop_types19.default.object),
  desc: import_prop_types19.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types19.default.bool,
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types19.default.number,
  /**
   * The item currently highlighted. Turns highlighting into a controlled prop.
   */
  highlightedItem: import_prop_types19.default.shape({
    dataIndex: import_prop_types19.default.number,
    seriesId: import_prop_types19.default.oneOfType([import_prop_types19.default.number, import_prop_types19.default.string])
  }),
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default object Depends on the charts type.
   */
  margin: import_prop_types19.default.shape({
    bottom: import_prop_types19.default.number,
    left: import_prop_types19.default.number,
    right: import_prop_types19.default.number,
    top: import_prop_types19.default.number
  }),
  /**
   * The callback fired when the highlighted item changes.
   *
   * @param {HighlightItemData | null} highlightedItem  The newly highlighted item.
   */
  onHighlightChange: import_prop_types19.default.func,
  /**
   * An array of plugins defining how to preprocess data.
   * If not provided, the container supports line, bar, scatter and pie charts.
   */
  plugins: import_prop_types19.default.arrayOf(import_prop_types19.default.object),
  /**
   * The chart will try to wait for the parent container to resolve its size
   * before it renders for the first time.
   *
   * This can be useful in some scenarios where the chart appear to grow after
   * the first render, like when used inside a grid.
   *
   * @default false
   */
  resolveSizeBeforeRender: import_prop_types19.default.bool,
  /**
   * The array of series to display.
   * Each type of series has its own specificity.
   * Please refer to the appropriate docs page to learn more about it.
   */
  series: import_prop_types19.default.arrayOf(import_prop_types19.default.object).isRequired,
  sx: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object, import_prop_types19.default.bool])), import_prop_types19.default.func, import_prop_types19.default.object]),
  title: import_prop_types19.default.string,
  viewBox: import_prop_types19.default.shape({
    height: import_prop_types19.default.number,
    width: import_prop_types19.default.number,
    x: import_prop_types19.default.number,
    y: import_prop_types19.default.number
  }),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types19.default.number,
  /**
   * The configuration of the x-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  xAxis: import_prop_types19.default.arrayOf(import_prop_types19.default.shape({
    classes: import_prop_types19.default.object,
    colorMap: import_prop_types19.default.oneOfType([import_prop_types19.default.shape({
      colors: import_prop_types19.default.arrayOf(import_prop_types19.default.string).isRequired,
      type: import_prop_types19.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types19.default.string,
      values: import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number, import_prop_types19.default.string]).isRequired)
    }), import_prop_types19.default.shape({
      color: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.string.isRequired), import_prop_types19.default.func]).isRequired,
      max: import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]),
      min: import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]),
      type: import_prop_types19.default.oneOf(["continuous"]).isRequired
    }), import_prop_types19.default.shape({
      colors: import_prop_types19.default.arrayOf(import_prop_types19.default.string).isRequired,
      thresholds: import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]).isRequired).isRequired,
      type: import_prop_types19.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types19.default.array,
    dataKey: import_prop_types19.default.string,
    disableLine: import_prop_types19.default.bool,
    disableTicks: import_prop_types19.default.bool,
    fill: import_prop_types19.default.string,
    hideTooltip: import_prop_types19.default.bool,
    id: import_prop_types19.default.oneOfType([import_prop_types19.default.number, import_prop_types19.default.string]),
    label: import_prop_types19.default.string,
    labelFontSize: import_prop_types19.default.number,
    labelStyle: import_prop_types19.default.object,
    max: import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]),
    min: import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]),
    position: import_prop_types19.default.oneOf(["bottom", "top"]),
    reverse: import_prop_types19.default.bool,
    scaleType: import_prop_types19.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types19.default.object,
    slots: import_prop_types19.default.object,
    stroke: import_prop_types19.default.string,
    sx: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object, import_prop_types19.default.bool])), import_prop_types19.default.func, import_prop_types19.default.object]),
    tickFontSize: import_prop_types19.default.number,
    tickInterval: import_prop_types19.default.oneOfType([import_prop_types19.default.oneOf(["auto"]), import_prop_types19.default.array, import_prop_types19.default.func]),
    tickLabelInterval: import_prop_types19.default.oneOfType([import_prop_types19.default.oneOf(["auto"]), import_prop_types19.default.func]),
    tickLabelPlacement: import_prop_types19.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types19.default.object,
    tickMaxStep: import_prop_types19.default.number,
    tickMinStep: import_prop_types19.default.number,
    tickNumber: import_prop_types19.default.number,
    tickPlacement: import_prop_types19.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types19.default.number,
    valueFormatter: import_prop_types19.default.func
  })),
  /**
   * The configuration of the y-axes.
   * If not provided, a default axis config is used.
   * An array of [[AxisConfig]] objects.
   */
  yAxis: import_prop_types19.default.arrayOf(import_prop_types19.default.shape({
    classes: import_prop_types19.default.object,
    colorMap: import_prop_types19.default.oneOfType([import_prop_types19.default.shape({
      colors: import_prop_types19.default.arrayOf(import_prop_types19.default.string).isRequired,
      type: import_prop_types19.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types19.default.string,
      values: import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number, import_prop_types19.default.string]).isRequired)
    }), import_prop_types19.default.shape({
      color: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.string.isRequired), import_prop_types19.default.func]).isRequired,
      max: import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]),
      min: import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]),
      type: import_prop_types19.default.oneOf(["continuous"]).isRequired
    }), import_prop_types19.default.shape({
      colors: import_prop_types19.default.arrayOf(import_prop_types19.default.string).isRequired,
      thresholds: import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]).isRequired).isRequired,
      type: import_prop_types19.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types19.default.array,
    dataKey: import_prop_types19.default.string,
    disableLine: import_prop_types19.default.bool,
    disableTicks: import_prop_types19.default.bool,
    fill: import_prop_types19.default.string,
    hideTooltip: import_prop_types19.default.bool,
    id: import_prop_types19.default.oneOfType([import_prop_types19.default.number, import_prop_types19.default.string]),
    label: import_prop_types19.default.string,
    labelFontSize: import_prop_types19.default.number,
    labelStyle: import_prop_types19.default.object,
    max: import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]),
    min: import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]),
    position: import_prop_types19.default.oneOf(["left", "right"]),
    reverse: import_prop_types19.default.bool,
    scaleType: import_prop_types19.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types19.default.object,
    slots: import_prop_types19.default.object,
    stroke: import_prop_types19.default.string,
    sx: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object, import_prop_types19.default.bool])), import_prop_types19.default.func, import_prop_types19.default.object]),
    tickFontSize: import_prop_types19.default.number,
    tickInterval: import_prop_types19.default.oneOfType([import_prop_types19.default.oneOf(["auto"]), import_prop_types19.default.array, import_prop_types19.default.func]),
    tickLabelInterval: import_prop_types19.default.oneOfType([import_prop_types19.default.oneOf(["auto"]), import_prop_types19.default.func]),
    tickLabelPlacement: import_prop_types19.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types19.default.object,
    tickMaxStep: import_prop_types19.default.number,
    tickMinStep: import_prop_types19.default.number,
    tickNumber: import_prop_types19.default.number,
    tickPlacement: import_prop_types19.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types19.default.number,
    valueFormatter: import_prop_types19.default.func
  })),
  /**
   * The configuration of the z-axes.
   */
  zAxis: import_prop_types19.default.arrayOf(import_prop_types19.default.shape({
    colorMap: import_prop_types19.default.oneOfType([import_prop_types19.default.shape({
      colors: import_prop_types19.default.arrayOf(import_prop_types19.default.string).isRequired,
      type: import_prop_types19.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types19.default.string,
      values: import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number, import_prop_types19.default.string]).isRequired)
    }), import_prop_types19.default.shape({
      color: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.string.isRequired), import_prop_types19.default.func]).isRequired,
      max: import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]),
      min: import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]),
      type: import_prop_types19.default.oneOf(["continuous"]).isRequired
    }), import_prop_types19.default.shape({
      colors: import_prop_types19.default.arrayOf(import_prop_types19.default.string).isRequired,
      thresholds: import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.instanceOf(Date), import_prop_types19.default.number]).isRequired).isRequired,
      type: import_prop_types19.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types19.default.array,
    dataKey: import_prop_types19.default.string,
    id: import_prop_types19.default.string,
    max: import_prop_types19.default.number,
    min: import_prop_types19.default.number
  }))
} : void 0;

// node_modules/@mui/x-charts/hooks/useInteractionItemProps.js
var React46 = __toESM(require_react());
var useInteractionItemProps = (skip) => {
  const {
    dispatch: dispatchInteraction
  } = React46.useContext(InteractionContext);
  const {
    setHighlighted,
    clearHighlighted
  } = useHighlighted();
  if (skip) {
    return () => ({});
  }
  const getInteractionItemProps = (data) => {
    const onPointerDown = (event) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    };
    const onPointerEnter = () => {
      dispatchInteraction({
        type: "enterItem",
        data
      });
      setHighlighted({
        seriesId: data.seriesId,
        dataIndex: data.dataIndex
      });
    };
    const onPointerLeave = (event) => {
      event.currentTarget.releasePointerCapture(event.pointerId);
      dispatchInteraction({
        type: "leaveItem",
        data
      });
      clearHighlighted();
    };
    return {
      onPointerEnter,
      onPointerLeave,
      onPointerDown
    };
  };
  return getInteractionItemProps;
};

// node_modules/@mui/x-charts/ChartsOverlay/ChartsOverlay.js
var React49 = __toESM(require_react());

// node_modules/@mui/x-charts/ChartsOverlay/ChartsLoadingOverlay.js
var React47 = __toESM(require_react());
var import_jsx_runtime25 = __toESM(require_jsx_runtime());
var _excluded14 = ["message"];
var StyledText = styled_default("text")(({
  theme
}) => _extends({}, theme.typography.body2, {
  stroke: "none",
  fill: theme.palette.text.primary,
  shapeRendering: "crispEdges",
  textAnchor: "middle",
  dominantBaseline: "middle"
}));
function ChartsLoadingOverlay(props) {
  const {
    message
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded14);
  const {
    top,
    left,
    height,
    width
  } = useDrawingArea();
  return (0, import_jsx_runtime25.jsx)(StyledText, _extends({
    x: left + width / 2,
    y: top + height / 2
  }, other, {
    children: message ?? "Loading data…"
  }));
}

// node_modules/@mui/x-charts/ChartsOverlay/ChartsNoDataOverlay.js
var React48 = __toESM(require_react());
var import_jsx_runtime26 = __toESM(require_jsx_runtime());
var _excluded15 = ["message"];
var StyledText2 = styled_default("text")(({
  theme
}) => _extends({}, theme.typography.body2, {
  stroke: "none",
  fill: theme.palette.text.primary,
  shapeRendering: "crispEdges",
  textAnchor: "middle",
  dominantBaseline: "middle"
}));
function ChartsNoDataOverlay(props) {
  const {
    message
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded15);
  const {
    top,
    left,
    height,
    width
  } = useDrawingArea();
  return (0, import_jsx_runtime26.jsx)(StyledText2, _extends({
    x: left + width / 2,
    y: top + height / 2
  }, other, {
    children: message ?? "No data to display"
  }));
}

// node_modules/@mui/x-charts/ChartsOverlay/ChartsOverlay.js
var import_jsx_runtime27 = __toESM(require_jsx_runtime());
function useNoData() {
  const seriesPerType = useSeries();
  return Object.values(seriesPerType).every((seriesOfGivenType) => {
    if (!seriesOfGivenType) {
      return true;
    }
    const {
      series,
      seriesOrder
    } = seriesOfGivenType;
    return seriesOrder.every((seriesId) => series[seriesId].data.length === 0);
  });
}
function ChartsOverlay(props) {
  var _a, _b, _c, _d;
  const noData = useNoData();
  if (props.loading) {
    const LoadingOverlay = ((_a = props.slots) == null ? void 0 : _a.loadingOverlay) ?? ChartsLoadingOverlay;
    return (0, import_jsx_runtime27.jsx)(LoadingOverlay, _extends({}, (_b = props.slotProps) == null ? void 0 : _b.loadingOverlay));
  }
  if (noData) {
    const NoDataOverlay = ((_c = props.slots) == null ? void 0 : _c.noDataOverlay) ?? ChartsNoDataOverlay;
    return (0, import_jsx_runtime27.jsx)(NoDataOverlay, _extends({}, (_d = props.slotProps) == null ? void 0 : _d.noDataOverlay));
  }
  return null;
}

export {
  HighlightedContext,
  HighlightedProvider,
  useHighlighted,
  useItemHighlighted,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  ChartsText,
  useForkRef,
  useSlotProps_default,
  useEnhancedEffect_default,
  getAxisUtilityClass,
  axisClasses,
  ChartsXAxis,
  ChartsYAxis,
  ChartsAxis,
  InteractionContext,
  useMouseTracker,
  getChartsTooltipUtilityClass,
  chartsTooltipClasses,
  ChartsTooltipPaper,
  ChartsTooltipTable,
  ChartsTooltipRow,
  ChartsTooltipCell,
  ChartsTooltipMark,
  DefaultChartsItemTooltipContent,
  ChartsItemTooltipContent,
  DefaultChartsAxisTooltipContent,
  ChartsAxisTooltipContent,
  ChartsTooltip,
  useItemTooltip,
  useAxisTooltip,
  getSeriesToDisplay,
  getLegendUtilityClass,
  legendClasses,
  DefaultChartsLegend,
  ChartsLegend,
  getPercentageValue,
  ContinuousColorLegend,
  PiecewiseColorLegend,
  getAxisHighlightUtilityClass,
  chartsAxisHighlightClasses,
  ChartsAxisHighlightPath,
  ChartsAxisHighlight,
  getSVGPoint,
  useInteractionItemProps,
  ChartsSurface,
  useChartGradient,
  ChartContainer,
  useChartContainerDimensions,
  ResponsiveChartContainer,
  ChartsOverlay
};
//# sourceMappingURL=chunk-D2PLHPB6.js.map
