import React, { useState, useEffect } from "react";
import {
  solicitarEmprestimo,
  registrarEmprestimo,
  devolverLivro,
  listarEmprestimos,
  listarEmprestimosPorCliente,
} from "../../services/loanws";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { BookmarkAdd, MoreHoriz } from "@mui/icons-material";
import PageWrapper from "../../structure/PageWrapper"; // Supondo que você tenha esse componente

const LoanPage = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [searchMethod, setSearchMethod] = useState("id");
  const [searchValue, setSearchValue] = useState("");
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [selectedFuncionarioId, setSelectedFuncionarioId] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [form, setForm] = useState({
    livroId: "",
    clienteId: "",
    funcionarioId: "",
  });

  useEffect(() => {
    listarEmprestimos();
  }, []);

  const handleSearchMethodChange = (event) => setSearchMethod(event.target.value);
  const handleSearchValueChange = (event) => setSearchValue(event.target.value);

  const handleSolicitarEmprestimo = async () => {
    const loanData = {
      livroId: selectedBookId,
      clienteId: selectedClientId,
    };

    try {
      const result = await solicitarEmprestimo(loanData);
      alert(result);  // Exibe a mensagem de sucesso
      listarEmprestimos(); // Atualiza a lista de empréstimos
    } catch (error) {
      alert("Erro ao solicitar empréstimo.");
    }
  };

  const handleRegistrarEmprestimo = async () => {
    const loanData = {
      emprestimoId: selectedLoanId,
      funcionarioId: selectedFuncionarioId,
    };

    try {
      const result = await registrarEmprestimo(loanData);
      alert(result);  // Exibe a mensagem de sucesso
      listarEmprestimos(); // Atualiza a lista de empréstimos
    } catch (error) {
      alert("Erro ao registrar empréstimo.");
    }
  };

  const handleDevolverLivro = async (emprestimoId) => {
    try {
      const result = await devolverLivro(emprestimoId);
      alert(result);  // Exibe a mensagem de sucesso
      listarEmprestimos(); // Atualiza a lista de empréstimos
    } catch (error) {
      alert("Erro ao devolver livro.");
    }
  };

  const handleListarEmprestimos = async () => {
    try {
      const result = await listarEmprestimos();
      setEmprestimos(result);  // Atualiza o estado com a lista de empréstimos
    } catch (error) {
      alert("Erro ao listar empréstimos.");
    }
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
          sx={{ padding: 4, bgcolor: "#c6c4c4" }}
        >
          <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
            {/* Filtro de Método de Busca */}
            <FormControl fullWidth sx={{ marginRight: 2 }}>
              <InputLabel shrink sx={{ color: '#393536' }}>Método</InputLabel>
              <Select
                label="Método"
                value={searchMethod}
                onChange={handleSearchMethodChange}
                sx={{ width: 200 }}
              >
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="cliente">Cliente</MenuItem>
                <MenuItem value="livro">Livro</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ width: 300 }}
              value={searchValue}
              onChange={handleSearchValueChange}
              label="Buscar"
              fullWidth
              variant="outlined"
            />
          </Box>

          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Livro</TableCell>
                  <TableCell>Data Empréstimo</TableCell>
                  <TableCell>Data Devolução</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emprestimos.map((emprestimo, index) => (
                  <TableRow key={index}>
                    <TableCell>{emprestimo.cliente.nome}</TableCell>
                    <TableCell>{emprestimo.livro.titulo}</TableCell>
                    <TableCell>{emprestimo.dataEmprestimo}</TableCell>
                    <TableCell>{emprestimo.dataDevolucaoPrevista}</TableCell>
                    <TableCell>{emprestimo.dataDevolucaoReal ? "Devolvido" : "Em aberto"}</TableCell>
                    <TableCell>
                      {emprestimo.dataDevolucaoReal ? (
                        "Devolvido"
                      ) : (
                        <IconButton onClick={() => handleDevolverLivro(emprestimo.id)}>
                          <MoreHoriz />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="flex-end" width="80%">
            <IconButton onClick={() => setOpenAddDialog(true)}>
              <BookmarkAdd />
            </IconButton>
          </Box>

          {/* Diálogo para Solicitar Empréstimo */}
          <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
            <DialogTitle>Solicitar Empréstimo</DialogTitle>
            <DialogContent sx={{ marginTop: '5px', '& > *': { marginTop: '10px' } }}>
              <TextField
                label="ID do Cliente"
                fullWidth
                value={form.clienteId}
                onChange={(e) => setForm({ ...form, clienteId: e.target.value })}
              />
              <TextField
                label="ID do Livro"
                fullWidth
                value={form.livroId}
                onChange={(e) => setForm({ ...form, livroId: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAddDialog(false)}>Cancelar</Button>
              <Button onClick={handleSolicitarEmprestimo}>Solicitar</Button>
            </DialogActions>
          </Dialog>

          {/* Diálogo de Confirmação de Exclusão */}
          <Dialog open={openConfirmDeleteDialog} onClose={() => setOpenConfirmDeleteDialog(false)}>
            <DialogTitle>Confirmar Devolução</DialogTitle>
            <DialogContent>Tem certeza que deseja devolver este livro?</DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenConfirmDeleteDialog(false)}>Voltar</Button>
              <Button onClick={handleDevolverLivro}>Confirmar</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </PageWrapper>
  );
};

export default LoanPage;
