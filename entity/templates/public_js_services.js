'use strict';

//<%= entityName %>s service used for <%= slugName %>s REST endpoint
angular.module('mean.<%= slugName %>s').factory('<%= entityName %>s', ['$resource', function($resource) {
    return $resource('<%= slugName %>s/:<%= slugName %>Id', {
        <%= slugName %>Id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);