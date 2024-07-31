import bcrypt from 'bcrypt';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';

import mongoose from "mongoose";
import { URI } from "../lib/db";
import { User } from '../lib/models/user';
import { Invoice } from '../lib/models/Invoice';
import { Customer } from '../lib/models/customer';
import { Revenue } from '../lib/models/revenue';

// const client = await db.connect();

async function seedUsers() {
  try {
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );
    const insertedUsers = await User.insertMany(hashedUsers)
    return insertedUsers;
  } catch (error) {
    console.log("🚀 ~ seedUsers ~ error:", error)
    
  }
}

async function seedInvoices() {
  try {
    const insertedInvoices = await Invoice.insertMany(invoices);
    return insertedInvoices;
  } catch (error) {
    console.log("🚀 ~ seedInvoices ~ error:", error);
  }
}

async function seedCustomers() {
  try {
    const insertedCustomers = await Customer.insertMany(customers);
    return insertedCustomers;
  } catch (error) {
    console.log("🚀 ~ seedCustomers ~ error:", error);
  }
}

async function seedRevenue() {
  try {
    const insertedRevenue = await Revenue.insertMany(revenue);
    return insertedRevenue;
  } catch (error) {
    console.log("🚀 ~ seedRevenue ~ error:", error);
  }  
}

export async function GET() {
  try {
    await mongoose.connect(URI);
    // await seedUsers();
    // await seedCustomers();
    await seedInvoices();
    // await seedRevenue();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    // await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
