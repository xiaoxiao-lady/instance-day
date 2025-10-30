pipeline {
    agent any
    tools {
        nodejs 'node16'  // 与上面配置的名称一致
    }
    // 固定环境配置
    environment {
        APP_NAME = "my-vue-app"
        DEPLOY_DIR = "/Users/wjy/nginx-deploy/my-vue-app" 
        DEPLOY_URL = "http://localhost:8000"
        NODE_ENV = "development"
        COMPANY = "自动化部署项目"
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
        stage('部署到Nginx') {
            steps {
                sh """
                  echo "🚀 开始部署 ${env.APP_NAME}"
                  echo "📁 目标目录: ${env.DEPLOY_DIR}"
                  echo "🌐 访问地址: ${env.DEPLOY_URL}"
                  
                  # 部署操作
                  sudo mkdir -p ${env.DEPLOY_DIR}
                  sudo rm -rf ${env.DEPLOY_DIR}/*
                  sudo cp -r dist/* ${env.DEPLOY_DIR}/
                  sudo chmod -R 755 ${env.DEPLOY_DIR}
                  
                  # 重启Nginx
                  sudo nginx -s reload
                  
                  echo "✅ 部署完成!"
                """
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
        success {
            echo "🎉 ${env.APP_NAME} 部署成功!"
            echo "🔗 访问: ${env.DEPLOY_URL}"
        }
    }
}
