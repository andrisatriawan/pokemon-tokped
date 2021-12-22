import React from "react";
import { Component } from "react/cjs/react.production.min";
import { gql, useQuery } from "@apollo/client";
import './PokemonList.css'


class PokemonList extends Component {
  state = {
    value: ''
  }

  handleSender = (newValue) => {
    this.props.nameSender(newValue)
  }

  handleClick = (newValue) => {
    this.setState({
      value: newValue
    }, () => {
      this.handleSender(this.state.value)
    })
    // console.log(nesValue)
  }

  GET_POKEMON = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        url
        name
        image
      }
    }
  }`;

  gqlVariables = {
    limit: 20,
    offset: 0,
  };

  List = () => {
    const { loading, error, data: { pokemons = [] } = {} } = useQuery(this.GET_POKEMON, {
      variables: this.gqlVariables,
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    // console.log('Data ', pokemons.results)

    return (
      <div className="row">
        {pokemons.results.map((pokemon) =>
          <div className="col-6" key={pokemon.id}>
            <div className="card" onClick={(e) => this.handleClick(pokemon.name, e)}>
              <div className="img-thumb">
                <img src={pokemon.image} alt="" />
              </div>
              <p className="product-title" >{pokemon.name.toUpperCase()}</p>
              <p className="product-price"></p>
            </div>
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <this.List />
    )
  }
}

export default PokemonList;