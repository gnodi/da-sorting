(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./lib/relative-sorter');
require('./lib/test');

console.log([1, 2].map(i => i + 1));

},{"./lib/relative-sorter":2,"./lib/test":3}],2:[function(require,module,exports){
'use strict';

/**
 * RelativeSorter.
 * @module RelativeSorter
 */

/**
 * Class representing a relative sorter.
 */
module.exports = class RelativeSorter {
  /**
   * Constructor.
   */
  constructor() {
    this._items = Object.create(null);
  }

  /**
   * Add an item.
   * @param {(number|string)} id - The item identifier.
   * @param {} data - The item data.
   * @param {Array<(number|string)>} after - The items identifiers of preceding items.
   * @param {Array<(number|string)>} before - The items identifiers of following item.
   */
  add(id, data, after = [], before = []) {
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
  sort() {
    const items = this._items;
    const itemsWeights = Object.create(null);
    const sortedItems = [];
    let itemsNumber = 0;

    for (const id in items) {
      itemsWeights[id] = 0;
      itemsNumber++;
    }

    // Process item weights while an operation is done.
    let doneSomething = true;
    const maxPossibleWeight = itemsNumber - 1;
    const processedItems = [];
    const checkWeight = (weight) => {
      if (weight > maxPossibleWeight) {
        const lastProcessedItem = processedItems[processedItems.length - 1];
        let cycleIndex = -1;

        for (let i = processedItems.length - 2; i >= 0; i--) {
          if (processedItems[i] === lastProcessedItem) {
            cycleIndex = i;
            break;
          }
        }

        if (cycleIndex < 0) {
          cycleIndex = 0;
          processedItems.unshift(lastProcessedItem);
        }

        throw new Error(`Cyclic relative orders definition ['${processedItems.slice(cycleIndex).join('\' < \'')}']`);
      }

      return weight;
    }

    while (doneSomething) {
      doneSomething = false;

      for (const weightId in itemsWeights) {
        const weight = itemsWeights[weightId];

        for (const id in items) {
          const item = items[id];
          const itemWeight = itemsWeights[id];

          if (item.before.indexOf(weightId) !== -1 && itemWeight >= weight) {
            processedItems.push(weightId);
            itemsWeights[weightId] = checkWeight(itemWeight + 1);
            doneSomething = true;
          }
          if (item.after.indexOf(weightId) !== -1 && itemWeight <= weight) {
            processedItems.push(id);
            itemsWeights[id] = checkWeight(weight + 1);
            doneSomething = true;
          }
        }
      }
    }

    // Retrieve max weight.
    let maxWeight = 0;

    for (const weightId in itemsWeights) {
      maxWeight = Math.max(maxWeight, itemsWeights[weightId]);
    }

    // Sort items from weight.
    for (let i = 0; i <= maxWeight; i++) {
      sortedItems[i] = [];

      for (const id in itemsWeights) {
        if (itemsWeights[id] === i) {
          sortedItems[i].push(items[id].data);
        }
      }
    }

    return sortedItems;
  }
}

},{}],3:[function(require,module,exports){
'use strict';

require('./relative-sorter');

/**
 * Test.
 * @module Test
 */

/**
 * Class representing a test.
 */
module.exports = class Test {
  /**
   * Constructor.
   */
  constructor() {
  }

  /**
   * foo
   */
  foo() {
    return 'bar';
  }
}

},{"./relative-sorter":2}]},{},[1]);
