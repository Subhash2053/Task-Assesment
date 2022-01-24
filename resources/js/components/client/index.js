import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import {
    AppBar,
    Breadcrumbs,
    Button,
    Card,
    
    Dialog,
    
    Divider,
    
    IconButton,
    
    Link,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from "react-router-dom";


const columns = [
    { field: "id", headerName: "ID"},
    { field: "name", headerName: "Name" },
    { field: "gender", headerName: "Gender" },
    {
        field: "phone",
        headerName: "Phone",
        type: "number",
        
    },
    { field: "email", headerName: "Email" },
    { field: "address", headerName: "Address" },
    { field: "nationality", headerName: "nationality" },
    { field: "dob", headerName: "Date of birth" },
    { field: "education", headerName: "Education background" },
    { field: "mode_of_contact", headerName: "Preferred mode of contact" },
];


export default function Client() {
    const [clientsData, setClientsData] = useState([]);
    const [detailData, setDetailData] = useState({});
    const [open, setOpen] = React.useState(false);

    

    useEffect(() => {
        fetch("/api/client", {
            method: "get",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((r) =>
                r.json().then((data) => (

                  setClientsData(data.data)
                
                 ))
            )
            

        // setClientsData(response.data)

        // eslint-disable-next-line
    }, []);

    const handleColClick=(colData, cellMeta) => {
        setOpen(true);
        setDetailData(colData.row || {});
        
    }
    
    
      const handleClose = () => {
        setOpen(false);
        setDetailData({});
      };

    return (
        <div className="app-card">
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    to="/"
                    component={RouterLink}
                >
                    Home
                </Link>

                <Typography color="text.primary">Client </Typography>
            </Breadcrumbs>
            <Card className="card-body">
                <Button
                    color="success"
                    variant="outlined"
                    to="/client/create"
                    component={RouterLink}
                >
                    Create Client
                </Button>

                <DataGrid
                    style={{ height: 400, margin: "20px 0",width: '100%' }}
                    rows={clientsData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onCellClick={handleColClick}
                />
            </Card>


            <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Detail View
            </Typography>
            
          </Toolbar>
        </AppBar>
        <List>
        {Object.entries(detailData || {}).map(([prop, value]) => {
                        return (
                            <div  key={prop}>
                            <ListItem>
                                <ListItemText
                                    primary={prop}
                                    secondary={value}
                                />
                            </ListItem>
                            <Divider />
                        </div>
                
                        );
                    })}
        
          
        </List>
      </Dialog>
        </div>
    );
}
