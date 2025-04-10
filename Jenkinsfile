pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh'''
                    pwd
                    ls -la
                    cd ./MERN-TODO-APP/client
                    pwd
                    npm ci
                    npm run build                    
                '''
            }
        }
        // stage('Test') {
        //     agent {
        //         docker {
        //             image 'node:18-alpine'
        //             reuseNode true
        //         }
        //     }
        //     steps {
        //         sh'''
        //             cd MERN-TODO-APP/server
        //             npm ci
        //             npm run dev &
        //             cd ../client
        //             npm run dev &
        //             npx cypress run 
        //         '''
        //     }
        // }
    }
    
    post {
        always {
            junit 'MERN-TODO-APP/client/test-results/junit.xml'
        }
    }
}