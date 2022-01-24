import {
    Breadcrumbs,
    Button,
    Card,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    Link,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import React, { useEffect, useState } from "react";

import { Link as RouterLink } from "react-router-dom";

import { DatePicker } from "@mui/lab";

export default function ClientForm(props) {
    const [fdata, setData] = useState({
        newData: {
            id: 0,
            name: "",
            gender: "",
            phone: "",
            email: "",
            nationality: "",
            address: "",
            education: "",
            dob: "",
            mode_of_contact: "",
        },
    });
    const [formErrors, setFormErrors] = useState({});

    

    const clearForm = () => {
        setData({
            newData: {
                id: 0,
                name: "",
                gender: "",
                phone: "",
                email: "",
                nationality: "",
                address: "",
                education: "",
                dob: "",
                mode_of_contact: "",
            },
        });
    };

    const handleChange = (event, value = null, name = null) => {
        if (event != null) {
            const target = event.target;
              value = target.value;
              name = target.name;
        }
        let currentFormErrors = formErrors;

        setData({
            newData: Object.assign({}, fdata.newData, {
                [name]: value,
            }),
        });

        switch (name) {
            case "name":
                if (minMaxLength(value, 3)) {
                    currentFormErrors[
                        name
                    ] = `Name should have minimum 3 characters`;
                } else {
                    delete currentFormErrors[name];
                }

                break;

            case "phone":
                if (!value.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)) {
                    currentFormErrors[
                        name
                    ] = `phone number is invalid`;

                } else {
                    delete currentFormErrors[name];
                }

                break;
            case "email":
                if (!value || validEmail(value)) {
                    currentFormErrors[name] = `Email address is invalid`;
                } else {
                    delete currentFormErrors[name];
                }

                break;
        }
        setFormErrors(currentFormErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formdata = new FormData();

        Object.keys(fdata.newData).forEach((key) => {
            if (fdata.newData[key] !== "") {
                formdata.append(key, fdata.newData[key]);
            }
        });
        fetch("/api/client/store", {
            method: "post",
            headers: { 
            "Accept": 'application/json',
            'Access-Control-Allow-Origin':'*',
           },
            body: formdata,
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => {
          if(obj.status == '200'){
            alert(obj.body.message)
            clearForm();
          }else{
            alert(obj.body.message)
          }
        });
    };

    function minMaxLength(text, minLength, maxLength = null) {
        let result = !text || text.length < minLength;
        if (maxLength) result = result || text.length < minLength;
        return result;
    }

    function validEmail(text) {
        const regex = RegExp(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );

        return !regex.test(text);
    }

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
                <Link
                    underline="hover"
                    color="inherit"
                    to="/client"
                    component={RouterLink}
                >
                    Client
                </Link>
                <Typography color="text.primary">
                    Client {props.type}
                </Typography>
            </Breadcrumbs>
            <Card className="card-body">
                <ul>
                    {Object.entries(formErrors || {}).map(([prop, value]) => {
                        return (
                            <li className="error-message" key={prop}>
                                {value}
                            </li>
                        );
                    })}
                </ul>
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            className={
                                formErrors && formErrors.name ? "error" : ""
                            }
                            fullWidth
                            type="text"
                            required
                            margin="normal"
                            variant="outlined"
                            label="Name"
                            name="name"
                            onChange={handleChange}
                            value={fdata.newData.name}
                        />
                    </div>

                    <div>
                        <FormControl>
                            <FormLabel id="gender">Gender</FormLabel>
                            <RadioGroup
                                className={
                                    formErrors && formErrors.gender
                                        ? "error"
                                        : ""
                                }
                                aria-labelledby="Gender"
                                onChange={handleChange}
                                value={fdata.newData.gender}
                                name="gender"
                            >
                                <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Female"
                                />
                                <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    value="other"
                                    control={<Radio />}
                                    label="Other"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        <TextField
                            className={
                                formErrors && formErrors.phone
                                    ? "error"
                                    : ""
                            }
                            fullWidth
                            type="text"
                            required
                            margin="normal"
                            variant="outlined"
                            label="Phone"
                            name="phone"
                            placeholder="+977 98XXXXXXXX"
                            onChange={handleChange}
                            value={fdata.newData.phone}
                        />
                    </div>

                    <div>
                        <TextField
                            fullWidth
                            className={
                                formErrors && formErrors.email
                                    ? "error"
                                    : ""
                            }
                            type="email"
                            required
                            margin="normal"
                            variant="outlined"
                            label="email"
                            name="email"
                            onChange={handleChange}
                            value={fdata.newData.email}
                        />
                    </div>

                    <div>
                        <TextField
                            className={
                                formErrors && formErrors.address
                                    ? "error"
                                    : ""
                            }
                            fullWidth
                            type="text"
                            required
                            margin="normal"
                            variant="outlined"
                            label="Address"
                            name="address"
                            onChange={handleChange}
                            value={fdata.newData.address}
                        />
                    </div>
                    <div>
                        <TextField
                            className={
                                formErrors && formErrors.nationality
                                    ? "error"
                                    : ""
                            }
                            fullWidth
                            type="text"
                            required
                            margin="normal"
                            variant="outlined"
                            label="Nationality"
                            name="nationality"
                            onChange={handleChange}
                            value={fdata.newData.nationality}
                        />
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                className={
                                    formErrors && formErrors.dob
                                        ? "error"
                                        : ""
                                }
                                openTo="year"
                                disableFuture
                                label="Date of birth"
                                value={fdata.newData.dob}
                                onChange={(date) => {
                                    handleChange(null, date, "dob");
                                }}
                                renderInput={(params) => (
                                    <TextField fullWidth {...params} />
                                )}
                            />
                        </LocalizationProvider>
                    </div>

                    <div>
                        <TextField
                            className={
                                formErrors && formErrors.education
                                    ? "error"
                                    : ""
                            }
                            fullWidth
                            type="text"
                            required
                            margin="normal"
                            variant="outlined"
                            label="Education background"
                            name="education"
                            onChange={handleChange}
                            value={fdata.newData.education}
                        />
                    </div>

                    <div>
                        <FormControl fullWidth>
                            <InputLabel>Preferred mode of contact </InputLabel>
                            <Select
                                className={
                                    formErrors && formErrors.mode_of_contact
                                        ? "error"
                                        : ""
                                }
                                labelId="mode_of_contact"
                                name="mode_of_contact"
                                label="Preferred mode of contact"
                                onChange={handleChange}
                                value={fdata.newData.mode_of_contact}
                                required
                            >
                                <MenuItem value="email">Email</MenuItem>
                                <MenuItem value="phone">Phone</MenuItem>
                                <MenuItem value="none">None</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <br />

                    <div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={
                                Object.entries(formErrors || {}).length > 0
                            }
                        >
                            <b>Save</b>
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
