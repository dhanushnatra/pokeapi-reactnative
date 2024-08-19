import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Searchbar } from "react-native-paper";
export default function App() {
  const [pokemonData, setPokemonData] = useState({
    type: "electric",
    name: "pikachu",
    attack: 55,
    defense: 40,
    hp: 35,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  });
  const [pokename, setPokename] = useState();
  useEffect(() => {
    fetchPokemonData(pokename).then((data) => setPokemonData(data));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.elements}>
        <Searchbar
          placeholder="Enter Pokemon Name here"
          value={pokename}
          onChangeText={setPokename}
          style={styles.input}
          onSubmitEditing={() =>
            fetchPokemonData(pokename).then((data) => setPokemonData(data))
          }
        />
        <StatusBar style="auto" />
        <PokemonData pokemonData={pokemonData} />
        <Button
          color={"black"}
          style={styles.btn}
          title="Random pokemon"
          onPress={() =>
            randomPokemonData().then((data) => setPokemonData(data))
          }
        />
        <Text style={styles.copyrights}>made by @dhanushgaadu</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  copyrights: {
    textAlign: "center",
    fontSize: 10,
    color: "black",
    padding: 10,
    margin: 10,
    fontFamily: "monospace",
    fontStyle: "italic",
    fontSize: 10,
    position: "relative",
  },
  elements: {
    backgroundColor: "#b9d7d9",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
    top: 50,
    flex: 1,
    display: "flex",
  },
  input: {
    width: "100%",
    margin: 12,
    top: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    fontFamily: "monospace",
  },
  btn: {
    width: 100,
    height: 50,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignSelf: "center",
  },
  pic: {
    width: 280,
    height: 280,
    alignSelf: "center",
  },
  box: {
    backgroundColor: "#668284",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    display: "flex",
    flexDirection: "column",
  },
  innerbox: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
});
async function randomPokemonData() {
  const name = Math.ceil(Math.floor(Math.random() * 1024));
  const pokemon = { type: "", name: "", attack: 0, defense: 0, hp: 0, img: "" };
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    pokemon["name"] = data["name"];
    pokemon["hp"] = data["stats"][0]["base_stat"];
    pokemon["attack"] = data["stats"][1]["base_stat"];
    pokemon["defense"] = data["stats"][2]["base_stat"];
    pokemon["img"] =
      data["sprites"]["other"]["official-artwork"]["front_default"];
    pokemon["type"] = data["types"][0]["type"]["name"];
    return pokemon;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
}
async function fetchPokemonData(name) {
  name = name.toLowerCase();
  const pokemon = { type: "", name: "", attack: 0, defense: 0, hp: 0, img: "" };
  if (name != "") {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      pokemon["name"] = data["name"];
      pokemon["hp"] = data["stats"][0]["base_stat"];
      pokemon["attack"] = data["stats"][1]["base_stat"];
      pokemon["defense"] = data["stats"][2]["base_stat"];
      pokemon["img"] =
        data["sprites"]["other"]["official-artwork"]["front_default"];
      pokemon["type"] = data["types"][0]["type"]["name"];
      return pokemon;
    } catch (error) {
      return randomPokemonData();
    }
  } else {
    return randomPokemonData();
  }
}
function PokemonData({ pokemonData }) {
  return (
    <View style={styles.box}>
      <Image source={{ uri: pokemonData.img }} style={styles.pic} />
      <View style={styles.innerbox}>
        <Text style={styles.text}>{pokemonData.name}</Text>
        <Text style={styles.text}>HP: {pokemonData.hp}</Text>
        <Text style={styles.text}>Attack: {pokemonData.attack}</Text>
        <Text style={styles.text}>Defense: {pokemonData.defense}</Text>
        <Text style={styles.text}>Type: {pokemonData.type}</Text>
      </View>
    </View>
  );
}
