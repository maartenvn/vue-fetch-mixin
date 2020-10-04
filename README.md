# vue-fetch-mixin

[![build status](https://img.shields.io/travis/maartenvn/vue-fetch-mixin)](https://travis-ci.org/maartenvn/vue-fetch-mixin)
[![npm version](https://img.shields.io/npm/v/vue-fetch-mixin)](https://www.npmjs.com/vue-fetch-mixin)
[![npm downloads](https://img.shields.io/npm/dm/vue-fetch-mixin)](http://npm-stat.com/charts.html?package=vue-fetch-mixin)


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

Vue 2:
```js
import Vue from "vue";
import fetchMixin from "vue-fetch-mixin";

Vue.mixin(fetchMixin);
```

Vue 3:
```js
import { createApp } from "vue";
import fetchMixin from "vue-fetch-mixin";

const app = createApp(App);
app.mixin(fetchMixin)
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