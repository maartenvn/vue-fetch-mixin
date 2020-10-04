# vue-fetch-mixin
Mixin for easy data fetching in Vue. Prevents unnecesarry boilerplate code and offers a much more intuative workflow. Inspired by the Nuxt.JS `fetch` hook.


## Installation

### Using NPM:

```
npm install vue-fetch-mixin --save
```

### Using YARN

```
yarn add vue-fetch-mixin
```

### Using CDN

```html
<script src="https://unpkg.com/vue-fetch-mixin@latest/dist/vue-fetch-mixin.min.js"></script>
```

## Usage

### Register the mixin

**Component level:**

```vue
<script>
import fetchMixin from "vue-fetch-mixin";

export default {
    mixins: [fetchMixin]
}
</script>
```

**Global level:**
```js
import Vue from "vue";
import fetchMixin from "vue-fetch-mixin";

Vue.mixin(fetchMixin);
```

### Use in components

```vue
<template>
    <div>

        <!-- Loading -->
        <template v-if="$fetch.isLoading()">
            Loading...
        </template>

        <!-- Success -->
        <template v-else-if="$fetch.isSuccess()">
            {{ articles }}
        </template>

        <!-- Error -->
        <template v-else-if="$fetch.isError()">
            Oops an error:

            <p>
                {{ $fetch.error }}
            </p>
        </template>
    </div>
</template>

<script>
import fetchMixin from "vue-fetch-mixin";

export default {
    mixins: [fetchMixin],

    data() {
        return {
            articles: []
        }
    }

    async fetch() {
        this.articles = await fetch("http://api/articles").then(res => res.json());
    }
}
</script>
```