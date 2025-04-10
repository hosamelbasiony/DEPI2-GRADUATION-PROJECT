pipeline {
    agent any
    
    parallel {
        stages {
            stage('Start MongoDB') {
                steps {
                    script {
                        // Start MongoDB container and remember the container ID
                        docker.image('mongo:latest').withRun('-p 27017:27017 --name jenkins-mongo') { c ->
                            // Store container ID for later use
                            env.MONGO_CONTAINER_ID = c.id
                        }
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
    }
    
    // post {
    //     always {
    //         script {
    //             // Clean up the MongoDB container
    //             if (env.MONGO_CONTAINER_ID) {
    //                 sh "docker stop ${env.MONGO_CONTAINER_ID}"
    //                 sh "docker rm ${env.MONGO_CONTAINER_ID}"
    //             }
    //         }
    //     }
    // }
}

// Jenkins node/mongo image