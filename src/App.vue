<script setup lang="ts">
import { ref } from "vue";

const html = ref(`<div ng-controller="MyController as ctrl">
  <my-component
    v-props="ctrl.user"
    v-props-is-admin="ctrl.isAdmin"
    v-on-button-clicked="ctrl.handleClick"
  ></my-component>
</div>
`);

const template = ref(`<template>
  <!-- Multiple root elements allowed in Vue3 -->
  <div>{{ salutation }}</div>
  <button v-if="isAdmin" @click="onButtonClicked">Click Me</button>
</template>
`);

const angular = ref(`import {ngVueComponent, useNgVue} from '@bizbee/ngvue3';
import MyComponent from './MyComponent.vue';

// Setups ngVue angular module and returns module name
const ngVue = useNgVue();

angular.module('myModule', [ngVue])
  .controller('MyController', class MyController {
    constructor() {
      this.isAdmin = true;
      this.user = {firstName: 'Barb', lastName: 'Ara'};

      this.handleClick = () => {
        this.admin = false;
      }
    }
  })
  // ngVueComponent is a helper function that reduces boiler plate;
  // .directive('myComponent', ['createVueComponent', (createVueComponent) => createVueComponent(MyComponent)])
  .directive(...ngVueComponent('myComponent', MyComponent));
`);

const optionsApi = ref(`import { defineComponent } from "vue";

export default defineComponent({
  props: {
    firstName: { type: String, default: "Not" },
    lastName: { type: String, default: "Sure" },
    isAdmin: { type: Boolean, default: false },
  },
  emits: ["button-clicked"],
  computed: {
    salutation(): string {
      const prefix = this.isAdmin ? "Hello," : "Welcome,";
      return \`\${prefix} \${this.firstName} \${this.lastName}\`;
    },
  },
  methods: {
    onButtonClicked() {
      this.$emit("button-clicked");
    },
  },
});
`);

const compositionApi = ref(`import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    firstName: { type: String, default: "Not" },
    lastName: { type: String, default: "Sure" },
    isAdmin: { type: Boolean, default: false },
  },
  emits: ["button-clicked"],
  setup(props, context) {
    const salutation = computed(() => {
      const prefix = props.isAdmin ? "Hello," : "Welcome,";
      return \`\${prefix} \${props.firstName} \${props.lastName}\`;
    });

    const onButtonClicked = () => context.emit("button-clicked");

    return { salutation, onButtonClicked };
  },
});
`);

const scriptSetup = ref(`
import { computed, PropType } from "vue";

const props = defineProps({
  firstName: { type: String, default: "Not" },
  lastName: { type: String, default: "Sure" },
  isAdmin: { type: Boolean, default: false },
});
const emit = defineEmits(["button-clicked"]);

const salutation = computed(() => {
  const prefix = props.isAdmin ? "Hello," : "Welcome,";
  return \`\${prefix} \${props.firstName} \${props.lastName}\`;
});

const onButtonClicked = () => emit("button-clicked");
`);

const umdImplementation = ref(`
\<script src="../../node_modules/angular/angular.min.js"\>\</script\>
\<script src="../../node_modules/vue/dist/vue.global.js"\>\</script\>
\<script src="../../node_modules/@bizbee/ngvue3/dist/main.js"\>\</script\>
\<script>
  const { useNgVue, ngVueComponent } = ngVue3;
  const ngVue = useNgVue();

  angular
    .module("vue.components", [ngVue])
    .controller(
      "MainController",
      class MainController {
        person = {
          firstName: "Barb",
          lastName: "Ara",
          description: "ngVue 3 supports components using the Composition API",
        };

        foo = "my-class";

        updateDescription(description) {
          this.person.description = description;
        }
      }
    )
    .directive(
      ...ngVueComponent("myComponent", {
        template: \`
<div>
<span> Hi, {{ firstName }} {{ lastName }} </span>
<p>{{ description }}</p>
</div>
<div v-bind="$attrs">
<p><a href="https://vuejs.org/guide/overview.html">Vue.js</a></p>
<button @click="onButtonClick()">Update description from Vue</button>
</div>
            \`,
        props: {
          firstName: String,
          lastName: String,
          description: String,
        },
        emits: ["update-description"],
        setup(props, context) {
          const onButtonClick = () => {
            context.emit("update-description", props.description.toUpperCase());
          };

          return { onButtonClick };
        },
      })
    );
\</script\>
`);
</script>

<template>
  

  <h3>Examples</h3>
  <p>
    Under the hood Vue 3 uses the Composition API for everything, however the following are example
    of usage with the various styles you have available
  </p>

  <h4>Quick Links</h4>
  <ul></ul>
  <li><a href="examples/options-api/index.html">Options API Demo</a></li>
  <li><a href="examples/composition-api/index.html">Composition API Demo</a></li>
  <li><a href="examples/script-setup/index.html">Script Setup Demo</a></li>
  <li><a href="examples/umd/index.html">UMD Demo</a></li>

  <h4>Implementation</h4>

  <h5>Angular</h5>
  <pre v-highlightjs><code class="typescript">{{angular}}</code></pre>

  <h5>HTML</h5>
  <pre v-highlightjs><code class="html">{{html}}</code></pre>

  <h5>Vue Template</h5>
  <pre v-highlightjs><code class="html">{{template}}</code></pre>

  <h5>Options Api</h5>
  <a href="examples/options-api/index.html">Demo</a>
  <p>This is the classic Vue style.</p>
  <pre v-highlightjs><code class="typescript">{{optionsApi}}</code></pre>

  <h5>Composition API (w/ setup function)</h5>
  <a href="examples/composition-api/index.html">Demo</a>
  <p>This option is available as a non-build style alternative to the Options API</p>
  <pre v-highlightjs><code class="typescript">{{compositionApi}}</code></pre>

  <h5>Script Setup</h5>
  <a href="examples/script-setup/index.html">Demo</a>
  <p>
    The cadillac of Vue 3, it adds compiler macros that reduce the amount of boilerplate needed by
    the standard Composition API style.
  </p>
  <pre v-highlightjs><code class="typescript">{{scriptSetup}}</code></pre>

  <h5>Using UMD</h5>
  <a href="examples/umd/index.html">Demo</a>
  <p>
    Perhaps you need to use a completely browser based implementation with no build. That is
    possible using the UMD script
  </p>
  <pre v-highlightjs><code class="html">{{umdImplementation}}</code></pre>
</template>

<style lang="scss">
h1.header {
  display: flex;
  align-items: center;
  img {
    height: 6rem;
    margin-right: 1rem;
  }
}
#app ul li {
  pre,
  pre code.hljs {
    display: inline;
    padding: 0;
  }
}
</style>
