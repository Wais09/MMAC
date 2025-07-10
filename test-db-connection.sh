#!/bin/bash
set +H  # Disable history expansion

echo "🔍 Testing database connection..."

# Set the DATABASE_URL directly
export DATABASE_URL='postgresql://postgres.myameoaohqscvrktzyjm:MachinE33!@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1'

echo "✅ Environment variables set"

# Test schema validation
echo "🔄 Validating Prisma schema..."
bunx prisma validate

if [ $? -eq 0 ]; then
    echo "✅ Schema validation successful"
else
    echo "❌ Schema validation failed"
    exit 1
fi

# Test database connection
echo "🔄 Testing database connection..."
bunx prisma db push --accept-data-loss

if [ $? -eq 0 ]; then
    echo "✅ Database connection successful!"
    echo "🎉 Your database is ready for setup!"
    echo ""
    echo "Now you can run: ./setup-db.sh"
else
    echo "❌ Database connection failed"
    echo "🔧 Please check:"
    echo "   1. Database is resumed in Supabase dashboard"
    echo "   2. Wait 1-2 minutes after resuming"
    echo "   3. Try again"
    exit 1
fi
