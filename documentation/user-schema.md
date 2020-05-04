# User Schema in Mongo
```
{
    _id: ObjectId
    username: String,
    password: String [encrypted],
    email: String,
    name: String,
    token: ObjectId,
    created_at: Date,
    edited_at: Date
}
```

// TODO: We can either use a permanent token in which we set the token upon creation
OR we could set the token dynamically upon login and validate that way.