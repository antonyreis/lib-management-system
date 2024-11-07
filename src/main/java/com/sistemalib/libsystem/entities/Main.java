package com.sistemalib.libsystem.entities;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    private static List<Cliente> clientesCadastrados = new ArrayList<>();
    private static List<Administrador> administradoresCadastrados = new ArrayList<>();
    private static List<Funcionario> funcionariosCadastrados = new ArrayList<>();
    private static SistemaBiblioteca sistemaBiblioteca = new SistemaBiblioteca(
            new ArrayList<>(), new ArrayList<>(), administradoresCadastrados, funcionariosCadastrados, clientesCadastrados);

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<LivroFisico> livrosFisicos = new ArrayList<>();
        List<LivroDigital> livrosDigitais = new ArrayList<>();
        List<Administrador> administradores = new ArrayList<>();
        List<Funcionario> funcionarios = new ArrayList<>();
        List<Cliente> clientes = new ArrayList<>();

        Administrador admin = new Administrador("Ana Silva", "ana@admin.com", "admin123", "123.456.789-00", "Administrador");
        administradoresCadastrados.add(admin);
        Funcionario funcionario = new Funcionario("Carlos Souza", "carlos@biblioteca.com", "func123", "123.987.654-00", "Funcionario", sistemaBiblioteca);
        funcionariosCadastrados.add(funcionario);
        Cliente cliente = new Cliente("Marcos Pereira", "marcos@cliente.com", "senha123", "456.789.123-00", "Cliente", true);
        LivroFisico livroFisico1 = new LivroFisico(123456, "Java Programming", "James Gosling", "Tech Books", 2020, 5, true);
        LivroDigital livroDigital1 = new LivroDigital(789101, "Effective Java", "Joshua Bloch", "Tech Books", 2018, true);
        livrosFisicos.add(livroFisico1);
        livrosDigitais.add(livroDigital1);
        
        sistemaBiblioteca.setLivrosFisicosCadastrados(livrosFisicos);
        sistemaBiblioteca.setLivrosDigitaisCadastrados(livrosDigitais);

        clientesCadastrados.add(cliente);

        boolean running = true;

        while (running) {
            System.out.println("\n=== Sistema de Biblioteca ===");
            System.out.println("1. Cadastrar Cliente");
            System.out.println("2. Fazer Login");
            System.out.println("3. Sair");
            System.out.print("Escolha uma opção: ");
            int escolha = scanner.nextInt();
            scanner.nextLine();

            switch (escolha) {
                case 1:
                    cadastrarCliente(scanner);
                    break;
                case 2:
                    fazerLogin(scanner);
                    break;
                case 3:
                    running = false;
                    System.out.println("Saindo do sistema...");
                    break;
                default:
                    System.out.println("Opção inválida. Tente novamente.");
            }
        }
        scanner.close();
    }

    private static void cadastrarCliente(Scanner scanner) {
        System.out.println("\n=== Cadastro de Cliente ===");
        System.out.print("Nome: ");
        String nome = scanner.nextLine();
        System.out.print("Email: ");
        String email = scanner.nextLine();
        System.out.print("Senha: ");
        String senha = scanner.nextLine();
        System.out.print("CPF: ");
        String cpf = scanner.nextLine();

        Cliente novoCliente = new Cliente(nome, email, senha, cpf, "Cliente", true);
        clientesCadastrados.add(novoCliente);
        System.out.println("Cliente cadastrado com sucesso!");
    }
    
    private static void registrarEmprestimo(Funcionario funcionario, Scanner scanner) {
        System.out.print("Digite o título do livro para registrar empréstimo: ");
        String titulo = scanner.nextLine();
        Livro livro = sistemaBiblioteca.buscarLivroPorTitulo(titulo);
        if (livro != null && livro.isDisponivel()) {
            System.out.print("Digite o nome do cliente: ");
            String nomeCliente = scanner.nextLine();
            Cliente cliente = sistemaBiblioteca.buscarClientePorNome(nomeCliente);
            if (cliente != null) {
                funcionario.registrarEmprestimo(cliente, livro);
            } else {
                System.out.println("Cliente não encontrado.");
            }
        } else {
            System.out.println("Livro não encontrado ou não disponível para empréstimo.");
        }
    }

    private static void registrarDevolucao(Funcionario funcionario, Scanner scanner) {
        System.out.print("Digite o título do livro para registrar devolução: ");
        String titulo = scanner.nextLine();
        Livro livro = sistemaBiblioteca.buscarLivroPorTitulo(titulo);
        if (livro != null && !livro.isDisponivel()) {
            System.out.print("Digite o nome do cliente: ");
            String nomeCliente = scanner.nextLine();
            Cliente cliente = funcionario.buscarClientePorNome(nomeCliente);
            if (cliente != null) {
                funcionario.registrarDevolucao(cliente, livro);
            } else {
                System.out.println("Cliente não encontrado.");
            }
        } else {
            System.out.println("Livro não encontrado ou já está disponível.");
        }
    }

    private static void fazerLogin(Scanner scanner) {
        System.out.println("\n=== Login ===");
        System.out.print("Email: ");
        String email = scanner.nextLine();
        System.out.print("Senha: ");
        String senha = scanner.nextLine();

        Usuario usuarioLogado = verificarCredenciais(email, senha);

        if (usuarioLogado != null) {
            System.out.println("Login bem-sucedido. Bem-vindo(a), " + usuarioLogado.getNome() + "!");
            interagirComSistema(usuarioLogado, scanner);
        } else {
            System.out.println("Credenciais inválidas. Tente novamente.");
        }
    }

    private static Usuario verificarCredenciais(String email, String senha) {
        for (Cliente cliente : clientesCadastrados) {
            if (cliente.getEmail().equals(email) && cliente.getSenha().equals(senha)) {
                return cliente;
            }
        }
        for (Administrador admin : administradoresCadastrados) {
            if (admin.getEmail().equals(email) && admin.getSenha().equals(senha)) {
                return admin;
            }
        }
        for (Funcionario funcionario : funcionariosCadastrados) {
            if (funcionario.getEmail().equals(email) && funcionario.getSenha().equals(senha)) {
                return funcionario;
            }
        }
        return null;
    }

    private static void interagirComSistema(Usuario usuario, Scanner scanner) {
        if (usuario instanceof Cliente) {
            menuCliente((Cliente) usuario, scanner);
        } else if (usuario instanceof Administrador) {
            menuAdministrador((Administrador) usuario, scanner);
        } else if (usuario instanceof Funcionario) {
            menuFuncionario((Funcionario) usuario, scanner);
        }
    }

    private static void menuCliente(Cliente cliente, Scanner scanner) {
        boolean clienteRunning = true;

        while (clienteRunning) {
            System.out.println("\n=== Menu Cliente ===");
            System.out.println("1. Consultar Livros Disponíveis");
            System.out.println("2. Solicitar Empréstimo de Livro");
            System.out.println("3. Solicitar Devolução de Livro");
            System.out.println("4. Sair");
            System.out.print("Escolha uma opção: ");
            int escolha = scanner.nextInt();
            scanner.nextLine();

            switch (escolha) {
                case 1:
                    cliente.consultarLivrosDisponiveis(sistemaBiblioteca);
                    break;
                case 2:
                    solicitarEmprestimo(cliente, scanner);
                    break;
                case 3:
                    solicitarDevolucao(cliente, scanner);
                    break;
                case 4:
                    clienteRunning = false;
                    break;
                default:
                    System.out.println("Opção inválida. Tente novamente.");
            }
        }
    }

    private static void solicitarEmprestimo(Cliente cliente, Scanner scanner) {
        System.out.print("Digite o título do livro para empréstimo: ");
        String titulo = scanner.nextLine();
        Livro livro = sistemaBiblioteca.buscarLivroPorTitulo(titulo);
        if (livro != null) {
            Funcionario funcionario = funcionariosCadastrados.get(0); // Simula um funcionário atendendo
            cliente.solicitarEmprestimo(funcionario, livro);
        } else {
            System.out.println("Livro não encontrado.");
        }
    }

    private static void solicitarDevolucao(Cliente cliente, Scanner scanner) {
        System.out.print("Digite o título do livro para devolução: ");
        String titulo = scanner.nextLine();
        Livro livro = sistemaBiblioteca.buscarLivroPorTitulo(titulo);
        if (livro != null) {
            Funcionario funcionario = funcionariosCadastrados.get(0);
            cliente.solicitarDevolucao(funcionario, livro);
        } else {
            System.out.println("Livro não encontrado.");
        }
    }

    private static void menuAdministrador(Administrador admin, Scanner scanner) {
    }

    private static void menuFuncionario(Funcionario funcionario, Scanner scanner) {
        boolean funcionarioRunning = true;

        while (funcionarioRunning) {
            System.out.println("\n=== Menu Funcionário ===");
            System.out.println("1. Consultar Livros Disponíveis");
            System.out.println("2. Registrar Empréstimo");
            System.out.println("3. Registrar Devolução");
            System.out.println("4. Sair");
            System.out.print("Escolha uma opção: ");
            int escolha = scanner.nextInt();
            scanner.nextLine();

            switch (escolha) {
                case 1:
                    funcionario.consultarLivrosDisponiveis(sistemaBiblioteca);
                    break;
                case 2:
                    registrarEmprestimo(funcionario, scanner);
                    break;
                case 3:
                    registrarDevolucao(funcionario, scanner);
                    break;
                case 4:
                    funcionarioRunning = false;
                    break;
                default:
                    System.out.println("Opção inválida. Tente novamente.");
            }
        }
    }

    private static void cadastrarLivroFisico(Scanner scanner) {
        System.out.println("\n=== Cadastro de Livro Físico ===");
        System.out.print("ISBN: ");
        int isbn = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Título: ");
        String titulo = scanner.nextLine();
        System.out.print("Autor: ");
        String autor = scanner.nextLine();
        System.out.print("Editora: ");
        String editora = scanner.nextLine();
        System.out.print("Ano de Publicação: ");
        int anoPublicacao = scanner.nextInt();
        System.out.print("Quantidade: ");
        int quantidade = scanner.nextInt();
        scanner.nextLine();

        LivroFisico novoLivroFisico = new LivroFisico(isbn, titulo, autor, editora, anoPublicacao, quantidade, true);
        sistemaBiblioteca.getLivrosFisicosCadastrados().add(novoLivroFisico);
        System.out.println("Livro físico cadastrado com sucesso!");
    }

    private static void cadastrarLivroDigital(Scanner scanner) {
        System.out.println("\n=== Cadastro de Livro Digital ===");
        System.out.print("ISBN: ");
        int isbn = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Título: ");
        String titulo = scanner.nextLine();
        System.out.print("Autor: ");
        String autor = scanner.nextLine();
        System.out.print("Editora: ");
        String editora = scanner.nextLine();
        System.out.print("Ano de Publicação: ");
        int anoPublicacao = scanner.nextInt();
        scanner.nextLine();

        LivroDigital novoLivroDigital = new LivroDigital(isbn, titulo, autor, editora, anoPublicacao, true);
        sistemaBiblioteca.getLivrosDigitaisCadastrados().add(novoLivroDigital);
        System.out.println("Livro digital cadastrado com sucesso!");
    }
}
