import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/emptyList'
import { useNavigation } from '@react-navigation/native'

const items = [
  {
    id: 1,
    place: 'New York',
    country: 'USA',
  },
  {
    id: 2,
    place: 'Paris',
    country: 'France',
  },
  {
    id: 3,
    place: 'London',
    country: 'UK',
  },
  {
    id: 4,
    place: 'Tokyo',
    country: 'Japan',
  },
  {
    id: 5,
    place: 'Jakarta',
    country: 'Indonesia',
  },
  {
    id: 6,
    place: 'Seoul',
    country: 'South Korea',
  },
]

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Expensify</Text>
        <TouchableOpacity className="py-2 px-3 bg-white border border-gray-200 rounded-md">
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center bg-blue-200 rounded-md mx-4 mb-4">
        <Image source={require('../assets/images/banner.png')} className='w-60 h-60' />
      </View>
      <View className="px-4 space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} flex-1 font-bold text-xl`}>Recent Trips</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddTrip')} className="py-2 px-3 bg-white border border-gray-200 rounded-md">
            <Text className={colors.heading}>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 460}}>
          <FlatList 
            data={items}
            numColumns={2}
            ListEmptyComponent={<EmptyList message="You haven't recorded any trips yet" />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            className=""
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('TripExpenses')} className="bg-white p-3 rounded-md mb-5 shadow-sm">
                  <View>
                    <Image source={randomImage()} className="w-[154px] h-[150px]" />
                    <Text className={`${colors.heading} text-base font-bold`}>{item.place}</Text>
                    <Text className={`${colors.heading} text-sm`}>{item.country}</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}