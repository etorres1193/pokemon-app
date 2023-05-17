import { mount } from '@vue/test-utils'
import HomePage from '../../src/views/PokemonView.vue'
import { describe, expect, test } from 'vitest'

describe('PokemonView.vue', () => {
  test('renders home vue', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.text()).toMatch('Ready to create an app?')
  })
})
