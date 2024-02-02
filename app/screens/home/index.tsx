import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import {useProduct} from "../../../src/hooks/ProductHooks";
import {useAppSelector, useAppDispatch} from "../../../src/store/store";
import Product from "../../../src/components/products/product";
import {FAB} from "react-native-paper";
import {TextInput} from "react-native-gesture-handler";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../../src/store/actions/productActions";

// Add this to your component

const Home = () => {
  const {products} = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const {initProduct} = useProduct();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description: "",
    published: false,
    id: undefined,
  });

  useEffect(() => {
    initProduct();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    initProduct();
    setIsRefreshing(false);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleAddProduct = () => {
    console.log("Adding product:", newProduct);

    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      console.log("oops");
    } else {
      dispatch(addProduct({newProduct}))
        .then((resultAction) => {
          if (addProduct.fulfilled.match(resultAction)) {
            console.log("sheeehs");
            Alert.alert("Success", "Product added successfully!");

            closeModal();
            setNewProduct({
              title: "",
              price: 0,
              description: "",
              published: false,
              id: undefined,
            });
          }
        })
        .catch((error) => {
          Alert.alert("Failed", "Failed adding Product !");
          console.error("Error adding product:", error);
        });

      closeModal();
      setNewProduct({
        title: "",
        price: 0,
        description: "",
        published: false,
        id: undefined,
      });
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id))
      .then((resultAction) => {
        if (deleteProduct.fulfilled.match(resultAction)) {
          console.log("here at me");
          Alert.alert("Success", "Product deleted successfully!");
        }
      })
      .catch((error) => {
        Alert.alert("Failed", "Failed deleting product!");
        console.error("Error deleting product:", error);
      });
  };

  const handleOpenEdit = (item: any) => {
    console.log(item);

    setNewProduct(item);
    openModal();
  };

  const handleUpdateProduct = () => {
    dispatch(updateProduct(newProduct))
      .then((resultAction) => {
        if (updateProduct.fulfilled.match(resultAction)) {
          Alert.alert("Success", "Product updated successfully!");

          closeModal();
          setNewProduct({
            title: "",
            price: 0,
            description: "",
            published: false,
            id: undefined,
          });
        }
      })
      .catch((error) => {
        Alert.alert("Failed", "Failed updating product!");
        console.error("Error  updating product:", error);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewProduct({
      title: "",
      price: 0,
      description: "",
      published: false,
      id: undefined,
    });
  };

  const renderModal = () => {
    return (
      <Modal visible={isModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
          >
            {/* Semi-transparent background */}
            <View style={styles.modalBackground}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 20,
                  borderRadius: 10,
                  width: 330,
                  height: 400,
                }}
              >
                <Text style={styles.header}>
                  {newProduct.id ? "Update Product" : " Add Product"}
                </Text>
                {/* Title Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={newProduct.title}
                  onChangeText={(text) =>
                    setNewProduct({...newProduct, title: text})
                  }
                />

                {/* Price Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  value={newProduct.price.toString()} // Convert number to string
                  onChangeText={(text) =>
                    setNewProduct({...newProduct, price: parseFloat(text) || 0})
                  }
                  keyboardType="numeric"
                />
                {/* Description Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={newProduct.description}
                  onChangeText={(text) =>
                    setNewProduct({...newProduct, description: text})
                  }
                />
                {/* Published Input */}
                <View style={{flexDirection: "row", alignItems: "center"}}>
                  <Text>Published:</Text>
                  <Switch
                    value={newProduct.published}
                    onValueChange={(value) =>
                      setNewProduct({...newProduct, published: value})
                    }
                    trackColor={{false: "#767577", true: "#81b0ff"}}
                    thumbColor={newProduct.published ? "#f5dd4b" : "#f4f3f4"}
                  />
                </View>
                {/* Add Product Button */}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <TouchableOpacity
                    onPress={handleCancel}
                    style={styles.cancelButton}
                  >
                    <Text style={{color: "white"}}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={
                      newProduct.id ? handleUpdateProduct : handleAddProduct
                    }
                    style={styles.addButton}
                  >
                    <Text style={{color: "white"}}>
                      {newProduct.id ? "Update Product" : "Add Product"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  if (products.status === "loading") {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={products.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <Product
            product={item}
            onDelete={handleDelete}
            onEdit={handleOpenEdit}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
      {/* Floating Action Button */}
      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: "#3498db",
        }}
        icon="plus"
        onPress={openModal}
        color="white"
      />
      {/* Modal */}
      {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  cancelButton: {
    color: "white",
    backgroundColor: "#E36370",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha value for the desired opacity
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default Home;
