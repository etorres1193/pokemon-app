<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar color="white">
                <ion-buttons class="ion-margin-top">
                    <ion-button @click="closeModal()">
                        <ion-icon color="primary" :icon="close" size="large"></ion-icon>
                    </ion-button>
                </ion-buttons>
                <div class="ion-padding">
                    <ion-label color="label">
                        <h1 class="ion-no-margin">Filter pokemon list</h1>
                    </ion-label>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-select label="Select movement number"
                        class="ion-margin-bottom"
                        v-model="filter.moves">
                <ion-select-option :value="move" v-for="move of moves" :key="move">{{ move }}</ion-select-option>
            </ion-select>
            <ion-select label="Select experience level"
                        class="ion-margin-bottom"
                        v-model="filter.experiences">
                <ion-select-option :value="exp" v-for="exp of experiences" :key="exp">{{ exp }}</ion-select-option>
            </ion-select>
            <ion-select label="Pokemon Type"
                        class="ion-margin-bottom"
                        v-model="filter.types"
                        label-placement="floating"
                        :multiple="true">
                <ion-select-option :value="type.name" v-for="type of pokemonTypes" :key="type.name">
                    {{ type.name }}
                </ion-select-option>
            </ion-select>


<!--            <pre>{{ filter }}</pre>-->

        </ion-content>
        <ion-footer class="ion-no-border">
            <ion-toolbar color="white">
                <div class="footer-buttons">
                    <ion-button color="btn-secondary" @click="closeModal">
                        <ion-label class="ion-text-capitalize">Cancel</ion-label>
                    </ion-button>
                    <ion-button @click="onFilter">
                        <ion-label class="ion-text-capitalize">Filter</ion-label>
                    </ion-button>
                </div>
            </ion-toolbar>
        </ion-footer>
    </ion-page>

</template>

<script setup lang="ts">
import {
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonToolbar,
    modalController
} from '@ionic/vue';
import { close } from 'ionicons/icons';
import { onMounted, ref } from 'vue';
import PokemonApi from '@/api/PokemonApi';

const closeModal = () => {
    modalController.dismiss();
};

const pokemonTypes = ref<any>([]);
const experiences = ref<any>([...Array(200).keys()]);
const moves = ref<any>([...Array(200).keys()]);


const filter = ref<any>({
    moves: null,
    experiences: null,
    types: []
});

const onFilter = () => {
    modalController.dismiss(filter.value);
};

onMounted(() => {
    PokemonApi.findAllPokemonType()
        .then(types => pokemonTypes.value = types);
});

</script>


<style scoped lang="scss">
ion-select {
  background-color: var(--ion-color-light);
  border-bottom: 2px solid var(--ion-color-medium);
  border-radius: 8px 8px 0 0;
  --padding-start: 8px;
  --padding-end: 8px;
}

.footer-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 10px;

  ion-button {
    width: 100%;
  }
}
</style>
