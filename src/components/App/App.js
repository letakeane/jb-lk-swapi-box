import React, { Component } from 'react';
import './App.css';
import { Button } from '../Button/Button';
import { CardGrid } from '../CardGrid/CardGrid';
import { Scroller } from '../Scroller/Scroller';
import { crawlCleaner } from '../../dataCleaners/dataCleaners.js'
import { peopleCleaner, planetCleaner, vehicleCleaner } from '../../dataCleaners/dataCleaners.js'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      dataToDisplay: {},
      people: {},
      planets: {},
      vehicles: {},
      favorites: {},
      movieCrawls: []
    }
  }

  setCrawlState(dataObj) {
    let cleanCrawlData = crawlCleaner(dataObj);
    this.setState({movieCrawls: cleanCrawlData})
  }

  setPeopleState(dataObj) {
    let cleanPeopleData = peopleCleaner(dataObj);
    this.setState({people: cleanPeopleData});
  }

  setPlanetState(dataObj) {
    let cleanPlanetData = planetCleaner(dataObj);
    this.setState({planets: cleanPlanetData});
  }

  setVehicleState(dataObj) {
    let cleanVehicleData = vehicleCleaner(dataObj);
    this.setState({vehicles: cleanVehicleData});
  }

  componentDidMount() {
    const filmApi = 'http://swapi.co/api/films/';
    fetch(filmApi)
      .then((resp) => resp.json())
      .then((films) => {
        console.log('setting the crawl state is firing');
        this.setCrawlState(films)
      })
      .catch((error) => {
        console.log('film api busted')
      })

      const peopleApi = 'http://swapi.co/api/people/';
      fetch(peopleApi)
      .then(resp => resp.json())
      .then((people) => {
        this.setPeopleState(people)
      })
      .catch((error) => {
        console.log('people api busted')
      })

    // fetch('http://swapi.co/api/people/')
    //   .then(resp => resp.json())
    //   .then(people => {
    //     this.setState({people: peopleCleaner(people)})
    //   }).catch((error) => {
    //       console.log('people api busted')
    //     })


    const planetApi = 'http://swapi.co/api/planets/';
    fetch(planetApi)
      .then((resp) => resp.json())
      .then((planets) => {
        this.setPlanetState(planets)
      })
      .catch((error) => {
        console.log('planet api busted')
      })

    const vehicleApi = 'http://swapi.co/api/vehicles/';
    fetch(vehicleApi)
      .then((resp) => resp.json())
      .then((vehicles) => {
        this.setVehicleState(vehicles)
      }).catch((error) => {
          console.log('vehicle api busted')
        })
  }

  handleClickFaves() {
    let data = this.state.favorites;
    if (Object.keys(data).length === 0) {
      alert('Sorry, no favorites selected yet!')
    }
    this.setState({dataToDisplay: data})
  }

  handleClickPeople() {
    let data = this.state.people;
    this.setState({dataToDisplay: data})
  }

  handleClickPlanets() {
    let data = this.state.planets;
    this.setState({dataToDisplay: data})
  }

  handleClickVehicles() {
    let data = this.state.vehicles;
    this.setState({dataToDisplay: data})
  }

  handleToggleFaves(i) {
    let objKeys = Object.keys(this.state.dataToDisplay)
    let faveKey = objKeys[i]
    let faveObj = {[faveKey]: this.state.dataToDisplay[faveKey]}
    let favoritesKeys = Object.keys(this.state.favorites);

    if (!favoritesKeys.includes(faveKey)) {
      let newObj = {}
      let assignObj = Object.assign(newObj, this.state.favorites)
      let addNewObj = Object.assign(assignObj, faveObj)

      this.setState({favorites: addNewObj})
    } else {
      let remainingFaves = favoritesKeys.filter(key => {
        return key !== faveKey
      })
      let remainingFaveObjs = remainingFaves.reduce((acc, key) => {
        acc[key] = this.state.favorites[key]
        return acc
      }, {})

      this.setState({favorites: remainingFaveObjs});
    }
  }

  render() {
    if (  !Object.keys(this.state.people).length ||
          !Object.keys(this.state.planets).length ||
          !Object.keys(this.state.vehicles).length ||
          !this.state.movieCrawls.length ){
      return (
        <div className='loading-message'>
          <img className='loading-image' src='https://starwars.recast.ai/static/media/BB8.5c268a03.gif' alt='bb-8 rolling across a desert'/>
          <h2 className='loading-text'>Loading...</h2>
        </div>
      )
    } else {
    return (
      <main id="App">
        <header className="App-header">
          <h2>SWAPI-Box</h2>
          <Button name='Favorites'
                  onClick={this.handleClickFaves.bind(this)}
                  counter={Object.keys(this.state.favorites).length} />
        </header>
        <section className='scroller-cards-holder'>
          <article className='scroller'>
            <Scroller crawlText={this.state.movieCrawls}/>
          </article>
          <article className='button-cards-holder'>
            <article className='buttons'>
              <Button name='people'
                      onClick={this.handleClickPeople.bind(this)}
                      counter='none' />
              <Button name='planets'
                      onClick={this.handleClickPlanets.bind(this)}
                      counter='none' />
              <Button name='vehicles'
                      onClick={this.handleClickVehicles.bind(this)}
                      counter='none' />
            </article>
            <CardGrid data={this.state.dataToDisplay}
                      faveClick={this.handleToggleFaves.bind(this)}
                      favorites={this.state.favorites} />
          </article>
        </section>
      </main>
    );
  }
  }
}
