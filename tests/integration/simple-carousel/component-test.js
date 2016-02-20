/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'simple-carousel',
  'Integration: SimpleCarouselComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      this.render(hbs`{{simple-carousel}}`);
      expect(this.$()).to.have.length(1);
    });

    it('should accept a list of items and yield them to the template block', function() {
      const list = [
        {text: 'hello1'},
        {text: 'hello2'},
        {text: 'hello3'},
        {text: 'hello4'}
      ];

      this.setProperties({list});

      this.render(hbs`{{#simple-carousel list as |item|}}
        <div class='list-item'>{{item.text}}</div>
      {{/simple-carousel}}`);

      const jQuery = this.$;

      const listItemElems = this.$('.list-item').map((index, item) => jQuery(item).text()).get();
      const listItemTexts = list.map(item => item.text);

      expect(listItemElems).to.deep.equal(listItemTexts);
    });

    it('should increment the active item when the next button is clicked', function(done) {
      const list = [
        {text: 'hello1'},
        {text: 'hello2'},
        {text: 'hello3'},
        {text: 'hello4'}
      ];

      const change = activeItem => {
        expect(activeItem).to.equal(1);
        done();
      };

      this.setProperties({list, change});

      this.render(hbs`{{#simple-carousel list on-change=(action change) as |item|}}
        <div class='list-item'>{{item.text}}</div>
      {{/simple-carousel}}`);

      const nextButton = this.$('.simple-carousel__next');

      nextButton.click();
    });

    it('should decrement the active item when the previous button is clicked', function(done) {
      const list = [
        {text: 'hello1'},
        {text: 'hello2'},
        {text: 'hello3'},
        {text: 'hello4'}
      ];

      const change = activeItem => {
        expect(activeItem).to.equal(0);
        done();
      };

      this.setProperties({list, change});

      this.render(hbs`{{#simple-carousel list activeItem=1 on-change=(action change) as |item|}}
        <div class='list-item'>{{item.text}}</div>
      {{/simple-carousel}}`);

      const previousButton = this.$('.simple-carousel__previous');

      previousButton.click();
    });
  }
);
