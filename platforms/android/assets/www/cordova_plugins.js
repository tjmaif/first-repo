cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/jaeger.Html5Video/www/Html5Video.js",
        "id": "jaeger.Html5Video.Html5Video",
        "clobbers": [
            "plugins.html5Video"
        ]
    },
    {
        "file": "plugins/com.moust.cordova.videoplayer/www/videoplayer.js",
        "id": "com.moust.cordova.videoplayer.VideoPlayer",
        "clobbers": [
            "VideoPlayer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "jaeger.Html5Video": "1.2.1",
    "com.moust.cordova.videoplayer": "1.0.1",
    "cordova-plugin-splashscreen": "3.0.0-dev",
    "cordova-plugin-device": "1.0.2-dev"
}
// BOTTOM OF METADATA
});