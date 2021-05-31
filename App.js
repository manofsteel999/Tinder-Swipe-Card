import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Button } from "react-native-elements";
import Deck from "./src/Deck";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://picsum.photos/id/1000/200/300",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "https://picsum.photos/id/1002/200/300",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "https://picsum.photos/id/1003/200/300",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "https://picsum.photos/200/300",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "https://picsum.photos/200/300",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "https://picsum.photos/200/300",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "https://picsum.photos/200/300",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "https://picsum.photos/200/300",
  },
];

export default function App() {
  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>All Done!</Card.Title>
        <Card.Image
          source={{ uri: "https://picsum.photos/200/300" }}
        ></Card.Image>
        <Text style={{ marginBottom: 10, marginTop: 10 }}>
          Theres no more content here!
        </Text>
        <Button
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
          title="Get More!"
        />
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <Deck data={DATA} renderNoMoreCards={renderNoMoreCards()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
