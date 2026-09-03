pipeline {
    agent any
    environment {
        DOCKER_USERNAME = "malimansur"
        BACKEND_IMAGE = "$DOCKER_USERNAME/employee-backend1"
        FRONTEND_IMAGE = "$DOCKER_USERNAME/employee-frontend1"
    }
    stages {
       stage ('Clone Repository') {
           steps {
               git branch: 'main', url: 'https://github.com/MAliMansur/Docker-Project-.git'
           }
       }
       stage ('Install Docker and Docker Compose') {
           steps {
               sh '''
               set -eux
               sudo apt-get update 
               sudo apt-get install docker.io -y
               sudo apt-get install docker-compose-v2 -y || sudo apt-get install -y docker compose
               '''
           }
       }
       
       
       stage ('Verifying Docker') {
           steps {
               sh "docker --version"
               sh "docker compose version"
           }
       }
     
       stage ('Build Backend Image') {
           steps {
               sh '''
               docker build -t $BACKEND_IMAGE:latest ./backend
               '''
           }
       }
       stage ('Build Frontend Image') {
           steps {
               sh '''
               docker build -t $FRONTEND_IMAGE:latest ./frontend
               '''
           }
       }
       stage ('Docker Hub Login') {
           steps {
               withCredentials([usernamePassword(
                   credentialsId: 'dockerhub-creds',
                   usernameVariable: 'DOCKER_USER',
                   passwordVariable: 'DOCKER_PASS')])
                   {
                       sh '''
                       echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                       '''
                   }
           }
       }
       stage ('Push Backend Image') {
           steps {
               sh '''
               docker push $BACKEND_IMAGE:latest
               '''
           }
       }
       stage ('Push Frontend Image') {
           steps {
               sh '''
               docker push $FRONTEND_IMAGE:latest
               '''
           }
       }
       stage ('Deploy Application') {
           steps {
               sh '''
               docker compose down
               docker compose up -d
               '''
           }
       }
       
       stage ('Verify Deployment') {
           steps {
               sh '''
               docker ps
               docker images
               '''
           }
       }
       
    }
       
       post {
           success {
               echo "Pipeline Running Successfully"
           }
           failure {
               echo "Pipeline Failed"
           }
           always {
               echo "Pipeline Finished"
           }
       }

}
