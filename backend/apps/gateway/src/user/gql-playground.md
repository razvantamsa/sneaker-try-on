# How to use users service - demo

## Get all users - example
```
query {
  users {
    userId
  }
}
```
<br><br>

## Get one user - example
```
query {
  user(userId: "17fb9637-ff2c-47e9-800b-241c2456a700") {
    userId,
    email,
    password,
    isSubscribed
  }
}
```
<br><br>

## Create user - example
```
mutation {
  createUser(createUserDto: {
    email:"whatever@gmail.com",
    password:"password"
  }) {
    userId,
    email,
    password,
    isSubscribed
  }
}
```
<br><br>

## Update user - example

```
mutation {
  updateUser(
    userId: "ddd77374-2985-4ae1-be9f-c514076bfd2b",
    updateUserDto: { isSubscribed: false },
  ) {
    userId,
    email,
    password,
    isSubscribed
  }
}
```
<br><br>

## Delete user - example
```
mutation {
  deleteUser(userId: "e775e016-9455-40ad-bd90-895add9f88bf") {
    userId
    email
    password
    isSubscribed
  }
}
```
<br><br>