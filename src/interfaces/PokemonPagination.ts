import Pokemon from '@/interfaces/Pokemon';

export default interface PokemonPagination {
    pages: number;
    count: number;
    filtered: boolean;
    currentPage: number;
    pokemon: Pokemon[];
}
