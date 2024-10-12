import {
  TreeViewCollapseIcon,
  TreeViewExpandIcon,
  resolveComponentProps_default,
  useSlotProps_default
} from "./chunk-KPGINETX.js";
import {
  useTreeViewContext
} from "./chunk-TUAHXNDG.js";
import {
  require_jsx_runtime
} from "./chunk-RZSASJON.js";
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

// node_modules/@mui/x-tree-view/TreeItem2Icon/TreeItem2Icon.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function TreeItem2Icon(props) {
  const {
    slots,
    slotProps,
    status
  } = props;
  const context = useTreeViewContext();
  const contextIcons = _extends({}, context.icons.slots, {
    expandIcon: context.icons.slots.expandIcon ?? TreeViewExpandIcon,
    collapseIcon: context.icons.slots.collapseIcon ?? TreeViewCollapseIcon
  });
  const contextIconProps = context.icons.slotProps;
  let iconName;
  if (slots == null ? void 0 : slots.icon) {
    iconName = "icon";
  } else if (status.expandable) {
    if (status.expanded) {
      iconName = "collapseIcon";
    } else {
      iconName = "expandIcon";
    }
  } else {
    iconName = "endIcon";
  }
  const Icon = (slots == null ? void 0 : slots[iconName]) ?? contextIcons[iconName];
  const iconProps = useSlotProps_default({
    elementType: Icon,
    externalSlotProps: (tempOwnerState) => _extends({}, resolveComponentProps_default(contextIconProps[iconName], tempOwnerState), resolveComponentProps_default(slotProps == null ? void 0 : slotProps[iconName], tempOwnerState)),
    // TODO: Add proper ownerState
    ownerState: {}
  });
  if (!Icon) {
    return null;
  }
  return (0, import_jsx_runtime.jsx)(Icon, _extends({}, iconProps));
}
true ? TreeItem2Icon.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
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
  status: import_prop_types.default.shape({
    disabled: import_prop_types.default.bool.isRequired,
    editable: import_prop_types.default.bool.isRequired,
    editing: import_prop_types.default.bool.isRequired,
    expandable: import_prop_types.default.bool.isRequired,
    expanded: import_prop_types.default.bool.isRequired,
    focused: import_prop_types.default.bool.isRequired,
    selected: import_prop_types.default.bool.isRequired
  }).isRequired
} : void 0;

export {
  TreeItem2Icon
};
//# sourceMappingURL=chunk-OITBNRVW.js.map
