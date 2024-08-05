#!/bin/bash

# Step 1: Perform a backup of the MongoDB database
echo "Backing up the database..."
mongodump --db mongo_tasks --out /home/sonal/Documents/Learning/MongoDB/mongodb-tasks/
echo "Backup completed."

# Step 2: Drop the database
echo "Dropping the database..."
node dropDatabase.js
echo "Database dropped."

# Step 3: Restore the database using the backup file
echo "Restoring the database..."
mongorestore --db  mongo_tasks /home/sonal/Documents/Learning/MongoDB/mongodb-tasks/mongo_tasks
echo "Database restored."
