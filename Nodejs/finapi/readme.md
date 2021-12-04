# FinAPI - Trabalhando com finanças

Esta aplicação foi desenvolvida durante o curso de NodeJS ministrado pela Rocketseat no bootcamp Ignite.

### Get Started

Com a aplicação clonada, execute o comando `yarn` a partir da raiz do projeto. Esse comando irá instalar todas as dependencias necessarias.
Após isso, para executar o projeto, digite o comando `yarn dev`.

Abaixo são listados os requisitos e as regras de negocio levantadas para o desenvolvimento desta aplicação. Em cada requisito temos tambem o endpoint associado àquela ação:


### Requisitos

- [x] Deve ser possível criar uma conta.  `/account`
- [x] Deve ser possível buscar o extrato bancário do cliente. `/statement`
- [x] Deve ser possível realizar um depósito. `/deposit`
- [x] Deve ser possível realizar um saque.`/withdraw`
- [x] Deve ser possível buscar o extrato bancário do cliente por data.`/statement/date`.
- [x] Deve ser possível atualizar dados da conta do cliente. `put /account` 
- [x] Deve ser possível obter dados da conta do cliente. `get /account`
- [x] Deve ser possível deletar uma conta. `delete /account`
- [x] Deve ser possível retornar o balanço. `/balance`

---

### Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já exístente
- [x] Não deve ser possível buscar extrato em uma conta não exístente
- [x] Não deve ser possível fazer depósito em uma conta não exístente
- [x] Não deve ser possível fazer saque em uma conta não exístente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Não deve ser possível excluir uma conta não exístente