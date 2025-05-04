import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ICellRendererParams, themeMaterial } from 'ag-grid-community';
import { Button, Typography, Container } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { CustomerData } from '../types';
import { getCustomers } from './apiFuncs';

const CustomerList = () => {

    const [customers, setCustomers] = useState<CustomerData[]>([]);

    const [open, setopen] = useState(false);
    
    // table data
    const [colDefs] = useState<ColDef[]>([  
      {
        headerName: "Actions", flex: 5, sortable: false,
        cellRenderer: (params: ICellRendererParams) =>
          <div>
            <Button 
              size='small'
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(params)}>
            </Button>
            <Button 
            size='small'
            startIcon={<EditIcon />}
            onClick={() => handleDelete(params)}>
          </Button>
          <Button 
            size='small'
            onClick={() => handleDelete(params)}>
            Add training
          </Button>
          </div>
      },
      { field: "firstname", headerName: "First Name", filter: true, flex: 3},
      { field: "lastname", headerName: "Last Name", filter: true, flex: 3},
      { field: "email", headerName: "Email", filter: true, flex: 3},
      { field: "phone", headerName: "Phone", filter: true, flex: 3},
      { field: "streetaddress", headerName: "Address", filter: true, flex: 3},
      { field: "postcode", headerName: "Postcode", filter: true, flex: 2},
      { field: "city", headerName: "City", filter: true, flex: 3},
    ]);
  

    useEffect(() => {
        getCustomers()
        .then(data => setCustomers(data._embedded.customers))
        .catch(err => console.error(err))
    }, [])
  

  
    // Action handlers
  

    const handleDelete = async (params: ICellRendererParams) => {
        const customer = params.data;
        const customerHref = customer._links?.self?.href;
    
        if (!window.confirm(`Are you sure you want to delete ${customer.firstname} ${customer.lastname}?`)) {
            return;
        }
    
      try {
        const response = await fetch(customerHref, {
          method: "DELETE",
        });
    
        if (!response.ok) {
          throw new Error("Failed to delete the customer");
        }
    
        // Remove the deleted customer from the state
        setCustomers((customers) =>
          customers.filter((c) => c._links.self.href !== customerHref)
        );
    
        alert("Customer deleted successfully!");
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Error deleting customer. Please try again.");
      }
    };

    //Returned component

    return (
        <Container maxWidth="xl" style={{ marginTop: "80px"}}>
        <Typography variant="h5" style={{ marginBottom: "20px" }}>
          Customer List
        </Typography>
          <div style={{width: "100%", height: "80%", boxShadow: "0 -1px 8px rgba(0, 0, 0, 0.3)"}}>
            <AgGridReact
              theme={themeMaterial}
              rowSelection="multiple"
              rowData={customers}
              columnDefs={colDefs}
              domLayout='autoHeight'
              pagination={true}
              paginationPageSize={10}
              />
          </div>
        </Container>
    );
};

export default CustomerList;