var SDK = this.SDK || {};
SDK.debug = SDK.debug || {};

;(function (sdk) {
    var debug = sdk.debug.init('video'); //定义video日志打印模块
    
    setTimeout(() => {
        
        debug.log('这是video.js的正常日志信息');
        debug.error('这是video.js的错误信息');
    }, 0);

})(SDK)