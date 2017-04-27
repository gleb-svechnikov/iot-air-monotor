import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor'
import angularMeteor from 'angular-meteor';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session'
import { Projects } from '/imports/api/projects.js';
import { Accounts } from 'meteor/accounts-base';
import { Logs } from '/imports/api/logs.js';
import '/imports/startup/accounts-config.js';


var prototypeData = {};
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});

function onReady() {
    angular.bootstrap(document, ['cms']);
};

angular.module('cms', [angularMeteor, ngSanitize, uiRouter, 'accounts.ui','zenith']);



angular.module('cms').config(function($stateProvider, $urlRouterProvider, $locationProvider, svgLoaderProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/main");
    svgLoaderProvider.setUrlPath('http://ui.intermedia.net/Zenith/dist/icons/symbol/svg/sprite.svg');

    $stateProvider
    .state('main', {
        url: "/main",
        templateUrl: "client/views/main.html"
    })
      .state('log', {
          url: "/log",
          templateUrl: "client/views/log.html"
      });
});

angular.module('cms').controller('mainCtrl', ['$scope','$rootScope', '$state', '$timeout', '$meteor','$sce', '$q', '$templateCache','$filter','$timeout', 'searchFilter', 'clientDataSource',
function ($scope, $rootScope, $state, $timeout, $meteor, $sce, $q, $templateCache, $filter, $timeout, searchFilter, clientDataSource) {
    var ctrl = this;
    ctrl.notifications = {
        saveCanges: false
    };
    ctrl.pageState = {
        isUpdating: false
    };
    $scope.$meteorSubscribe('projects');
    var currentUser, accountID;
    var favoritesProjects = [];
    ctrl.favorites = [];
    Deps.autorun(function() {
        currentUser = Meteor.user();
        accountID = Meteor.userId();
        // Meteor.loggingIn();
        
        ctrl.projectsTree = [];
        if(currentUser == null && accountID == null) { getData(); }
        // we need this to prevent double data executed on page loading
        if (angular.isDefined(currentUser) && currentUser != null) { getData(); }
    });

    function getData () {
        var logs = $meteor.collection(function() {
            return Logs.find();
        });
        ctrl.logs = new clientDataSource(logs);
        ctrl.logs.sortKey = 'date';
        ctrl.logs.sortDesc = true;
        $timeout(function(){
            if(!currentUser) { return; }
            getFavorites();
        });
        $scope.$meteorSubscribe("users-subscription").then(function(){});
        
        ctrl.projectsTree = [];
        //$scope.$watch('ctrl.projects', function (n, o){
        //    if(n != o && n.length > 0 && o.length > 0) {
        //        getProjectsTree();
        //    }
        //}, true);
        getProjectsTree();
    };

    function getProjectsTree () {
        ctrl.projects = $meteor.collection(function() {return Projects.find({});});
        var rootProjects = $filter('filter')(ctrl.projects, {parent: null});
        ctrl.rootProjects = $filter('orderBy')(rootProjects, 'name');
        var i = 1;
        var lavel = 1;
        ctrl.subProjects = [];
    
        angular.forEach(ctrl.rootProjects, function (item) {
            if (item.order[0] !== i) {
                
            }
            Projects.update(item._id, {
                $set: {
                    order: [i],
                    lavel: lavel,
                    hierarchy: i * 10000000000000
                }
            });
            i++;
            if(item.sublinks.length > 0) {
                getSublinks(item, lavel);
            }
        });
        ctrl.projectsTree = ctrl.rootProjects.concat(ctrl.subProjects);
        console.log('proj tree');
    }

    function getSublinks (parent, lavel) {
        //var isParentRoot = parent.parent == null;
        lavel++;
        var increment = 0;
        switch(lavel) {
            case 2: increment = 100000000000;
                break;
            case 3: increment = 1000000000;
                break;
            case 4: increment = 10000000;
                break;
            case 5: increment = 100000;
                break;
            case 6: increment = 1000;
                break;
            case 7: increment = 10;
                break;
        }
        parent.sublinks.forEach(function(item, i, arr) {
            if (ctrl.projects.some(function(obj){return obj._id == item.id})) { 
                ctrl.projects.map(function(value) {
                    if(value._id == item.id) {
                        var order = angular.copy(parent.order);
                        order.push(i + 1);
                        if(value.order != order) {
                            Projects.update(value._id, {
                                $set: {
                                    order: order,
                                    lavel: lavel,
                                    hierarchy: lavel * increment + parent.hierarchy
                                }
                            });
                        }
                        ctrl.subProjects.push(value);
                        if (value.sublinks.length > 0) {
                            getSublinks(value, lavel);
                        }
                    }
                });
            }
        });
    }
    function setSublinksOrder (parent) {
        if(parent.sublinks.length > 0) {
            parent.sublinks.forEach(function(item, i, arr) {
                ctrl.projectsTree.map(function(value) {
                    if(value._id == item.id) {
                        var increment;
                        switch((parent.lavel+ 1)) {
                            case 2: increment = 100000000000;
                                break;
                            case 3: increment = 1000000000;
                                break;
                            case 4: increment = 10000000;
                                break;
                            case 5: increment = 100000;
                                break;
                            case 6: increment = 1000;
                                break;
                            case 7: increment = 10;
                                break;
                        }
                        var order = angular.copy(parent.order);
                        order.push(i + 1);
                        Projects.update(value._id, {
                            $set: {
                                order: order,
                                lavel: parent.lavel + 1,
                                hierarchy: value.lavel* increment + parent.hierarchy
                            }
                        });
                        setSublinksOrder(value);
                    }
                });
            });
        }
    }
    function update () {
        if(ctrl.searchString.length > 0) {
            $timeout(function () {
                ctrl.getSearchResults();
            }, 100);
        }
    }
    ctrl.getSearchResults = function (param) {
        ctrl.projects = $meteor.collection(function() {
            return Projects.find({}, {sort: {hierarchy: 1}});
        });
        ctrl.projectsTree = searchFilter(ctrl.projects, ctrl.searchString);
        ctrl.projectsTree = $filter('orderBy')(ctrl.projectsTree, 'hierarchy');
        if(ctrl.favorites.length > 0){
            $timeout(function () {
                getFavorites();
            }, 100);
        }
    };
    function getFavorites () {
        var favorites = (Meteor.users.findOne({_id: currentUser._id}).profile) ? Meteor.users.findOne({_id: currentUser._id}).profile.favorites : [];
        if(favorites.length > 0) {
            ctrl.favorites = [];
            for (var i = 0;  i < favorites.length; i++) {
                var item = favorites[i];
                var obj = Projects.findOne(item._id);
                if(!obj.removed) {
                    ctrl.favorites.push(obj);
                }
                ctrl.projects.forEach(function(proj) {
                    if(proj._id == item._id) {
                        proj.$isFavorite = true;
                    }
                });
            }
        }
    }
    ctrl.sub = '';
    ctrl.searchString = '';
    ctrl.pageState = {
        deletedIsShown: false
    };
    ctrl.newPrototype = {};
    ctrl.showModal = false;
    ctrl.actionDialog = function (prototypeData, dialogType) {
        ctrl.showModal = true;
        switch (dialogType) {
            case 'add':
                ctrl.modalAction = "Add";
                ctrl.sub = '';
                ctrl.newPrototype.name = null;
                ctrl.newPrototype.link = null;
                ctrl.newPrototype.parent = null;
                break;
            case 'sub':
                ctrl.tempParent = [JSON.parse(angular.toJson(Projects.findOne({_id: prototypeData._id })))];
                ctrl.newPrototype.parent = ctrl.tempParent[0]._id;
                ctrl.modalAction = "Add";
                ctrl.sub = 'sub-';
                ctrl.oldProject = Projects.findOne({_id: prototypeData._id });
                ctrl.oldProjectId = Projects.findOne({_id: prototypeData._id })._id;
                ctrl.newPrototype.name = null;
                ctrl.newPrototype.link = null;
                break;
            case 'edit':
                ctrl.sub = '';
                ctrl.modalAction = "Update";
                ctrl.oldProject = Projects.findOne({_id: prototypeData._id });
                ctrl.oldProjectId = Projects.findOne({_id: prototypeData._id })._id;
                ctrl.newPrototype = angular.copy(prototypeData);
                if(ctrl.newPrototype.parent != null  && ctrl.newPrototype.parent != [] ) {
                    ctrl.tempParent = [JSON.parse(angular.toJson(Projects.findOne({_id: ctrl.newPrototype.parent })))];
                    ctrl.newPrototype.parent = ctrl.tempParent[0]._id;
                } else {
                    ctrl.tempParent = [];
                }

                ctrl.newPrototypeOrigin = angular.copy(ctrl.newPrototype);
                break;
        }
        if (dialogType == 'add') {
            return;
        }
        ctrl.filteredProjects = $filter('filter')(ctrl.projects, {removed: false, _id: "!"+prototypeData._id});
          
        if(prototypeData.parent != null) {
            ctrl.filteredProjects = $filter('filter')(ctrl.filteredProjects, {_id: "!"+prototypeData.parent});
        }
        getFilteredProjects(prototypeData.sublinks);
    };
    function getFilteredProjects (sublinks) {
        if(sublinks.length > 0) {
            sublinks.forEach(function (item, i, arr) {
                ctrl.filteredProjects = $filter('filter')(ctrl.filteredProjects, { _id: "!"+item.id});
                getFilteredProjects(Projects.findOne(item.id).sublinks);
            });
        }
        ctrl.filteredProjects = $filter('orderBy')(ctrl.filteredProjects, 'name');
    }
    ctrl.getOrderMargin = (project) => {
        if (angular.isUndefined(project.order)) { return; }
        // adds left margin for hierarchical view
        if(ctrl.searchString) {
            return project.$marginOrder*20 + 'px';
        }
        return (project.order.length-1)*20 + 'px';
    };
    ctrl.setParentId = function () {
        if(ctrl.tempParent.length > 0) {
            ctrl.newPrototype.parent = ctrl.tempParent[0]._id;
        } else {
            ctrl.newPrototype.parent = null;
        }
    };
    ctrl.addFormNotChanged = function () {
        return angular.equals(ctrl.newPrototypeOrigin, ctrl.newPrototype);
    };

    ctrl.loadData = function functionName() {
        update();
        if(ctrl.searchString.length == 0) {
            getData(); //load fresh new data
        }
    };
    ctrl.remove = (data) => {
        Projects.update(data._id, {
            $set: {
                removed: true
            }
        }, function (error, id) {
            // Set 'hasRemoved' property to parent
            if(data.parent != null) {
                var parentProject = Projects.findOne(data.parent);
                var subitems = parentProject.sublinks;
                var hasRemoved = true;
                Projects.update(parentProject._id, {
                    $set: {
                        hasRemoved: hasRemoved
                    }
                });
            }
        });
        Logs.insert({
            id: data._id,
            name: data.name,
            link: data.link,
            parent: data.parent,
            action: 'removed',
            author: accountID,
            date: new Date()
        });
        update();
    };
    ctrl.restore = function (data) {
        Projects.update(data._id, {
            $set: {
                removed: false
            }
        }, function (error, id) {
            // Set 'hasRemoved' property to parent
            if(data.parent != null) {
                var parentProject = Projects.findOne(data.parent);
                var subitems = parentProject.sublinks;
                var hasRemoved = false;
                subitems.forEach(function(item, i, arr) {
                    var itemObj = Projects.findOne(item.id);
                    if (itemObj.removed) {
                        hasRemoved = true;
                    }
                });
                Projects.update(parentProject._id, {
                    $set: {
                        hasRemoved: hasRemoved
                    }
                });
            }
        });
        Logs.insert({
            id: data._id,
            name: data.name,
            link: data.link,
            parent: data.parent,
            action: 'restored',
            author: accountID,
            date: new Date()
        });
        update();
    };
    ctrl.submitDialog = (type) => {
        if(ctrl.addForm.$invalid) { return; }
        if (type == "Add") {
            if (ctrl.sub === 'sub-') {
                var parentProjectId = ctrl.newPrototype.parent;
                ctrl.updatePrototype(parentProjectId, ctrl.newPrototype, 'Sub');
            }
            else {
                ctrl.updatePrototype(null, ctrl.newPrototype, type);
            }
        }
        else {
            ctrl.updatePrototype(ctrl.oldProjectId, ctrl.newPrototype, type);
        }
        ctrl.showModal = false;
    };
    ctrl.updatePrototype = (oldProjectId, newProject, type) => {
        var oldProjectHelper = Projects.findOne({_id: oldProjectId });
        switch (type) {
            case 'Add':
                Projects.insert({
                    name: newProject.name,
                    link: newProject.link,
                    parent: newProject.parent,
                    removed: false,
                    author: accountID,
                    date: new Date(),
                    order: [],
                    sublinks: []
                });
                Logs.insert({
                    id: newProject._id,
                    name: newProject.name,
                    link: newProject.link,
                    parent: null,
                    action: 'added',
                    author: accountID,
                    date: new Date()
                });
                getProjectsTree();
                break;
            case 'Sub':
                var temp_id = '';
                Projects.insert(
                  {
                      name: newProject.name,
                      link: newProject.link,
                      parent: newProject.parent,
                      removed: false,
                      author: accountID,
                      date: new Date(),
                      order: [],
                      sublinks: []
                  },
                  function(error, id){
                      temp_id = id;
                      if (!error) {
                          Projects.update(newProject.parent,
                            {
                                $push:
                                {
                                    sublinks: {id: id}
                                }
                            },
                            function(error){
                                if (!error) {
                                    getProjectsTree();
                                }
                            }
                          )
                      }
                  }
                );
                Logs.insert({
                    id: newProject._id,
                    name: newProject.name,
                    link: newProject.link,
                    parent: newProject.parent,
                    action: 'added',
                    author: accountID,
                    date: new Date()
                });
                break;
            case 'Update':
                var parentProjectId = ctrl.newPrototype.parent;
                var oldParentProjectId = Projects.findOne(oldProjectId).parent;
                Projects.update(newProject._id, {
                    $set: {
                        name: newProject.name,
                        link: newProject.link,
                        parent: parentProjectId,
                        removed: false,
                        author: accountID,
                        date: new Date(),
                    }
                }, function (error, id) {
                    temp_id = id;
                    if (!error) {
                        if (angular.equals(parentProjectId, oldParentProjectId)) {
                            getProjectsTree();
                            return false;
                        }
                        if(parentProjectId != null) {
                            // Set sublink to parent item
                            Projects.update(newProject.parent, {
                                $push: {
                                    sublinks: {id: newProject._id}
                                }
                            }, function (error, id) {
                                // Remove sublink from parent item
                                if(oldParentProjectId != null) {
                                    var oldParentProject = Projects.findOne(oldParentProjectId);
                                    var subitems = oldParentProject.sublinks;
                                    subitems.forEach(function(item, i, arr) {
                                        if(item.id == newProject._id) {
                                            arr.splice(i, 1);
                                        }
                                    });
                                    Projects.update(oldParentProject._id, {
                                        $set: {
                                            sublinks: subitems
                                        }
                                    });
                                }
                                // Update subitems order
                                ctrl.projectsTree.map(function(item) {
                                    if(item._id == parentProjectId) {
                                        setSublinksOrder(item);
                                    }
                                });
                            });
                        } else {
                            // Remove sublink from parent item
                            var oldParentProject = Projects.findOne(oldParentProjectId);
                            var subitems = oldParentProject.sublinks;
                            subitems.forEach(function(item, i, arr) {
                                if(item.id == newProject._id) {
                                    arr.splice(i, 1);
                                }
                            });
                            Projects.update(oldParentProject._id, {
                                $set: {
                                    sublinks: subitems
                                }
                            });
                            getProjectsTree();
                        }
                    }
                });
                var action = (ctrl.newPrototypeOrigin.name == ctrl.newPrototype.name && 
                    ctrl.newPrototypeOrigin.link == ctrl.newPrototype.link &&
                    ctrl.newPrototypeOrigin.parent != ctrl.newPrototype.parent) ? 'moved' : 'updated';
                Logs.insert({
                    id: newProject._id,
                    name: newProject.name,
                    link: newProject.link,
                    parent: parentProjectId,
                    action: action,
                    author: accountID,
                    date: new Date()
                });
                break;
            default:
                Logs.insert({
                    id: newProject._id,
                    name: newProject.name,
                    link: newProject.link,
                    parent: null,
                    action: 'updated',
                    author: accountID,
                    date: new Date()
                });
                break;
        }
        update();
        ctrl.notifications.saveCanges = true;
    };


    ctrl.favoriteAction = function (data)  {
        var favObject = {
            _id: data._id
        }
            
        if (data.$isFavorite) {
            ctrl.removeFavorite(data);
            return;
        }
        Meteor.users.update({_id:currentUser._id}, { $push: {'profile.favorites' : favObject} });
        if(ctrl.searchString.length > 0) {
            $timeout(function () {
                ctrl.getSearchResults();
            }, 0);
        }
    };

    ctrl.removeFavorite = (item) => {
        for (var i = 0; i < ctrl.favorites.length; i++) {
            if (ctrl.favorites[i]._id === item._id) {
                ctrl.favorites.splice(i, 1);
            }
        };
        var favorites = angular.copy(ctrl.favorites);
        Meteor.users.update({_id:currentUser._id}, {
            $set:{
                "profile":{
                    "favorites": favorites
                }
            }
        });
        if(ctrl.searchString.length > 0) {
            $timeout(function () {
                ctrl.getSearchResults();
            }, 0);
        }
    };
    ctrl.hideItem = (hidden) => {
        return (hidden && !ctrl.pageState.deletedIsShown);
    };

    ctrl.showDeleted = function () {
        ctrl.pageState.deletedIsShown = true;
        update();
        if(ctrl.searchString.length == 0) {
            getData(); //load fresh new data
        }
    };
    ctrl.hideDeleted = function () {
        ctrl.pageState.deletedIsShown = false;
        update();
        if(ctrl.searchString.length == 0) {
            getData(); //load fresh new data
        }
    };

    /* D'n'D*/
    ctrl.sortableOptions = {
        placeholder: 'sortable-placeholder',
        cancel: ".s-disabled",
        stop: function (e, ui) {
            //ctrl.updateProjectsCollection(ctrl.projects);
            $('.prototypes-list .item').each(function(i){
                var id = $(this).attr('data-id');
                Projects.update(id, {$set:{order:i+1}})
            });

        }
    };
    ctrl.updateProjectsCollection = function (arr) {
        for(var i = 0; i < arr.length; i++) {
            Projects.update(arr[i]._id, {
                $set: {
                    order: i
                }
            });
        }
    };


    /* Logs */
    if($state.is('main')) return;
      
    ctrl.getAuthor = function (log) {
        var userObj = Meteor.users.findOne(log.author);
        if(angular.isUndefined(userObj)) return log.author;
        return log.author == accountID ? 'you' : userObj.username;
    };
    ctrl.getParent = function (log) {
        if(log.parent == null) return;
        var parentObj = Projects.findOne(log.parent);
        var text = log.action == 'removed' ? 'from ' : 'to ';
        return text + parentObj.name;
    };

}
]);
angular.module('cms').filter('highlight',function($sce){
    return function(text,phrase){
        if(phrase) {
            text = text.replace(new RegExp('('+phrase+')','gi'), '<mark class="highlighted">$1</mark>');
        }
        return $sce.trustAsHtml(text);
    }
});
angular.module('cms').filter('search',function(){
    return function(array, input){
        var output = [];
        var searchOutput = [];
        array.forEach(function(value, key){
            if ((value.name.includes(input) || value.name.toLowerCase().includes(input)|| value.name.toUpperCase().includes(input))) { 
                // fist options case sensitive, second for lower case only, third for uppercase
                output.push(value);
            }
        });
        
        if(input.length != 0) { 
            searchOutput = angular.copy(output);

            output.forEach(function(item, i, arr) {
                //console.log('item', item);
                getSearchSublinks(item.sublinks);
            });

            function getSearchSublinks (sublinks) {
                if(sublinks.length > 0) {
                    sublinks.forEach(function(item, i, arr) {
                        var value = Projects.findOne(item.id);
                        if (output.some(function(obj){return obj._id == item.id})) { return; }
                        searchOutput.push(value);
                        getSearchSublinks(value.sublinks);
                    });
                }
            }

            // get parents
            searchOutput.forEach(function (item, i, arr) {
                var helper = {};
                var parentsArr = [];
                var newOrder = 0;
                helper = getParent(item, parentsArr, newOrder);
                item.$parentsArr = helper.parentsArr;
                item.$marginOrder = helper.newOrder;
            });
            
            function getParent (item, parentsArr, newOrder) {
                if(item.parent != null) {
                    var condition = searchOutput.some(function(obj){
                        return obj._id == item.parent;
                    });
                    
                    if(!condition) {
                        var parentObj = Projects.findOne(item.parent);
                        parentsArr.unshift(parentObj.name);
                        getParent(parentObj, parentsArr);
                    } else {
                        setNewOrder(item, newOrder);
                        function setNewOrder (item) {
                            if(item.parent != null) {
                                if(searchOutput.some(function(obj){return obj._id == item.parent})) {
                                    newOrder++;
                                    var parentObj = Projects.findOne(item.parent);
                                    setNewOrder(parentObj);
                                }
                            }
                        }
                        item.$marginOrder = newOrder;
                    }
                }
                return {parentsArr: parentsArr, newOrder: newOrder};
            }
        }
        return searchOutput.length > 0 ? searchOutput : output;
    }
});
