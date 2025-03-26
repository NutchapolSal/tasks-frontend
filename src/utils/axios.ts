import OpenAPIClientAxios from 'openapi-client-axios'
import { Client } from '../types/backend-openapi'

const API_URL = import.meta.env.VITE_END_POINT

const api = new OpenAPIClientAxios({
    definition: `${API_URL}/api-json`,
    withServer: { url: API_URL },
})
api.init()

const client = await api.getClient<Client>()

export default client
