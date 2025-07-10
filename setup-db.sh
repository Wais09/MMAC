#!/bin/bash
set +H  # Disable history expansion to handle ! in password

echo "🔄 Setting up MMAC Members Portal Database..."

# Set the DATABASE_URL directly to avoid issues with special characters
export DATABASE_URL='postgresql://postgres.myameoaohqscvrktzyjm:MachinE33!@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1'

echo "✅ Environment variables set"

# Generate Prisma client
echo "🔄 Generating Prisma client..."
bunx prisma generate

# Push schema to database
echo "🔄 Creating database tables..."
bunx prisma db push

# Seed database with sample data
echo "🔄 Seeding database with sample data..."
bunx tsx prisma/seed.ts

echo "🎉 Database setup complete!"
echo "📊 You can view your data at: bunx prisma studio"
echo ""
echo "🔐 Login Credentials:"
echo "Admin: admin@marrickvillemartialarts.com / admin123"
echo "Trainer: josh@marrickvillemartialarts.com / trainer123"
echo "Member: sarah.wilson@email.com / member123"
