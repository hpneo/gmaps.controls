describe('Creating custom map controls', function () {
  var mapWithCustomControls, mapWithEventsInCustomControls;

  beforeEach(function() {
    mapWithCustomControls = mapWithCustomControls || new GMaps({
      el : '#map-with-custom-controls',
      lat: -12.0433,
      lng: -77.0283,
      zoom: 12
    });
  });

  it('should add the control to the controls collection', function() {
    mapWithCustomControls.addControl({
      position: 'top_right',
      content: 'Control 1'
    });

    expect(mapWithCustomControls.controls.length).toBe(1);
  });

  it('should add default styles for the control', function () {
    mapWithCustomControls.addControl({
      position: 'top_right',
      content: 'Geolocate'
    });

    expect(mapWithCustomControls.controls[1].position).toBe(google.maps.ControlPosition.TOP_RIGHT);
    expect(mapWithCustomControls.controls[1].style.fontFamily).toNotBe('');
  });

  it('should leave off default styles if requested', function () {
    mapWithCustomControls.addControl({
      position: 'top_right',
      disableDefaultStyles: true,
      content: '<i class="icon"></i>'
    });

    expect(mapWithCustomControls.controls[2].position).toBe(google.maps.ControlPosition.TOP_RIGHT);
    expect(mapWithCustomControls.map.controls[google.maps.ControlPosition.TOP_RIGHT].length).toBe(3);
    expect(mapWithCustomControls.controls[2].style.fontFamily).toBe('');
  });

  it('should remove control', function () {
    var control = mapWithCustomControls.controls[0];
    mapWithCustomControls.removeControl(control);

    expect(mapWithCustomControls.controls.length).toBe(2);
    expect(mapWithCustomControls.map.controls[google.maps.ControlPosition.TOP_RIGHT].length).toBe(2);
    expect(mapWithCustomControls.controls[0]).toNotBe(control);
  });

  describe('That respond to events', function() {
    var callbacks;

    beforeEach(function() {
      callbacks = {
        onclick : function() {
          // console.log('control.onclick');
        }
      }

      expect.spyOn(callbacks, 'onclick').andCallThrough();

      mapWithEventsInCustomControls = new GMaps({
        el : '#map-with-events-in-custom-controls',
        lat : -12.0433,
        lng : -77.0283
      });

      mapWithEventsInCustomControls.addControl({
        position : 'top_right',
        content : 'Click',
        style : {
          margin: '5px',
          padding: '1px 6px',
          border: 'solid 1px #717B87',
          background: '#fff'
        },
        events : {
          click: callbacks.onclick
        }
      });
    });

    it('should respond to click event attached to the custom control', function() {
      google.maps.event.trigger(mapWithEventsInCustomControls.controls[0], 'click');

      expect(callbacks.onclick).toHaveBeenCalled();
    });
  });
});