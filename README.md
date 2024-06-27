# RecordaPet

## Sobre o app

O RecordaPet é um aplicativo que auxilia na gestão da alimentação dos animais em sua residência, especialmente quando múltiplas pessoas estão envolvidas no cuidado, assegurando que os animais sejam sempre alimentados pontualmente e permitindo que todos possam acompanhar o controle.

## Funcionalidades

- Cadastro de usuário
- Login
- Cadastro das casas
- Cadastro dos animais
- Visualização de casas
- Visualização de animais na residência
- Cadastro da alimentação
- Visualização das alimentações

## Como rodar o projeto

### Pré-requisitos

- Node.js
- Yarn
- Git

Se você ainda não tem o Node.js e o Yarn instalados, siga o [tutorial de instalação](https://docs.google.com/document/d/19-0HcZK2Jd_CDPh7jDLcqdaBCVfxMNwam1U8Sbfv5aw/edit).

### Clonando o repositório

```bash
git clone https://github.com/RafaelSedor/PPDM_RecordaPet.git
cd PPDM_RecordaPet
```

### Instalando as dependências

```bash
yarn install
```

### Rodando o aplicativo

#### Android

```bash
yarn android
```

#### iOS

```bash
yarn ios
```

### Build do APK

Para gerar o APK para instalação no dispositivo Android, você pode acessar o arquivo APK gerado na pasta `Documentacao/apk` ou baixar diretamente [aqui](https://github.com/RafaelSedor/PPDM_RecordaPet/blob/feature/development/Documentacao/apk/RecordaPet.apk).

## Protótipos de tela

![Protótipo de telas](Documentacao/prototipo.png)

## Modelagem do banco de dados

![Modelagem do banco de dados](Documentacao/modelagem-banco.png)

## Planejamento

| Atividade                                      | Tempo previsto | Data limite  |
|------------------------------------------------|----------------|--------------|
| Configuração de roteamento                     | 3 dias         | 26/06/2024   |
| Configuração de middlewares de autenticação    | 3 dias         | 26/06/2024   |
| Instalação e configurações de bibliotecas      | 2 dias         | 26/06/2024   |
| Área de autenticação                           | 1 semana       | 26/06/2024   |
| Cadastro das casas                             | 4 dias         | 26/06/2024   |
| Cadastro dos animais                           | 1 dia          | 26/06/2024   |
| Listagem das casas                             | 4 dias         | 26/06/2024   |
| Listagem dos animais                           | 1 dia          | 26/06/2024   |
| Cadastro da alimentação                        | 1 dia          | 26/06/2024   |
| Listagem das alimentações                      | 2 semanas      | 26/06/2024   |

Este é o README para o projeto RecordaPet. Siga os passos para instalar e rodar a aplicação localmente e aproveite as funcionalidades para gerenciar a alimentação dos seus animais de forma eficiente.