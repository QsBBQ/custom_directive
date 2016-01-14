angular.module("myDirectives", [])
.directive('myHello', function() {
  return {
    template: '<div>Hello world!</div>',
    // As Element or attribue ie. <my-hello><my-hello>
    // or <div my-hello></div>
    restrict: 'EA'
  };
})
.directive('ngSparkline', function() {
  // var url = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=7&callback=JSON_CALLBACK&q="
  var url = "http://api.openweathermap.org/data/2.5/weather?q="
  var apiKey = "&appid=d585bb7d583d275cd8771bfb19cdf39b"
  var hardCity = "Chicago"
  return {
    restrict: 'A',
    require: '^ngModel',
    scope: {
      ngCity: '@'
    },
    template: '<div class="sparkline"><h4>Weather for</h4></div>',
    controller: ['$scope', '$http', function($scope, $http) {
      $scope.getTemp = function(city) {
        $http({
            method: 'JSONP',
            url: url + hardCity + apiKey + '&callback=JSON_CALLBACK'
          }).success(function(data) {
            var weather = [];
            angular.forEach(data.list, function(value){
              weather.push(value);
            });
            $scope.weather = weather;
          });
      }
    }],
    link: function(scope, iElement, iAttrs) {
      // get weather details
      scope.getTemp(iAttrs.ngCity);
    }
  };
});
