type MapboxGeocodingResponse = {
  features: MapboxSuggestCity[]
}

type MapboxSuggestCity = {
  id: string
  properties: {
    name: string
    place_formatted: string
    feature_type: string
    coordinates: Coordinates
    context: {
      country: {
        country_code: string
      }
    }
  }
}
