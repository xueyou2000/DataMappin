(function() {

  var DataMappin = {

    // 绑定数据数组 -> 视图元素数组
    bind: function(wrap, elements, data, fn) {
      // 已绑定计数
      var count = 0;
      // 插入视图
      var enters = $();
      // 更新数组
      var updates = $();
      // 离开视图
      var exits = $();
    },


    // 顺序绑定
    bindForOrder: function(wrap, elements, data) {
      var map = {};
      var enter = $();
      var update = $();
      var exit = $();


      // 节点集合长度
      var nodeSize = elements.length;
      // 数据集合长度
      var dataSize = data.length;

      if (dataSize > 0) {
        update = elements.slice(0, dataSize);
        update.each(function(i) {
          map[i] = {
            node: $(this),
            data: data[i]
          };
          $(this).data('index', i);
        });
      }

      if (nodeSize > dataSize) {
        exit = elements.slice(dataSize);
        exit.each(function(i) {
          var indexKey = i + dataSize;
          map[indexKey] = {
            node: $(this),
            data: null
          };
          $(this).data('index', indexKey);
        });
      } else {
        enter = DataMappin.converToNodes(data.slice(nodeSize));
        enter.each(function(i) {
          var indexKey = i + nodeSize;
          map[indexKey] = {
            node: $(this),
            data: data[indexKey]
          };
          $(this).data('index', indexKey);
        });
      }

      // console.log(map);
      // console.log('enter', enter);
      // console.log('update', update);
      // console.log('exit', exit);
      // console.log(update.length + enter.length, '=============================', dataSize);

      var selection = {
        enter: function(fn) {
          wrap.append(enter);
          enter.each(function() {
            var i = $(this).data('index');
            var node = fn.call(this, map[i].data, i).data('index', i);
            $(this).replaceWith(node);
          });
          return selection;
        },
        update: function(fn) {
          update.each(function() {
            var i = $(this).data('index');
            fn.call(this, map[i].data, i);
          });
          return selection;
        },
        exit: function(fn) {
          exit.each(function() {
            fn.call(this);
          });
          return selection;
        },
      };

      return selection;








    },


    // 数据集合转占位符节点
    converToNodes: function(data) {
      var enterEle = $();
      data.forEach(function(d, i) {
        // 创建占位符
        var node = $('<div></div>');
        enterEle = enterEle.add(node);
      });
      return enterEle;
    }








  };










  // 导出
  window.DataMappin = DataMappin;

})();