# Login Flow Logic

### Overview: 
We'll have an auth-server that handles all user creation, login and validation. An endpoint for each feature.<br>
The primary feature for this service will be to handle user account information as well as tokens:

```
[POST] /create-user
Request:
{
    username: str,
    password: str,
    name: str,
    email: str
}
Response:
{
    userId: str,
    token: str
}
```

```
[POST] /login
Request: 
{
    username: str,
    password: str
}
Response: 
{
    userId: str,
    token: str
}
```

```
[GET] /validate
Request: 
{
    userId: str,
    token: str
}
Response: 
{
    success: bool
}
```