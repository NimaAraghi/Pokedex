import React, { useEffect, useState } from 'react'
import { getFullPokedexNumber, getPokedexNumber } from '../utils';
import TypeCard from './TypeCard';


const PokeCard = (props) => {
    const { selectedPokemon } = props;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const { name, height, abilities, stats, types, moves, sprites} = data || {};

    const imgList = Object.keys(sprites || {}).filter(val => {
        if(!sprites[val]) return false;
        if (['versions', 'other'].includes(val)) return false;
        return true;
    })

    useEffect(() => {
        // if loading, exit logic
        if(loading || !localStorage) return;

        // check if the selected pokemon is available in the cache
        // 1. define the cache
        let cache = {};
        if(localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'));
        }

        // 2. check the selceted pokemon is in the cache, otherwise fetch from the api
        if(selectedPokemon in cache) {
            // read from the cache
            setData(cache[selectedPokemon]);
            return;
        }
        
        // passed all the cache stuff to no avail and now we need to fetch data from the api

        const fetchPokemonData = async () => {
            setLoading(true);
            try {
                const baseUrl = 'https://pokeapi.co/api/v2/';
                const suffix = `pokemon/${getPokedexNumber(selectedPokemon)}`;
                const finalUrl = baseUrl + suffix;
                const res = await fetch(finalUrl);
                const pokemonData = await res.json();
                setData(pokemonData);
                console.log(pokemonData)

                cache[selectedPokemon] = pokemonData;
                localStorage.setItem('pokedex',JSON.stringify(cache));
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        fetchPokemonData();
        // 3. if we fetch from the api, make sure to save the information to the cache for next time
    }, [selectedPokemon]);

    if(loading || !data) {
        return (
            <div>
                <h4>
                    loading...
                </h4>
            </div>
        )
    }

    return (
        <div className='poki-card'>
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className='container'>
                {types.map((typeObj, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={typeObj?.type?.name} />
                    )
                })}
            </div>
            <img className='default-img' src={`/pokemon/${getFullPokedexNumber(selectedPokemon)}.png`} alt={`${name}-large-image`} />
            <div className="img-container">
                {imgList.map((spriteUrl, spriteIndex) => {
                    const imgUrl = sprites[spriteUrl];
                    return(
                        <img key={spriteIndex} src={imgUrl} alt={`${name}-img-${spriteUrl}`} />
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {stats.map((statObj, statIndex) => {
                    const { stat, base_stat } = statObj;
                    return(
                        <div key={statIndex} className='stat-item'>
                            <p>{stat?.name.replaceAll('-', ' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PokeCard