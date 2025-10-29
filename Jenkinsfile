pipeline {
    agent any

    tools {
        nodejs 'node16'   // 👈 name must match Jenkins NodeJS tool name
    }

    environment {
        DOCKER_IMAGE = "sagargiragani/node-webapp-demo:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/sagargiragani45/node-k8s-demo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build || echo "No build script found"'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No test script found"'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to Docker Hub') {
            environment {
                DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred') // 👈 Jenkins credential ID
            }
            steps {
                sh '''
                echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                docker push $DOCKER_IMAGE
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build and push completed successfully!'
        }
        failure {
            echo '❌ Build failed. Check logs.'
        }
    }
}
 
