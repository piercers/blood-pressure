import Vue from "vue";
import Vuex from "vuex";

import { Entry } from "@/core/entries.interfaces";
import { myData } from "@/core/utils";
import { addEntry } from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    entries: [...myData],
  },
  mutations: {
    [addEntry](state, { entry }: { entry: Entry }) {
      state.entries.push(entry);
    },
  },
  actions: {},
  strict: process.env.NODE_ENV !== "production",
});
