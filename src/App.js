import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/Nabar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './components/mainPage/MainPage';
import AddNewItems from './components/addNewItems/AddNewItems';
import UpdateItem from './components/updateItem/UpdateItem';
import EndShift from './components/endShift/EndShift';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element = {<MainPage />}/>
          <Route path='addnew' element = {<AddNewItems />}/>
          <Route path='update' element = {<UpdateItem />}/>
          <Route path='endshift' element = {<EndShift />}/>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
