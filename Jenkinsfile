pipeline {
    agent any
    
    stages {
        stage('Start MongoDB') {
            steps {
                script {
                    // Remove any existing container first
                    sh 'docker rm -f jenkins-mongo || true'
                    // Start new container
                    sh 'docker run -d --name jenkins-mongo -p 27017:27017 mongo:latest'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    // Tests can access MongoDB at localhost:27017
                    sh 'your-test-command-here'
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Cleanup container
                sh 'docker stop jenkins-mongo || true'
                sh 'docker rm -f jenkins-mongo || true'
            }
        }
    }
}

// Jenkins node/mongo image