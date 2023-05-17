<template>
    <ion-header>
        <ion-toolbar>
            <header class="ion-padding">
                <ion-text><h2>What pokemon are you looking for?</h2></ion-text>
                <section>
                    <ion-searchbar class="ion-no-padding"
                                   @ionInput="searching($event)"
                                   placeholder="Search pokemon"></ion-searchbar>
                    <ion-button fill="clear" id="open-modal" @click="onFilter">
                        <ion-icon :icon="optionsOutline" size="large"></ion-icon>
                    </ion-button>
                </section>
            </header>
        </ion-toolbar>
    </ion-header>
</template>
<script setup lang="ts">

import { optionsOutline } from 'ionicons/icons';
import { IonIcon, IonSearchbar } from '@ionic/vue';

const emit = defineEmits(['filter', 'search']);

const onFilter = () => {
    emit('filter');
};

const searching = (event: any) => {
    const query = event.target.value.toLowerCase();
    emit('search', query);
};

</script>


<style scoped lang="scss">
header {
  color: #ffffff;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background: var(--ion-color-primary);
  background: linear-gradient(rgb(var(--ion-color-primary-rgb), 0.85), rgb(var(--ion-color-primary-rgb), 0.85)), url("@/assets/pokemon-ball.png") no-repeat fixed right;
  background-size: 40%;

  h2 {
    width: 70%;
  }

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;

    ion-searchbar {
      --background: transparentize();
      --box-shadow: 0px;
      --color: white;
      --icon-color: white;
      border-bottom: 1px solid white;
    }
  }
}
</style>
