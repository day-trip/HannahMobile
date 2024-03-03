import {KeyboardAvoidingView, Platform, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import {LinearGradient} from 'expo-linear-gradient';
import {Link} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import FlatList = Animated.FlatList;
import View = Animated.View;
import Text = Animated.Text;
import { Image } from 'expo-image';

const messages = [
    {
        "id": "qwehjksdfn12",
        "role": "user",
        "content": "Hello!",
        "timestamp": "2024-03-01T08:00:00Z"
    },
    {
        "id": "zxcvbnmasdfg",
        "role": "assistant",
        "content": "Hi there! How can I assist you?",
        "timestamp": "2024-03-01T08:01:00Z"
    },
    {
        "id": "poiuytrewqlk",
        "role": "user",
        "content": "I need help with something.",
        "timestamp": "2024-03-01T08:02:00Z"
    },
    {
        "id": "mnbvcxzasdfg",
        "role": "assistant",
        "content": "Sure, what do you need assistance with?",
        "timestamp": "2024-03-01T08:03:00Z"
    },
    {
        "id": "lkjhgfdsaqwe",
        "role": "user",
        "content": "Can you provide information on JSON?",
        "timestamp": "2024-03-01T08:04:00Z"
    },
    {
        "id": "ytreweasdzxcv",
        "role": "assistant",
        "content": "Certainly! JSON stands for JavaScript Object Notation...",
        "timestamp": "2024-03-01T08:05:00Z"
    },
    {
        "id": "mnbvcxzasdqw1",
        "role": "user",
        "content": "Thank you!",
        "timestamp": "2024-03-01T08:06:00Z"
    },
    {
        "id": "lkjhgfdsaertt",
        "role": "assistant",
        "content": "You're welcome! Feel free to ask if you have any more questions.",
        "timestamp": "2024-03-01T08:07:00Z"
    },
    {
        "id": "poiuytrewqlk2",
        "role": "user",
        "content": "I have another question.",
        "timestamp": "2024-03-01T08:08:00Z"
    },
    {
        "id": "mnbvcxzasdfg3",
        "role": "assistant",
        "content": "Sure, go ahead and ask.",
        "timestamp": "2024-03-01T08:09:00Z"
    },
    {
        "id": "lkjhgfdsaqwe4",
        "role": "user",
        "content": "How do I parse JSON in Python?",
        "timestamp": "2024-03-01T08:10:00Z"
    },
    {
        "id": "ytreweasdzxcv5",
        "role": "assistant",
        "content": "You can use the json module in Python to parse JSON data...",
        "timestamp": "2024-03-01T08:11:00Z"
    },
    {
        "id": "mnbvcxzasdqw6",
        "role": "user",
        "content": "Got it, thanks!",
        "timestamp": "2024-03-01T08:12:00Z"
    },
    {
        "id": "lkjhgfdsaertt7",
        "role": "assistant",
        "content": "You're welcome!",
        "timestamp": "2024-03-01T08:13:00Z"
    },
    {
        "id": "poiuytrewqlk8",
        "role": "user",
        "content": "Goodbye.",
        "timestamp": "2024-03-01T08:14:00Z"
    },
    {
        "id": "mnbvcxzasdfg9",
        "role": "assistant",
        "content": "Goodbye! Have a great day.",
        "timestamp": "2024-03-01T08:15:00Z"
    },
    {
        "id": "lkjhgfdsaqwe10",
        "role": "user",
        "content": "Hello again!",
        "timestamp": "2024-03-01T08:16:00Z"
    },
    {
        "id": "ytreweasdzxcv11",
        "role": "assistant",
        "content": "Welcome back! How can I help you?",
        "timestamp": "2024-03-01T08:17:00Z"
    },
    {
        "id": "mnbvcxzasdqw12",
        "role": "user",
        "content": "I need assistance with a coding problem.",
        "timestamp": "2024-03-01T08:18:00Z"
    },
    {
        "id": "lkjhgfdsaertt13",
        "role": "assistant",
        "content": "Sure, please provide details about the problem.",
        "timestamp": "2024-03-01T08:19:00Z"
    },
    {
        "id": "poiuytrewqlk14",
        "role": "user",
        "content": "It's about sorting algorithms.",
        "timestamp": "2024-03-01T08:20:00Z"
    },
    {
        "id": "mnbvcxzasdfg15",
        "role": "assistant",
        "content": "Okay, let's discuss different sorting algorithms...",
        "timestamp": "2024-03-01T08:21:00Z"
    },
    {
        "id": "lkjhgfdsaqwe16",
        "role": "user",
        "content": "Thanks for the help!",
        "timestamp": "2024-03-01T08:22:00Z"
    },
    {
        "id": "ytreweasdzxcv17",
        "role": "assistant",
        "content": "You're welcome! Feel free to ask if you have more questions.",
        "timestamp": "2024-03-01T08:23:00Z"
    },
    {
        "id": "mnbvcxzasdqw18",
        "role": "user",
        "content": "Sure thing.",
        "timestamp": "2024-03-01T08:24:00Z"
    },
    {
        "id": "lkjhgfdsaertt19",
        "role": "assistant",
        "content": "Goodbye!",
        "timestamp": "2024-03-01T08:25:00Z"
    }
];

export default function Index() {
    const [user, setUser] = useState<null | string>("a43ef9f7-f6c5-48b3-9007-6675d9ec7158");

    return <>
        <SafeAreaView style={{backgroundColor: "rgb(255 251 235)", height: "100%"}}>
            <GestureHandlerRootView style={{height: "100%", position: "relative"}}>
                {user && <TouchableOpacity style={{width: 40, height: 40, borderRadius: 25, backgroundColor: 'rgb(251 113 133)', justifyContent: 'center', alignItems: 'center', position: "absolute", left: 15, zIndex: 100}}>
                    <Ionicons name="home-outline" size={24} color="white" />
                </TouchableOpacity>}
                {user && <Link href="/modal" asChild>
                    <TouchableOpacity style={{width: 40, height: 40, borderRadius: 25, borderWidth: 1, borderColor: "rgb(251 113 133)", justifyContent: 'center', alignItems: 'center', position: "absolute", right: 15, zIndex: 100}}>
                        <Image style={{width: 38, height: 38, borderRadius: 25}} source={`https://hannah-pfp.s3.us-east-1.amazonaws.com/${user}.jpeg`}/>
                    </TouchableOpacity>
                </Link>}
                {!user && <TouchableOpacity style={{width: 40, height: 40, borderRadius: 25, backgroundColor: 'rgb(251 113 133)', justifyContent: 'center', alignItems: 'center', position: "absolute", left: 15, zIndex: 100}}>
                    <Ionicons name="person-outline" size={24} color="white" />
                </TouchableOpacity>}

                <KeyboardAvoidingView keyboardVerticalOffset={75} behavior="padding" style={{backgroundColor: "", height: "100%", flex: 1, gap: 0, flexDirection: "column"}}>
                    <FlatList indicatorStyle="black" scrollIndicatorInsets={{right: 2}} style={{backgroundColor: "", paddingTop: 0, paddingHorizontal: 15}} data={messages.map((message, index) => ({...message, index}))} renderItem={(item) => <Message item={item.item}/>}/>

                    <TextInput placeholder='Talk to Hannah' style={{backgroundColor: "white", fontFamily: "Cambria", borderRadius: 30, borderWidth: 0.5, borderColor: "rgb(251 113 133)", paddingHorizontal: 20, paddingVertical: 14, width: "96%", fontSize: 19, marginHorizontal: "2%"}} placeholderTextColor="rgb(156 163 175)"/>
                    <TouchableOpacity style={{width: 40, height: 40, borderRadius: 25, backgroundColor: 'rgb(251 113 133)', justifyContent: 'center', alignItems: 'center', marginTop: -46, marginLeft: "87.5%"}}>
                        <Ionicons name="arrow-up-outline" size={24} color="white" />
                    </TouchableOpacity>
                </KeyboardAvoidingView>

                <LinearGradient colors={['rgb(255 251 235)', 'rgba(255, 255, 255, 0)']} locations={[0.01, 0.15]} style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 50}}/>
            </GestureHandlerRootView>
        </SafeAreaView>
        <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'}/>
    </>
}

const Message = ({item}: {item: {content: string, id: string, role: string, timestamp: string, index: number}}) => {
    const position = useSharedValue(0);
    const open = useSharedValue(false);

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            if (e.translationX > 0) {
                return;
            }
            if (e.translationX < -100) {
                return;
            }
            if (e.translationX < -75) {
                if (!open.value) {
                    console.log("SELECTED!");

                    // Haptics.notificationAsync(NotificationFeedbackType.Success).catch(e => console.log(e));
                    open.value = true;
                }
            } else {
                open.value = false;
            }
            position.value = e.translationX;
        })
        .onEnd((e) => {
            position.value = withTiming(0, { duration: 100 });
            if (open.value) {
                console.log("REPLIED!");
            }
            open.value = false;
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));

    return item.role === "user" ?
        <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", marginBottom: 12, marginTop: item.index === 0 ? 90 : 0}}>
            <GestureDetector gesture={panGesture}>
                <View style={[{borderRadius: 10, backgroundColor: "rgb(254 205 211)", padding: 10}, animatedStyle]}>
                    <Text style={{fontSize: 21, fontFamily: "Cambria"}}>{item.content}</Text>
                </View>
            </GestureDetector>
        </View>
        : <Text style={{fontSize: 21, fontFamily: "Cambria", marginBottom: 12}}>{item.content}</Text>
}