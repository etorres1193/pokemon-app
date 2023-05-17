export default interface PokemonFilter {
    page: number;
    limit: number;
    types?: string[] | undefined;
    argument?: string | undefined;
    experiences?: number | undefined;
    moves?: number | undefined;
}
