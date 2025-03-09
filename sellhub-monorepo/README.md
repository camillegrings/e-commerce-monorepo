# Sellhub E-Commerce Monorepo 🛒  

This is a **monorepo** for an **E-Commerce platform** built with **Next.js, tRPC, Turborepo, DrizzleORM, PostgreSQL, and Docker**.  

## 🚀 Features  
✅ **Store Dashboard** - Manage products and orders (Next.js)  
✅ **Customer Store** - View products, add to cart, and place orders (Next.js)  
✅ **tRPC API** - Handles products and orders (tRPC + DrizzleORM)  
✅ **PostgreSQL Database** - Persistent storage for products and orders  
✅ **Monorepo Architecture** - Uses **Turborepo** for managing multiple applications  

---

## 🛠 **1. Prerequisites**  

Make sure you have the following installed:  
- **Node.js** (v18 or later) - [Download here](https://nodejs.org/)  
- **Docker** - [Download here](https://www.docker.com/)  
- **Git** - [Download here](https://git-scm.com/)  

---

## 📂 **2. Clone the Repository**  
Run this command to clone the repository to your local machine:  

```bash
git clone https://github.com/camillegrings/e-commerce-monorepo.git
cd e-commerce-monorepo/sellhub-monorepo
```

---

## 📦 **3. Install Dependencies**
Run the following command to install all dependencies for all applications:

```bash
npm install
```
This will install dependencies for both the Store, Dashboard and trpc api using Turborepo.

---

## 🐘 **4. Set Up PostgreSQL with Docker**
We use Docker to set up the PostgreSQL database.

Step 1: Start the Database
Run the following command:

```bash
docker-compose up -d
```

This will:
✅ Start a PostgreSQL database in a Docker container
✅ Expose it on port 5432

---

## ⚙️ **5. Configure Environment Variables**
Each application requires a .env file.

Step 1: Create a .env file inside apps/dashboard/
```bash
DATABASE_URL=postgres://sellhub_user:sellhub_pass@localhost:5432/sellhub_db
```

Step 2: Create a .env file inside apps/store/
```bash
DATABASE_URL=postgres://sellhub_user:sellhub_pass@localhost:5432/sellhub_db
```

Step 3: Create a .env file inside services/trpc-api/
```bash
DATABASE_URL=postgres://sellhub_user:sellhub_pass@localhost:5432/sellhub_db
```
Important: If you change the database credentials, update DATABASE_URL accordingly.

---

## 🛢 **6. Run Database Migrations**
Once the database is running, apply DrizzleORM migrations:

```bash
cd services/trpc-api
npx drizzle-kit generate
npx drizzle-kit push
```
This will create the necessary tables in PostgreSQL.

---

## 🎛 **7. Run the Applications**
Run the applications from the base folder
```bash
cd ../../
npm run dev
```
Opens http://localhost:3000/ and http://localhost:3001/

---

## 🛠 **8. Troubleshooting**
❌ Error: "PostgresError: password authentication failed"
👉 Ensure the database user and password match the DATABASE_URL in .env.local.
👉 Access PostgreSQL inside Docker to manually update the password:

```bash
docker exec -it sellhub_db psql -U postgres
ALTER USER sellhub_user WITH PASSWORD 'sellhub_pass';
```

## 👥 **9. Contributors**
Camille Grings Silva