import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams, themeMaterial } from 'ag-grid-community';
import { Button, Typography, Container } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Customer, Training } from '../types';
import { getTrainings } from './apiFuncs';
import dayjs from 'dayjs';

type TrainingWithCustomer = {
    training: Training;
    customer: Customer;
  };

const TrainingList = () => {

    const [trainings, setTrainings] = useState<Training[]>([]);

    const [open, setopen] = useState(false);
    
    // table data
    const [colDefs] = useState<ColDef[]>([
        {
        headerName: "Actions", flex: 1,
            cellRenderer: (params: ICellRendererParams) =>
                <Button 
                size='small'
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(params)}>
                </Button>
        },
        { field: "activity", headerName: "Activity", filter: true, flex: 1},
        {
            field: "date", 
            headerName: "Date", 
            flex: 1,
            valueFormatter: (params) => dayjs(params.value).format("DD.MM.YYYY HH:mm")
        },
        { field: "duration", headerName: "duration", flex: 1},
        { 
            headerName: "Customer",
            valueGetter: (params) => `${params.data.customer.firstname || ''} ${params.data.customer.lastname || ''}`,
            flex: 1
        },
    ]);
  
    // Fetch trainings
    useEffect(() => {
        const fetchTrainingsWithCustomers = async () => {
            try {
                const data = await getTrainings();
                const trainingsWithCustomers = await Promise.all(
                    data._embedded.trainings.map(async (training: Training) => {
                        const customerResponse = await fetch(training._links.customer.href);
                        const customer = await customerResponse.json();
                        return { ...training, customer };
                    })
                );
                setTrainings(trainingsWithCustomers);
            } catch (error) {
                console.error("Error fetching trainings or customers:", error);
            }
        };
    
        fetchTrainingsWithCustomers();
    }, []);
  
  
    // Action handlers
    
    const handleDelete = async (params: ICellRendererParams) => {
      const training = params.data;
      const trainingHref = training._links?.self?.href;
    
      if (!window.confirm(`Are you sure you want to delete this training?`)) {
        return;
      }
    
      try {
        const response = await fetch(trainingHref, {
          method: "DELETE",
        });
    
        if (!response.ok) {
            throw new Error("Failed to delete the customer");
        }
        
        setTrainings((filteredTainings) =>
          filteredTainings.filter((t) => t._links.self.href !== trainingHref));
        alert("Training deleted successfully!");
      } catch (error) {
        console.error("Error deleting training:", error);
        alert("Error deleting training. Please try again.");
      }
    };


    return (
        <Container maxWidth="xl" style={{ marginTop: "80px"}}>
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Training List
        </Typography>
          <div style={{width: "100%", height: "80%", boxShadow: "0 -1px 8px rgba(0, 0, 0, 0.3)"}}>
            <AgGridReact
              theme={themeMaterial}
              rowSelection="multiple"
              rowData={trainings}
              columnDefs={colDefs}
              domLayout='autoHeight'
              pagination={true}
              paginationPageSize={10}
              />
          </div>
        </Container>
    );
};

export default TrainingList;