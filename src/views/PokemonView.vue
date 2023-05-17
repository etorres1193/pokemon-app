<template>
    <ion-page>
        <HeaderComponent @filter="openFilterModal" @search="searchHandler($event)"/>
        <ion-content :fullscreen="true" color="gray">
            <div class="ion-text-center ion-margin-top" v-if="loading">
                <ion-spinner name="lines"></ion-spinner>
            </div>
            <main v-else>
                <div v-if="pokemon.length > 0">
                    <div class="ion-padding">
                        <ion-card class="ion-margin-bottom" v-if="filtered">
                            <ion-card-content>
                                <ion-label color="label" class="result-count">
                                    <h2>{{ totalResults }} resultados</h2>
                                </ion-label>
                            </ion-card-content>
                        </ion-card>

                        <PokemonCard :pokemon="item" v-for="item of pokemon" :key="item.id"
                                     @click="showDetail(item)"
                                     class="ion-margin-bottom"/>
                    </div>
                    <PaginationComponent :current-page="filter.page"
                                         :total-pages="totalPages"
                                         @setPage="filter.page = $event"/>
                </div>

                <div class="ion-text-center" v-if="!pokemon.length">
                    <h5>No results.</h5>
                </div>
            </main>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, modalController, useIonRouter } from '@ionic/vue';
import { ref, watch } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import PaginationComponent from '@/components/pagination/PaginationComponent.vue';
import PokemonCard from '@/components/PokemonCard.vue';
import PokemonFilterComponent from '@/components/PokemonFilterComponent.vue';
import useAppStore from '@/store/AppStore';
import usePokemonStore from '@/store/PokemonStore';
import Pokemon from '@/interfaces/Pokemon';
import PokemonFilter from '@/interfaces/PokemonFilter';

const ionRouter = useIonRouter();
const pokemonStore = usePokemonStore();
const appStore = useAppStore();

const pokemon = ref<Pokemon[]>([]);
const loading = ref<boolean>(true);
const filtered = ref<boolean>(true);
const totalPages = ref<number>(0);
const totalResults = ref<number>(0);


const filter = ref<PokemonFilter>({
    page: 1,
    limit: 20
});

const filterPokemon = (filter: PokemonFilter) => {
    const pokemonData = pokemonStore.findAllPokemon(filter);
    totalPages.value = pokemonData.pages;
    totalResults.value = pokemonData.count;
    filtered.value = pokemonData.filtered;
    pokemon.value = pokemonData.pokemon;
};

watch(filter, (newFilter) => filterPokemon(newFilter), {deep: true});

appStore.$subscribe((mutation, state) => {
    if (state.loaded) {
        filterPokemon(filter.value);
        loading.value = false;
    }
});

const showDetail = (pokemon: Pokemon) => {
    pokemonStore.pokemonDetail = pokemon;
    ionRouter.push('/pokemon/detail');
};

const openFilterModal = async () => {
    const modal = await modalController.create({
        component: PokemonFilterComponent,
    });

    await modal.present();

    const {data} = await modal.onWillDismiss();

    if (data) {
        filter.value.experiences = data.experiences;
        filter.value.moves = data.moves;
        filter.value.types = data.types;
        filter.value.page = 1;
    }
};

const searchHandler = (argument: string) => {
    filter.value.page = 1;
    filter.value.argument = argument;
};

</script>
<style scoped lang="scss">

</style>
