# 5 Vue 3 핵심 역량 다지기(보너스 트랙)
## 59 Vue 3에서 Ref와 Reactive의 차이점

```js
<script setup>
  import { ref, reactive } from 'vue';

  const count = ref(0);
  const str = ref('hello');
  const obj = ref({name: "kwon"});
  const reactive_obj = reactive({name: "kwon"});

  console.log('ref_obj', obj.value.name);
  console.log(reactive_obj.name);
</script>

<template>
  <h1>Ref & Reactive</h1>
  <p>{{ count }}</p>
  <p>{{ str }}</p>
  <p>obj(ref): {{ obj.name }}</p>
  <p>reactive_obj: {{ reactive_obj.name }}</p>
</template>

```

## 60 양방향 데이터 전달, 이제 이거로 끝(v-model과 defineModel)

```js
// App.vue
<script setup>
import { ref } from 'vue';
import Comp from './Comp.vue';

let title = ref('title')
</script>

<template>
  <h1>{{ title }}</h1>
  <Comp v-model="title" />
</template>

// Comp.vue
<script setup>
  import { ref } from 'vue'

  const model = defineModel();
</script>

<template>
  <h2>{{ model }}</h2>
  <p>inputText: {{ model}}</p>
  <input 
    type="text" 
    v-model="model"
  />
</template>
```
