import {
  SvgIcon_default
} from "./chunk-EFJNQFAP.js";
import {
  require_jsx_runtime
} from "./chunk-RZSASJON.js";
import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/material/utils/createSvgIcon.js
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return (0, import_jsx_runtime.jsx)(SvgIcon_default, {
      "data-testid": `${displayName}Icon`,
      ref,
      ...props,
      children: path
    });
  }
  if (true) {
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon_default.muiName;
  return React.memo(React.forwardRef(Component));
}

export {
  createSvgIcon
};
//# sourceMappingURL=chunk-HEWQV6CC.js.map
