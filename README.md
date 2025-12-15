# nikhitha-portfolio-app

## Local dev: server env & test user

1. Copy `server/.env.example` to `server/.env` and fill in `MONGO_URI` and `JWT_SECRET`.

2. Start the server:

```bash
npm run server
```

3. Create the example user (if server not running, the script connects directly to your DB):

```bash
# using npm script
npm --prefix server run create-test-user

# or set env vars inline (POSIX shells)
MONGO_URI="<your-uri>" TEST_USER_EMAIL="you@example.com" TEST_USER_PASSWORD="s3cret" node server/scripts/createTestUser.js
```

The default test credentials are:

- username: `testadmin`
- email: `test@local.test`
- password: `TestPass123!`

If you'd like, provide your `MONGO_URI` and I can run the seed script for you, or run it locally following the steps above.
