import React, { useState, useEffect } from "react";
import {
    Box, Button, TextField, Select, MenuItem, IconButton, Dialog,
    DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import BookmarkAdd from "@mui/icons-material/BookmarkAdd";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import PageWrapper from "../../structure/PageWrapper";

const booksList = [
    { titulo: "Dom Quixote", autor: "Miguel de Cervantes", editora: "Planeta", anoPublicacao: 1605, ISBN: "1234567890", tipo: "fisico" },
    { titulo: "1984", autor: "George Orwell", editora: "Companhia das Letras", anoPublicacao: 1949, ISBN: "2345678901", tipo: "ebook" },
    { titulo: "O Hobbit", autor: "J.R.R. Tolkien", editora: "HarperCollins", anoPublicacao: 1937, ISBN: "3456789012", tipo: "fisico" },
];
const style = {
    grid: { bgcolor: "#c6c4c4" },
    select: { marginRight: 2, width: "200px", ml: 2 },
    tableContainer: { maxWidth: "80%", margin: "20px 0" },
};
export default function Home() {
    const [books, setBooks] = useState(booksList);
    const [searchResults, setSearchResults] = useState(books);
    const [bookType, setBookType] = useState("fisico");
    const [searchMethod, setSearchMethod] = useState("id");
    const [searchValue, setSearchValue] = useState("");
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [form, setForm] = useState({ titulo: "", autor: "", editora: "", anoPublicacao: "", ISBN: "", tipo: "" });

    useEffect(() => {
        let filteredBooks = books;

        // Filtrando por tipo de livro
        if (bookType) {
            filteredBooks = filteredBooks.filter((book) => book.tipo === bookType);
        }

        // Filtrando pelo método de busca (ID ou título)
        if (searchValue.trim() !== "") {
            if (searchMethod === "id") {
                filteredBooks = filteredBooks.filter((book) => book.ISBN.includes(searchValue));
            } else if (searchMethod === "titulo") {
                filteredBooks = filteredBooks.filter((book) => book.titulo.toLowerCase().includes(searchValue.toLowerCase()));
            }
        }

        setSearchResults(filteredBooks);
    }, [bookType, searchMethod, searchValue, books]);

    const handleTypeChange = (event) => setBookType(event.target.value);
    // Novo método para alterar o método de busca (ID ou Título)
    const handleSearchMethodChange = (event) => setSearchMethod(event.target.value);

    // Novo método para atualizar o valor da busca
    const handleSearchValueChange = (event) => setSearchValue(event.target.value);

    // Abrir diálogo de adição de livro
    const handleOpenAddDialog = () => {
        setForm({ titulo: "", autor: "", editora: "", anoPublicacao: "", ISBN: "", tipo: "" });
        setOpenAddDialog(true);
    };

    // Fechar diálogos
    const handleCloseDialog = () => {
        setOpenAddDialog(false);
        setOpenEditDialog(false);
        setOpenConfirmDeleteDialog(false);
    };

    // Adicionar um livro novo
    const handleAddBook = () => {
        if (Object.values(form).every((field) => field.trim() !== "")) {
            setBooks([...books, form]);
            setSearchResults([...searchResults, form]);
            alert("Livro adicionado com sucesso!");
            handleCloseDialog();
        } else {
            alert("Preencha todos os campos para adicionar o livro.");
        }
    };

    // Abrir diálogo de edição com as informações do livro selecionado
    const handleOpenEditDialog = (book) => {
        setSelectedBook(book);
        setForm(book);
        setOpenEditDialog(true);
    };

    // Atualizar o livro existente
    const handleUpdateBook = () => {
        const updatedBooks = books.map((b) => (b.ISBN === selectedBook.ISBN ? form : b));
        setBooks(updatedBooks);
        setSearchResults(updatedBooks);
        alert("Livro atualizado com sucesso!");
        handleCloseDialog();
    };

    // Abrir diálogo de confirmação para exclusão de livro
    const handleOpenConfirmDeleteDialog = () => setOpenConfirmDeleteDialog(true);

    // Confirmar exclusão do livro
    const handleDeleteBook = () => {
        const updatedBooks = books.filter((b) => b.ISBN !== selectedBook.ISBN);
        setBooks(updatedBooks);
        setSearchResults(updatedBooks);
        alert("Livro excluído com sucesso!");
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
                    {/* Filtro de Tipo de Livro */}
                    <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                        <Select
                            value={searchMethod}
                            onChange={handleSearchMethodChange}
                            sx={style.select}
                            displayEmpty
                        >
                            <MenuItem value="id">ID</MenuItem>
                            <MenuItem value="titulo">Título</MenuItem>
                        </Select>
                        <TextField
                            // sx={{ ml: 2 }}
                            value={searchValue}
                            onChange={handleSearchValueChange}
                            label="Buscar"
                            fullWidth
                            variant="outlined"
                        />
                        <Select
                            defaultValue="fisico"
                            value={bookType}
                            onChange={handleTypeChange}
                            displayEmpty
                            sx={style.select}
                        >
                            {/* <MenuItem value="">Todos</MenuItem> */}
                            <MenuItem value="fisico">Físico</MenuItem>
                            <MenuItem value="ebook">Digital</MenuItem>
                        </Select>
                    </Box>

                    {/* Filtro de Método de Busca (ID/Título) */}
                    {/* <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                        <Select
                            value={searchMethod}
                            onChange={handleSearchMethodChange}
                            sx={style.select}
                            displayEmpty
                        >
                            <MenuItem value="id">ID</MenuItem>
                            <MenuItem value="titulo">Título</MenuItem>
                        </Select>
                        <TextField
                            sx={{ ml: 2 }}
                            value={searchValue}
                            onChange={handleSearchValueChange}
                            label="Buscar"
                            fullWidth
                            variant="outlined"
                        />
                    </Box> */}

                    {/* Tabela de Livros */}
                    <TableContainer component={Paper} sx={style.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Título</TableCell>
                                    <TableCell>Autor</TableCell>
                                    <TableCell>Editora</TableCell>
                                    <TableCell>Ano de Publicação</TableCell>
                                    <TableCell>ISBN</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Disponível</TableCell>
                                    {bookType === "fisico" && <TableCell>Quantidade</TableCell>}
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.map((book, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{book.titulo}</TableCell>
                                        <TableCell>{book.autor}</TableCell>
                                        <TableCell>{book.editora}</TableCell>
                                        <TableCell>{book.anoPublicacao}</TableCell>
                                        <TableCell>{book.ISBN}</TableCell>
                                        <TableCell>{book.tipo}</TableCell>
                                        <TableCell>{book.disponivel ? "Sim" : "Não"}</TableCell>
                                        {book.tipo === "fisico" && <TableCell>{book.quantidade}</TableCell>}
                                        <TableCell>
                                            <IconButton onClick={() => handleOpenEditDialog(book)}>
                                                <MoreHoriz />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Botão de Adição */}
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        width="80%"
                    // margin="20px 0"
                    >
                        <IconButton onClick={handleOpenAddDialog}><BookmarkAdd /></IconButton>
                    </Box>

                    {/* Diálogo de Adição */}
                    <Dialog open={openAddDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Adicionar Livro</DialogTitle>
                        <DialogContent sx={{ marginTop: '5px', '& > *': { marginTop: '10px' } }}>
                            <TextField label="Título" fullWidth value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
                            <TextField label="Autor" fullWidth value={form.autor} onChange={(e) => setForm({ ...form, autor: e.target.value })} />
                            <TextField label="Editora" fullWidth value={form.editora} onChange={(e) => setForm({ ...form, editora: e.target.value })} />
                            <TextField label="Ano de Publicação" fullWidth value={form.anoPublicacao} onChange={(e) => setForm({ ...form, anoPublicacao: e.target.value })} />
                            <TextField label="ISBN" fullWidth value={form.ISBN} onChange={(e) => setForm({ ...form, ISBN: e.target.value })} />
                            <Select fullWidth value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                                <MenuItem value="fisico">Físico</MenuItem>
                                <MenuItem value="ebook">Digital</MenuItem>
                            </Select>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Voltar</Button>
                            <Button onClick={handleAddBook}>Adicionar</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Diálogo de Edição */}
                    <Dialog open={openEditDialog} onClose={handleCloseDialog}>
                        <DialogTitle sx={{ margin: '5px' }}>Editar Livro</DialogTitle>
                        <DialogContent sx={{ marginTop: '5px', '& > *': { marginTop: '10px' } }}>
                            <TextField label="Título" fullWidth value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
                            <TextField label="Autor" fullWidth value={form.autor} onChange={(e) => setForm({ ...form, autor: e.target.value })} />
                            <TextField label="Editora" fullWidth value={form.editora} onChange={(e) => setForm({ ...form, editora: e.target.value })} />
                            <TextField label="Ano de Publicação" fullWidth value={form.anoPublicacao} onChange={(e) => setForm({ ...form, anoPublicacao: e.target.value })} />
                            <TextField label="ISBN" fullWidth value={form.ISBN} onChange={(e) => setForm({ ...form, ISBN: e.target.value })} />
                            <Select fullWidth value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                                <MenuItem value="fisico">Físico</MenuItem>
                                <MenuItem value="ebook">Digital</MenuItem>
                            </Select>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Voltar</Button>
                            <Button onClick={handleUpdateBook}>Atualizar</Button>
                            <Button onClick={handleOpenConfirmDeleteDialog}>Deletar</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Diálogo de Confirmação de Exclusão */}
                    <Dialog open={openConfirmDeleteDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogContent>Tem certeza de que deseja excluir este livro?</DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Voltar</Button>
                            <Button onClick={handleDeleteBook}>Confirmar</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            )}
        </PageWrapper>
    );
}
