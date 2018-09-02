import { gql } from 'apollo-boost';

export const REPOLRT_LOCATION = gql`
  mutation reportMovement($lat: Float!, $lng: Float!) {
    ReportMovement(lastLat: $lat, lastLng: $lng) {
      ok
      error
    }
  }
`;
