import axiosInstance from './axios'
import AxiosMockAdapter from 'axios-mock-adapter'

const instanceMockAxios = new AxiosMockAdapter(axiosInstance, {
    delayResponse: 0,
})

export default instanceMockAxios
