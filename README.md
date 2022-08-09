# Open-Classrooms-Septieme-Projet-Groupomania 🔨

Groupomania est le septième et dernier projet du parcours de Développeur Web proposé par l'organisme de formation Open Classrooms. Ceci est une version améliorée du projet de base, j'espère que vous apprécierez le projet !

## Contexte :

Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.

Votre directrice, Stéphanie, vient de signer un nouveau contrat avec Groupomania, un groupe spécialisé dans la grande distribution, et l'un des plus fidèles clients de l'agence.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.

## Compétences évaluées :

- Authentifier un utilisateur et maintenir sa session
- Personnaliser le contenu envoyé à un client web
- Gérer un stockage de données à l'aide de SQL
- Implémenter un stockage de données sécurisé en utilisant SQL
- Respecter les spécifications fonctionnelles et techniques

## Technologies utilisées :

#### FRONT : 

- React
- Sass (node-sass)
- Packages (axios, dayJs, react-dom, react-router-dom)

#### BACK : 

- NodeJS
- Express
- MySQL
- Packages (bcrypt, cors, dotenv, file-system/fs, jsonwebtoken, sequelize, mysql2, nodemon, multer)

### Pour lancer Groupomania :

Créez un fichier .env dans le back-end
```
SECRET_HOST = localhost
SECRET_USER = Votre Username
SECRET_PASSWORD = Votre Password
SECRET_DB = Votre database Name
SECRET_JWT = !J!{0|e{4:x=bpbr7S3mB7J5?(4Fs5(@R,c83\M?[gx[Gt6/JE!Ez+wXtrR)   (Exemple de Token généré aléatoirement)
SECRET_PORT = Le port sur lequel tourne votre base de données
```
Clônez le repo, puis ouvrez le terminal de commande
Back + dépendances
```
cd back-end/ && npm i
```
Démarrez le server
```
nodemon server
```
Ouvrez un nouveau terminal
```
cd front-end
```
Lancez react :
```
npm start
```
### Bonne découverte !
