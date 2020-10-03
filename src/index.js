/**
 * Vue Mixin
 */
export default {
    data: function() {
        return {
            $fetch: {
                /**
                 * If the fetch is loading.
                 */
                isLoading: () => this.$fetchState.loading === true,
    
                /**
                 * If the fetch has succeeded.
                 */
                isSuccess: () =>
                    !this.$fetchState.loading && !this.$fetchState.error,
    
                /**
                 * If the fetch has failed.
                 */
                isError: () => this.$fetchState.error === true
            },
    
            $fetchState: {
                /**
                 * If the fetch is loading.
                 */
                loading: false,
    
                /**
                 * Error when the fetch has failed.
                 */
                error: null
            }
        }
    },

    /**
     * When the component gets created.
     */
    created: async function() {
        // Make sure the `fetch` option is present.
        if (hasFetch(this)) {
            this.$fetchState.loading = true;

            // Attempt to call the fetch function
            try {
                await this.$options.fetch.call(this);
            } catch (err) {
                this.$fetchState.error = err;
            } finally {
                this.$fetchState.loading = false;
            }
        }
    }
};

/**
 * Check if the `fetch` option is present inside the component.
 * @param vm Vue instance
 */
function hasFetch(vm) {
    return vm.$options && typeof vm.$options.fetch === "function";
}
