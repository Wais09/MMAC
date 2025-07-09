# Database Setup Guide - MMAC Members Portal

## Current Status: ❌ Database Connection Failed

Your Supabase database is currently **paused** and needs to be resumed before we can continue with the setup.

## Step 1: Resume Your Supabase Database

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign in with your account

2. **Find Your Project**
   - Look for project: `myameoaohqscvrktzyjm`
   - Click on the project name

3. **Resume the Database**
   - You should see a "Resume" or "Unpause" button
   - Click it to resume the database
   - **Wait 1-2 minutes** for the database to fully start

4. **Verify Database is Active**
   - The dashboard should show "Active" status
   - Green indicators should appear

## Step 2: Test Database Connection

Once your database is resumed, run this command:

```bash
./test-db-connection.sh
```

If successful, you'll see:
```
✅ Database connection successful!
🎉 Your database is ready for setup!
```

## Step 3: Complete Database Setup

After confirming the connection works, run the full setup:

```bash
./setup-db.sh
```

This will:
- ✅ Generate Prisma client
- ✅ Create all database tables
- ✅ Seed with sample data (admin, trainers, members, classes)

## Step 4: Verify Setup Complete

You should see this success message:
```
🎉 Database setup complete!
📊 You can view your data at: bunx prisma studio
🔐 Login Credentials:
Admin: admin@marrickvillemartialarts.com / admin123
Trainer: josh@marrickvillemartialarts.com / trainer123
Member: sarah.wilson@email.com / member123
```

## Step 5: Test the Members Portal

1. **Start the development server:**
   ```bash
   bun dev
   ```

2. **Test login at:** http://localhost:3000/auth/signin

3. **Try these accounts:**
   - **Admin:** admin@marrickvillemartialarts.com / admin123
   - **Trainer:** josh@marrickvillemartialarts.com / trainer123
   - **Member:** sarah.wilson@email.com / member123

## Troubleshooting

### If connection still fails:
1. **Double-check database status** in Supabase dashboard
2. **Wait longer** - sometimes takes 3-5 minutes to fully resume
3. **Try the direct connection** by updating DATABASE_URL to:
   ```
   postgresql://postgres.myameoaohqscvrktzyjm:MachinE33!@db.myameoaohqscvrktzyjm.supabase.co:5432/postgres
   ```

### If you see permission errors:
1. Make sure scripts are executable:
   ```bash
   chmod +x setup-db.sh test-db-connection.sh
   ```

### If you need to reset everything:
1. **Drop all tables** in Supabase dashboard (SQL Editor)
2. **Run setup script** again

## What Gets Created

Once setup is complete, your database will have:

### Users (5 total)
- 1 Admin user (full system access)
- 4 Trainers (Josh, Tsuchika, Antonio, Bastian, Johana)
- Sample members with different membership types

### Classes (15+ total)
- BJJ classes (Monday, Tuesday, Thursday, Friday)
- Muay Thai classes (Tuesday, Friday, Saturday)
- Wrestling classes (Wednesday)
- MMA classes (Thursday, Saturday, Sunday)
- Kids classes (Monday, Wednesday, Saturday)
- Women's Muay Thai (Saturday)

### Sample Data
- Membership plans and pricing
- Class schedules with trainer assignments
- Sample bookings and attendance records
- Payment history examples

## Next Steps After Database Setup

1. **Complete class booking system** ✅ (Already built)
2. **Complete trainer portal** ✅ (Already built)
3. **Complete admin dashboard** ✅ (Already built)
4. **Set up payment processing** (Stripe integration ready)
5. **Configure ClubWorx import** (Interface ready)
6. **Deploy to production** (Netlify ready)

---

**Need Help?** The database setup is the final step before your complete members portal is ready to use!
