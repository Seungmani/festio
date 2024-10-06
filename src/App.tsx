import "./App.css"
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import { store, persistor } from "./redux/store";
import Loading from "./components/Common/Loading";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PersistGate>
    </Provider> 
  )
}

export default App
