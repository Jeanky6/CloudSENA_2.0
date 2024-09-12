import { CDBContainer } from "cdbreact";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from '../../components/Sidebar/Sidebar';
import List from "../../components/CrearProyecto/List";
import './Crear.css'

function proyecto() {
  
  return (
    <div style={{ display: "block", height: "100vh" }}>
      {/* Navbar */}
      <div>
        <Navbar />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
          {/* Sidebar */}
          <div style={{ width: '250px', backgroundColor: '#ffffff' }}>
            <Sidebar />
          </div>

          
          <div style={{ display:'flex', padding: '20px', width: '100%'  }}>
            <CDBContainer>
              <List></List>
            </CDBContainer>
          </div>
      
    </div>
    </div>
  );
}
export default proyecto;