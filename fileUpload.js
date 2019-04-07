var SDK = this.SDK || {};
SDK.debug = SDK.debug || {};    

;(function (sdk) {
    
    var debug = sdk.debug.init('fileUpload'); //定义video日志打印模块
    
    setTimeout(() => {
        
        debug.log('这是video模块的日志');
        debug.error('这是video模块的错误信息');
    }, 0);

})(SDK);