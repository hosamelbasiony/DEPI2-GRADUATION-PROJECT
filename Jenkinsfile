pipeline {
    agent any

    environment {
        MONGO_URI="mongodb://mongodb:27017/Todos"
        JWT= "somestrongsecret"
        NODE_ENV="development"
        PORT=4311
        VITE_BASE_URL="http://localhost:4311/api/"
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:22-alpine'
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
        stage('Test') {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh'''
                    cd MERN-TODO-APP/client
                    npx playwright install chromium
                    npx playwright test # --headed --project=chromium --config=playwright.config.js --reporter=html
                    #cd MERN-TODO-APP/server
                    #npm ci
                    #npm run dev &
                    #cd ../client
                    #npx playwright install chromium
                    #npx playwright test --headed --project=chromium --config=playwright.config.js --reporter=html
                    #npm run dev &
                    #npm run test:ui
                    #npx cypress run 
                '''
            }
        }
    }
    
    post {
        always {
            junit 'MERN-TODO-APP/client/test-results/junit.xml'
        }
    }
}