# Step 1: Use a lightweight Python base image
FROM python:3.13-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the application code into the container
COPY . /app

# Step 4: Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Expose the port the application will run on
EXPOSE 5000

# Step 6: Define the default command to run the application
CMD ["python", "app.py"]
