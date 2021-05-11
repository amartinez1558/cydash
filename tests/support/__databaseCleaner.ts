import { db } from './../../src/api/db';

type SupportedItems = 'users';
type Identifier = 'email' | 'id';

class DatabaseCleaner {
  itemsToCleanUp: Record<
    SupportedItems,
    Partial<Record<Identifier, string>>[]
  > = {
    users: [],
  };

  cleanUpAllAddedItems() {
    this.itemsToCleanUp.users.forEach(async (user) => {
      if (user.id) {
        await db.user.delete({ where: { id: user.id } });
      } else if (user.email) {
        await db.user.delete({ where: { email: user.email } });
      } else {
        throw new Error('Please provide a valid identifier to delete item.');
      }
    });
  }

  addUserToCleanUp(user: Partial<Record<'id' | 'email', string>>) {
    this.itemsToCleanUp.users.push(user);
  }

  deleteAllUsers = db.user.deleteMany;
}

export const databaseCleaner = new DatabaseCleaner();
