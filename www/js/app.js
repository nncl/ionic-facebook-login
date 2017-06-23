// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', [
    'ionic',
    'ngCordova',
    'ngOpenFB'
]);

app.constant('SETTINGS', {
    'FB_APP_ID': '<YOUR-APP-ID-HERE>'
});

app.run(function ($ionicPlatform, ngFB, SETTINGS) {
    ngFB.init({appId: SETTINGS.FB_APP_ID});

    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.controller('AppCtrl', function ($q, ngFB) {
    var vm = this;

    vm.doSignIn = function () {
        ngFB.login({scope: 'email'}).then(
            function (response) {
                if (response.status === 'connected') {
                    console.log('Facebook login succeeded');
                    console.log(JSON.stringify(response));

                    vm.doGetUserInfo().then(function (user) {
                        console.log(JSON.stringify(user));
                    }, function (error) {
                        console.error(JSON.stringify(error));
                    });

                } else {
                    console.error('error logging in');
                    console.log(JSON.stringify(response));
                }
            });
    };

    vm.doGetUserInfo = function () {
        var d = $q.defer();

        ngFB.api({
            path: '/me',
            params: {fields: 'id, name, email'}
        }).then(
            function (user) {
                d.resolve(user);
            },
            function (error) {
                d.reject(error);
            });

        return d.promise;
    };
});

