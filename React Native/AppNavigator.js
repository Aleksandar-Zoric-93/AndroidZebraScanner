import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import IntakeDashboard from './Screens/Intake/IntakeDashboard.js'
import SelectPo from './Screens/Intake/SelectPo.js'
import SelectPoLine from './Screens/Intake/SelectPoLine.js'
import Scan from './Screens/Intake/Scan.js'
import Login from './Screens/Login.js'
import MainMenu from './Screens/MainMenu.js'
import IntakeLines from './Screens/Intake/IntakeLines.js'
import SelectProduct from './Screens/Intake/SelectProduct.js'

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
  IntakeDashboard: {
    screen: IntakeDashboard,
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
  IntakeLines: {
    screen: IntakeLines,
    navigationOptions: {
      headerShown:false,
    },
  },
  Scan: {
    screen: Scan,
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
