import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBriefcase,
  faTicket,
  faLocationDot,
  faSyringe,
  faFlask,
  faBasketball,
  faMicrochip,
  faCaretRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;

library.add(
  faBriefcase,
  faTicket,
  faLocationDot,
  faSyringe,
  faFlask,
  faBasketball,
  faMicrochip,
  faCaretRight,
  faUser
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
