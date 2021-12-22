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
          <div className="card">
            <div className="img-thumb">
              <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <p className="pokemon-name" >{pokemon.name.toUpperCase()}</p>
            <button className="btn" id="catch">Catch The Pokemon</button>
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
        </div>

      </div>
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