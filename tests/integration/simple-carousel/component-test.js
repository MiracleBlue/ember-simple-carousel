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
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#simple-carousel}}
      //     template content
      //   {{/simple-carousel}}
      // `);

      this.render(hbs`{{simple-carousel}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
