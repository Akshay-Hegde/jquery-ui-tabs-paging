When tabs do not fit within the width of the containing UL, "previous" and "next" buttons are displayed to scroll through tabs.

## Features ##
  * Automatically resizes when window size changes.
  * Next and Previous buttons are configurable.
  * Paging automatically re-initialized when tabs are added or removed (deprecated in jQuery UI 1.9)
  * "Next" button is automatically set at a fixed distance from the right of the UL.
  * Tested with jQuery UI themes

## Recent Changes (for jQuery  UI 1.9) ##
  * Changed to use $.outerWidth(true) instead of $.outerWidth({margin: true})
  * Changed to use "tabs" instead of "lis"
  * Changed to use class 'ui-tabs-active' for active tabs instead of 'ui-tabs-selected'
  * Changed to use "active" instead of deprecated "select" function
  * Changed to use "tabs.length" instead of deprecated "length" function
  * Renamed "followOnSelect" to "followOnActive"
  * Renamed "selectOnAdd" to "activeOnAdd"
  * Deprecated add/remove functions (deprecated in jQuery UI 1.9)
  * Extension for supporting legacy versions (jQuery UI 1.7 and 1.8) is available under trunk/legacy

## Stable - Required Libraries ##
  * Tested on jQuery 1.9.0 and 1.8.2
  * Tested on jQuery UI 1.9.0
    * Requires ui.core.js, ui.widget.js, and ui.tabs.js

## Legacy - Required Libraries ##
  * Tested on jQuery 1.3.2 and jQuery 1.7.2
  * Tested on jQuery UI 1.7.2 and 1.8.21
    * jQuery UI 1.7.2 requires ui.core.js and ui.tabs.js
    * jQuery UI 1.8.21 requires ui.core.js, ui.widget.js, and ui.tabs.js


## Parameters ##
  * cycle - If `true`, the "next" button stays active when you are at the end of the list and the "prev" button stays active when you are at the beginning of the list.  When `false`, buttons are disabled (with the .ui-tabs-paging-disable class).  Default is `false`
  * follow - If `true`, the first tab will be selected when going to the "next" tab and the last tab will be selected when going to the "prev" tab.  Default is `false`
  * tabsPerPage - Use to set the max number of tabs to show per page.  When value is 0, that tab will fit to page.
  * nextButton - Defaults to &#187;
  * previousButton - Defaults to &#171;
  * activeOnAdd - If `true`, tabs will automatically be active when they are added to the page.  Default is `false`
  * followOnActive - If `true`, when a tab is set to active using the ui.tabs "options('active')" function, the page will also move to that tab.  Default is `false`

## [Example](http://www.seyfertdesign.com/jquery/demo.html) ##
```
<html>
<head>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/jquery-ui.min.js"></script>
<script type="text/javascript" src="ui.tabs.paging.js"></script>
<script type="text/javascript">
$(function($) {
   $('#example').tabs();
   $('#example').tabs('paging', { cycle: true, follow: true } );
});
</script>
<style>
body {
   font-size: 0.8em;
   font-family: Arial;
   
}
.tabs { 
   background-color: #eee; 
   border-bottom: 1px solid #ccc; 
   list-style: none;
   margin: 0; 
   padding: 10px 5px 1px 5px;
   zoom:1; 
}
.tabs:after { 
   display: block; 
   clear: both; 
   content: " "; 
}

.tabs li {
   float: left; 
   margin: 0 1px 0 0; 
   padding-left: 5px; 
}
.tabs a {
   display: block; 
   position: relative; 
   top: 1px; 
   border: 1px solid #ccc;
   border-bottom: 0; 
   z-index: 2; 
   padding: 2px 9px 3px; 
   color: #444; 
   text-decoration: none;
   white-space: nowrap;
}
.tabs a:focus,
.tabs a:active { 
   outline: none; 
}
.tabs a:hover,
.tabs a:focus,
.tabs a:active { 
   background: #fff; 
   cursor: pointer; 
}
.ui-tabs-active a { 
   background-color: #fff; 
   color: #000; 
   font-weight: bold; 
   padding: 2px 8px 1px; 
   border-bottom: 1px solid #fff; 
   border-top: 3px solid #fabd23; 
   border-left: 1px solid #fabd23; 
   border-right: 1px solid #fabd23; 
   margin-bottom: -1px; 
   overflow: visible;
}
.ui-tabs-hide { 
   display: none; 
   background-color: #fff 
}
.ui-tabs-panel {
   padding: 0.5em;
}
.ui-tabs-paging-next { 
   float: right !important;
}
.ui-tabs-paging-prev a,
.ui-tabs-paging-next a {
   display: block; 
   position: relative; 
   top: 1px; 
   border: 0;
   z-index: 2; 
   padding: 0px; 
   color: #444; 
   text-decoration: none;
   background: #eee; 
   cursor: pointer;
}
.ui-tabs-paging-next a:hover,
.ui-tabs-paging-next a:focus,
.ui-tabs-paging-next a:active,
.ui-tabs-paging-prev a:hover,
.ui-tabs-paging-prev a:focus,
.ui-tabs-paging-prev a:active { 
   background: #eee; 
}
.ui-tabs-paging-disabled {
   visibility: hidden;
}
</style>
</head>
<body>
<div id="example">
  <ul class="tabs">
    <li><a href="#tab1">Tab 1</a></li>
    <li><a href="#tab2">Tab 2</a></li>
    <li><a href="#tab3">Tab 3</a></li>
    <li><a href="#tab4">Tab 4</a></li>
    <li><a href="#tab5">Tab 5</a></li>
    <li><a href="#tab6">Tab 6</a></li>
    <li><a href="#tab7">Tab 7</a></li>
    <li><a href="#tab8">Tab 8</a></li>
    <li><a href="#tab9">Tab 9</a></li>
    <li><a href="#tab10">Tab 10</a></li>
    <li><a href="#tab11">Tab 11</a></li>
    <li><a href="#tab12">Tab 12</a></li>
    <li><a href="#tab13">Tab 13</a></li>
    <li><a href="#tab14">Tab 14</a></li>
    <li><a href="#tab15">Tab 15</a></li>
  </ul>
  <div id="tab1">Tab 1</div>
  <div id="tab2">Tab 2</div>
  <div id="tab3">Tab 3</div>
  <div id="tab4">Tab 4</div>
  <div id="tab5">Tab 5</div>
  <div id="tab6">Tab 6</div>
  <div id="tab7">Tab 7</div>
  <div id="tab8">Tab 8</div>
  <div id="tab9">Tab 9</div>
  <div id="tab10">Tab 10</div>
  <div id="tab11">Tab 11</div>
  <div id="tab12">Tab 12</div>
  <div id="tab13">Tab 13</div>
  <div id="tab14">Tab 14</div>
  <div id="tab15">Tab 15</div>
</div>
</body>
</html>
```