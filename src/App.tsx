import { Route, Routes } from 'react-router-dom'

import Layout from './layouts/Layout'
import Home from './pages/HomePage/HomePage'
import Card from './pages/Card/CardPage'
// import MapResults from "./components/Map/MapAutosuggest";
// import AddressAutosuggest from "./components/Map/Map2";
import SearchResultsPage from './pages/HomePage/SearchResultsPage'
import AboutUs from './pages/AboutUsPage'
import Support from './pages/SupportPage'
import Info from './pages/InfoPage'
// import ClubMapMarkers from "./components/Map/Map1";
import ClubMapMarkers from './components/Map/MapCommon'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/info" element={<Info />} />
          <Route path="/card" element={<Card />} />
          {/* <Route path="/map" element={<MapResults />}></Route>
            <Route path="/map1" element={<ClubMapMarkers />}></Route> */}
          <Route path="/map" element={<ClubMapMarkers />}></Route>
          {/* <Route path="/map2" element={<AddressAutosuggest />}></Route> */}
          <Route path="/searchresults" element={<SearchResultsPage />}></Route>
          <Route path="/club/:clubId" element={<Card />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
