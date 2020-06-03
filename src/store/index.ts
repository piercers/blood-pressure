import Vue from "vue";
import Vuex from "vuex";

import { db } from "@/core/api";
import { User, user, signOut as authSignOut } from "@/core/auth";
import { Entry } from "@/core/entries.interfaces";
import { myData } from "@/core/utils";
import { addEntry, signOut, signInError, signIn, addEntryError } from "./types";

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
    [addEntryError](state, { entry }) {
      state.entries = state.entries.filter(
        ({ dateTime }) => dateTime !== entry.dateTime
      );
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
    [addEntry]({ commit, state }, payload) {
      if (!state.user?.uid) {
        throw new Error("[Actions.addEntry] No UID found.");
      }
      commit({
        type: addEntry,
        ...payload
      });
      return db
        .collection(`users/${state.user?.uid}/entries`)
        .add({
          ...payload.entry,
          dateTime: new Date(payload.entry.dateTime)
        })
        .catch(error =>
          commit({
            ...payload,
            type: addEntryError,
            error
          })
        );
    },
    async [signOut]({ commit }) {
      await authSignOut();
      commit(signOut);
    }
  },
  strict: process.env.NODE_ENV !== "production"
});
