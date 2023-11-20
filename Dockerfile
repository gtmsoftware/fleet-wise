FROM node:18-alpine3.17

WORKDIR /app

COPY package.json .
COPY package-lock.json .

COPY LICENSE .
COPY README.md .

COPY app.js .
COPY redisClient.js ,

COPY config.js .
COPY config_csp.js .

COPY views/ ./views/
COPY routes/ ./routes/
COPY public/ ./public/
COPY prisma/ ./prisma/
COPY middleware/ ./middleware/
COPY dbservice/ ./dbservice/
COPY bin/ ./bin/
COPY auth_service/ ./auth_service/

RUN npm install

# COPY package.json package.json
# COPY package-lock.json package-lock.json
# COPY LICENSE LICENSE
# COPY README.md README.md

# COPY app.js app.js
# COPY redisClient.js redisClient.js

# COPY config.js config.js
# COPY config_csp.js config_csp.js

# COPY views/ views/
# COPY routes/ routes/

# COPY routes/ routes/
# COPY public/ public/
# COPY prisma/ prisma/
# COPY middleware/ middleware/
# COPY dbservice/ dbservice/
# COPY bin/ bin/
# COPY auth_service/ auth_service/

# RUN npm install



ENTRYPOINT [ "npm" "run" "start" ]
