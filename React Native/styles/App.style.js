import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainMenuContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: '#0b536a',
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginTop: 10,
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  mainMenuIcon: {
    width: 70,
    height: 56,
  },
  diomacLogo: {
    width: 300,
    height: 68.3,
    marginBottom: 10,
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#edf7fa',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#0b536a',
    fontFamily: 'Ubuntu-Regular',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#0b536a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  selectProductButton: {
    width: '75%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#63c6ed',
    position: 'absolute',
    bottom: 20,
  },
  buttonTitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    paddingTop: 10,
  },
})
