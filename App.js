import { StyleSheet, Text, View } from "react-native"
import List from "./src/List";


const App = () =>{
  return(
    <List/>
  )
}

const styles = StyleSheet.create({
  contaier: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App




  