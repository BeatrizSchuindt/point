import { CreateUserInput } from "@/@types/User";
import axios from 'axios';

async function signUp(data: CreateUserInput) {
    return axios.post('/api/cadastro', data);
}

export { signUp };