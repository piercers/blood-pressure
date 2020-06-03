import Vue from "vue";
import Vuex from "vuex";

import { User, user, signOut as authSignOut } from "@/core/auth";
import { Entry } from "@/core/entries.interfaces";
import { myData } from "@/core/utils";
import { addEntry, signOut, signInError, signIn } from "./types";

Vue.use(Vuex);

interface State {
  entries: Entry[];
  user: User;
}

export default new Vuex.Store({
  state: {
    entries: [...myData],
    user
  } as State,
  mutations: {
    [addEntry](state, { entry }: { entry: Entry }) {
      state.entries.push(entry);
    },
    [signIn](state, { user }: { user: User }) {
      state.user = user;
    },
    [signInError](state) {
      state.user = null;
    },
    [signOut](state) {
      state.user = null;
    }
  },
  actions: {
    [signOut]({ commit }) {
      authSignOut().subscribe(() => {
        commit(signOut);
      });
    }
  },
  strict: process.env.NODE_ENV !== "production"
});
