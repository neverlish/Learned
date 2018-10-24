import AutoComplete from "./autocomplete.js";
import Map from "./map.js";
import Sidebar from "./sidebar.js";
import { createShare$ } from './common.js';

const {
  render$,
  search$
} = createShare$();

const search = new AutoComplete(document.querySelector(".autocomplete"));
const sidebar = new Sidebar(document.querySelector(".stations"));
const map = new Map(document.querySelector(".map"), search$);

render$.subscribe(stations => {
  if (stations.length) {
    map.drawPath(stations);
    sidebar.render(stations);
  } else {
    map.deletePath();
    sidebar.close();
  }
})
