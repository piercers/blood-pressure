import { shallowMount } from "@vue/test-utils";

import * as utils from "@/core/utils";
import SignIn from "@/views/SignIn.vue";

jest.mock("@/core/auth");
jest.mock("@/core/utils");

describe("SignIn.vue", () => {
  it("shows a 'loading' element while 'uiStart' is resolving", async () => {
    const wrapper = shallowMount(SignIn);
    expect(wrapper.text()).toBe("Loading...");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toBe("");
  });

  it("imports FirebaseUI styles on create", () => {
    shallowMount(SignIn);
    expect(utils.importStylesheet).toHaveBeenCalledWith(
      expect.stringContaining("firebaseui")
    );
  });
});
