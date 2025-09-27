# Step 1: Specify the base image
# Use an official lightweight image, such as Python, for simplicity
FROM python:3.13-slim

# Step 2: Set the working directory inside the container
# This is where all commands and files will be located during build
WORKDIR /app

# Step 3: Copy the application code into the container
# "." represents the current directory on the host, and "/app" is the container's directory
COPY . /app

# Step 4: Install application dependencies
# Use a requirements.txt file for Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Expose a port
# Inform Docker which port the application will listen on
EXPOSE 5000

# Step 6: Specify the default command to run the application
# Replace `app.py` with the name of your main Python script
CMD ["python", "app.py"]
