import SlideHero from "../components/slides/SlideHero.vue";
import SlideRPL from "../components/slides/SlideRPL.vue";
import SlideTimeline from "../components/slides/SlideTimeline.vue";
import SlideFlow from "../components/slides/SlideFlow.vue";
import SlideTech from "../components/slides/SlideTech.vue";
import SlideDeploy from "../components/slides/SlideDeploy.vue";
import SlideClosing from "../components/slides/SlideClosing.vue";

export const slides = [
  { id: 1, component: SlideHero },
  { id: 2, component: SlideRPL },
  { id: 3, component: SlideTech },
  { id: 4, component: SlideFlow }, 
  { id: 6, component: SlideDeploy },
  { id: 5, component: SlideTimeline },
  { id: 7, component: SlideClosing },
];
