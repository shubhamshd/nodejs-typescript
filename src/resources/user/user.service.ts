import UserModel from '@resources/user/user.model';
import Token from '@utils/interfaces/token.interface';
import token from '@utils/token';
import { error } from 'console';
import { Err } from 'joi';

class UserService {
    private user = UserModel;

    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try {
            const user = this.user.create({ name, email, password, role });

            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error) {
            throw new Error('Unabel to create user');
        }
    }

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('User does not exist');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong creds given');
            }
        } catch (error) {
            throw new Error('Unable to login');
        }
    }
}
