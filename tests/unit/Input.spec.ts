import { mount } from "@vue/test-utils";

import Input from "@/components/Input.vue";

describe("Input.vue", () => {
  const wrapper = mount(Input);

  it("should show a label if given", async () => {
    expect(wrapper.find(".label").exists()).toBe(false);
    const label = "Test Label";
    await wrapper.setProps({
      label
    });
    expect(wrapper.find(".label").text()).toBe(label);
  });

  it("should pass value updates up to parent", () => {
    const inputValue = "Test Input Value";
    wrapper.find("input").setValue(inputValue);
    const emitted = wrapper.emitted();
    expect(emitted.input?.length).toEqual(1);
    expect(emitted.input?.[0]).toContain(inputValue);
  });
});
