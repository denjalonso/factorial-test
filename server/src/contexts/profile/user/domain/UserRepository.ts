import { User } from './User';
import { Nullable } from '../../../shared/domain/Nullable';
import { UserId } from '../../shared/domain/user/UserId';

export interface UserRepository {
	save(user: User): Promise<void>;
	find(id: UserId): Promise<Nullable<User>>;
}
