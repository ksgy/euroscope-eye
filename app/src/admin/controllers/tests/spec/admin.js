'use strict';

describe('Controller: AdminAdminCtrl', function () {

  // load the controller's module
  beforeEach(module('euroscopeEyeApp'));

  var AdminAdminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminAdminCtrl = $controller('AdminAdminCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
