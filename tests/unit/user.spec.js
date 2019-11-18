import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Users from "@/components/User.vue";

const wrapper = shallowMount(User);

describe("User test", () => {
  /*  it("Id Prop is not empty", () => {
    expect(wrapper.vm.$data.id).to.not.equal("undefined");
  }); */

  it("user model is an object", () => {
    expect(wrapper.vm.$data.users).to.be.an("object");
  });
});
