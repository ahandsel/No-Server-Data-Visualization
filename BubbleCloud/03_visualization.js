(function () {
  'use strict';

  // Kintone event triggered after the record list page is displayed.
  kintone.events.on('app.record.index.show', function (event) {

    // Retrieve & configure the space element below the record list's header
    var spaceDiv = kintone.app.getHeaderSpaceElement();
    spaceDiv.style.height = '400px';
    spaceDiv.style.marginLeft = '25px';
    spaceDiv.style.marginRight = '25px';
    spaceDiv.style.border = 'solid';
    spaceDiv.style.borderColor = '#ED7B84';

    // Create chart instance
    var chart = am4core.create(spaceDiv, am4plugins_forceDirected.ForceDirectedTree);

    // Create series
    var series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());
    series.dataFields.value = 'value';
    series.dataFields.name = 'name';
    series.nodes.template.label.text = '{name}';
    series.nodes.template.label.fill = am4core.color("#000000");
    series.nodes.template.tooltipText = "{name}: [bold]${value}[/]";
    series.fontSize = 13;
    series.minRadius = 30;
    series.maxRadius = 100;

    console.log('event');
    console.log(event);

    var data = event.records.map(function (record) {
      return {
        // Film's default field code = Text
        // Worldwide Box office's default field code = Number
        'name': record.Text.value,
        'value': record.Number.value
      }
    });

    series.data = data;

    console.log('data');
    console.log(data);
  });
})();