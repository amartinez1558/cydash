import { createTestContext } from './support/__serverContextHandlers';
import { gql } from 'graphql-request';
import { databaseCleaner } from './support/__databaseCleaner';

const ctx = createTestContext();

beforeEach(async () => {
  await databaseCleaner.deleteAllUsers();
});

afterEach(async () => {
  await databaseCleaner.cleanUpAllAddedItems();
});

it('can browse users', async () => {
  const users = await ctx.client.request(gql`
    query {
      users {
        id
      }
    }
  `);

  expect(users).toMatchInlineSnapshot(`
    Object {
      "users": Array [],
    }
  `);
});

it('create a user', async () => {
  const users = await ctx.client.request(gql`
    mutation {
      createUser(
        data: { name: "Andrew", email: "andrew.martinez@example.com" }
      ) {
        email
        name
      }
    }
  `);

  databaseCleaner.addUserToCleanUp({ email: users.createUser.email });

  expect(users).toMatchInlineSnapshot(`
    Object {
      "createUser": Object {
        "email": "andrew.martinez@example.com",
        "name": "Andrew",
      },
    }
  `);
});
