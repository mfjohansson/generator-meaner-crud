'use strict';

angular.module('mean.<%= slugName %>s').controller('<%= entityName %>sController', ['$scope', '$stateParams', '$location', 'Global', '<%= entityName %>s', function ($scope, $stateParams, $location, Global, <%= entityName %>s) {
    $scope.global = Global;

    $scope.create = function() {
        var <%= slugName %> = new <%= entityName %>s({
            title: this.title,
            content: this.content
        });
        <%= slugName %>.$save(function(response) {
            $location.path('<%= slugName %>s/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(<%= slugName %>) {
        if (<%= slugName %>) {
            <%= slugName %>.$remove();

            for (var i in $scope.<%= slugName %>s) {
                if ($scope.<%= slugName %>s[i] === <%= slugName %>) {
                    $scope.<%= slugName %>s.splice(i, 1);
                }
            }
        }
        else {
            $scope.<%= slugName %>.$remove();
            $location.path('<%= slugName %>s');
        }
    };

    $scope.update = function() {
        var <%= slugName %> = $scope.<%= slugName %>;
        if (!<%= slugName %>.updated) {
            <%= slugName %>.updated = [];
        }
        <%= slugName %>.updated.push(new Date().getTime());

        <%= slugName %>.$update(function() {
            $location.path('<%= slugName %>s/' + <%= slugName %>._id);
        });
    };

    $scope.find = function() {
        <%= entityName %>s.query(function(<%= slugName %>s) {
            $scope.<%= slugName %>s = <%= slugName %>s;
        });
    };

    $scope.findOne = function() {
        <%= entityName %>s.get({
            <%= slugName %>Id: $stateParams.<%= slugName %>Id
        }, function(<%= slugName %>) {
            $scope.<%= slugName %> = <%= slugName %>;
        });
    };
}]);