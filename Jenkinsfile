pipeline {
    agent any
    tools {
        nodejs 'node16'
    }
    
    environment {
        // 重置PATH为系统默认值
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Applications/Docker.app/Contents/Resources/bin"
        
        APP_NAME = "my-vue-app"
        DEPLOY_URL = "http://localhost:8000"
        CONTAINER_NAME = "nginx-vue-app"
        NGINX_IMAGE = "nginx:alpine"
    }
    
    stages {
        stage('Environment Check') {
            steps {
                echo '🔧 检查环境...'
                sh """
                  echo "=== 环境信息 ==="
                  echo "PATH: \$PATH"
                  echo "Node.js: \$(which node)"
                  echo "npm: \$(which npm)" 
                  echo "Docker: \$(which docker || echo 'Docker未找到')"
                """
            }
        }
        
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
                  npm install -g cnpm --registry=https://registry.npmmirror.com
                  cnpm install
                '''
            }
        }
        
        stage('Build') {
            steps {
                echo '🏗️ 构建Vue项目...'
                sh 'npm run build'
                sh 'ls -la dist/'
            }
        }
        
        stage('Docker Deploy') {
            steps {
                echo '🐳 Docker部署...'
                sh """
                  # 停止旧容器
                  docker stop ${env.CONTAINER_NAME} 2>/dev/null || echo "无旧容器"
                  docker rm ${env.CONTAINER_NAME} 2>/dev/null || echo "容器已清理"
                  
                  # 启动新容器
                  docker run -d \\
                    --name ${env.CONTAINER_NAME} \\
                    -p 8000:80 \\
                    -v \$(pwd)/dist:/usr/share/nginx/html \\
                    ${env.NGINX_IMAGE}
                  
                  echo "✅ Docker部署完成"
                """
            }
        }
        
        stage('Health Check') {
            steps {
                sh """
                  sleep 5
                  if curl -f ${env.DEPLOY_URL} > /dev/null 2>&1; then
                    echo "🎉 部署成功: ${env.DEPLOY_URL}"
                  else
                    echo "❌ 部署失败"
                    docker logs ${env.CONTAINER_NAME}
                    exit 1
                  fi
                """
            }
        }
    }
    
    post {
        success {
            echo "✅ 自动化部署成功!"
        }
    }
}
