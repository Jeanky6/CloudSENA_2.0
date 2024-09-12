import { CDBContainer } from 'cdbreact';
import Sidebar from "./../../components/Sidebar/Sidebar.jsx"
import Navbar from "./../../components/Navbar/Navbar.jsx"
import List from '../../components/Principal2/principal2.jsx';

function principal2(){
    return(
        <div style={{ display: 'block', height: '100vh' }}>
        {/* Navbar */}
        <div >
          <Navbar />
        </div>
  
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {/* Sidebar */}
          <div style={{ width: '250px', backgroundColor: '#ffffff' }}>
            <Sidebar />
          </div>
  
          {/* Contenido de la página */}
          <div style={{ display:'flex', padding: '20px', width: '100%', marginLeft:'-20%'  }}  >
            <CDBContainer>
              <List></List>
            </CDBContainer>
          </div>
        </div>
      </div>
    )
}

export default principal2