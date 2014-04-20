// public/core.js

var macrovTodo = angular.module('macrovTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('/api/todos')
    .success(function(data) {
      $scope.todos = data;
      console.log('success: ' + data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.createTodo = function() {
    console.log('formData:' + $scope.formData);
    $http.post('/api/todos', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

  };

  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}