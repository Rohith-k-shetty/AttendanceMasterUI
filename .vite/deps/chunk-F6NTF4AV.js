import {
  useTreeViewContext
} from "./chunk-TUAHXNDG.js";
import {
  require_prop_types
} from "./chunk-2WDQDCDP.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/x-tree-view/TreeItem2Provider/TreeItem2Provider.js
var import_prop_types = __toESM(require_prop_types());
function TreeItem2Provider(props) {
  const {
    children,
    itemId
  } = props;
  const {
    wrapItem,
    instance
  } = useTreeViewContext();
  return wrapItem({
    children,
    itemId,
    instance
  });
}
TreeItem2Provider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  children: import_prop_types.default.node,
  itemId: import_prop_types.default.string.isRequired
};

export {
  TreeItem2Provider
};
//# sourceMappingURL=chunk-F6NTF4AV.js.map
