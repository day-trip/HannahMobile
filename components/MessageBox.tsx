import React, {useCallback, useEffect, useMemo, useState} from "react";
import {TextInput, TouchableOpacity} from "react-native";
import {debounce} from "lodash";
import {Ionicons} from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import FlatList = Animated.FlatList;
import View = Animated.View;
import Text = Animated.Text;

export const OptionsMessageBox = ({message, setMessage, enabled = true, onSend, options}: {message: string, setMessage: (message: string) => void, enabled?: boolean, onSend: () => void | Promise<void>, options: string[]}) => {
    const results = useMemo<string[]>(() => message.length > 0 ? options.filter(option => option.toLowerCase().startsWith(message.toLowerCase())) : [], [message, options]);

    const valid = useMemo(() => options.includes(message), [message, options]);

    return <>
        {!valid && <View style={{width: "100%", paddingHorizontal: 7, backgroundColor: "", marginBottom: 4}}>
            <FlatList showsHorizontalScrollIndicator={false} horizontal={true} data={results} style={{width: "100%", backgroundColor: ""}} renderItem={(item) => <TouchableOpacity onPress={() => setMessage(item.item)} style={{borderRadius: 6, padding: 6, marginRight: 5, backgroundColor: "rgb(254 205 211)"}}>
                <Text style={{fontFamily: "Cambria", color: "black", fontSize: 17}}>{item.item}</Text>
            </TouchableOpacity>}/>
        </View>}
        <MessageBox capitalize={"words"} correct={false} enabled={enabled && valid} onSend={onSend} message={message} setMessage={setMessage}/>
    </>
}

export const SearchMessageBox = ({message, setMessage, enabled = true, onSend, setValue}: {message: string, setMessage: (message: string) => void, enabled?: boolean, onSend: () => void | Promise<void>, setValue: (value: any) => void}) => {
    const [results, setResults] = useState<{name: string, id: string, grade: number, school: number, email: string, identifier: string}[]>([]);

    const update = useCallback(debounce(async (name: string) => {
        try {
            const data = await fetch(`http://10.0.4.38:3000/users/${encodeURIComponent(name.toLowerCase())}`);
            const r = await data.json();
            setResults(r);
        } catch (e) {
            console.log(Object.values(e as any));
        }
    }, 500), [setResults]);

    useEffect(() => {
        if (message.length > 2) {
            setResults(results => results.filter(result => result.name.toLowerCase().startsWith(message.toLowerCase())));
            update(message);
        } else {
            setResults([]);
        }
    }, [message]);

    const valid = useMemo(() => results.map(x => x.name).includes(message), [message, results]);

    return <>
        {!valid && <View style={{width: "100%", paddingHorizontal: 7, backgroundColor: "", marginBottom: 4}}>
            <FlatList showsHorizontalScrollIndicator={false} horizontal={true} data={results} style={{width: "100%", backgroundColor: ""}} renderItem={(item) => <TouchableOpacity onPress={() => {setMessage(item.item.name); setValue(item.item);}} style={{borderRadius: 6, padding: 6, marginRight: 5, backgroundColor: "rgb(254 205 211)"}}>
                <Text style={{fontFamily: "Cambria", color: "black", fontSize: 17}}>{item.item.name}</Text>
            </TouchableOpacity>}/>
        </View>}
        <MessageBox capitalize={"words"} correct={false} enabled={enabled && valid} onSend={onSend} message={message} setMessage={setMessage}/>
    </>
}

export const MessageBox = ({message, setMessage, enabled = true, onSend, capitalize, correct, type}: {message: string, setMessage: (message: string) => void, enabled?: boolean, onSend: () => void | Promise<void>, options?: string[], correct?: boolean, capitalize?: "words", type?: "numeric"}) => {
    return <View style={{width: "100%", paddingHorizontal: 5, flexDirection: "row", alignItems: "center", backgroundColor: "", position: "relative"}}>
        <TextInput inputMode={type} autoCapitalize={capitalize} autoCorrect={correct} returnKeyType='send' value={message} onChangeText={setMessage} placeholder='Talk to Hannah' style={{backgroundColor: "white", fontFamily: "Cambria", borderRadius: 30, borderWidth: 0.5, borderColor: "rgb(251 113 133)", paddingHorizontal: 20, paddingVertical: 14, flex: 1, fontSize: 19}} placeholderTextColor="rgb(156 163 175)"/>
        <TouchableOpacity onPress={onSend} disabled={!enabled} style={{width: 40, height: 40, borderRadius: 25, backgroundColor: enabled ? 'rgb(251 113 133)' : '#fda4af', justifyContent: 'center', alignItems: 'center', position: "absolute", zIndex: 50, right: 10}}>
            <Ionicons name="arrow-up-outline" size={24} color="white" />
        </TouchableOpacity>
    </View>
}
