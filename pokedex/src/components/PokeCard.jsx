import React, { useContext, useEffect, useState } from 'react'
import { getFullPokedexNumber, getPokedexNumber } from '../utils';
import TypeCard from './TypeCard';
import Modal from './Modal';
import { PokeContext } from '../context/PokeContext';


const PokeCard = (props) => {
    const { selectedPokemon } = useContext(PokeContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [skill, setSkill] = useState(null);
    const [loadingSkill, setLoadingSkill] = useState(false);

    const { name, height, abilities, stats, types, moves, sprites } = data || {};

    const imgList = Object.keys(sprites || {}).filter(val => {
        if (!sprites[val]) return false;
        if (['versions', 'other'].includes(val)) return false;
        return true;
    });

    const fetchMoveData = async (move, moveUrl) => {
        if(loadingSkill || !localStorage || !moveUrl) return;

        // check cache for move
        let cache = {};
        if(localStorage.getItem('pokemon-moves')) {
            cache = JSON.parse(localStorage.getItem('pokemon-moves'));
        }

        if(move in cache) {
            setSkill(cache[move]);
            console.log('Found move in cache');
            return;
        }

        try {
            setLoadingSkill(true);
            const res = await fetch(moveUrl);
            const moveData = await res.json();
            console.log('fetched move from api', moveData);
            const description = moveData?.flavor_text_entries.filter((val) => {
                return val.version_group.name = 'firered-leafgreen'
            })[0]?.flavor_text;

            const skillData = {
                name: move,
                description
            };
            setSkill(skillData);
            cache[move] = skillData;
            localStorage.setItem('pokemon-moves', JSON.stringify(cache));
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingSkill(false);
        }
    };

    useEffect(() => {
        // if loading, exit logic
        if (loading || !localStorage) return;

        // check if the selected pokemon is available in the cache
        // 1. define the cache
        let cache = {};
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'));
        }

        // 2. check the selceted pokemon is in the cache, otherwise fetch from the api
        if (selectedPokemon in cache) {
            // read from the cache
            setData(cache[selectedPokemon]);
            console.log('Found pokemon in cache');
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
                console.log('fetched pokemon Data')

                cache[selectedPokemon] = pokemonData;
                localStorage.setItem('pokedex', JSON.stringify(cache));
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        fetchPokemonData();
        // 3. if we fetch from the api, make sure to save the information to the cache for next time
    }, [selectedPokemon]);

    if (loading || !data) {
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
            {skill && (
                <Modal handleCloseModal={() => { setSkill(null) }}>
                    <div>
                        <h6>Name</h6>
                        <h2 className='skill-name'>{ skill.name.replaceAll('-', ' ') }</h2>
                    </div>
                    <div>
                        <h6>Description</h6>
                        <p>{ skill.description }</p>
                    </div>
                </Modal>
            )}
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
                    return (
                        <img key={spriteIndex} src={imgUrl} alt={`${name}-img-${spriteUrl}`} />
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {stats.map((statObj, statIndex) => {
                    const { stat, base_stat } = statObj;
                    return (
                        <div key={statIndex} className='stat-item'>
                            <p>{stat?.name.replaceAll('-', ' ')}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <div className="pokemon-move-grid">
                {moves.map((moveObj, moveIndex) => {
                    return (
                        <button key={moveIndex} onClick={() => {
                            fetchMoveData(moveObj?.move?.name, moveObj?.move?.url)
                        }} className='button-card pokemon-move'>
                            <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default PokeCard