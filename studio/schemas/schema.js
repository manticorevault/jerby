// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Import the nut and user schema
import { userSchema } from './userSchema'
import { nutSchema } from './nutSchema'

export default createSchema({
  name: "default",
  types: schemaTypes.concat([ userSchema, nutSchema ])
});
