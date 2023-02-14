# Stage 1
# FROM nginx:latest
FROM nginx:latest
COPY ./deployment/nginx.conf /etc/nginx/nginx.conf

ENV PORT 3000

# Copy static apps
ARG env
ENV RUNTIME_ENV=${env}
COPY ./build${RUNTIME_ENV} /usr/share/nginx/apps

# Building app
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
