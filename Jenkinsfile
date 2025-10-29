pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo '🔗 拉取代码...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 安装依赖...'
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                echo '🏗️ 构建Vue项目...'
                sh 'npm run build'
            }
        }
        
        stage('Archive') {
            steps {
                echo '📁 存档构建文件...'
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }
    }
    
    post {
        always {
            echo '✅ 构建完成!'
        }
        success {
            echo '🎉 构建成功!'
        }
        failure {
            echo '❌ 构建失败!'
        }
    }
}
