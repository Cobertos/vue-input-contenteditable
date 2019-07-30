import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import InputContentEditable from '@/input-contenteditable.vue';

describe('input-contenteditable.vue', () => {
  it('has one root element that is contenteditable', () => {
    //arrange/act
    const wrapper = shallowMount(InputContentEditable, {});
    //assert
    expect(wrapper.element.children.length).to.equal(0);
    expect(wrapper.attributes('contenteditable')).to.not.equal(undefined);
  });

  describe('supports v-model', () => {
    it('supports passing a value', () => {
      //arrange/act
      const wrapper = shallowMount(InputContentEditable, {
        propsData: {
          value: 'my value'
        }
      });
      //assert
      expect(wrapper.text()).to.include('my value');
    });
    it('emits an input event on change', () => {
      //arrange
      const wrapper = shallowMount(InputContentEditable, {});
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
    const wrapper = shallowMount(InputContentEditable, {
      propsData: {
        placeholder: 'hewwo'
      }
    });
    //assert
    expect(wrapper.attributes('placeholder')).to.equal('hewwo');
    //The actual attribute is displayed using css and &:before:empty
    //and there's no easy way to test that
  });

  //TODO: window.getSelection() is not a function...
  /*it('supports maxlength', () => {
    //arrange
    const wrapper = shallowMount(InputContentEditable, {
      propsData: {
        value: 'hewwohewwo',
        maxlength: 10
      }
    });
    //act
    wrapper.element.textContent = 'hewwohewwohewwo';
    wrapper.element.dispatchEvent(new Event('input')); 
    //assert
    expect(wrapper.text()).to.equal('hewwohewwo');
  });*/
});
