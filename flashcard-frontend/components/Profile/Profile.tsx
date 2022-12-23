import React from 'react'
import { Text, View } from 'react-native'

const user: any = {
    firstName: 'Michael',
    lastName: 'Bubbles',
    email: 'user@account.email.com',
    accountCreatedDate: new Date().toLocaleDateString(),
    numberOfDecks: 10,
    reviewsPerDay: 25,
}

export default function Profile() {
  return (
    <View>
        <Text>Hello, user!</Text>

        <Text>user.firstName</Text>
        <Text>user.firstName</Text>
        <Text>user.email</Text>
        <Text>user.accountCreatedDate</Text>
        <Text>user.numberOfDecks</Text>
        <Text>user.reviewsPerDay</Text>
    </View>
  )
}
