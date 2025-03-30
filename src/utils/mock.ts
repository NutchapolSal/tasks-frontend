import client from './axios'
import AxiosMockAdapter from 'axios-mock-adapter'

export const mockClient = new AxiosMockAdapter(client, {
    delayResponse: 0,
})
