import React, { useState, useEffect } from "react";
import * as loanws from "../../services/loanws";
import {
  Box,
  Button,
  TextField,
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

const style = {
  grid: { bgcolor: "#c6c4c4" },
  select: {
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
      // marginLeft: 3
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
  },
};

const LoanPage = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);  // Estado para armazenar o empréstimo selecionado
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); // Estado para controlar o diálogo de detalhes
  const [form, setForm] = useState({
    livroId: "",
    clienteId: "",
  });

  const userData = JSON.parse(sessionStorage.getItem("usuario") || {})
  console.log({ userData: userData })

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const fetchedLoans = await loanws.listarEmprestimos();
        setEmprestimos(fetchedLoans);
      } catch (error) {
        console.error("Erro ao buscar empréstimos", error);
      }
    };

    fetchLoans();
  }, []);

  const handleSolicitarEmprestimo = async () => {
    const loanData = {
      livroId: parseInt(form.livroId),
      clienteId: parseInt(form.clienteId),
    };

    try {
      const result = await loanws.solicitarEmprestimo(loanData);
      alert(result);  // Exibe a mensagem de sucesso
      loanws.listarEmprestimos();
      window.location.reload();
    } catch (error) {
      alert("Erro ao solicitar empréstimo.");
    }
  };

  const handleDevolverLivro = async (emprestimoId) => {
    try {
      const result = await loanws.devolverLivro(emprestimoId);
      alert(result);  
      loanws.listarEmprestimos();
      window.location.reload();
    } catch (error) {
      alert("Erro ao devolver livro.");
    }
  };

  const handleRegistrarEmprestimo = async () => {
    console.log({selectedLoan})
    const loanData = {
      emprestimoId: parseInt(selectedLoan.id),
      funcionarioId: parseInt(userData.id)
    };

    try {
      const result = await loanws.registrarEmprestimo(loanData);
      alert(result);  // Exibe a mensagem de sucesso
      loanws.listarEmprestimos(); // Atualiza a lista de empréstimos
      window.location.reload();
      setOpenDetailsDialog(false); // Fecha o diálogo

    } catch (error) {
      window.location.reload();
      alert("Erro ao registrar empréstimo.");
    }
  };

  const handleOpenDetailsDialog = (emprestimo) => {  // Renomeado para evitar conflito
    setSelectedLoan(emprestimo); // Setando o empréstimo selecionado
    setOpenDetailsDialog(true);  // Abrindo o diálogo de detalhes
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
          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Livro</TableCell>
                  <TableCell>Data Empréstimo</TableCell>
                  <TableCell>Data Devolução</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Registrado</TableCell>
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
                    <TableCell>{emprestimo.funcionario ? "Registrado" : "Não registrado"}</TableCell>
                    <TableCell>{emprestimo.dataDevolucaoReal ? "Devolvido" : "Em aberto"}</TableCell>
                    <TableCell>
                      {emprestimo.dataDevolucaoReal ? (
                        "Devolvido"
                      ) : (
                        <IconButton onClick={() => handleOpenDetailsDialog(emprestimo)}>
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

          {/* Diálogo de Detalhes do Empréstimo */}
          <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)}>
            <DialogTitle>Detalhes do Empréstimo</DialogTitle>
            <DialogContent>
              {selectedLoan && (
                <>
                  <TextField
                    label="Cliente"
                    value={selectedLoan.cliente.nome}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Livro"
                    value={selectedLoan.livro.titulo}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Data Empréstimo"
                    value={selectedLoan.dataEmprestimo}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Data Devolução Prevista"
                    value={selectedLoan.dataDevolucaoPrevista}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDetailsDialog(false)}>Voltar</Button>
              <Button onClick={handleRegistrarEmprestimo}>Registrar</Button>
              <Button onClick={() => handleDevolverLivro(selectedLoan.id)}>Devolver</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </PageWrapper>
  );
};

export default LoanPage;
