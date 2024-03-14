import "./App.css";
import Upload from "./components/Upload";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fields from "./components/Fields";
import Charge from "./components/Charge";
import Status from "./components/Status";
import Request from "./components/Request";
import Result from "./components/Result";


function App() {
  return (
    <div>
      <Upload />
      <div className="flex">
        <Fields />
        <Status />
      </div>
      <Charge />
      <Request />
      <Result />
      <ToastContainer />
    </div>
  );
}

export default App;
