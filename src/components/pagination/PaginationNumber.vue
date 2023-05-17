<template>
    <ion-button :fill="fillType" :color="color" @click="buttonPressed">{{ number }}</ion-button>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

const emit = defineEmits(['pageSelected']);

const props = defineProps({
    number: {
        type: Number,
        default: () => 1
    },
    active: {
        type: Boolean
    }
});
const {number, active} = toRefs(props);

const fillType = computed(() => {
    return active.value ? 'solid' : 'clear';
});

const color = computed(() => {
    return !active.value ? 'medium' : '';
});

const buttonPressed = () => {
    emit('pageSelected', number.value);
};


</script>


<style scoped lang="scss">

</style>
