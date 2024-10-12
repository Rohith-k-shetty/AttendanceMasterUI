import {
  TreeViewItemDepthContext,
  hasPlugin,
  isTargetInDescendants,
  useTreeViewLabel
} from "./chunk-RV3KQOZD.js";
import {
  extractEventHandlers_default,
  useForkRef
} from "./chunk-3LGQE7VV.js";
import {
  useTreeViewContext
} from "./chunk-TUAHXNDG.js";
import {
  _extends
} from "./chunk-HQ6ZTAWL.js";
import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/x-tree-view/useTreeItem2/useTreeItem2.js
var React = __toESM(require_react());

// node_modules/@mui/x-tree-view/hooks/useTreeItem2Utils/useTreeItem2Utils.js
var isItemExpandable = (reactChildren) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isItemExpandable);
  }
  return Boolean(reactChildren);
};
var useTreeItem2Utils = ({
  itemId,
  children
}) => {
  const {
    instance,
    selection: {
      multiSelect
    }
  } = useTreeViewContext();
  const status = {
    expandable: isItemExpandable(children),
    expanded: instance.isItemExpanded(itemId),
    focused: instance.isItemFocused(itemId),
    selected: instance.isItemSelected(itemId),
    disabled: instance.isItemDisabled(itemId),
    editing: (instance == null ? void 0 : instance.isItemBeingEdited) ? instance == null ? void 0 : instance.isItemBeingEdited(itemId) : false,
    editable: instance.isItemEditable ? instance.isItemEditable(itemId) : false
  };
  const handleExpansion = (event) => {
    if (status.disabled) {
      return;
    }
    if (!status.focused) {
      instance.focusItem(event, itemId);
    }
    const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);
    if (status.expandable && !(multiple && instance.isItemExpanded(itemId))) {
      instance.toggleItemExpansion(event, itemId);
    }
  };
  const handleSelection = (event) => {
    if (status.disabled) {
      return;
    }
    if (!status.focused) {
      instance.focusItem(event, itemId);
    }
    const multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);
    if (multiple) {
      if (event.shiftKey) {
        instance.expandSelectionRange(event, itemId);
      } else {
        instance.selectItem({
          event,
          itemId,
          keepExistingSelection: true
        });
      }
    } else {
      instance.selectItem({
        event,
        itemId,
        shouldBeSelected: true
      });
    }
  };
  const handleCheckboxSelection = (event) => {
    const hasShift = event.nativeEvent.shiftKey;
    if (multiSelect && hasShift) {
      instance.expandSelectionRange(event, itemId);
    } else {
      instance.selectItem({
        event,
        itemId,
        keepExistingSelection: multiSelect,
        shouldBeSelected: event.target.checked
      });
    }
  };
  const toggleItemEditing = () => {
    if (!hasPlugin(instance, useTreeViewLabel)) {
      return;
    }
    if (instance.isItemEditable(itemId)) {
      if (instance.isItemBeingEdited(itemId)) {
        instance.setEditedItemId(null);
      } else {
        instance.setEditedItemId(itemId);
      }
    }
  };
  const handleSaveItemLabel = (event, label) => {
    if (!hasPlugin(instance, useTreeViewLabel)) {
      return;
    }
    if (instance.isItemBeingEditedRef(itemId)) {
      instance.updateItemLabel(itemId, label);
      toggleItemEditing();
      instance.focusItem(event, itemId);
    }
  };
  const handleCancelItemLabelEditing = (event) => {
    if (!hasPlugin(instance, useTreeViewLabel)) {
      return;
    }
    if (instance.isItemBeingEditedRef(itemId)) {
      toggleItemEditing();
      instance.focusItem(event, itemId);
    }
  };
  const interactions = {
    handleExpansion,
    handleSelection,
    handleCheckboxSelection,
    toggleItemEditing,
    handleSaveItemLabel,
    handleCancelItemLabelEditing
  };
  return {
    interactions,
    status
  };
};

// node_modules/@mui/x-tree-view/useTreeItem2/useTreeItem2.js
var useTreeItem2 = (parameters) => {
  const {
    runItemPlugins,
    items: {
      onItemClick,
      disabledItemsFocusable,
      indentationAtItemLevel
    },
    selection: {
      multiSelect,
      disableSelection,
      checkboxSelection
    },
    expansion: {
      expansionTrigger
    },
    instance,
    publicAPI
  } = useTreeViewContext();
  const depthContext = React.useContext(TreeViewItemDepthContext);
  const {
    id,
    itemId,
    label,
    children,
    rootRef
  } = parameters;
  const {
    rootRef: pluginRootRef,
    contentRef,
    propsEnhancers
  } = runItemPlugins(parameters);
  const {
    interactions,
    status
  } = useTreeItem2Utils({
    itemId,
    children
  });
  const rootRefObject = React.useRef(null);
  const contentRefObject = React.useRef(null);
  const idAttribute = instance.getTreeItemIdAttribute(itemId, id);
  const handleRootRef = useForkRef(rootRef, pluginRootRef, rootRefObject);
  const handleContentRef = useForkRef(contentRef, contentRefObject);
  const checkboxRef = React.useRef(null);
  const rootTabIndex = instance.canItemBeTabbed(itemId) ? 0 : -1;
  const sharedPropsEnhancerParams = {
    rootRefObject,
    contentRefObject,
    interactions
  };
  const createRootHandleFocus = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onFocus) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    const canBeFocused = !status.disabled || disabledItemsFocusable;
    if (!status.focused && canBeFocused && event.currentTarget === event.target) {
      instance.focusItem(event, itemId);
    }
  };
  const createRootHandleBlur = (otherHandlers) => (event) => {
    var _a, _b, _c, _d, _e;
    (_a = otherHandlers.onBlur) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    const rootElement = instance.getItemDOMElement(itemId);
    if (status.editing || // we can exit the editing state by clicking outside the input (within the tree item) or by pressing Enter or Escape -> we don't want to remove the focused item from the state in these cases
    // we can also exit the editing state by clicking on the root itself -> want to remove the focused item from the state in this case
    event.relatedTarget && isTargetInDescendants(event.relatedTarget, rootElement) && (event.target && ((_c = (_b = event.target) == null ? void 0 : _b.dataset) == null ? void 0 : _c.element) === "labelInput" && isTargetInDescendants(event.target, rootElement) || ((_e = (_d = event.relatedTarget) == null ? void 0 : _d.dataset) == null ? void 0 : _e.element) === "labelInput")) {
      return;
    }
    instance.removeFocusedItem();
  };
  const createRootHandleKeyDown = (otherHandlers) => (event) => {
    var _a, _b, _c;
    (_a = otherHandlers.onKeyDown) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented || ((_c = (_b = event.target) == null ? void 0 : _b.dataset) == null ? void 0 : _c.element) === "labelInput") {
      return;
    }
    instance.handleItemKeyDown(event, itemId);
  };
  const createLabelHandleDoubleClick = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onDoubleClick) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    interactions.toggleItemEditing();
  };
  const createContentHandleClick = (otherHandlers) => (event) => {
    var _a, _b;
    (_a = otherHandlers.onClick) == null ? void 0 : _a.call(otherHandlers, event);
    onItemClick == null ? void 0 : onItemClick(event, itemId);
    if (event.defaultMuiPrevented || ((_b = checkboxRef.current) == null ? void 0 : _b.contains(event.target))) {
      return;
    }
    if (expansionTrigger === "content") {
      interactions.handleExpansion(event);
    }
    if (!checkboxSelection) {
      interactions.handleSelection(event);
    }
  };
  const createContentHandleMouseDown = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onMouseDown) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (event.shiftKey || event.ctrlKey || event.metaKey || status.disabled) {
      event.preventDefault();
    }
  };
  const createCheckboxHandleChange = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onChange) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (disableSelection || status.disabled) {
      return;
    }
    interactions.handleCheckboxSelection(event);
  };
  const createIconContainerHandleClick = (otherHandlers) => (event) => {
    var _a;
    (_a = otherHandlers.onClick) == null ? void 0 : _a.call(otherHandlers, event);
    if (event.defaultMuiPrevented) {
      return;
    }
    if (expansionTrigger === "iconContainer") {
      interactions.handleExpansion(event);
    }
  };
  const getRootProps = (externalProps = {}) => {
    var _a;
    const externalEventHandlers = _extends({}, extractEventHandlers_default(parameters), extractEventHandlers_default(externalProps));
    let ariaSelected;
    if (multiSelect) {
      ariaSelected = status.selected;
    } else if (status.selected) {
      ariaSelected = true;
    }
    const props = _extends({}, externalEventHandlers, {
      ref: handleRootRef,
      role: "treeitem",
      tabIndex: rootTabIndex,
      id: idAttribute,
      "aria-expanded": status.expandable ? status.expanded : void 0,
      "aria-selected": ariaSelected,
      "aria-disabled": status.disabled || void 0
    }, externalProps, {
      onFocus: createRootHandleFocus(externalEventHandlers),
      onBlur: createRootHandleBlur(externalEventHandlers),
      onKeyDown: createRootHandleKeyDown(externalEventHandlers)
    });
    if (indentationAtItemLevel) {
      props.style = {
        "--TreeView-itemDepth": typeof depthContext === "function" ? depthContext(itemId) : depthContext
      };
    }
    const enhancedRootProps = ((_a = propsEnhancers.root) == null ? void 0 : _a.call(propsEnhancers, _extends({}, sharedPropsEnhancerParams, {
      externalEventHandlers
    }))) ?? {};
    return _extends({}, props, enhancedRootProps);
  };
  const getContentProps = (externalProps = {}) => {
    var _a;
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    const props = _extends({}, externalEventHandlers, externalProps, {
      ref: handleContentRef,
      onClick: createContentHandleClick(externalEventHandlers),
      onMouseDown: createContentHandleMouseDown(externalEventHandlers),
      status
    });
    if (indentationAtItemLevel) {
      props.indentationAtItemLevel = true;
    }
    const enhancedContentProps = ((_a = propsEnhancers.content) == null ? void 0 : _a.call(propsEnhancers, _extends({}, sharedPropsEnhancerParams, {
      externalEventHandlers
    }))) ?? {};
    return _extends({}, props, enhancedContentProps);
  };
  const getCheckboxProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    return _extends({}, externalEventHandlers, {
      visible: checkboxSelection,
      ref: checkboxRef,
      checked: status.selected,
      disabled: disableSelection || status.disabled,
      tabIndex: -1
    }, externalProps, {
      onChange: createCheckboxHandleChange(externalEventHandlers)
    });
  };
  const getLabelProps = (externalProps = {}) => {
    const externalEventHandlers = _extends({}, extractEventHandlers_default(externalProps));
    const props = _extends({}, externalEventHandlers, {
      children: label
    }, externalProps, {
      onDoubleClick: createLabelHandleDoubleClick(externalEventHandlers)
    });
    if (instance.isTreeViewEditable) {
      props.editable = status.editable;
    }
    return props;
  };
  const getLabelInputProps = (externalProps = {}) => {
    var _a;
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    const enhancedLabelInputProps = ((_a = propsEnhancers.labelInput) == null ? void 0 : _a.call(propsEnhancers, {
      rootRefObject,
      contentRefObject,
      externalEventHandlers,
      interactions
    })) ?? {};
    return _extends({}, externalProps, enhancedLabelInputProps);
  };
  const getIconContainerProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    return _extends({}, externalEventHandlers, externalProps, {
      onClick: createIconContainerHandleClick(externalEventHandlers)
    });
  };
  const getGroupTransitionProps = (externalProps = {}) => {
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    const response = _extends({}, externalEventHandlers, {
      unmountOnExit: true,
      component: "ul",
      role: "group",
      in: status.expanded,
      children
    }, externalProps);
    if (indentationAtItemLevel) {
      response.indentationAtItemLevel = true;
    }
    return response;
  };
  const getDragAndDropOverlayProps = (externalProps = {}) => {
    var _a;
    const externalEventHandlers = extractEventHandlers_default(externalProps);
    const enhancedDragAndDropOverlayProps = ((_a = propsEnhancers.dragAndDropOverlay) == null ? void 0 : _a.call(propsEnhancers, _extends({}, sharedPropsEnhancerParams, {
      externalEventHandlers
    }))) ?? {};
    return _extends({}, externalProps, enhancedDragAndDropOverlayProps);
  };
  return {
    getRootProps,
    getContentProps,
    getGroupTransitionProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getLabelInputProps,
    getDragAndDropOverlayProps,
    rootRef: handleRootRef,
    status,
    publicAPI
  };
};

// node_modules/@mui/x-tree-view/useTreeItem2/index.js
var useTreeItem22 = useTreeItem2;
var unstable_useTreeItem2 = useTreeItem2;

export {
  useTreeItem22 as useTreeItem2,
  unstable_useTreeItem2
};
//# sourceMappingURL=chunk-GFYHA5ZP.js.map
