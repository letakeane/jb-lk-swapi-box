import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'
import fetchMock from 'fetch-mock'
import App from './App';
import { mockedCrawl, mockedPeople, mockedPlanets, mockedVehicles, mockedHomeworld, mockedSpecies, mockedPerson} from '../../dataCleaners/mockedData'
import { peopleCleaner } from '../../dataCleaners/dataCleaners'

const resolvePromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()}, 1000)
  })
}

describe('App --> shallow mounts', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('renders loading message while waiting for api', () => {
    let wrapper = shallow(<App />);
    const found = wrapper.find('.loading-message')

    expect(found).toHaveLength(1)
  });
});

describe('App --> mount',() => {

  afterEach(() => {
    fetchMock.restore()
    expect(fetchMock.calls().unmatched).toEqual([]);
  })

  it('should fire api calls on load', () => {

    fetchMock.get('http://swapi.co/api/films/', {
      status: 200,
      body: mockedCrawl
    })

    fetchMock.get('*', {
      status: 200
    })
    const wrapper = mount(<App />)

    expect(fetchMock.called()).toEqual(true)
    expect(fetchMock.lastUrl()).toEqual('http://swapi.co/api/vehicles/')
  })

  it.only('people should be updated in state on page load', async () => {
    fetchMock.get('http://swapi.co/api/films/', {
      status: 200,
      body: {
        "results": [
          {
            "title": "A New Hope",
            "episode_id": 4,
            "opening_crawl": 'Opening crawl',
            "director": "George Lucas",
            "producer": "Gary Kurtz, Rick McCallum",
            "release_date": "1977-05-25",
            "created": "2014-12-10T14:23:31.880000Z",
            "edited": "2015-04-11T09:46:52.774897Z",
          },
          {
            "title": "Attack of the Clones",
            "episode_id": 2,
            "opening_crawl": 'Opening crawl',
            "director": "George Lucas",
            "producer": "Rick McCallum",
            "release_date": "2002-05-16",
            "created": "2014-12-20T10:57:57.886000Z",
            "edited": "2015-04-11T09:45:01.623982Z",
          }
        ]
      }
    })


    fetchMock.get('http://swapi.co/api/people/', {
      status: 200,
      body: {
        "results": [
          {
            "name": "Luke Skywalker",
            "height": "172",
            "mass": "77",
            "hair_color": "blond",
            "skin_color": "fair",
            "eye_color": "blue",
            "birth_year": "19BBY",
            "gender": "male",
            "homeworld": "http://swapi.co/api/planets/1/",
            "species": ["http://swapi.co/api/species/1/"],
            "created": "2014-12-09T13:50:51.644000Z",
            "edited": "2014-12-20T21:17:56.891000Z",
          }
        ]
      }
    })

    fetchMock.get('http://swapi.co/api/planets/', {
      status: 200,
      body: {
        "results": [
          {
            "name": "Alderaan",
            "rotation_period": "24",
            "orbital_period": "364",
            "diameter": "12500",
            "climate": "temperate",
            "gravity": "1 standard",
            "terrain": "grasslands, mountains",
            "surface_water": "40",
            "population": "2000000000",
            "residents": [
              "http://swapi.co/api/people/1/"
            ],
            "created": "2014-12-10T11:35:48.479000Z",
            "edited": "2014-12-20T20:58:18.420000Z",
          }
        ]
      }
    })

    fetchMock.get('http://swapi.co/api/vehicles/', {
      status: 200,
      body: {
        "results": [
        {
          "name": "Sand Crawler",
          "model": "Digger Crawler",
          "manufacturer": "Corellia Mining Corporation",
          "cost_in_credits": "150000",
          "length": "36.8",
          "max_atmosphering_speed": "30",
          "crew": "46",
          "passengers": "30",
          "cargo_capacity": "50000",
          "consumables": "2 months",
          "vehicle_class": "wheeled",
          "pilots": [],
          "created": "2014-12-10T15:36:25.724000Z",
          "edited": "2014-12-22T18:21:15.523587Z",
        }
      ]
    }
    })

    fetchMock.get('http://swapi.co/api/planets/1/', {
      status: 200,
      body: {
        "name": "Tatooine",
        "rotation_period": "23",
        "orbital_period": "304",
        "diameter": "10465",
        "climate": "arid",
        "gravity": "1 standard",
        "terrain": "desert",
        "surface_water": "1",
        "population": "200000",
        "residents": [
          "http://swapi.co/api/people/1/"
        ],
        "created": "2014-12-09T13:50:49.641000Z",
        "edited": "2014-12-21T20:48:04.175778Z",
        "url": "http://swapi.co/api/planets/1/"
      }
    })

    fetchMock.get('http://swapi.co/api/species/1/', {
      status: 200,
      body: mockedSpecies.name
    })

    fetchMock.get('http://swapi.co/api/people/1/', {
      status: 200,
      body: {
        "name": "Luke Skywalker",
        "species": ['http://swapi.co/api/species/1/'],
        "homeworld": "http://swapi.co/api/planets/1/"

      }

    })

    // fetchMock.get('*', {
    //   status: 200
    // })

    const wrapper = mount(<App />)

    // expect(fetchMock.lastUrl()).toEqual('http://www.swapi.co/api/vehicles/')
    await resolvePromise()
    expect(fetchMock.called()).toEqual(true)
    let cleanedMock = peopleCleaner(mockedPeople)
    // wrapper.setState({people: cleanedMock})

    console.log(wrapper.state())

    let keys = Object.keys(wrapper.state('people'))

    expect(wrapper.state('people')).toEqual(cleanedMock)
    expect(Object.keys(wrapper.state('people')).length)
  })
})
