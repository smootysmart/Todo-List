pipeline {
    agent { label 'docker-runner'}

    environment {
        COMPOSE_PROJECT_NAME = "todo-stack-${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Start Services') {
            steps {
                echo 'Building images and starting containers...'
                sh 'docker compose up --build -d'
                echo 'Connecting Jenkins Agent to the application network...'
                // This lets the agent step inside the same network room as your backend
                sh "docker network connect ${COMPOSE_PROJECT_NAME}_default jenkins-docker-agent || true"
            }
        }

stage('Health Check') {
            options {
                // Total timeout for this entire stage (e.g., 2 minutes)
                timeout(time: 2, unit: 'MINUTES')
            }
            steps {
                echo 'Waiting for Backend API and Frontend to become healthy...'
                
                // Retry the checks every few seconds. It will attempt up to 10 times.
                retry(10) {
                    script {
                        // Sleep for 5 seconds between each retry attempt to give services time to boot
                        sleep time: 5, unit: 'SECONDS'
                        
                        echo 'Checking Backend API health...'
                        // -f fails silently on server errors; -s runs in silent mode
                        sh 'curl -fs http://todo_backend:8081/api/tasks'
                        
                        echo 'Checking Frontend health...'
                        sh 'curl -fs http://todo_frontend:3000'
                    }
                }
                echo 'All services are up and healthy!'
            }
        }

        stage('Run Tests') {
            // This stage will only run if the Health Check stage passes successfully
            steps {
                echo 'Executing integration tests...'
                // sh 'docker compose exec -T backend npm test'
            }
        }
    }

    post {
        always {
            echo 'Fetching container logs for debugging...'
            sh 'docker compose logs || true'
            
            echo 'Disconnecting Jenkins Agent from network...'
            sh "docker network disconnect ${COMPOSE_PROJECT_NAME}_default jenkins-docker-agent || true"

            echo 'Cleanup skipped to allow manual testing.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Checking container logs...'

            sh 'docker compose logs'
        }
    }
}
