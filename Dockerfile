# Start from the AWS Amplify base image
FROM public.ecr.aws/amplify/amplify:latest

# Install necessary dependencies
RUN apt-get update && apt-get install -y wget tar

# Install Go (version 1.22.5)
RUN wget https://dl.google.com/go/go1.22.5.linux-amd64.tar.gz &&
    tar -C /usr/local -xzf go1.22.5.linux-amd64.tar.gz &&
    rm go1.22.5.linux-amd64.tar.gz

# Set Go environment variables
ENV PATH="/usr/local/go/bin:${PATH}"
ENV GOPATH="/root/go"
ENV GOMODCACHE="${GOPATH}/pkg/mod"

# Create Go module cache directory
RUN mkdir -p "${GOMODCACHE}"

# Install global NPM packages
RUN npm install -g rimraf copyfiles pm2 wait-on mocha \
    mochawesome mochawesome-merge mochawesome-report-generator

# Set the working directory
WORKDIR /app

# Copy your application code into the container
COPY . .

# Install Node.js dependencies
RUN npm ci

# Build the application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
