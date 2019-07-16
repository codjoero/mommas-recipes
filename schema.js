exports.typeDefs = `

type Recipe {
  name: String!
  category: String!
  description: String!
  instruction: String!
  createDate: String
  likes: Int
  username: String
}

type User {
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
  favourites: [Recipe]
}

type Query {
  getAllRecipes: [Recipe]
}

`;
