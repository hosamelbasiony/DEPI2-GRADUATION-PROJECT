pipeline {
    agent any

    environment {
        MONGO_URI="jenkins-mongo://mongodb:27017/Todos"
        MONGO_URL="jenkins-mongo://mongodb:27017/Todos"
        JWT= "somestrongsecret"
        NODE_ENV="development"
        PORT=4311
        VITE_BASE_URL="http://localhost:4311/api/"
        TEST_SECRET = credentials('TEST_SECRET')
    }
    
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
        
        stage('Build client') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh'''
                    cd ./MERN-TODO-APP/client
                    npm ci
                    npm run build &
                    sleep 10
                '''
            }
        }
        
        stage('Build') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh'''
                    cd ./MERN-TODO-APP/server
                    npm ci
                    npm run dev &
                    curl -s http://localhost:4311/api/healthcheck
                    sleep 10
                '''
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