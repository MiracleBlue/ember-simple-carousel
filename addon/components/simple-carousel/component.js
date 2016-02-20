import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  activeItem: 0,

  _incrementActiveItem() {
    const calcNextActiveItem = (listLength, activeItem) => {
      const nextActiveItem = activeItem + 1;
      if (nextActiveItem < listLength) return nextActiveItem;
      return 0;
    };

    const listLength = this.get('list.length');
    const activeItem = this.get('activeItem');

    const nextActiveItem = calcNextActiveItem(listLength, activeItem);

    this.set('activeItem', nextActiveItem);

    return nextActiveItem;
  },

  _decrementActiveItem() {
    const calcPreviousActiveItem = (listLength, activeItem) => {
      const nextActiveItem = activeItem - 1;
      if (nextActiveItem >= 0) return nextActiveItem;
      return listLength - 1;
    };

    const listLength = this.get('list.length');
    const activeItem = this.get('activeItem');

    const nextActiveItem = calcPreviousActiveItem(listLength, activeItem);

    this.set('activeItem', nextActiveItem);

    return nextActiveItem;
  },

  actions: {
    next() {
      const nextActiveItem = this._incrementActiveItem();

      this.get('on-change')(nextActiveItem);
    },
    previous() {
      const previousActiveItem = this._decrementActiveItem();

      this.get('on-change')(previousActiveItem);
    }
  }
}).reopenClass({
  positionalParams: ['list']
});
