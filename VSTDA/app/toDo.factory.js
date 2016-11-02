(function() {
    'use strict';

    angular
        .module('app')
        .factory('ToDoFactory', ToDoFactory);

    ToDoFactory.$inject = ['$http'];

    /* @ngInject */
    function ToDoFactory($http) {
        var service = {
            getTodos: getTodos,
            addTodo: addTodo,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo
        };
        var URL = 'http://localhost:51346/api/todoes';
        return service;

        ////////////////

        function getTodos(item, priority) {
            return $http({
                method: 'GET',
                url: URL,
                header:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                return response;
            })
        }

        function addTodo(toDoInput, priority) {

        	return $http({
        		method: 'POST',
        		url: URL,
                header:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
        		// data: $.param({
          //          description: toDoInput,
          //          priority: priority
          //      })
                data:{
                    Item: toDoInput,
                    Priority: priority
                }

        	}).then(function(response){
                console.log(response);
        		return response;
        	});

        }

        function updateTodo(item, priority, id){

            console.log(item, priority, id);
            return $http({
                method: 'PUT',
                url: URL+'/'+id,
                header:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data:{
                    toDoEntryId: id,
                    item: item,
                    priority: priority
                }
            }).then(function(response){

                console.log(response.config.data);
                return response.config.data;
            });
        }

        function deleteTodo(toDoEntryId){

            return $http({
                method: 'DELETE',
                url: URL+'/'+toDoEntryId,
                header:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                // data:{
                //     toDoEntryId: 1
                // }
            }).then(function(response){
                console.log(response);
                return response;
            });
        }
    }
})();