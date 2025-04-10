pipeline {
    agent any

    environment {
        MONGO_URI=credentials('MONGO_URI')
        MONGO_URL=credentials('MONGO_URI')
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
        
        stage('Newman Tests') {
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
                    sleep 10
                    ./node_modules/.bin/newman run ./postman/postman_collection.json -e ./postman/postman_environment.json
                    sleep 10
                '''
            }
        }
        
        stage('Cypress e2e Tests') {
            agent {
                docker {
                    image 'cypress/base:22.14.0'
                    reuseNode true
                }
            }
            steps {
                sh'''
                    cd ./MERN-TODO-APP/server
                    npm ci
                    npm run dev &
                    sleep 10
                    npx cypress run
                    sleep 10
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