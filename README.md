# gmaps.controls

gmaps.js module to create custom controls.

## Install

For using with bundlers (as Browserify or Webpack):

`npm install gmaps.controls --save`

Before `require()` this module you need to `require('gmaps.core')`.

For using directly in the browser, download the `gmaps.controls.js` (or `gmaps.controls.min.js`) in `dist`.

## Usage

You need to register a `<script>` tag with the Google Maps JavaScript API, then import gmaps.core.

Every Google Maps map needs a container (`<div id="map"></div>` in this demo), which needs to have width and height, and be visible (without `display: none`, for example):

```
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
  <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
  <script src="gmaps.core.js"></script>
  <script src="gmaps.controls.js"></script>
  <style type="text/css">
    #map {
      width: 400px;
      height: 400px;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = new GMaps({
      el : '#map',
      lat: -12.0433,
      lng: -77.0283,
      zoom: 12
    });

    map.addControl({
      position: 'top_right',
      content: 'Geolocate',
      style: {
        margin: '5px',
        padding: '1px 6px',
        border: 'solid 1px #717B87',
        background: '#fff'
      },
      events: {
        click: function(){
          console.log('User geolocated');
        }
      }
    });
  </script>
</body>
</html>
```

For more examples you can check the tests in this repo.

## Documentation

### `createControl(options)`

Create a custom control for gmaps.js map but doesn't add it to the map. Returns the new control. The `options` object should contain:

* `style` (object): The keys and values of this object should be valid CSS properties and values.
* `id` (string): The HTML id for the custom control.
* `classes` (string): A string containing all the HTML classes for the custom control.
* `content` (string or HTML element): The content of the custom control.
* `position` (string): Any valid [`google.maps.ControlPosition`](https://developers.google.com/maps/documentation/javascript/reference#ControlPosition) value, in lower or upper case.
* `events` (object): The keys of this object should be valid DOM events. The values should be functions.
* `disableDefaultStyles` (boolean): If false, removes the default styles for the controls like font (family and size), and box shadow.

### `addControl(options)`

Create a custom control for gmaps.js map and add it to the map. Uses the same options of `createControl` and returns the added control.

### `removeControl(controlToRemove)`

Remove a control from the map. `controlToRemove` should be a control returned by `addControl()`.

## Changelog

For pre 0.5.0 versions, check [gmaps.js changelog](https://github.com/hpneo/gmaps#changelog)

### 0.5.0

* Node module format (CommonJS)

## License

MIT License. Copyright 2015 Gustavo Leon. http://github.com/hpneo

Permission is hereby granted, free of charge, to any
person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the
Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice
shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.