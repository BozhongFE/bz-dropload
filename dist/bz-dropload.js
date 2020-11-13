!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self)["bz-dropload"]=e()}(this,function(){"use strict";function t(t,e){this.ele=t,this.config=e,this.defaultConfig={direction:"pullup",updistance:0,downdistance:-50},this.handle=null,this.timeout=null,(l=this)._init()}var l;return t.prototype._addEvent=function(t,e,o){t.addEventListener?t.addEventListener(e,o):t.attachEvent?t.attachEvent("on"+e,o):t["on"+e]=o},t.prototype._removeEvent=function(t,e,o){t.addEventListener?t.removeEventListener(e,o):t.removeEvent?t.removeEvent("on"+e,o):t["on"+e]=null},t.prototype._error=function(t){if(1===t)throw new Error("The ele parameters are required by BzDropload");if(2===t)throw new Error("The parameters type needs to be [object Object] by BzDropload")},t.prototype._coreUpScroll=function(){var t,e,o=l.ele,n=l.handle,i=l.defaultConfig;(o!==window&&o!==document?(t=o.scrollHeight,e=o.scrollTop,o.offsetHeight):(t=document.documentElement.scrollHeight,e=document.documentElement.scrollTop||document.body.scrollTop,document.documentElement.clientHeight||document.body.clientHeight))+e>=t-i.updistance&&(null!=this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){n&&n()},100))},t.prototype._coreDownScroll=function(){var t=l.handle,e=l.defaultConfig;(document.documentElement.scrollTop||document.body.scrollTop)<e.downdistance&&t&&t()},t.prototype._init=function(){this.ele||this._error(1),this.config&&"[object Object]"!==Object.prototype.toString.call(this.config)&&this._error(2),this.config&&"[object Object]"===Object.prototype.toString.call(this.config)&&(this.defaultConfig=Object.assign({},this.defaultConfig,this.config))},t.prototype.cancelScroll=function(){"pullup"===this.defaultConfig.direction?this._removeEvent(this.ele,"scroll",this._coreUpScroll):this._removeEvent(this.ele,"scroll",this._coreDownScroll)},t.prototype.openScroll=function(t){this.handle=t,"pullup"===this.defaultConfig.direction?this._addEvent(this.ele,"scroll",this._coreUpScroll):this._addEvent(this.ele,"scroll",this._coreDownScroll)},t});