import React, { Fragment } from "react";
import { Component } from "react/cjs/react.production.min";
import { gql, useQuery } from "@apollo/client";
import './PokemonDetail.css'


class PokemonDetail extends Component {
  state = {
    PokemonName: ''
  }

  handleState = () => {
    this.setState({
      PokemonName: this.props.nameSender
    })
  }

  getProbabylity = () => {
    const random = Math.floor(Math.random() * 100);
    if (random % 2 === 0) {
      console.log('true')

      document.getElementById('nickname').disabled = false
      // document.getElementById('btn-save').disabled = false
      // document.getElementById('btn-save').onClick = (e) => this.getValue(e)

      // const cari_item = localStorage.getItem('id_pokemon');
      // let items = [];
      // if (cari_item === null) {
      //   items = [];
      //   items.push(value);
      // } else {
      //   items = [cari_item];
      //   items.push(value);
      // }
      // console.log(items);
      // // localStorage.setItem('id_pokemon', items);
      // // localStorage.removeItem('id_pokemon', value);
      // console.log(localStorage.getItem('id_pokemon'))


    } else {
      console.log('false')
      document.getElementById('nickname').disabled = true

    }
  }

  viewCache = () => {
    const lookCache = localStorage.getItem('id_pokemon');
    const arrayCache = lookCache.split(",");
    for (let i = 0; i < arrayCache.length; i++) {
      console.log(arrayCache[i]);
    }
    // console.log(arrayCache);

  }

  save = (name, image) => {
    // console.log(value)
    let nickname = document.getElementById('nickname').value
    // console.log(name)
    const lookCache = localStorage.getItem('nickname');
    let newNickname = [];
    let newNicknameData = [];
    if (lookCache === null) {
      newNickname.push(nickname);
      newNicknameData.push(name);
      newNicknameData.push(image);
      // localStorage.setItem(nickname, nickname);
    } else {
      newNickname = [lookCache];
      newNickname.push(nickname);
      newNicknameData.push(name);
      newNicknameData.push(image);
      // localStorage.setItem('nickname', nickname);
    }
    localStorage.setItem('nickname', newNickname);
    localStorage.setItem(nickname, newNicknameData);

    // console.log(newNickname);
    // console.log(newNicknameData)

  }

  cekCache = () => {
    let nickname = localStorage.getItem('nickname')
    const arrayNickname = nickname.split(",");
    console.log(arrayNickname);
    for (let i = 0; i < arrayNickname.length; i++) {
      let cachedatanickname = localStorage.getItem(arrayNickname[i])
      let dataNickname = cachedatanickname.split(",")
      console.log(dataNickname)
    }
  }

  GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }`;

  gqlVariables = {
    name: this.props.nameSender
  };

  Pokemon = () => {
    // this.handleState()
    const { loading, error, data: { pokemon = [] } = {} } = useQuery(this.GET_POKEMON, {
      variables: this.gqlVariables,
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
      <div className="row">
        <div className="col-12">
          <div className="card-detail">
            <div className="img-thumb">
              <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <p className="pokemon-name" >{pokemon.name.toUpperCase()}</p>
            <button className="btn" onClick={(e) => this.getProbabylity(e)}>Catch The Pokemon</button>
            <input type="text" id="nickname" className="input" disabled />
            <button className="btn" id="btn-save" onClick={(e) => this.save(pokemon.name, pokemon.sprites.front_default, e)}>Save</button>
            <div className="detail">
              <p className="title">
                Moves
              </p>
              <div className="list-moves">
                <ul>
                  {pokemon.moves.map(move =>
                    <li key={move.move.name}>{move.move.name}</li>
                  )}
                </ul>
              </div>
              <p className="title">
                Types
              </p>
              <div className="list-moves">
                <ul>
                  {pokemon.types.map(type =>
                    <li key={type.type.name}>{type.type.name}</li>
                  )}
                </ul>
              </div>
            </div>

          </div>
        </div >

      </div >
    )
  };

  render() {
    return (
      <Fragment>
        <this.Pokemon />
      </Fragment>
    )
  }
}

export default PokemonDetail;