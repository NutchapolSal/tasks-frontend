export const mockAuthEmailInvalidToken = 'it@a.com'
export const mockAuthEmailBad = 'bad@a.com'
export const mockAuthEmail = 'test@a.com'
export const mockAuthUUID = '8ff49de4-bbd2-46bc-acc9-a4ef49535a63'
export const mockAuthPassword = 'testing-password-correct-horse-battery-staple'
// jwt signed with `testing-secret-testing-secret-testing-secret` as secret
// specific secret does not matter, as signature verification is not done client-side
// noted just for reproducibility

export const mockAuthContextValueOld = {
    accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAYS5jb20iLCJzdWIiOiI4ZmY0OWRlNC1iYmQyLTQ2YmMtYWNjOS1hNGVmNDk1MzVhNjMiLCJpYXQiOjAsImV4cCI6MjE0NzQ4MzY0N30.rwRa1IjrOVOznIJQgIosj-W2QpqY8C-g7-emyUMym84',
    jwtPayload: {
        email: mockAuthEmail,
        sub: mockAuthUUID,
        iat: 0,
        exp: 2147483647,
    },
}
export const mockAuthContextValueExpired = {
    accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAYS5jb20iLCJzdWIiOiI4ZmY0OWRlNC1iYmQyLTQ2YmMtYWNjOS1hNGVmNDk1MzVhNjMiLCJpYXQiOjEsImV4cCI6NH0.60iJwk1FmG6-dbv4E8hdWJPTdcR8ZVnCdNIIy0De-cE',
    jwtPayload: {
        email: mockAuthEmail,
        sub: mockAuthUUID,
        iat: 1,
        exp: 4,
    },
}

export const mockAuthContextValue = {
    accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAYS5jb20iLCJzdWIiOiI4ZmY0OWRlNC1iYmQyLTQ2YmMtYWNjOS1hNGVmNDk1MzVhNjMiLCJpYXQiOjIsImV4cCI6MjE0NzQ4MzY0N30.9z12Nkx-IuYjpZaQhzcTJcT5aaeCUZbQP8aTx8JHklo',
    jwtPayload: {
        email: mockAuthEmail,
        sub: mockAuthUUID,
        iat: 2,
        exp: 2147483647,
    },
}

export const mockAuthContextValueInvalid = {
    accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4ZmY0OWRlNC1iYmQyLTQ2YmMtYWNjOS1hNGVmNDk1MzVhNjMiLCJpYXQiOjMsImV4cCI6MjE0NzQ4MzY0N30.9wxiOyMyaaw6Msb7mmnf3fWMft34uA_LXWRq9e4EmXc',
    jwtPayload: {
        sub: mockAuthUUID,
        iat: 3,
        exp: 2147483647,
    },
}
