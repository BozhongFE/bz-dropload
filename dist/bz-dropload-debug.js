(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['bz-dropload'] = factory());
}(this, (function () { 'use strict';

  var that;

  var BzDropload = function BzDropload(ele, config) {
    this.ele = ele; // 选择器
    this.config = config;
    this.defaultConfig = {
      direction: 'pullup', // 设置方向 pulldown pullup
      updistance: 0, // 设置上拉触发距离
      downdistance: -50, // 设置下拉触发距离
    };
    this.handle = null; // 处理函数
    that = this;
    this._init();
  };

  // 处理 addEventListener 兼容性
  BzDropload.prototype._addEvent = function _addEvent (target, eventType, handle) {
    if (target.addEventListener) {
      target.addEventListener(eventType, handle);
    } else if (target.attachEvent) {
      target.attachEvent(("on" + eventType), handle);
    } else {
      target[("on" + eventType)] = handle;
    }
  };

  BzDropload.prototype._removeEvent = function _removeEvent (target, eventType, handle) {
    if (target.addEventListener) {
      target.removeEventListener(eventType, handle);
    } else if (target.removeEvent) {
      target.removeEvent(("on" + eventType), handle);
    } else {
      target[("on" + eventType)] = null;
    }
  };

  // 错误处理
  BzDropload.prototype._error = function _error (errorCode) {
    if (errorCode === 1) {
      throw new Error('The ele parameters are required by BzDropload');
    } else if (errorCode === 2) {
      throw new Error('The parameters type needs to be [object Object] by BzDropload');
    }
  };

  // 上拉加载
  BzDropload.prototype._coreUpScroll = function _coreUpScroll () {
    /**
     * 监听页面滚动事件
     * clientHeight 滚动可视区域高度
     * scrollTop 当前滚动位置
     * scrollHeight 整个滚动高度
    */
    var ele = that.ele;
      var handle = that.handle;
      var defaultConfig = that.defaultConfig;
    var scrollHeight;
    var scrollTop;
    var clientHeight;
    if (ele !== window && ele !== document) {
      scrollHeight = ele.scrollHeight;
      scrollTop = ele.scrollTop;
      clientHeight = ele.offsetHeight;
    } else {
      scrollHeight = document.documentElement.scrollHeight;
      scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    }

    if (clientHeight + scrollTop >= scrollHeight - defaultConfig.updistance) {
      handle && handle();
    }
  };

  // 下拉加载
  BzDropload.prototype._coreDownScroll = function _coreDownScroll () {
    var handle = that.handle;
      var defaultConfig = that.defaultConfig;

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop < defaultConfig.downdistance) {
      handle && handle();
    }
  };

  // 初始化参数
  BzDropload.prototype._init = function _init () {
    if (!this.ele) { this._error(1); }

    if (this.config && Object.prototype.toString.call(this.config) !== '[object Object]') { this._error(2); }
    if (this.config && Object.prototype.toString.call(this.config) === '[object Object]') {
      this.defaultConfig = Object.assign({}, this.defaultConfig, this.config);
    }
  };

  // 停止监听滚动事件
  BzDropload.prototype.cancelScroll = function cancelScroll () {
    if (this.defaultConfig.direction === 'pullup') {
      this._removeEvent(this.ele, 'scroll', this._coreUpScroll);
    } else {
      this._removeEvent(this.ele, 'scroll', this._coreDownScroll);
    }
  };

  // 开启监听滚动事件
  BzDropload.prototype.openScroll = function openScroll (handle) {
    this.handle = handle;
    if (this.defaultConfig.direction === 'pullup') {
      this._addEvent(this.ele, 'scroll', this._coreUpScroll);
    } else {
      this._addEvent(this.ele, 'scroll', this._coreDownScroll);
    }
  };

  return BzDropload;

})));
