
import { useState } from 'react'
import {
  Authenticator,
  useAuthenticator,
  View,
  Heading,
  Text,
  Button,
  Card,
  Flex,
} from '@aws-amplify/ui-react'
import { generateClient } from 'aws-amplify/data'
import { useEffect } from 'react'
import './App.css'

const client = generateClient({
  authMode: 'userPool',
})

function Profile() {
  const { user, signOut } = useAuthenticator((context) => [
    context.user,
  ])
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    async function loadProfile() {
      const { data } = await client.models.UserProfile.list()
      const currentProfile = data.find(
        (item) => item.email === user.signInDetails?.loginId
      )
      setProfile(currentProfile)
    }
    loadProfile()
  }, [user])

  return (
    <View className="app-container">
      <Card variation="elevated">
        <Heading level={1}>Welcome to My Profile App</Heading>
        <Heading level={2}>Teesha Talreja</Heading>
        <Text>UNT Information Technology Student</Text>
        <Text>
          Discover your profile, manage your account, and stay connected.
        </Text>
        <Heading level={3}>Your Account</Heading>
        <Text>Email: {user.signInDetails?.loginId}</Text>
        <Text>
          {profile
            ? 'Your profile is saved in our database.'
            : 'Loading your profile...'}
        </Text>
        <Flex>
          <Button onClick={signOut} variation="primary">
            Sign Out
          </Button>
        </Flex>
      </Card>
    </View>
  )
}

function App() {
  return (
    <Authenticator>
      <Profile />
    </Authenticator>
  )
}

export default App
