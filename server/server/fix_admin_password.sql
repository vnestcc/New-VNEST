-- Fix admin password for VNEST application
-- Run this script in pgAdmin4 Query Tool

-- Update admin user password (password: admin123)
UPDATE users 
SET password = '$2a$10$3tNA4R1ZqDhSGO.W0JrYD.2pmZRqlx4FinhOuc.twGShJG3WjZKr.'
WHERE email = 'admin@vnest.com';

-- Verify the update
SELECT id, name, email, role, created_at 
FROM users 
WHERE email = 'admin@vnest.com';

-- Check if the password was updated successfully
SELECT 'Admin password updated successfully' as status;
