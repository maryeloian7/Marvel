

class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json()
    }

    getAllCharacters =  () => {
        return this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=ac5b6b4de6b4010da933d96bc1d2df48');
    }
}

export default MarvelService;