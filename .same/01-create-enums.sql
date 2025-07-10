-- MMAC Members Portal Database Setup
-- Run these commands one by one in Supabase SQL Editor

-- Step 1: Create Enums
CREATE TYPE "Role" AS ENUM ('MEMBER', 'TRAINER', 'ADMIN');
CREATE TYPE "MembershipType" AS ENUM ('CASUAL', 'KICK_STARTER', 'TWO_X_PLAN', 'UNLIMITED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');
CREATE TYPE "BookingStatus" AS ENUM ('CONFIRMED', 'CANCELLED', 'WAITLIST', 'NO_SHOW');
CREATE TYPE "ClassType" AS ENUM ('BJJ', 'MUAY_THAI', 'MMA', 'WRESTLING', 'KIDS_BJJ', 'KIDS_MUAY_THAI', 'WOMENS_MUAY_THAI');
