import client from './axios'
import AxiosMockAdapter from 'axios-mock-adapter'

const mockClient = new AxiosMockAdapter(client, {
    delayResponse: 0,
})

export default mockClient
