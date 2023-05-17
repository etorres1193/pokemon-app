<template>
    <div class="pagination">
        <ion-button fill="clear" color="primary" @click="previous">
            <ion-icon :icon="chevronBack"></ion-icon>
        </ion-button>
        <PaginationNumber :number="page" v-for="page of pages"
                          :active="currentPage === page"
                          @pageSelected="pageChanged($event)"></PaginationNumber>
        <ion-button fill="clear" color="primary" @click="next">
            <ion-icon :icon="chevronForward"></ion-icon>
        </ion-button>
    </div>

</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { chevronBack, chevronForward } from 'ionicons/icons';
import PaginationNumber from '@/components/pagination/PaginationNumber.vue';
import { computed, ref, toRefs, watch } from 'vue';

const PAGE_COUNTER = 5;

const props = defineProps({
    totalPages: {
        type: Number,
        default: () => 0
    },
    currentPage: {
        type: Number,
        default: () => 1
    }
});

const emit = defineEmits(['setPage']);

const {totalPages, currentPage} = toRefs(props);
const pageIndex = ref<number>(1);
const limit = ref<number>(PAGE_COUNTER);

const pages = computed(() => {
    return Array.from({length: limit.value}, (val, index) => (index + pageIndex.value));
});

const pageChanged = (page: number) => {
    emit('setPage', page);
};

const next = () => {
    const nextPage = currentPage.value + 1;
    if (nextPage <= pageIndex.value + limit.value - 1) {
        if (nextPage <= totalPages.value) {
            pageChanged(nextPage);
        }
    } else {
        pageIndex.value++;
        if (pageIndex.value + limit.value - 1 > totalPages.value) {
            pageIndex.value = totalPages.value - limit.value + 1;
            if (pageIndex.value < 1) {
                pageIndex.value = 1;
            }
        } else {
            pageChanged(nextPage);
        }
    }
};

const previous = () => {
    const previosPage = currentPage.value - 1;

    if (previosPage >= pageIndex.value) {
        pageChanged(previosPage);
    } else {
        pageIndex.value--;
        if (pageIndex.value < 1) {
            pageIndex.value = 1;
        } else {
            pageChanged(previosPage);
        }
    }
};

watch(totalPages, (pages) => {
    if (limit.value > pages) {
        limit.value = pages;
    } else {
        limit.value = PAGE_COUNTER;
    }
});

</script>
<style scoped lang="scss">
.pagination {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70px;
}
</style>
