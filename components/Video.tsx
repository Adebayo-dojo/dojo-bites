import { View, Text, Touchable, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { Path, Svg } from "react-native-svg";
import { Link, router } from "expo-router";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const video1 =
  "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video1.MP4?alt=media";
const video2 =
  "https://firebasestorage.googleapis.com/v0/b/dojo-bites.appspot.com/o/video2.MP4?alt=media";

const Video = ({ active, id, item }) => {
  const screenWidth = Dimensions.get("screen").width;
  const middle = screenWidth / 2;
  //   const bth = us;
  const screenHeight = Dimensions.get("screen").height;
  const windowHeight = Dimensions.get("window").height;
  const ref = useRef<VideoView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useVideoPlayer(item.videoLink, (player) => {
    player.loop = true;
    // player.volume = 0;
    // player.play();
  });

  const control = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // console.log(isPlaying);
    if (isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  }, [isPlaying, active]);

  useEffect(() => {
    if (active == id) {
      // console.log("set");
      setIsPlaying(true);
      // console.log(isPlaying, "active");
    } else {
      player.currentTime = 0;
      player.pause();
    }
  }, [active]);

  const navigate = (pathname, data) => {
    router.push({ pathname: pathname, params: data });
  };

  // console.log(isPlaying);

  // useEffect(() => {
  //   const subscription = player.addListener("playingChange", (isPlaying) => {
  //     setIsPlaying(isPlaying);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, [player]);
  return (
    <TouchableWithoutFeedback
      onPress={control}
      style={{ height: windowHeight - 80 }}
    >
      <View
        style={{
          height: windowHeight - 80,
          position: "relative",
          justifyContent: "flex-end",
        }}
      >
        {!isPlaying && active == id ? (
          <FontAwesome5
            name="play"
            size={50}
            color="white"
            style={{
              position: "absolute",
              zIndex: 500,
              top: "50%",
              left: middle - 25,
              opacity: 0.5,
            }}
          />
        ) : null}
        <VideoView
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          ref={ref}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="cover"
          nativeControls={false}
        />
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            gap: "20%",
            alignItems: "flex-end",
          }}
        >
          <View style={{ flex: 1 }}>
            {/* <Link asChild ={"/(tabs)/(index)/restaurant"}> */}
            <Text
              onPress={() =>
                navigate("/(tabs)/(index)/restaurant", item.restaurant)
              }
              style={{
                color: "white",
                fontWeight: "800",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              @ {item.restaurant.name}
            </Text>
            {/* </Link> */}
            <Text style={{ color: "white", fontSize: 20 }}>{item.caption}</Text>
            <Text style={{ color: "white", fontSize: 20 }}>
              {item.restaurant.distance} Miles
            </Text>
          </View>
          <View style={{ gap: 30, marginBottom: 10 }}>
            <View style={{ alignItems: "center", gap: 5 }}>
              <AntDesign name="hearto" size={34} color="white" />
              <Text style={{ color: "white" }}>52</Text>
            </View>
            <View style={{ alignItems: "center", gap: 5 }}>
              <Svg width="42" height="42" viewBox="0 0 32 32" fill="none">
                <Path
                  d="M29.7074 13.2933L19.7074 3.29329C19.5676 3.15335 19.3895 3.05801 19.1955 3.01932C19.0016 2.98063 18.8005 3.00033 18.6177 3.07593C18.4349 3.15152 18.2787 3.27962 18.1687 3.44403C18.0588 3.60843 18 3.80175 17.9999 3.99954V9.04329C14.7574 9.32079 11.1762 10.9083 8.22992 13.407C4.68242 16.417 2.47367 20.2958 2.00992 24.3283C1.97368 24.6418 2.03725 24.9587 2.19158 25.234C2.34591 25.5093 2.58313 25.7289 2.86949 25.8616C3.15586 25.9942 3.47677 26.0332 3.78655 25.9729C4.09634 25.9126 4.37921 25.7562 4.59492 25.5258C5.96992 24.062 10.8624 19.4333 17.9999 19.0258V23.9995C18 24.1973 18.0588 24.3906 18.1687 24.555C18.2787 24.7195 18.4349 24.8475 18.6177 24.9231C18.8005 24.9987 19.0016 25.0184 19.1955 24.9798C19.3895 24.9411 19.5676 24.8457 19.7074 24.7058L29.7074 14.7058C29.8944 14.5183 29.9995 14.2643 29.9995 13.9995C29.9995 13.7347 29.8944 13.4808 29.7074 13.2933ZM19.9999 21.5858V17.9995C19.9999 17.7343 19.8946 17.48 19.707 17.2924C19.5195 17.1049 19.2651 16.9995 18.9999 16.9995C15.4899 16.9995 12.0712 17.9158 8.83867 19.7245C7.19235 20.6498 5.65844 21.7622 4.26742 23.0395C4.99242 20.0595 6.81992 17.2258 9.52367 14.932C12.4262 12.4708 15.9687 10.9995 18.9999 10.9995C19.2651 10.9995 19.5195 10.8942 19.707 10.7066C19.8946 10.5191 19.9999 10.2648 19.9999 9.99954V6.41454L27.5862 13.9995L19.9999 21.5858Z"
                  fill="#F1F1EC"
                />
              </Svg>

              <Text style={{ color: "white" }}>52</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Video;
