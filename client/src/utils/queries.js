import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      email
      reviewCount
      username
      reviews {
        film {
          description
          title
        }
      }
    }
  }
`;

export const FIND_ONE_FILM = gql`
{
  findOneFilm {
    description
    filmId
    title
  }
}`

export const GET_FILM_REVIEWS = gql`
{
  getFilmReviews {
    film {
      reviews {
        review
        rating
      }
    }
  }
}
`