# Code Wallet

A simple desktop app to organize and manage your code snippets, built with React and Electron.

## Features
- Add, edit, delete code snippets
- Associate tags to each snippet
- Add and delete tags
- Easy navigation between Snippets, Tags and Info
- Modern and minimal interface

## How to run
1. Install dependencies: `npm install`
2. Start the app: `npm run dev`

## Author
Essidy Osra

---

## Déploiement (pour développeur)

### Technologies à vérifier
- **Node.js** (version recommandée : 18 ou supérieure)
- **npm** (installé avec Node.js)
- **Git** (pour cloner le projet, si besoin)

### Actions à effectuer dans le terminal

1. **Cloner le projet (si besoin) :**
   ```bash
   git clone <url-du-repo>
   cd app-code-wallet
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer l'application en mode Electron (bureau) :**
   ```bash
   npm run dev
   ```
   L'application s'ouvre dans une fenêtre Electron.

4. **Lancer l'application dans le navigateur (web) :**
   ```bash
   npm run web
   ```
   Puis ouvrir l'adresse indiquée (souvent http://localhost:5173) dans votre navigateur.

### Autres actions nécessaires
- Pour la version Electron, vous pouvez générer un exécutable avec :
  ```bash
  npm run build
  ```
  Le résultat sera dans le dossier `dist`.
- Pour la version web, le build final sera dans le dossier `dist-web` après :
  ```bash
  npm run build -- --mode web
  ```

**Remarque :**
- Les données sont stockées localement sur votre machine (pas de cloud).
- Si vous avez un souci, vérifiez que Node.js et npm sont bien installés (`node -v` et `npm -v`).
