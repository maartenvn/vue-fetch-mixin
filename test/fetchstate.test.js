import mixin from "../src/";
import flushPromises from "flush-promises";
import { mount } from "@vue/test-utils";

describe("$fetchState tests", () => {
    const mockErrorMessage = "Is it a bug? Is it a plane? No its an error!";

    // Component to execute tests on.
    function mockComponent(promise) {
        return {
            template: "<div></div>",
            mixins: [mixin],

            async fetch() {
                await promise;
            }
        };
    }

    test("'loading' is true when the promise is not yet resolved", () => {
        const promise = Promise.resolve();
        const vm = mount(mockComponent(promise)).vm;

        expect(vm.$data.$fetchState.loading).toEqual(true);
    });

    test("'loading' is false when the promise has been resolved", async () => {
        const promise = Promise.resolve();
        const vm = mount(mockComponent(promise)).vm;

        // Await the promise before checking the result
        await flushPromises();

        expect(vm.$data.$fetchState.loading).toEqual(false);
    });

    test("'error' is null when the promise succeeded", async () => {
        const promise = Promise.resolve();
        const vm = mount(mockComponent(promise)).vm;

        // Await the promise before checking the result
        await flushPromises();

        expect(vm.$data.$fetchState.error).toEqual(null);
    });

    test("'error' is defined and correct when the promise failed", async () => {
        const promise = Promise.reject(mockErrorMessage);
        const vm = mount(mockComponent(promise)).vm;

        // Await the promise before checking the result
        await flushPromises();

        expect(vm.$data.$fetchState.error).toEqual(mockErrorMessage);
    });
});
