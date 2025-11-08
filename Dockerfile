# ---------- Build frontend ----------
FROM node:18 AS build
WORKDIR /app
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build

# ---------- Backend ----------
FROM node:18
WORKDIR /app
COPY backend ./backend
COPY --from=build /app/frontend/dist ./backend/public
WORKDIR /app/backend
COPY backend/.env .
RUN npm install

EXPOSE 5000
CMD ["npm", "start"]
