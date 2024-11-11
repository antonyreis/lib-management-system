import React, { useState, useEffect } from "react";
import {
    Box, Button, TextField, Select, MenuItem, IconButton, Dialog,
    DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Stack
} from "@mui/material";
import PersonAdd from "@mui/icons-material/PersonAdd";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import PageWrapper from "../../structure/PageWrapper";
import * as userws from "../../services/userws";

const style = {
    grid: { bgcolor: "#c6c4c4" },
    select: {
        // marginTop: 1,
        width: "250px",
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#393536',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#393536',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#393536',
        },
        '& .MuiSelect-icon': {
            color: '#393536',
        },
        marginRight: 5,
    },
    tableContainer: { maxWidth: "80%", margin: "20px 0" },
    textfield: {
        // marginTop: 1,
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#393536',
            },
            '&:hover fieldset': {
                borderColor: '#393536',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#393536',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#393536',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#393536',
        },
        '& .Mui-disabled': {
            color: '#393536',
        },
    },
    textfieldDialog: {
        marginTop: "10px",
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#393536',
            },
            '&:hover fieldset': {
                borderColor: '#393536',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#393536',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#393536',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#393536',
        },
        '& .Mui-disabled': {
            color: '#393536',
        },
    },
    selectDialog: {
        // marginTop: 1,
        // width: "250px",
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#393536',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#393536',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#393536',
        },
        '& .MuiSelect-icon': {
            color: '#393536',
        },
        // marginRight: 5,
    },
};
export default function Home() {
    const [users, setUsers] = useState([]);
    const [searchResults, setSearchResults] = useState(users);
    const [userType, setUserType] = useState("");
    const [searchMethod, setSearchMethod] = useState("Nome");
    const [searchValue, setSearchValue] = useState("");
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form, setForm] = useState({ nome: "", email: "", senha: "", cpf: "", cargo: "", status: "" });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userws.getUsuarios();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Erro ao buscar usuários", error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        let filteredUsers = users;

        if (userType) {
            filteredUsers = filteredUsers.filter((user) => user.cargo === userType);
        }

        console.log({ filteredUsers });

        if (searchValue.trim() !== "") {
            if (searchMethod === "ID") {
                filteredUsers = filteredUsers.filter((user) => user.id === parseInt(searchValue));
            } else if (searchMethod === "Nome") {
                filteredUsers = filteredUsers.filter((user) => user.nome.toLowerCase().includes(searchValue.toLowerCase()));
            }
        }

        setSearchResults(filteredUsers);
    }, [userType, searchMethod, searchValue, users]);

    const handleTypeChange = (event) => setUserType(event.target.value);

    const handleSearchMethodChange = (event) => setSearchMethod(event.target.value);

    const handleSearchValueChange = (event) => setSearchValue(event.target.value);

    const handleOpenConfirmDeleteDialog = () => setOpenConfirmDeleteDialog(true);

    const handleOpenAddDialog = () => {
        setForm({ nome: "", email: "", senha: "", cpf: "", cargo: "Cliente" });
        setOpenAddDialog(true);
    };

    const handleOpenEditDialog = (user) => {
        setSelectedUser(user);
        setForm(user);
        setOpenEditDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenAddDialog(false);
        setOpenEditDialog(false);
        setOpenConfirmDeleteDialog(false);
    };

    const handleAddUser = () => {
        const addUser = async () => {
            try {
                if (form.cargo === "Cliente") {
                    form.status = true;
                }
                await userws.addUsuario(form);
                setUsers([...users, form]);
                setSearchResults([...searchResults, form]);

                alert("Usuário adicionado com sucesso!");
            } catch (error) {
                alert("Preencha todos os campos para adicionar o usuário.");
            }
        };
        addUser();
        window.location.reload();
        handleCloseDialog();
    };

    const handleUpdateUser = () => {
        const updateUser = async () => {
            try {
                console.log({ form: form, selectedUser: selectedUser })
                await userws.updateUsuario(selectedUser.id, form);
                const updatedBooks = users.filter((b) => b.id === selectedUser.id ? form : b);
                setUsers(updatedBooks);
                setSearchResults(updatedBooks);

                alert("Usuário atualizado com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar usuário", error);
            }
        };
        updateUser();
        window.location.reload();
        handleCloseDialog();
    };

    const handleDeleteUser = () => {
        const deleteUser = async () => {
            try {
                await userws.delUsuario(selectedUser.id);
                const updatedBooks = users.filter((b) => b.ID !== selectedUser.ID);
                setUsers(updatedBooks);
                setSearchResults(updatedBooks);

                alert("Usuário excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao deletar usuário", error);
            }
        };
        deleteUser();
        window.location.reload();
        handleCloseDialog();
    };


    return (
        <PageWrapper>
            {({ width, height }) => (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width={width}
                    height={height}
                    sx={style.grid}
                    p={4}
                >
                    {/* Filtro de Tipo de Usuário */}
                    <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                        <FormControl fullWidth>
                            <InputLabel shrink sx={{
                                color: '#393536',
                                '&.Mui-focused': { color: '#393536' },
                            }}>Método</InputLabel>
                            <Select
                                label="Método"
                                defaultValue="Nome"
                                value={searchMethod}
                                onChange={handleSearchMethodChange}
                                sx={style.select}
                                displayEmpty
                            >
                                <MenuItem value="ID">ID</MenuItem>
                                <MenuItem value="Nome">Nome</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            sx={style.textfield}
                            value={searchValue}
                            onChange={handleSearchValueChange}
                            label="Buscar"
                            fullWidth
                            variant="outlined"
                        />
                        <FormControl fullWidth sx={{ ml: 2 }}>
                            <InputLabel shrink
                                sx={{
                                    color: '#393536',
                                    '&.Mui-focused': { color: '#393536' },
                                }}> Cargo</InputLabel>
                            <Select
                                label="Cargo"
                                defaultValue="Cliente"
                                value={userType}
                                onChange={handleTypeChange}
                                displayEmpty
                                sx={style.select}
                            >
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="Cliente">Cliente</MenuItem>
                                <MenuItem value="Funcionario">Funcionario</MenuItem>
                                <MenuItem value="Administrador">Administrador</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Tabela de Usuários */}
                    <TableContainer component={Paper} sx={style.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Senha</TableCell>
                                    <TableCell>CPF</TableCell>
                                    <TableCell>Cargo</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.nome}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.senha ? `${user.senha.slice(0, 2)}••••` : ""}</TableCell>
                                        <TableCell>{user.cpf}</TableCell>
                                        <TableCell>{user.cargo}</TableCell>
                                        <TableCell>{user.status ? "Ativo" : ""}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleOpenEditDialog(user)}>
                                                <MoreHoriz />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        width="80%"
                    >
                        <IconButton onClick={handleOpenAddDialog}><PersonAdd /></IconButton>
                    </Box>

                    {/* Diálogo de Adição */}
                    <Dialog open={openAddDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Adicionar Usuário</DialogTitle>
                        <DialogContent>
                            {/* <Stack spacing={2}> */}
                                <TextField sx={style.textfieldDialog} label="Nome" fullWidth value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                                <TextField sx={style.textfieldDialog} label="Email" fullWidth value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                <TextField sx={style.textfieldDialog} label="Senha" fullWidth value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} />
                                <TextField sx={style.textfieldDialog} label="CPF" fullWidth value={form.cpf} onChange={(e) => setForm({ ...form, cpf: e.target.value })} />
                                <FormControl fullWidth sx={{ marginTop: "10px" }}>
                                    <InputLabel shrink
                                    sx={{
                                        color: '#393536',
                                        '&.Mui-focused': { color: '#393536' },
                                    }}>Cargo</InputLabel>
                                    <Select
                                        sx={style.selectDialog}
                                        value={form.cargo}
                                        onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                                        label="Cargo"  // Associando o label ao Select
                                    >
                                        <MenuItem value="Cliente">Cliente</MenuItem>
                                        <MenuItem value="Funcionario">Funcionario</MenuItem>
                                        <MenuItem value="Administrador">Administrador</MenuItem>
                                    </Select>
                                </FormControl>
                            {/* </Stack> */}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Voltar</Button>
                            <Button onClick={handleAddUser}>Adicionar</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Diálogo de Edição */}
                    <Dialog open={openEditDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Editar Usuário</DialogTitle>
                        <DialogContent>
                        <TextField sx={style.textfieldDialog} label="Nome" fullWidth value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                                <TextField sx={style.textfieldDialog} label="Email" fullWidth value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                <TextField sx={style.textfieldDialog} label="Senha" fullWidth value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} />
                                <TextField sx={style.textfieldDialog} label="CPF" fullWidth value={form.cpf} onChange={(e) => setForm({ ...form, cpf: e.target.value })} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Voltar</Button>
                            <Button onClick={handleUpdateUser}>Atualizar</Button>
                            <Button onClick={handleOpenConfirmDeleteDialog}>Deletar</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Diálogo de Confirmação de Exclusão */}
                    <Dialog open={openConfirmDeleteDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogContent>Tem certeza de que deseja excluir este Usuário?</DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Voltar</Button>
                            <Button onClick={handleDeleteUser}>Confirmar</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            )}
        </PageWrapper>
    );
}