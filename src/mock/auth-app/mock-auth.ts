import { mockClient } from '../../utils/mock'
import {
    mockAuthContextValue,
    mockAuthContextValueExpired,
    mockAuthContextValueInvalid,
    mockAuthContextValueOld,
    mockAuthEmail,
    mockAuthEmailBad,
    mockAuthEmailInvalidToken,
    mockAuthPassword,
} from '../../utils/mock-auth-values'

mockClient
    .onGet('/auth/accesstoken', {
        headers: {
            // @ts-expect-error asymmetricMatch is not properly typed
            asymmetricMatch: (headers) =>
                headers.Authorization ===
                `Bearer ${mockAuthContextValueExpired.accessToken}`,
        },
    })
    .reply(401)
    .onGet('/auth/accesstoken', {
        headers: {
            // @ts-expect-error asymmetricMatch is not properly typed
            asymmetricMatch: (headers) =>
                headers.Authorization ===
                `Bearer ${mockAuthContextValueOld.accessToken}`,
        },
    })
    .reply(200, {
        accessToken: mockAuthContextValue.accessToken,
    })
    .onGet('/auth/accesstoken', {
        headers: {
            // @ts-expect-error asymmetricMatch is not properly typed
            asymmetricMatch: (headers) =>
                headers.Authorization ===
                `Bearer ${mockAuthContextValue.accessToken}`,
        },
    })
    .reply(200, {
        accessToken: mockAuthContextValue.accessToken,
    })

mockClient
    .onPost('/auth/accesstoken', {
        email: mockAuthEmail,
        rawPassword: mockAuthPassword,
    })
    .reply(200, {
        accessToken: mockAuthContextValue.accessToken,
    })
    .onPost('/auth/accesstoken', {
        email: mockAuthEmailBad,
        rawPassword: mockAuthPassword,
    })
    .reply(401)
    .onPost('/auth/accesstoken', {
        email: mockAuthEmailInvalidToken,
        rawPassword: mockAuthPassword,
    })
    .reply(200, {
        accessToken: mockAuthContextValueInvalid.accessToken,
    })
    .onPost('/auth/accesstoken')
    .reply(401)

mockClient
    .onDelete('/auth/accesstoken')
    .reply(401)
    .onDelete('/auth/accesstoken', {
        headers: {
            // @ts-expect-error asymmetricMatch is not properly typed
            asymmetricMatch: (headers) =>
                headers.Authorization ===
                `Bearer ${mockAuthContextValue.accessToken}`,
        },
    })
    .reply(204)

mockClient
    .onPost('/auth/user', {
        email: mockAuthEmail,
        rawPassword: mockAuthPassword,
    })
    .reply(200, {
        accessToken: mockAuthContextValue.accessToken,
    })
    .onPost('/auth/user', {
        email: mockAuthEmailBad,
        rawPassword: mockAuthPassword,
    })
    .reply(401)

mockClient
    .onDelete('/auth/user')
    .reply(401)
    .onDelete('/auth/user', {
        headers: {
            // @ts-expect-error asymmetricMatch is not properly typed
            asymmetricMatch: (headers) =>
                headers.Authorization ===
                `Bearer ${mockAuthContextValue.accessToken}`,
        },
    })
    .reply(204)

mockClient
    .onPatch('/auth/user')
    .reply(401)
    .onPatch('/auth/user', {
        headers: {
            // @ts-expect-error asymmetricMatch is not properly typed
            asymmetricMatch: (headers) =>
                headers.Authorization ===
                `Bearer ${mockAuthContextValue.accessToken}`,
        },
    })
    .reply(204)
