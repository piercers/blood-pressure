import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import AddEntry from "@/views/AddEntry.vue";
import { entriesAdd } from "@/store/types";

const localVue = createLocalVue();

localVue.use(Vuex);

const entryValid = {
  diastolic: 100,
  pulse: 100,
  systolic: 100
};

describe("AddEntry.vue", () => {
  it("should disable 'Add' button when form is invalid", async () => {
    const wrapper = shallowMount(AddEntry);
    const button = wrapper.find("button[type='submit']");
    expect(button.attributes("disabled")).toBeDefined();
    await wrapper.setData({
      form: entryValid
    });
    expect(button.attributes("disabled")).toBeUndefined();
  });

  it("should dispatch 'entriesAdd' with an Entry on submit", async () => {
    const actions = {
      [entriesAdd]: jest.fn((state, action) => action)
    };
    const wrapper = shallowMount(AddEntry, {
      localVue,
      store: new Vuex.Store({ actions })
    });
    await wrapper.setData({
      form: entryValid
    });
    await wrapper.find("form").trigger("submit");
    expect(actions[entriesAdd]).toHaveBeenCalledTimes(1);
    const result = actions[entriesAdd].mock.results[0].value;
    expect(result.type).toBe(entriesAdd);
    expect(result.entry).toEqual(expect.objectContaining({
      ...entryValid,
      dateTime: expect.any(String),
    }));
  });
});
