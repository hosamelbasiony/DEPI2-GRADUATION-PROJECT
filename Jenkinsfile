pipeline {
    agent any    

    stages {
        stage('Start MongoDB') {
        steps {
            script {
                // Start MongoDB in background with a fixed name
                docker.image('mongo:latest').withRun(
                    '--name jenkins-mongo -p 27017:27017',
                    background: true
                ) 
                // No closure here means container keeps running
            }
        }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    // Your tests that need MongoDB will automatically have access
                    // since the container is running in the background
                    echo 'Running something that needs mongodb' // or whatever your test command is
                }
            }
        }
    }
    
    // post {
    //     always {
    //         script {
    //             sh 'docker stop jenkins-mongo || true'
    //             sh 'docker rm -f jenkins-mongo || true'
    //         }
    //     }
    // }
}

// Jenkins node/mongo image