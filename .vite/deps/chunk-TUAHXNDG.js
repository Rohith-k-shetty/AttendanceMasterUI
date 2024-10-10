import {
  require_jsx_runtime
} from "./chunk-RZSASJON.js";
import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/x-tree-view/internals/TreeViewProvider/TreeViewProvider.js
var React2 = __toESM(require_react());

// node_modules/@mui/x-tree-view/internals/TreeViewProvider/TreeViewContext.js
var React = __toESM(require_react());
var TreeViewContext = React.createContext(null);
if (true) {
  TreeViewContext.displayName = "TreeViewContext";
}

// node_modules/@mui/x-tree-view/internals/TreeViewProvider/TreeViewProvider.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
function TreeViewProvider(props) {
  const {
    value,
    children
  } = props;
  return (0, import_jsx_runtime.jsx)(TreeViewContext.Provider, {
    value,
    children: value.wrapRoot({
      children
    })
  });
}

// node_modules/@mui/x-tree-view/internals/TreeViewProvider/useTreeViewContext.js
var React3 = __toESM(require_react());
var useTreeViewContext = () => {
  const context = React3.useContext(TreeViewContext);
  if (context == null) {
    throw new Error(["MUI X: Could not find the Tree View context.", "It looks like you rendered your component outside of a SimpleTreeView or RichTreeView parent component.", "This can also happen if you are bundling multiple versions of the Tree View."].join("\n"));
  }
  return context;
};

export {
  TreeViewProvider,
  useTreeViewContext
};
//# sourceMappingURL=chunk-TUAHXNDG.js.map
