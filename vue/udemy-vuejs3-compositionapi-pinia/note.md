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

## 61 computed로 동적인 계산값 처리하기

```js
<template>
  <p>num:{{num}} -> result: {{result}}</p>
</template>

<script setup>
import { ref, computed} from 'vue';

const num = ref(2);

const result = computed(() => {
  return num.value * 2;
})
</script>
```

```js
<template>
  <input 
    v-model="수입"
    placeholder="수입을 숫자로 입력"
  />
  <p>실수령액: {{실수령액}}</p>
</template>

<script setup>
import { ref, computed} from 'vue';

const 수입 = ref(null);
const 세율 = 3.3;

const 실수령액 = computed(() => {
  return 수입.value - (세율/100)*수입.value;
})
</script>
```
