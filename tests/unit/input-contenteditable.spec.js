import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import InputContenteditable from '@/input-contenteditable.vue';
//eslint-disable-next-line no-eval
eval(`require('jsdom-global')();`); //Don't let webpack transpile this require, don't bundle jsdom with the tests
//Polyfill a few things in window.getSelection() bc jsdom doesn't support yet
const selection = {
  anchorNode: undefined,
  anchorOffset: undefined,
  collapse (anchorNode, anchorOffset) {
    this.anchorNode = anchorNode;
    this.anchorOffset = anchorOffset;
  }
};
global.window.getSelection = () => {
  return selection;
};

describe('input-contenteditable.vue', () => {
  it('has one root element that is contenteditable', () => {
    //arrange/act
    const wrapper = shallowMount(InputContenteditable, {});
    //assert
    expect(wrapper.element.children.length).to.equal(0);
    expect(wrapper.attributes('contenteditable')).to.not.equal(undefined);
  });

  describe('supports v-model', () => {
    it('supports passing a value', () => {
      //arrange/act
      const wrapper = shallowMount(InputContenteditable, {
        propsData: {
          value: 'my value'
        }
      });
      //assert
      expect(wrapper.text()).to.include('my value');
    });
    it('emits an input event on change', () => {
      //arrange
      const wrapper = shallowMount(InputContenteditable, {});
      //act
      wrapper.element.textContent = 'h';
      //Simulate native DOM event for user typing in contentediable
      wrapper.element.dispatchEvent(new Event('input'));
      wrapper.element.textContent = 'hi';
      wrapper.element.dispatchEvent(new Event('input'));
      wrapper.element.textContent = 'hi there';
      wrapper.element.dispatchEvent(new Event('input'));
      //assert
      expect(wrapper.emitted().input.length).to.equal(3);
      expect(wrapper.emitted().input[0].length).to.equal(1);
      expect(wrapper.emitted().input[0][0]).to.equal('h');
      expect(wrapper.emitted().input[1].length).to.equal(1);
      expect(wrapper.emitted().input[1][0]).to.equal('hi');
      expect(wrapper.emitted().input[2].length).to.equal(1);
      expect(wrapper.emitted().input[2][0]).to.equal('hi there');
    });
  });

  it('supports placeholder', () => {
    //arrange/act
    const wrapper = shallowMount(InputContenteditable, {
      propsData: {
        placeholder: 'hewwo'
      }
    });
    //assert
    expect(wrapper.attributes('placeholder')).to.equal('hewwo');
    //The actual attribute is displayed using css and &:before:empty
    //and there's no easy way to test that
  });

  describe('supports maxlength', () => {
    it('when a single letter is added to the end (simple case)', () => {
      //arrange
      const wrapper = shallowMount(InputContenteditable, {
        propsData: {
          value: 'hewwohewwo',
          maxlength: 10
        }
      });

      //act
      wrapper.element.textContent = 'hewwohewwoh';
      wrapper.element.dispatchEvent(new Event('input'));
      //assert
      expect(wrapper.text()).to.equal('hewwohewwo');
    });
    it('when 4 letters are pasted in the middle (complex case) and sets cursor properly', () => {
      //arrange
      const wrapper = shallowMount(InputContenteditable, {
        propsData: {
          value: 'hewwohewwo',
          maxlength: 12
        }
      });
      selection.anchorNode = wrapper.element;
      selection.anchorOffset = 5;
      wrapper.element.dispatchEvent(new Event('input')); //Simulate cursor half way

      //act
      wrapper.element.textContent = 'hewwoaaaahewwoh';
      selection.anchorNode = wrapper.element;
      selection.anchorOffset = 9; //Simulate pasting 4 a's half way between
      wrapper.element.dispatchEvent(new Event('input'));
      //assert
      //Expected behavior is basically to prevent the operation that just happened
      //from happening at all (same as preventDefault but look at input-contenteditable.vue for why)
      expect(wrapper.text()).to.equal('hewwohewwo');
      expect(selection.anchorOffset).to.equal(5);
    });
  });
});
