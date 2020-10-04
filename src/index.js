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
                isLoading: () => this.$data.$fetch.loading,
    
                /**
                 * If the fetch has succeeded.
                 */
                isSuccess: () =>
                    !this.$data.$fetch.loading && !this.$data.$fetch.error,
    
                /**
                 * If the fetch has failed.
                 */
                isError: () => this.$data.$fetch.error !== null,

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
            this.$data.$fetch.loading = true;

            // Attempt to call the fetch function
            try {
                await this.$options.fetch.call(this);
            } catch (err) {
                this.$data.$fetch.error = err;
                this.$data.$fetch.error = err;
            } finally {
                this.$data.$fetch.loading = false;
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
