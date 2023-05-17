import httpClient from '@/config/HttpClient';


async function findAllPokemon() {

    const {data} = await httpClient.get('/pokemon');
    const requestList = Array.from({length: data.count}, (value, index) => index + 1)
        .map(id => httpClient.get(`/pokemon/${id}`).catch(e => e));


    const results = await Promise.allSettled(requestList);
    return results
        .filter(result => result.status === 'fulfilled')
        .filter((result: any) => result.value.status >= 200 && result.value.status <= 299)
        .map((result: any) => result.value.data);
}

async function findPokemonByName(name: string) {
    const {data} = await httpClient.get(`/pokemon/${name}`);
    return data;
}

async function findAllPokemonType() {
    const {data} = await httpClient.get('/type');
    return data && data.results ? data.results : [];
}


const services = {
    findAllPokemon,
    findPokemonByName,
    findAllPokemonType
};

export default services;
