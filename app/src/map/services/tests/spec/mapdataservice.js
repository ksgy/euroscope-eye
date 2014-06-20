'use strict';

describe('Service: MapMapdataservice', function () {

  // load the service's module
  beforeEach(module('euroscopeEyeApp'));

  // instantiate service
  var MapMapdataservice;
  beforeEach(inject(function (_MapMapdataservice_) {
    MapMapdataservice = _MapMapdataservice_;
  }));

  it('should do something', function () {
    expect(!!MapMapdataservice).toBe(true);
  });

});
