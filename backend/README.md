## How to use docker:

- cd backend
- docker build -t snkr/gateway -f ./apps/gateway/Dockerfile .
- docker run --rm -dp 3000:3000 --network host snkr/gateway
- docker build -t snkr/user -f ./apps/user/Dockerfile .
- docker run --rm -dp 3001:3001 --network host snkr/user

TODO: docker-compose up 