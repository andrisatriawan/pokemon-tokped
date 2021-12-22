import React, { Fragment } from "react";
import { Component } from "react/cjs/react.production.min";

class MyPokemon extends Component {
  ListMyPokemon = () => {
    let nickname = localStorage.getItem('nickname')
    const arrayNickname = nickname.split(",");
    let dataNickname = [];
    // for (let i = 0; i < arrayNickname.length; i++) {
    //   let cachedatanickname = localStorage.getItem(arrayNickname[i])
    //   dataNickname = cachedatanickname.split(",")
    //   // arrayNickname.push(dataNickname);
    //   // console.log(dataNickname)
    // }
    // console.log(arrayNickname);
    let data_array = []
    for (let i = 0; i < arrayNickname.length; i++) {
      let cachedatanickname = localStorage.getItem(arrayNickname[i])
      dataNickname = cachedatanickname.split(",");
      let dummy_array = {
        'nickname': arrayNickname[i],
        'result': {
          'name': dataNickname[0],
          'image': dataNickname[1]
        }
      }

      data_array.push(dummy_array);
      // arrayNickname.push(dataNickname);
      // console.log(dataNickname)
    }


    return (
      <div className="row">
        {data_array.map((pokemon) =>
          <div className="col-6" key={pokemon}>
            <div className="card">
              <div className="img-thumb">
                <img src={pokemon.result.image} alt="" />
              </div>
              <p className="product-title" >Nickname : {pokemon.nickname}</p>
              <p className="product-price">Pokemon : {pokemon.result.name.toUpperCase()}</p>
            </div>
          </div>
        )}
      </div>
    )
  }
  render() {
    return (
      <Fragment>
        <div className="row">
          <this.ListMyPokemon />
        </div>
      </Fragment>
    )
  }
}

export default MyPokemon;