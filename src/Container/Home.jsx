import React, { Fragment } from "react";
import { Component } from "react/cjs/react.production.min";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import './Home.css'
import PokemonList from "../Component/PokemonList";
import PokemonDetail from "../Component/PokemonDetail/PokemonDetail";
import MyPokemon from "../Component/MyPokemon/MyPokemon";

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache()
})

class Home extends Component {

  state = {
    PokemonName: '',
    countMyPoke: '',
    page: 'home'
  }

  handleSender = (newValue) => {
    this.setState({
      PokemonName: newValue,
      page: 'pokemon'
    })

    // console.log(this.state.PokemonName)
  }

  handleComponent = () => {
    if (this.state.page === 'home') {
      return <PokemonList nameSender={(value) => this.handleSender(value)} />
    } else if (this.state.page === 'pokemon') {
      return (
        <PokemonDetail nameSender={this.state.PokemonName} senderCount={(newValue) => this.handleCountMyPoke(newValue)} />
      )
    } else if (this.state.page === 'mypokemon') {
      return (
        <MyPokemon />
      )
    }
  }

  handleBack = () => {
    this.setState({
      PokemonName: '',
      page: 'home'
    })
  }

  handleMyPokemon = () => {
    this.setState({
      page: 'mypokemon'
    })
  }

  countMyPokemon = () => {
    let local = localStorage.getItem('nickname');
    if (local !== null) {
      // if (local.length > 2) {
      let jumlah = local.split(",");
      console.log(jumlah);
      this.setState({
        countMyPoke: jumlah.length
      })
      // }
    } else {
      this.setState({
        countMyPoke: 0
      })
    }
  }

  handleCountMyPoke = (newValue) => {
    this.setState({
      countMyPoke: newValue
    })
  }

  render() {
    return (
      <ApolloProvider client={client} >
        <Fragment>
          <div onLoad={this.countMyPokemon}>
            <div className="header">
              <div className="back">
                <img src="https://svgsilh.com/svg/1646213.svg" alt="" onClick={(e) => this.handleBack(e)} />
              </div>
              <div className="my-poke">
                <img src="https://svgsilh.com/svg/1165858.svg" alt="" onClick={(e) => this.handleMyPokemon(e)} />
                <div className="count">{this.state.countMyPoke}</div>
              </div>
            </div>
            {/* <div className="row"> */}
            {
              <this.handleComponent />
              // <MyPokemon />
              // <PokemonList nameSender={(value) => this.handleSender(value)} />
              // <PokemonList />
              // <PokemonDetail />
            }
            {/* </div> */}
            {/* <p>{this.state.PokemonName}</p> */}
          </div>
        </Fragment>
      </ApolloProvider>
    )
  }
}

export default Home;