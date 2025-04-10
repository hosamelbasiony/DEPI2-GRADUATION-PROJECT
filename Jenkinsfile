pipeline {
    agent any

     keepRunning {
        sh 'docker rm -f jenkins-mongo || true'
        sh 'docker run -d --name jenkins-mongo -p 27017:27017 mongo:latest'
    }
    
    stages {
        // stage('Start MongoDB') {
            // steps {
                // script {
                //     sh 'docker rm -f jenkins-mongo || true'
                //     sh 'docker run -d --name jenkins-mongo -p 27017:27017 mongo:latest'
                // }
            // }
        // }
        
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