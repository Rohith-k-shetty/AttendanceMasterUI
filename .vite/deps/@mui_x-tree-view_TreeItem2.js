import {
  useTreeItem2
} from "./chunk-GFYHA5ZP.js";
import {
  TreeItem2Icon
} from "./chunk-OITBNRVW.js";
import {
  TreeItem2DragAndDropOverlay,
  TreeItem2LabelInput,
  composeClasses,
  createUseThemeProps,
  getTreeItemUtilityClass,
  unsupportedProp
} from "./chunk-22PVOAFR.js";
import "./chunk-RV3KQOZD.js";
import {
  useSlotProps_default
} from "./chunk-KPGINETX.js";
import "./chunk-3LGQE7VV.js";
import {
  TreeItem2Provider
} from "./chunk-F6NTF4AV.js";
import "./chunk-TUAHXNDG.js";
import {
  Collapse_default
} from "./chunk-AJLZJXY7.js";
import "./chunk-WBJSZGCN.js";
import {
  Checkbox_default
} from "./chunk-FWXKAUXN.js";
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
  alpha,
  shouldForwardProp,
  styled_default2 as styled_default
} from "./chunk-Z2V24GCO.js";
import "./chunk-JSXDBQCN.js";
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

// node_modules/@mui/x-tree-view/TreeItem2/TreeItem2.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["visible"];
var _excluded2 = ["id", "itemId", "label", "disabled", "children", "slots", "slotProps"];
var useThemeProps = createUseThemeProps("MuiTreeItem2");
var TreeItem2Root = styled_default("li", {
  name: "MuiTreeItem2",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({
  listStyle: "none",
  margin: 0,
  padding: 0,
  outline: 0
});
var TreeItem2Content = styled_default("div", {
  name: "MuiTreeItem2",
  slot: "Content",
  overridesResolver: (props, styles) => styles.content,
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "status" && prop !== "indentationAtItemLevel"
})(({
  theme
}) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  boxSizing: "border-box",
  // prevent width + padding to overflow
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
  "&:hover": {
    backgroundColor: (theme.vars || theme).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    "@media (hover: none)": {
      backgroundColor: "transparent"
    }
  },
  variants: [{
    props: {
      indentationAtItemLevel: true
    },
    style: {
      paddingLeft: `calc(${theme.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`
    }
  }, {
    props: ({
      status
    }) => status.disabled,
    style: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
      backgroundColor: "transparent"
    }
  }, {
    props: ({
      status
    }) => status.focused,
    style: {
      backgroundColor: (theme.vars || theme).palette.action.focus
    }
  }, {
    props: ({
      status
    }) => status.selected,
    style: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      "&:hover": {
        backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        }
      }
    }
  }, {
    props: ({
      status
    }) => status.selected && status.focused,
    style: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  }]
}));
var TreeItem2Label = styled_default("div", {
  name: "MuiTreeItem2",
  slot: "Label",
  overridesResolver: (props, styles) => styles.label,
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "editable"
})(({
  theme
}) => _extends({
  width: "100%",
  boxSizing: "border-box",
  // prevent width + padding to overflow
  // fixes overflow - see https://github.com/mui/material-ui/issues/27372
  minWidth: 0,
  position: "relative",
  overflow: "hidden"
}, theme.typography.body1, {
  variants: [{
    props: ({
      editable
    }) => editable,
    style: {
      paddingLeft: "2px"
    }
  }]
}));
var TreeItem2IconContainer = styled_default("div", {
  name: "MuiTreeItem2",
  slot: "IconContainer",
  overridesResolver: (props, styles) => styles.iconContainer
})({
  width: 16,
  display: "flex",
  flexShrink: 0,
  justifyContent: "center",
  "& svg": {
    fontSize: 18
  }
});
var TreeItem2GroupTransition = styled_default(Collapse_default, {
  name: "MuiTreeItem2",
  slot: "GroupTransition",
  overridesResolver: (props, styles) => styles.groupTransition,
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== "indentationAtItemLevel"
})({
  margin: 0,
  padding: 0,
  paddingLeft: "var(--TreeView-itemChildrenIndentation)",
  variants: [{
    props: {
      indentationAtItemLevel: true
    },
    style: {
      paddingLeft: 0
    }
  }]
});
var TreeItem2Checkbox = styled_default(React.forwardRef((props, ref) => {
  const {
    visible
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  if (!visible) {
    return null;
  }
  return (0, import_jsx_runtime.jsx)(Checkbox_default, _extends({}, other, {
    ref
  }));
}), {
  name: "MuiTreeItem2",
  slot: "Checkbox",
  overridesResolver: (props, styles) => styles.checkbox
})({
  padding: 0
});
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    content: ["content"],
    expanded: ["expanded"],
    editing: ["editing"],
    editable: ["editable"],
    selected: ["selected"],
    focused: ["focused"],
    disabled: ["disabled"],
    iconContainer: ["iconContainer"],
    checkbox: ["checkbox"],
    label: ["label"],
    groupTransition: ["groupTransition"],
    labelInput: ["labelInput"],
    dragAndDropOverlay: ["dragAndDropOverlay"]
  };
  return composeClasses(slots, getTreeItemUtilityClass, classes);
};
var TreeItem2 = React.forwardRef(function TreeItem22(inProps, forwardedRef) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTreeItem2"
  });
  const {
    id,
    itemId,
    label,
    disabled,
    children,
    slots = {},
    slotProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getLabelInputProps,
    getDragAndDropOverlayProps,
    status
  } = useTreeItem2({
    id,
    itemId,
    children,
    label,
    disabled
  });
  const ownerState = _extends({}, props, status);
  const classes = useUtilityClasses(ownerState);
  const Root = slots.root ?? TreeItem2Root;
  const rootProps = useSlotProps_default({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState: {},
    className: classes.root
  });
  const Content = slots.content ?? TreeItem2Content;
  const contentProps = useSlotProps_default({
    elementType: Content,
    getSlotProps: getContentProps,
    externalSlotProps: slotProps.content,
    ownerState: {},
    className: clsx_default(classes.content, status.expanded && classes.expanded, status.selected && classes.selected, status.focused && classes.focused, status.disabled && classes.disabled, status.editing && classes.editing, status.editable && classes.editable)
  });
  const IconContainer = slots.iconContainer ?? TreeItem2IconContainer;
  const iconContainerProps = useSlotProps_default({
    elementType: IconContainer,
    getSlotProps: getIconContainerProps,
    externalSlotProps: slotProps.iconContainer,
    ownerState: {},
    className: classes.iconContainer
  });
  const Label = slots.label ?? TreeItem2Label;
  const labelProps = useSlotProps_default({
    elementType: Label,
    getSlotProps: getLabelProps,
    externalSlotProps: slotProps.label,
    ownerState: {},
    className: classes.label
  });
  const Checkbox = slots.checkbox ?? TreeItem2Checkbox;
  const checkboxProps = useSlotProps_default({
    elementType: Checkbox,
    getSlotProps: getCheckboxProps,
    externalSlotProps: slotProps.checkbox,
    ownerState: {},
    className: classes.checkbox
  });
  const GroupTransition = slots.groupTransition ?? void 0;
  const groupTransitionProps = useSlotProps_default({
    elementType: GroupTransition,
    getSlotProps: getGroupTransitionProps,
    externalSlotProps: slotProps.groupTransition,
    ownerState: {},
    className: classes.groupTransition
  });
  const LabelInput = slots.labelInput ?? TreeItem2LabelInput;
  const labelInputProps = useSlotProps_default({
    elementType: LabelInput,
    getSlotProps: getLabelInputProps,
    externalSlotProps: slotProps.labelInput,
    ownerState: {},
    className: classes.labelInput
  });
  const DragAndDropOverlay = slots.dragAndDropOverlay ?? TreeItem2DragAndDropOverlay;
  const dragAndDropOverlayProps = useSlotProps_default({
    elementType: DragAndDropOverlay,
    getSlotProps: getDragAndDropOverlayProps,
    externalSlotProps: slotProps.dragAndDropOverlay,
    ownerState: {},
    className: classes.dragAndDropOverlay
  });
  return (0, import_jsx_runtime.jsx)(TreeItem2Provider, {
    itemId,
    children: (0, import_jsx_runtime.jsxs)(Root, _extends({}, rootProps, {
      children: [(0, import_jsx_runtime.jsxs)(Content, _extends({}, contentProps, {
        children: [(0, import_jsx_runtime.jsx)(IconContainer, _extends({}, iconContainerProps, {
          children: (0, import_jsx_runtime.jsx)(TreeItem2Icon, {
            status,
            slots,
            slotProps
          })
        })), (0, import_jsx_runtime.jsx)(Checkbox, _extends({}, checkboxProps)), status.editing ? (0, import_jsx_runtime.jsx)(LabelInput, _extends({}, labelInputProps)) : (0, import_jsx_runtime.jsx)(Label, _extends({}, labelProps)), (0, import_jsx_runtime.jsx)(DragAndDropOverlay, _extends({}, dragAndDropOverlayProps))]
      })), children && (0, import_jsx_runtime.jsx)(TreeItem2GroupTransition, _extends({
        as: GroupTransition
      }, groupTransitionProps))]
    }))
  });
});
true ? TreeItem2.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  className: import_prop_types.default.string,
  /**
   * If `true`, the item is disabled.
   * @default false
   */
  disabled: import_prop_types.default.bool,
  /**
   * The id attribute of the item. If not provided, it will be generated.
   */
  id: import_prop_types.default.string,
  /**
   * The id of the item.
   * Must be unique.
   */
  itemId: import_prop_types.default.string.isRequired,
  /**
   * The label of the item.
   */
  label: import_prop_types.default.node,
  /**
   * Callback fired when the item root is blurred.
   */
  onBlur: import_prop_types.default.func,
  /**
   * This prop isn't supported.
   * Use the `onItemFocus` callback on the tree if you need to monitor an item's focus.
   */
  onFocus: unsupportedProp,
  /**
   * Callback fired when a key is pressed on the keyboard and the tree is in focus.
   */
  onKeyDown: import_prop_types.default.func,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: import_prop_types.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: import_prop_types.default.object
} : void 0;
export {
  TreeItem2,
  TreeItem2Checkbox,
  TreeItem2Content,
  TreeItem2GroupTransition,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root
};
//# sourceMappingURL=@mui_x-tree-view_TreeItem2.js.map
