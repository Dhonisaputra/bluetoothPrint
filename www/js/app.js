// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
// for form inputs)
cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

// Don't remove this line unless you know what you are doing. It stops the viewport
// from snapping when text inputs are focused. Ionic handles this internally for
// a much nicer keyboard experience.
cordova.plugins.Keyboard.disableScroll(true);

document.addEventListener('deviceready', function () {
// cordova.plugins.printer is now available
cordova.plugins.printer.check(function (available, count) {
    console.log(available, count)
});
}, false);
}
if(window.StatusBar) {
    StatusBar.styleDefault();
}


});
})
.controller('printer',[ '$scope', '$cordovaPrinter', function($scope,  $cordovaPrinter) {
    $scope.printers = [];
    $scope.paired = [];
    $scope.search = function()
    {
        console.log(bluetoothSerial)
        bluetoothSerial.discoverUnpaired((res)=>{
            console.log(res)
            $scope.printers = res;
            $scope.$apply();
        })
        bluetoothSerial.list(function(device) {
            $scope.paired = device;
            $scope.$apply();
        });
        bluetoothSerial.read(function(res){
            console.log(res)
        });
    }

    $scope.reload = function()
    {
/*var printerAvail = $cordovaPrinter.isAvailable()
console.log($cordovaPrinter, cordova.plugins.printer, printerAvail, cordova.plugins)
cordova.plugins.printer.check(function (available, count) {
console.log(available, count)
});
var doc = "<html> ... </html>"
$cordovaPrinter.print(doc)*/
console.log(cordova.plugins, bluetoothSerial)
}
$scope.testPrint = function(item)
{
    let printData="Test hello this is a test \n\n\n\n Hello Test 123 123 123\n\n\n"
    console.log(item)
    var a = bluetoothSerial.connect(item.address, function(con){
            console.log(con)
            bluetoothSerial.write(printData, dataz=>{
                console.log("WRITE SUCCESS",dataz);

            },errx=>{
                console.log("WRITE FAILED",errx);
            });
        let xyz= bluetoothSerial.subscribe('\n', data=>{
            console.log(data)
            bluetoothSerial.write(printData, dataz=>{
                console.log("WRITE SUCCESS",dataz);

                xyz.unsubscribe();
            },errx=>{
                console.log("WRITE FAILED",errx);
            });
        },err=>{
            console.log("CONNECTION ERROR",err);

        });
        
    })
}


$scope.disconnect = function(item)
{
    bluetoothSerial.disconnect(function(res){
        console.log(res)
    }, function(err){
        console.error(err)
    });
}
}])
