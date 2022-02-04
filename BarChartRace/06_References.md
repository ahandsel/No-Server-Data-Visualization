# amCharts & Kintone References

Following are documentations refereed when creating the Bar Chart Race x Kintone customizations.

#### Kintone Events
- [Kintone Events - `app.record.index.show`](https://developer.kintone.io/hc/en-us/articles/212494758-Record-List-Event#events)
- [Get Record List Header Element - `kintone.app.getHeaderSpaceElement`](https://developer.kintone.io/hc/en-us/articles/213148937-Get-Record-List#getHeaderSpaceElement)

#### Kintone REST API
- [Kintone REST API Request - `kintone.api()`](https://developer.kintone.io/hc/en-us/articles/212494388/)
- [Get Records - `/k/v1/records`](https://developer.kintone.io/hc/en-us/articles/360019245194)
- [Get App ID - `kintone.app.getId()`](https://developer.kintone.io/hc/en-us/articles/212494438)
- [Get Record List Query - `kintone.app.getQueryCondition()`](https://developer.kintone.io/hc/en-us/articles/213148937/#getQueryCondition)

---

#### amCharts Getting Started Tutorials
- [amCharts `core.js` & `charts.js` CDN](https://www.amcharts.com/docs/v4/getting-started/basics/#CDN)
- [Working with JavaScript x amCharts](https://www.amcharts.com/docs/v4/getting-started/basics/#Working_with_JavaScript)

#### amCharts Animation
- [Animation & `animated.js`](https://www.amcharts.com/docs/v4/concepts/animations/)
- [series.`interpolationDuration`](https://www.amcharts.com/docs/v4/reference/component/#interpolationDuration_property)
- [valueAxis.`rangeChangeDuration`](https://www.amcharts.com/docs/v4/reference/component/#rangeChangeDuration_property) = stepDuration;

#### am4charts.XYChart
- [Anatomy of an XY Chart](https://www.amcharts.com/docs/v4/chart-types/xy-chart/)
- [XYChart Class](https://www.amcharts.com/docs/v4/reference/xychart/)

#### am4core.Label
- [Label Class](https://www.amcharts.com/docs/v4/reference/label/)
- [Placing labels anywhere on the chart](https://www.amcharts.com/docs/v4/tutorials/placing-labels-anywhere-on-the-chart/)
- [`chart.plotContainer.createChild(am4core.Label)`](https://www.amcharts.com/docs/v4/tutorials/adding-watermarks-to-charts/#Positioning)
- [`am4core.percent()`](https://www.amcharts.com/docs/v4/reference/percent/)
- [`horizontalCenter`](https://www.amcharts.com/docs/v4/reference/label/#horizontalCenter_property)
- [`verticalCenter`](https://www.amcharts.com/docs/v4/reference/label/#verticalCenter_property)
- [`dx`](https://www.amcharts.com/docs/v4/reference/label/#dx_property)

#### am4charts.CategoryAxis
- [CategoryAxis Class](https://www.amcharts.com/docs/v4/reference/categoryaxis/)
- [`categoryAxis.renderer`](https://www.amcharts.com/docs/v4/reference/categoryaxis/#renderer_property)
- [Axis General Concept](https://www.amcharts.com/docs/v4/concepts/axes/)
- [`categoryAxis.dataFields`](https://www.amcharts.com/docs/v4/reference/categoryaxis/#dataFields_property)
- [categoryAxis.`zoom`](https://www.amcharts.com/docs/v4/reference/categoryaxis/#zoom_method)
- [categoryAxis.`sortBySeries`](https://www.amcharts.com/docs/v4/reference/categoryaxis/#sortBySeries_property)

#### am4charts.ValueAxis
- [valueAxis Class](https://www.amcharts.com/docs/v4/reference/valueAxis/)

#### am4charts.ColumnSeries
- [ColumnSeries Class](https://www.amcharts.com/docs/v4/reference/columnseries/)
- `series.events.on('inited', function () {...}`
  - [`"inited"` Event Class Document](https://www.amcharts.com/docs/v4/reference/sprite/#inited_event)
  - [Example Usage](https://www.amcharts.com/docs/v4/tutorials/automatic-labels-over-map-polygons/#Populating_with_data)

#### am4charts.LabelBullet
- [LabelBullet Class](https://www.amcharts.com/docs/v4/reference/labelbullet/)

#### amCharts Coloring
- [Different column fill colors for positive and negative values](https://www.amcharts.com/docs/v4/tutorials/different-column-fill-colors-for-positive-and-negative-values/)
- [Colors, Gradients, Patterns](https://www.amcharts.com/docs/v4/concepts/colors/)

#### amCharts Data
- [chart.`invalidateRawData()`](https://www.amcharts.com/docs/v4/reference/component/#invalidateRawData_method)
- [Manipulating existing data points](https://www.amcharts.com/docs/v4/concepts/data/#Manipulating_existing_data_points)

#### amCharts Bar Chart Race
- [Bar chart race Demo](https://www.amcharts.com/demos/bar-chart-race/)

#### amCharts Extra Configurations
- [Modifying big number prefixes](https://www.amcharts.com/docs/v4/tutorials/modifying-big-number-prefixes/)
- [`chart.zoomOutButton`](https://www.amcharts.com/docs/v4/reference/xychart/#zoomOutButton_property)
  - [Configuring the zoom out button](https://www.amcharts.com/docs/v4/tutorials/configuring-the-zoom-out-button/)