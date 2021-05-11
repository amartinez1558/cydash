import { extendType, objectType, stringArg, arg, inputObjectType } from 'nexus';

export const User = objectType({
  name: 'User', // <- Name of your type
  definition(t) {
    t.string('id'); // <- Field named `id` of type `String`
    t.string('name'); // <- Field named `name` of type `String`
    t.string('email'); // <- Field named `email` of type `String`
  },
});

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.db.user.findMany();
      },
    });
  },
});

export const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  definition(t) {
    t.string('email');
    t.string('name');
  },
});

export const EditUserInput = inputObjectType({
  name: 'EditUserInput',
  definition(t) {
    t.string('userId');
    t.nullable.string('name');
  },
});

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        data: arg({
          type: CreateUserInput,
        }),
      },
      resolve(_root, args, ctx) {
        const user = {
          name: args.data.name,
          email: args.data.email,
        };
        return ctx.db.user.create({ data: user });
      },
    });
    t.field('editUser', {
      type: 'User',
      args: {
        data: arg({
          type: EditUserInput,
        }),
      },
      async resolve(_root, args, ctx) {
        const userExists = await ctx.db.user.findUnique({
          where: { id: args.data?.userId },
        });
        if (!userExists) {
          throw new Error('Could not find user with id ' + args.data?.userId);
        }

        let userToEdit = userExists;

        const argsToUpdate: any = {};

        if (args.data.name) {
          argsToUpdate.name = args.data.name;
        }

        if (Object.keys(args).length != 0) {
          userToEdit = await ctx.db.user.update({
            where: { id: args.data?.userId },
            data: argsToUpdate,
          });
        }

        return userToEdit;
      },
    });
  },
});
