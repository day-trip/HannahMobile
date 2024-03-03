import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';
import {Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";
import React from "react";
import {Image} from "expo-image";

export default function ModalScreen() {
    return <>
        <SafeAreaView style={{backgroundColor: "rgb(255 251 235)", height: "100%"}}>
            <View style={{height: "100%", padding: 15, position: "relative", backgroundColor: "transparent"}}>
                <View style={{position: "absolute", left: 0, right: 0, top: 0, height: 120, backgroundColor: "rgb(253 230 138)"}}>

                </View>
                <Link href="/" asChild>
                    <TouchableOpacity style={{width: 40, height: 40, borderRadius: 25, backgroundColor: 'rgb(251 113 133)', justifyContent: 'center', alignItems: 'center', position: "absolute", right: 10, top: 10, zIndex: 100}}>
                        <Ionicons name="close-outline" size={32} color="white" />
                    </TouchableOpacity>
                </Link>
                <Image style={{width: 100, height: 100, borderRadius: "100%", marginTop: 50, borderWidth: 3, borderColor: "rgb(255 251 235)"}} source={`https://hannah-pfp.s3.us-east-1.amazonaws.com/${"a43ef9f7-f6c5-48b3-9007-6675d9ec7158"}.jpeg`}/>
                <Text style={{fontSize: 30, fontFamily: "Cambria", marginLeft: 15, marginTop: 10}}>Jai Giri</Text>
            </View>
        </SafeAreaView>

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
