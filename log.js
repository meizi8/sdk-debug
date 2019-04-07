var SDK = window.SDK || {};
SDK.debug = SDK.debug || {};

(function (sdk, win) {
    var upload = false; //将来开发，用于控制是否将日志上传后台
    var print = false;
    var canDoPrint = {};
    var sdkConsole = console;

    function PrefixInteger(num, length) { //不足填充0
        return (Array(length).join('0') + num).slice(-length);
    };

    function isGrounp(flag) {
        return canDoPrint[flag];
    }

    var debug = {
        handler: function () {
            let logArr = Array.prototype.slice.apply(arguments);
            if(canDoPrint.Flag){
                logArr[0] = `[${logArr[0]}]`;
            }else{
                logArr.shift();
            }
            if (canDoPrint.timestamp) {
                const time = new Date();
                var year = PrefixInteger(time.getFullYear(), 4);
                var mon = PrefixInteger(time.getMonth() + 1, 2);
                var date = PrefixInteger(time.getDate(), 2);
                var hour = PrefixInteger(time.getHours(), 2);
                var min = PrefixInteger(time.getMinutes(), 2);
                var sec = PrefixInteger(time.getSeconds(), 2);
                var Mse = PrefixInteger(time.getMilliseconds(), 3);
                logArr.unshift(`${year}-${mon}-${date} ${hour}:${min}:${sec} ${Mse} `);
            }
            return logArr;
        },
        log: function () {
            const logArr = this.handler.apply(this,arguments);
            sdkConsole.log.apply(this, logArr);
        },
        error: function () {
            const logArr = this.handler.apply(this,arguments);
            sdkConsole.error.apply(this, logArr);
        }
    }

    win.SDK_Debug = function (up, pr) {
        if (typeof up === 'boolean') {
            upload = up;
        }
        
        if (typeof pr === 'boolean') {
            print = pr;
        } else if (typeof pr === 'object') {
            for(var obj in pr){
                canDoPrint[obj] = pr[obj] || false;
            }
        }
    };

    sdk.debug.log = function () {
        if (print || isGrounp(arguments[0])) {
            debug.log.apply(debug, arguments);
        }
    };
    sdk.debug.error = function () {
        if (print || isGrounp(arguments[0])) {
            debug.error.apply(debug, arguments);
        }
    };
    sdk.debug.init = function (flag) {
        return {
            log: function () {
                let logArr = Array.prototype.slice.apply(arguments);
                logArr.unshift(flag);
                sdk.debug.log.apply(null,logArr);
            },
            
            error: function () {
                let logArr = Array.prototype.slice.apply(arguments);
                logArr.unshift(flag);
                sdk.debug.error.apply(null,logArr);
            },
        }
    };

})(SDK, window);