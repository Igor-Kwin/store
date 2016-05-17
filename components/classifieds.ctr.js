(function(){
  "user strict"

  angular
  .module("ngClassifieds")
  .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){

  classifiedsFactory.getClassifieds().then(function(classifieds) {
    $scope.classifieds = classifieds.data;
  });

  var contact = {
    name: "Ryan Chenkie",
    phone: "(555)555-555",
    email: "igor24@yandex.ru"
  }


  $scope.openSidebar = function() {
    $mdSidenav('left').open();
  }

  $scope.closeSidebar = function() {
    $mdSidenav('left').close();
  }

   $scope.saveClassified = function(classified){
     if(classified){
       classified.contact = contact;
        $scope.classifieds.push(classified);
        $scope.classified = {};
        $scope.closeSidebar ();
        showToast("Saved");
     }
   }


   $scope.editClassified = function(classified){
     $scope.editing = true;
     $scope.openSidebar();
     $scope.classified = classified;
   }

   $scope.saveEdit = function(){
     $scope.editing = false;
     $scope.classified = {};
     $scope.closeSidebar();
       showToast("Edit Saved");
   }

   $scope.deleteClassified = function(classified) {
     var index = $scope.classifieds.indexOf(classified);
    $scope.classifieds.splice(index, 1);
   }



   function showToast(message) {
     $mdToast.show(
          $mdToast.simple()
             .textContent(message)
             .position('top, right')
             .hideDelay(2000)
     );
   }

   function getCategories(classifieds){

     var categories = [];

     angular.forEach(classifieds, function(item){
        angular.forEach(item.categories, function(category) {
          categories.push(category);
        });
     });

     return _.uniq(categories);
   }


  });
})();
