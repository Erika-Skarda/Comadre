import React, { Fragment, useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductsContext from '../context/ProductsContext';

export default ({ route, navigation }) => {

  const { dispatch } = useContext(ProductsContext);

  const [newProduct, setProduct] = useState(route.params ? route.params : {})
  
  return (
    <Fragment>
      <View style={style.form}>
        <Text style={style.text}>Produto</Text>
        <TextInput
          style={style.input}
          underlineColorAndroid="transparent"
          onChangeText={name => setProduct({...newProduct, name})}
          placeholder="Informe o nome do produto"
          value={newProduct.name}
        />
        <Text style={style.text}>Imagem</Text>
        <TextInput
          style={style.input}
          underlineColorAndroid="transparent"
          onChangeText={img=> setProduct({...newProduct, img})}
          placeholder="Informe a imagem do produto"
          value={newProduct.avatar_url}
        />
        <Text style={style.text}>Quantidade</Text>
        <TextInput
          style={style.input}
          underlineColorAndroid="transparent"
          onChangeText={amount => setProduct({...newProduct, amount})}
          placeholder="Informe a quantidade do produto"
          value={newProduct.quantity}
        />
        <Text style={style.text}>valor Unitário</Text>
        <TextInput
          style={style.input}
          underlineColorAndroid="transparent"
          onChangeText={unit_value => setProduct({...newProduct, unit_value})}
          placeholder="Informe a quantidade do produto"
          value={newProduct.unit_value}
        />
        <Button 
          buttonStyle={{backgroundColor: '#517fa4'}}
          type="solid"
          icon={
            <Icon
              name="arrow-down"
              raised
              size={15}
              color='#fff'
            />
          }
          iconRight
          title=" Salvar "
          onPress={() => {
            dispatch({
              type: newProduct.id ? 'updateProduct' : 'createProduct',
              payload: newProduct
            })
            navigation.goBack()
          }}
        />
      </View>
    </Fragment>
  )
}

const style = StyleSheet.create ({
  form: {
    padding: 12,
  },
  text: {
    color: '#517fa4',
  },
  input: {
    height: 40,
    borderColor: '#517fa4',
    borderWidth: 1,
    marginBottom: 10,
  },
})