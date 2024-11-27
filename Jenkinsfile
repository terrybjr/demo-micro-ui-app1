pipeline {
    agent any // This pipeline can be executed on any available agent
    stages {
        stage('Clean') { // Stage for cleaning the project
            steps {
                sh 'mvn clean' // Execute 'mvn clean' command
            }
        }
        stage('Install') { // Stage for installing the project dependencies
            steps {
                sh 'mvn install' // Execute 'mvn install' command
            }
        }

        stage('Stop Existing Docker Container') { // Stage for stopping any existing Docker container
            steps {
                script {
                    // Stop any running Docker containers from the 'demo-micro-ui-app1:latest' image
                    sh '''
                       docker ps -q -f ancestor=demo-micro-ui-app1:latest | xargs -r docker stop
                       docker ps -a -q -f ancestor=demo-micro-ui-app1:latest | xargs -r docker rm
                    '''
                }
            }
        }
        stage('Build Docker Image') { // Stage for building the Docker image
            steps {
                script {
                    docker.build('demo-micro-ui-app1:latest', './web-app') // Build Docker image from the Dockerfile in the 'web-app' directory
                    sh 'docker image prune -f' // Remove all dangling Docker images
                }
            }
        }
        stage('Replace Image in Container') { // Stage for replacing the running Docker container with a new one
            steps {
                script {
                    // Run the Docker container from the 'demo-micro-ui-app1:latest' image
                    sh 'docker run --restart unless-stopped -d -p 9083:9083 demo-micro-ui-app1:latest'
                }
            }
        }
    }
}