export const mockedCrawl = {
  "count": 7,
  "next": null,
  "previous": null,
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

export const mockedPeople = {
  "count": 87,
  "previous": null,
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
      "created": "2014-12-09T13:50:51.644000Z",
      "edited": "2014-12-20T21:17:56.891000Z",
    }
  ]
}

export const mockedPlanets =  {
  "count": 61,
  "next": "http://swapi.co/api/planets/?page=2",
  "previous": null,
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

export const mockedVehicles = {
  "count": 39,
  "previous": null,
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

export const mockedHomeworld = {
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

export const mockedSpecies = {
  "name": "Human",
  "classification": "mammal",
  "designation": "sentient",
  "average_height": "180",
  "skin_colors": "caucasian, black, asian, hispanic",
  "hair_colors": "blonde, brown, black, red",
  "eye_colors": "brown, blue, green, hazel, grey, amber",
  "average_lifespan": "120",
  "homeworld": "http://swapi.co/api/planets/9/",
  "language": "Galactic Basic",
  "created": "2014-12-10T13:52:11.567000Z",
  "edited": "2015-04-17T06:59:55.850671Z",
}

export const mockedPerson = {results: [{
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  "hair_color": "blond",
  "skin_color": "fair",
  "eye_color": "blue",
  "birth_year": "19BBY",
  "gender": "male",
  "homeworld": "http://swapi.co/api/planets/1/",
  "created": "2014-12-09T13:50:51.644000Z",
  "edited": "2014-12-20T21:17:56.891000Z",
}
]
}
