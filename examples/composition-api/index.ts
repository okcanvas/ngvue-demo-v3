import angular from "angular";
import vueDashboard from "./dashboard.vue";
import { useNgVue, ngVueComponent } from "@bizbee/ngvue3";

const ngVue = useNgVue();
angular
  .module("vue.components", [ngVue])
  .controller(
    "MainController",
    class MainController {
      person: { 
        firstName: string; 
        lastName: string; 
        description: string;
        widgets: any[];
      } = {
        firstName: "sdfsdfsdf",
        lastName: "324534534",
        description: "ngVue 3 supports components using the Composition API",
        widgets: [
          {
            x: 0,
            y: 0,
            w: 1,
            h: 4,
            i: "widget-0001",
            component: "LineChart"
          },
          {
            x: 1,
            y: 0,
            w: 1,
            h: 4,
            i: "widget-0002",
            component: "BarChart"
          },
          {
            x: 2,
            y: 0,
            w: 1,
            h: 4,
            i: "widget-0003",
            component: "PieChart"
          },
          {
            x: 0,
            y: 1,
            w: 2,
            h: 4,
            i: "widget-0004",
            component: "WidgetCalendar"
          },
        ]
      };

      foo = "my-class";

      updateWidget(widgets: any[]) {
        this.person.widgets = widgets;
        console.log('update', widgets)
      }
    }
  )
  .directive(...ngVueComponent("vueDashboard", vueDashboard));
