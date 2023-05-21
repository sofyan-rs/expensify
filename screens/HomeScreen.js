import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/emptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { auth, tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import { getDocs, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'

export default function HomeScreen() {
  const navigation = useNavigation();

  const { user } = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, ' => ', doc.data());
      data.push({...doc.data(), id: doc.id});
    });
    setTrips(data);
  }

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await signOut(auth);
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Expensify</Text>
        <TouchableOpacity className="py-2 px-3 bg-white border border-gray-200 rounded-md">
          <Text onPress={handleLogout} className={colors.heading}>Logout</Text>
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
            data={trips}
            numColumns={2}
            ListEmptyComponent={<EmptyList message="You haven't recorded any trips yet" />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            className=""
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('TripExpenses', {...item})} className="bg-white p-3 rounded-md mb-5 shadow-sm">
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