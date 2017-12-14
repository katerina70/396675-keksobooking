'use strict';
window.synchronizeFields = function (node1, node2, callback) {
  node1.addEventListener('change', function () {
    callback(node1, node2);
  });
};
