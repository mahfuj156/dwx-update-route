import { BrowserRouter } from "react-router-dom";
import Routing from "../Router/Routing";
import '../assets/styles/global.css';

function App() {
    return (
        <BrowserRouter>
            <Routing />
        </BrowserRouter>
    );
}

export default App;
