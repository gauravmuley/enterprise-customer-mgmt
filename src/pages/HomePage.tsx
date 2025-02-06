import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

import HomeIcon from "@mui/icons-material/Home";
import TranslateIcon from "@mui/icons-material/Translate";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Switch,
  Menu,
  MenuItem,
  IconButton,
  Checkbox,
  FormControlLabel,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
} from "@mui/material";
import {
  Edit,
  Delete,
  FilterList,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Headerbar from "../components/Headerbar";

import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const HomePage: React.FC = () => {
  const { t: translate, i18n } = useTranslation();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    department: true,
    localNr: true,
    landline: true,
    mobile: true,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    localNr: "",
    landline: "",
    mobile: "",

    language: "",
    email: "",
    address: "",
  });
  const [editEmployee, setEditEmployee] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const sanitize = (html: string) => ({ __html: DOMPurify.sanitize(html) });
  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleSort = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setEmployees(
      [...employees].sort((a, b) => {
        if (sortDirection === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      })
    );
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns({ ...visibleColumns, [column]: !visibleColumns[column] });
  };

  const handleOpenDialog = (employee = null) => {
    setEditEmployee(employee);
    if (employee) {
      setNewEmployee(employee);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewEmployee({
      name: "",
      department: "",
      localNr: "",
      landline: "",
      mobile: "",

      language: "",
      email: "",
      address: "",
    });
    setEditEmployee(null);
  };

  const handleCreateOrEditUser = () => {
    if (newEmployee.name.trim() === "") {
      alert(translate("name") + " is required.");
      return;
    }
    // Sanitize newEmployee data
    const sanitizedNewEmployee = {
      name: sanitize(newEmployee.name).__html,
      department: sanitize(newEmployee.department).__html,
      localNr: sanitize(newEmployee.localNr).__html,
      landline: sanitize(newEmployee.landline).__html,
      mobile: sanitize(newEmployee.mobile).__html,
      email: sanitize(newEmployee.email).__html,
      address: sanitize(newEmployee.address).__html,
      language: sanitize(newEmployee.language).__html,
    };
    // Sanitize editEmployee data if it exists
    const sanitizedEditEmployee = editEmployee
      ? {
          id: editEmployee.id,
          name: sanitize(newEmployee.name).__html,
          department: sanitize(newEmployee.department).__html,
          localNr: sanitize(newEmployee.localNr).__html,
          landline: sanitize(newEmployee.landline).__html,
          mobile: sanitize(newEmployee.mobile).__html,
          email: sanitize(newEmployee.email).__html,
          address: sanitize(newEmployee.address).__html,
          language: sanitize(newEmployee.language).__html,
        }
      : null;

    if (editEmployee) {
      fetch(`http://localhost:5000/employees/${editEmployee.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedEditEmployee),
      })
        .then((response) => response.json())
        .then((data) => {
          setEmployees(
            employees.map((emp) => (emp.id === data.id ? data : emp))
          );
          handleCloseDialog();
        })
        .catch((error) => console.error("Error updating employee:", error));
    } else {
      fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedEditEmployee),
      })
        .then((response) => response.json())
        .then((data) => {
          setEmployees([...employees, data]);
          handleCloseDialog();
        })
        .catch((error) => console.error("Error creating employee:", error));
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredEmployeeCount = filteredEmployees.length;

  const availableColumnCount =
    Object.values(visibleColumns).filter(Boolean).length;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleChangeItemsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleDeleteUser = (id: number) => {
    fetch(`http://localhost:5000/employees/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setEmployees(employees.filter((emp) => emp.id !== id));
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div style={{ display: "flex", height: "auto", flexDirection: "column" }}>
      <div style={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        <Sidebar active="User Overview" />

        <div style={{ flexGrow: 1, padding: "20px", overflowY: "auto" }}>
          <Headerbar />
          <Topbar />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={i18n.language === "da"}
                    onChange={() =>
                      changeLanguage(i18n.language === "en" ? "da" : "en")
                    }
                  />
                }
                label={translate("multiChange")}
                // control={<Switch checked={language === "da"} onChange={() => setLanguage(language === "en" ? "da" : "en")} />}
                // label={language === "en" ? "Multi-Changes" : "Multi-Changes"}
              />
              <TextField
                variant="outlined"
                placeholder={translate("searchPlaceholder")}
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "250px" }}
              />
              <Typography variant="body2" style={{ marginLeft: "8px" }}>
                {translate("matchingRows")}: {filteredEmployeeCount} /{" "}
                {employees.length}
              </Typography>
              <IconButton onClick={handleMenuOpen}>
                <FilterList />
              </IconButton>
              <Typography variant="body2" style={{ marginLeft: "8px" }}>
                {translate("availableColumns")}: {availableColumnCount}
              </Typography>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {Object.keys(visibleColumns).map((column) => (
                  <MenuItem
                    key={column}
                    onClick={() => toggleColumnVisibility(column)}
                  >
                    <FormControlLabel
                      control={<Checkbox checked={visibleColumns[column]} />}
                      label={
                        translate[column] ||
                        column.charAt(0).toUpperCase() + column.slice(1)
                      }
                    />
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "40px" }}
              onClick={() => handleOpenDialog()}
            >
              {translate("createUser")}
            </Button>
          </div>

          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead style={{ background: "#f4f4f4" }}>
                <TableRow>
                  {visibleColumns.name && (
                    <TableCell>
                      {translate("name")}
                      <IconButton onClick={handleSort}>
                        {sortDirection === "asc" ? (
                          <ArrowUpward fontSize="small" />
                        ) : (
                          <ArrowDownward fontSize="small" />
                        )}
                      </IconButton>
                    </TableCell>
                  )}
                  {visibleColumns.department && (
                    <TableCell>{translate("department")}</TableCell>
                  )}
                  {visibleColumns.localNr && (
                    <TableCell>{translate("localNr")}</TableCell>
                  )}
                  {visibleColumns.landline && (
                    <TableCell>{translate("landline")}</TableCell>
                  )}
                  {visibleColumns.mobile && (
                    <TableCell>{translate("mobile")}</TableCell>
                  )}
                  <TableCell>{translate("actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedEmployees
                  .filter((emp) =>
                    emp.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((employee) => (
                    <TableRow key={employee.id}>
                      {visibleColumns.name && (
                        <TableCell>{employee.name}</TableCell>
                      )}
                      {visibleColumns.department && (
                        <TableCell>{employee.department}</TableCell>
                      )}
                      {visibleColumns.localNr && (
                        <TableCell>{employee.localNr}</TableCell>
                      )}
                      {visibleColumns.landline && (
                        <TableCell>{employee.landline}</TableCell>
                      )}
                      {visibleColumns.mobile && (
                        <TableCell>{employee.mobile}</TableCell>
                      )}
                      <TableCell>
                        <Button
                          size="small"
                          onClick={() => handleOpenDialog(employee)}
                        >
                          <Edit fontSize="small" />
                        </Button>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => handleDeleteUser(employee.id)}
                        >
                          <Delete fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination
              count={Math.ceil(filteredEmployeeCount / itemsPerPage)} //
              page={currentPage}
              onChange={handleChangePage}
              showFirstButton
              showLastButton
            />
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2">{translate("Page")}</Typography>
            <TextField
              select
              value={itemsPerPage}
              onChange={handleChangeItemsPerPage}
              variant="outlined"
              size="small"
              sx={{ marginLeft: "10px" }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </TextField>
          </div>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            PaperProps={{
              sx: {
                position: "fixed",
                right: 0,
                width: "350px",
                height: "100%",
                overflow: "hidden",
              },
            }}
            BackdropProps={{
              sx: {
                backdropFilter: "blur(3px)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {editEmployee
                ? translate("editUser")
                : translate("createNewUser")}
              <IconButton onClick={handleCloseDialog} sx={{ ml: 2 }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ paddingTop: 2, paddingBottom: 2 }}>
              {" "}
              {/* Added padding */}
              <TextField
                fullWidth
                label={translate("name")}
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
                margin="normal"
                InputProps={{
                  startAdornment: <PersonIcon />, // Icon in front
                }}
              />
              <TextField
                fullWidth
                label={translate("department")}
                value={newEmployee.department}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, department: e.target.value })
                }
                margin="normal"
                InputProps={{
                  startAdornment: <BusinessIcon />,
                }}
              />
              <TextField
                fullWidth
                label={translate("localNr")}
                value={newEmployee.localNr}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, localNr: e.target.value })
                }
                margin="normal"
                InputProps={{
                  startAdornment: <LocalPhoneIcon />,
                }}
              />
              <TextField
                fullWidth
                label={translate("landline")}
                value={newEmployee.landline}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, landline: e.target.value })
                }
                margin="normal"
                InputProps={{
                  startAdornment: <PhoneIcon />,
                }}
              />
              <TextField
                fullWidth
                label={translate("mobile")}
                value={newEmployee.mobile}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, mobile: e.target.value })
                }
                margin="normal"
                InputProps={{
                  startAdornment: <SmartphoneIcon />,
                }}
              />
              <TextField
                fullWidth
                label={translate("email")}
                value={newEmployee.email}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, email: e.target.value })
                }
                margin="normal"
                InputProps={{
                  startAdornment: <EmailIcon />,
                }}
              />
              <TextField
                fullWidth
                label={translate("address")}
                value={newEmployee.address}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, address: e.target.value })
                }
                margin="normal"
                InputProps={{
                  startAdornment: <HomeIcon />,
                }}
              />
              <TextField
                fullWidth
                label={translate("language")}
                value={newEmployee.language}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, language: e.target.value })
                }
                margin="normal"
                InputProps={{
                  startAdornment: <TranslateIcon />,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>{translate("cancel")}</Button>
              <Button variant="contained" onClick={handleCreateOrEditUser}>
                {editEmployee ? translate("update") : translate("create")}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
