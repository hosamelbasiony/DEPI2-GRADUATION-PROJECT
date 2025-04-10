pipeline {
    agent any
    
    stages {
        stage('Start MongoDB') {
            steps {
                script {
                    // Start MongoDB in background
                    sh '''
                        docker rm -f jenkins-mongo || true
                        docker run -d --name jenkins-mongo -p 27017:27017 mongo:latest
                    '''
                    // Verify MongoDB is ready
                    sh '''
                        until docker exec jenkins-mongo mongo --eval "printjson(db.serverStatus())"; do
                            sleep 2
                        done
                    '''
                }
            }
        }

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
                            until docker exec jenkins-mongo mongo --eval "printjson(db.serverStatus())"; do
                                sleep 2
                            done
                        '''
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'your-test-command-here'
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