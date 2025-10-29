pipeline {
    agent any
    tools {
        nodejs 'node16'  // 与上面配置的名称一致
    }
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
                 sh '''
                 # 安装cnpm并使用
                 npm install -g cnpm --registry=https://registry.npmmirror.com
                 cnpm install
                   '''
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
