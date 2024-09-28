FROM public.ecr.aws/amplify/amplify:latest

# Install Go
RUN apt-get update && apt-get install -y golang-go

# Set Go environment variables
ENV GOROOT /usr/lib/go
ENV GOPATH /go
ENV PATH $GOPATH/bin:$GOROOT/bin:$PATH

# Create directory for Go projects
RUN mkdir -p $GOPATH/src $GOPATH/bin && chmod -R 777 $GOPATH
