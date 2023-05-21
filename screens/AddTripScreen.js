import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'

export default function AddTripScreen() {
  const navigation = useNavigation();

  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleAddTrip = () => {
    setErrMessage('');
    if (place && country) {
      // good to go
      setTimeout(() => {
        navigation.navigate('Home');
      }, 500)
    } else {
      // show error
      if (!place && !country) {
        setErrMessage("Please fill place & country");
      } else if (!place) {
        setErrMessage("Please fill place");
      } else if (!country) {
        setErrMessage("Please fill country");
      }
    }
  }

  return (
    <SafeAreaView>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0 z-30">
              <BackButton />
            </View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Trip</Text>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
            <Image className="h-72 w-72" source={require('../assets/images/4.png')} />
          </View>
          {errMessage && (
            <View className="mx-3 bg-red-500 p-2 rounded-md mb-4">
              <Text className="text-center text-white">{errMessage}</Text>
            </View>
          )}
          <View className="space-y-2 mx-3">
            <Text className={`${colors.heading} text-lg font-bold`}>Where On Earth?</Text>
            <TextInput value={place} onChangeText={value => setPlace(value)} className="p-2 bg-white rounded-md mb-3" />
            <Text className={`${colors.heading} text-lg font-bold`}>Which Country</Text>
            <TextInput value={country} onChangeText={value => setCountry(value)} className="p-2 bg-white rounded-md mb-3" />
          </View>
        </View>
        
        <View>
          <TouchableOpacity onPress={handleAddTrip} style={{backgroundColor: colors.button}} className="my-6 rounded-md p-4 shadow-lg mx-2">
            <Text className="text-center text-white text-lg font-bold">Add Trip</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  )
}