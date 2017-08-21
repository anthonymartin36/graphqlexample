const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = require('graphql')

//Test Data
const customers = [
  {id: '1', name: 'Jane Janeson', email: 'Jane@Doe.com', age: 27},
  {id: '2', name: 'John Woo', email: 'john@Doe.com', age: 37},
  {id: '3', name: 'John Wick', email: 'john.w@Doe.com', age: 30},
  {id: '4', name: 'Don Wan', email: 'Don@Doe.com', age: 57},
]

//Root Query
const CustomerType = new GraphQLObjectType({
  name:'Customer',
  fields:() =>({
    id: {type:GraphQLString},
    name: {type:GraphQLString},
    email: {type:GraphQLString},
    age: {type:GraphQLInt}
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer:{
      type: CustomerType,
      args:{
        id:{type: GraphQLString}
      },
      resolve(parentValue, args){
        for(let i=0;i<customers.length;i++){
          if (customers[i].id == args.id){
            return customers[i]
          }
        }
      }
    },
    customers:{
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args){
        return customers
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})
