"use strict";

import burger from "./modules/burger";
import modal from "./modules/modal";
import slider from "./modules/slider";

  burger();
  modal();
  slider(".select-storage__item", ".select-storage__prev-btn", ".select-storage__next-btn");
  slider(".select-storage__new-item", ".select-storage__new-prev-btn", ".select-storage__new-next-btn");

