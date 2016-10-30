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

    for (let id in items) {
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

      for (let weightId in itemsWeights) {
        const weight = itemsWeights[weightId];

        for (let id in items) {
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

    for (let weightId in itemsWeights) {
      maxWeight = Math.max(maxWeight, itemsWeights[weightId]);
    }

    // Sort items from weight.
    for (let i = 0; i <= maxWeight; i++) {
      sortedItems[i] = [];

      for (let id in itemsWeights) {
        if (itemsWeights[id] === i) {
          sortedItems[i].push(items[id].data);
        }
      }
    }

    return sortedItems;
  }
}
