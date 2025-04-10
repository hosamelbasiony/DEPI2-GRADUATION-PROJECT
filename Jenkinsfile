pipeline {
    agent any

    environment {
        MONGO_URI="mongodb://127.0.0.1:27017/Todos"
        MONGO_URL="mongodb://127.0.0.1:27017/Todos"
        // MONGO_URI=credentials('MONGO_URI')
        // MONGO_URL=credentials('MONGO_URI')
        JWT= "somestrongsecret"
        NODE_ENV="development"
        PORT=4311
        VITE_BASE_URL="http://localhost:4311/api/"
        TEST_SECRET = credentials('TEST_SECRET')
    }
    
    stages {
        stage('Spin up MongoDB') {
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
        
        stage('Cypress e2e Tests') {
            agent {
                docker {
                    image 'cypress/browsers'
                    reuseNode true
                }
            }
            steps {
                // try {
                sh'''
                    cd ./MERN-TODO-APP/server
                    npm ci
                    npm run dev &
                    sleep 10
                    npx cypress run
                    sleep 10
                '''
                // } catch (Exception e) {
                //     echo "Cypress e2e Tests Failed: ${e.message}"
                //     currentBuild.result = 'FAILURE'
                //     error('Cypress e2e tests stage failed') // Optional: stop pipeline
                // }
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
    }
    
    post {
        always {
            sh 'docker stop jenkins-mongo || true'
            sh 'docker rm -f jenkins-mongo || true'
        }
    }
}

// Jenkins - Added stages for building the client and running tests using Newman and Cypress