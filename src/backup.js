(function() {

  // todo fn函数指定如何数据与视图绑定

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

      data.forEach(function(d, i) {
        // 索引对应视图元素
        var current = elements.length <= i ? $('<div></div>') : elements.eq(i);

        // 上一个元素绑定的数据
        var lastData = current.data('data');

        // 视图未绑定数据
        if (lastData === undefined) {
          // 绑定数据
          current.data('data', d);
          enters = enters.add(current);
        } else {
          if (lastData == d) {
            updates = updates.add(current);
          } else {
            var newele = $('<div></div>').data('data', d);
            // enters = enters.add(newele);
            exits = exits.add(current);
            console.log('current', current, '被替换为', newele);
            current.replaceWith(newele);
          }
        }
        

      });


      for (var i = data.length - 1; i < elements.length; ++i) {
        exits = exits.add(elements[i]);
      }



      var dd = {
        enter: function(fn) {
          var _enter = $();
          enters.each(function(i, element) {
            var data = $(element).data('data');
            var ele = fn.call(element, data, i);
            ele.data('data', data);
            $(element).replaceWith(ele);
            _enter = _enter.add(ele);
          });
          // wrap.append(_enter);
          return dd;
        },
        exit: function(fn) {
          exits.each(function(i, element) {
            var data = $(element).data('data');
            fn.call(element, data, i);
          });
          return dd;
        },
        update: function(fn) {
          updates.each(function(i, element) {
            var data = $(element).data('data');
            fn.call(element, data, i);
          });
          return dd;
        },


      };



      return dd;
    }
  };










  // 导出
  window.DataMappin = DataMappin;

})();