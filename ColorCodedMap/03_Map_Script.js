(function () {
  'use strict';

  // Kintone event triggered after the record list page is displayed.
  kintone.events.on('app.record.index.show', function (event) {

    // Retrieve & configure the space element below the record list's header
    var spaceDiv = kintone.app.getHeaderSpaceElement();
    spaceDiv.style.height = '500px';
    spaceDiv.style.marginLeft = '25px';
    spaceDiv.style.marginRight = '25px';
    spaceDiv.style.border = 'solid';
    spaceDiv.style.borderColor = '#ED7B84';

    // Apply amCharts Themes for automatic animation
    am4core.useTheme(am4themes_animated);

    // Create map instance
    var chart = am4core.create(spaceDiv, am4maps.MapChart);
    // Set map definition
    chart.geodata = am4geodata_worldLow;
    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    // Exclude Antarctica
    polygonSeries.exclude = ['AQ'];
    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    polygonSeries.calculateVisualCenter = true;
    polygonSeries.mapPolygons.template.tooltipPosition = 'fixed';

    //Set min & max fill color
    polygonSeries.heatRules.push({
      'property': 'fill',
      'target': polygonSeries.mapPolygons.template,
      'min': am4core.color('#e5f5e0'),
      'max': am4core.color('#31a354'),
      'logarithmic': true
    });

    // Set tooltip with data to be displayed when hovered over
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}: ${value}';

    // Create JSON object from Kintone records & pass it onto amCharts
    var polygonData = event.records.map(function (record) {
      return {
        // Country Code default field code = Text_0
        // Prize Money per Player default field code = Number_1
        'id': record.Text_0.value.toUpperCase(),
        'value': Number(record.Number_1.value)
      }
    });
    polygonSeries.data = polygonData;

    // - - - - - Extra Functionality - - - - -
    // Enable export
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = 'left';
    chart.exporting.menu.verticalAlign = 'top';
    chart.exporting.backgroundColor = am4core.color('#f00', 0);

    // Create a zoom control
    var zoomControl = new am4maps.ZoomControl();
    chart.zoomControl = zoomControl;
    zoomControl.slider.height = 100;

    // Add Home button to reset zoom
    var home = chart.chartContainer.createChild(am4core.Button);
    home.label.text = 'Home';
    home.align = 'right';
    home.events.on('hit', function (ev) {
      chart.goHome();
    });

    // Disable mouse wheel zooming
    chart.chartContainer.wheelable = false;
  });
})();