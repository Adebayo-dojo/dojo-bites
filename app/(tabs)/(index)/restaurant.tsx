import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

const Restaurant = () => {
  const restaurant = useLocalSearchParams();
  console.log(restaurant);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9 }}>
        <ScrollView>
          {/* <Image  /> */}
          <View>
            <Image
              style={{ width: "100%", height: 250 }}
              source={require("@/assets/images/snackbar.jpg")}
            />
          </View>
          <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
            <View style={{ gap: 6 }}>
              <Text style={{ fontSize: 24 }}>{restaurant.name}</Text>
              <View
                style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
              >
                <Text>4.3</Text>
                <AntDesign name="star" size={16} color="black" />
                <View></View>
                <Text>682 Google reviews</Text>
              </View>
              <Text>
                {restaurant.location} - {restaurant.distance} mi
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "white",
                marginVertical: 20,
              }}
            ></View>
            <View
              style={{
                backgroundColor: "white",
                borderColor: "black",
                borderWidth: 1,
                padding: 16,
                borderRadius: 8,
                gap: 8,
              }}
            >
              <View
                style={{
                  backgroundColor: "red",
                  alignSelf: "flex-start",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 4,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <FontAwesome name="tag" size={18} color="black" />
                <Text>Discount</Text>
              </View>
              <Text>10% off the bill</Text>
              <Text>
                Saturdays and Sundays, between 12PM and 5PM, enjoy a 10%
                discount when you spend £30 or more on food.
              </Text>
              <Text>T&Cs apply</Text>
            </View>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "white",
                marginVertical: 20,
              }}
            ></View>
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 20 }}>About</Text>
              <Text>{restaurant.about}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Restaurant;
