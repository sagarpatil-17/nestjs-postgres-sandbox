# NestJS + Supabase PostgreSQL Practice

A robust, enterprise-ready practice project demonstrating scalable backend API development using **NestJS**, **TypeORM**, and a cloud-hosted **Supabase PostgreSQL** database.

This repository serves as a dedicated hands-on playground and reference implementation for implementing clean architectural patterns, secure cloud database connectivity, and type-safe RESTful APIs.

---

## 🛠️ Tech Stack & Key Integrations

*   **Framework:** [NestJS](https://nestjs.com) - A progressive, TypeScript-first Node.js framework for building efficient and maintainable server-side applications.
*   **Database:** [Supabase](https://supabase.com) - A fully managed, open-source **PostgreSQL** instance with native connection pooling capabilities.
*   **ORM:** [TypeORM](https://typeorm.io) - A powerful Object-Relational Mapper for TypeScript, providing seamless migrations, entity definitions, and database queries.
*   **Language:** TypeScript for strong typing and enterprise-grade maintainability.

---

## 🎯 Practice Objectives & Features

*   **Modular Architecture:** Implementing clean separation of concerns using NestJS Modules, Controllers, and Services.
*   **Secure Cloud Connectivity:** Interfacing with a remote Supabase Postgres instance securely using SSL configurations and connection poolers.
*   **Type-Safe CRUD Operations:** Building fully functional REST API endpoints linked directly to database entities.
*   **Data Validation:** Using global pipes with `class-validator` and `class-transformer` to sanitize incoming payloads.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com
cd YOUR_REPO_NAME
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory of your project and populate it with your credentials from the **Supabase Dashboard** (*Project Settings > Database*):

```env
PORT=3000

# Supabase PostgreSQL Configuration
DB_HOST=://supabase.com # Replace with your Supabase pooler host
DB_PORT=6543                                # Use 6543 for Transaction mode pooler
DB_USERNAME=postgres.your_project_ref
DB_PASSWORD=your_supabase_db_password
DB_NAME=postgres
```

> 💡 **Tip:** When using serverless/cloud architecture like Supabase, it is highly recommended to use the **Connection Pooler** string (port `6543`) to prevent your application instances from exhausting PostgreSQL connections.

---

## 🚀 Database & Framework Configuration

The database is initialized in `src/app.module.ts` using the environment variables and strict SSL requirements mandated by Supabase:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production and use migrations!
      ssl: {
        rejectUnauthorized: false, // Required for secure Supabase connections
      },
    }),
  ],
})
export class AppModule {}
```

---

## 🏃‍♂️ Running the Application

```bash
# development mode (with auto-reload/watch mode)
npm run start:dev

# production mode
npm run start:prod
```

The server will spin up locally by default at: `http://localhost:3000`

---

## 🧪 License

Distributed under the MIT License. See `LICENSE` for more information.
