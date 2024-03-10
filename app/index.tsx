import {KeyboardAvoidingView, Platform, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {useCallback, useEffect, useState} from "react";
import {LinearGradient} from 'expo-linear-gradient';
import {Link} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import {Image} from 'expo-image';
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import FlatList = Animated.FlatList;
import * as Contacts from "expo-contacts";
import {MessageBox, OptionsMessageBox, SearchMessageBox} from "@/components/MessageBox";
import {Message} from "@/components/Message";
import {getUserIdentity} from "expo-user-identity";

type Message = {
    id: string,
    role: "user" | "assistant",
    content: string,
    timestamp: string | number,
}

const INITIAL: Message = {
    "id": "qwehjksdfn13",
    "role": "assistant",
    "content": "👋\nHi, I'm Hannah! I'm here to help you find a date and make new friends.\nLet's play a game... Tell me name of one of your friends and I'll try to guess who you are.",
    "timestamp": "2024-03-01T08:00:00Z"
}

const messages = [
    {
        "id": "qwehjksdfn13",
        "role": "assistant",
        "content": "Hi, I'm Hannah! I'm here to help you find a date, or just make some new friends.\nWhich school do you go to?",
        "timestamp": "2024-03-01T08:00:00Z"
    },
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

export const SCHOOLS = [
    'Keller Elementary',
    'Juanita Elementary',
    'Twain Elementary',
    'Rush Elementary',
    'McAuliffe Elementary',
    'Bell Elementary',
    'Alcott Elementary',
    'Kirk Elementary',
    'Einstein Elementary',
    'Rockwell Elementary',
    'Rose Hill Elementary',
    'Franklin Elementary',
    'Dickinson Elementary',
    'Thoreau Elementary',
    'Summer School',
    'Sandburg Elementary',
    'Redmond Elementary',
    'Baker Elementary',
    'Barton Elementary',
    'Smith Elementary',
    'Muir Elementary',
    'Carson Elementary',
    'Wilder Elementary',
    'Mead Elementary',
    'Special Services',
    'Lakeview Elementary',
    'Rosa Parks Elementary',
    'Audubon Elementary',
    'Mann Elementary',
    'Discovery Elementary',
    'Frost Elementary',
    'Blackwell Elementary',
    'Community School',
    'Explorer Elementary',
    'Emerson K-12',
    'Contractual School',
    'Environmental',
    'Timberline Middle School',
    'Redmond Middle School',
    'Rose Hill Middle School',
    'Finn Hill Middle School',
    'Kamiakin Middle School',
    'Evergreen Middle School',
    'Kirkland Middle School',
    'Inglewood Middle School',
    'International',
    'Stella Schola',
    'Northstar Middle School',
    'Renaissance',
    'Eastlake High School',
    'WaNIC Summer School',
    'Redmond High School',
    'Lake Washington High School',
    'STEM School',
    'Emerson High School',
    'WaNIC Skill Center',
    'WaNIC Skill Center',
    'WaNIC Summer School',
    'Futures School',
];

export default function Index() {
    const [loadingData, setLoadingData] = useState(true);

    const [user, setUser] = useState<null | string>(null); // "a43ef9f7-f6c5-48b3-9007-6675d9ec7158"
    const [messages, setMessages] = useState<Message[]>([]);
    const [stage, setStage] = useState("initial");
    const [message, setMessage] = useState("");

    const [friend, setFriend] = useState<any | null>(null);
    const [friends, setFriends] = useState<any[]>([]);

    const [school, setSchool] = useState<number | null>(null);
    const [grade, setGrade] = useState<number | null>(null);

    const loadData = useCallback(() => {
        void (async () => {
            console.log("Reloading...");
            setLoadingData(true);

            const msgs = await AsyncStorage.getItem("messages");
            setMessages(msgs ? JSON.parse(msgs) : [INITIAL]);

            setStage((await AsyncStorage.getItem("stage")) || "initial");

            const fds = await AsyncStorage.getItem("friends");
            setFriends(fds ? JSON.parse(fds) : []);

            const sc = await AsyncStorage.getItem("school");
            setSchool(sc ? Number.parseInt(sc) : null);

            const gr = await AsyncStorage.getItem("grade");
            setGrade(gr ? Number.parseInt(gr) : null);

            setLoadingData(false);
        })();
    }, []);

    useEffect(() => {
        loadData();

        (async () => {
            /*const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers, Contacts.Fields.Relationships, Contacts.Fields.SocialProfiles],});

                const contacts = data.map(contact => {
                    const phone = contact.phoneNumbers ? contact.phoneNumbers.filter(phone => phone.countryCode === "us")[0]?.digits ?? undefined : undefined;
                    const emails = contact.emails ? contact.emails.map(email => email.email) : [];

                    return {name: contact.name, phone, emails};
                });

                console.log(contacts);
            }*/
            console.log(await getUserIdentity());
        })();
    }, []);

    useEffect(() => {
        void AsyncStorage.setItem("stage", stage);
    }, [stage]);

    useEffect(() => {
        if (school) {
            void AsyncStorage.setItem("school", String(school));
        }
    }, [school]);

    useEffect(() => {
        if (grade) {
            void AsyncStorage.setItem("grade", String(grade));
        }
    }, [grade]);

    useEffect(() => {
        if (messages.length > 1) {
            void AsyncStorage.setItem("messages", JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        if (friends.length > 1) {
            void AsyncStorage.setItem("friends", JSON.stringify(friends));
        }
    }, [friends]);

    const send = async () => {
        setMessage("");
        if (stage === "initial") {
            try {
                setFriends(friends => ([...friends, friend]));
                setMessages([...messages, {role: "user", content: message, timestamp: Date.now(), id: uuid.v4() as string}, {role: "assistant", id: uuid.v4() as string, timestamp: Date.now(), content: `Are you in ${SCHOOLS[friend.school]} as well?`}]);
                setStage("school_ask_ai");
            } catch (e) {
                console.log(Object.values(e as any));
            }
        }
        if (stage === "school_ask_ai") {
            const data: {type: number, school?: string} = await (await fetch("http://10.0.4.38:3000/ai/schools", {
                method: "POST",
                body: JSON.stringify({
                    assistant: messages[messages.length - 1].content,
                    user: message
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })).json();
            console.log(data);
            const text = data.type === 1 ? "Ok, who is another one of your friends?" : data.type === 2 ? "No worries! Please tell me which school you attend." : data.type === 3 ? "Ok, who is another one of your friends?" : data.type === 4 ? "aw shoot what now" : "Chill out dude. I'm just asking which school you go to.";
            setMessages([...messages, {role: "user", content: message, timestamp: Date.now(), id: uuid.v4() as string}, {role: "assistant", id: uuid.v4() as string, timestamp: Date.now(), content: text}]);
            if (data.type === 1) {
                setSchool(friend.school);
                setStage("friend_ask");
            }
            if (data.type === 3) {
                setSchool(SCHOOLS.indexOf(data.school!));
                setStage("friend_ask");
            }
            if (data.type === 2 || data.type === 5) {
                setStage("school_ask");
            }
        }
        if (stage === "school_ask") {
            setMessages([...messages, {role: "user", content: message, timestamp: Date.now(), id: uuid.v4() as string}, {role: "assistant", id: uuid.v4() as string, timestamp: Date.now(), content: "Ok, who is another one of your friends?"}]);
            setSchool(SCHOOLS.indexOf(message));
            setStage("friend_ask");
        }
        if (stage === "friend_ask") {
            setFriends(friends => ([...friends, friend]));
            const oldest = Math.max(friends[0].grade, friend.grade);
            const m: Message[] = [...messages, {role: "user", content: message, timestamp: Date.now(), id: uuid.v4() as string}, {role: "assistant", id: uuid.v4() as string, timestamp: Date.now(), content: `Are you in ${oldest}th grade?`}];
            setMessages(m);
            setStage("grade_ask_ai");
        }
        if (stage === "grade_ask_ai") {
            const data: {type: number, grade?: number} = await (await fetch("http://10.0.4.38:3000/ai/grades", {
                method: "POST",
                body: JSON.stringify({
                    assistant: messages[messages.length - 1].content,
                    user: message
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })).json();
            console.log(data);

            const text = data.type === 1 ? "Thanks! I think I have an idea on who you might be." : data.type === 2 ? "Please tell me which grade you're in." : data.type === 3 ? "Thanks! I think I have an idea on who you might be." : data.type === 4 ? "aw shoot now what" : "Bro calm down. I'm just asking for your grade";
            setMessages([...messages, {role: "user", content: message, timestamp: Date.now(), id: uuid.v4() as string}, {role: "assistant", id: uuid.v4() as string, timestamp: Date.now(), content: text}]);

            if (data.type === 1) {
                setGrade(Math.max(friends[0].grade, friends[1].grade));
                setStage("name_attempt");
            }
            if (data.type === 3) {
                setGrade(data.grade!);
                setStage("name_attempt");
            }
            if (data.type === 2 || data.type === 5) {
                setStage("grade_ask");
            }
        }
        if (stage === "grade_ask") {
            setMessages([...messages, {role: "user", content: message, timestamp: Date.now(), id: uuid.v4() as string}, {role: "assistant", id: uuid.v4() as string, timestamp: Date.now(), content: "Thanks! I think I have an idea on who you might be."}]);
            setGrade(Number.parseInt(message));
            setStage("name_attempt");
        }
    }

    console.log(stage)

    return <>
            <SafeAreaView style={{backgroundColor: "rgb(255 251 235)", height: "100%"}}>
                <GestureHandlerRootView style={{height: "100%", position: "relative"}}>
                    {user && <TouchableOpacity activeOpacity={0.7} style={{width: 40, height: 40, borderRadius: 25, backgroundColor: 'rgb(251 113 133)', justifyContent: 'center', alignItems: 'center', position: "absolute", left: 15, zIndex: 100}}>
                        <Ionicons name="home-outline" size={24} color="white" />
                    </TouchableOpacity>}
                    {user && <Link href="/modal" asChild>
                        <TouchableOpacity style={{width: 40, height: 40, borderRadius: 25, borderWidth: 1, borderColor: "rgb(251 113 133)", justifyContent: 'center', alignItems: 'center', position: "absolute", right: 15, zIndex: 100}}>
                            <Image style={{width: 38, height: 38, borderRadius: 25}} source={`https://hannah-pfp.s3.us-east-1.amazonaws.com/${user}.jpeg`}/>
                        </TouchableOpacity>
                    </Link>}

                    <KeyboardAvoidingView keyboardVerticalOffset={75} behavior="padding" style={{backgroundColor: "", height: "100%", flex: 1, gap: 0, flexDirection: "column"}}>
                        <FlatList onRefresh={loadData} refreshing={loadingData} indicatorStyle="black" scrollIndicatorInsets={{right: 2}} style={{backgroundColor: "", paddingTop: 0, paddingHorizontal: 15}} data={messages} renderItem={(item) => <Message last={item.index === messages.length - 1} item={item.item} index={item.index} user={user}/>}/>

                        {(stage === "initial" || stage === "friend_ask") && <SearchMessageBox message={message} setMessage={setMessage} onSend={send} setValue={setFriend}/>}
                        {stage === "school_ask_ai" && <MessageBox message={message} setMessage={setMessage} onSend={send}/>}
                        {stage === "school_ask" && <OptionsMessageBox message={message} setMessage={setMessage} onSend={send} options={SCHOOLS}/>}
                        {stage === "grade_ask_ai" && <MessageBox message={message} setMessage={setMessage} onSend={send}/>}
                        {stage === "grade_ask" && <MessageBox type={"numeric"} message={message} setMessage={setMessage} onSend={send}/>}
                    </KeyboardAvoidingView>

                    <LinearGradient colors={['rgb(255 251 235)', 'rgba(255, 255, 255, 0)']} locations={[0.01, user ? 0.15 : 0.05]} style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 50}}/>
                </GestureHandlerRootView>
            </SafeAreaView>
            <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'}/>
    </>
}
