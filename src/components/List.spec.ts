import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex, { Store, GetterTree } from "vuex";

import List from "@/components/List.vue";
import { Entry } from "@/core/entries.interfaces";
import { entriesList } from "@/store/types";
import { State } from "@/store";

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

describe("List.vue", () => {
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

  it("should display all entries in a list", () => {
    const wrapper = shallowMount(List, {
      localVue,
      store
    });
    expect(wrapper.findAll(".row").length).toBe(3);
  });

  it("should update sort on click of table headers", async () => {
    const wrapper = shallowMount(List, {
      localVue,
      store
    });
    const headers = wrapper.vm.$data.headers;
    expect(wrapper.vm.$data.sortBy).toBe(headers[0]);
    await wrapper.find(".cell--header:last-child").trigger("click");
    expect(wrapper.vm.$data.sortBy).toBe(headers[headers.length - 1]);
  });

  it("should format dates to be friendlier", () => {
    const wrapper = shallowMount(List, {
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
