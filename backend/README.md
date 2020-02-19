# Backend Documentation

---

## REST API Endpoint List

| HTTP Method | URI Path | Description
|-------------|----------|-----------|
| POST | /api/signup | Register user with first/last name, password, and email
| POST | /api/sigin | Sign user in with their email/password
| GET | /api/user/profile/:username | Retrieves a user profile by the specified *username* in the URL
| POST | /api/user/profile/createOrUpdate | Create or Update own user profile
