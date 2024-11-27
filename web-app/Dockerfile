# Use the official Open Liberty runtime as a base image
FROM openliberty/open-liberty:full-java21-openj9-ubi-minimal

# The ARG instruction defines a variable that users can pass at build-time to the builder with the docker build command.
ARG VERSION=1.0

# Copy the server.xml file to the Liberty server's configDropins/defaults directory
COPY --chown=1001:0 src/main/liberty/config /config/

# Optional functionality might be located in the dev, debug and jsp directories.
# Add the following three lines to include this function in your Liberty server image
RUN ln -s /opt/ol/wlp/usr/servers/defaultServer /config/ \
 && ln -s /opt/ol/wlp/usr/servers/defaultServer /output/ \
 && ln -s /opt/ol/wlp/usr/servers/defaultServer /logs/

# This script will add the application and any required features and runtimes to the image
COPY --chown=1001:0 target/web-app1.war /config/dropins/

EXPOSE 9083 9446