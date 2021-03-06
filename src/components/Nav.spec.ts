import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex, { Store } from "vuex";

import Nav from "@/components/Nav.vue";
import { User } from "@/core/auth.interfaces";
import { routes, inNavRoutes } from "@/router";
import { State } from "@/store";
import { authSignOut } from "@/store/types";

jest.mock("@/core/auth");

const localVue = createLocalVue();

localVue.use(Vuex);

const storeMock = (actions: { [actionName: string]: () => {} }) => (
  state: any = {}
) =>
  new Vuex.Store({
    actions,
    state
  });

const storeWithUser = {
  user: {} as User
};

describe("Nav.vue", () => {
  let actions: { [actionName: string]: () => {} };
  let store: (state?: Partial<State>) => Store<State>;

  beforeEach(() => {
    actions = {
      [authSignOut]: jest.fn()
    };
    store = storeMock(actions);
  });

  it("should have a list of links", () => {
    const wrapper = shallowMount(Nav, {
      localVue,
      store: store(storeWithUser)
    });
    const routesWithProfile = inNavRoutes(routes).length + 1;
    expect(wrapper.findAll(".link").length).toEqual(routesWithProfile);
  });

  it("should show a 'sign in' link if user not signed in", () => {
    const wrapper = shallowMount(Nav, {
      localVue,
      store: store()
    });
    const signInLink = wrapper.get(".js-sign-in");
    expect(signInLink.props().to).toBe("/sign-in");
  });

  it("shows a 'profile' link when user is signed in", async () => {
    const wrapper = shallowMount(Nav, {
      localVue,
      store: store(storeWithUser)
    });
    const profileLink = wrapper.get(".js-profile");
    expect(profileLink.props().to).toBe("/profile");
  });
});
