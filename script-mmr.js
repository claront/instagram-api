// Define a new module. This time we declare a dependency on
// the ngResource module, so we can work with the Instagram API

var app = angular.module("switchableGrid", ['ngResource']);

// Create and register the new "instagram" service
app.factory('instagram', function($http){

	return {
    fetchPopular: function () {
      // ...
    } 
		// fetchPopular: function(callback){

		// 	// The ngResource module gives us the $resource service. It makes working with
		// 	// AJAX easy. Here I am using a client_id of a test app. Replace it with yours.

		// 	var api = $resource('http://www.mapmyrun.com/vxproxy/v7.0/workout/782830271/?field_set=time_series&callback=success',{
		// 	},{
		// 		// This creates an action which we've chosen to name "fetch". It issues
		// 		// an JSONP request to the URL of the resource. JSONP requires that the
		// 		// callback=JSON_CALLBACK part is added to the URL.

		// 		fetch:{method:'JSONP'}
		// 	});

		// 	api.fetch(function(response){

		// 		// Call the supplied callback function
		// 		callback(response.data);

		// 	});
		// }
	}

});

// The controller. Notice that I've included our instagram service which we
// defined below. It will be available inside the function automatically.

// app.run(function ($http) {
//   $http.defaults.headers.common.Referer = 'http://www.mapmyrun.com/workout/633845437';
// })

// app.config(function ($httpProvider) {
//   // Enable CORS - does not work
//   $httpProvider.defaults.useXDomain = true;
//   delete $httpProvider.defaults.headers.common['X-Requested-With'];
// })

app.controller('SwitchableGridController', SwitchableGridController)

function SwitchableGridController($scope, $http, instagram){

	// Default layout of the app. Clicking the buttons in the toolbar
	// changes this value.

	$scope.layout = 'grid';

	$scope.pics = [];

	// Use the instagram service and fetch a list of the popular pics
	// instagram.fetchPopular(function(data){

	// 	// Assigning the pics array will cause the view
	// 	// to be automatically redrawn by Angular.
	// 	$scope.pics = data;
	// });

  var config = {
    headers: {
      'Referer':'http://www.mapmyrun.com/workout/633845437'
    }
  }

  $http.get('http://www.mapmyrun.com/vxproxy/v7.0/workout/633845437/?field_set=time_series&callback=success')
  // $http.jsonp('http://www.mapmyrun.com/vxproxy/v7.0/workout/633845437/?field_set=time_series&callback=success')
  // $http.get('http://www.mapmyrun.com/vxproxy/v7.0/workout/633845437/?field_set=time_series&callback=success', config)
  // $http.jsonp('http://www.mapmyrun.com/vxproxy/v7.0/workout/633845437/?field_set=time_series&callback=success', config)
  // $http.get('https://api.github.com/gists')
    .success(function (data, status, headers, config) {
      // $scope.pics = data;
      console.debug('Success', data)
    })
    .error(function (data, status, headers, config) {
      console.error('Error: Bad URL', data)
      console.error('Error: Bad URL', status)
    })

}