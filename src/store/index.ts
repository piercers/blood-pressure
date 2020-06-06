import Vue from "vue";
import Vuex from "vuex";

import { db } from "@/core/api";
import {
  User,
  user,
  signOut as authSignOut,
  onAuthStateChanged
} from "@/core/auth";
import { Entry } from "@/core/entries.interfaces";
import router from "@/router";
import {
  addEntry,
  signOut,
  signInError,
  signIn,
  addEntryError,
  listEntries,
  listEntriesDone,
  listEntriesError
} from "./types";

Vue.use(Vuex);

interface State {
  entries: Entry[];
  user: User;
}

const store = new Vuex.Store({
  state: {
    entries: [],
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
    [listEntriesDone](state, { entries }) {
      state.entries = entries;
    },
    [listEntriesError](state) {
      state.entries = [];
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
    [listEntries]({ commit, state }) {
      if (!state.user?.uid) {
        throw new Error("[Actions.addEntry] No UID found.");
      }
      return db
        .collection(`users/${state.user?.uid}/entries`)
        .get()
        .then(querySnapshot => {
          const entries = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              dateTime: data.dateTime.toDate().toISOString()
            } as Entry;
          });
          return commit({
            type: listEntriesDone,
            entries
          });
        })
        .catch(error =>
          commit({
            type: listEntriesError,
            error
          })
        );
    },
    [signIn]({ commit }, { user }) {
      commit({
        user,
        type: signIn
      });
      if (router.currentRoute.path === "/sign-in") {
        router.push("/");
      }
    },
    async [signOut]({ commit }) {
      await authSignOut();
      commit(signOut);
      if (router.currentRoute.path !== "/sign-in") {
        router.push("/sign-in");
      }
    }
  },
  getters: {
    entriesAscending(state) {
      return [...state.entries].sort(
        (a, b) => (new Date(a.dateTime) as any) - (new Date(b.dateTime) as any)
      );
    },
    entriesDescending(state) {
      return [...state.entries].sort(
        (a, b) => (new Date(b.dateTime) as any) - (new Date(a.dateTime) as any)
      );
    }
  },
  strict: process.env.NODE_ENV !== "production"
});

/**
 * Side Effects
 */
onAuthStateChanged.subscribe({
  next: user => {
    if (user) {
      store.dispatch({
        type: signIn,
        user
      });
    } else {
      store.dispatch(signOut);
    }
  },
  error: error => {
    store.commit({
      error,
      type: signInError
    });
  }
});

export default store;
