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

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache()
})

class Home extends Component {

  state = {
    PokemonName: ''
  }

  handleSender = (newValue) => {
    this.setState({
      PokemonName: newValue
    })

    // console.log(this.state.PokemonName)
  }

  handleComponent = () => {
    if (this.state.PokemonName === '') {
      return <PokemonList nameSender={(value) => this.handleSender(value)} />
    } else {
      return (
        <PokemonDetail nameSender={this.state.PokemonName} />
      )
    }
  }

  handleBack = () => {
    this.setState({
      PokemonName: ''
    })
  }


  render() {
    return (
      <ApolloProvider client={client} >
        <main>
          <Fragment>
            <div >
              <div className="header">
                <div className="back">
                  <img src="https://svgsilh.com/svg/1646213.svg" alt="" onClick={(e) => this.handleBack(e)} />
                </div>
              </div>
              {/* <div className="row"> */}
              {
                <this.handleComponent />
                // <PokemonList nameSender={(value) => this.handleSender(value)} />
                // <PokemonList />
                // <PokemonDetail />
              }
              {/* </div> */}
              {/* <p>{this.state.PokemonName}</p> */}
            </div>
          </Fragment>
        </main>
      </ApolloProvider>
    )
  }
}

export default Home;