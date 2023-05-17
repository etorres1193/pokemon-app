import { defineStore } from 'pinia';
import PokemonApi from '@/api/PokemonApi.js';
import Pokemon from '@/interfaces/Pokemon';
import useAppStore from '@/store/AppStore';
import PokemonPagination from '@/interfaces/PokemonPagination';
import PokemonFilter from '@/interfaces/PokemonFilter';

export default defineStore('pokemon', {
    state: () => ({
        pokemon: [] as Pokemon [],
        pokemonDetail: null as Pokemon | null
    }),
    getters: {
        findAllPokemon: (state) => (filter: PokemonFilter): PokemonPagination => {
            const offset = (filter.page - 1) * filter.limit;

            let pokemonList: Pokemon[] = state.pokemon;

            if (filter.argument) {
                pokemonList = state.pokemon.filter((pokemon =>
                    pokemon.name.toLowerCase().includes(filter.argument?.toLowerCase() || '')));
            }

            if (filter.moves) {
                pokemonList = pokemonList.filter(pokemon => pokemon.moves.length === filter.moves);
            }

            if (filter.experiences) {
                pokemonList = pokemonList.filter(pokemon => pokemon.experiences === filter.experiences);
            }

            if (filter.types && filter.types.length > 0) {
                pokemonList = pokemonList.filter(pokemon =>
                    pokemon.types.some(type => filter.types?.includes(type)));
            }


            return {
                pages: Math.ceil(pokemonList.length / filter.limit),
                count: pokemonList.length,
                currentPage: filter.page,
                filtered: pokemonList.length !== state.pokemon.length,
                pokemon: pokemonList.slice(offset, offset + filter.limit)
            };
        }
    },
    actions: {
        loadAllPokemon() {
            PokemonApi.findAllPokemon().then(pokemon => {
                this.pokemon = pokemon.map(data => ({
                    id: data.id,
                    name: data.name,
                    order: data.order,
                    height: data.height,
                    weight: data.weight,
                    experiences: data.base_experience,
                    avatar: data.sprites.other['official-artwork'].front_default,
                    stats: data.stats ? data.stats.map((item : any) => ({
                        value: item.base_stat,
                        name: item.stat.name,
                        color: '#072AC8',
                    })) : [],
                    types: data.types ? data.types.map((item: any) => item.type.name) : [],
                    moves: data.moves ? data.moves.map((item: any) => item.move.name) : [],
                    abilities: (data.abilities ? data.abilities.map((item: any) => item.ability.name) : []).join(', '),
                    specie: data.species?.name
                }));
                const appStore = useAppStore();
                appStore.loaded = true;
            });
        }
    }
});
