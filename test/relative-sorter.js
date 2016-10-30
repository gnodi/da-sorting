'use strict';

const RelativeSorter = require('../lib/relative-sorter');

const sortingTests = [
  {
    items: {
      a: {
        data: 'a',
        after: [],
        before: []
      },
      b: {
        data: 'b',
        after: []
      },
      c: {
        data: 'c'
      }
    },
    expected: [['a', 'b', 'c']]
  },
  {
    items: {
      a: {
        data: 'a',
        after: [],
        before: []
      },
      b: {
        data: 'b',
        before: ['a']
      },
      c: {
        data: 'c',
        after: ['a']
      }
    },
    expected: [['b'], ['a'], ['c']]
  },
  {
    items: {
      a: {
        data: 'foo',
        after: [],
        before: []
      },
      b: {
        data: 'bar',
        after: []
      },
      c: {
        data: 'foobar',
        before: ['a', 'b']
      }
    },
    expected: [['foobar'], ['foo', 'bar']]
  },
  {
    items: {
      a: {
        data: 'a',
        after: [],
        before: []
      },
      b: {
        data: 'b'
      },
      c: {
        data: 'c',
        before: ['b']
      },
      d: {
        data: 'd',
        after: ['b'],
        before: ['a']
      },
      e: {
        data: 'e'
      }
    },
    expected: [['c', 'e'], ['b'], ['d'], ['a']]
  },
  {
    items: {
      a: {
        data: 'a',
        after: [],
        before: []
      },
      b: {
        data: 'b'
      },
      c: {
        data: 'c',
        before: ['b']
      },
      d: {
        data: 'd',
        after: ['b'],
        before: ['a']
      },
      e: {
        data: 'e'
      },
      f: {
        data: 'f',
        before: ['a']
      },
      g: {
        data: 'g',
        after: ['h'],
      },
      h: {
        data: 'h',
        after: ['d']
      }
    },
    expected: [['c', 'e', 'f'], ['b'], ['d'], ['a', 'h'], ['g']]
  },
  {
    items: {
      a: {
        data: 'a',
        after: [],
        before: []
      },
      b: {
        data: 'b'
      },
      c: {
        data: 'c',
        before: ['b']
      },
      d: {
        data: 'd',
        after: ['b'],
        before: ['a']
      },
      e: {
        data: 'e'
      },
      f: {
        data: 'f',
        before: ['a']
      },
      g: {
        data: 'g',
        after: ['h'],
      }
    },
    expected: [['c', 'e', 'f', 'g'], ['b'], ['d'], ['a']]
  }
];

const sortingFailingTests = [
  {
    items: {
      a: {
        data: 'a',
        before: ['b']
      },
      b: {
        data: 'b',
        before: ['c']
      },
      c: {
        data: 'c',
        before: ['a']
      }
    },
    expected: /Cyclic relative orders definition \['c' < 'a' < 'b' < 'c'\]/
  },
  {
    items: {
      a: {
        data: 'a'
      },
      b: {
        data: 'b'
      },
      c: {
        data: 'c',
        before: ['b']
      },
      d: {
        data: 'd',
        after: ['b'],
        before: ['c']
      }
    },
    expected: /Cyclic relative orders definition \['b' < 'd' < 'c' < 'b'\]/
  },
  {
    items: {
      a: {
        data: 'a',
        before: ['a']
      }
    },
    expected: /Cyclic relative orders definition \['a' < 'a'\]/
  }
];

describe('RelativeSorter', function() {
  sortingTests.forEach(function(test, index) {
    it(`should sort added items in their correct relative order (${index})`, function() {
      const relativeSorter = new RelativeSorter();

      for (let id in test.items) {
        const item = test.items[id];

        relativeSorter.add(id, item.data, item.after, item.before);
      }

      expect(relativeSorter.sort()).toEqual(test.expected);
    });
  });

  sortingFailingTests.forEach(function(test, index) {
    it(`should check for bad relative order definition (${index})`, function() {
      const relativeSorter = new RelativeSorter();

      for (let id in test.items) {
        const item = test.items[id];

        relativeSorter.add(id, item.data, item.after, item.before);
      }

      expect(relativeSorter.sort.bind(relativeSorter)).toThrowError(test.expected);
    });
  });
});
