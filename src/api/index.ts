import { createNewServer } from './server';

createNewServer()
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
