import { faker } from '@faker-js/faker';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addMocksToSchema, IMocks, IMockStore } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { IResolvers, TypeSource } from '@graphql-tools/utils';
import {
  getNamedType,
  GraphQLNamedType,
  GraphQLSchema,
  isAbstractType,
  isObjectType,
} from 'graphql';

export type GraphQLMockOptions = {
  mocks?: IMocks<IResolvers<any, any, Record<string, any>, any>>;
  resolvers?:
    | Partial<IResolvers<any, any, Record<string, any>, any>>
    | ((
        store: IMockStore,
      ) => Partial<IResolvers<any, any, Record<string, any>, any>>);
  typeDefs?: TypeSource;
  resolveFromTypename?: string[];
};

const schemaTypeDefs = loadSchemaSync('src/../schema.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const defaultMocks = {
  Date: () => faker.date.recent(365).toISOString().split('T')[0],
  DateTime: () => faker.date.recent(365).toISOString(),
  Money: () => faker.finance.amount(1, 100),
  Decimal: () => faker.finance.amount(1, 100),
  ID: () => faker.datatype.uuid(),
};

const typenameResolveType = (o: Record<string, any>) => {
  const typeName = o?.__typename ?? o?.$ref?.typeName;
  if (!typeName) {
    const msg = `Mocked __resolveType requires type be specified in '__typename' field in object '${JSON.stringify(
      o,
    )}'`;
    console.error(msg);
    throw new Error(
      `Mocked __resolveType requires type be specified in '__typename' field in object '${JSON.stringify(
        o,
      )}'`,
    );
  }
  return typeName;
};

const assignTypenameResolve = (
  resolvers: Record<string, any>,
  typeName: string,
) => {
  if (!resolvers[typeName]?.['__resolveType']) {
    // console.debug(`Mocking GraphQLSchema - adding resolvetype for '${typeName}'`);
    resolvers[typeName] = resolvers[typeName] || {};
    resolvers[typeName].__resolveType = typenameResolveType;
  }
  return resolvers;
};

/**
 * This function walks through all the provided mock resolvers and locates any that mock a
 * field with an abstract type as its return value. For these, it creates a __resolveType function
 * for said abstract type, with an implementation that resolves the type to that of the original
 * `__typename` field in the object being returned.
 *
 * The result of making use of this is that in your test mocks you should not have to define
 * a __resolveType function typically, and instead can just control the implementing type of
 * the abstract by specifying the type via the `__typename` field in your mocked data object.
 */
const getResolverForAbstractTypesInMocks = ({
  resolvers,
  schema,
}: {
  resolvers: GraphQLMockOptions['resolvers'];
  schema: GraphQLSchema;
}) => {
  const visitObjectFieldsOfType = (
    ret: Record<string, any>,
    type: GraphQLNamedType | undefined,
    obj: Record<string, any>,
  ) => {
    if (isObjectType(type)) {
      const fieldMap = type.getFields();
      Object.keys(obj).forEach((fieldName) => {
        const field = fieldMap[fieldName];
        if (field && field.type) {
          const fieldResultType = getNamedType(field.type);
          if (isAbstractType(fieldResultType)) {
            assignTypenameResolve(ret, fieldResultType.name);
          }

          if (typeof obj[fieldName] === 'function' && !obj[fieldName].mock) {
            try {
              const result = obj[fieldName]();
              if (result) {
                visitObjectFieldsOfType(ret, fieldResultType, result);
              }
            } catch (error) {
              // ignore
            }
          }
        }
      });
    }
  };

  return Object.entries(resolvers || {}).reduce(
    (ret, [mockTypeName, mockFieldResolvers]) => {
      const type = schema.getType(mockTypeName);
      visitObjectFieldsOfType(ret, type, mockFieldResolvers);
      return ret;
    },
    {} as Record<string, any>,
  );
};

const makeMockedExecutableSchema = ({
  typeDefs = schemaTypeDefs,
  mocks,
  resolvers,
  resolveFromTypename = [],
}: GraphQLMockOptions) => {
  const schema = makeExecutableSchema({ typeDefs });

  const autoAbstractResolvers: Record<string, any> =
    getResolverForAbstractTypesInMocks({ resolvers, schema });

  const explicitAbsResolves: Record<string, any> = resolveFromTypename.reduce(
    assignTypenameResolve,
    {} as Record<string, any>,
  );

  const mockedSchema = addMocksToSchema({
    schema,
    mocks: { ...defaultMocks, ...mocks },
    resolvers: {
      ...autoAbstractResolvers,
      ...explicitAbsResolves,
      ...resolvers,
    },
  });

  return mockedSchema;
};

export { makeMockedExecutableSchema, schemaTypeDefs };
