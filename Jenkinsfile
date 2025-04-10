pipeline {
    agent any

    environment {
        MONGO_URI="mongodb://mongodb:27017/Todos"
        MONGO_URL="mongodb://mongodb:27017/Todos"
        JWT= "somestrongsecret"
        NODE_ENV="development"
        PORT=4311
        VITE_BASE_URL="http://localhost:4311/api/"
        TEST_SECRET = credentials('TEST_SECRET')
    }

    stages {
        // Jenkins node/mongo image
        stage('Build') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                    // args '-u root:root'
                }
            }
            steps {
                sh'''
                    pwd
                    ls -la
                    cd ./MERN-TODO-APP/client
                    pwd
                    #npm ci
                    #npm run build                
                '''
            }
        }

        stage ('Run Tests') {
            parallel {
                stage('Unit Tests') {
                    agent {
                        docker {
                            image 'node:22-alpine'
                            reuseNode true
                        }
                    }
                    steps {
                        sh'''
                            echo "Unit Tests Run Stage >>>"
                        '''
                    }
                }

                stage('Integration Tests') {
                    agent {
                        docker {
                            image 'node:22-alpine'
                            reuseNode true
                        }
                    }
                    steps {
                         sh'''
                            echo "Integration Tests Run Stage >>>"
                        '''
                    }
                }
            }
        }

        stage('Deployment') {
            steps {
                sh'''
                    echo "Deployment Run Stage >>>"
                    echo $TEST_SECRET
                '''
            }
        }

        // stage('Test') {
        //     agent {
        //         docker {
        //             image 'node:22-alpine'
        //             reuseNode true
        //             // args '-u root:root'
        //         }
        //     }
        //     // Jenkins playwright e2e tests
        //     steps {
        //         sh'''
        //             cd MERN-TODO-APP/server
        //             npm run dev &
        //             sleep 100
        //             #npm i @playwright/test
        //             #node index.js &
        //             #sleep 100
        //             #npx playwright test  
        //         '''
        //     }
        // }
    }
}