import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeSceen() {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <View className="h-full flex justify-around">
        <View className="flex-row justify-center mt-10">
          <Image source={require('../assets/images/welcome.gif')} className="h-96 w-96 shadow" />
        </View>
        <View className="mx-5 mb-20">
          <Text className={`text-center font-bold text-4xl ${colors.heading} mb-10`}>Expensify</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')} className="shadow-lg p-3 rounded-md mb-5" style={{backgroundColor: colors.button}}>
            <Text className="text-center text-white text-lg font-bold">Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}  className="shadow-lg p-3 rounded-md" style={{backgroundColor: colors.button}}>
            <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}