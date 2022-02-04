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

    // Automatically enable all amCharts animations
    am4core.useTheme(am4themes_animated);

    // Creates a Pictorial Stacked Chart based on the given SVG Path
    function charting(svgData) {

      // Dispose old chart instance
      am4core.disposeAllCharts();

      // Create chart instance
      var chart = am4core.create(spaceDiv, am4charts.SlicedChart);

      // Initial fade in effect
      chart.hiddenState.properties.opacity = 0;

      // Passing data as an array to amCharts
      // - Iterate through Kintone records' Drop_down_0 fields
      // - Creates a category for every unique value & tallis them up
      // - Default field codes from the 01_Data Kintone App: Fruit = Drop_down; Programming language = Drop_down_0; Caffeine = Drop_down_1; Web browser = Drop_down_2; Nationality = Drop_down_3
      var kData = event.records.reduce(function (accumulator, current) {
        // Check if this category already exists
        var category = accumulator.find(function (value) {
          return value.name === current.Drop_down_0.value;
        });
        // Create new category or increment as appropriate
        if (category) {
          category.value++;
        } else {
          accumulator.push({
            name: current.Drop_down_0.value,
            value: 1
          });
        }
        return accumulator;
      }, []);
      // kData is an array storing each category & the number of times it appeared
      console.log(kData);
      // Pass kData to amCharts
      chart.data = kData;

      // Create chart series
      var series = chart.series.push(new am4charts.PictorialStackedSeries());
      series.dataFields.value = 'value';
      series.dataFields.category = 'name';

      // Generate a graph with the legend and details
      // Putting labels next to the slices
      series.alignLabels = true;
      series.labelsOpposite = false;

      // Ticks connect slice to its label
      series.ticks.template.locationX = 0.3;
      series.ticks.template.locationY = 0.5;
      series.ticks.template.strokeWidth = 2;
      series.ticks.template.strokeOpacity = 0.7;
      series.ticks.template.stroke = am4core.color("#DEB886");

      chart.legend = new am4charts.Legend();
      chart.legend.position = 'right';
      chart.legend.valign = 'bottom';
      chart.legend.maxWidth = 'undefined';

      // Set the SVG paths (stored as variables at end of this file)
      series.maskSprite.path = svgData;

      // Optional - Enable export
      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.backgroundColor = am4core.color('#f00', 0);
    }

    //Prevent duplication of the button
    if (document.getElementById('changeButton') != null) {
      return;
    }

    // Style the buttons to match Kintone UI
    var styling = 'display:inline-block;box-sizing:border-box;padding:0 16px;min-width:163px;height:48px;outline:none;border:1px solid #e3e7e8;background-color:#f7f9fa;box-shadow:1px 1px 1px #fff inset;color:#3498db;text-align:center;line-height:48px;font-weight: bold;';

    // Create the 'Change Graph' button
    var svgButton = document.createElement('button');
    svgButton.id = 'changeButton';
    svgButton.innerText = 'Change Graphic';
    svgButton.onclick = changingGraphs;
    svgButton.style = styling;

    var pointer = 0;
    var svgArray = [svgTerminal, svgCoffee, svgBrowser, svgHuman, svgApple, svgBottle, svgCan, svgJam];

    function changingGraphs() {
      pointer++;
      if (pointer >= svgArray.length) {
        pointer = 0;
      }
      charting(svgArray[pointer]);
    }

    // Append Buttons to Kintone Header
    kintone.app.getHeaderMenuSpaceElement().appendChild(svgButton);

    // Create the first graph on load
    charting(svgTerminal);
  }); // end am4core.ready()

  // Below are the SVG Path used for the Pictorial chart

  // Flaticon's SVG of an Terminal
  // https://www.flaticon.com/free-icon/programming_867695
  var svgTerminal = 'M0 15.845v300.181h512V15.845H0zm203.943 204.304l-21.214 21.214-75.439-75.438 75.439-75.439 21.214 21.214-54.225 54.225 54.225 54.224zm49.356 36.24l-29.425-5.853L258.7 75.458l29.425 5.853-34.826 175.078zm75.972-15.026l-21.214-21.214 54.225-54.224-54.225-54.225 21.214-21.214 75.439 75.439-75.439 75.438zM512 436.104v-90.076H0v90.076h164.332v30.049h-30.036v30.002h243.408v-30.002h-30.037v-30.049z';

  // Flaticon's SVG of an Mug
  // https://www.flaticon.com/free-icon/cup-of-hot-chocolate_15234
  var svgCoffee = 'M36.591,39.606c8.158-0.328,11.784-4.041,11.784-8.585c0-3.947-2.739-7.268-8.806-8.288    c0.027-1.468,0.029-2.884,0.029-4.206H0.909c0,8.644,0.01,21.2,7.776,27.197c-4.713,0.361-7.776,0.935-7.776,1.581    c0,1.094,8.661,1.979,19.345,1.979s19.344-0.885,19.344-1.979c0-0.646-3.063-1.221-7.775-1.581    C33.931,44.097,35.472,41.991,36.591,39.606z M39.425,26.492c3.404,0.789,4.012,2.458,3.973,4.619    c-0.043,2.454-0.754,4.115-5.402,4.687C38.837,32.811,39.235,29.604,39.425,26.492z M5.579,21.527h6.048    c-2.711,8,1.863,20.658,1.862,20.658C3.601,34.606,5.579,21.527,5.579,21.527z';

  // Flaticon's SVG of an Web Browser
  // https://www.flaticon.com/free-icon/browser_3214841
  var svgBrowser = 'M475.047 40.484H36.953C16.545 40.484 0 57.029 0 77.437v67.492h512V77.437c0-20.408-16.544-36.953-36.953-36.953zM64.085 108.636c-8.861 0-16.045-7.184-16.045-16.045s7.183-16.045 16.045-16.045c8.861 0 16.045 7.184 16.045 16.045s-7.184 16.045-16.045 16.045zm65.24 0c-8.861 0-16.045-7.184-16.045-16.045s7.183-16.045 16.045-16.045c8.861 0 16.045 7.184 16.045 16.045s-7.184 16.045-16.045 16.045zm68.197 0c-8.861 0-16.045-7.184-16.045-16.045s7.184-16.045 16.045-16.045 16.045 7.184 16.045 16.045-7.183 16.045-16.045 16.045zM0 176.808v257.755c0 20.409 16.545 36.953 36.953 36.953h438.094c20.409 0 36.953-16.544 36.953-36.953V176.808zm168.744 119.001l-20.864 60.698a15.94 15.94 0 01-29.96.516l-7.539-19.7-6.594 19.184a15.94 15.94 0 01-29.96.516l-23.23-60.698c-3.146-8.221.968-17.437 9.189-20.583 8.22-3.151 17.437.967 20.583 9.189l7.539 19.7 6.594-19.184c3.26-11.557 23.118-16.481 29.96-.516l7.539 19.7 6.594-19.184c2.862-8.324 11.93-12.75 20.255-9.893 8.327 2.862 12.756 11.931 9.894 20.255zm146.423 0l-20.864 60.698a15.94 15.94 0 01-29.96.516l-7.539-19.7-6.594 19.184a15.94 15.94 0 01-29.96.516l-23.23-60.698c-3.146-8.221.968-17.437 9.189-20.583 8.221-3.151 17.437.967 20.583 9.189l7.539 19.7 6.594-19.184c3.653-12.349 24.048-15.321 29.96-.516l7.539 19.7 6.594-19.184c2.862-8.324 11.929-12.75 20.255-9.893 8.327 2.862 12.756 11.931 9.894 20.255zm146.424 0l-20.864 60.698a15.94 15.94 0 01-29.96.516l-7.539-19.7-6.594 19.184a15.94 15.94 0 01-29.96.516l-23.231-60.698c-3.146-8.221.968-17.437 9.189-20.583 8.223-3.151 17.438.967 20.584 9.189l7.54 19.701 6.594-19.185c3.615-11.875 23.303-16.269 29.96-.516l7.539 19.7 6.594-19.184c2.862-8.324 11.931-12.75 20.255-9.893 8.325 2.862 12.754 11.931 9.893 20.255z';

  // amCharts' SVG of a Human
  // https://www.amcharts.com/docs/v4/chart-types/sliced-chart/#Applying_the_SVG_mask
  var svgHuman = 'M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z';

  // Flaticon's SVG of an Apple
  // https://www.flaticon.com/search?word=apple
  var svgApple = 'M265.081,133.419c-7.95-26.232-25.885-43.17-51.866-48.984c-6.762-1.515-13.381-2.282-19.672-2.282 c-15.877,0-27.92,4.871-36.634,10.598c0.037-2.923-0.107-9.156-1.461-18.038c1.123,0.074,2.864,0.157,5.096,0.157 c11.068,0,31.675-2.036,45.315-15.674C224.47,40.584,221.405,8.747,221.265,7.4l-0.67-6.462l-6.462-0.67 C213.87,0.241,211.443,0,207.652,0c-11.069,0-31.675,2.037-45.312,15.675c-8.406,8.405-12.383,19.504-14.212,29.277 c-3.988-11.944-9.756-25.577-18.117-40.407c-2.169-3.847-7.05-5.21-10.898-3.039c-3.85,2.17-5.21,7.049-3.04,10.898 c24.289,43.078,24.902,75.465,24.828,80.66c-8.719-5.67-20.785-10.2-36.707-10.2c-0.001,0-0.004,0-0.006,0 c-6.288,0-12.904,0.412-19.668,1.926c-25.98,5.814-43.916,22.575-51.866,48.807c-7.353,24.263-4.524,51.562-0.857,70.264 c3.896,19.871,14.335,42.127,27.926,59.604c7.75,9.966,16.168,17.918,25.021,23.678c10.813,7.037,22.005,10.594,33.264,10.594 c10.8,0,21.136-3.236,30.86-9.631c9.726,6.395,20.061,9.623,30.861,9.623c11.26,0,22.452-3.569,33.266-10.605 c8.852-5.76,17.271-13.736,25.02-23.701c13.591-17.477,24.03-39.775,27.927-59.65C269.607,185.067,272.433,157.68,265.081,133.419z  M257.425,135.739c-3.312-10.927-8.563-20.036-15.576-27.162C248.862,115.703,254.113,124.813,257.425,135.739z';

  // Flaticon's SVG of a Bottle
  // https://www.flaticon.com/free-icon/water_824188
  var svgBottle = 'm 367.859,339.663 c 0,-11.391 -5.325,-21.54 -13.68,-28.055 8.354,-6.515 13.774,-16.664 13.774,-28.055 0,-11.993 -6.207,-22.611 -15.328,-29.058 9.183,-7.254 14.858,-18.476 14.858,-31.06 V 148.74 L 287.2369,55.524855 311.374,55.108 V 0 H 200.156 v 55.108 h 23.47068 L 144.047,148.74 v 74.697 c 0,12.584 6.161,23.805 15.344,31.06 -9.121,6.447 -14.968,17.064 -14.968,29.058 0,11.391 5.451,21.54 13.805,28.055 -8.354,6.515 -13.711,16.664 -13.711,28.055 0,11.993 5.737,22.611 14.858,29.058 -9.183,7.254 -15.328,18.476 -15.328,31.06 v 64.125 c 0,21.823 18.256,40.078 40.078,40.078 h 40.078 c 41.43399,-0.033 65.74124,0 104.203,0 21.823,0 39.076,-18.256 39.076,-40.078 v -64.125 c 0,-12.584 -5.66,-23.805 -14.843,-31.06 9.122,-6.448 15.22,-17.066 15.22,-29.06 z';

  // soda By Orin zuu
  // https://thenounproject.com/search/?creator=2662639&q=soda&i=1368945
  var svgCan = 'm 50,956.36217 c -14.3594,0 -26,2.6905 -26,6.0093 0,3.3189 11.6406,6.0094 26,6.0094 14.359397,0 25.999997,-2.6905 25.999997,-6.0094 0,-3.3188 -11.6406,-6.0093 -25.999997,-6.0093 z m -9,3.2237 c 2.11173,0 4.02376,0.2261 5.53125,0.6573 1.5075,0.4315 2.78125,1.166 2.78125,2.1283 0,0.9623 -1.27375,1.6657 -2.78125,2.097 -1.50749,0.4315 -3.41952,0.6573 -5.53125,0.6573 -2.11174,0 -4.02375,-0.2259 -5.53125,-0.6573 -1.5075,-0.4312 -2.78125,-1.1347 -2.78125,-2.097 0,-0.9623 1.27375,-1.6968 2.78125,-2.1283 1.5075,-0.4312 3.41951,-0.6573 5.53125,-0.6573 z m 0,1.5337 c -1.75427,0 -3.34899,0.2071 -4.375,0.5008 -1.02602,0.2936 -1.3125,0.6072 -1.3125,0.7511 0,0.144 0.28648,0.4264 1.3125,0.7199 1.02601,0.2937 2.62073,0.5007 4.375,0.5007 1.75427,0 3.34898,-0.207 4.375,-0.5007 1.02601,-0.2935 1.3125,-0.5759 1.3125,-0.7199 0,-0.1439 -0.28649,-0.4575 -1.3125,-0.7511 -1.02602,-0.2937 -2.62073,-0.5008 -4.375,-0.5008 z m 34.968747,4.5696 c -2.19655,1.2301 -4.78991,2.0296 -6.8125,2.5039 -3.65285,0.8443 -8.17413,1.428 -13.1875,1.6901 -0.905157,8.7304 0.10801,14.7147 4.03125,24.5381 6.91407,17.80663 8.93054,25.86493 5.125,47.29213 4.25069,-0.9714 8.26723,-2.3532 11.875,-4.2253 l 0,-67.01033 c 0,-1.4788 0.009,-3.4211 -1.03125,-4.7886 z m -51.937497,0.031 C 23.00499,967.07897 23,968.96447 23,970.32117 l 0,67.16673 c 9.80908,4.4913 21.29183,6.3564 32.125,5.6651 4.894657,-13.9084 5.850567,-27.8542 2.874997,-46.72883 -1.96249,-8.8449 -7.758657,-14.8097 -7.031247,-26.3847 -8.46317,0.014 -13.96133,-0.4688 -20.09375,-1.8466 -2.46637,-0.6263 -4.80897,-1.3854 -6.84375,-2.4727 z m 49.624997,75.46103 c -13.88287,5.5627 -31.678027,5.5445 -46.843747,0.031 5.91228,9.6492 42.881407,9.427 46.843747,-0.031 z';

  // Flaticon's SVG of an Jam Can
  var svgJam = 'M391 241v-45c0-36.219-25.81-66.524-60-73.493V45c0-8.284-6.716-15-15-15H196c-8.284 0-15 6.716-15 15v77.507c-34.19 6.969-60 37.274-60 73.493v45l12 29v95l-12 26v106c0 8.284 6.716 15 15 15h240c8.284 0 15-6.716 15-15V391l-18-26v-92z M166 60h180c8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15H166c-8.284 0-15 6.716-15 15v30c0 8.284 6.716 15 15 15zm149.689 181c-14.085-18.694-36.234-30-59.689-30s-45.604 11.306-59.689 30H121v150h75.311c14.085 18.694 36.234 30 59.689 30s45.604-11.306 59.689-30H391V241zM301 331h-90c-8.284 0-15-6.716-15-15s6.716-15 15-15h90c8.284 0 15 6.716 15 15s-6.716 15-15 15z';
})();