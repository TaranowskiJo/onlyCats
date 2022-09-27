import Cats from './views/AllCats';
import { Link, Navigate, Route, Routes} from 'react-router-dom';
// import GlobalStyle from './globalStyles';
// import  EditCat  from './views/EditCat';
// import Cat from './views/OneCat';
import  CatCity  from './views/CatCity';
import { NewCat } from './views/NewCat';
import { NotFound } from './views/NotFound';
import { useEffect, useState } from 'react';


function App() {

  return (
    <div className="App ">
      <nav className="navbar shadow bg-secondary navbar-expand-lg sticky-top justify-content-around">
          <div className='left-nav'>
            <img src='./images/cat.png' className='cat-logo'/>
            <Link
              to="/cats"
              className="btn navbar-brand"
            >
              only<em>Cats</em>
            </Link>
          </div>

        <div className="navbar-nav justify-content-between ">
          <div className='right-nav'>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Cat's by City
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="/cats/Seattle">Seattle</a></li>
                <li><a className="dropdown-item" href="/cats/Chigago">Chicago</a></li>
                <li><a className="dropdown-item" href="/cats/San-Jose">San Jose</a></li>
                <li><a className="dropdown-item" href="/cats/Miami">Miami</a></li>
              </ul>
            </div>

            <Link
                to="/cats/new"
            >
              <img src="images/new_post.png" alt="add new" className="add-icon "/>
            </Link>
          </div>
        </div>
      </nav>

  {/* FRONT END ROUTES to display VIEWS */}
  {/* SEPERATTE FROM SERVER ROUTES */}
  <Routes>
        {/* Redirect example */}
        <Route path="/" element={<Navigate to="/cats" />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/cats/:city" element={<CatCity />} />
        {/*<Route path="/cats/:id/edit" element={<EditCat />} />*/}
        <Route path="/cats/new" element={<NewCat />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
