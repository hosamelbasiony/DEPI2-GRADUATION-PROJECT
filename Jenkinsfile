pipeline {
    agent any
    
    stages {
        stage('Deploy'){
            steps{
                script{
                    withEnv(['JENKINS_NODE_COOKIE=dontkill']) {
                        // Start MongoDB in background
                        sh '''
                            docker rm -f jenkins-mongo || true
                            docker run -d --name jenkins-mongo -p 27017:27017 mongo:latest
                        '''
                        // Verify MongoDB is ready
                        sh '''
                            docker ps
                        '''
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                sh '''
                    echo "Running tests..."
                    # Add your test commands here, e.g., npm test or pytest
                '''
            }
        }
    }
    
    post {
        always {
            sh 'docker stop jenkins-mongo || true'
            sh 'docker rm -f jenkins-mongo || true'
        }
    }
}

// Jenkins node/mongo image