# Start from the Amazon Linux 2023 base image
FROM public.ecr.aws/amazonlinux/amazonlinux:2023.5.20240916.0

# Install necessary dependencies
RUN dnf update -y && dnf install -y wget tar gzip xz git openssh bash shadow-utils util-linux

# Install NVM (Node Version Manager)
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=18.18.0

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Install Node.js and NPM using NVM
RUN . "$NVM_DIR/nvm.sh" && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION

# Set up Node.js and NPM in PATH
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Verify Node.js and NPM installations
RUN node -v && npm -v

# Install Go (version 1.22.5)
RUN wget https://dl.google.com/go/go1.22.5.linux-amd64.tar.gz && tar -C /usr/local -xzf go1.22.5.linux-amd64.tar.gz && rm go1.22.5.linux-amd64.tar.gz

# Set Go environment variables
ENV PATH="/usr/local/go/bin:${PATH}"
ENV GOPATH="/root/go"
ENV GOMODCACHE="${GOPATH}/pkg/mod"

# Create Go module cache directory
RUN mkdir -p "${GOMODCACHE}"

# Install global NPM packages

RUN npm install -g rimraf copyfiles pm2 wait-on mocha \
	mochawesome mochawesome-merge mochawesome-report-generator

RUN npm install -g @aws-amplify/cli@12.12.1 && amplify -v

# Set the working directory
WORKDIR /app

# Expose the port your app runs on
EXPOSE 3000

# Start the application (optional)
# CMD ["npm", "start"]
