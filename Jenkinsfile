pipeline {
    agent any

    environment {
        MONGO_URI="mongodb://mongodb:27017/Todos"
        JWT= "somestrongsecret"
        NODE_ENV="development"
        PORT=4311
        VITE_BASE_URL="http://localhost:4311/api/"
        TEST_SECRET = credentials('TEST_SECRET')
    }

    stages {
        // Jenkins node/mongo image
        stage('Docker build') {
            steps {
                // script {
                //     def dockerImage = docker.build("mern-todo-app:latest", "-f MERN-TODO-APP/Dockerfile .")
                //     dockerImage.inside("-u root:root") {
                //         sh '''
                //             echo "Docker build stage >>>"
                //             echo $TEST_SECRET
                //         '''
                //     }
                // }

                sh'''
                    docker build -t depi-todos-test-image:latest -f Dockerfile .
                '''
            }
        }
        stage('Test Image') {
            agent {
                docker {
                    image 'depi-todos-test-image:latest'
                    reuseNode true
                }
            }
            steps {
                sh''' 
                    echo "Testing MongoDb status >>>"
                    systemctl status mongod
                '''
            }
        }

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
                    #chmod -R 777 / 
                    pwd
                    ls -la
                    cd ./MERN-TODO-APP/client
                    pwd
                    npm ci
                    npm run build    
                    #chmod -R 777 /                
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

        stage('Unit Tests') {
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
        //             image 'mcr.microsoft.com/playwright:v1.51.1-noble'
        //             // image 'node:22-alpine'
        //             reuseNode true
        //             // args '-u root:root'
        //         }
        //     }
        //     // Jenkins playwright e2e tests
        //     steps {
        //         sh'''
        //             cd MERN-TODO-APP/server
        //             npm i @playwright/test
        //             node index.js &
        //             sleep 100
        //             npx playwright test  
        //         '''
        //     }
        // }
    }
    
    // post {
    //     always {
    //         junit 'MERN-TODO-APP/client/test-results/junit.xml'
    //     }
    // }
}