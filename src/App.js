import './App.css';
import Sidebar from '../../client/src/Components/sidebar';
import SIPCalculator from '../../client/src/Components/index';

function App() {
  return (
    <>
    <div className='leftSideBox'>
      <Sidebar/>
    </div>

    <div className='rightSideBox'>
        <button>🡨Back</button>
      <SIPCalculator/>
    </div>
    </>
  );
}

export default App;
