import angular from "angular";
import Component from "./Component.vue";
import { useNgVue, ngVueComponent } from "@bizbee/ngvue3";

const ngVue = useNgVue();
angular
  .module("vue.components", [ngVue])
  .controller(
    "MainController",
    class MainController {
      person: { firstName: string; lastName: string; description: string } = {
        firstName: "Barb",
        lastName: "Ara",
        description: "ngVue 3 supports components using the Composition API",
      };

      foo = "my-class";

      updateDescription(description: string) {
        this.person.description = description;
      }
    }
  )
  .directive(...ngVueComponent("myComponent", Component));
