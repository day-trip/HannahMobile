import Animated, {runOnUI, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import React, {useCallback, useMemo} from "react";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {Text as MotiText} from "moti/build/components/text";
import * as Haptics from "expo-haptics";
import FlatList = Animated.FlatList;
import View = Animated.View;
import Text = Animated.Text;

type Line = {
    text: string;
    emojis: boolean;
}

export const Message = ({item, user, index, last}: {item: {content: string, id: string, role: string, timestamp: string}, index: number, user: string | null, last: boolean}) => {
    const position = useSharedValue(0);
    const open = useSharedValue(false);

    const lines = useMemo<Line[]>(() => {
        if (item.role === "user") {
            return [{text: item.content, emojis: /^\p{Extended_Pictographic}+$/u.test(item.content) && Array.from(item.content).length <= 3}];
        }
        return item.content.split("\n").map(x => ({text: x, emojis: /^\p{Extended_Pictographic}+$/u.test(x) && Array.from(x).length <= 3}));
    }, [item]);

    const playHaptic = useCallback(runOnUI(() => Haptics.selectionAsync()), []);

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
                    // playHaptic();
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
        <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", marginBottom: 16, marginTop: 14}}>
            <GestureDetector gesture={panGesture}>
                <View style={[{borderRadius: 10, backgroundColor: lines[0].emojis ? "transparent" : "rgb(254 205 211)", padding: 10}, animatedStyle]}>
                    <Text style={{fontSize: lines[0].emojis ? 40 : 21, fontFamily: "Cambria"}}>{lines[0].text}</Text>
                </View>
            </GestureDetector>
        </View>
        : <FlatList style={{marginTop: index === 0 ? (user ? 90 : 40) : 0}} data={lines} renderItem={(line) => last ? <View style={{flexDirection: "row", flexWrap: "wrap", marginBottom: 12}}>
            {line.item.text.split(" ").map((word: string, index: number) => <MotiText key={index} from={{opacity: 0}} animate={{opacity: 1}} transition={{type: "timing", duration: 500, delay: (line.index * 100) + index * 20}} style={{fontSize: line.item.emojis ? 40 : 21, fontFamily: "Cambria"}}>{word} </MotiText>)}
        </View> : <>
            <Text style={{fontSize: line.item.emojis ? 40 : 21, fontFamily: "Cambria", marginBottom: 12}}>{line.item.text}</Text>
        </>}/>
}
