(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./lib/relative-sorter');
require('./lib/test');

console.log([1, 2].map(function (i) {
  return i + 1;
}));

},{"./lib/relative-sorter":2,"./lib/test":3}],2:[function(require,module,exports){
'use strict';

/**
 * RelativeSorter.
 * @module RelativeSorter
 */

/**
 * Class representing a relative sorter.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  /**
   * Constructor.
   */
  function RelativeSorter() {
    _classCallCheck(this, RelativeSorter);

    this._items = Object.create(null);
  }

  /**
   * Add an item.
   * @param {(number|string)} id - The item identifier.
   * @param {} data - The item data.
   * @param {Array<(number|string)>} after - The items identifiers of preceding items.
   * @param {Array<(number|string)>} before - The items identifiers of following item.
   */


  _createClass(RelativeSorter, [{
    key: 'add',
    value: function add(id, data) {
      var after = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
      var before = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

      this._items[id] = {
        id: id,
        data: data,
        after: after,
        before: before
      };
    }

    /**
     * Sort the added items from their relative definitions.
     * @returns {Array<Array>} The sorted items.
     * @throws {Error} If there is a cyclic relative orders definition.
     */

  }, {
    key: 'sort',
    value: function sort() {
      var items = this._items;
      var itemsWeights = Object.create(null);
      var sortedItems = [];
      var itemsNumber = 0;

      for (var id in items) {
        itemsWeights[id] = 0;
        itemsNumber++;
      }

      // Process item weights while an operation is done.
      var doneSomething = true;
      var maxPossibleWeight = itemsNumber - 1;
      var processedItems = [];
      var checkWeight = function checkWeight(weight) {
        if (weight > maxPossibleWeight) {
          var lastProcessedItem = processedItems[processedItems.length - 1];
          var cycleIndex = -1;

          for (var i = processedItems.length - 2; i >= 0; i--) {
            if (processedItems[i] === lastProcessedItem) {
              cycleIndex = i;
              break;
            }
          }

          if (cycleIndex < 0) {
            cycleIndex = 0;
            processedItems.unshift(lastProcessedItem);
          }

          throw new Error('Cyclic relative orders definition [\'' + processedItems.slice(cycleIndex).join('\' < \'') + '\']');
        }

        return weight;
      };

      while (doneSomething) {
        doneSomething = false;

        for (var weightId in itemsWeights) {
          var weight = itemsWeights[weightId];

          for (var _id in items) {
            var item = items[_id];
            var itemWeight = itemsWeights[_id];

            if (item.before.indexOf(weightId) !== -1 && itemWeight >= weight) {
              processedItems.push(weightId);
              itemsWeights[weightId] = checkWeight(itemWeight + 1);
              doneSomething = true;
            }
            if (item.after.indexOf(weightId) !== -1 && itemWeight <= weight) {
              processedItems.push(_id);
              itemsWeights[_id] = checkWeight(weight + 1);
              doneSomething = true;
            }
          }
        }
      }

      // Retrieve max weight.
      var maxWeight = 0;

      for (var _weightId in itemsWeights) {
        maxWeight = Math.max(maxWeight, itemsWeights[_weightId]);
      }

      // Sort items from weight.
      for (var i = 0; i <= maxWeight; i++) {
        sortedItems[i] = [];

        for (var _id2 in itemsWeights) {
          if (itemsWeights[_id2] === i) {
            sortedItems[i].push(items[_id2].data);
          }
        }
      }

      return sortedItems;
    }
  }]);

  return RelativeSorter;
}();

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('./relative-sorter');

/**
 * Test.
 * @module Test
 */

/**
 * Class representing a test.
 */
module.exports = function () {
  /**
   * Constructor.
   */
  function Test() {
    _classCallCheck(this, Test);
  }

  /**
   * foo
   */


  _createClass(Test, [{
    key: 'foo',
    value: function foo() {
      return 'bar';
    }
  }]);

  return Test;
}();

},{"./relative-sorter":2}]},{},[1]);
