import React, { Fragment, useContext, useState, useEffect } from 'react';
import { 
  SafeAreaView,
  View, 
  FlatList, 
  StyleSheet,
  Image,
  Alert } from 'react-native';
import { 
  ListItem, 
  Icon, 
  Button,
  Divider,
  SearchBar } from 'react-native-elements';
import ProductsContext from '../context/ProductsContext';

export default props => {

  const { state, dispatch } = useContext(ProductsContext);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(state.products);
    setMasterDataSource(state.products);
  }, [state, dispatch]);

  function confirmProductDeletion(product) {
    Alert.alert('Excluir Produto 🗑️', 'Deseja excluir o produto?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteProduct',
            payload: product
          })
        }
      },
      {
        text: 'Não'
      }
    ]);
  };

  function getActions(product) {
    return(
      <Fragment>
        <Button
          onPress={() => props.navigation.navigate('ProductForm', product)}
          type="clear"
          icon={<Icon name="edit" size={25} color='#517fa4' />}
        />
         <Button
          onPress={() => confirmProductDeletion(product)}
          type="clear"
          icon={<Icon name="delete" size={25} color='tomato' />}
        />
      </Fragment>
    )
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  function getProducts({ item: product }) {

    return (
      <Fragment>
        <ListItem 
          round
          key={product.key}
          onPress={() => props.navigation.navigate('ProductForm', product)}
        >
          <Image
            source={product.img}
            style={{
              width: 40,
              height: 40,
              alignSelf: 'center',
              marginLeft: 10,
              borderRadius: 5,
          }}
         />
          <ListItem.Content>
            <ListItem.Title>{product.name}</ListItem.Title>
            <ListItem.Subtitle>{product.amount} unit</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Subtitle>R$ {product.unit_value}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title>Total:</ListItem.Title>
            <ListItem.Subtitle>R$ {Number(product.unit_value * product.amount)}</ListItem.Subtitle>
          </ListItem.Content>
          {getActions(product)}
        </ListItem>
        <Divider style={{ backgroundColor: 'blue' }} />
      </Fragment>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Procurar..."
          value={search}
        />
        <FlatList
          round
          keyExtractor={product => product.key}
          ItemSeparatorComponent={ItemSeparatorView}
          data={filteredDataSource}
          renderItem={getProducts}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
});
