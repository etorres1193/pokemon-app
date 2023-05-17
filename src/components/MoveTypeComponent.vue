<template>
    <div class="move-container" :class="backgroundClass">
        <div class="img-container">
            <ion-img :src="image"></ion-img>
        </div>
        <ion-label class="ion-text-capitalize">{{ title }}</ion-label>
    </div>
</template>
<script setup lang="ts">
import { IonImg } from '@ionic/vue';
import { computed, toRefs } from 'vue';

const props = defineProps({
    title: {
        type: String,
    },
    number: {
        type: Number,
        default: () => 1
    }
});

const {number} = toRefs(props);

const image = computed(() => {
    return (number.value + 1) % 3 === 0 || number.value % 3 === 0 ? 'src/assets/icons/grass.png' : 'src/assets/icons/poisson.png';
});

const backgroundClass = computed(() => {
    return (number.value + 1) % 3 === 0 || number.value % 3 === 0 ? 'bg-success' : 'bg-tertiary';
});

</script>

<style scoped lang="scss">
.move-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2px;
  color: white;
  border-radius: 4px;
  height: 64px;
  width: 99px;
    font-size: 0.8rem;

  .img-container {
    border-radius: 50%;
    width: 34px;
    height: 34px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    ion-img {
      width: 25px;
      height: 25px;
    }
  }
}

.bg-success {
    background-color: var(--ion-color-success);
}

.bg-tertiary {
    background-color: var(--ion-color-tertiary);
}


</style>
