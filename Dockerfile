# ---------- Build frontend ----------
FROM node:18 AS build
WORKDIR /app
COPY frontend ./frontend

# Accept all VITE_* env variables from Fly build args
ARG VITE_API_BASE_URL
ARG VITE_RAZORPAY_KEY_ID
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID

RUN cd frontend && npm install && npm run build

# ---------- Backend ----------
FROM node:18
WORKDIR /app
COPY backend ./backend
COPY --from=build /app/frontend/dist ./backend/public
WORKDIR /app/backend
RUN npm install

EXPOSE 5000
CMD ["npm", "start"]
