(function(angular, io) {
  angular
    .module('dashboardApp')
    .factory('socketService', socketService);

  socketService.$inject = ['$rootScope'];

  function socketService($rootScope) {
    var socket = io.connect();

    var service = {
      on: on,
      emit: emit
    };

    return service;

    function on(eventName, cb) {
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          cb.apply(socket, args)
        });
      });
    }

    function emit(eventName, data, cb) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          cb.apply(socket, args)
        });
      });
    }
  }

})(angular, io);