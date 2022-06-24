# svelte-preprocess-uuid

## What is it?

It generates an ID at compile-time, which can be used for your DOM elements.

**Input**

```svelte
<script>
    const uuid_1 = '$'; 
    let uuid_2 = '$';
    var uuid_3 = '$';
    console.log(uuid_1);
    console.log(uuid_2);
</script>

<label for={uuid_1}>Label for {uuid_1}</label>
<input id={uuid_1} type="text" />
<label for={uuid_2}>Label for {uuid_2}</label>
<input id={uuid_2} type="text" />
```

**Output**
```svelte
<script>
    console.log('ac3dc94b-b448-456e-bf61-d886745a8bb4');
    console.log('3dc94bb4-4855-4ebf-a1d8-86745a8bb48e');
</script>

<label for="ac3dc94b-b448-456e-bf61-d886745a8bb4">Label for "ac3dc94b-b448-456e-bf61-d886745a8bb4"</label>
<input id="ac3dc94b-b448-456e-bf61-d886745a8bb4" type="text" />
<label for="3dc94bb4-4855-4ebf-a1d8-86745a8bb48e">Label for "3dc94bb4-4855-4ebf-a1d8-86745a8bb48e"</label>
<input id="3dc94bb4-4855-4ebf-a1d8-86745a8bb48e" type="text" />
```

## Installation

```
npm i --save-dev svelte-preprocess-uuid
```

Next, add it to svelte preprocessor group in `rollup.config.js`:

```js
import uuid from 'svelte-preprocess-uuid';

export default {
  plugins: [
    svelte({ preprocess: uuid })
  ]
}

// or if you are using another preprocessor, like svelte-preprocess
export default {
  plugins: [
    svelte({
      preprocess: [
        uuid,
        sveltePreprocess({}),
      ],
    })
  ]
}
```
