import { gql } from '@apollo/client';


// based on instructions from bootcampspot, not sure what this is referencing, what should go inside object
export const QUERY GET_ME = gql`
    query me {

    }`


// example from mini project below

// export const QUERY_TECH = gql`
//   query tech {
//     tech {
//       _id
//       name
//     }
//   }
// `;

// export const QUERY_MATCHUPS = gql`
//   query matchups($_id: String) {
//     matchups(_id: $_id) {
//       _id
//       tech1
//       tech2
//       tech1_votes
//       tech2_votes
//     }
//   }
// `;
