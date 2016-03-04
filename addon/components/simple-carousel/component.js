import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  classNames: ['simple-carousel'],

  activeItemIndex: 0,

  list: null,

  nextItemIndex: Ember.computed('activeItemIndex', 'list.[]', {
    get() {
      const activeItemIndex = this.get('activeItemIndex');
      const listLength = this.get('list.length');
      const nextItemIndex = activeItemIndex + 1;

      if (nextItemIndex < listLength) return nextItemIndex;
      return 0;
    }
  }),

  previousItemIndex: Ember.computed('activeItemIndex', 'list.[]', {
    get() {
      const activeItemIndex = this.get('activeItemIndex');
      const listLength = this.get('list.length');
      const previousItemIndex = activeItemIndex - 1;

      if (previousItemIndex >= 0) return previousItemIndex;

      return listLength - 1;
    }
  }),

  _incrementActiveItem() {
    const nextItemIndex = this.get('nextItemIndex');

    this.set('activeItemIndex', nextItemIndex);

    return nextItemIndex;
  },

  _decrementActiveItem() {
    const previousItemIndex = this.get('previousItemIndex');

    this.set('activeItemIndex', previousItemIndex);

    return previousItemIndex;
  },

  actions: {
    next() {
      const nextItemIndex = this._incrementActiveItem();

      this.get('on-change')(nextItemIndex);
    },
    previous() {
      const previousActiveItem = this._decrementActiveItem();

      this.get('on-change')(previousActiveItem);
    }
  }
}).reopenClass({
  positionalParams: ['list']
});
