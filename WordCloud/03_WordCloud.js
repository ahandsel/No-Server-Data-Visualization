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

    // Creating chart instance
    var chart = am4core.create(spaceDiv, am4plugins_wordCloud.WordCloud);

    // Creating a series
    var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

    // Apply amCharts Themes for automatic animation
    am4core.useTheme(am4themes_animated);

    // Configuring the Word Cloud with Series Properties

    // Checking for overlapping of words' Intensity level.
    // (Lower value, slower, less overlap)
    series.accuracy = 4;

    // The number of steps a label is moved if its space is already occupied.
    // (Lower value, more packed labels, consume more CPU)
    series.step = 15;

    // If word's relative height is bigger than the rotationThreshold, it won't be rotated.
    // 0 = no words will rotate; 1 = all words will rotate
    series.rotationThreshold = 0.7;

    // Maximum number of words to show.
    series.maxCount = 200;

    // Minimum character length of a word to be included
    series.minWordLength = 2;

    // Font size for the biggest words in numeric pixel size or relative as Percent.
    series.maxFontSize = am4core.percent(30);

    // Auto-assigning colors from theme list
    series.colors = new am4core.ColorSet();

    // Keeps the words' color the same as it rotates
    series.colors.passOptions = {};

    // Array of possible word rotation angles.
    // (0 = horizontal, 90 = vertical)
    series.angles = [0, -90];

    // Text's font weight
    series.fontWeight = '700';

    // Set element's four margins at once by pixel (top, right, bottom, left)
    series.labels.template.margin(4, 4, 4, 4);

    // Display the word's count when hovering over with a mouse
    series.labels.template.tooltipText = '{word}: [bold]{value}[/]';

    // Filter out function word
    var stopWords = ['A', 'A\'s', 'Able', 'About', 'Above', 'According', 'Accordingly', 'Across', 'Actually', 'After', 'Afterwards', 'Again', 'Against', 'Ain\'t', 'All', 'Allow', 'Allows', 'Almost', 'Alone', 'Along', 'Already', 'Also', 'Although', 'Always', 'Am', 'Among', 'Amongst', 'An', 'And', 'Another', 'Any', 'Anybody', 'Anyhow', 'Anyone', 'Anything', 'Anyway', 'Anyways', 'Anywhere', 'Apart', 'Appear', 'Appreciate', 'Appropriate', 'Are', 'Aren\'t', 'Around', 'As', 'Aside', 'Ask', 'Asking', 'Associated', 'At', 'Available', 'Away', 'Awfully', 'B', 'Be', 'Became', 'Because', 'Become', 'Becomes', 'Becoming', 'Been', 'Before', 'Beforehand', 'Behind', 'Being', 'Believe', 'Below', 'Beside', 'Besides', 'Best', 'Better', 'Between', 'Beyond', 'Both', 'Brief', 'But', 'By', 'C', 'C\'mon', 'C\'s', 'Came', 'Can', 'Can\'t', 'Cannot', 'Cant', 'Cause', 'Causes', 'Certain', 'Certainly', 'Changes', 'Clearly', 'Co', 'Com', 'Come', 'Comes', 'Concerning', 'Consequently', 'Consider', 'Considering', 'Contain', 'Containing', 'Contains', 'Corresponding', 'Could', 'Couldn\'t', 'Course', 'Currently', 'D', 'Definitely', 'Described', 'Despite', 'Did', 'Didn\'t', 'Different', 'Do', 'Does', 'Doesn\'t', 'Doesn', 'Doing', 'Don\'t', 'Done', 'Down', 'Downwards', 'During', 'E', 'Each', 'Edu', 'Eg', 'Eight', 'Either', 'Else', 'Elsewhere', 'Enough', 'Entirely', 'Especially', 'Et', 'Etc', 'Even', 'Ever', 'Every', 'Everybody', 'Everyone', 'Everything', 'Everywhere', 'Ex', 'Exactly', 'Example', 'Except', 'F', 'Far', 'Few', 'Fifth', 'First', 'Five', 'Followed', 'Following', 'Follows', 'For', 'Former', 'Formerly', 'Forth', 'Four', 'From', 'Further', 'Furthermore', 'G', 'Get', 'Gets', 'Getting', 'Given', 'Gives', 'Go', 'Goes', 'Going', 'Gone', 'Got', 'Gotten', 'Greetings', 'H', 'Had', 'Hadn\'t', 'Happens', 'Hardly', 'Has', 'Hasn\'t', 'Have', 'Haven\'t', 'Having', 'He', 'He\'s', 'Hello', 'Help', 'Hence', 'Her', 'Here', 'Here\'s', 'Hereafter', 'Hereby', 'Herein', 'Hereupon', 'Hers', 'Herself', 'Hi', 'Him', 'Himself', 'His', 'Hither', 'Hopefully', 'How', 'Howbeit', 'However', 'I', 'I\'d', 'I\'ll', 'I\'m', 'I\'ve', 'Ie', 'If', 'Ignored', 'Immediate', 'In', 'Inasmuch', 'Inc', 'Indeed', 'Indicate', 'Indicated', 'Indicates', 'Inner', 'Insofar', 'Instead', 'Into', 'Inward', 'Is', 'Isn\'t', 'It', 'It\'d', 'It\'ll', 'It\'s', 'Its', 'Itself', 'J', 'Just', 'K', 'Keep', 'Keeps', 'Kept', 'Know', 'Known', 'Knows', 'L', 'Last', 'Lately', 'Later', 'Latter', 'Latterly', 'Least', 'Less', 'Lest', 'Let', 'Let\'s', 'Like', 'Liked', 'Likely', 'Little', 'Look', 'Looking', 'Looks', 'Ltd', 'M', 'Mainly', 'Many', 'May', 'Maybe', 'Me', 'Mean', 'Meanwhile', 'Merely', 'Might', 'More', 'Moreover', 'Most', 'Mostly', 'Much', 'Must', 'My', 'Myself', 'N', 'Name', 'Namely', 'Nd', 'Near', 'Nearly', 'Necessary', 'Need', 'Needs', 'Neither', 'Never', 'Nevertheless', 'New', 'Next', 'Nine', 'No', 'Nobody', 'Non', 'None', 'Noone', 'Nor', 'Normally', 'Not', 'Nothing', 'Novel', 'Now', 'Nowhere', 'O', 'Obviously', 'Of', 'Off', 'Often', 'Oh', 'Ok', 'Okay', 'Old', 'On', 'Once', 'One', 'Ones', 'Only', 'Onto', 'Or', 'Other', 'Others', 'Otherwise', 'Ought', 'Our', 'Ours', 'Ourselves', 'Out', 'Outside', 'Over', 'Overall', 'Own', 'P', 'Particular', 'Particularly', 'Per', 'Perhaps', 'Placed', 'Please', 'Plus', 'Possible', 'Presumably', 'Probably', 'Provides', 'Q', 'Que', 'Quite', 'Qv', 'R', 'Rather', 'Rd', 'Re', 'Really', 'Reasonably', 'Regarding', 'Regardless', 'Regards', 'Relatively', 'Respectively', 'Right', 'S', 'Said', 'Same', 'Saw', 'Say', 'Saying', 'Says', 'Second', 'Secondly', 'See', 'Seeing', 'Seem', 'Seemed', 'Seeming', 'Seems', 'Seen', 'Self', 'Selves', 'Sensible', 'Sent', 'Serious', 'Seriously', 'Seven', 'Several', 'Shall', 'She', 'Should', 'Shouldn\'t', 'Since', 'Six', 'So', 'Some', 'Somebody', 'Somehow', 'Someone', 'Something', 'Sometime', 'Sometimes', 'Somewhat', 'Somewhere', 'Soon', 'Sorry', 'Specified', 'Specify', 'Specifying', 'Still', 'Sub', 'Such', 'Sup', 'Sure', 'T', 'T\'s', 'Take', 'Taken', 'Tell', 'Tends', 'Th', 'Than', 'Thank', 'Thanks', 'Thanx', 'That', 'That\'s', 'Thats', 'The', 'Their', 'Theirs', 'Them', 'Themselves', 'Then', 'Thence', 'There', 'There\'s', 'Thereafter', 'Thereby', 'Therefore', 'Therein', 'Theres', 'Thereupon', 'These', 'They', 'They\'d', 'They\'ll', 'They\'re', 'They\'ve', 'Think', 'Third', 'This', 'Thorough', 'Thoroughly', 'Those', 'Though', 'Three', 'Through', 'Throughout', 'Thru', 'Thus', 'To', 'Together', 'Too', 'Took', 'Toward', 'Towards', 'Tried', 'Tries', 'Truly', 'Try', 'Trying', 'Twice', 'Two', 'U', 'Un', 'Under', 'Unfortunately', 'Unless', 'Unlikely', 'Until', 'Unto', 'Up', 'Upon', 'Us', 'Use', 'Used', 'Useful', 'Uses', 'Using', 'Usually', 'Uucp', 'V', 'Value', 'Various', 'Very', 'Via', 'Viz', 'Vs', 'W', 'Want', 'Wants', 'Was', 'Wasn\'t', 'Way', 'We', 'We\'d', 'We\'ll', 'We\'re', 'We\'ve', 'Welcome', 'Well', 'Went', 'Were', 'Weren\'t', 'What', 'What\'s', 'Whatever', 'When', 'Whence', 'Whenever', 'Where', 'Where\'s', 'Whereafter', 'Whereas', 'Whereby', 'Wherein', 'Whereupon', 'Wherever', 'Whether', 'Which', 'While', 'Whither', 'Who', 'Who\'s', 'Whoever', 'Whole', 'Whom', 'Whose', 'Why', 'Will', 'Willing', 'Wish', 'With', 'Within', 'Without', 'Won\'t', 'Wonder', 'Would', 'Wouldn\'t', 'X', 'Y', 'Yes', 'Yet', 'You', 'You\'d', 'You\'ll', 'You\'re', 'You\'ve', 'Your', 'Yours', 'Yourself', 'Yourselves', 'Z', 'Zero'];

    // Append Lowercase and Uppercase versions
    var excludeArray = stopWords.concat(
      stopWords.map(function (lower) {
        return lower.toLowerCase();
      }), stopWords.map(function (upper) {
        return upper.toUpperCase();
      })
    );
    series.excludeWords = excludeArray;

    // Import the string from Kintone's Text Area field
    var words;
    words = event.records.reduce(function (accumulator, current) {
      // Content default field code = Text_area
      return accumulator += current.Text_area.value;
    });
    // Insert the string into series
    series.text = words;

    // - - - - - Extra Functionality - - - - -
    // Enable export
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.backgroundColor = am4core.color('#f00', 0);

    // - - - - - - - - - - - - - - -
    // Optional Settings:
    /* Following are optional settings that you can take advantage of by uncommenting them */

    // Display value along side the word
    /*
    series.labels.template.text = "{word}: {value}";
     */

    // Rotate the Word Cloud by 45 degrees
    /*
    series.labelsContainer.rotation = 45;
    series.events.on("arrangestarted", function (ev) {
      ev.target.baseSprite.preloader.show(0);
    });
    */

    // Display progress indicator
    /*
    series.events.on("arrangeprogress", function (ev) {
      ev.target.baseSprite.preloader.progress = ev.progress;
    });
    */
  });
})();