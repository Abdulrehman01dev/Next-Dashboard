import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
} from './definitions';
import { formatCurrency } from './utils';
import { Revenue } from './models/revenue';
import { Invoice } from './models/Invoice';
import mongoose from 'mongoose';
import { URI } from './db';
import { Customer } from './models/customer';

export async function connectDB() {
  try {
    console.log("🚀 ~ connectDB ~ mongoose.connection.readyState:", mongoose.connection.readyState)
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(URI);
    }
    await mongoose.connect(URI);

    console.error('Database Connected Successfully:');
  } catch (error) {
    console.error('Database Connection Error:', error);
  }
}


export async function fetchRevenue() {
  try {
    const data = await Revenue.find({});
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await Invoice.find().populate('customer_id').lean().limit(5).exec();

    const latestInvoices = data.map((invoice) => {
      const { customer_id, ...invoiceFields } = invoice;
      const { _id, ...customerFields } = customer_id;

      return {
        ...invoiceFields,
        ...customerFields,
        amount: formatCurrency(invoice.amount),
      };
    });
    return latestInvoices;
  } catch (error) {
    console.error('fetchLatestInvoices Error:', error);
    // throw new Error('Failed to fetch the latest invoices.');
  }
}


export async function fetchCardData() {
  try {
    const [numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices] = await Promise.all([
      Invoice.countDocuments({}),
      Customer.countDocuments({}),
      Invoice.aggregate([
        { $match: { status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]).then(result => (result[0] ? result[0].total : 0)),
      Invoice.aggregate([
        { $match: { status: 'pending' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]).then(result => (result[0] ? result[0].total : 0)),
    ]);

    return {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('fetchCardData Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const result = await Invoice.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customers"
        }
      },
      { $unwind: '$customers' },
      {
        $match: {
          'customers.name': {
            $regex: query,
            $options: 'i'
          }
        }
      },
      { $skip: offset },
      { $limit: ITEMS_PER_PAGE },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$$ROOT", "$customers"]
          }
        }
      },
      {
        $project: {
          customers: 0 // Exclude the `customers` field since it's now redundant
        }
      }
    ]);
    return result;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const countResult = await Invoice.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customers"
        }
      },
      { $unwind: '$customers' },
      {
        $match: {
          'customers.name': {
            $regex: query,
            $options: 'i'
          }
        }
      },
      {
        $count: "total"
      }
    ]);

    const totalCount = countResult.length > 0 ? countResult[0].total : 0;
    return Math.ceil(totalCount / 6);

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await Invoice.findById(id).populate('customer_id');

    const invoice = {...data, amount: data?.amount / 100}
    console.log("🚀 ~ fetchInvoiceById ~ invoice:", invoice)

    return invoice;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await Customer.find({});
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
