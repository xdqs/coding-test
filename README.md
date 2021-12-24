# Etherscan Crawler

This project is a web crawler for crawling [etherscan](https://cn.etherscan.com).

## File Structure

- public/ - static files
  - favicon.ico - favicon
  - favicon.svg - favicon
- index.html - main html file, template for vite vue
- screenshots/ - Screenshots
- src/ - Client side code (A standard vue app structure)
- .env - Environment variables
- .env.local - Local environment variables
- .eslintrc.js - ESLint configuration
- .gitignore - Git ignore file
- .prettierrc - Prettier configuration
- blocklet.md - Blocklet README
- blocklet.yml - Blocklet configuration
- LICENSE - License file
- logo.png - Blocklet logo file
- Makefile - Makefile
- package.json - Npm package file
- README.md - A guide for this blocklet
- version - Version file
- server - server file

### server file
- constants - constant file
- controllers - controller file
- services - service file
- test - test file

## Requirement
- Node.js >= 14.x
- redis >= 2.8
- nginx

## Development

1. Make sure you have [@blocklet/cli](https://www.npmjs.com/package/@blocklet/cli) installed

   Blocklet needs blocklet server as a dependency. So you need to install it first.  
   `npm install -g @blocklet/cli`  
   See details in [https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#use-the-binary-distribution](https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#use-the-binary-distribution)

2. Init blocklet server & start blocklet server.
   Make sure the nginx process is closed before starting blocklet server.
   Before starting an blocklet server, you need to init blocklet server.  
   `blocklet server init --mode=debug`  
   `blocklet server start`  
   See details in [https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#configure-abt-node](https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#configure-abt-node)

3. Go to the project directory `cd [name]`
4. Install dependencies: `npm install` or `yarn`
5. Modify environment variables in [Env file](.env), change the redis configuration
6. Start development server: `blocklet dev`

## Test
Use `npm run test:server` command.

## API response structure

```json

{
  "code": 0, // status code, 0-success, 1-parameter error
  "message": "成功", // message
  "data": { // data
    "rows": [] // row datas
  }
}

```