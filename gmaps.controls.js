'use strict';

var _forIn = require('lodash-compat/object/forIn'),
    _extend = require('lodash-compat/object/extend'),
    controlsModule = {};

function setupDOMListener(object, eventName, listener) {
  google.maps.event.addDomListener(object, eventName, function() {
    listener.call(this, this);
  });
}

controlsModule.createControl = function(options) {
  var control = document.createElement('div');

  control.style.cursor = 'pointer';

  if (options.disableDefaultStyles !== true) {
    control.style.fontFamily = 'Roboto, Arial, sans-serif';
    control.style.fontSize = '11px';
    control.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
  }

  _forIn(options.style, function(style, option) {
    control.style[option] = style;
  });

  if (options.id) {
    control.id = options.id;
  }

  if (options.classes) {
    control.className = options.classes;
  }

  if (options.content) {
    if (typeof options.content === 'string') {
      control.innerHTML = options.content;
    }
    else if (options.content instanceof HTMLElement) {
      control.appendChild(options.content);
    }
  }

  if (options.position) {
    control.position = google.maps.ControlPosition[options.position.toUpperCase()];
  }

  _forIn(options.events, function(listener, eventName) {
    setupDOMListener(control, eventName, listener);
  });

  control.index = 1;

  return control;
};

controlsModule.addControl = function(options) {
  var control = this.createControl(options);

  this.controls.push(control);
  this.map.controls[control.position].push(control);

  return control;
};

controlsModule.removeControl = function(controlToRemove) {
  var position;

  for (var controlIndex = 0; controlIndex < this.controls.length; controlIndex++) {
    var control = this.controls[controlIndex];

    if (control === controlToRemove) {
      position = control.position;

      this.controls.splice(controlIndex, 1);
    }
  }

  if (position) {
    for (var mapControlIndex = 0; mapControlIndex < this.map.controls.length; mapControlIndex++) {
      var controlsForPosition = this.map.controls[controlToRemove.position];

      if (controlsForPosition.getAt(mapControlIndex) === controlToRemove) {
        controlsForPosition.removeAt(mapControlIndex);

        break;
      }
    }
  }

  return controlToRemove;
};

if (window.GMaps) {
  _extend(GMaps.prototype, controlsModule);
}

module.exports = controlsModule;