-- MMAC Members Portal Database Schema
-- Run these commands one by one in the Supabase SQL Editor

-- First, create the ENUM types
CREATE TYPE "Role" AS ENUM ('MEMBER', 'TRAINER', 'ADMIN');
CREATE TYPE "MembershipType" AS ENUM ('CASUAL', 'KICK_STARTER', 'TWO_X_PLAN', 'UNLIMITED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');
CREATE TYPE "BookingStatus" AS ENUM ('CONFIRMED', 'CANCELLED', 'WAITLIST', 'NO_SHOW');
CREATE TYPE "ClassType" AS ENUM ('BJJ', 'MUAY_THAI', 'MMA', 'WRESTLING', 'KIDS_BJJ', 'KIDS_MUAY_THAI', 'WOMENS_MUAY_THAI');

-- Create Users table (main table for members, trainers, admins)
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "email" TEXT NOT NULL UNIQUE,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',

    -- Profile information
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "profileImage" TEXT,
    "address" TEXT,
    "suburb" TEXT,
    "postcode" TEXT,
    "state" TEXT,

    -- Emergency contact
    "emergencyContactName" TEXT,
    "emergencyContactPhone" TEXT,
    "emergencyRelationship" TEXT,

    -- Medical information
    "medicalConditions" TEXT,
    "allergies" TEXT,
    "medications" TEXT,

    -- Membership information
    "membershipType" "MembershipType",
    "membershipStart" TIMESTAMP(3),
    "membershipEnd" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    -- ClubWorx import data
    "clubworxId" TEXT UNIQUE,

    -- Waiver and documents
    "waiverSigned" BOOLEAN NOT NULL DEFAULT false,
    "waiverSignedDate" TIMESTAMP(3),

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Classes table
CREATE TABLE "classes" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "type" "ClassType" NOT NULL,
    "description" TEXT,

    -- Schedule
    "dayOfWeek" INTEGER NOT NULL, -- 0 = Sunday, 1 = Monday, etc.
    "startTime" TEXT NOT NULL, -- Format: "18:00"
    "endTime" TEXT NOT NULL, -- Format: "19:30"
    "duration" INTEGER NOT NULL, -- Duration in minutes

    -- Capacity and pricing
    "maxCapacity" INTEGER NOT NULL DEFAULT 20,
    "price" DOUBLE PRECISION, -- Price per class for casual members

    -- Trainer assignment
    "trainerId" TEXT,

    -- Status
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classes_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create Bookings table
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "memberId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL, -- Specific date for this booking
    "status" "BookingStatus" NOT NULL DEFAULT 'CONFIRMED',
    "notes" TEXT,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bookings_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bookings_memberId_classId_date_key" UNIQUE("memberId", "classId", "date")
);

-- Create Attendance table
CREATE TABLE "attendances" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "memberId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "bookingId" TEXT UNIQUE,
    "date" TIMESTAMP(3) NOT NULL,
    "checkedIn" BOOLEAN NOT NULL DEFAULT false,
    "checkedInAt" TIMESTAMP(3),
    "notes" TEXT,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attendances_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "attendances_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "attendances_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "attendances_memberId_classId_date_key" UNIQUE("memberId", "classId", "date")
);

-- Create Payments table
CREATE TABLE "payments" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "memberId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'AUD',
    "description" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',

    -- Stripe integration
    "stripePaymentId" TEXT UNIQUE,
    "stripeInvoiceId" TEXT,

    -- Membership period this payment covers
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),

    -- Payment metadata
    "paymentMethod" TEXT, -- card, bank_transfer, cash
    "paidAt" TIMESTAMP(3),

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Progress Logs table
CREATE TABLE "progress_logs" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "memberId" TEXT NOT NULL,
    "classType" "ClassType" NOT NULL,
    "level" TEXT, -- e.g., "White Belt", "Beginner", "Intermediate"
    "achievement" TEXT, -- Description of achievement or milestone
    "notes" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Trainer who logged the progress
    "loggedBy" TEXT, -- User ID of trainer

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "progress_logs_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Trainer Notes table
CREATE TABLE "trainer_notes" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "memberId" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "classType" "ClassType",
    "content" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false, -- Only visible to trainers and admins

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trainer_notes_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "trainer_notes_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create System Settings table
CREATE TABLE "system_settings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "key" TEXT NOT NULL UNIQUE,
    "value" TEXT NOT NULL,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- NextAuth.js required tables
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "accounts_provider_providerAccountId_key" UNIQUE("provider", "providerAccountId")
);

CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "sessionToken" TEXT NOT NULL UNIQUE,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_tokens_identifier_token_key" UNIQUE("identifier", "token")
);

-- Create indexes for better performance
CREATE INDEX "users_email_idx" ON "users"("email");
CREATE INDEX "users_role_idx" ON "users"("role");
CREATE INDEX "users_isActive_idx" ON "users"("isActive");
CREATE INDEX "classes_trainerId_idx" ON "classes"("trainerId");
CREATE INDEX "classes_dayOfWeek_idx" ON "classes"("dayOfWeek");
CREATE INDEX "classes_type_idx" ON "classes"("type");
CREATE INDEX "bookings_memberId_idx" ON "bookings"("memberId");
CREATE INDEX "bookings_classId_idx" ON "bookings"("classId");
CREATE INDEX "bookings_date_idx" ON "bookings"("date");
CREATE INDEX "attendances_memberId_idx" ON "attendances"("memberId");
CREATE INDEX "attendances_classId_idx" ON "attendances"("classId");
CREATE INDEX "attendances_date_idx" ON "attendances"("date");
CREATE INDEX "payments_memberId_idx" ON "payments"("memberId");
CREATE INDEX "payments_status_idx" ON "payments"("status");
