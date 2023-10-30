import type {
  FunctionDirective,
  ObjectDirective,
  PluginObject,
  VueConstructor,
} from 'vue';
import type { HasDefined } from 'vue/types/common';
import type { CreateElement, RenderContext } from 'vue/types/umd';
import type {
  ComponentOptionsWithProps,
  ComponentOptionsWithArrayProps,
  ComponentOptionsMixin,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsWithoutProps,
} from 'vue/types/v3-component-options';
import type {
  ExtractPropTypes,
  ComponentPropsOptions,
} from 'vue/types/v3-component-props';
import type { DefineComponent } from 'vue/types/v3-define-component';
import type { EmitsOptions } from 'vue/types/v3-setup-context';

// fork from v3-define-component.d.ts

export function defineComponent<
  PluginOptions,
  RawBindings,
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  Emits extends EmitsOptions = {},
  EmitsNames extends string = string,
>(
  options: { functional?: never } & ComponentOptionsWithoutProps<
    {},
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    Emits,
    EmitsNames
  > &
    Partial<PluginObject<PluginOptions>>,
): DefineComponent<{}, RawBindings, D, C, M, Mixin, Extends, Emits> &
  PluginObject<PluginOptions>;

export function defineComponent<
  PluginOptions,
  PropNames extends string,
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  Emits extends EmitsOptions = {},
  EmitsNames extends string = string,
  PropsOptions extends ComponentPropsOptions = ComponentPropsOptions,
>(
  options: { functional?: never } & ComponentOptionsWithArrayProps<
    PropNames,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    Emits,
    EmitsNames
  > &
    Partial<PluginObject<PluginOptions>>,
): DefineComponent<
  Readonly<{ [key in PropNames]?: any }>,
  RawBindings,
  D,
  C,
  M,
  Mixin,
  Extends,
  Emits
> &
  PluginObject<PluginOptions>;

export function defineComponent<
  PluginOptions,
  Props,
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  Emits extends EmitsOptions = {},
  EmitsNames extends string = string,
  PropsOptions extends ComponentPropsOptions = ComponentPropsOptions,
>(
  options: (HasDefined<Props> extends true
    ? { functional?: never } & ComponentOptionsWithProps<
        PropsOptions,
        RawBindings,
        D,
        C,
        M,
        Mixin,
        Extends,
        Emits,
        EmitsNames,
        Props
      >
    : { functional?: never } & ComponentOptionsWithProps<
        PropsOptions,
        RawBindings,
        D,
        C,
        M,
        Mixin,
        Extends,
        Emits,
        EmitsNames
      >) &
    Partial<PluginObject<PluginOptions>>,
): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, Emits> &
  PluginObject<PluginOptions>;

export function defineComponent<
  PluginOptions,
  PropNames extends string,
  Props = Readonly<{ [key in PropNames]?: any }>,
>(
  options: {
    functional: true;
    props?: PropNames[];
    render?: (h: CreateElement, context: RenderContext<Props>) => any;
  } & Partial<PluginObject<PluginOptions>>,
): DefineComponent<Props> & PluginObject<PluginOptions>;

export function defineComponent<
  PluginOptions,
  PropsOptions extends ComponentPropsOptions = ComponentPropsOptions,
  Props = ExtractPropTypes<PropsOptions>,
>(
  options: {
    functional: true;
    props?: PropsOptions;
    render?: (h: CreateElement, context: RenderContext<Props>) => any;
  } & Partial<PluginObject<PluginOptions>>,
): DefineComponent<PropsOptions> & PluginObject<PluginOptions>;

export function defineComponent(options: any) {
  if (!options.install) {
    if (!options.name) {
      // eslint-disable-next-line no-console
      console.warn(
        '[vue-component-pluggable]',
        'defineComponent required option `name`.',
      );
    } else {
      options.install = (vue: VueConstructor) =>
        vue.component(options.name, options);
    }
  } else {
    options.install = options.install.bind(options);
  }

  return options;
}

export function defineDirective<
  BindingValue = any,
  El extends Element = Element,
  PluginOptions = any,
>(
  options: ObjectDirective<El, BindingValue> & { name: string } & Partial<
      PluginObject<PluginOptions>
    >,
): ObjectDirective<El, BindingValue> & {
  name: string;
} & PluginObject<PluginOptions>;

export function defineDirective<
  BindingValue,
  El extends Element,
  PluginOptions,
>(
  options: FunctionDirective<El, BindingValue> & { name: string } & Partial<
      PluginObject<PluginOptions>
    >,
): FunctionDirective<El, BindingValue> & {
  name: string;
} & PluginObject<PluginOptions>;

export function defineDirective(options: any) {
  if (!options.install) {
    if (!options.name) {
      // eslint-disable-next-line no-console
      console.warn(
        '[vue-component-pluggable]',
        'defineDirective required option `name`.',
      );
    } else {
      options.install = (vue: VueConstructor) =>
        vue.directive(options.name, options);
    }
  } else {
    options.install = options.install.bind(options);
  }

  return options;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function defineFilter<Filter = Function>(
  name: string,
  filter: Filter,
): Filter & PluginObject<never> {
  filter['install'] = (vue: VueConstructor) =>
    // eslint-disable-next-line @typescript-eslint/ban-types
    vue.filter(name, filter as Function);

  return filter as Filter & PluginObject<never>;
}
