import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import InputContentEditable from '@/input-contenteditable.vue';

describe('input-contenteditable.vue', () => {
  it('has one root element', () => {
    const wrapper = shallowMount(InputContentEditable, {});
    expect(wrapper.element.children.length).to.equal(0);
  });

  it('properly supports v-model', () => {
    //Takes a value prop and outputs an input event
    const wrapper = shallowMount(InputContentEditable, {
      propsData: {
        value: 'my value'
      }
    });
    expect(wrapper.text()).to.include('my value');
  });
});
