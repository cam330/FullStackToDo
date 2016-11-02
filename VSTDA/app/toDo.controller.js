(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', 'ToDoFactory'];

    /* @ngInject */
    function MainController($http, ToDoFactory) {
        var vm = this;
        vm.title = 'MainController';

        vm.todoArray = [];

        vm.id;
        vm.index;

        vm.options = [
	    { name: 'High', value: '1' }, 
	    { name: 'Medium', value: '2' }, 
	    { name: 'Low', value: '3' }
    ];

        activate();

        ////////////////

        function activate() {
            ToDoFactory.getTodos().then(function(response){
                vm.todoArray = response.data;
                console.log(vm.todoArray);
            });
            
        }

        vm.addText = function(toDoInput, option){
        	
        	ToDoFactory.addTodo(toDoInput, option).then(function(response){
                vm.todoArray.push(response.data);
                console.log(vm.todoArray);
            });
        }

        vm.editItem = function(item, priority, id, index){
            vm.changeButton = true;
            vm.id = id;
            vm.index = index;
            vm.toDoInput = item;
            vm.priority = vm.options[priority-1].value;
            console.log(item, priority, id);
        }

        vm.commitEdits = function(item, priority, id){
            vm.changeButton = false;
            console.log(item, priority, vm.id, vm.index);

            ToDoFactory.updateTodo(item, priority, vm.id).then(function(response){
                
                console.log(response);
                vm.todoArray.splice(vm.index, 1, response);
                console.log(vm.todoArray);
                //vm.todoArray.splice(vm.index, 0, response);
                
            });

        }

        vm.deleteItem = function(item, index){
            ToDoFactory.deleteTodo(item).then(function(response){
                console.log(index);
            });
            vm.todoArray.splice(index,1);
            console.log(vm.todoArray);

        }
    }
})();