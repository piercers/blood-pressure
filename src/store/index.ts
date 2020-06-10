import { orderBy } from "lodash/fp";
import Vue from "vue";
import Vuex from "vuex";

import { db } from "@/core/api";
import {
  User,
  user,
  signOut,
  onAuthStateChanged
} from "@/core/auth";
import { Entry } from "@/core/entries.interfaces";
import router from "@/router";
import {
  entriesAdd,
  authSignOut,
  authSignInError,
  authSignIn,
  entriesAddError,
  entriesList,
  entriesListDone,
  entriesListError
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
    [entriesAdd](state, { entry }: { entry: Entry }) {
      state.entries.push(entry);
    },
    [entriesAddError](state, { entry }) {
      state.entries = state.entries.filter(
        ({ dateTime }) => dateTime !== entry.dateTime
      );
    },
    [entriesListDone](state, { entries }) {
      state.entries = entries;
    },
    [entriesListError](state) {
      state.entries = [];
    },
    [authSignIn](state, { user }: { user: User }) {
      state.user = user;
    },
    [authSignInError](state) {
      state.user = null;
    },
    [authSignOut](state) {
      state.user = null;
    }
  },
  actions: {
    [entriesAdd]({ commit, state }, payload) {
      if (!state.user?.uid) {
        throw new Error("[Actions.addEntry] No UID found.");
      }
      commit({
        type: entriesAdd,
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
            type: entriesAddError,
            error
          })
        );
    },
    [entriesList]({ commit, state }) {
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
            type: entriesListDone,
            entries
          });
        })
        .catch(error =>
          commit({
            type: entriesListError,
            error
          })
        );
    },
    [authSignIn]({ commit }, { user }) {
      commit({
        user,
        type: authSignIn
      });
      if (router.currentRoute.path === "/sign-in") {
        router.push("/");
      }
    },
    async [authSignOut]({ commit }) {
      await signOut();
      commit(authSignOut);
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
    },
    entries(state, getters) {
      return (key = "dateTime", descending = true) => {
        const entries = [...state.entries];
        if (key === "dateTime") {
          return descending
            ? getters.entriesDescending
            : getters.entriesAscending;
        }
        return orderBy([key], [descending ? "desc" : "asc"], entries);
      };
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
        type: authSignIn,
        user
      });
    } else {
      store.dispatch(authSignOut);
    }
  },
  error: error => {
    store.commit({
      error,
      type: authSignInError
    });
  }
});

export default store;
