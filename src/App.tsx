
import './App.css'
import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import { AppBar, Button, Toolbar, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


ModuleRegistry.registerModules([AllCommunityModule])



function App() {


  // Reset api
  const resetApi = async () => {
    try {
      const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to reset the API");
      }
      console.log("API reset successfully");
      alert("API reset successfully!");
    } catch (error) {
      console.error("Error resetting API:", error);
      alert("Error resetting API. Please try again.");
    }
  };


  return (
    <>
    <Router>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Personal Trainer
          </Typography>
          <Button variant="contained" onClick={resetApi}>
            Reset Data
          </Button>
          <Button color="inherit" component={Link} to="/">
            Customers
          </Button>
          <Button color="inherit" component={Link} to="/trainings">
            Trainings
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
      </Routes>
    </Router>
    </>
  
  )
}

export default App
