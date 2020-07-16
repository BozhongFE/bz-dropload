# bz-dropload
## 开发需求

根据现有项目，频繁出现【上拉加载更多】和【下拉刷新】功能需求，所以把滚动事件做成一个插件，方便使用，提高开发效率。对于后期还有其他需求，在进行开发。

## 简单引用

> const bropload = new BzDropload(ele, config)

### 参数说明

> - ele 选择器（必填）
> - config 基本配置（选填）
>   - direction 设置方向（默认pullup）
>     - pullup 上拉
>     - pulldown 下拉
>   - updistance 设置上拉触发距离（默认0）
>   - downdistance 设置下拉触发距离（默认-50）

### 暴露方法

> - bropload.openScroll(callback) 
>   - 开启监听滚动事件
> - bropload.cancelScroll()
>   - 停止监听滚动事件

## Exmple

### html

``` html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .box {
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
  }
  ul {
    width:100%;
    height: 100%;
  }
  li {
    width: 100%;
    height: 5em;
    background-color: rebeccapurple;
    margin-bottom: 10px;
  }
  li:last-child {
    margin: 0;
  }
</style>

<div class="box">
  <ul id="js-scroll"></ul>
</div>
```

### seajs

``` js
seajs.use('../dist/bz-dropload-debug.js', function() {
  const dropload = new window['bz-dropload'](window);

  dropload.openScroll(() => {
    addLists({ limit: 2 });
  });

  /**
     * 添加数据
    */
  function addLists(options) {
    var ul = document.getElementById('js-scroll');
    for (var i = 0; i < options.limit; i += 1) {
      var li = document.createElement('li');
      li.innerText = i;
      ul.appendChild(li);
    }

    if (ul.childNodes.length > 12) {
      dropload.cancelScroll();
    }
  }

  addLists({ limit: 10 });
});
```

### requirejs

```js
require(['../dist/bz-dropload.js'], function (bzDropload) {
  const dropload = new bzDropload(window);
  dropload.openScroll(() => {
    addLists({ limit: 2 });
  });

  /**
     * 添加数据
    */
  function addLists(options) {
    var ul = document.getElementById('js-scroll');
    for (var i = 0; i < options.limit; i += 1) {
      var li = document.createElement('li');
      li.innerText = i;
      ul.appendChild(li);
    }

    if (ul.childNodes.length > 12) {
      dropload.cancelScroll();
    }
  }

  addLists({ limit: 10 });
});
```

