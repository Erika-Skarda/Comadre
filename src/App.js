import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductsProvider} from './context/ProductsContext';
import ProductList from './views/ProductList';
import ProductForm from './views/ProductForm';
import { Button, Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default props => {
  return (
    <ProductsProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ProductList"
          screenOptions={screenOptions}
        >
          <Stack.Screen 
            name="ProductList"
            component={ProductList}
            options={({ navigation }) => {
              return {
                title: "Lista de Produtos",
                headerRight: () => (
                  <Button 
                    onPress={() => navigation.navigate("ProductForm")}
                    type="clear"
                    icon={<Icon name="add" size={25} color="#fff" />}
                  />
                )
              }
            }}
          />
          <Stack.Screen 
            name="ProductForm"
            component={ProductForm}
            options={{
              title: "Formulário de Produtos"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductsProvider>
  )
}

const screenOptions = {
  headerStyle: {
    backgroundColor: '#517fa4',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
}