import {
  TreeItem,
  composeClasses,
  createUseThemeProps,
  generateUtilityClass,
  generateUtilityClasses
} from "./chunk-22PVOAFR.js";
import {
  TreeViewItemDepthContext,
  findOrderInTremauxTree,
  getAllNavigableItems,
  getFirstNavigableItem,
  getLastNavigableItem,
  getNextNavigableItem,
  getNonDisabledItemsInRange,
  getPreviousNavigableItem,
  hasPlugin,
  isTargetInDescendants,
  useTreeViewLabel
} from "./chunk-RV3KQOZD.js";
import {
  useSlotProps_default
} from "./chunk-KPGINETX.js";
import {
  useForkRef
} from "./chunk-3LGQE7VV.js";
import "./chunk-F6NTF4AV.js";
import {
  TreeViewProvider
} from "./chunk-TUAHXNDG.js";
import {
  EventManager
} from "./chunk-3BGTFHDL.js";
import "./chunk-AJLZJXY7.js";
import {
  warnOnce
} from "./chunk-WBJSZGCN.js";
import "./chunk-FWXKAUXN.js";
import "./chunk-YYEJIEQF.js";
import "./chunk-SWNE43LG.js";
import "./chunk-LOZHJMDH.js";
import "./chunk-IBAEDSYL.js";
import {
  _objectWithoutPropertiesLoose
} from "./chunk-PF2VR3Y5.js";
import "./chunk-QZXUOQI3.js";
import "./chunk-64UTM7UA.js";
import "./chunk-Z7N4T466.js";
import "./chunk-PMW5RKAJ.js";
import "./chunk-GKCGNONP.js";
import "./chunk-GM5DFOYS.js";
import "./chunk-D2SR7NSE.js";
import "./chunk-HEWQV6CC.js";
import "./chunk-EFJNQFAP.js";
import "./chunk-TAPUFPH2.js";
import "./chunk-7JFGXNSW.js";
import "./chunk-KRGTNDB7.js";
import "./chunk-JMVEG3FK.js";
import "./chunk-UKH726FL.js";
import "./chunk-OAQ2ZWCX.js";
import "./chunk-DAYEOI5M.js";
import "./chunk-LV4FTLQY.js";
import {
  styled_default2 as styled_default,
  useRtl
} from "./chunk-Z2V24GCO.js";
import "./chunk-JSXDBQCN.js";
import {
  require_jsx_runtime
} from "./chunk-RZSASJON.js";
import "./chunk-KDVGFZWC.js";
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

// node_modules/@mui/x-tree-view/RichTreeView/RichTreeView.js
var React14 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/x-tree-view/RichTreeView/richTreeViewClasses.js
function getRichTreeViewUtilityClass(slot) {
  return generateUtilityClass("MuiRichTreeView", slot);
}
var richTreeViewClasses = generateUtilityClasses("MuiRichTreeView", ["root"]);

// node_modules/@mui/x-tree-view/internals/useTreeView/useTreeView.js
var React5 = __toESM(require_react());

// node_modules/@mui/x-tree-view/internals/useTreeView/useTreeViewModels.js
var React = __toESM(require_react());
var useTreeViewModels = (plugins, props) => {
  const modelsRef = React.useRef({});
  const [modelsState, setModelsState] = React.useState(() => {
    const initialState = {};
    plugins.forEach((plugin) => {
      if (plugin.models) {
        Object.entries(plugin.models).forEach(([modelName, modelInitializer]) => {
          modelsRef.current[modelName] = {
            isControlled: props[modelName] !== void 0,
            getDefaultValue: modelInitializer.getDefaultValue
          };
          initialState[modelName] = modelInitializer.getDefaultValue(props);
        });
      }
    });
    return initialState;
  });
  const models = Object.fromEntries(Object.entries(modelsRef.current).map(([modelName, model]) => {
    const value = props[modelName] ?? modelsState[modelName];
    return [modelName, {
      value,
      setControlledValue: (newValue) => {
        if (!model.isControlled) {
          setModelsState((prevState) => _extends({}, prevState, {
            [modelName]: newValue
          }));
        }
      }
    }];
  }));
  if (true) {
    Object.entries(modelsRef.current).forEach(([modelName, model]) => {
      const controlled = props[modelName];
      const newDefaultValue = model.getDefaultValue(props);
      React.useEffect(() => {
        if (model.isControlled !== (controlled !== void 0)) {
          console.error([`MUI X: A component is changing the ${model.isControlled ? "" : "un"}controlled ${modelName} state of TreeView to be ${model.isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${modelName} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
        }
      }, [controlled]);
      const {
        current: defaultValue
      } = React.useRef(newDefaultValue);
      React.useEffect(() => {
        if (!model.isControlled && defaultValue !== newDefaultValue) {
          console.error([`MUI X: A component is changing the default ${modelName} state of an uncontrolled TreeView after being initialized. To suppress this warning opt to use a controlled TreeView.`].join("\n"));
        }
      }, [JSON.stringify(newDefaultValue)]);
    });
  }
  return models;
};

// node_modules/@mui/x-tree-view/internals/corePlugins/useTreeViewInstanceEvents/useTreeViewInstanceEvents.js
var React2 = __toESM(require_react());
var isSyntheticEvent = (event) => {
  return event.isPropagationStopped !== void 0;
};
var useTreeViewInstanceEvents = () => {
  const [eventManager] = React2.useState(() => new EventManager());
  const publishEvent = React2.useCallback((...args) => {
    const [name, params, event = {}] = args;
    event.defaultMuiPrevented = false;
    if (isSyntheticEvent(event) && event.isPropagationStopped()) {
      return;
    }
    eventManager.emit(name, params, event);
  }, [eventManager]);
  const subscribeEvent = React2.useCallback((event, handler) => {
    eventManager.on(event, handler);
    return () => {
      eventManager.removeListener(event, handler);
    };
  }, [eventManager]);
  return {
    instance: {
      $$publishEvent: publishEvent,
      $$subscribeEvent: subscribeEvent
    }
  };
};
useTreeViewInstanceEvents.params = {};

// node_modules/@mui/x-tree-view/internals/corePlugins/useTreeViewOptionalPlugins/useTreeViewOptionalPlugins.js
var useTreeViewOptionalPlugins = ({
  plugins
}) => {
  const pluginSet = new Set(plugins);
  const getAvailablePlugins = () => pluginSet;
  return {
    instance: {
      getAvailablePlugins
    }
  };
};
useTreeViewOptionalPlugins.params = {};

// node_modules/@mui/x-tree-view/internals/corePlugins/useTreeViewId/useTreeViewId.js
var React4 = __toESM(require_react());

// node_modules/@mui/x-tree-view/node_modules/@mui/utils/esm/useId/useId.js
var React3 = __toESM(require_react());
var globalId = 0;
function useGlobalId(idOverride) {
  const [defaultId, setDefaultId] = React3.useState(idOverride);
  const id = idOverride || defaultId;
  React3.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`mui-${globalId}`);
    }
  }, [defaultId]);
  return id;
}
var maybeReactUseId = React3["useId".toString()];
function useId(idOverride) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId();
    return idOverride != null ? idOverride : reactId;
  }
  return useGlobalId(idOverride);
}

// node_modules/@mui/x-tree-view/internals/corePlugins/useTreeViewId/useTreeViewId.js
var useTreeViewId = ({
  params
}) => {
  const treeId = useId(params.id);
  const getTreeItemIdAttribute = React4.useCallback((itemId, idAttribute) => idAttribute ?? `${treeId}-${itemId}`, [treeId]);
  return {
    getRootProps: () => ({
      id: treeId
    }),
    instance: {
      getTreeItemIdAttribute
    }
  };
};
useTreeViewId.params = {
  id: true
};

// node_modules/@mui/x-tree-view/internals/corePlugins/corePlugins.js
var TREE_VIEW_CORE_PLUGINS = [useTreeViewInstanceEvents, useTreeViewOptionalPlugins, useTreeViewId];

// node_modules/@mui/x-tree-view/internals/useTreeView/extractPluginParamsFromProps.js
var _excluded = ["slots", "slotProps", "apiRef", "experimentalFeatures"];
var extractPluginParamsFromProps = (_ref) => {
  let {
    props: {
      slots,
      slotProps,
      apiRef,
      experimentalFeatures
    },
    plugins
  } = _ref, props = _objectWithoutPropertiesLoose(_ref.props, _excluded);
  const paramsLookup = {};
  plugins.forEach((plugin) => {
    Object.assign(paramsLookup, plugin.params);
  });
  const pluginParams = {};
  const forwardedProps = {};
  Object.keys(props).forEach((propName) => {
    const prop = props[propName];
    if (paramsLookup[propName]) {
      pluginParams[propName] = prop;
    } else {
      forwardedProps[propName] = prop;
    }
  });
  const defaultizedPluginParams = plugins.reduce((acc, plugin) => {
    if (plugin.getDefaultizedParams) {
      return plugin.getDefaultizedParams(acc);
    }
    return acc;
  }, pluginParams);
  return {
    apiRef,
    forwardedProps,
    pluginParams: defaultizedPluginParams,
    slots: slots ?? {},
    slotProps: slotProps ?? {},
    experimentalFeatures: experimentalFeatures ?? {}
  };
};

// node_modules/@mui/x-tree-view/internals/useTreeView/useTreeViewBuildContext.js
var useTreeViewBuildContext = ({
  plugins,
  instance,
  publicAPI,
  rootRef
}) => {
  const runItemPlugins = (itemPluginProps) => {
    let finalRootRef = null;
    let finalContentRef = null;
    const pluginPropEnhancers = [];
    const pluginPropEnhancersNames = {};
    plugins.forEach((plugin) => {
      if (!plugin.itemPlugin) {
        return;
      }
      const itemPluginResponse = plugin.itemPlugin({
        props: itemPluginProps,
        rootRef: finalRootRef,
        contentRef: finalContentRef
      });
      if (itemPluginResponse == null ? void 0 : itemPluginResponse.rootRef) {
        finalRootRef = itemPluginResponse.rootRef;
      }
      if (itemPluginResponse == null ? void 0 : itemPluginResponse.contentRef) {
        finalContentRef = itemPluginResponse.contentRef;
      }
      if (itemPluginResponse == null ? void 0 : itemPluginResponse.propsEnhancers) {
        pluginPropEnhancers.push(itemPluginResponse.propsEnhancers);
        Object.keys(itemPluginResponse.propsEnhancers).forEach((propsEnhancerName) => {
          pluginPropEnhancersNames[propsEnhancerName] = true;
        });
      }
    });
    const resolvePropsEnhancer = (currentSlotName) => (currentSlotParams) => {
      const enhancedProps = {};
      pluginPropEnhancers.forEach((propsEnhancersForCurrentPlugin) => {
        const propsEnhancerForCurrentPluginAndSlot = propsEnhancersForCurrentPlugin[currentSlotName];
        if (propsEnhancerForCurrentPluginAndSlot != null) {
          Object.assign(enhancedProps, propsEnhancerForCurrentPluginAndSlot(currentSlotParams));
        }
      });
      return enhancedProps;
    };
    const propsEnhancers = Object.fromEntries(Object.keys(pluginPropEnhancersNames).map((propEnhancerName) => [propEnhancerName, resolvePropsEnhancer(propEnhancerName)]));
    return {
      contentRef: finalContentRef,
      rootRef: finalRootRef,
      propsEnhancers
    };
  };
  const wrapItem = ({
    itemId,
    children
  }) => {
    let finalChildren = children;
    for (let i = plugins.length - 1; i >= 0; i -= 1) {
      const plugin = plugins[i];
      if (plugin.wrapItem) {
        finalChildren = plugin.wrapItem({
          itemId,
          children: finalChildren,
          instance
        });
      }
    }
    return finalChildren;
  };
  const wrapRoot = ({
    children
  }) => {
    let finalChildren = children;
    for (let i = plugins.length - 1; i >= 0; i -= 1) {
      const plugin = plugins[i];
      if (plugin.wrapRoot) {
        finalChildren = plugin.wrapRoot({
          children: finalChildren,
          instance
        });
      }
    }
    return finalChildren;
  };
  return {
    runItemPlugins,
    wrapItem,
    wrapRoot,
    instance,
    rootRef,
    publicAPI
  };
};

// node_modules/@mui/x-tree-view/internals/useTreeView/useTreeView.js
function useTreeViewApiInitialization(inputApiRef) {
  const fallbackPublicApiRef = React5.useRef({});
  if (inputApiRef) {
    if (inputApiRef.current == null) {
      inputApiRef.current = {};
    }
    return inputApiRef.current;
  }
  return fallbackPublicApiRef.current;
}
var useTreeView = ({
  plugins: inPlugins,
  rootRef,
  props
}) => {
  const plugins = [...TREE_VIEW_CORE_PLUGINS, ...inPlugins];
  const {
    pluginParams,
    forwardedProps,
    apiRef,
    experimentalFeatures,
    slots,
    slotProps
  } = extractPluginParamsFromProps({
    plugins,
    props
  });
  const models = useTreeViewModels(plugins, pluginParams);
  const instanceRef = React5.useRef({});
  const instance = instanceRef.current;
  const publicAPI = useTreeViewApiInitialization(apiRef);
  const innerRootRef = React5.useRef(null);
  const handleRootRef = useForkRef(innerRootRef, rootRef);
  const contextValue = useTreeViewBuildContext({
    plugins,
    instance,
    publicAPI,
    rootRef: innerRootRef
  });
  const [state, setState] = React5.useState(() => {
    const temp = {};
    plugins.forEach((plugin) => {
      if (plugin.getInitialState) {
        Object.assign(temp, plugin.getInitialState(pluginParams));
      }
    });
    return temp;
  });
  const rootPropsGetters = [];
  const runPlugin = (plugin) => {
    const pluginResponse = plugin({
      instance,
      params: pluginParams,
      slots,
      slotProps,
      experimentalFeatures,
      state,
      setState,
      rootRef: innerRootRef,
      models,
      plugins
    });
    if (pluginResponse.getRootProps) {
      rootPropsGetters.push(pluginResponse.getRootProps);
    }
    if (pluginResponse.publicAPI) {
      Object.assign(publicAPI, pluginResponse.publicAPI);
    }
    if (pluginResponse.instance) {
      Object.assign(instance, pluginResponse.instance);
    }
    if (pluginResponse.contextValue) {
      Object.assign(contextValue, pluginResponse.contextValue);
    }
  };
  plugins.forEach(runPlugin);
  const getRootProps = (otherHandlers = {}) => {
    const rootProps = _extends({
      role: "tree"
    }, forwardedProps, otherHandlers, {
      ref: handleRootRef
    });
    rootPropsGetters.forEach((rootPropsGetter) => {
      Object.assign(rootProps, rootPropsGetter(otherHandlers));
    });
    return rootProps;
  };
  return {
    getRootProps,
    rootRef: handleRootRef,
    contextValue,
    instance
  };
};

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewItems/useTreeViewItems.js
var React6 = __toESM(require_react());

// node_modules/@mui/x-tree-view/internals/utils/publishTreeViewEvent.js
var publishTreeViewEvent = (instance, eventName, params) => {
  instance.$$publishEvent(eventName, params);
};

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewItems/useTreeViewItems.utils.js
var TREE_VIEW_ROOT_PARENT_ID = "__TREE_VIEW_ROOT_PARENT_ID__";
var buildSiblingIndexes = (siblings) => {
  const siblingsIndexLookup = {};
  siblings.forEach((childId, index) => {
    siblingsIndexLookup[childId] = index;
  });
  return siblingsIndexLookup;
};

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewItems/useTreeViewItems.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded2 = ["children"];
var updateItemsState = ({
  items,
  isItemDisabled,
  getItemLabel,
  getItemId
}) => {
  const itemMetaMap = {};
  const itemMap = {};
  const itemOrderedChildrenIds = {
    [TREE_VIEW_ROOT_PARENT_ID]: []
  };
  const processItem = (item, depth, parentId) => {
    var _a, _b;
    const id = getItemId ? getItemId(item) : item.id;
    if (id == null) {
      throw new Error(["MUI X: The Tree View component requires all items to have a unique `id` property.", "Alternatively, you can use the `getItemId` prop to specify a custom id for each item.", "An item was provided without id in the `items` prop:", JSON.stringify(item)].join("\n"));
    }
    if (itemMetaMap[id] != null) {
      throw new Error(["MUI X: The Tree View component requires all items to have a unique `id` property.", "Alternatively, you can use the `getItemId` prop to specify a custom id for each item.", `Two items were provided with the same id in the \`items\` prop: "${id}"`].join("\n"));
    }
    const label = getItemLabel ? getItemLabel(item) : item.label;
    if (label == null) {
      throw new Error(["MUI X: The Tree View component requires all items to have a `label` property.", "Alternatively, you can use the `getItemLabel` prop to specify a custom label for each item.", "An item was provided without label in the `items` prop:", JSON.stringify(item)].join("\n"));
    }
    itemMetaMap[id] = {
      id,
      label,
      parentId,
      idAttribute: void 0,
      expandable: !!((_a = item.children) == null ? void 0 : _a.length),
      disabled: isItemDisabled ? isItemDisabled(item) : false,
      depth
    };
    itemMap[id] = item;
    const parentIdWithDefault = parentId ?? TREE_VIEW_ROOT_PARENT_ID;
    if (!itemOrderedChildrenIds[parentIdWithDefault]) {
      itemOrderedChildrenIds[parentIdWithDefault] = [];
    }
    itemOrderedChildrenIds[parentIdWithDefault].push(id);
    (_b = item.children) == null ? void 0 : _b.forEach((child) => processItem(child, depth + 1, id));
  };
  items.forEach((item) => processItem(item, 0, null));
  const itemChildrenIndexes = {};
  Object.keys(itemOrderedChildrenIds).forEach((parentId) => {
    itemChildrenIndexes[parentId] = buildSiblingIndexes(itemOrderedChildrenIds[parentId]);
  });
  return {
    itemMetaMap,
    itemMap,
    itemOrderedChildrenIds,
    itemChildrenIndexes
  };
};
var useTreeViewItems = ({
  instance,
  params,
  state,
  setState,
  experimentalFeatures
}) => {
  const getItemMeta = React6.useCallback((itemId) => state.items.itemMetaMap[itemId], [state.items.itemMetaMap]);
  const getItem = React6.useCallback((itemId) => state.items.itemMap[itemId], [state.items.itemMap]);
  const getItemTree = React6.useCallback(() => {
    const getItemFromItemId = (id) => {
      const _state$items$itemMap$ = state.items.itemMap[id], item = _objectWithoutPropertiesLoose(_state$items$itemMap$, _excluded2);
      const newChildren = state.items.itemOrderedChildrenIds[id];
      if (newChildren) {
        item.children = newChildren.map(getItemFromItemId);
      }
      return item;
    };
    return state.items.itemOrderedChildrenIds[TREE_VIEW_ROOT_PARENT_ID].map(getItemFromItemId);
  }, [state.items.itemMap, state.items.itemOrderedChildrenIds]);
  const isItemDisabled = React6.useCallback((itemId) => {
    if (itemId == null) {
      return false;
    }
    let itemMeta = instance.getItemMeta(itemId);
    if (!itemMeta) {
      return false;
    }
    if (itemMeta.disabled) {
      return true;
    }
    while (itemMeta.parentId != null) {
      itemMeta = instance.getItemMeta(itemMeta.parentId);
      if (itemMeta.disabled) {
        return true;
      }
    }
    return false;
  }, [instance]);
  const getItemIndex = React6.useCallback((itemId) => {
    const parentId = instance.getItemMeta(itemId).parentId ?? TREE_VIEW_ROOT_PARENT_ID;
    return state.items.itemChildrenIndexes[parentId][itemId];
  }, [instance, state.items.itemChildrenIndexes]);
  const getItemOrderedChildrenIds = React6.useCallback((itemId) => state.items.itemOrderedChildrenIds[itemId ?? TREE_VIEW_ROOT_PARENT_ID] ?? [], [state.items.itemOrderedChildrenIds]);
  const getItemDOMElement = (itemId) => {
    const itemMeta = instance.getItemMeta(itemId);
    if (itemMeta == null) {
      return null;
    }
    return document.getElementById(instance.getTreeItemIdAttribute(itemId, itemMeta.idAttribute));
  };
  const isItemNavigable = (itemId) => {
    if (params.disabledItemsFocusable) {
      return true;
    }
    return !instance.isItemDisabled(itemId);
  };
  const areItemUpdatesPreventedRef = React6.useRef(false);
  const preventItemUpdates = React6.useCallback(() => {
    areItemUpdatesPreventedRef.current = true;
  }, []);
  const areItemUpdatesPrevented = React6.useCallback(() => areItemUpdatesPreventedRef.current, []);
  React6.useEffect(() => {
    if (instance.areItemUpdatesPrevented()) {
      return;
    }
    setState((prevState) => {
      const newState = updateItemsState({
        items: params.items,
        isItemDisabled: params.isItemDisabled,
        getItemId: params.getItemId,
        getItemLabel: params.getItemLabel
      });
      Object.values(prevState.items.itemMetaMap).forEach((item) => {
        if (!newState.itemMetaMap[item.id]) {
          publishTreeViewEvent(instance, "removeItem", {
            id: item.id
          });
        }
      });
      return _extends({}, prevState, {
        items: newState
      });
    });
  }, [instance, setState, params.items, params.isItemDisabled, params.getItemId, params.getItemLabel]);
  const getItemsToRender = () => {
    const getPropsFromItemId = (id) => {
      var _a;
      const item = state.items.itemMetaMap[id];
      return {
        label: item.label,
        itemId: item.id,
        id: item.idAttribute,
        children: (_a = state.items.itemOrderedChildrenIds[id]) == null ? void 0 : _a.map(getPropsFromItemId)
      };
    };
    return state.items.itemOrderedChildrenIds[TREE_VIEW_ROOT_PARENT_ID].map(getPropsFromItemId);
  };
  return {
    getRootProps: () => ({
      style: {
        "--TreeView-itemChildrenIndentation": typeof params.itemChildrenIndentation === "number" ? `${params.itemChildrenIndentation}px` : params.itemChildrenIndentation
      }
    }),
    publicAPI: {
      getItem,
      getItemDOMElement,
      getItemTree,
      getItemOrderedChildrenIds
    },
    instance: {
      getItemMeta,
      getItem,
      getItemTree,
      getItemsToRender,
      getItemIndex,
      getItemDOMElement,
      getItemOrderedChildrenIds,
      isItemDisabled,
      isItemNavigable,
      preventItemUpdates,
      areItemUpdatesPrevented
    },
    contextValue: {
      items: {
        onItemClick: params.onItemClick,
        disabledItemsFocusable: params.disabledItemsFocusable,
        indentationAtItemLevel: experimentalFeatures.indentationAtItemLevel ?? false
      }
    }
  };
};
useTreeViewItems.getInitialState = (params) => ({
  items: updateItemsState({
    items: params.items,
    isItemDisabled: params.isItemDisabled,
    getItemId: params.getItemId,
    getItemLabel: params.getItemLabel
  })
});
useTreeViewItems.getDefaultizedParams = (params) => _extends({}, params, {
  disabledItemsFocusable: params.disabledItemsFocusable ?? false,
  itemChildrenIndentation: params.itemChildrenIndentation ?? "12px"
});
useTreeViewItems.wrapRoot = ({
  children,
  instance
}) => {
  return (0, import_jsx_runtime.jsx)(TreeViewItemDepthContext.Provider, {
    value: (itemId) => {
      var _a;
      return ((_a = instance.getItemMeta(itemId)) == null ? void 0 : _a.depth) ?? 0;
    },
    children
  });
};
useTreeViewItems.params = {
  disabledItemsFocusable: true,
  items: true,
  isItemDisabled: true,
  getItemLabel: true,
  getItemId: true,
  onItemClick: true,
  itemChildrenIndentation: true
};

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewExpansion/useTreeViewExpansion.js
var React9 = __toESM(require_react());

// node_modules/@mui/x-tree-view/node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
var React8 = __toESM(require_react());

// node_modules/@mui/x-tree-view/node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js
var React7 = __toESM(require_react());
var useEnhancedEffect = typeof window !== "undefined" ? React7.useLayoutEffect : React7.useEffect;
var useEnhancedEffect_default = useEnhancedEffect;

// node_modules/@mui/x-tree-view/node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
function useEventCallback(fn) {
  const ref = React8.useRef(fn);
  useEnhancedEffect_default(() => {
    ref.current = fn;
  });
  return React8.useRef((...args) => (
    // @ts-expect-error hide `this`
    (0, ref.current)(...args)
  )).current;
}
var useEventCallback_default = useEventCallback;

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewExpansion/useTreeViewExpansion.js
var useTreeViewExpansion = ({
  instance,
  params,
  models
}) => {
  const expandedItemsMap = React9.useMemo(() => {
    const temp = /* @__PURE__ */ new Map();
    models.expandedItems.value.forEach((id) => {
      temp.set(id, true);
    });
    return temp;
  }, [models.expandedItems.value]);
  const setExpandedItems = (event, value) => {
    var _a;
    (_a = params.onExpandedItemsChange) == null ? void 0 : _a.call(params, event, value);
    models.expandedItems.setControlledValue(value);
  };
  const isItemExpanded = React9.useCallback((itemId) => expandedItemsMap.has(itemId), [expandedItemsMap]);
  const isItemExpandable = React9.useCallback((itemId) => {
    var _a;
    return !!((_a = instance.getItemMeta(itemId)) == null ? void 0 : _a.expandable);
  }, [instance]);
  const toggleItemExpansion = useEventCallback_default((event, itemId) => {
    const isExpandedBefore = instance.isItemExpanded(itemId);
    instance.setItemExpansion(event, itemId, !isExpandedBefore);
  });
  const setItemExpansion = useEventCallback_default((event, itemId, isExpanded) => {
    const isExpandedBefore = instance.isItemExpanded(itemId);
    if (isExpandedBefore === isExpanded) {
      return;
    }
    let newExpanded;
    if (isExpanded) {
      newExpanded = [itemId].concat(models.expandedItems.value);
    } else {
      newExpanded = models.expandedItems.value.filter((id) => id !== itemId);
    }
    if (params.onItemExpansionToggle) {
      params.onItemExpansionToggle(event, itemId, isExpanded);
    }
    setExpandedItems(event, newExpanded);
  });
  const expandAllSiblings = (event, itemId) => {
    const itemMeta = instance.getItemMeta(itemId);
    const siblings = instance.getItemOrderedChildrenIds(itemMeta.parentId);
    const diff = siblings.filter((child) => instance.isItemExpandable(child) && !instance.isItemExpanded(child));
    const newExpanded = models.expandedItems.value.concat(diff);
    if (diff.length > 0) {
      if (params.onItemExpansionToggle) {
        diff.forEach((newlyExpandedItemId) => {
          params.onItemExpansionToggle(event, newlyExpandedItemId, true);
        });
      }
      setExpandedItems(event, newExpanded);
    }
  };
  const expansionTrigger = React9.useMemo(() => {
    if (params.expansionTrigger) {
      return params.expansionTrigger;
    }
    if (instance.isTreeViewEditable) {
      return "iconContainer";
    }
    return "content";
  }, [params.expansionTrigger, instance.isTreeViewEditable]);
  return {
    publicAPI: {
      setItemExpansion
    },
    instance: {
      isItemExpanded,
      isItemExpandable,
      setItemExpansion,
      toggleItemExpansion,
      expandAllSiblings
    },
    contextValue: {
      expansion: {
        expansionTrigger
      }
    }
  };
};
useTreeViewExpansion.models = {
  expandedItems: {
    getDefaultValue: (params) => params.defaultExpandedItems
  }
};
var DEFAULT_EXPANDED_ITEMS = [];
useTreeViewExpansion.getDefaultizedParams = (params) => _extends({}, params, {
  defaultExpandedItems: params.defaultExpandedItems ?? DEFAULT_EXPANDED_ITEMS
});
useTreeViewExpansion.params = {
  expandedItems: true,
  defaultExpandedItems: true,
  onExpandedItemsChange: true,
  onItemExpansionToggle: true,
  expansionTrigger: true
};

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewSelection/useTreeViewSelection.js
var React10 = __toESM(require_react());

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewSelection/useTreeViewSelection.utils.js
var convertSelectedItemsToArray = (model) => {
  if (Array.isArray(model)) {
    return model;
  }
  if (model != null) {
    return [model];
  }
  return [];
};
var getLookupFromArray = (array) => {
  const lookup = {};
  array.forEach((itemId) => {
    lookup[itemId] = true;
  });
  return lookup;
};

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewSelection/useTreeViewSelection.js
var useTreeViewSelection = ({
  instance,
  params,
  models
}) => {
  const lastSelectedItem = React10.useRef(null);
  const lastSelectedRange = React10.useRef({});
  const selectedItemsMap = React10.useMemo(() => {
    const temp = /* @__PURE__ */ new Map();
    if (Array.isArray(models.selectedItems.value)) {
      models.selectedItems.value.forEach((id) => {
        temp.set(id, true);
      });
    } else if (models.selectedItems.value != null) {
      temp.set(models.selectedItems.value, true);
    }
    return temp;
  }, [models.selectedItems.value]);
  const setSelectedItems = (event, newSelectedItems) => {
    if (params.onItemSelectionToggle) {
      if (params.multiSelect) {
        const addedItems = newSelectedItems.filter((itemId) => !instance.isItemSelected(itemId));
        const removedItems = models.selectedItems.value.filter((itemId) => !newSelectedItems.includes(itemId));
        addedItems.forEach((itemId) => {
          params.onItemSelectionToggle(event, itemId, true);
        });
        removedItems.forEach((itemId) => {
          params.onItemSelectionToggle(event, itemId, false);
        });
      } else if (newSelectedItems !== models.selectedItems.value) {
        if (models.selectedItems.value != null) {
          params.onItemSelectionToggle(event, models.selectedItems.value, false);
        }
        if (newSelectedItems != null) {
          params.onItemSelectionToggle(event, newSelectedItems, true);
        }
      }
    }
    if (params.onSelectedItemsChange) {
      params.onSelectedItemsChange(event, newSelectedItems);
    }
    models.selectedItems.setControlledValue(newSelectedItems);
  };
  const isItemSelected = (itemId) => selectedItemsMap.has(itemId);
  const selectItem = ({
    event,
    itemId,
    keepExistingSelection = false,
    shouldBeSelected
  }) => {
    if (params.disableSelection) {
      return;
    }
    let newSelected;
    if (keepExistingSelection) {
      const cleanSelectedItems = convertSelectedItemsToArray(models.selectedItems.value);
      const isSelectedBefore = instance.isItemSelected(itemId);
      if (isSelectedBefore && (shouldBeSelected === false || shouldBeSelected == null)) {
        newSelected = cleanSelectedItems.filter((id) => id !== itemId);
      } else if (!isSelectedBefore && (shouldBeSelected === true || shouldBeSelected == null)) {
        newSelected = [itemId].concat(cleanSelectedItems);
      } else {
        newSelected = cleanSelectedItems;
      }
    } else {
      if (shouldBeSelected === false || shouldBeSelected == null && instance.isItemSelected(itemId)) {
        newSelected = params.multiSelect ? [] : null;
      } else {
        newSelected = params.multiSelect ? [itemId] : itemId;
      }
    }
    setSelectedItems(event, newSelected);
    lastSelectedItem.current = itemId;
    lastSelectedRange.current = {};
  };
  const selectRange = (event, [start, end]) => {
    if (params.disableSelection || !params.multiSelect) {
      return;
    }
    let newSelectedItems = convertSelectedItemsToArray(models.selectedItems.value).slice();
    if (Object.keys(lastSelectedRange.current).length > 0) {
      newSelectedItems = newSelectedItems.filter((id) => !lastSelectedRange.current[id]);
    }
    const selectedItemsLookup = getLookupFromArray(newSelectedItems);
    const range = getNonDisabledItemsInRange(instance, start, end);
    const itemsToAddToModel = range.filter((id) => !selectedItemsLookup[id]);
    newSelectedItems = newSelectedItems.concat(itemsToAddToModel);
    setSelectedItems(event, newSelectedItems);
    lastSelectedRange.current = getLookupFromArray(range);
  };
  const expandSelectionRange = (event, itemId) => {
    if (lastSelectedItem.current != null) {
      const [start, end] = findOrderInTremauxTree(instance, itemId, lastSelectedItem.current);
      selectRange(event, [start, end]);
    }
  };
  const selectRangeFromStartToItem = (event, itemId) => {
    selectRange(event, [getFirstNavigableItem(instance), itemId]);
  };
  const selectRangeFromItemToEnd = (event, itemId) => {
    selectRange(event, [itemId, getLastNavigableItem(instance)]);
  };
  const selectAllNavigableItems = (event) => {
    if (params.disableSelection || !params.multiSelect) {
      return;
    }
    const navigableItems = getAllNavigableItems(instance);
    setSelectedItems(event, navigableItems);
    lastSelectedRange.current = getLookupFromArray(navigableItems);
  };
  const selectItemFromArrowNavigation = (event, currentItem, nextItem) => {
    if (params.disableSelection || !params.multiSelect) {
      return;
    }
    let newSelectedItems = convertSelectedItemsToArray(models.selectedItems.value).slice();
    if (Object.keys(lastSelectedRange.current).length === 0) {
      newSelectedItems.push(nextItem);
      lastSelectedRange.current = {
        [currentItem]: true,
        [nextItem]: true
      };
    } else {
      if (!lastSelectedRange.current[currentItem]) {
        lastSelectedRange.current = {};
      }
      if (lastSelectedRange.current[nextItem]) {
        newSelectedItems = newSelectedItems.filter((id) => id !== currentItem);
        delete lastSelectedRange.current[currentItem];
      } else {
        newSelectedItems.push(nextItem);
        lastSelectedRange.current[nextItem] = true;
      }
    }
    setSelectedItems(event, newSelectedItems);
  };
  return {
    getRootProps: () => ({
      "aria-multiselectable": params.multiSelect
    }),
    publicAPI: {
      selectItem
    },
    instance: {
      isItemSelected,
      selectItem,
      selectAllNavigableItems,
      expandSelectionRange,
      selectRangeFromStartToItem,
      selectRangeFromItemToEnd,
      selectItemFromArrowNavigation
    },
    contextValue: {
      selection: {
        multiSelect: params.multiSelect,
        checkboxSelection: params.checkboxSelection,
        disableSelection: params.disableSelection
      }
    }
  };
};
useTreeViewSelection.models = {
  selectedItems: {
    getDefaultValue: (params) => params.defaultSelectedItems
  }
};
var DEFAULT_SELECTED_ITEMS = [];
useTreeViewSelection.getDefaultizedParams = (params) => _extends({}, params, {
  disableSelection: params.disableSelection ?? false,
  multiSelect: params.multiSelect ?? false,
  checkboxSelection: params.checkboxSelection ?? false,
  defaultSelectedItems: params.defaultSelectedItems ?? (params.multiSelect ? DEFAULT_SELECTED_ITEMS : null)
});
useTreeViewSelection.params = {
  disableSelection: true,
  multiSelect: true,
  checkboxSelection: true,
  defaultSelectedItems: true,
  selectedItems: true,
  onSelectedItemsChange: true,
  onItemSelectionToggle: true
};

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewFocus/useTreeViewFocus.js
var React12 = __toESM(require_react());

// node_modules/@mui/x-tree-view/node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

// node_modules/@mui/x-tree-view/internals/hooks/useInstanceEventHandler.js
var React11 = __toESM(require_react());

// node_modules/@mui/x-tree-view/internals/utils/cleanupTracking/TimerBasedCleanupTracking.js
var CLEANUP_TIMER_LOOP_MILLIS = 1e3;
var TimerBasedCleanupTracking = class {
  constructor(timeout = CLEANUP_TIMER_LOOP_MILLIS) {
    this.timeouts = /* @__PURE__ */ new Map();
    this.cleanupTimeout = CLEANUP_TIMER_LOOP_MILLIS;
    this.cleanupTimeout = timeout;
  }
  register(object, unsubscribe, unregisterToken) {
    if (!this.timeouts) {
      this.timeouts = /* @__PURE__ */ new Map();
    }
    const timeout = setTimeout(() => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
      this.timeouts.delete(unregisterToken.cleanupToken);
    }, this.cleanupTimeout);
    this.timeouts.set(unregisterToken.cleanupToken, timeout);
  }
  unregister(unregisterToken) {
    const timeout = this.timeouts.get(unregisterToken.cleanupToken);
    if (timeout) {
      this.timeouts.delete(unregisterToken.cleanupToken);
      clearTimeout(timeout);
    }
  }
  reset() {
    if (this.timeouts) {
      this.timeouts.forEach((value, key) => {
        this.unregister({
          cleanupToken: key
        });
      });
      this.timeouts = void 0;
    }
  }
};

// node_modules/@mui/x-tree-view/internals/utils/cleanupTracking/FinalizationRegistryBasedCleanupTracking.js
var FinalizationRegistryBasedCleanupTracking = class {
  constructor() {
    this.registry = new FinalizationRegistry((unsubscribe) => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    });
  }
  register(object, unsubscribe, unregisterToken) {
    this.registry.register(object, unsubscribe, unregisterToken);
  }
  unregister(unregisterToken) {
    this.registry.unregister(unregisterToken);
  }
  // eslint-disable-next-line class-methods-use-this
  reset() {
  }
};

// node_modules/@mui/x-tree-view/internals/hooks/useInstanceEventHandler.js
var ObjectToBeRetainedByReact = class {
};
function createUseInstanceEventHandler(registryContainer2) {
  let cleanupTokensCounter = 0;
  return function useInstanceEventHandler2(instance, eventName, handler) {
    if (registryContainer2.registry === null) {
      registryContainer2.registry = typeof FinalizationRegistry !== "undefined" ? new FinalizationRegistryBasedCleanupTracking() : new TimerBasedCleanupTracking();
    }
    const [objectRetainedByReact] = React11.useState(new ObjectToBeRetainedByReact());
    const subscription = React11.useRef(null);
    const handlerRef = React11.useRef();
    handlerRef.current = handler;
    const cleanupTokenRef = React11.useRef(null);
    if (!subscription.current && handlerRef.current) {
      const enhancedHandler = (params, event) => {
        var _a;
        if (!event.defaultMuiPrevented) {
          (_a = handlerRef.current) == null ? void 0 : _a.call(handlerRef, params, event);
        }
      };
      subscription.current = instance.$$subscribeEvent(eventName, enhancedHandler);
      cleanupTokensCounter += 1;
      cleanupTokenRef.current = {
        cleanupToken: cleanupTokensCounter
      };
      registryContainer2.registry.register(
        objectRetainedByReact,
        // The callback below will be called once this reference stops being retained
        () => {
          var _a;
          (_a = subscription.current) == null ? void 0 : _a.call(subscription);
          subscription.current = null;
          cleanupTokenRef.current = null;
        },
        cleanupTokenRef.current
      );
    } else if (!handlerRef.current && subscription.current) {
      subscription.current();
      subscription.current = null;
      if (cleanupTokenRef.current) {
        registryContainer2.registry.unregister(cleanupTokenRef.current);
        cleanupTokenRef.current = null;
      }
    }
    React11.useEffect(() => {
      if (!subscription.current && handlerRef.current) {
        const enhancedHandler = (params, event) => {
          var _a;
          if (!event.defaultMuiPrevented) {
            (_a = handlerRef.current) == null ? void 0 : _a.call(handlerRef, params, event);
          }
        };
        subscription.current = instance.$$subscribeEvent(eventName, enhancedHandler);
      }
      if (cleanupTokenRef.current && registryContainer2.registry) {
        registryContainer2.registry.unregister(cleanupTokenRef.current);
        cleanupTokenRef.current = null;
      }
      return () => {
        var _a;
        (_a = subscription.current) == null ? void 0 : _a.call(subscription);
        subscription.current = null;
      };
    }, [instance, eventName]);
  };
}
var registryContainer = {
  registry: null
};
var useInstanceEventHandler = createUseInstanceEventHandler(registryContainer);

// node_modules/@mui/x-tree-view/internals/utils/utils.js
var getActiveElement = (root = document) => {
  const activeEl = root.activeElement;
  if (!activeEl) {
    return null;
  }
  if (activeEl.shadowRoot) {
    return getActiveElement(activeEl.shadowRoot);
  }
  return activeEl;
};

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewFocus/useTreeViewFocus.js
var useDefaultFocusableItemId = (instance, selectedItems) => {
  let tabbableItemId = convertSelectedItemsToArray(selectedItems).find((itemId) => {
    if (!instance.isItemNavigable(itemId)) {
      return false;
    }
    const itemMeta = instance.getItemMeta(itemId);
    return itemMeta && (itemMeta.parentId == null || instance.isItemExpanded(itemMeta.parentId));
  });
  if (tabbableItemId == null) {
    tabbableItemId = getFirstNavigableItem(instance);
  }
  return tabbableItemId;
};
var useTreeViewFocus = ({
  instance,
  params,
  state,
  setState,
  models,
  rootRef
}) => {
  const defaultFocusableItemId = useDefaultFocusableItemId(instance, models.selectedItems.value);
  const setFocusedItemId = useEventCallback_default((itemId) => {
    const cleanItemId = typeof itemId === "function" ? itemId(state.focusedItemId) : itemId;
    if (state.focusedItemId !== cleanItemId) {
      setState((prevState) => _extends({}, prevState, {
        focusedItemId: cleanItemId
      }));
    }
  });
  const isTreeViewFocused = React12.useCallback(() => !!rootRef.current && rootRef.current.contains(getActiveElement(ownerDocument(rootRef.current))), [rootRef]);
  const isItemFocused = React12.useCallback((itemId) => state.focusedItemId === itemId && isTreeViewFocused(), [state.focusedItemId, isTreeViewFocused]);
  const isItemVisible = (itemId) => {
    const itemMeta = instance.getItemMeta(itemId);
    return itemMeta && (itemMeta.parentId == null || instance.isItemExpanded(itemMeta.parentId));
  };
  const innerFocusItem = (event, itemId) => {
    const itemElement = instance.getItemDOMElement(itemId);
    if (itemElement) {
      itemElement.focus();
    }
    setFocusedItemId(itemId);
    if (params.onItemFocus) {
      params.onItemFocus(event, itemId);
    }
  };
  const focusItem = useEventCallback_default((event, itemId) => {
    if (isItemVisible(itemId)) {
      innerFocusItem(event, itemId);
    }
  });
  const removeFocusedItem = useEventCallback_default(() => {
    if (state.focusedItemId == null) {
      return;
    }
    const itemMeta = instance.getItemMeta(state.focusedItemId);
    if (itemMeta) {
      const itemElement = document.getElementById(instance.getTreeItemIdAttribute(state.focusedItemId, itemMeta.idAttribute));
      if (itemElement) {
        itemElement.blur();
      }
    }
    setFocusedItemId(null);
  });
  const canItemBeTabbed = (itemId) => itemId === defaultFocusableItemId;
  useInstanceEventHandler(instance, "removeItem", ({
    id
  }) => {
    if (state.focusedItemId === id) {
      innerFocusItem(null, defaultFocusableItemId);
    }
  });
  const createRootHandleFocus = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onFocus) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.target === event.currentTarget) {
      innerFocusItem(event, defaultFocusableItemId);
    }
  };
  return {
    getRootProps: (otherHandlers) => ({
      onFocus: createRootHandleFocus(otherHandlers)
    }),
    publicAPI: {
      focusItem
    },
    instance: {
      isItemFocused,
      canItemBeTabbed,
      focusItem,
      removeFocusedItem
    }
  };
};
useTreeViewFocus.getInitialState = () => ({
  focusedItemId: null
});
useTreeViewFocus.params = {
  onItemFocus: true
};

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewKeyboardNavigation/useTreeViewKeyboardNavigation.js
var React13 = __toESM(require_react());
function isPrintableCharacter(string) {
  return !!string && string.length === 1 && !!string.match(/\S/);
}
var useTreeViewKeyboardNavigation = ({
  instance,
  params,
  state
}) => {
  const isRtl = useRtl();
  const firstCharMap = React13.useRef({});
  const updateFirstCharMap = useEventCallback_default((callback) => {
    firstCharMap.current = callback(firstCharMap.current);
  });
  React13.useEffect(() => {
    if (instance.areItemUpdatesPrevented()) {
      return;
    }
    const newFirstCharMap = {};
    const processItem = (item) => {
      newFirstCharMap[item.id] = item.label.substring(0, 1).toLowerCase();
    };
    Object.values(state.items.itemMetaMap).forEach(processItem);
    firstCharMap.current = newFirstCharMap;
  }, [state.items.itemMetaMap, params.getItemId, instance]);
  const getFirstMatchingItem = (itemId, query) => {
    const cleanQuery = query.toLowerCase();
    const getNextItem = (itemIdToCheck) => {
      const nextItemId = getNextNavigableItem(instance, itemIdToCheck);
      if (nextItemId === null) {
        return getFirstNavigableItem(instance);
      }
      return nextItemId;
    };
    let matchingItemId = null;
    let currentItemId = getNextItem(itemId);
    const checkedItems = {};
    while (matchingItemId == null && !checkedItems[currentItemId]) {
      if (firstCharMap.current[currentItemId] === cleanQuery) {
        matchingItemId = currentItemId;
      } else {
        checkedItems[currentItemId] = true;
        currentItemId = getNextItem(currentItemId);
      }
    }
    return matchingItemId;
  };
  const canToggleItemSelection = (itemId) => !params.disableSelection && !instance.isItemDisabled(itemId);
  const canToggleItemExpansion = (itemId) => {
    return !instance.isItemDisabled(itemId) && instance.isItemExpandable(itemId);
  };
  const handleItemKeyDown = (event, itemId) => {
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.altKey || isTargetInDescendants(event.target, event.currentTarget)) {
      return;
    }
    const ctrlPressed = event.ctrlKey || event.metaKey;
    const key = event.key;
    switch (true) {
      case (key === " " && canToggleItemSelection(itemId)): {
        event.preventDefault();
        if (params.multiSelect && event.shiftKey) {
          instance.expandSelectionRange(event, itemId);
        } else {
          instance.selectItem({
            event,
            itemId,
            keepExistingSelection: params.multiSelect,
            shouldBeSelected: params.multiSelect ? void 0 : true
          });
        }
        break;
      }
      case key === "Enter": {
        if (hasPlugin(instance, useTreeViewLabel) && instance.isItemEditable(itemId) && !instance.isItemBeingEdited(itemId)) {
          instance.setEditedItemId(itemId);
        } else if (canToggleItemExpansion(itemId)) {
          instance.toggleItemExpansion(event, itemId);
          event.preventDefault();
        } else if (canToggleItemSelection(itemId)) {
          if (params.multiSelect) {
            event.preventDefault();
            instance.selectItem({
              event,
              itemId,
              keepExistingSelection: true
            });
          } else if (!instance.isItemSelected(itemId)) {
            instance.selectItem({
              event,
              itemId
            });
            event.preventDefault();
          }
        }
        break;
      }
      case key === "ArrowDown": {
        const nextItem = getNextNavigableItem(instance, itemId);
        if (nextItem) {
          event.preventDefault();
          instance.focusItem(event, nextItem);
          if (params.multiSelect && event.shiftKey && canToggleItemSelection(nextItem)) {
            instance.selectItemFromArrowNavigation(event, itemId, nextItem);
          }
        }
        break;
      }
      case key === "ArrowUp": {
        const previousItem = getPreviousNavigableItem(instance, itemId);
        if (previousItem) {
          event.preventDefault();
          instance.focusItem(event, previousItem);
          if (params.multiSelect && event.shiftKey && canToggleItemSelection(previousItem)) {
            instance.selectItemFromArrowNavigation(event, itemId, previousItem);
          }
        }
        break;
      }
      case (key === "ArrowRight" && !isRtl || key === "ArrowLeft" && isRtl): {
        if (instance.isItemExpanded(itemId)) {
          const nextItemId = getNextNavigableItem(instance, itemId);
          if (nextItemId) {
            instance.focusItem(event, nextItemId);
            event.preventDefault();
          }
        } else if (canToggleItemExpansion(itemId)) {
          instance.toggleItemExpansion(event, itemId);
          event.preventDefault();
        }
        break;
      }
      case (key === "ArrowLeft" && !isRtl || key === "ArrowRight" && isRtl): {
        if (canToggleItemExpansion(itemId) && instance.isItemExpanded(itemId)) {
          instance.toggleItemExpansion(event, itemId);
          event.preventDefault();
        } else {
          const parent = instance.getItemMeta(itemId).parentId;
          if (parent) {
            instance.focusItem(event, parent);
            event.preventDefault();
          }
        }
        break;
      }
      case key === "Home": {
        if (canToggleItemSelection(itemId) && params.multiSelect && ctrlPressed && event.shiftKey) {
          instance.selectRangeFromStartToItem(event, itemId);
        } else {
          instance.focusItem(event, getFirstNavigableItem(instance));
        }
        event.preventDefault();
        break;
      }
      case key === "End": {
        if (canToggleItemSelection(itemId) && params.multiSelect && ctrlPressed && event.shiftKey) {
          instance.selectRangeFromItemToEnd(event, itemId);
        } else {
          instance.focusItem(event, getLastNavigableItem(instance));
        }
        event.preventDefault();
        break;
      }
      case key === "*": {
        instance.expandAllSiblings(event, itemId);
        event.preventDefault();
        break;
      }
      case (key === "a" && ctrlPressed && params.multiSelect && !params.disableSelection): {
        instance.selectAllNavigableItems(event);
        event.preventDefault();
        break;
      }
      case (!ctrlPressed && !event.shiftKey && isPrintableCharacter(key)): {
        const matchingItem = getFirstMatchingItem(itemId, key);
        if (matchingItem != null) {
          instance.focusItem(event, matchingItem);
          event.preventDefault();
        }
        break;
      }
    }
  };
  return {
    instance: {
      updateFirstCharMap,
      handleItemKeyDown
    }
  };
};
useTreeViewKeyboardNavigation.params = {};

// node_modules/@mui/x-tree-view/internals/plugins/useTreeViewIcons/useTreeViewIcons.js
var useTreeViewIcons = ({
  slots,
  slotProps
}) => {
  return {
    contextValue: {
      icons: {
        slots: {
          collapseIcon: slots.collapseIcon,
          expandIcon: slots.expandIcon,
          endIcon: slots.endIcon
        },
        slotProps: {
          collapseIcon: slotProps.collapseIcon,
          expandIcon: slotProps.expandIcon,
          endIcon: slotProps.endIcon
        }
      }
    }
  };
};
useTreeViewIcons.params = {};

// node_modules/@mui/x-tree-view/RichTreeView/RichTreeView.plugins.js
var RICH_TREE_VIEW_PLUGINS = [useTreeViewItems, useTreeViewExpansion, useTreeViewSelection, useTreeViewFocus, useTreeViewKeyboardNavigation, useTreeViewIcons, useTreeViewLabel];

// node_modules/@mui/x-tree-view/RichTreeView/RichTreeView.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var useThemeProps = createUseThemeProps("MuiRichTreeView");
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getRichTreeViewUtilityClass, classes);
};
var RichTreeViewRoot = styled_default("ul", {
  name: "MuiRichTreeView",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  padding: 0,
  margin: 0,
  listStyle: "none",
  outline: 0,
  position: "relative"
});
function WrappedTreeItem({
  slots,
  slotProps,
  label,
  id,
  itemId,
  children
}) {
  const Item = (slots == null ? void 0 : slots.item) ?? TreeItem;
  const itemProps = useSlotProps_default({
    elementType: Item,
    externalSlotProps: slotProps == null ? void 0 : slotProps.item,
    additionalProps: {
      itemId,
      id,
      label
    },
    ownerState: {
      itemId,
      label
    }
  });
  return (0, import_jsx_runtime2.jsx)(Item, _extends({}, itemProps, {
    children
  }));
}
var RichTreeView = React14.forwardRef(function RichTreeView2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiRichTreeView"
  });
  if (true) {
    if (props.children != null) {
      warnOnce(["MUI X: The `RichTreeView` component does not support JSX children.", "If you want to add items, you need to use the `items` prop.", "Check the documentation for more details: https://mui.com/x/react-tree-view/rich-tree-view/items/."]);
    }
  }
  const {
    getRootProps,
    contextValue,
    instance
  } = useTreeView({
    plugins: RICH_TREE_VIEW_PLUGINS,
    rootRef: ref,
    props
  });
  const {
    slots,
    slotProps
  } = props;
  const classes = useUtilityClasses(props);
  const Root = (slots == null ? void 0 : slots.root) ?? RichTreeViewRoot;
  const rootProps = useSlotProps_default({
    elementType: Root,
    externalSlotProps: slotProps == null ? void 0 : slotProps.root,
    className: classes.root,
    getSlotProps: getRootProps,
    ownerState: props
  });
  const itemsToRender = instance.getItemsToRender();
  const renderItem = ({
    label,
    itemId,
    id,
    children
  }) => {
    return (0, import_jsx_runtime2.jsx)(WrappedTreeItem, {
      slots,
      slotProps,
      label,
      id,
      itemId,
      children: children == null ? void 0 : children.map(renderItem)
    }, itemId);
  };
  return (0, import_jsx_runtime2.jsx)(TreeViewProvider, {
    value: contextValue,
    children: (0, import_jsx_runtime2.jsx)(Root, _extends({}, rootProps, {
      children: itemsToRender.map(renderItem)
    }))
  });
});
true ? RichTreeView.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The ref object that allows Tree View manipulation. Can be instantiated with `useTreeViewApiRef()`.
   */
  apiRef: import_prop_types.default.shape({
    current: import_prop_types.default.shape({
      focusItem: import_prop_types.default.func.isRequired,
      getItem: import_prop_types.default.func.isRequired,
      getItemDOMElement: import_prop_types.default.func.isRequired,
      getItemOrderedChildrenIds: import_prop_types.default.func.isRequired,
      getItemTree: import_prop_types.default.func.isRequired,
      selectItem: import_prop_types.default.func.isRequired,
      setItemExpansion: import_prop_types.default.func.isRequired,
      updateItemLabel: import_prop_types.default.func.isRequired
    })
  }),
  /**
   * If `true`, the tree view renders a checkbox at the left of its label that allows selecting it.
   * @default false
   */
  checkboxSelection: import_prop_types.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  /**
   * Expanded item ids.
   * Used when the item's expansion is not controlled.
   * @default []
   */
  defaultExpandedItems: import_prop_types.default.arrayOf(import_prop_types.default.string),
  /**
   * Selected item ids. (Uncontrolled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   * @default []
   */
  defaultSelectedItems: import_prop_types.default.any,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: import_prop_types.default.bool,
  /**
   * If `true` selection is disabled.
   * @default false
   */
  disableSelection: import_prop_types.default.bool,
  /**
   * Expanded item ids.
   * Used when the item's expansion is controlled.
   */
  expandedItems: import_prop_types.default.arrayOf(import_prop_types.default.string),
  /**
   * The slot that triggers the item's expansion when clicked.
   * @default 'content'
   */
  expansionTrigger: import_prop_types.default.oneOf(["content", "iconContainer"]),
  /**
   * Unstable features, breaking changes might be introduced.
   * For each feature, if the flag is not explicitly set to `true`,
   * the feature will be fully disabled and any property / method call will not have any effect.
   */
  experimentalFeatures: import_prop_types.default.shape({
    indentationAtItemLevel: import_prop_types.default.bool,
    labelEditing: import_prop_types.default.bool
  }),
  /**
   * Used to determine the id of a given item.
   *
   * @template R
   * @param {R} item The item to check.
   * @returns {string} The id of the item.
   * @default (item) => item.id
   */
  getItemId: import_prop_types.default.func,
  /**
   * Used to determine the string label for a given item.
   *
   * @template R
   * @param {R} item The item to check.
   * @returns {string} The label of the item.
   * @default (item) => item.label
   */
  getItemLabel: import_prop_types.default.func,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: import_prop_types.default.string,
  /**
   * Used to determine if a given item should be disabled.
   * @template R
   * @param {R} item The item to check.
   * @returns {boolean} `true` if the item should be disabled.
   */
  isItemDisabled: import_prop_types.default.func,
  /**
   * Determines if a given item is editable or not.
   * Make sure to also enable the `labelEditing` experimental feature:
   * `<RichTreeViewPro experimentalFeatures={{ labelEditing: true }}  />`.
   * By default, the items are not editable.
   * @template R
   * @param {R} item The item to check.
   * @returns {boolean} `true` if the item is editable.
   */
  isItemEditable: import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.bool]),
  /**
   * Horizontal indentation between an item and its children.
   * Examples: 24, "24px", "2rem", "2em".
   * @default 12px
   */
  itemChildrenIndentation: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
  items: import_prop_types.default.array.isRequired,
  /**
   * If `true`, `ctrl` and `shift` will trigger multiselect.
   * @default false
   */
  multiSelect: import_prop_types.default.bool,
  /**
   * Callback fired when tree items are expanded/collapsed.
   * @param {React.SyntheticEvent} event The DOM event that triggered the change.
   * @param {array} itemIds The ids of the expanded items.
   */
  onExpandedItemsChange: import_prop_types.default.func,
  /**
   * Callback fired when the `content` slot of a given tree item is clicked.
   * @param {React.MouseEvent} event The DOM event that triggered the change.
   * @param {string} itemId The id of the focused item.
   */
  onItemClick: import_prop_types.default.func,
  /**
   * Callback fired when a tree item is expanded or collapsed.
   * @param {React.SyntheticEvent} event The DOM event that triggered the change.
   * @param {array} itemId The itemId of the modified item.
   * @param {array} isExpanded `true` if the item has just been expanded, `false` if it has just been collapsed.
   */
  onItemExpansionToggle: import_prop_types.default.func,
  /**
   * Callback fired when a given tree item is focused.
   * @param {React.SyntheticEvent | null} event The DOM event that triggered the change. **Warning**: This is a generic event not a focus event.
   * @param {string} itemId The id of the focused item.
   */
  onItemFocus: import_prop_types.default.func,
  /**
   * Callback fired when the label of an item changes.
   * @param {TreeViewItemId} itemId The id of the item that was edited.
   * @param {string} newLabel The new label of the items.
   */
  onItemLabelChange: import_prop_types.default.func,
  /**
   * Callback fired when a tree item is selected or deselected.
   * @param {React.SyntheticEvent} event The DOM event that triggered the change.
   * @param {array} itemId The itemId of the modified item.
   * @param {array} isSelected `true` if the item has just been selected, `false` if it has just been deselected.
   */
  onItemSelectionToggle: import_prop_types.default.func,
  /**
   * Callback fired when tree items are selected/deselected.
   * @param {React.SyntheticEvent} event The DOM event that triggered the change.
   * @param {string[] | string} itemIds The ids of the selected items.
   * When `multiSelect` is `true`, this is an array of strings; when false (default) a string.
   */
  onSelectedItemsChange: import_prop_types.default.func,
  /**
   * Selected item ids. (Controlled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selectedItems: import_prop_types.default.any,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
export {
  RICH_TREE_VIEW_PLUGINS,
  RichTreeView,
  RichTreeViewRoot,
  getRichTreeViewUtilityClass,
  richTreeViewClasses
};
//# sourceMappingURL=@mui_x-tree-view_RichTreeView.js.map
