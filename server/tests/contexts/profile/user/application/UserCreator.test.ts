// Convención: Nombre casos de uso deben acabar en "Creator/..." de esta forma es muy fácil identificarlos.
    // Comparar con Salsa donde los casos de uso acaban en "UseCase/...".

import { User } from '../../../../../src/contexts/profile/user/domain/User';
import { UserRepository } from '../../../../../src/contexts/profile/user/domain/UserRepository';
import { UserCreator } from '../../../../../src/contexts/profile/user/application/UserCreator';

describe('UserCreator', () => {
    it('should create a valid user', async () => {
        const repository: UserRepository = {
            save: jest.fn()
        };
        const creator = new UserCreator(repository);
        const id = 'id';
        const name = 'name';
        const expectedUser = new User(id, name);

        await creator.run(id, name);

        expect(repository.save).toHaveBeenCalledWith(expectedUser);
    });
});
