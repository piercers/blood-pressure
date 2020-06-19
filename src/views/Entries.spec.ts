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
      entries: () => jest.fn().mockReturnValue(entriesMock)
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

  it("should display all entries in a list", () => {
    const wrapper = shallowMount(Entries, {
      localVue,
      store
    });
    expect(wrapper.findAll(".row").length).toBe(3);
  });

  it("should update sort on click of table headers", async () => {
    const wrapper = shallowMount(Entries, {
      localVue,
      store
    });
    const headers = wrapper.vm.$data.headers;
    expect(wrapper.vm.$data.sortBy).toBe(headers[0]);
    await wrapper.find(".cell--header:last-child").trigger("click");
    expect(wrapper.vm.$data.sortBy).toBe(headers[headers.length - 1]);
  });

  it("should format dates to be friendlier", () => {
    const wrapper = shallowMount(Entries, {
      localVue,
      store
    });
    expect(
      wrapper
        .find(".row")
        .find(".cell")
        .text()
    ).toBe("Jun 17");
  });
});
