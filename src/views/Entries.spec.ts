import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, { Store, GetterTree } from "vuex";

import Entries from "@/views/Entries.vue";
import { entriesList } from "@/store/types";
import { State } from "@/store";
import { Entry } from "@/core/entries.interfaces";

const localVue = createLocalVue();

localVue.use(Vuex);

const entriesMock: Entry[] = [
  {
    dateTime: "2020-06-18T05:16:54.219Z",
    diastolic: 100,
    pulse: 100,
    systolic: 100
  },
  {
    dateTime: "2020-06-18T05:17:07.950Z",
    diastolic: 100,
    pulse: 100,
    systolic: 100
  },
  {
    dateTime: "2020-06-18T05:17:19.115Z",
    diastolic: 100,
    pulse: 100,
    systolic: 100
  }
];

describe("Entries.vue", () => {
  let actions: any;
  let getters: GetterTree<State, any>;
  let store: Store<State>;

  beforeEach(() => {
    actions = {
      [entriesList]: jest.fn((state, action) => action)
    };
    getters = {
      entriesAscending: () => jest.fn().mockReturnValue(entriesMock)
    };
    store = new Vuex.Store({
      actions,
      getters
    });
  });

  it("should fetch entries on create", () => {
    shallowMount(Entries, {
      localVue,
      store
    });
    const result = actions[entriesList].mock.results[0].value;
    expect(result).toEqual(expect.objectContaining({ type: entriesList }));
  });
});
