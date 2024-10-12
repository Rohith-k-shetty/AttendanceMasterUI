import {
  BarPlot
} from "./chunk-N4LPYI67.js";
import {
  AreaPlot,
  LineHighlightPlot,
  LinePlot
} from "./chunk-V5ITBAVO.js";
import {
  ChartsAxisHighlight,
  ChartsTooltip,
  ResponsiveChartContainer
} from "./chunk-D2PLHPB6.js";
import {
  DEFAULT_X_AXIS_KEY
} from "./chunk-AGGTGJ5Q.js";
import {
  _objectWithoutPropertiesLoose
} from "./chunk-PF2VR3Y5.js";
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

// node_modules/@mui/x-charts/SparkLineChart/SparkLineChart.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["xAxis", "yAxis", "width", "height", "margin", "colors", "sx", "showTooltip", "tooltip", "showHighlight", "axisHighlight", "children", "slots", "slotProps", "data", "plotType", "valueFormatter", "area", "curve", "className"];
var SPARKLINE_DEFAULT_MARGIN = {
  top: 5,
  bottom: 5,
  left: 5,
  right: 5
};
var SparkLineChart = React.forwardRef(function SparkLineChart2(props, ref) {
  const {
    xAxis,
    yAxis,
    width,
    height,
    margin = SPARKLINE_DEFAULT_MARGIN,
    colors,
    sx,
    showTooltip,
    tooltip,
    showHighlight,
    axisHighlight: inAxisHighlight,
    children,
    slots,
    slotProps,
    data,
    plotType = "line",
    valueFormatter = (value) => value === null ? "" : value.toString(),
    area,
    curve = "linear",
    className
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const defaultXHighlight = showHighlight && plotType === "bar" ? {
    x: "band"
  } : {
    x: "none"
  };
  const axisHighlight = _extends({}, defaultXHighlight, inAxisHighlight);
  return (0, import_jsx_runtime.jsxs)(ResponsiveChartContainer, _extends({}, other, {
    ref,
    series: [_extends({
      type: plotType,
      data,
      valueFormatter
    }, plotType === "bar" ? {} : {
      area,
      curve,
      disableHighlight: !showHighlight
    })],
    width,
    height,
    margin,
    className,
    xAxis: [_extends({
      id: DEFAULT_X_AXIS_KEY,
      scaleType: plotType === "bar" ? "band" : "point",
      data: Array.from({
        length: data.length
      }, (_, index) => index),
      hideTooltip: xAxis === void 0
    }, xAxis)],
    yAxis: [_extends({
      id: DEFAULT_X_AXIS_KEY
    }, yAxis)],
    colors,
    sx,
    disableAxisListener: (!showTooltip || (tooltip == null ? void 0 : tooltip.trigger) !== "axis") && (axisHighlight == null ? void 0 : axisHighlight.x) === "none" && (axisHighlight == null ? void 0 : axisHighlight.y) === "none",
    children: [plotType === "bar" && (0, import_jsx_runtime.jsx)(BarPlot, {
      skipAnimation: true,
      slots,
      slotProps,
      sx: {
        shapeRendering: "auto"
      }
    }), plotType === "line" && (0, import_jsx_runtime.jsxs)(React.Fragment, {
      children: [(0, import_jsx_runtime.jsx)(AreaPlot, {
        skipAnimation: true,
        slots,
        slotProps
      }), (0, import_jsx_runtime.jsx)(LinePlot, {
        skipAnimation: true,
        slots,
        slotProps
      }), (0, import_jsx_runtime.jsx)(LineHighlightPlot, {
        slots,
        slotProps
      })]
    }), (0, import_jsx_runtime.jsx)(ChartsAxisHighlight, _extends({}, axisHighlight)), showTooltip && (0, import_jsx_runtime.jsx)(ChartsTooltip, _extends({}, tooltip, {
      slotProps,
      slots
    })), children]
  }));
});
true ? SparkLineChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Set to `true` to fill spark line area.
   * Has no effect if plotType='bar'.
   * @default false
   */
  area: import_prop_types.default.bool,
  axisHighlight: import_prop_types.default.shape({
    x: import_prop_types.default.oneOf(["band", "line", "none"]),
    y: import_prop_types.default.oneOf(["band", "line", "none"])
  }),
  children: import_prop_types.default.node,
  className: import_prop_types.default.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.string), import_prop_types.default.func]),
  /**
   * @default 'linear'
   */
  curve: import_prop_types.default.oneOf(["catmullRom", "linear", "monotoneX", "monotoneY", "natural", "step", "stepAfter", "stepBefore"]),
  /**
   * Data to plot.
   */
  data: import_prop_types.default.arrayOf(import_prop_types.default.number).isRequired,
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: import_prop_types.default.arrayOf(import_prop_types.default.object),
  desc: import_prop_types.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: import_prop_types.default.bool,
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   */
  height: import_prop_types.default.number,
  /**
   * The item currently highlighted. Turns highlighting into a controlled prop.
   */
  highlightedItem: import_prop_types.default.shape({
    dataIndex: import_prop_types.default.number,
    seriesId: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])
  }),
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default {
   *   top: 5,
   *   bottom: 5,
   *   left: 5,
   *   right: 5,
   * }
   */
  margin: import_prop_types.default.shape({
    bottom: import_prop_types.default.number,
    left: import_prop_types.default.number,
    right: import_prop_types.default.number,
    top: import_prop_types.default.number
  }),
  /**
   * The callback fired when the highlighted item changes.
   *
   * @param {HighlightItemData | null} highlightedItem  The newly highlighted item.
   */
  onHighlightChange: import_prop_types.default.func,
  /**
   * Type of plot used.
   * @default 'line'
   */
  plotType: import_prop_types.default.oneOf(["bar", "line"]),
  /**
   * The chart will try to wait for the parent container to resolve its size
   * before it renders for the first time.
   *
   * This can be useful in some scenarios where the chart appear to grow after
   * the first render, like when used inside a grid.
   *
   * @default false
   */
  resolveSizeBeforeRender: import_prop_types.default.bool,
  /**
   * Set to `true` to highlight the value.
   * With line, it shows a point.
   * With bar, it shows a highlight band.
   * @default false
   */
  showHighlight: import_prop_types.default.bool,
  /**
   * Set to `true` to enable the tooltip in the sparkline.
   * @default false
   */
  showTooltip: import_prop_types.default.bool,
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
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  title: import_prop_types.default.string,
  tooltip: import_prop_types.default.shape({
    axisContent: import_prop_types.default.elementType,
    classes: import_prop_types.default.object,
    itemContent: import_prop_types.default.elementType,
    slotProps: import_prop_types.default.object,
    slots: import_prop_types.default.object,
    trigger: import_prop_types.default.oneOf(["axis", "item", "none"])
  }),
  /**
   * Formatter used by the tooltip.
   * @param {number} value The value to format.
   * @returns {string} the formatted value.
   * @default (value: number | null) => (value === null ? '' : value.toString())
   */
  valueFormatter: import_prop_types.default.func,
  viewBox: import_prop_types.default.shape({
    height: import_prop_types.default.number,
    width: import_prop_types.default.number,
    x: import_prop_types.default.number,
    y: import_prop_types.default.number
  }),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   */
  width: import_prop_types.default.number,
  /**
   * The xAxis configuration.
   * Notice it is a single [[AxisConfig]] object, not an array of configuration.
   */
  xAxis: import_prop_types.default.shape({
    classes: import_prop_types.default.object,
    colorMap: import_prop_types.default.oneOfType([import_prop_types.default.shape({
      colors: import_prop_types.default.arrayOf(import_prop_types.default.string).isRequired,
      type: import_prop_types.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types.default.string,
      values: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number, import_prop_types.default.string]).isRequired)
    }), import_prop_types.default.shape({
      color: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.string.isRequired), import_prop_types.default.func]).isRequired,
      max: import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]),
      min: import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]),
      type: import_prop_types.default.oneOf(["continuous"]).isRequired
    }), import_prop_types.default.shape({
      colors: import_prop_types.default.arrayOf(import_prop_types.default.string).isRequired,
      thresholds: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]).isRequired).isRequired,
      type: import_prop_types.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types.default.array,
    dataKey: import_prop_types.default.string,
    disableLine: import_prop_types.default.bool,
    disableTicks: import_prop_types.default.bool,
    fill: import_prop_types.default.string,
    hideTooltip: import_prop_types.default.bool,
    id: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
    label: import_prop_types.default.string,
    labelFontSize: import_prop_types.default.number,
    labelStyle: import_prop_types.default.object,
    max: import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]),
    min: import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]),
    position: import_prop_types.default.oneOf(["bottom", "top"]),
    reverse: import_prop_types.default.bool,
    scaleType: import_prop_types.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types.default.object,
    slots: import_prop_types.default.object,
    stroke: import_prop_types.default.string,
    sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
    tickFontSize: import_prop_types.default.number,
    tickInterval: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["auto"]), import_prop_types.default.array, import_prop_types.default.func]),
    tickLabelInterval: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["auto"]), import_prop_types.default.func]),
    tickLabelPlacement: import_prop_types.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types.default.object,
    tickMaxStep: import_prop_types.default.number,
    tickMinStep: import_prop_types.default.number,
    tickNumber: import_prop_types.default.number,
    tickPlacement: import_prop_types.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types.default.number,
    valueFormatter: import_prop_types.default.func
  }),
  /**
   * The yAxis configuration.
   * Notice it is a single [[AxisConfig]] object, not an array of configuration.
   */
  yAxis: import_prop_types.default.shape({
    classes: import_prop_types.default.object,
    colorMap: import_prop_types.default.oneOfType([import_prop_types.default.shape({
      colors: import_prop_types.default.arrayOf(import_prop_types.default.string).isRequired,
      type: import_prop_types.default.oneOf(["ordinal"]).isRequired,
      unknownColor: import_prop_types.default.string,
      values: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number, import_prop_types.default.string]).isRequired)
    }), import_prop_types.default.shape({
      color: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.string.isRequired), import_prop_types.default.func]).isRequired,
      max: import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]),
      min: import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]),
      type: import_prop_types.default.oneOf(["continuous"]).isRequired
    }), import_prop_types.default.shape({
      colors: import_prop_types.default.arrayOf(import_prop_types.default.string).isRequired,
      thresholds: import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]).isRequired).isRequired,
      type: import_prop_types.default.oneOf(["piecewise"]).isRequired
    })]),
    data: import_prop_types.default.array,
    dataKey: import_prop_types.default.string,
    disableLine: import_prop_types.default.bool,
    disableTicks: import_prop_types.default.bool,
    fill: import_prop_types.default.string,
    hideTooltip: import_prop_types.default.bool,
    id: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
    label: import_prop_types.default.string,
    labelFontSize: import_prop_types.default.number,
    labelStyle: import_prop_types.default.object,
    max: import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]),
    min: import_prop_types.default.oneOfType([import_prop_types.default.instanceOf(Date), import_prop_types.default.number]),
    position: import_prop_types.default.oneOf(["left", "right"]),
    reverse: import_prop_types.default.bool,
    scaleType: import_prop_types.default.oneOf(["band", "linear", "log", "point", "pow", "sqrt", "time", "utc"]),
    slotProps: import_prop_types.default.object,
    slots: import_prop_types.default.object,
    stroke: import_prop_types.default.string,
    sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
    tickFontSize: import_prop_types.default.number,
    tickInterval: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["auto"]), import_prop_types.default.array, import_prop_types.default.func]),
    tickLabelInterval: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["auto"]), import_prop_types.default.func]),
    tickLabelPlacement: import_prop_types.default.oneOf(["middle", "tick"]),
    tickLabelStyle: import_prop_types.default.object,
    tickMaxStep: import_prop_types.default.number,
    tickMinStep: import_prop_types.default.number,
    tickNumber: import_prop_types.default.number,
    tickPlacement: import_prop_types.default.oneOf(["end", "extremities", "middle", "start"]),
    tickSize: import_prop_types.default.number,
    valueFormatter: import_prop_types.default.func
  })
} : void 0;

export {
  SparkLineChart
};
//# sourceMappingURL=chunk-UJB5AKUP.js.map
