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
        stage('Test') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.51.1-noble'
                    // image 'node:22-alpine'
                    reuseNode true
                    // args '-u root:root'
                }
            }
            // Jenkins playwright e2e tests
            steps {
                sh'''
                    cd MERN-TODO-APP/server
                    #npm i @playwright/test -D
                    node index.js &
                    #npx playwright install chromium
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
                    #chmod -R 777 / 
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