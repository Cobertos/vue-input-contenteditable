import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import InputContentEditable from '@/input-contenteditable.vue';

describe('input-contenteditable.vue', () => {
  it('properly supports v-model', () => {
    const wrapper = shallowMount(InputContentEditable, {
      propsData: {
        value: 'my value'
      }
    });
    console.log(wrapper);
    expect(wrapper.text()).to.include('my value');
  });
});
