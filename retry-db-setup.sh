#!/bin/bash
set +H  # Disable history expansion

echo "🔄 Retrying Database Connection with Multiple Attempts..."
echo "📝 Using direct connection (not pooler)"
echo ""

# Set the DATABASE_URL directly (direct connection)
export DATABASE_URL='postgresql://postgres.myameoaohqscvrktzyjm:MachinE33!@db.myameoaohqscvrktzyjm.supabase.co:5432/postgres'

MAX_ATTEMPTS=6
ATTEMPT=1
DELAY=30

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    echo "🔄 Attempt $ATTEMPT of $MAX_ATTEMPTS..."

    # Try to connect and push schema
    bunx prisma db push --accept-data-loss

    if [ $? -eq 0 ]; then
        echo "✅ Database connection successful!"
        echo "🎉 Database tables created!"
        echo ""
        echo "🌱 Now seeding database with sample data..."

        # Run the seed script
        bunx tsx prisma/seed.ts

        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 DATABASE SETUP COMPLETE!"
            echo "📊 You can view your data at: bunx prisma studio"
            echo ""
            echo "🔐 Login Credentials:"
            echo "Admin: admin@marrickvillemartialarts.com / admin123"
            echo "Trainer: josh@marrickvillemartialarts.com / trainer123"
            echo "Member: sarah.wilson@email.com / member123"
            echo ""
            echo "🚀 Ready to test the Members Portal!"
            exit 0
        else
            echo "❌ Database seeding failed, but tables are created"
            echo "You can try running: bunx tsx prisma/seed.ts"
            exit 1
        fi
    else
        echo "❌ Attempt $ATTEMPT failed"

        if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
            echo "⏳ Waiting $DELAY seconds before retry..."
            echo "   (Database might still be starting up)"
            sleep $DELAY
        fi
    fi

    ATTEMPT=$((ATTEMPT + 1))
done

echo ""
echo "❌ All attempts failed. Please check:"
echo "1. Database is actually resumed in Supabase dashboard"
echo "2. Database shows 'Active' status (not 'Starting' or 'Paused')"
echo "3. Wait a few more minutes and try again"
echo ""
echo "🔧 You can also try updating your connection string in Supabase dashboard"
