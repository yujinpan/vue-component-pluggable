# Vue Component Pluggable

Make Vue component pluggable.

## Usage

```ts
import Vue from 'vue';
import { defineComponent } from 'vue-component-pluggable';

const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props: {},
  setup() {},
});

Vue.use(HelloWorld);
```