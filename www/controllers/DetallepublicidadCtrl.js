angular.module('app')

.controller('DetallepublicidadCtrl', function($scope, $state,$http,maincontrol,$cordovaCamera,$cordovaFileTransfer,$cordovaProgress,$timeout, $ionicPopup){

  $scope.id = $state.params.id ; 
  
  $scope.photoReady = false;
  $scope.uploadvolante = false ;
  $scope.celular = maincontrol.get('celular');
  $scope.email = maincontrol.get('email');
  $scope.id_user = maincontrol.get('id');
  $scope.photo = "";
  $scope.marcoimagen = false;
  $scope.date = new Date();
  console.log($scope.date)
  $scope.progress = false;
  
  

  detallepublicidad($scope,$http);


  function detallepublicidad (){

    $http.get("https://api-guillospy92.c9users.io/public/verdetallepublicdad/"+$scope.id)
    .success(function(response){

      $scope.publicidad = response.publicidad;

      if (response.volante == 1) {
        $scope.volantes = "ya se genero un volante"
        $scope.photos = response.volantes.image;
        $scope.marcoimagen = true;
        


        

      };

      if (response.volante !== 1) {
        $scope.volantes = "no se ha generado un volante" 
        $scope.uploadvolante = true;

        
      };
    })

    .error(function(response){

      $ionicPopup.confirm({
        title: "error",
        content: "error en el servidor"
      })
    });

  }

  $scope.getPhoto = function(source){
   var objConfig = {
    quality : 100,
    destinationType : Camera.DestinationType.FILE_URI,
    sourceType : (source === 'camera') ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.SAVEDPHOTOALBUM,
    saveToPhotoAlbum : false,
    popoverOptions :new CameraPopoverOptions(300, 300, 200, 200, Camera.PopoverArrowDirection.ARROW_ANY)
  };

  console.log(objConfig);
  $cordovaCamera.getPicture(objConfig).then(function(imageData){
    $scope.photo =imageData;
    $scope.photoReady = true;
  },function(error){
    console.log(error);
    $scope.photoReady = false;
  });
};

$scope.uploadPhoto = function(image){
  $scope.progress = true;
  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName = $scope.id_user+"imagen"+$scope.date+".png";
  options.mimeType="image/jpeg";
  var params = new Object();
  params.user_id = $scope.id_user;
  params.campania_id = $scope.id ;
  options.params = params;
  options.chunkedMode = false;
  options.headers = {
   Connection: "close"
 };




 $cordovaFileTransfer.upload( encodeURI('https://api-guillospy92.c9users.io/public/guardarvolantes'),image,options)
 .then(function(r){
   
   $state.go('app.ver');
 },function(error){
    $ionicPopup.confirm({
        title: "error",
        content: "error en el servidor"
      })
 },
 function(progress){
   $timeout(function () {
    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
  });
   

 });
};



})