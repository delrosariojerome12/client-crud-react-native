import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {FontAwesome} from "@expo/vector-icons"; // Import FontAwesome from Expo

interface ProductProps {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    published: boolean;
  };
  onEdit: (product: {
    id: number;
    title: string;
    price: number;
    description: string;
    published: boolean;
  }) => void;
  onDelete: (productId: number) => void;
}

const Product = ({product, onEdit, onDelete}: ProductProps) => {
  return (
    <View style={styles.container}>
      {/* Product Details */}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.published}>
        {product.published ? "Published" : "Not Published"}
      </Text>

      <View style={styles.buttonsContainer}>
        {/* Edit Button */}
        <TouchableOpacity onPress={() => onEdit(product)}>
          <FontAwesome name="pencil" size={20} color="#3498db" />
        </TouchableOpacity>
        {/* Delete Button */}
        <TouchableOpacity onPress={() => onDelete(product.id)}>
          <FontAwesome name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 3,
  },
  buttonsContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    gap: 12,
    position: "absolute",
    right: 0,
    top: 0,
    paddingRight: 15,
    padding: 10,
    height: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: "green",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  published: {
    fontSize: 12,
    color: "#888",
  },
});

export default Product;
