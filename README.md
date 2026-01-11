<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>


# TrelloLite NestJS API

A **production-ready REST API** built with **NestJS**, **Prisma**, and **MySQL** to manage **Projects and Tasks** with:

- JWT Authentication
- Strict user ownership (Laravel Policy style)
- UUID-based routing
- Modular architecture
- Prisma ORM as single source of truth

This project is designed as a **modern backend API** and a **migration target from Laravel**.

---

## Tech Stack
- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: MySQL
- **Authentication**: JWT (Passport)
- **Validation**: class-validator `https://docs.nestjs.com/techniques/validation`
- **API Style**: REST (Contact API response is the same with Laravel's Project `https://github.com/ahmadhafidh/trellolite-laravel`)

---

## Prerequisites

Make sure you have installed:

- Node.js >= 18 (I use node v24.11.0)
- npm (I use npm v11.6.1)
- MySQL
- Git

## How to use

```bash
$ git clone <your-repository-url>
cd trellolite-nestjs

# install dependencies
$ npm install

# Environment Setup
$ cp .env.example to .env

# Generate Prisma Client
$ npx prisma generate

# Fresh migrate + seed
$ npx prisma migrate reset

# Run Seeder Only (Optional)
$ npx prisma db seed

# Start Local Development Server
$ npm run start:dev

#Local Development Server will start here:
$ http://localhost:3000

```
You can also tested at `https://trellolite-nestjs.idkoding.com`

## Postman collection:
https://documenter.getpostman.com/view/26950655/2sBXVfiWwY

## Project Structure

src/
├── app.module.ts
├── main.ts
│
├── prisma/
│   ├── prisma.module.ts
│   ├── prisma.service.ts
│
├── auth/
│   ├── dto/
│   ├── guards/
│   ├── strategies/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│
├── projects/
│   ├── dto/
│   ├── projects.controller.ts
│   ├── projects.module.ts
│   ├── projects.service.ts
│
├── tasks/
│   ├── dto/
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   ├── tasks.service.ts
│
└── common/
    ├── decorators/
    ├── helpers/