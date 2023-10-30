import Vue from 'vue';

import { defineComponent, defineDirective } from './index';

describe('defineComponent', () => {
  it('should define pluggable component', function () {
    const pluggableComponent = defineComponent({
      name: 'Pluggable',
      props: {
        test: String,
      },
      setup(props) {
        return () => props.test;
      },
    });
    Vue.use(pluggableComponent);

    expect(Vue.component(pluggableComponent.name)).toBeDefined();
  });

  it('should define pluggable component with custom install', function () {
    const config: { test?: number } = {};
    const pluggableComponent = defineComponent({
      name: 'Pluggable',
      props: {},
      install(vue, options: typeof config) {
        vue.component(this.name, this);
        Object.assign(config, options);
      },
    });
    Vue.use(pluggableComponent, {
      test: 1,
    });

    expect(Vue.component(pluggableComponent.name)).toBeDefined();
    expect(config.test).toBe(1);
  });

  it('should define pluggable directive', function () {
    const pluggableDirective = defineDirective<string, HTMLElement>({
      name: 'bg-color',
      inserted: (el, binding) => {
        el.style.backgroundColor = binding.value;
      },
    });
    Vue.use(pluggableDirective);

    expect(Vue.directive(pluggableDirective.name)).toBeDefined();
  });

  it('should define pluggable directive with custom install', function () {
    const config: { test?: number } = {};
    const pluggableDirective = defineDirective<
      string,
      HTMLElement,
      typeof config
    >({
      name: 'test',
      props: {},
      install(vue, options) {
        vue.directive(this.name, this);
        Object.assign(config, options);
      },
    });
    Vue.use(pluggableDirective, {
      test: 1,
    });

    expect(Vue.directive(pluggableDirective.name)).toBeDefined();
    expect(config.test).toBe(1);
  });
});
