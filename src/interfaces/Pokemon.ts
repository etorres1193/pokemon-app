export default interface Pokemon {
    id: number;
    name: string;
    order: number;
    height: number;
    weight: number;
    experiences: number;
    avatar: string;
    stats: any[];
    types: any[];
    moves: any[];
    abilities: any[];
    specie: string;
}
