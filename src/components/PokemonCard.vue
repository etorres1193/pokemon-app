<template>
    <ion-card>
        <ion-card-header color="light" class="ion-no-padding">
            <ion-img :src="pokemon.avatar" :alt="pokemon.name"></ion-img>
        </ion-card-header>
        <ion-card-content>
            <div class="ion-margin-top">
                <ion-text color="label" class="ion-text-capitalize">
                    <h1>{{ pokemon.name }}</h1>
                </ion-text>
            </div>
            <ion-text># {{ pokemon.order }}</ion-text>
            <div class="ion-margin-top">
                <ion-text>
                    Moves
                    <ion-label color="dark">{{ pokemon.moves?.length }}</ion-label>
                </ion-text>
                <ion-text class="ion-margin-start" color="medium">
                    Experience
                    <ion-label color="dark">{{ pokemon.experiences}}</ion-label>
                </ion-text>
            </div>
            <div class="ion-margin-top badge-container">
                <ion-badge color="light" v-for="type of pokemon.types">{{ type.name }}</ion-badge>
            </div>
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader } from '@ionic/vue';
import { toRefs } from 'vue';
import Pokemon from '@/interfaces/Pokemon';

const props = defineProps<{
    pokemon: Pokemon
}>();

const {pokemon} = toRefs(props);

</script>


<style scoped lang="scss">

ion-card {
  border-radius: 10px;
}

h1 {
  font-weight: bold;
}

ion-img {
  max-width: 150px;
  margin: 0 auto;
}

.badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;

  ion-badge {
    padding: 10px;
    border-radius: 25px;
    color: var(--ion-color-medium);
  }
}
</style>
