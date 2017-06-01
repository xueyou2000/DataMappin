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
      // 集合
      var enter = $();
      var update = $();
      var exit = $();

      // 节点集合长度
      var nodeSize = elements.length;
      // 数据集合长度
      var dataSize = data.length;

      if (dataSize > 0) {
        update = elements.slice(0, dataSize);
        DataMappin.nodesBindData(update, 0, data);
      }

      if (nodeSize > dataSize) {
        exit = elements.slice(dataSize);
      } else {
        enter = DataMappin.converToNodes(data.slice(nodeSize));
        DataMappin.nodesBindData(enter, nodeSize, data);
      }


      var selection = {
        enter: function(fn) {
          wrap.append(enter);
          var nodes = DataMappin.each(enter, fn);
          enter.each(function(i) {
            $(this).replaceWith(nodes.eq(i));
          });
          return selection;
        },
        update: function(fn) {
          DataMappin.each(update, fn);
          return selection;
        },
        exit: function(fn) {
          DataMappin.each(exit, fn);
          return selection;
        },
      };

      return selection;


    },


    // 绑定数据
    nodesBindData: function(nodes, start, dataset) {
      start = start || 0;
      nodes.each(function(i) {
        var indexKey = i + start;
        var data = $(this).data('data');
        $(this).data('data',  { index: indexKey, data: dataset[indexKey] } );
      });
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
    },
    // 遍历节点集合
    each: function(nodes, fn) {
      var enter = $();
      nodes.each(function() {
        var data = $(this).data('data');
        var node = fn.call(this, data.data, data.index);
        if (node) {
          node.data('data', data);
          enter = enter.add(node);
        }
      });
      return enter;
    }







  };










  // 导出
  window.DataMappin = DataMappin;

})();