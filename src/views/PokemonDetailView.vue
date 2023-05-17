<template>
    <ion-page>
        <ion-header class="ion-no-border">
            <ion-toolbar color="light">
                <ion-buttons>
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <header class="ion-padding ion-text-center">
                    <div class="pokemon-name">
                        <ion-label color="label" class="ion-text-capitalize"><h1>{{ pokemon?.name }}</h1></ion-label>
                        <ion-label color="label"><h2>#{{ pokemon?.order }}</h2></ion-label>
                    </div>
                    <ion-img
                            :src="pokemon?.avatar"
                            :alt="pokemon?.name"></ion-img>
                </header>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-segment v-model="segment">
                <ion-segment-button value="about">
                    <ion-label class="ion-text-capitalize">About</ion-label>
                </ion-segment-button>
                <ion-segment-button value="moves">
                    <ion-label class="ion-text-capitalize">Moves</ion-label>
                </ion-segment-button>
            </ion-segment>

            <div  v-if="segment === 'about'">
                <ion-grid class="ion-margin-top">
                    <ion-row>
                        <ion-col class="ion-text-end" size="4">Species:</ion-col>
                        <ion-col size="auto">
                            <ion-label color="label" class="ion-text-capitalize bold">{{ pokemon?.specie }}</ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col class="ion-text-end" size="4">Height:</ion-col>
                        <ion-col size="auto">
                            <ion-label color="label" class="ion-text-capitalize bold">{{ pokemon?.height }}</ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col class="ion-text-end" size="4">Weight:</ion-col>
                        <ion-col size="auto">
                            <ion-label color="label" class="ion-text-capitalize bold">{{ pokemon?.weight }}</ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col class="ion-text-end" size="4">Abilities:</ion-col>
                        <ion-col size="auto">
                            <ion-label color="label" class="ion-text-capitalize bold">{{ pokemon?.abilities }}</ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col class="ion-text-end" size="4">Experience:</ion-col>
                        <ion-col size="auto">
                            <ion-label color="label" class="ion-text-capitalize bold">{{ pokemon?.experiences }}</ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-align-items-center">
                        <ion-col class="ion-text-end" size="4">Type:</ion-col>
                        <ion-col size="auto">
                            <ion-badge :color="index % 2 === 0 ? 'success' : 'tertiary'"
                                       :class="{'ion-margin-start': index > 0}"
                                       v-for="(type, index) of pokemon?.types" :key="type">{{ type }}
                            </ion-badge>
                        </ion-col>
                    </ion-row>
                </ion-grid>
                <ion-label color="label">
                    <h6>Base stats</h6>

                    <BarChart :chartData="barData" :options="options"  />
                </ion-label>
            </div>

            <div class="ion-margin-top" v-if="segment === 'moves'">

                <ion-grid>
                    <ion-row class="ion-margin-bottom">
                        <ion-col size="12">
                            <ion-label color="label" class="bold"><h2>{{pokemon?.moves?.length}} moves</h2></ion-label>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="4" v-for="(move, index) of pokemon?.moves">
                            <MoveTypeComponent :title="move" :number="index"></MoveTypeComponent>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>



        </ion-content>
    </ion-page>


</template>

<script setup lang="ts">
import { IonBackButton, IonContent, IonHeader, IonPage, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/vue';
import MoveTypeComponent from '@/components/MoveTypeComponent.vue';
import { onMounted, ref } from 'vue';
import Pokemon from '@/interfaces/Pokemon';
import usePokemonStore from '@/store/PokemonStore';
import { BarChart  } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);


const pokemonStore = usePokemonStore();
const pokemon = ref<Pokemon | null>();
const segment = ref<'about' | 'moves'>('about');

const barData = ref<any>();
const options = ref<any>({
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
    }
});

onMounted(() => {
    pokemon.value = pokemonStore.pokemonDetail;
    const labels = pokemon.value?.stats.map((stat: any) => stat.name);
    const values = pokemon.value?.stats.map((stat: any) => stat.value);
    const colors = pokemon.value?.stats.map((stat: any) => stat.color);

    barData.value = {
        labels: labels,
        datasets: [
            {
                label: '',
                indexAxis: 'y',
                data: values,
                backgroundColor: colors,
            },
        ],
    };
});

</script>

<style scoped lang="scss">
h1, h2, h6 {
  font-weight: bold;
}

.pokemon-name {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

ion-img {
  width: 150px;
  object-fit: contain;
  margin: 0 auto;
}

ion-segment {
  width: 50%;
}

ion-badge {
  padding: 8px;
}

</style>
