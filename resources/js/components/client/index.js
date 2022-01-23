import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import {
    Breadcrumbs,
    Button,
    Card,
    
    Link,
    Typography,
} from "@mui/material";
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
                />
            </Card>
        </div>
    );
}
