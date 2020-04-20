import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import ListOpenIntakes from './src/screens/intake/ListOpenIntakes'
import SelectPo from './src/screens/intake/SelectPo.js'
import SelectPoLine from './src/screens/intake/SelectPoLine.js'
import IntakeScan from './src/screens/intake/IntakeScan.js'
import Login from './src/screens/Login.js'
import MainMenu from './src/screens/MainMenu.js'
import IntakeDetails from './src/screens/intake/IntakeDetails.js'
import SelectProduct from './src/screens/intake/SelectProduct.js'

const RootStack = createStackNavigator({
  Login:{
    screen: Login,
    navigationOptions:{
      headerShown:false,
    },
  },
  MainMenu:{
    screen: MainMenu,
    navigationOptions:{
      headerShown:false,
    },
  },
  ListOpenIntakes: {
    screen: ListOpenIntakes,
    navigationOptions: {
      headerShown:false,
    },
  },
 SelectPo: {
    screen:SelectPo,
    navigationOptions:{
      headerShown:false,
    }
  },
  SelectPoLine: {
    screen:SelectPoLine,
    navigationOptions:{
      headerShown:false,
    }
  },
  IntakeDetails: {
    screen: IntakeDetails,
    navigationOptions: {
      headerShown:false,
    },
  },
  IntakeScan: {
    screen: IntakeScan,
    navigationOptions: {
      headerShown:false,
    },
  },
  SelectProduct: {
    screen: SelectProduct,
    navigationOptions: {
      headerShown:false,
    },
  },
})

const App = createAppContainer(RootStack)
export default App
