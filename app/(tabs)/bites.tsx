import { FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Video from "@/components/Video";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dummydata = [
  {
    id: 1,
    videoLink:
      "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video1.MP4?alt=media",
    caption: "Tasty pastries",
    tags: [],
    restaurant: "The Croissants",
  },
  {
    id: 2,
    videoLink:
      "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video2.MP4?alt=media",
    caption: "Snacks all day long",
    tags: [],
    restaurant: "Snack Bar",
  },
  {
    id: 3,
    videoLink:
      "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video1.MP4?alt=media",
    caption: "Tasty pastries",
    tags: [],
    restaurant: "The Croissants",
  },
  {
    id: 4,
    videoLink:
      "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video2.MP4?alt=media",
    caption: "Snacks all day long",
    tags: [],
    restaurant: "Snack Bar",
  },
  {
    id: 5,
    videoLink:
      "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video1.MP4?alt=media",
    caption: "Tasty pastries",
    tags: [],
    restaurant: "The Croissants",
  },
  {
    id: 6,
    videoLink:
      "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video2.MP4?alt=media",
    caption: "Snacks all day long",
    tags: [],
    restaurant: "Snack Bar",
  },
  {
    id: 7,
    videoLink:
      "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video1.MP4?alt=media",
    caption: "Tasty pastries",
    tags: [],
    restaurant: "The Croissants",
  },
  {
    id: 8,
    videoLink:
      "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video2.MP4?alt=media",
    caption: "Snacks all day long",
    tags: [],
    restaurant: "Snack Bar",
  },
  {
    id: 9,
    videoLink:
      "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video1.MP4?alt=media",
    caption: "Tasty pastries",
    tags: [],
    restaurant: "The Croissants",
  },
  {
    id: 10,
    videoLink:
      "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video2.MP4?alt=media",
    caption: "Snacks all day long",
    tags: [],
    restaurant: "Snack Bar",
  },
];

export default function Bites() {
  const [active, setActive] = useState<number | null>();
  const [videos, setVideos] = useState();

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    const getVideos = async () => {
      try {
        const storedVideos = await getData("videos");
        setVideos(storedVideos);
      } catch (e) {
        console.log(e);
      }
    };

    getVideos();
  }, []);

  const onEndReached = () => {
    // fetch more posts from database
    setVideos((currentVideos) => [...currentVideos, ...currentVideos]);
  };
  return (
    <View style={{}}>
      <StatusBar style="dark" />
      <FlatList
        style={{}}
        data={videos}
        pagingEnabled={true}
        renderItem={({ index, item }) => (
          <Video item={item} active={active} id={index} />
        )}
        onViewableItemsChanged={({ changed, viewableItems }) => {
          console.log(changed);
          if (changed[0].isViewable == true) {
            setActive(changed[0].index);
          }
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 90 }}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
      />
      {/* <Video />
      <Video /> */}
    </View>
  );
}
